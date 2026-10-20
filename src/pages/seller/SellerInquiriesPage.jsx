import React, { useState } from 'react';
import { MessageSquare, Phone, Mail, Check, Calendar, ArrowRight, User, X, Send } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { useApp } from '../../context/AppContext';

export function SellerInquiriesPage({ onSelectProperty, onNavigate }) {
  const { properties, inquiries, updateInquiryStatus, replyToInquiry } = useApp();

  const [activeReplyLeadId, setActiveReplyLeadId] = useState(null);
  const [replyText, setReplyText] = useState('');

  const statusOptions = [
    'New',
    'Contacted',
    'Qualified',
    'Visit Scheduled',
    'Visited',
    'Shortlisted',
    'Negotiating',
    'Closed'
  ];

  const handleSendReply = (e) => {
    e.preventDefault();
    if (!replyText.trim() || !activeReplyLeadId) return;

    replyToInquiry(activeReplyLeadId, replyText);
    setActiveReplyLeadId(null);
    setReplyText('');
  };

  return (
    <div className="min-h-screen bg-vistara-bg pb-24 text-vistara-primary text-xs">
      
      {/* Header */}
      <div className="bg-vistara-surface border-b border-vistara-border px-4 sm:px-6 py-6">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <MessageSquare className="w-4 h-4 text-purple-600" />
              <span className="text-xs uppercase font-extrabold text-purple-600 tracking-wider">
                BUYER COMMUNICATIONS & LIFECYCLE
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-vistara-primary tracking-tight">
              Inquiry Inbox & Lead Funnel
            </h1>
            <p className="text-xs text-vistara-secondary mt-1">
              Track prospective home seekers from first inquiry through private tour to closing term sheet.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 pt-6 space-y-4">
        
        <div className="flex items-center justify-between pb-2 border-b border-vistara-border">
          <span className="font-extrabold text-vistara-primary text-sm">
            Active Buyer Inquiries ({inquiries.length})
          </span>
          <span className="text-vistara-secondary text-[11px] hidden sm:inline">
            Status Flow: New → Contacted → Qualified → Visit Scheduled → Visited → Shortlisted → Negotiating → Closed
          </span>
        </div>

        <div className="space-y-4">
          {inquiries.map(lead => {
            const prop = properties.find(p => p.id === lead.propertyId) || properties[0] || {};

            return (
              <div
                key={lead.id}
                className="p-5 bg-vistara-surface border border-vistara-border rounded-xl shadow-card flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="space-y-2.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-extrabold text-vistara-primary text-sm">{lead.name}</span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                      lead.status === 'New'
                        ? 'bg-blue-100 text-blue-800'
                        : lead.status === 'Visit Scheduled'
                        ? 'bg-amber-100 text-amber-800'
                        : lead.status === 'Negotiating' || lead.status === 'Closed'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-purple-100 text-purple-800'
                    }`}>
                      {lead.status}
                    </span>
                    <span className="text-[10px] text-vistara-muted font-mono">{lead.date}</span>
                    <span className="text-[10px] text-vistara-secondary ml-auto">
                      Origin: {lead.source || 'Direct Portal'}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-vistara-secondary text-[11px]">
                    <span className="flex items-center gap-1 font-medium">
                      <Phone className="w-3.5 h-3.5 text-vistara-accent" /> {lead.phone}
                    </span>
                    <span className="flex items-center gap-1 font-medium">
                      <Mail className="w-3.5 h-3.5 text-vistara-accent" /> {lead.email}
                    </span>
                  </div>

                  <div className="text-[11px] text-vistara-secondary">
                    Listing Mandate: <strong className="text-vistara-primary font-bold">{prop.name || 'Featured Listing'}</strong> ({prop.priceDisplay || 'Price on Request'} • {prop.microMarket || 'Chennai'})
                  </div>

                  <div className="p-3 bg-vistara-elevated rounded-xl border border-vistara-border text-vistara-secondary leading-relaxed">
                    "{lead.message}"
                  </div>

                  {/* Thread Replies if any */}
                  {lead.replies && lead.replies.length > 0 && (
                    <div className="space-y-1.5 pl-3 border-l-2 border-vistara-accent">
                      {lead.replies.map(rep => (
                        <div key={rep.id} className="text-[11px]">
                          <span className="font-bold text-vistara-primary">{rep.sender}</span>{' '}
                          <span className="text-[9px] text-vistara-muted">({rep.date})</span>:
                          <p className="text-vistara-secondary">{rep.text}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex flex-col items-start md:items-end justify-between gap-3 border-t md:border-t-0 pt-3 md:pt-0">
                  <div className="flex items-center gap-2">
                    <span className="text-vistara-secondary font-semibold">Lifecycle Status:</span>
                    <select
                      value={lead.status}
                      onChange={(e) => updateInquiryStatus(lead.id, e.target.value)}
                      className="bg-vistara-elevated border border-vistara-border rounded-lg px-2.5 py-1.5 font-bold text-vistara-primary focus:outline-none"
                    >
                      {statusOptions.map(st => (
                        <option key={st} value={st}>{st}</option>
                      ))}
                    </select>
                  </div>

                  <Button
                    size="sm"
                    variant="primary"
                    onClick={() => setActiveReplyLeadId(lead.id)}
                  >
                    Reply to Buyer
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Reply Modal */}
      {activeReplyLeadId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-none">
          <div className="bg-vistara-surface border border-vistara-border rounded-2xl p-6 max-w-md w-full shadow-popover text-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-vistara-border">
              <h3 className="font-extrabold text-vistara-primary text-sm">
                Dispatch Secure Buyer Message
              </h3>
              <button onClick={() => setActiveReplyLeadId(null)}>
                <X className="w-4 h-4 text-vistara-secondary" />
              </button>
            </div>

            <form onSubmit={handleSendReply} className="space-y-3">
              <div>
                <label className="block font-bold text-vistara-primary mb-1">Response Message</label>
                <textarea
                  rows={4}
                  required
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="e.g. Thank you for your inquiry. Clear title deeds and CMDA sanction orders are verified. We can arrange a private walkthrough this Saturday..."
                  className="w-full bg-vistara-elevated border border-vistara-border rounded-lg p-2.5 text-vistara-primary focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-vistara-border">
                <Button size="sm" variant="secondary" onClick={() => setActiveReplyLeadId(null)}>
                  Cancel
                </Button>
                <Button size="sm" variant="primary" type="submit" icon={Send}>
                  Send Reply
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
