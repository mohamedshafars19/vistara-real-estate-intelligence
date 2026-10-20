import React, { useState } from 'react';
import { Sun, Moon, Sunset, Check, Sparkles, LogIn, UserPlus } from 'lucide-react';
import { VistaraLogo } from '../common/VistaraLogo';
import { Button } from '../common/Button';
import { useApp } from '../../context/AppContext';

export function PublicNavbar({ activeRoute, onNavigate }) {
  const { theme, setTheme, launchJudgeDemo } = useApp();
  const [showThemeDropdown, setShowThemeDropdown] = useState(false);
  const [showDemoDropdown, setShowDemoDropdown] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-vistara-surface border-b border-vistara-border select-none">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        
        {/* Left: Brand Monogram & Wordmark */}
        <div 
          onClick={() => onNavigate('landing')}
          className="cursor-pointer"
        >
          <VistaraLogo size="md" />
        </div>

        {/* Center: Marketing Links Only */}
        <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
          <button
            type="button"
            onClick={() => onNavigate('how-it-works')}
            className={`px-3 py-1.5 rounded transition-colors ${
              activeRoute === 'how-it-works'
                ? 'bg-vistara-elevated text-vistara-primary font-semibold'
                : 'text-vistara-secondary hover:text-vistara-primary'
            }`}
          >
            How It Works
          </button>

          <button
            type="button"
            onClick={() => onNavigate('capabilities')}
            className={`px-3 py-1.5 rounded transition-colors ${
              activeRoute === 'capabilities'
                ? 'bg-vistara-elevated text-vistara-primary font-semibold'
                : 'text-vistara-secondary hover:text-vistara-primary'
            }`}
          >
            Capabilities
          </button>

          <button
            type="button"
            onClick={() => onNavigate('neighborhoods')}
            className={`px-3 py-1.5 rounded transition-colors ${
              activeRoute === 'neighborhoods'
                ? 'bg-vistara-elevated text-vistara-primary font-semibold'
                : 'text-vistara-secondary hover:text-vistara-primary'
            }`}
          >
            Neighborhoods
          </button>

          <button
            type="button"
            onClick={() => onNavigate('premium')}
            className={`px-3 py-1.5 rounded transition-colors ${
              activeRoute === 'premium'
                ? 'bg-vistara-elevated text-vistara-primary font-semibold'
                : 'text-vistara-secondary hover:text-vistara-primary'
            }`}
          >
            Premium
          </button>
        </nav>

        {/* Right: Auth Controls & Demo Launcher */}
        <div className="flex items-center gap-2.5">
          
          {/* Theme Selector */}
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

          {/* Explicit Judge Demo Button */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowDemoDropdown(!showDemoDropdown)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-vistara-accent/15 border border-vistara-accent text-vistara-primary text-xs font-semibold hover:bg-vistara-accent/25 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-vistara-accent" />
              <span>Judge Demo</span>
            </button>

            {showDemoDropdown && (
              <div 
                className="absolute right-0 mt-2 w-56 bg-vistara-surface border border-vistara-border shadow-popover rounded-md py-1.5 z-50 text-xs"
                onMouseLeave={() => setShowDemoDropdown(false)}
              >
                <div className="px-3 py-1.5 text-[10px] uppercase font-bold text-vistara-secondary border-b border-vistara-border">
                  Direct Demo Evaluation
                </div>
                {[
                  { name: 'WFH Professional', role: 'seeker', target: 'dashboard' },
                  { name: 'First-Time Buyer', role: 'seeker', target: 'dashboard' },
                  { name: 'Seller Operations', role: 'seller', target: 'seller-dashboard' },
                  { name: 'Agent CRM', role: 'agent', target: 'agent-dashboard' }
                ].map(demo => (
                  <button
                    key={demo.name}
                    type="button"
                    onClick={() => {
                      launchJudgeDemo(demo.name);
                      setShowDemoDropdown(false);
                      onNavigate(demo.target);
                    }}
                    className="w-full px-3 py-2 text-left hover:bg-vistara-elevated text-vistara-primary font-medium"
                  >
                    ⚡ {demo.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Log In Link */}
          <Button
            size="sm"
            variant="ghost"
            icon={LogIn}
            onClick={() => onNavigate('login')}
          >
            Log In
          </Button>

          {/* Sign Up CTA */}
          <Button
            size="sm"
            variant="primary"
            icon={UserPlus}
            onClick={() => onNavigate('signup')}
          >
            Sign Up
          </Button>

        </div>

      </div>
    </header>
  );
}
