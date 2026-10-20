import React, { useState } from 'react';
import { 
  MessageSquare, 
  Search, 
  Filter, 
  Phone, 
  Mail, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  ArrowRight,
  Send,
  Building,
  UserCheck
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import { useApp } from '../../context/AppContext';

export function AgentInquiriesPage({ onNavigate }) {
  const { inquiries, properties } = useApp();

  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInquiryId, setSelectedInquiryId] = useState(inquiries[0]?.id || 'inq-1');
  const [replyMessage, setReplyMessage] = useState('');
  const [replyHistory, setReplyHistory] = useState({
    'inq-1': [
      { sender: 'Agent', text: 'Thank you for reaching out. We have prepared an acoustic & floor plan briefing for this residence.', time: 'Sep 23, 2026' }
    ]
  });

  const getPropertyTitle = (propId) => {
    const prop = properties.find(p => p.id === propId);
    return prop ? `${prop.title} (${prop.microMarket})` : 'Chennai Residence';
  };

  const filteredInquiries = inquiries.filter(inq => {
    const matchesFilter = activeFilter === 'all' || inq.status?.toLowerCase().includes(activeFilter.toLowerCase());
    const matchesSearch = inq.message?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          inq.phone?.includes(searchQuery);
    return matchesFilter && matchesSearch;
  });

  const selectedInquiry = inquiries.find(inq => inq.id === selectedInquiryId) || inquiries[0];

  const handleSendReply = () => {
    if (!replyMessage.trim() || !selectedInquiry) return;
    const newReply = {
      sender: 'Agent',
      text: replyMessage.trim(),
      time: 'Just now'
    };
    setReplyHistory(prev => ({
      ...prev,
      [selectedInquiry.id]: [...(prev[selectedInquiry.id] || []), newReply]
    }));
    setReplyMessage('');
  };

  return (
    <div className="min-h-screen bg-vistara-bg pb-24 text-vistara-primary">
      
      {/* Top Header */}
      <div className="bg-vistara-surface border-b border-vistara-border px-4 sm:px-6 py-6">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <MessageSquare className="w-4 h-4 text-vistara-accent" />
              <span className="text-xs uppercase font-bold tracking-wider text-vistara-accent">
                INQUIRY INBOX & LEAD ROUTING
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-vistara-primary tracking-tight">
              Client Inquiries & Direct Leads
            </h1>
            <p className="text-xs text-vistara-secondary mt-1">
              Manage incoming inquiries, schedule walkthroughs, and qualify high-intent Chennai home seekers.
            </p>
          </div>

          <Button
            size="sm"
            variant="primary"
            onClick={() => onNavigate('agent-visits')}
            icon={Calendar}
          >
            Tour Calendar
          </Button>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 pt-6">
        
        {/* Main 2-Column Split: Inquiries List (Left) & Conversation Dossier (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Inquiries List (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Filter Pills */}
            <div className="p-3 bg-vistara-surface border border-vistara-border rounded-xl shadow-card flex items-center gap-2 text-xs">
              {['all', 'New Lead', 'Contacted', 'Tour Scheduled'].map(f => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${
                    activeFilter === f
                      ? 'bg-vistara-primary text-vistara-surface'
                      : 'bg-vistara-elevated text-vistara-secondary hover:text-vistara-primary'
                  }`}
                >
                  {f === 'all' ? 'All Leads' : f}
                </button>
              ))}
            </div>

            {/* Inquiries List */}
            <div className="space-y-3">
              {filteredInquiries.length === 0 ? (
                <div className="p-8 text-center bg-vistara-surface border border-vistara-border rounded-xl">
                  <p className="text-xs text-vistara-secondary">No inquiries matching filter.</p>
                </div>
              ) : (
                filteredInquiries.map(inq => {
                  const isSelected = selectedInquiry?.id === inq.id;
                  return (
                    <div
                      key={inq.id}
                      onClick={() => setSelectedInquiryId(inq.id)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-vistara-elevated border-vistara-accent shadow-card'
                          : 'bg-vistara-surface border-vistara-border hover:border-vistara-border/80'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-vistara-primary">{inq.phone || '+91 98401 12345'}</span>
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/10 text-amber-700 dark:text-amber-300">
                              {inq.status || 'New Lead'}
                            </span>
                          </div>
                          <span className="text-[11px] text-vistara-secondary font-medium block mt-0.5">
                            {getPropertyTitle(inq.propertyId)}
                          </span>
                        </div>
                        <span className="text-[10px] text-vistara-secondary">{inq.date || 'Today'}</span>
                      </div>

                      <p className="text-xs text-vistara-secondary mt-2 line-clamp-2 italic">
                        "{inq.message || 'Interested in scheduling a private architectural walkthrough this week.'}"
                      </p>
                    </div>
                  );
                })
              )}
            </div>

          </div>

          {/* Right Column: Lead Engagement Details (7 cols) */}
          <div className="lg:col-span-7">
            {selectedInquiry ? (
              <div className="space-y-6">
                
                {/* Lead Summary Card */}
                <div className="p-6 bg-vistara-surface border border-vistara-border rounded-xl shadow-card">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-vistara-border">
                    <div>
                      <span className="text-xs uppercase font-bold text-vistara-accent tracking-wider">
                        INQUIRY #{selectedInquiry.id}
                      </span>
                      <h2 className="text-xl font-extrabold text-vistara-primary mt-1">
                        {selectedInquiry.phone || '+91 98401 12345'}
                      </h2>
                      <div className="flex items-center gap-4 mt-1 text-xs text-vistara-secondary">
                        <span className="flex items-center gap-1"><Building className="w-3.5 h-3.5 text-vistara-accent" /> {getPropertyTitle(selectedInquiry.propertyId)}</span>
                        <span>•</span>
                        <span>{selectedInquiry.date || 'Received Today'}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="primary"
                        onClick={() => onNavigate('agent-visits')}
                        icon={Calendar}
                      >
                        Book Visit
                      </Button>
                    </div>
                  </div>

                  <div className="mt-4 p-4 rounded-lg bg-vistara-elevated border border-vistara-border">
                    <span className="text-[11px] uppercase font-bold text-vistara-secondary block mb-1">Inquiry Content:</span>
                    <p className="text-xs text-vistara-primary leading-relaxed font-medium">
                      "{selectedInquiry.message || 'Hello, I saw this listing on Vistara. I work at Ascendas IT Park and would like to confirm afternoon sunlight orientation and parking availability.'}"
                    </p>
                  </div>
                </div>

                {/* Conversation & Action History */}
                <div className="p-6 bg-vistara-surface border border-vistara-border rounded-xl shadow-card space-y-4">
                  <h3 className="font-bold text-sm text-vistara-primary">Communication Log</h3>

                  <div className="space-y-3">
                    <div className="p-3 rounded-lg bg-vistara-elevated border border-vistara-border text-xs">
                      <div className="flex justify-between text-vistara-secondary text-[10px] mb-1">
                        <span className="font-bold text-vistara-primary">Client Initial Inquiry</span>
                        <span>{selectedInquiry.date || 'Today'}</span>
                      </div>
                      <p className="text-vistara-primary">
                        {selectedInquiry.message || 'Inquiry logged from portal listing page.'}
                      </p>
                    </div>

                    {(replyHistory[selectedInquiry.id] || []).map((msg, i) => (
                      <div key={i} className="p-3 rounded-lg bg-vistara-primary text-vistara-surface text-xs ml-6">
                        <div className="flex justify-between text-vistara-surface/70 text-[10px] mb-1">
                          <span className="font-bold">{msg.sender} (Response)</span>
                          <span>{msg.time}</span>
                        </div>
                        <p>{msg.text}</p>
                      </div>
                    ))}
                  </div>

                  {/* Send Direct Reply */}
                  <div className="pt-3 border-t border-vistara-border/60">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Type response or log phone call notes..."
                        value={replyMessage}
                        onChange={(e) => setReplyMessage(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSendReply()}
                        className="flex-1 px-3 py-2 bg-vistara-elevated border border-vistara-border rounded-md text-xs text-vistara-primary focus:outline-none focus:border-vistara-accent"
                      />
                      <Button size="sm" variant="primary" onClick={handleSendReply} icon={Send}>
                        Send
                      </Button>
                    </div>
                  </div>
                </div>

              </div>
            ) : (
              <div className="p-12 text-center bg-vistara-surface border border-vistara-border rounded-xl">
                <p className="text-vistara-secondary text-sm">Select an inquiry from the inbox.</p>
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}
