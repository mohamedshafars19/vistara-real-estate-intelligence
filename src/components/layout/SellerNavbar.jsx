import React, { useState } from 'react';
import { 
  Building, 
  Plus, 
  Search, 
  Sun, 
  Moon, 
  Sunset, 
  Check, 
  User, 
  LogOut, 
  ListFilter,
  BarChart3,
  DollarSign,
  Calendar,
  MessageSquare,
  Layers,
  ChevronDown
} from 'lucide-react';
import { VistaraLogo } from '../common/VistaraLogo';
import { Button } from '../common/Button';
import { ProfileModal } from '../common/ProfileModal';
import { FeaturesMegaModal } from '../common/FeaturesMegaModal';
import { NotificationsPopover } from '../common/NotificationsPopover';

export function SellerNavbar({ activeRoute, onNavigate }) {
  const { 
    theme, 
    setTheme, 
    currentUser, 
    logout, 
    setIsCommandPaletteOpen,
    isJudgeDemo 
  } = useApp();

  const [showThemeDropdown, setShowThemeDropdown] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showFeaturesModal, setShowFeaturesModal] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-vistara-surface border-b border-vistara-border select-none">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        
        {/* Left: Brand Monogram & Operations Studio Badge */}
        <div className="flex items-center gap-4">
          <div 
            onClick={() => onNavigate('seller-dashboard')}
            className="cursor-pointer"
          >
            <VistaraLogo size="md" />
          </div>

          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded bg-vistara-elevated border border-vistara-border text-[11px] font-bold text-vistara-primary">
            <Building className="w-3.5 h-3.5 text-vistara-accent" />
            <span className="tracking-wide">OPERATIONS STUDIO</span>
          </div>

          {isJudgeDemo && (
            <span className="hidden md:inline-flex px-2 py-0.5 rounded bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20 text-[10px] font-bold">
              Judge Demo
            </span>
          )}
        </div>

        {/* Center: Seller Navigation */}
        <nav className="hidden lg:flex items-center gap-1 text-sm font-medium">
          <button
            onClick={() => onNavigate('seller-dashboard')}
            className={`px-3 py-1.5 rounded transition-colors ${
              activeRoute === 'seller-dashboard'
                ? 'bg-vistara-elevated text-vistara-primary font-semibold'
                : 'text-vistara-secondary hover:text-vistara-primary'
            }`}
          >
            Dashboard
          </button>

          <button
            onClick={() => onNavigate('seller-listings')}
            className={`px-3 py-1.5 rounded transition-colors ${
              activeRoute === 'seller-listings'
                ? 'bg-vistara-elevated text-vistara-primary font-semibold'
                : 'text-vistara-secondary hover:text-vistara-primary'
            }`}
          >
            Listings
          </button>

          <button
            onClick={() => onNavigate('seller-inquiries')}
            className={`px-3 py-1.5 rounded transition-colors ${
              activeRoute === 'seller-inquiries'
                ? 'bg-vistara-elevated text-vistara-primary font-semibold'
                : 'text-vistara-secondary hover:text-vistara-primary'
            }`}
          >
            Inquiries
          </button>

          <button
            onClick={() => onNavigate('seller-visits')}
            className={`px-3 py-1.5 rounded transition-colors ${
              activeRoute === 'seller-visits'
                ? 'bg-vistara-elevated text-vistara-primary font-semibold'
                : 'text-vistara-secondary hover:text-vistara-primary'
            }`}
          >
            Visits
          </button>

          <button
            onClick={() => onNavigate('seller-pricing')}
            className={`px-3 py-1.5 rounded transition-colors ${
              activeRoute === 'seller-pricing'
                ? 'bg-vistara-elevated text-vistara-primary font-semibold'
                : 'text-vistara-secondary hover:text-vistara-primary'
            }`}
          >
            Pricing
          </button>

          <button
            onClick={() => onNavigate('seller-analytics')}
            className={`px-3 py-1.5 rounded transition-colors ${
              activeRoute === 'seller-analytics'
                ? 'bg-vistara-elevated text-vistara-primary font-semibold'
                : 'text-vistara-secondary hover:text-vistara-primary'
            }`}
          >
            Analytics
          </button>

          <button
            onClick={() => setShowFeaturesModal(true)}
            className={`px-3 py-1.5 rounded transition-colors text-vistara-accent hover:bg-vistara-elevated font-semibold flex items-center gap-1.5`}
            title="Features & Capabilities"
          >
            <ListFilter className="w-4 h-4" />
            Features
          </button>
        </nav>

        {/* Right Controls & Primary CTA */}
        <div className="flex items-center gap-2.5">
          
          {/* Primary CTA: + Add Property */}
          <Button
            size="sm"
            variant="primary"
            icon={Plus}
            onClick={() => onNavigate('seller-add')}
          >
            Add Property
          </Button>

          {/* Command Search */}
          <button
            type="button"
            onClick={() => setIsCommandPaletteOpen(true)}
            className="p-2 rounded text-vistara-secondary hover:text-vistara-primary hover:bg-vistara-elevated transition-colors"
            title="Command Search (Ctrl+K)"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Notifications Popover */}
          <NotificationsPopover onNavigate={onNavigate} />

          {/* Theme Selector */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowThemeDropdown(!showThemeDropdown)}
              className="p-2 rounded text-vistara-secondary hover:text-vistara-primary hover:bg-vistara-elevated transition-colors"
            >
              {theme === 'dark' ? <Moon className="w-4 h-4" /> : theme === 'golden-hour' ? <Sunset className="w-4 h-4 text-amber-600" /> : <Sun className="w-4 h-4" />}
            </button>

            {showThemeDropdown && (
              <div 
                className="absolute right-0 mt-2 w-44 bg-vistara-surface border border-vistara-border shadow-popover rounded-md py-1 z-50 text-xs"
                onMouseLeave={() => setShowThemeDropdown(false)}
              >
                <button
                  type="button"
                  onClick={() => { setTheme('light'); setShowThemeDropdown(false); }}
                  className={`w-full px-3 py-2 text-left flex items-center justify-between hover:bg-vistara-elevated ${theme === 'light' ? 'font-bold text-vistara-primary' : 'text-vistara-secondary'}`}
                >
                  <span className="flex items-center gap-2"><Sun className="w-3.5 h-3.5" /> Light</span>
                  {theme === 'light' && <Check className="w-3 h-3 text-vistara-accent" />}
                </button>
                <button
                  type="button"
                  onClick={() => { setTheme('dark'); setShowThemeDropdown(false); }}
                  className={`w-full px-3 py-2 text-left flex items-center justify-between hover:bg-vistara-elevated ${theme === 'dark' ? 'font-bold text-vistara-primary' : 'text-vistara-secondary'}`}
                >
                  <span className="flex items-center gap-2"><Moon className="w-3.5 h-3.5" /> Dark Architectural</span>
                  {theme === 'dark' && <Check className="w-3 h-3 text-vistara-accent" />}
                </button>
                <button
                  type="button"
                  onClick={() => { setTheme('golden-hour'); setShowThemeDropdown(false); }}
                  className={`w-full px-3 py-2 text-left flex items-center justify-between hover:bg-vistara-elevated ${theme === 'golden-hour' ? 'font-bold text-vistara-primary' : 'text-vistara-secondary'}`}
                >
                  <span className="flex items-center gap-2"><Sunset className="w-3.5 h-3.5 text-amber-600" /> Golden Hour</span>
                  {theme === 'golden-hour' && <Check className="w-3 h-3 text-amber-600" />}
                </button>
              </div>
            )}
          </div>

          {/* Profile & Logout */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-1.5 p-1.5 rounded-lg border border-vistara-border bg-vistara-elevated text-xs font-semibold hover:border-vistara-accent"
            >
              <Building className="w-4 h-4 text-vistara-accent" />
              <span className="max-w-[100px] truncate">{currentUser?.name?.split(' ')[0] || 'Seller'}</span>
              <ChevronDown className="w-3 h-3 text-vistara-secondary" />
            </button>

            {showProfileMenu && (
              <div 
                className="absolute right-0 mt-2 w-56 bg-vistara-surface border border-vistara-border shadow-popover rounded-lg p-2 z-50 text-xs"
                onMouseLeave={() => setShowProfileMenu(false)}
              >
                <div className="p-2 border-b border-vistara-border">
                  <div className="font-bold text-vistara-primary">{currentUser?.name}</div>
                  <div className="text-[11px] text-vistara-secondary truncate">{currentUser?.email}</div>
                  <div className="text-[10px] text-vistara-accent font-semibold mt-1">
                    Role: Property Seller / Operations
                  </div>
                </div>

                <div className="py-1">
                  <button
                    type="button"
                    onClick={() => { setShowProfileMenu(false); setShowProfileModal(true); }}
                    className="w-full p-2 text-left hover:bg-vistara-elevated rounded text-vistara-primary font-medium"
                  >
                    Studio Settings & Preferences
                  </button>
                  <button
                    type="button"
                    onClick={() => { setShowProfileMenu(false); onNavigate('role-select'); }}
                    className="w-full p-2 text-left hover:bg-vistara-elevated rounded text-vistara-secondary"
                  >
                    Switch Role to Seeker or Agent
                  </button>
                </div>

                <div className="pt-1 border-t border-vistara-border">
                  <button
                    type="button"
                    onClick={() => {
                      setShowProfileMenu(false);
                      logout();
                      onNavigate('landing');
                    }}
                    className="w-full p-2 text-left hover:bg-rose-50 text-rose-600 font-semibold rounded flex items-center gap-2"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Log Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>

      <ProfileModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        onNavigate={onNavigate}
      />

      <FeaturesMegaModal
        isOpen={showFeaturesModal}
        onClose={() => setShowFeaturesModal(false)}
        onNavigate={onNavigate}
      />
    </header>
  );
}
