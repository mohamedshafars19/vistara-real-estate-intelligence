import React, { useState } from 'react';
import { 
  Home, 
  Compass, 
  Heart, 
  Menu, 
  Layers, 
  Scale, 
  Calendar, 
  User, 
  X, 
  Building, 
  Briefcase, 
  Plus, 
  DollarSign, 
  BarChart3, 
  Sparkles,
  Users
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export function MobileBottomNav({ activeRoute, onNavigate, onOpenProfile, onOpenFeatures }) {
  const { currentUser, savedPropertyIds, compareList } = useApp();
  const [showMoreDrawer, setShowMoreDrawer] = useState(false);

  const role = currentUser?.role || 'seeker';

  const handleNav = (target) => {
    setShowMoreDrawer(false);
    onNavigate(target);
  };

  return (
    <>
      {/* Fixed Mobile Bottom Bar */}
      <nav 
        aria-label="Mobile Navigation"
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-vistara-surface border-t border-vistara-border select-none shadow-elevated safe-bottom"
      >
        <div className="flex items-center justify-around h-14 px-2">
          
          {/* HOME SEEKER MOBILE BAR */}
          {role === 'seeker' && (
            <>
              <button
                type="button"
                onClick={() => handleNav('dashboard')}
                className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors ${
                  activeRoute === 'dashboard' ? 'text-vistara-primary font-bold' : 'text-vistara-secondary'
                }`}
              >
                <Home className="w-4 h-4 mb-0.5" />
                <span className="text-[10px]">Home</span>
              </button>

              <button
                type="button"
                onClick={() => handleNav('explore')}
                className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors ${
                  activeRoute === 'explore' ? 'text-vistara-primary font-bold' : 'text-vistara-secondary'
                }`}
              >
                <Compass className="w-4 h-4 mb-0.5" />
                <span className="text-[10px]">Explore</span>
              </button>

              <button
                type="button"
                onClick={() => handleNav('pulse')}
                className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors ${
                  activeRoute === 'pulse' ? 'text-vistara-primary font-bold' : 'text-vistara-secondary'
                }`}
              >
                <Sparkles className="w-4 h-4 mb-0.5 text-vistara-accent" />
                <span className="text-[10px]">Pulse</span>
              </button>

              <button
                type="button"
                onClick={() => handleNav('saved')}
                className={`flex flex-col items-center justify-center flex-1 py-1 relative transition-colors ${
                  activeRoute === 'saved' ? 'text-vistara-primary font-bold' : 'text-vistara-secondary'
                }`}
              >
                <Heart className="w-4 h-4 mb-0.5" />
                <span className="text-[10px]">Saved</span>
                {savedPropertyIds.length > 0 && (
                  <span className="absolute top-1 right-3 w-3.5 h-3.5 rounded-full bg-rose-600 text-white text-[8px] font-bold flex items-center justify-center">
                    {savedPropertyIds.length}
                  </span>
                )}
              </button>

              <button
                type="button"
                onClick={() => setShowMoreDrawer(true)}
                className="flex flex-col items-center justify-center flex-1 py-1 text-vistara-secondary hover:text-vistara-primary transition-colors"
              >
                <Menu className="w-4 h-4 mb-0.5" />
                <span className="text-[10px]">More</span>
              </button>
            </>
          )}

          {/* SELLER MOBILE BAR */}
          {role === 'seller' && (
            <>
              <button
                type="button"
                onClick={() => handleNav('seller-dashboard')}
                className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors ${
                  activeRoute === 'seller-dashboard' ? 'text-vistara-primary font-bold' : 'text-vistara-secondary'
                }`}
              >
                <Building className="w-4 h-4 mb-0.5" />
                <span className="text-[10px]">Studio</span>
              </button>

              <button
                type="button"
                onClick={() => handleNav('seller-listings')}
                className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors ${
                  activeRoute === 'seller-listings' ? 'text-vistara-primary font-bold' : 'text-vistara-secondary'
                }`}
              >
                <Layers className="w-4 h-4 mb-0.5" />
                <span className="text-[10px]">Listings</span>
              </button>

              <button
                type="button"
                onClick={() => handleNav('seller-add')}
                className="flex flex-col items-center justify-center flex-1 py-1 text-vistara-accent font-bold"
              >
                <Plus className="w-4 h-4 mb-0.5" />
                <span className="text-[10px]">Add</span>
              </button>

              <button
                type="button"
                onClick={() => handleNav('seller-pricing')}
                className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors ${
                  activeRoute === 'seller-pricing' ? 'text-vistara-primary font-bold' : 'text-vistara-secondary'
                }`}
              >
                <DollarSign className="w-4 h-4 mb-0.5" />
                <span className="text-[10px]">Pricing</span>
              </button>

              <button
                type="button"
                onClick={() => setShowMoreDrawer(true)}
                className="flex flex-col items-center justify-center flex-1 py-1 text-vistara-secondary hover:text-vistara-primary transition-colors"
              >
                <Menu className="w-4 h-4 mb-0.5" />
                <span className="text-[10px]">More</span>
              </button>
            </>
          )}

          {/* AGENT MOBILE BAR */}
          {role === 'agent' && (
            <>
              <button
                type="button"
                onClick={() => handleNav('agent-dashboard')}
                className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors ${
                  activeRoute === 'agent-dashboard' ? 'text-vistara-primary font-bold' : 'text-vistara-secondary'
                }`}
              >
                <Briefcase className="w-4 h-4 mb-0.5" />
                <span className="text-[10px]">Cockpit</span>
              </button>

              <button
                type="button"
                onClick={() => handleNav('agent-clients')}
                className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors ${
                  activeRoute === 'agent-clients' ? 'text-vistara-primary font-bold' : 'text-vistara-secondary'
                }`}
              >
                <Users className="w-4 h-4 mb-0.5" />
                <span className="text-[10px]">Clients</span>
              </button>

              <button
                type="button"
                onClick={() => handleNav('agent-matches')}
                className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors ${
                  activeRoute === 'agent-matches' ? 'text-vistara-primary font-bold' : 'text-vistara-secondary'
                }`}
              >
                <Sparkles className="w-4 h-4 mb-0.5 text-vistara-accent" />
                <span className="text-[10px]">Matches</span>
              </button>

              <button
                type="button"
                onClick={() => handleNav('agent-visits')}
                className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors ${
                  activeRoute === 'agent-visits' ? 'text-vistara-primary font-bold' : 'text-vistara-secondary'
                }`}
              >
                <Calendar className="w-4 h-4 mb-0.5" />
                <span className="text-[10px]">Tours</span>
              </button>

              <button
                type="button"
                onClick={() => setShowMoreDrawer(true)}
                className="flex flex-col items-center justify-center flex-1 py-1 text-vistara-secondary hover:text-vistara-primary transition-colors"
              >
                <Menu className="w-4 h-4 mb-0.5" />
                <span className="text-[10px]">More</span>
              </button>
            </>
          )}

        </div>
      </nav>

      {/* "More" Drawer for Mobile */}
      {showMoreDrawer && (
        <div 
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-none flex flex-col justify-end"
          onClick={() => setShowMoreDrawer(false)}
        >
          <div 
            className="bg-vistara-surface border-t border-vistara-border rounded-t-2xl p-5 space-y-4 shadow-2xl max-h-[75vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-vistara-border">
              <span className="font-extrabold text-sm text-vistara-primary">Additional Workspaces</span>
              <button onClick={() => setShowMoreDrawer(false)} className="p-1 text-vistara-secondary">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              {role === 'seeker' && (
                <>
                  <button
                    onClick={() => handleNav('compare')}
                    className="p-3 bg-vistara-elevated rounded-xl border border-vistara-border font-bold text-vistara-primary flex items-center gap-2"
                  >
                    <Scale className="w-4 h-4" />
                    <span>Compare ({compareList.length})</span>
                  </button>

                  <button
                    onClick={() => handleNav('decision-room')}
                    className="p-3 bg-vistara-elevated rounded-xl border border-vistara-border font-bold text-vistara-primary flex items-center gap-2"
                  >
                    <Layers className="w-4 h-4 text-purple-600" />
                    <span>Decision Room</span>
                  </button>

                  <button
                    onClick={() => handleNav('visits')}
                    className="p-3 bg-vistara-elevated rounded-xl border border-vistara-border font-bold text-vistara-primary flex items-center gap-2"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Visits</span>
                  </button>

                  <button
                    onClick={() => {
                      setShowMoreDrawer(false);
                      onOpenFeatures && onOpenFeatures();
                    }}
                    className="p-3 bg-vistara-elevated rounded-xl border border-vistara-accent font-bold text-vistara-accent flex items-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Features</span>
                  </button>
                </>
              )}

              {role === 'seller' && (
                <>
                  <button
                    onClick={() => handleNav('seller-inquiries')}
                    className="p-3 bg-vistara-elevated rounded-xl border border-vistara-border font-bold text-vistara-primary flex items-center gap-2"
                  >
                    <span>Inquiries</span>
                  </button>

                  <button
                    onClick={() => handleNav('seller-visits')}
                    className="p-3 bg-vistara-elevated rounded-xl border border-vistara-border font-bold text-vistara-primary flex items-center gap-2"
                  >
                    <span>Visits</span>
                  </button>

                  <button
                    onClick={() => handleNav('seller-analytics')}
                    className="p-3 bg-vistara-elevated rounded-xl border border-vistara-border font-bold text-vistara-primary flex items-center gap-2"
                  >
                    <BarChart3 className="w-4 h-4" />
                    <span>Analytics</span>
                  </button>

                  <button
                    onClick={() => {
                      setShowMoreDrawer(false);
                      onOpenFeatures ? onOpenFeatures() : handleNav('seller-features');
                    }}
                    className="p-3 bg-vistara-elevated rounded-xl border border-vistara-accent font-bold text-vistara-accent flex items-center gap-2"
                  >
                    <span>Features</span>
                  </button>
                </>
              )}

              {role === 'agent' && (
                <>
                  <button
                    onClick={() => handleNav('agent-properties')}
                    className="p-3 bg-vistara-elevated rounded-xl border border-vistara-border font-bold text-vistara-primary flex items-center gap-2"
                  >
                    <span>Properties</span>
                  </button>

                  <button
                    onClick={() => handleNav('agent-inquiries')}
                    className="p-3 bg-vistara-elevated rounded-xl border border-vistara-border font-bold text-vistara-primary flex items-center gap-2"
                  >
                    <span>Inquiries</span>
                  </button>

                  <button
                    onClick={() => handleNav('agent-analytics')}
                    className="p-3 bg-vistara-elevated rounded-xl border border-vistara-border font-bold text-vistara-primary flex items-center gap-2"
                  >
                    <BarChart3 className="w-4 h-4" />
                    <span>Analytics</span>
                  </button>

                  <button
                    onClick={() => {
                      setShowMoreDrawer(false);
                      onOpenFeatures ? onOpenFeatures() : handleNav('agent-features');
                    }}
                    className="p-3 bg-vistara-elevated rounded-xl border border-vistara-accent font-bold text-vistara-accent flex items-center gap-2"
                  >
                    <span>Features</span>
                  </button>
                </>
              )}
            </div>

            <div className="pt-2 border-t border-vistara-border">
              <button
                onClick={() => {
                  setShowMoreDrawer(false);
                  onOpenProfile && onOpenProfile();
                }}
                className="w-full py-2.5 bg-vistara-elevated rounded-xl border border-vistara-border font-bold text-vistara-primary flex items-center justify-center gap-2"
              >
                <User className="w-4 h-4" />
                <span>Profile & Preferences</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
