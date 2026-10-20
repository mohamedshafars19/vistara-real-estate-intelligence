import React from 'react';
import { 
  Building, 
  Plus, 
  Eye, 
  Heart, 
  Users, 
  ShieldCheck, 
  TrendingUp, 
  Check, 
  ArrowRight,
  ListFilter
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import { useApp } from '../../context/AppContext';

export function SellerDashboardPage({ onSelectProperty, onNavigate }) {
  const { properties, inquiries, currentUser } = useApp();

  return (
    <div className="min-h-screen bg-vistara-bg pb-24 text-vistara-primary text-xs">
      
      {/* Top Banner Header */}
      <div className="bg-vistara-surface border-b border-vistara-border px-4 sm:px-6 py-6">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Building className="w-4 h-4 text-vistara-accent" />
              <span className="text-xs uppercase font-bold text-vistara-accent tracking-wider">
                PROPERTY OPERATIONS STUDIO
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-vistara-primary tracking-tight">
              Seller Operations Cockpit
            </h1>
            <p className="text-xs text-vistara-secondary mt-1">
              Real-time portfolio visibility, buyer demand telemetry, and listing health diagnostics.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <Button
              size="sm"
              variant="secondary"
              icon={ListFilter}
              onClick={() => onNavigate('seller-features')}
            >
              Capabilities
            </Button>
            <Button
              size="sm"
              variant="primary"
              icon={Plus}
              onClick={() => onNavigate('seller-add')}
            >
              + List New Residence
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 pt-6 space-y-8">
        
        {/* KPI Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 bg-vistara-surface border border-vistara-border rounded-xl shadow-card">
            <div className="flex items-center justify-between text-vistara-secondary">
              <span>Total Listing Impressions</span>
              <Eye className="w-4 h-4 text-vistara-muted" />
            </div>
            <div className="text-2xl font-extrabold text-vistara-primary mt-2">14,820</div>
            <div className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +18% past 14 days
            </div>
          </div>

          <div className="p-5 bg-vistara-surface border border-vistara-border rounded-xl shadow-card">
            <div className="flex items-center justify-between text-vistara-secondary">
              <span>Buyer Saves & Wishlists</span>
              <Heart className="w-4 h-4 text-rose-500" />
            </div>
            <div className="text-2xl font-extrabold text-vistara-primary mt-2">342</div>
            <div className="text-[11px] text-emerald-600 font-semibold mt-1">
              High intent buyer signals
            </div>
          </div>

          <div className="p-5 bg-vistara-surface border border-vistara-border rounded-xl shadow-card">
            <div className="flex items-center justify-between text-vistara-secondary">
              <span>Active Inquiries</span>
              <Users className="w-4 h-4 text-purple-600" />
            </div>
            <div className="text-2xl font-extrabold text-vistara-primary mt-2">{inquiries.length + 18}</div>
            <div className="text-[11px] text-vistara-accent font-semibold mt-1">
              6 scheduled walkthroughs
            </div>
          </div>

          <div className="p-5 bg-vistara-surface border border-vistara-border rounded-xl shadow-card">
            <div className="flex items-center justify-between text-vistara-secondary">
              <span>Average Listing Health</span>
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-extrabold text-vistara-primary mt-2">96%</div>
            <div className="text-[11px] text-emerald-600 font-semibold mt-1">
              Audited & Complete
            </div>
          </div>
        </div>

        {/* Live Buyer Demand Signals */}
        <section className="bg-vistara-surface border border-vistara-border rounded-xl p-6 shadow-card space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-vistara-border">
            <div>
              <h3 className="font-bold text-vistara-primary text-base">
                Live Chennai Buyer Demand Radar
              </h3>
              <p className="text-vistara-secondary text-[11px] mt-0.5">
                Real-time signals matching your active portfolio micro-markets.
              </p>
            </div>
            <Button size="sm" variant="secondary" onClick={() => onNavigate('seller-pricing')}>
              Pricing Valuation Lab →
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-vistara-elevated rounded-lg border border-vistara-border space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-vistara-primary text-xs">OMR Corridor WFH Demand Spike</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                  Very High
                </span>
              </div>
              <p className="text-vistara-secondary leading-relaxed">
                84 active home seekers currently have life profiles with dual-screen WFH requirements and budget caps around ₹1.4 - 1.6 Cr.
              </p>
            </div>

            <div className="p-4 bg-vistara-elevated rounded-lg border border-vistara-border space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-vistara-primary text-xs">Acoustic & Stillness Requirement</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-vistara-surface border border-vistara-border text-vistara-primary">
                  74% Buyers
                </span>
              </div>
              <p className="text-vistara-secondary leading-relaxed">
                South Chennai buyers increasingly filter for verified decibel ratings below 42 dB. Residences with acoustic certification receive 2.4x higher walkthrough requests.
              </p>
            </div>
          </div>
        </section>

        {/* Quick Active Listings Table */}
        <section className="bg-vistara-surface border border-vistara-border rounded-xl p-6 shadow-card space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-vistara-border">
            <h3 className="font-bold text-vistara-primary text-base">
              Active Managed Residences
            </h3>
            <button
              onClick={() => onNavigate('seller-listings')}
              className="text-xs font-semibold text-vistara-accent hover:underline flex items-center gap-1"
            >
              <span>View All Listings</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="divide-y divide-vistara-border">
            {properties.slice(0, 3).map(prop => (
              <div key={prop.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img src={prop.coverImage || prop.images?.hero || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=400&q=80'} alt={prop.name} className="w-14 h-14 rounded-lg object-cover" />
                  <div>
                    <div className="font-bold text-vistara-primary text-sm">{prop.name}</div>
                    <div className="text-vistara-secondary text-[11px]">
                      {prop.microMarket} • {prop.bhk} BHK • {prop.priceDisplay}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> {prop.verification?.completenessScore || 92}% Completeness
                  </span>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => onNavigate('seller-listings')}
                  >
                    Manage
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>

    </div>
  );
}
