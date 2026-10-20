import React, { useState, useEffect } from 'react';
import { 
  User, 
  Settings, 
  Sun, 
  Moon, 
  Sunset, 
  Bell, 
  Shield, 
  Sparkles, 
  DollarSign, 
  Home, 
  LogOut, 
  Check, 
  X,
  Compass,
  CheckCircle2,
  Trash2,
  Download
} from 'lucide-react';
import { Button } from './Button';
import { useApp } from '../../context/AppContext';
import { getInitials } from '../../utils/userUtils';

export function ProfileModal({ isOpen, onClose, onNavigate }) {
  const { 
    currentUser, 
    theme, 
    setTheme, 
    logout, 
    mode, 
    switchMode,
    isJudgeDemo,
    togglePremium,
    updateCurrentUser
  } = useApp();

  const [activeTab, setActiveTab] = useState('lifeProfile'); // 'lifeProfile' | 'preferences' | 'notifications' | 'appearance' | 'premium' | 'privacy' | 'account'

  // Editable Profile State
  const [profileName, setProfileName] = useState(currentUser?.lifeProfile?.profileName || 'Quiet Daylight Technologist');
  const [affinities, setAffinities] = useState(currentUser?.lifeProfile?.affinities || ['Quiet Living', 'Natural Light', 'Work Friendly']);
  const [commuteDest, setCommuteDest] = useState(currentUser?.lifeProfile?.commuteDestination || 'tidelPark');

  // Buy & Rent Prefs
  const [buyBudget, setBuyBudget] = useState(currentUser?.buyPreferences?.maxBudget ? (currentUser.buyPreferences.maxBudget / 10000000) : 1.6);
  const [rentBudget, setRentBudget] = useState(currentUser?.rentPreferences?.maxBudget ? (currentUser.rentPreferences.maxBudget / 1000) : 45);
  const [locations, setLocations] = useState(currentUser?.buyPreferences?.preferredLocations || ['OMR', 'Adyar', 'Besant Nagar']);

  // Notifications toggles
  const [notifPriceDrop, setNotifPriceDrop] = useState(true);
  const [notifVisits, setNotifVisits] = useState(true);
  const [notifMatches, setNotifMatches] = useState(true);

  // Success Feedback
  const [savedFeedback, setSavedFeedback] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSave = () => {
    const updates = {
      lifeProfile: {
        ...(currentUser?.lifeProfile || {}),
        profileName,
        affinities,
        commuteDestination: commuteDest
      },
      buyPreferences: {
        ...(currentUser?.buyPreferences || {}),
        maxBudget: buyBudget * 10000000,
        preferredLocations: locations
      },
      rentPreferences: {
        ...(currentUser?.rentPreferences || {}),
        maxBudget: rentBudget * 1000,
        preferredLocations: locations
      }
    };
    if (updateCurrentUser) {
      updateCurrentUser(updates);
    }
    setSavedFeedback(true);
    setTimeout(() => setSavedFeedback(false), 2000);
  };

  const toggleAffinity = (aff) => {
    setAffinities(prev => prev.includes(aff) ? prev.filter(a => a !== aff) : [...prev, aff]);
  };

  const toggleLocation = (loc) => {
    setLocations(prev => prev.includes(loc) ? prev.filter(l => l !== loc) : [...prev, loc]);
  };

  const handleExportProfile = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(currentUser, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `vistara_profile_${currentUser?.role || 'seeker'}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-none flex items-center justify-center p-4 select-none">
      <div 
        className="w-full max-w-3xl bg-vistara-surface border border-vistara-border rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Header */}
        <div className="p-5 border-b border-vistara-border flex items-center justify-between bg-vistara-elevated">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#142334] text-white flex items-center justify-center font-bold text-sm">
              {getInitials(currentUser?.name)}
            </div>
            <div>
              <h2 className="font-extrabold text-base text-vistara-primary">
                {currentUser?.name || 'Vistara Member'}
              </h2>
              <p className="text-xs text-vistara-secondary font-medium">
                {currentUser?.email || 'demo@vistara.ai'} • <span className="capitalize font-bold text-vistara-accent">{currentUser?.role || 'seeker'}</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-vistara-secondary hover:text-vistara-primary hover:bg-vistara-surface transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Left Tab Sidebar + Right Settings Form */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          
          {/* Left Tabs */}
          <div className="w-full md:w-56 p-3 border-b md:border-b-0 md:border-r border-vistara-border bg-vistara-bg space-y-1 text-xs shrink-0">
            <button
              onClick={() => setActiveTab('lifeProfile')}
              className={`w-full px-3 py-2 rounded-lg text-left font-semibold flex items-center gap-2 transition-colors ${
                activeTab === 'lifeProfile' ? 'bg-[#142334] text-white shadow-sm' : 'text-vistara-secondary hover:text-vistara-primary hover:bg-vistara-elevated'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Life Profile</span>
            </button>

            <button
              onClick={() => setActiveTab('preferences')}
              className={`w-full px-3 py-2 rounded-lg text-left font-semibold flex items-center gap-2 transition-colors ${
                activeTab === 'preferences' ? 'bg-[#142334] text-white shadow-sm' : 'text-vistara-secondary hover:text-vistara-primary hover:bg-vistara-elevated'
              }`}
            >
              <Home className="w-3.5 h-3.5" />
              <span>Buy / Rent Criteria</span>
            </button>

            <button
              onClick={() => setActiveTab('appearance')}
              className={`w-full px-3 py-2 rounded-lg text-left font-semibold flex items-center gap-2 transition-colors ${
                activeTab === 'appearance' ? 'bg-[#142334] text-white shadow-sm' : 'text-vistara-secondary hover:text-vistara-primary hover:bg-vistara-elevated'
              }`}
            >
              <Sun className="w-3.5 h-3.5" />
              <span>Theme & Display</span>
            </button>

            <button
              onClick={() => setActiveTab('notifications')}
              className={`w-full px-3 py-2 rounded-lg text-left font-semibold flex items-center gap-2 transition-colors ${
                activeTab === 'notifications' ? 'bg-[#142334] text-white shadow-sm' : 'text-vistara-secondary hover:text-vistara-primary hover:bg-vistara-elevated'
              }`}
            >
              <Bell className="w-3.5 h-3.5" />
              <span>Notifications</span>
            </button>

            <button
              onClick={() => setActiveTab('premium')}
              className={`w-full px-3 py-2 rounded-lg text-left font-semibold flex items-center gap-2 transition-colors ${
                activeTab === 'premium' ? 'bg-[#142334] text-white shadow-sm' : 'text-vistara-secondary hover:text-vistara-primary hover:bg-vistara-elevated'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Vistara Plus</span>
            </button>

            <button
              onClick={() => setActiveTab('privacy')}
              className={`w-full px-3 py-2 rounded-lg text-left font-semibold flex items-center gap-2 transition-colors ${
                activeTab === 'privacy' ? 'bg-[#142334] text-white shadow-sm' : 'text-vistara-secondary hover:text-vistara-primary hover:bg-vistara-elevated'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Privacy & Storage</span>
            </button>

            <div className="pt-4 border-t border-vistara-border/60">
              <button
                onClick={() => {
                  onClose();
                  logout();
                  onNavigate('login');
                }}
                className="w-full px-3 py-2 rounded-lg text-left font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 flex items-center gap-2 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log Out</span>
              </button>
            </div>
          </div>

          {/* Right Tab Content */}
          <div className="flex-1 p-6 overflow-y-auto space-y-5 text-xs">
            
            {/* 1. Life Profile Tab */}
            {activeTab === 'lifeProfile' && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-base font-extrabold text-vistara-primary">Life Profile Blueprint</h3>
                  <p className="text-xs text-vistara-secondary">Your lifestyle blueprint used by the algorithm to evaluate homes.</p>
                </div>

                <div>
                  <label className="block font-bold text-vistara-primary mb-1">Synthesized Persona Label</label>
                  <input
                    type="text"
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-vistara-elevated border border-vistara-border text-vistara-primary font-medium focus:outline-none focus:border-vistara-accent"
                  />
                </div>

                <div>
                  <label className="block font-bold text-vistara-primary mb-2">Living Priorities & Affinities</label>
                  <div className="grid grid-cols-2 gap-2">
                    {['Quiet Living', 'Natural Light', 'Work Friendly', 'Green', 'Social', 'Family Friendly'].map(aff => {
                      const active = affinities.includes(aff);
                      return (
                        <button
                          key={aff}
                          type="button"
                          onClick={() => toggleAffinity(aff)}
                          className={`p-2.5 rounded-lg border text-left font-semibold flex items-center justify-between transition-colors ${
                            active
                              ? 'bg-vistara-elevated border-vistara-accent text-vistara-primary'
                              : 'bg-vistara-surface border-vistara-border text-vistara-secondary hover:text-vistara-primary'
                          }`}
                        >
                          <span>{aff}</span>
                          {active && <Check className="w-3.5 h-3.5 text-vistara-accent" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-vistara-primary mb-1">Primary Commute Destination</label>
                  <select
                    value={commuteDest}
                    onChange={(e) => setCommuteDest(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-vistara-elevated border border-vistara-border text-vistara-primary cursor-pointer"
                  >
                    <option value="tidelPark">Tidel Park / Ascendas (OMR)</option>
                    <option value="airport">Chennai International Airport</option>
                    <option value="centralStation">Chennai Central Station</option>
                    <option value="ecrBeaches">ECR Coastal Beach Strip</option>
                  </select>
                </div>
              </div>
            )}

            {/* 2. Preferences Tab */}
            {activeTab === 'preferences' && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-base font-extrabold text-vistara-primary">Buy & Rent Search Criteria</h3>
                  <p className="text-xs text-vistara-secondary">Adjust capital limits and target micro-market corridors.</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-vistara-primary mb-1">Buy Budget (Crores)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={buyBudget}
                      onChange={(e) => setBuyBudget(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-lg bg-vistara-elevated border border-vistara-border text-vistara-primary"
                    />
                    <span className="text-[10px] text-vistara-secondary">₹{(buyBudget * 100).toFixed(0)} Lakhs (Max)</span>
                  </div>

                  <div>
                    <label className="block font-bold text-vistara-primary mb-1">Rent Budget (Thousands / mo)</label>
                    <input
                      type="number"
                      step="5"
                      value={rentBudget}
                      onChange={(e) => setRentBudget(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-lg bg-vistara-elevated border border-vistara-border text-vistara-primary"
                    />
                    <span className="text-[10px] text-vistara-secondary">₹{rentBudget}K / month (Max)</span>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-vistara-primary mb-2">Preferred Micro-Markets</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {['OMR', 'Adyar', 'Besant Nagar', 'Boat Club', 'ECR', 'Anna Nagar', 'Kotturpuram', 'Poes Garden'].map(loc => {
                      const active = locations.includes(loc);
                      return (
                        <button
                          key={loc}
                          type="button"
                          onClick={() => toggleLocation(loc)}
                          className={`p-2 rounded-lg border text-left font-semibold flex items-center justify-between transition-colors ${
                            active
                              ? 'bg-vistara-elevated border-vistara-accent text-vistara-primary'
                              : 'bg-vistara-surface border-vistara-border text-vistara-secondary'
                          }`}
                        >
                          <span>{loc}</span>
                          {active && <Check className="w-3 h-3 text-vistara-accent" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* 3. Appearance Tab */}
            {activeTab === 'appearance' && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-base font-extrabold text-vistara-primary">Theme & Color System</h3>
                  <p className="text-xs text-vistara-secondary">Choose your tailored editorial colorway. Persisted locally.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    onClick={() => setTheme('light')}
                    className={`p-4 rounded-xl border text-left space-y-2 transition-all ${
                      theme === 'light' ? 'border-[#142334] ring-2 ring-[#142334]/20 bg-[#F9F6EE]' : 'border-vistara-border bg-vistara-surface'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <Sun className="w-4 h-4 text-amber-500" />
                      {theme === 'light' && <Check className="w-4 h-4 text-[#142334]" />}
                    </div>
                    <div className="font-bold text-sm text-[#142334]">Light</div>
                    <div className="text-[11px] text-[#5F6973]">Warm editorial beige & high-contrast buttons.</div>
                  </button>

                  <button
                    onClick={() => setTheme('dark')}
                    className={`p-4 rounded-xl border text-left space-y-2 transition-all ${
                      theme === 'dark' ? 'border-[#C9AD98] ring-2 ring-[#C9AD98]/20 bg-[#101A27]' : 'border-vistara-border bg-vistara-surface'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <Moon className="w-4 h-4 text-slate-300" />
                      {theme === 'dark' && <Check className="w-4 h-4 text-[#C9AD98]" />}
                    </div>
                    <div className="font-bold text-sm text-[#F9F6EE]">Dark</div>
                    <div className="text-[11px] text-[#C8C5BE]">Deep navy night mode with architectural accents.</div>
                  </button>

                  <button
                    onClick={() => setTheme('golden-hour')}
                    className={`p-4 rounded-xl border text-left space-y-2 transition-all ${
                      theme === 'golden-hour' ? 'border-[#B97856] ring-2 ring-[#B97856]/20 bg-[#F3E4D3]' : 'border-vistara-border bg-vistara-surface'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <Sunset className="w-4 h-4 text-amber-600" />
                      {theme === 'golden-hour' && <Check className="w-4 h-4 text-[#B97856]" />}
                    </div>
                    <div className="font-bold text-sm text-[#142334]">Golden Hour</div>
                    <div className="text-[11px] text-[#725F50]">Warm amber late-afternoon atmospheric glow.</div>
                  </button>
                </div>
              </div>
            )}

            {/* 4. Notifications Tab */}
            {activeTab === 'notifications' && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-base font-extrabold text-vistara-primary">Local Notification Center</h3>
                  <p className="text-xs text-vistara-secondary">Configure alerts for matching homes and scheduled walkthroughs.</p>
                </div>

                <div className="space-y-3">
                  <div className="p-3 bg-vistara-elevated rounded-xl border border-vistara-border flex items-center justify-between">
                    <div>
                      <strong className="block text-vistara-primary font-bold">Price Drop Alerts</strong>
                      <span className="text-[11px] text-vistara-secondary">Notify when saved properties drop below threshold</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={notifPriceDrop}
                      onChange={(e) => setNotifPriceDrop(e.target.checked)}
                      className="rounded accent-[#142334] cursor-pointer"
                    />
                  </div>

                  <div className="p-3 bg-vistara-elevated rounded-xl border border-vistara-border flex items-center justify-between">
                    <div>
                      <strong className="block text-vistara-primary font-bold">Walkthrough Reminders</strong>
                      <span className="text-[11px] text-vistara-secondary">Calendar notifications 2 hours prior to scheduled private visits</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={notifVisits}
                      onChange={(e) => setNotifVisits(e.target.checked)}
                      className="rounded accent-[#142334] cursor-pointer"
                    />
                  </div>

                  <div className="p-3 bg-vistara-elevated rounded-xl border border-vistara-border flex items-center justify-between">
                    <div>
                      <strong className="block text-vistara-primary font-bold">New 90%+ Match Alerts</strong>
                      <span className="text-[11px] text-vistara-secondary">Instant notification when a new home fits your life profile</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={notifMatches}
                      onChange={(e) => setNotifMatches(e.target.checked)}
                      className="rounded accent-[#142334] cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 5. Vistara Plus Tab */}
            {activeTab === 'premium' && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-base font-extrabold text-vistara-primary">Vistara Plus Intelligence</h3>
                  <p className="text-xs text-vistara-secondary">Access deeper spatial models, decision room reports, and acoustic data.</p>
                </div>

                <div className="p-4 bg-vistara-elevated border border-vistara-accent rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-sm text-vistara-primary flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-amber-500" />
                      Vistara Plus Membership
                    </span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-bold text-[10px]">
                      {currentUser?.isPremium ? 'Active Plan' : 'Free Tier'}
                    </span>
                  </div>
                  <p className="text-xs text-vistara-secondary leading-relaxed">
                    Includes CAD blueprint exports, acoustic decibel time logs, and multi-family decision voting tools.
                  </p>
                  <Button
                    size="sm"
                    variant={currentUser?.isPremium ? 'secondary' : 'primary'}
                    onClick={togglePremium}
                  >
                    {currentUser?.isPremium ? 'Downgrade to Standard' : 'Toggle Plus Simulation (Demo)'}
                  </Button>
                </div>
              </div>
            )}

            {/* 6. Privacy & Storage Tab */}
            {activeTab === 'privacy' && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-base font-extrabold text-vistara-primary">Client-Side Privacy & Storage</h3>
                  <p className="text-xs text-vistara-secondary">Your data resides exclusively in your browser's local storage.</p>
                </div>

                <div className="p-4 bg-vistara-elevated rounded-xl border border-vistara-border space-y-3">
                  <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300 font-bold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Zero Custom Backend Principle</span>
                  </div>
                  <p className="text-xs text-vistara-secondary leading-relaxed">
                    No private behavioral data or search histories are broadcast to external third-party tracking servers.
                  </p>
                  <div className="pt-2 flex gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      icon={Download}
                      onClick={handleExportProfile}
                    >
                      Export Profile (JSON)
                    </Button>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-vistara-border bg-vistara-elevated flex items-center justify-between text-xs">
          <span className="text-vistara-secondary">
            {savedFeedback ? <strong className="text-emerald-600 font-bold">✓ Preferences Saved!</strong> : 'Changes stored locally.'}
          </span>
          <div className="flex gap-2">
            <Button size="sm" variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button size="sm" variant="primary" onClick={handleSave}>
              Save Preferences
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
}
