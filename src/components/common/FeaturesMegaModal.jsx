import React, { useState, useEffect, useMemo } from 'react';
import { 
  ListFilter, 
  Search, 
  ArrowRight, 
  CheckCircle2, 
  X, 
  Sparkles, 
  Compass, 
  Scale, 
  Building, 
  Calendar,
  Layers,
  TrendingUp,
  Users,
  Shield,
  Briefcase,
  Sliders,
  DollarSign
} from 'lucide-react';
import { 
  SEEKER_CAPABILITIES, 
  SELLER_CAPABILITIES, 
  AGENT_CAPABILITIES 
} from '../../data/capabilities';
import { useCurrentUser } from '../../context/AppContext';

export function FeaturesMegaModal({ isOpen, onClose, onNavigate }) {
  const { role } = useCurrentUser();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('ALL');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Determine capabilities based on user role
  const rawCapabilities = useMemo(() => {
    if (role === 'seller') return SELLER_CAPABILITIES || [];
    if (role === 'agent') return AGENT_CAPABILITIES || [];
    return SEEKER_CAPABILITIES || [];
  }, [role]);

  // Map to clear, intuitive groups according to Vistara Architecture
  const groupedCapabilities = useMemo(() => {
    return rawCapabilities.map(item => {
      let group = 'DISCOVER';
      const name = item.name.toLowerCase();
      const cat = (item.category || '').toLowerCase();

      if (role === 'seller') {
        if (cat.includes('list') || name.includes('listing') || name.includes('draft') || name.includes('cad')) group = 'LIST & ASSETS';
        else if (cat.includes('price') || cat.includes('valuation') || name.includes('price')) group = 'PRICING';
        else if (cat.includes('lead') || cat.includes('inquiry') || name.includes('buyer')) group = 'INQUIRIES';
        else if (cat.includes('visit') || name.includes('tour') || name.includes('walkthrough')) group = 'WALKTHROUGHS';
        else group = 'SELL INTELLIGENCE';
      } else if (role === 'agent') {
        if (cat.includes('client') || name.includes('client') || name.includes('pipeline')) group = 'CLIENT CRM';
        else if (cat.includes('match') || name.includes('fit') || name.includes('matching')) group = 'MATCH';
        else if (cat.includes('visit') || name.includes('tour')) group = 'WALKTHROUGHS';
        else if (cat.includes('market') || name.includes('pulse')) group = 'TERRITORY';
        else group = 'AGENCY TOOLS';
      } else {
        // Seeker Groups: DISCOVER, UNDERSTAND, EXPLORE, COMPARE, DECIDE
        if (name.includes('3d') || name.includes('floor plan') || name.includes('sunlight') || name.includes('spatial') || name.includes('virtual tour') || cat.includes('spatial')) {
          group = 'EXPLORE';
        } else if (name.includes('fit score') || name.includes('dna') || name.includes('future fit') || name.includes('why') || name.includes('trade-off') || cat.includes('evaluation') || cat.includes('explainability')) {
          group = 'UNDERSTAND';
        } else if (name.includes('compare') || cat.includes('compare') || name.includes('arena')) {
          group = 'COMPARE';
        } else if (name.includes('decision') || name.includes('visit') || name.includes('fair price') || name.includes('emi') || name.includes('affordability') || cat.includes('decision') || cat.includes('visits')) {
          group = 'DECIDE';
        } else {
          group = 'DISCOVER';
        }
      }

      return {
        ...item,
        group
      };
    });
  }, [rawCapabilities, role]);

  const availableGroups = useMemo(() => {
    const groups = Array.from(new Set(groupedCapabilities.map(c => c.group)));
    return ['ALL', ...groups];
  }, [groupedCapabilities]);

  const filteredCapabilities = useMemo(() => {
    return groupedCapabilities.filter(cap => {
      const matchesSearch = !searchQuery || 
        cap.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cap.desc.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesGroup = selectedGroup === 'ALL' || cap.group === selectedGroup;
      return matchesSearch && matchesGroup;
    });
  }, [groupedCapabilities, searchQuery, selectedGroup]);

  if (!isOpen) return null;

  const handleLaunch = (target) => {
    onClose();
    if (onNavigate) {
      onNavigate(target || 'dashboard');
    }
  };

  const getRoleTitle = () => {
    if (role === 'seller') return 'Seller Operations Capabilities';
    if (role === 'agent') return 'Agent Matching Studio Capabilities';
    return 'Home Seeker Intelligence Capabilities';
  };

  const getRoleSubtitle = () => {
    if (role === 'seller') return 'Tools for listing creation, pricing calibration, lead qualification, and walkthrough management.';
    if (role === 'agent') return 'Tools for client Life Profile matching, pipeline tracking, and territory advisory.';
    return 'Personalized discovery, algorithmic fit scoring, spatial exploration, and family decision tools.';
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 select-none"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-[1000px] bg-vistara-surface border border-vistara-border rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] text-vistara-primary"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Mega Menu Header */}
        <div className="p-6 border-b border-vistara-border bg-vistara-elevated flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded bg-vistara-accent/10 border border-vistara-accent/20 text-[10px] uppercase font-bold text-vistara-accent tracking-wider">
                VISTARA CAPABILITIES REGISTRY
              </span>
              <span className="text-xs text-vistara-secondary font-medium">
                • {role ? role.toUpperCase() : 'SEEKER'} EDITION
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-vistara-primary tracking-tight">
              {getRoleTitle()}
            </h2>
            <p className="text-xs text-vistara-secondary mt-1">
              {getRoleSubtitle()}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-vistara-secondary hover:text-vistara-primary hover:bg-vistara-surface transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Category Filter Toolbar */}
        <div className="p-4 border-b border-vistara-border bg-vistara-bg flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="relative w-full sm:w-80">
            <Search className="w-3.5 h-3.5 text-vistara-secondary absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search capability or tool name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-vistara-surface border border-vistara-border rounded-lg text-vistara-primary placeholder:text-vistara-secondary focus:outline-none focus:border-vistara-accent text-xs"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 no-scrollbar">
            {availableGroups.map(grp => (
              <button
                key={grp}
                onClick={() => setSelectedGroup(grp)}
                className={`px-3 py-1 rounded-full text-[11px] font-bold transition-colors whitespace-nowrap ${
                  selectedGroup === grp
                    ? 'bg-vistara-primary text-vistara-surface shadow-xs'
                    : 'bg-vistara-surface border border-vistara-border text-vistara-secondary hover:text-vistara-primary hover:bg-vistara-elevated'
                }`}
              >
                {grp}
              </button>
            ))}
          </div>
        </div>

        {/* Capabilities Grid */}
        <div className="p-6 overflow-y-auto flex-1 bg-vistara-bg/50">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {filteredCapabilities.map(cap => (
              <div 
                key={cap.id}
                onClick={() => handleLaunch(cap.target)}
                className="group p-3.5 rounded-xl bg-vistara-surface border border-vistara-border hover:border-vistara-accent/60 transition-all cursor-pointer flex flex-col justify-between shadow-card hover:shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-vistara-elevated border border-vistara-border text-vistara-accent">
                      {cap.group}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-vistara-secondary group-hover:text-vistara-accent group-hover:translate-x-0.5 transition-all" />
                  </div>
                  
                  <h3 className="font-bold text-xs text-vistara-primary group-hover:text-vistara-accent transition-colors line-clamp-1">
                    {cap.name}
                  </h3>
                  
                  <p className="text-[11px] text-vistara-secondary mt-1 leading-relaxed line-clamp-2">
                    {cap.desc}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-vistara-border/50 flex items-center justify-between text-[10px] text-vistara-secondary">
                  <span>Target: <strong className="text-vistara-primary font-mono">{cap.target}</strong></span>
                  <span className="text-emerald-600 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Ready
                  </span>
                </div>
              </div>
            ))}
          </div>

          {filteredCapabilities.length === 0 && (
            <div className="py-12 text-center text-vistara-secondary">
              <Sparkles className="w-8 h-8 mx-auto text-vistara-secondary/40 mb-2" />
              <p className="font-semibold text-xs text-vistara-primary">No matching capabilities found</p>
              <p className="text-[11px] mt-0.5">Try searching for keywords like "score", "light", "price", or "visit".</p>
            </div>
          )}
        </div>

        {/* Footer info strip */}
        <div className="px-6 py-3 border-t border-vistara-border bg-vistara-surface text-center sm:text-left flex flex-col sm:flex-row items-center justify-between text-[11px] text-vistara-secondary">
          <span>Click any capability card to jump directly to its active workspace</span>
          <span className="text-vistara-primary font-mono font-medium">{filteredCapabilities.length} capabilities ready</span>
        </div>

      </div>
    </div>
  );
}
