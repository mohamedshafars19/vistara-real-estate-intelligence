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
  User, 
  Check, 
  Compass, 
  Layers, 
  Sliders, 
  LogOut, 
  ListFilter,
  ChevronDown,
  Sparkles,
  Settings
} from 'lucide-react';
import { VistaraLogo } from '../common/VistaraLogo';
import { useApp } from '../../context/AppContext';
import { FeaturesMegaModal } from '../common/FeaturesMegaModal';
import { ProfileModal } from '../common/ProfileModal';
import { NotificationsPopover } from '../common/NotificationsPopover';
import { getInitials } from '../../utils/userUtils';

export function SeekerNavbar({ activeRoute, onNavigate }) {
  const { 
    theme, 
    setTheme, 
    currentUser, 
    mode, 
    switchMode, 
    logout,
    savedPropertyIds, 
    compareList, 
    notifications,
    setIsCommandPaletteOpen,
    isJudgeDemo
  } = useApp();

  const [showThemeDropdown, setShowThemeDropdown] = useState(false);
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [showFeaturesModal, setShowFeaturesModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="sticky top-0 z-40 bg-vistara-surface border-b border-vistara-border select-none">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        
        {/* Left: Brand & Buy/Rent Mode Toggle */}
        <div className="flex items-center gap-4">
          <div 
            onClick={() => onNavigate('dashboard')}
            className="cursor-pointer"
          >
            <VistaraLogo size="md" />
          </div>

          {/* Mode Pill Toggle (Buy vs Rent) */}
          <div className="hidden sm:flex items-center bg-vistara-elevated p-1 rounded-lg border border-vistara-border text-xs font-semibold">
            <button
              type="button"
              onClick={() => switchMode('buy')}
              className={`px-3 py-1 rounded transition-colors ${
                mode === 'buy'
                  ? 'bg-[#142334] text-white shadow-subtle'
                  : 'text-vistara-secondary hover:text-vistara-primary'
              }`}
            >
              Buy
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
              Rent
            </button>
          </div>

          {isJudgeDemo && (
            <span className="hidden md:inline-flex px-2 py-0.5 rounded bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20 text-[10px] font-bold">
              Judge Demo Mode
            </span>
          )}
        </div>

        {/* Center: Clean Desktop Navigation with "More" dropdown (Section 22) */}
        <nav className="hidden lg:flex items-center gap-1 text-sm font-medium">
          <button
            onClick={() => onNavigate('dashboard')}
            className={`px-3 py-1.5 rounded transition-colors ${
              activeRoute === 'dashboard' ? 'bg-vistara-elevated text-vistara-primary font-semibold' : 'text-vistara-secondary hover:text-vistara-primary'
            }`}
          >
            Dashboard
          </button>

          <button
            onClick={() => onNavigate('explore')}
            className={`px-3 py-1.5 rounded transition-colors ${
              activeRoute === 'explore' ? 'bg-vistara-elevated text-vistara-primary font-semibold' : 'text-vistara-secondary hover:text-vistara-primary'
            }`}
          >
            Explore
          </button>

          <button
            onClick={() => onNavigate('pulse')}
            className={`px-3 py-1.5 rounded transition-colors flex items-center gap-1.5 ${
              activeRoute === 'pulse' ? 'bg-vistara-elevated text-vistara-primary font-semibold' : 'text-vistara-secondary hover:text-vistara-primary'
            }`}
          >
            <Compass className="w-4 h-4 text-vistara-accent" />
            <span>Pulse</span>
          </button>

          {/* "More" Dropdown Menu */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowMoreMenu(!showMoreMenu)}
              className={`px-3 py-1.5 rounded transition-colors flex items-center gap-1 ${
                ['compare', 'decision-room', 'visits', 'intel-lab', 'seeker-features'].includes(activeRoute) || showMoreMenu
                  ? 'bg-vistara-elevated text-vistara-primary font-semibold'
                  : 'text-vistara-secondary hover:text-vistara-primary'
              }`}
            >
              <span>More</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            {showMoreMenu && (
              <div 
                className="absolute left-0 mt-2 w-52 bg-vistara-surface border border-vistara-border shadow-popover rounded-xl py-1.5 z-50 text-xs"
                onMouseLeave={() => setShowMoreMenu(false)}
              >
                <button
                  type="button"
                  onClick={() => { setShowMoreMenu(false); onNavigate('compare'); }}
                  className="w-full px-3.5 py-2 text-left flex items-center justify-between hover:bg-vistara-elevated text-vistara-primary"
                >
                  <span className="flex items-center gap-2"><Scale className="w-4 h-4 text-vistara-secondary" /> Compare Arena</span>
                  {compareList.length > 0 && (
                    <span className="w-4 h-4 rounded-full bg-vistara-accent text-[#142334] text-[10px] font-bold flex items-center justify-center">
                      {compareList.length}
                    </span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => { setShowMoreMenu(false); onNavigate('decision-room'); }}
                  className="w-full px-3.5 py-2 text-left flex items-center gap-2 hover:bg-vistara-elevated text-vistara-primary"
                >
                  <Layers className="w-4 h-4 text-purple-600" />
                  <span>Decision Room</span>
                </button>

                <button
                  type="button"
                  onClick={() => { setShowMoreMenu(false); onNavigate('visits'); }}
                  className="w-full px-3.5 py-2 text-left flex items-center gap-2 hover:bg-vistara-elevated text-vistara-primary"
                >
                  <Calendar className="w-4 h-4 text-vistara-secondary" />
                  <span>Scheduled Visits</span>
                </button>

                <div className="my-1 border-t border-vistara-border/60" />

                <button
                  type="button"
                  onClick={() => { setShowMoreMenu(false); setShowFeaturesModal(true); }}
                  className="w-full px-3.5 py-2 text-left flex items-center gap-2 hover:bg-vistara-elevated text-vistara-accent font-bold"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Features</span>
                </button>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => setShowFeaturesModal(true)}
            className="px-3 py-1.5 rounded transition-colors text-vistara-accent hover:text-vistara-primary hover:bg-vistara-elevated font-semibold flex items-center gap-1.5 text-xs"
            title="Features & Capabilities"
          >
            <ListFilter className="w-3.5 h-3.5" />
            <span>Features</span>
          </button>
        </nav>

        {/* Right Controls: Search, Icon-Only Saved/Visits, Notifications, Theme, Profile */}
        <div className="flex items-center gap-2">
          
          {/* Command Search (Ctrl+K) */}
          <button
            type="button"
            onClick={() => setIsCommandPaletteOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded border border-vistara-border bg-vistara-elevated text-vistara-secondary text-xs hover:border-vistara-accent transition-colors"
            title="Command Search (Ctrl+K)"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Search</span>
            <kbd className="hidden sm:inline bg-vistara-surface px-1.5 py-0.5 rounded text-[10px] font-mono border border-vistara-border">⌘K</kbd>
          </button>

          {/* Icon-Only: Saved Residences */}
          <button
            type="button"
            onClick={() => onNavigate('saved')}
            className={`p-2 rounded border border-vistara-border hover:bg-vistara-elevated transition-colors relative ${
              activeRoute === 'saved' ? 'bg-vistara-elevated text-rose-600' : 'text-vistara-secondary hover:text-vistara-primary'
            }`}
            title="Saved Residences"
          >
            <Heart className="w-4 h-4" />
            {savedPropertyIds.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-600 text-white text-[9px] font-bold flex items-center justify-center shadow-sm">
                {savedPropertyIds.length}
              </span>
            )}
          </button>

          {/* Icon-Only: Visits */}
          <button
            type="button"
            onClick={() => onNavigate('visits')}
            className={`p-2 rounded border border-vistara-border hover:bg-vistara-elevated transition-colors relative ${
              activeRoute === 'visits' ? 'bg-vistara-elevated text-vistara-primary font-bold' : 'text-vistara-secondary hover:text-vistara-primary'
            }`}
            title="Scheduled Walkthroughs"
          >
            <Calendar className="w-4 h-4" />
          </button>

          {/* Interactive Notifications Popover with Full CRUD */}
          <NotificationsPopover onNavigate={onNavigate} />

          {/* Theme Selector */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowThemeDropdown(!showThemeDropdown)}
              className="p-2 rounded border border-vistara-border hover:bg-vistara-elevated transition-colors text-vistara-secondary hover:text-vistara-primary"
              title="Select Theme"
            >
              {theme === 'dark' ? <Moon className="w-4 h-4" /> : theme === 'golden-hour' ? <Sunset className="w-4 h-4 text-amber-600" /> : <Sun className="w-4 h-4" />}
            </button>

            {showThemeDropdown && (
              <div 
                className="absolute right-0 mt-2 w-44 bg-vistara-surface border border-vistara-border shadow-popover rounded-xl py-1 z-50 text-xs"
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
                  <span className="flex items-center gap-2"><Moon className="w-3.5 h-3.5" /> Dark</span>
                  {theme === 'dark' && <Check className="w-3 h-3 text-vistara-accent" />}
                </button>
                <button
                  type="button"
                  onClick={() => { setTheme('golden-hour'); setShowThemeDropdown(false); }}
                  className={`w-full px-3 py-2 text-left flex items-center justify-between hover:bg-vistara-elevated ${theme === 'golden-hour' ? 'font-bold text-vistara-primary' : 'text-vistara-secondary'}`}
                >
                  <span className="flex items-center gap-2"><Sunset className="w-3.5 h-3.5 text-amber-600" /> Golden Hour</span>
                  {theme === 'golden-hour' && <Check className="w-3 h-3 text-vistara-accent" />}
                </button>
              </div>
            )}
          </div>

          {/* Profile Menu */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 p-1.5 pl-2 rounded-full border border-vistara-border bg-vistara-elevated hover:border-vistara-accent transition-colors"
              title="Profile & Settings"
            >
              <div className="w-6 h-6 rounded-full bg-[#142334] text-white flex items-center justify-center font-bold text-[10px]">
                {getInitials(currentUser?.name)}
              </div>
              <span className="hidden sm:inline text-xs font-semibold text-vistara-primary pr-1 max-w-[130px] truncate">
                {currentUser?.name || 'Profile'}
              </span>
            </button>

            {showProfileMenu && (
              <div 
                className="absolute right-0 mt-2 w-56 bg-vistara-surface border border-vistara-border shadow-popover rounded-xl py-1.5 z-50 text-xs"
                onMouseLeave={() => setShowProfileMenu(false)}
              >
                <div className="px-3.5 py-2 border-b border-vistara-border">
                  <div className="font-bold text-vistara-primary truncate">{currentUser?.name || 'Vistara Seeker'}</div>
                  <div className="text-[10px] text-vistara-secondary truncate">{currentUser?.email || 'seeker@vistara.ai'}</div>
                  <div className="mt-1 text-[10px] font-semibold text-emerald-700 dark:text-emerald-300">
                    {currentUser?.lifeProfile?.profileName || 'Quiet Daylight Technologist'}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => { setShowProfileMenu(false); setShowProfileModal(true); }}
                  className="w-full px-3.5 py-2 text-left flex items-center gap-2 hover:bg-vistara-elevated text-vistara-primary"
                >
                  <Settings className="w-3.5 h-3.5" />
                  <span>Preferences & Settings</span>
                </button>

                <div className="my-1 border-t border-vistara-border/60" />

                <button
                  type="button"
                  onClick={() => {
                    setShowProfileMenu(false);
                    logout();
                    onNavigate('login');
                  }}
                  className="w-full px-3.5 py-2 text-left flex items-center gap-2 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Log Out</span>
                </button>
              </div>
            )}
          </div>

        </div>

      </div>

      {/* 50 Capabilities Solid Mega-Modal */}
      <FeaturesMegaModal
        isOpen={showFeaturesModal}
        onClose={() => setShowFeaturesModal(false)}
        onNavigate={onNavigate}
      />

      {/* Comprehensive Profile & Preferences Modal */}
      <ProfileModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        onNavigate={onNavigate}
      />
    </header>
  );
}
