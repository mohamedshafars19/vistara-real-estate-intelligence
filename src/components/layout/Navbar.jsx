import React, { useState } from 'react';
import { 
  Search, 
  Heart, 
  Scale, 
  Calendar, 
  Bell, 
  Sun, 
  Moon, 
  Sunset, 
  Languages, 
  User, 
  Check, 
  Sparkles,
  Compass,
  Layers,
  Briefcase,
  Building,
  Sliders,
  ChevronDown
} from 'lucide-react';
import { VistaraLogo } from '../common/VistaraLogo';
import { useApp } from '../../context/AppContext';

export function Navbar({ activeRoute, onNavigate }) {
  const { 
    theme, 
    setTheme, 
    language, 
    setLanguage, 
    t, 
    role, 
    switchRole, 
    mode, 
    switchMode,
    savedPropertyIds,
    compareList,
    notifications,
    setIsCommandPaletteOpen,
    loadDemoPreset
  } = useApp();

  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [showThemeDropdown, setShowThemeDropdown] = useState(false);
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [showDemoDropdown, setShowDemoDropdown] = useState(false);
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="sticky top-0 z-40 bg-vistara-surface border-b border-vistara-border">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        
        {/* Left: Brand Monogram & Wordmark */}
        <div className="flex items-center gap-6">
          <div 
            onClick={() => onNavigate('landing')}
            className="cursor-pointer"
          >
            <VistaraLogo size="md" />
          </div>

          {/* Mode Selector (Buy / Rent) - Only for Home Seeker */}
          {role === 'seeker' && (
            <div className="hidden md:flex items-center bg-vistara-elevated p-1 rounded border border-vistara-border text-xs font-semibold">
              <button
                type="button"
                onClick={() => switchMode('buy')}
                className={`px-3 py-1 rounded transition-colors ${
                  mode === 'buy'
                    ? 'bg-[#142334] text-white shadow-subtle'
                    : 'text-vistara-secondary hover:text-vistara-primary'
                }`}
              >
                {t.nav.buy}
              </button>
              <button
                type="button"
                onClick={() => switchMode('rent')}
                className={`px-3 py-1 rounded transition-colors ${
                  mode === 'rent'
                    ? 'bg-[#142334] text-white shadow-subtle'
                    : 'text-vistara-secondary hover:text-vistara-primary'
                }`}
              >
                {t.nav.rent}
              </button>
            </div>
          )}
        </div>

        {/* Center: Navigation Links based on active role */}
        <nav className="hidden lg:flex items-center gap-1 text-sm font-medium">
          {role === 'seeker' && (
            <>
              <button
                onClick={() => onNavigate('explore')}
                className={`px-3 py-1.5 rounded transition-colors ${
                  activeRoute === 'explore' ? 'bg-vistara-elevated text-vistara-primary font-semibold' : 'text-vistara-secondary hover:text-vistara-primary'
                }`}
              >
                {t.nav.explore}
              </button>
              <button
                onClick={() => onNavigate('pulse')}
                className={`px-3 py-1.5 rounded transition-colors flex items-center gap-1.5 ${
                  activeRoute === 'pulse' ? 'bg-vistara-elevated text-vistara-primary font-semibold' : 'text-vistara-secondary hover:text-vistara-primary'
                }`}
              >
                <Compass className="w-4 h-4 text-vistara-accent" />
                {t.nav.pulse}
              </button>
              <button
                onClick={() => onNavigate('compare')}
                className={`px-3 py-1.5 rounded transition-colors flex items-center gap-1.5 ${
                  activeRoute === 'compare' ? 'bg-vistara-elevated text-vistara-primary font-semibold' : 'text-vistara-secondary hover:text-vistara-primary'
                }`}
              >
                <Scale className="w-4 h-4" />
                {t.nav.compare}
                {compareList.length > 0 && (
                  <span className="w-4 h-4 rounded-full bg-vistara-accent text-[#142334] text-[10px] font-bold flex items-center justify-center">
                    {compareList.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => onNavigate('decision-room')}
                className={`px-3 py-1.5 rounded transition-colors flex items-center gap-1.5 ${
                  activeRoute === 'decision-room' ? 'bg-vistara-elevated text-vistara-primary font-semibold' : 'text-vistara-secondary hover:text-vistara-primary'
                }`}
              >
                <Layers className="w-4 h-4" />
                {t.nav.decisionRoom}
              </button>
              <button
                onClick={() => onNavigate('visits')}
                className={`px-3 py-1.5 rounded transition-colors flex items-center gap-1.5 ${
                  activeRoute === 'visits' ? 'bg-vistara-elevated text-vistara-primary font-semibold' : 'text-vistara-secondary hover:text-vistara-primary'
                }`}
              >
                <Calendar className="w-4 h-4" />
                {t.nav.visits}
              </button>
              <button
                onClick={() => onNavigate('intel-lab')}
                className={`px-3 py-1.5 rounded transition-colors flex items-center gap-1.5 text-vistara-accent font-semibold`}
              >
                <Sliders className="w-4 h-4" />
                {t.nav.intelLab}
              </button>
            </>
          )}

          {role === 'seller' && (
            <>
              <button
                onClick={() => onNavigate('seller-dashboard')}
                className={`px-3 py-1.5 rounded transition-colors ${
                  activeRoute === 'seller-dashboard' ? 'bg-vistara-elevated text-vistara-primary font-semibold' : 'text-vistara-secondary hover:text-vistara-primary'
                }`}
              >
                Operations Cockpit
              </button>
              <button
                onClick={() => onNavigate('seller-listings')}
                className={`px-3 py-1.5 rounded transition-colors ${
                  activeRoute === 'seller-listings' ? 'bg-vistara-elevated text-vistara-primary font-semibold' : 'text-vistara-secondary hover:text-vistara-primary'
                }`}
              >
                Property Listings
              </button>
              <button
                onClick={() => onNavigate('seller-pricing')}
                className={`px-3 py-1.5 rounded transition-colors ${
                  activeRoute === 'seller-pricing' ? 'bg-vistara-elevated text-vistara-primary font-semibold' : 'text-vistara-secondary hover:text-vistara-primary'
                }`}
              >
                Pricing Simulator
              </button>
              <button
                onClick={() => onNavigate('seller-add')}
                className="px-3 py-1.5 rounded bg-[#142334] text-white text-xs font-semibold hover:bg-[#1D2E40]"
              >
                + List New Property
              </button>
            </>
          )}

          {role === 'agent' && (
            <>
              <button
                onClick={() => onNavigate('agent-dashboard')}
                className={`px-3 py-1.5 rounded transition-colors ${
                  activeRoute === 'agent-dashboard' ? 'bg-vistara-elevated text-vistara-primary font-semibold' : 'text-vistara-secondary hover:text-vistara-primary'
                }`}
              >
                Client Pipeline
              </button>
              <button
                onClick={() => onNavigate('agent-matching')}
                className={`px-3 py-1.5 rounded transition-colors flex items-center gap-1.5 ${
                  activeRoute === 'agent-matching' ? 'bg-vistara-elevated text-vistara-primary font-semibold' : 'text-vistara-secondary hover:text-vistara-primary'
                }`}
              >
                <Sparkles className="w-4 h-4 text-vistara-accent" />
                Matching Engine
              </button>
              <button
                onClick={() => onNavigate('agent-clients')}
                className={`px-3 py-1.5 rounded transition-colors ${
                  activeRoute === 'agent-clients' ? 'bg-vistara-elevated text-vistara-primary font-semibold' : 'text-vistara-secondary hover:text-vistara-primary'
                }`}
              >
                Client Database
              </button>
            </>
          )}
        </nav>

        {/* Right Utility Controls */}
        <div className="flex items-center gap-2">
          
          {/* Global Search Command Button (Ctrl+K) */}
          <button
            type="button"
            onClick={() => setIsCommandPaletteOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded border border-vistara-border bg-vistara-elevated text-vistara-secondary text-xs hover:border-vistara-accent transition-colors"
            title="Command Search (Ctrl+K)"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Search Vistara</span>
            <kbd className="hidden sm:inline bg-vistara-surface px-1.5 py-0.5 rounded text-[10px] font-mono border border-vistara-border">⌘K</kbd>
          </button>

          {/* Saved Wishlist Button (Home Seeker) */}
          {role === 'seeker' && (
            <button
              type="button"
              onClick={() => onNavigate('saved')}
              className="relative p-2 rounded text-vistara-secondary hover:text-vistara-primary hover:bg-vistara-elevated transition-colors"
              title="Saved Properties & Collections"
            >
              <Heart className="w-4 h-4" />
              {savedPropertyIds.length > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500" />
              )}
            </button>
          )}

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowNotifDropdown(!showNotifDropdown)}
              className="relative p-2 rounded text-vistara-secondary hover:text-vistara-primary hover:bg-vistara-elevated transition-colors"
              title="Notification Center"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-500" />
              )}
            </button>

            {showNotifDropdown && (
              <div 
                className="absolute right-0 mt-2 w-80 bg-vistara-surface border border-vistara-border shadow-popover rounded-lg p-3 z-50 text-xs"
                onMouseLeave={() => setShowNotifDropdown(false)}
              >
                <div className="flex items-center justify-between pb-2 border-b border-vistara-border font-semibold text-vistara-primary">
                  <span>Notifications</span>
                  <span className="text-[10px] text-vistara-secondary">{notifications.length} updates</span>
                </div>
                <div className="space-y-2.5 mt-2.5 max-h-72 overflow-y-auto">
                  {notifications.map(n => (
                    <div 
                      key={n.id}
                      onClick={() => {
                        setShowNotifDropdown(false);
                        if (n.propertyId) onNavigate('property', n.propertyId);
                      }}
                      className="p-2 rounded bg-vistara-elevated hover:bg-vistara-border/50 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center justify-between text-vistara-primary font-semibold">
                        <span>{n.title}</span>
                        <span className="text-[10px] text-vistara-secondary">{n.date}</span>
                      </div>
                      <p className="text-[11px] text-vistara-secondary mt-1">{n.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Theme Selector (Light, Dark, Golden Hour) */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowThemeDropdown(!showThemeDropdown)}
              className="p-2 rounded text-vistara-secondary hover:text-vistara-primary hover:bg-vistara-elevated transition-colors"
              title="Change Theme"
            >
              {theme === 'dark' ? (
                <Moon className="w-4 h-4" />
              ) : theme === 'golden-hour' ? (
                <Sunset className="w-4 h-4 text-amber-600" />
              ) : (
                <Sun className="w-4 h-4" />
              )}
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

          {/* Language Selector (EN, TA, HI) */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowLangDropdown(!showLangDropdown)}
              className="p-2 rounded text-vistara-secondary hover:text-vistara-primary hover:bg-vistara-elevated transition-colors text-xs font-semibold flex items-center gap-1"
              title="Change Language"
            >
              <Languages className="w-4 h-4" />
              <span className="uppercase">{language}</span>
            </button>

            {showLangDropdown && (
              <div 
                className="absolute right-0 mt-2 w-36 bg-vistara-surface border border-vistara-border shadow-popover rounded-md py-1 z-50 text-xs"
                onMouseLeave={() => setShowLangDropdown(false)}
              >
                <button
                  type="button"
                  onClick={() => { setLanguage('en'); setShowLangDropdown(false); }}
                  className={`w-full px-3 py-2 text-left flex items-center justify-between hover:bg-vistara-elevated ${language === 'en' ? 'font-bold text-vistara-primary' : 'text-vistara-secondary'}`}
                >
                  <span>English</span>
                  {language === 'en' && <Check className="w-3 h-3 text-vistara-accent" />}
                </button>
                <button
                  type="button"
                  onClick={() => { setLanguage('ta'); setShowLangDropdown(false); }}
                  className={`w-full px-3 py-2 text-left flex items-center justify-between hover:bg-vistara-elevated ${language === 'ta' ? 'font-bold text-vistara-primary' : 'text-vistara-secondary'}`}
                >
                  <span>தமிழ் (Tamil)</span>
                  {language === 'ta' && <Check className="w-3 h-3 text-vistara-accent" />}
                </button>
                <button
                  type="button"
                  onClick={() => { setLanguage('hi'); setShowLangDropdown(false); }}
                  className={`w-full px-3 py-2 text-left flex items-center justify-between hover:bg-vistara-elevated ${language === 'hi' ? 'font-bold text-vistara-primary' : 'text-vistara-secondary'}`}
                >
                  <span>हिन्दी (Hindi)</span>
                  {language === 'hi' && <Check className="w-3 h-3 text-vistara-accent" />}
                </button>
              </div>
            )}
          </div>

          {/* Competition Demo Presets Button */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowDemoDropdown(!showDemoDropdown)}
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-vistara-accent/20 border border-vistara-accent text-vistara-primary text-xs font-semibold hover:bg-vistara-accent/30 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-vistara-accent" />
              <span>Demo Presets</span>
              <ChevronDown className="w-3 h-3" />
            </button>

            {showDemoDropdown && (
              <div 
                className="absolute right-0 mt-2 w-52 bg-vistara-surface border border-vistara-border shadow-popover rounded-md py-1 z-50 text-xs"
                onMouseLeave={() => setShowDemoDropdown(false)}
              >
                <div className="px-3 py-1.5 text-[10px] uppercase font-bold text-vistara-secondary border-b border-vistara-border">
                  Instant Judge Profiles
                </div>
                {['First-Time Buyer', 'WFH Professional', 'Family Buyer', 'Renter'].map(preset => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => {
                      loadDemoPreset(preset);
                      setShowDemoDropdown(false);
                      onNavigate('explore');
                    }}
                    className="w-full px-3 py-2 text-left hover:bg-vistara-elevated text-vistara-primary font-medium"
                  >
                    {preset}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Role Switcher (Home Seeker / Seller Studio / Agent CRM) */}
          <div className="relative ml-1">
            <button
              type="button"
              onClick={() => setShowRoleDropdown(!showRoleDropdown)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#142334] text-white text-xs font-semibold hover:bg-[#1D2E40] transition-colors"
            >
              {role === 'seeker' ? <User className="w-3.5 h-3.5" /> : role === 'seller' ? <Building className="w-3.5 h-3.5" /> : <Briefcase className="w-3.5 h-3.5" />}
              <span className="capitalize">{role === 'seeker' ? 'Seeker' : role === 'seller' ? 'Seller Studio' : 'Agent CRM'}</span>
              <ChevronDown className="w-3 h-3 opacity-70" />
            </button>

            {showRoleDropdown && (
              <div 
                className="absolute right-0 mt-2 w-56 bg-vistara-surface border border-vistara-border shadow-popover rounded-md py-1 z-50 text-xs"
                onMouseLeave={() => setShowRoleDropdown(false)}
              >
                <div className="px-3 py-1.5 text-[10px] uppercase font-bold text-vistara-secondary border-b border-vistara-border">
                  Switch Product Experience
                </div>
                <button
                  type="button"
                  onClick={() => { switchRole('seeker'); setShowRoleDropdown(false); onNavigate('explore'); }}
                  className={`w-full px-3 py-2.5 text-left flex items-start gap-2 hover:bg-vistara-elevated ${role === 'seeker' ? 'bg-vistara-elevated font-semibold text-vistara-primary' : 'text-vistara-secondary'}`}
                >
                  <User className="w-4 h-4 mt-0.5 text-vistara-primary" />
                  <div>
                    <div className="font-semibold text-vistara-primary">Home Seeker</div>
                    <div className="text-[10px] text-vistara-secondary">Buy or rent with LifeFit matching</div>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => { switchRole('seller'); setShowRoleDropdown(false); onNavigate('seller-dashboard'); }}
                  className={`w-full px-3 py-2.5 text-left flex items-start gap-2 hover:bg-vistara-elevated ${role === 'seller' ? 'bg-vistara-elevated font-semibold text-vistara-primary' : 'text-vistara-secondary'}`}
                >
                  <Building className="w-4 h-4 mt-0.5 text-vistara-primary" />
                  <div>
                    <div className="font-semibold text-vistara-primary">Seller Studio</div>
                    <div className="text-[10px] text-vistara-secondary">Property Operations & Pricing Studio</div>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => { switchRole('agent'); setShowRoleDropdown(false); onNavigate('agent-dashboard'); }}
                  className={`w-full px-3 py-2.5 text-left flex items-start gap-2 hover:bg-vistara-elevated ${role === 'agent' ? 'bg-vistara-elevated font-semibold text-vistara-primary' : 'text-vistara-secondary'}`}
                >
                  <Briefcase className="w-4 h-4 mt-0.5 text-vistara-primary" />
                  <div>
                    <div className="font-semibold text-vistara-primary">Agent CRM</div>
                    <div className="text-[10px] text-vistara-secondary">Client Matching Engine & Pipeline</div>
                  </div>
                </button>
              </div>
            )}
          </div>

        </div>

      </div>
    </header>
  );
}
