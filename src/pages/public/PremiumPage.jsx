import React from 'react';
import { Sparkles, Check, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { useApp } from '../../context/AppContext';

export function PremiumPage({ onNavigate }) {
  const { currentUser, togglePremium, addNotification } = useApp();
  const [toast, setToast] = React.useState(null);

  return (
    <div className="min-h-screen bg-vistara-bg pb-24 text-vistara-primary text-xs">
      
      {/* Header */}
      <section className="bg-vistara-surface border-b border-vistara-border py-16 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-vistara-accent/15 text-vistara-primary font-bold text-xs mb-3">
            <Sparkles className="w-3.5 h-3.5 text-vistara-accent" />
            VISTARA PLUS
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-vistara-primary mt-1 mb-3">
            Deeper Architectural Intelligence
          </h1>
          <p className="text-sm text-vistara-secondary leading-relaxed">
            Designed for thoughtful home buyers, investors, and decision-makers requiring granular acoustic audits, legal document transparency, and negotiation simulations.
          </p>
        </div>
      </section>

      {/* Pricing Comparison Tier Grid */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          
          {/* Core Tier */}
          <div className="p-8 bg-vistara-surface border border-vistara-border rounded-2xl shadow-card flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-vistara-secondary">
                CORE ACCESS
              </span>
              <div className="text-3xl font-extrabold text-vistara-primary mt-2 mb-1">
                Free
              </div>
              <p className="text-vistara-secondary mb-6 leading-relaxed">
                Essential lifestyle-first discovery and spatial exploration for any home seeker.
              </p>

              <div className="space-y-3 border-t border-vistara-border pt-4">
                {[
                  'Natural Language Search across Chennai',
                  'Basic 7-Axis LifeFit Match Score',
                  'Interactive 3D Spatial Walkthroughs',
                  'Day-in-this-Home Sunlight Simulator',
                  'Basic Compare Matrix (up to 2 properties)',
                  'Wishlists & Thematic Collections',
                  'Field Walkthrough Scheduling'
                ].map(feat => (
                  <div key={feat} className="flex items-center gap-2 text-vistara-primary font-medium">
                    <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <Button
              size="md"
              variant="secondary"
              className="w-full mt-8"
              onClick={() => onNavigate(currentUser ? 'dashboard' : 'signup')}
            >
              {currentUser ? 'Current Active Tier' : 'Get Started Free'}
            </Button>
          </div>

          {/* Vistara Plus Tier */}
          <div className="p-8 bg-vistara-surface border-2 border-vistara-accent rounded-2xl shadow-elevated flex flex-col justify-between relative">
            <div className="absolute -top-3 right-6 bg-[#142334] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Recommended
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-vistara-accent">
                VISTARA PLUS
              </span>
              <div className="text-3xl font-extrabold text-vistara-primary mt-2 mb-1">
                ₹1,999 <span className="text-xs font-normal text-vistara-secondary">/ month (Conceptual)</span>
              </div>
              <p className="text-vistara-secondary mb-6 leading-relaxed">
                Institutional-grade architectural data, legal checklists, and multi-user family Decision Rooms.
              </p>

              <div className="space-y-3 border-t border-vistara-border pt-4">
                {[
                  'Everything in Core Access',
                  'Deep 6-Axis Home DNA Radar Breakdown',
                  'Full 4-Property Smart Compare Arena',
                  'Collaborative Family Decision Room with Voting',
                  'Historical 5-Year Price Trend Velocity Curves',
                  'Instant Price-Drop Real-Time Watchlist',
                  'Audited CMDA & RERA Document Checklist',
                  'High-Fidelity Architectural Brochure PDF Export',
                  'Vistara Intelligence Lab (Custom Weight Sliders)'
                ].map(feat => (
                  <div key={feat} className="flex items-center gap-2 text-vistara-primary font-medium">
                    <Check className="w-4 h-4 text-vistara-accent flex-shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-vistara-border">
              <Button
                size="md"
                variant="primary"
                className="w-full"
                onClick={() => {
                  if (currentUser) {
                    togglePremium();
                    const newStatus = !currentUser.isPremium;
                    addNotification({
                      type: 'System',
                      title: newStatus ? 'Vistara Plus Activated' : 'Vistara Plus Paused',
                      description: newStatus 
                        ? 'Unlimited spatial audits, legal verification badges, and priority negotiation simulations active.'
                        : 'Your subscription status has been returned to Standard.',
                      message: newStatus ? 'Vistara Plus Activated' : 'Vistara Plus Paused',
                      action: 'premium'
                    });
                    setToast(newStatus ? 'Vistara Plus activated for your account!' : 'Vistara Plus paused.');
                    setTimeout(() => setToast(null), 3000);
                  } else {
                    onNavigate('signup');
                  }
                }}
              >
                {currentUser?.isPremium ? 'Manage Vistara Plus (Active)' : 'Activate Vistara Plus (Demo)'}
              </Button>
              {toast && (
                <div className="mt-2 text-center text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 p-2 rounded-lg border border-emerald-200">
                  {toast}
                </div>
              )}
              <div className="text-[10px] text-vistara-muted text-center mt-2">
                * Conceptual pricing for competition demonstration. No real financial billing is executed.
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
