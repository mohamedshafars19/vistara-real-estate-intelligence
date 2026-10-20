import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Compass, 
  Scale, 
  Layers, 
  Calendar, 
  Heart, 
  Sparkles, 
  ArrowRight, 
  Building, 
  Briefcase,
  Sliders,
  X
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { parseNaturalLanguageQuery } from '../../utils/naturalLanguageParser';

export function CommandPalette({ isOpen, onClose, onNavigate }) {
  const { properties, savedPropertyIds, visits, compareList, loadDemoPreset } = useApp();
  const [query, setQuery] = useState('');

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const nlParsed = query.trim() ? parseNaturalLanguageQuery(query) : null;

  // Filter matching properties
  const matchingProperties = query.trim()
    ? properties.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.microMarket.toLowerCase().includes(query.toLowerCase()) ||
        p.location.toLowerCase().includes(query.toLowerCase()) ||
        p.amenities.some(a => a.toLowerCase().includes(query.toLowerCase()))
      ).slice(0, 4)
    : [];

  const handleSelect = (route, param) => {
    onClose();
    onNavigate(route, param);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/60 backdrop-blur-none">
      <div className="bg-vistara-surface border border-vistara-border w-full max-w-2xl rounded-xl shadow-popover overflow-hidden flex flex-col">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-vistara-border flex items-center gap-3">
          <Search className="w-5 h-5 text-vistara-accent flex-shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a natural search (e.g. 'Quiet 3BHK near OMR under ₹1.6 Cr') or command..."
            className="w-full bg-transparent text-vistara-primary placeholder:text-vistara-muted focus:outline-none text-base"
          />
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded text-vistara-secondary hover:text-vistara-primary"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Natural Language Search Detection Banner */}
        {nlParsed && Object.keys(nlParsed.detectedParams).length > 0 && (
          <div className="p-3 bg-vistara-elevated border-b border-vistara-border flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-vistara-primary font-medium">
              <Sparkles className="w-4 h-4 text-vistara-accent" />
              <span>Parsed Intent:</span>
              <div className="flex flex-wrap gap-1">
                {Object.entries(nlParsed.detectedParams).map(([k, v]) => (
                  <span key={k} className="bg-vistara-surface border border-vistara-border px-2 py-0.5 rounded text-[11px] font-semibold text-vistara-accent">
                    {v}
                  </span>
                ))}
              </div>
            </div>
            <button
              onClick={() => handleSelect('explore', { nlQuery: query })}
              className="px-2.5 py-1 bg-[#142334] text-white rounded text-[11px] font-semibold hover:bg-[#1D2E40]"
            >
              Search Homes →
            </button>
          </div>
        )}

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-3 space-y-4 text-xs">
          
          {/* Quick Page Jump */}
          <div>
            <div className="text-[10px] uppercase tracking-wider font-bold text-vistara-secondary mb-1.5 px-2">
              Platform Actions
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                onClick={() => handleSelect('explore')}
                className="flex items-center gap-2 p-2 rounded hover:bg-vistara-elevated text-left text-vistara-primary font-medium"
              >
                <Compass className="w-4 h-4 text-vistara-accent" />
                <span>Explore All Chennai Homes</span>
              </button>
              <button
                onClick={() => handleSelect('pulse')}
                className="flex items-center gap-2 p-2 rounded hover:bg-vistara-elevated text-left text-vistara-primary font-medium"
              >
                <Compass className="w-4 h-4 text-emerald-600" />
                <span>Vistara Pulse Proximity Radar</span>
              </button>
              <button
                onClick={() => handleSelect('compare')}
                className="flex items-center gap-2 p-2 rounded hover:bg-vistara-elevated text-left text-vistara-primary font-medium"
              >
                <Scale className="w-4 h-4 text-blue-600" />
                <span>Smart Compare Matrix ({compareList.length} selected)</span>
              </button>
              <button
                onClick={() => handleSelect('decision-room')}
                className="flex items-center gap-2 p-2 rounded hover:bg-vistara-elevated text-left text-vistara-primary font-medium"
              >
                <Layers className="w-4 h-4 text-purple-600" />
                <span>Open Collaborative Decision Room</span>
              </button>
              <button
                onClick={() => handleSelect('visits')}
                className="flex items-center gap-2 p-2 rounded hover:bg-vistara-elevated text-left text-vistara-primary font-medium"
              >
                <Calendar className="w-4 h-4 text-amber-600" />
                <span>Upcoming Visits & Feedback ({visits.length})</span>
              </button>
              <button
                onClick={() => handleSelect('intel-lab')}
                className="flex items-center gap-2 p-2 rounded hover:bg-vistara-elevated text-left text-vistara-primary font-medium"
              >
                <Sliders className="w-4 h-4 text-vistara-accent" />
                <span>Vistara Intelligence Lab (What-If)</span>
              </button>
            </div>
          </div>

          {/* Matching Properties */}
          {matchingProperties.length > 0 && (
            <div>
              <div className="text-[10px] uppercase tracking-wider font-bold text-vistara-secondary mb-1.5 px-2">
                Matching Residences ({matchingProperties.length})
              </div>
              <div className="space-y-1">
                {matchingProperties.map(p => (
                  <div
                    key={p.id}
                    onClick={() => handleSelect('property', p.id)}
                    className="flex items-center justify-between p-2 rounded hover:bg-vistara-elevated cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <img src={p.coverImage} alt={p.name} className="w-10 h-10 rounded object-cover" />
                      <div>
                        <div className="font-semibold text-vistara-primary group-hover:text-vistara-accent">
                          {p.name}
                        </div>
                        <div className="text-[11px] text-vistara-secondary">
                          {p.microMarket} • {p.bhk} BHK • {p.priceDisplay}
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-vistara-secondary group-hover:translate-x-1 transition-transform" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Demo Presets Shortcuts */}
          <div>
            <div className="text-[10px] uppercase tracking-wider font-bold text-vistara-secondary mb-1.5 px-2">
              Demo Story Presets
            </div>
            <div className="flex flex-wrap gap-2 px-2">
              {['First-Time Buyer', 'WFH Professional', 'Family Buyer', 'Renter'].map(preset => (
                <button
                  key={preset}
                  onClick={() => {
                    loadDemoPreset(preset);
                    handleSelect('explore');
                  }}
                  className="px-2.5 py-1 rounded bg-vistara-elevated border border-vistara-border text-vistara-primary hover:border-vistara-accent text-[11px] font-medium"
                >
                  ⚡ {preset}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Footer info */}
        <div className="p-3 bg-vistara-elevated border-t border-vistara-border flex items-center justify-between text-[11px] text-vistara-secondary">
          <span>Tip: Press <kbd className="font-mono bg-vistara-surface border border-vistara-border px-1 py-0.5 rounded">ESC</kbd> to exit command palette</span>
          <span>Zero Custom Backend • Local Spatial State</span>
        </div>
      </div>
    </div>
  );
}
