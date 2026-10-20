import React from 'react';
import { ListFilter, ArrowRight, CheckCircle2, Building, DollarSign, Eye, ShieldCheck, MessageSquare } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { SELLER_CAPABILITIES } from '../../data/capabilities';

export function SellerFeaturesDirectoryPage({ onNavigate }) {
  const handleLaunchFeature = (target) => {
    if (target === 'seller-dashboard') onNavigate('seller-dashboard');
    else if (target === 'seller-listings') onNavigate('seller-listings');
    else if (target === 'seller-pricing') onNavigate('seller-pricing');
    else if (target === 'seller-inquiries') onNavigate('seller-inquiries');
    else if (target === 'seller-visits') onNavigate('seller-visits');
    else if (target === 'seller-analytics') onNavigate('seller-analytics');
    else if (target === 'seller-add') onNavigate('seller-add');
    else onNavigate('seller-dashboard');
  };

  return (
    <div className="min-h-screen bg-vistara-bg pb-24 text-vistara-primary text-xs">
      
      {/* Header */}
      <div className="bg-vistara-surface border-b border-vistara-border px-4 sm:px-6 py-6">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <ListFilter className="w-4 h-4 text-vistara-accent" />
              <span className="text-xs uppercase font-bold text-vistara-accent tracking-wider">
                OPERATIONS DIRECTORY
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-vistara-primary tracking-tight">
              Seller Operations Capabilities
            </h1>
            <p className="text-xs text-vistara-secondary mt-1">
              Complete index of listing management, valuation simulation, and buyer demand tools in your studio.
            </p>
          </div>

          <Button size="sm" variant="primary" onClick={() => onNavigate('seller-add')}>
            + List New Property
          </Button>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SELLER_CAPABILITIES.map(cap => (
            <div
              key={cap.id}
              className="p-5 bg-vistara-surface border border-vistara-border rounded-xl shadow-card flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-mono text-xs font-bold text-vistara-accent">
                    #{cap.id < 10 ? `0${cap.id}` : cap.id}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-vistara-elevated border border-vistara-border text-vistara-secondary uppercase">
                    {cap.category}
                  </span>
                </div>

                <h3 className="font-bold text-vistara-primary text-sm mb-1.5">
                  {cap.name}
                </h3>
                <p className="text-vistara-secondary text-xs leading-relaxed">
                  {cap.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-vistara-border/60 flex items-center justify-between">
                <span className="flex items-center gap-1 text-[11px] text-emerald-600 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Active In Studio
                </span>
                <button
                  type="button"
                  onClick={() => handleLaunchFeature(cap.target)}
                  className="px-2.5 py-1 rounded bg-vistara-elevated hover:bg-[#142334] hover:text-white transition-colors text-[11px] font-bold text-vistara-primary flex items-center gap-1"
                >
                  <span>Launch Tool</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
