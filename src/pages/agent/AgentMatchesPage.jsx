import React, { useState, useMemo } from 'react';
import { 
  Sparkles, 
  Sliders, 
  Users, 
  Building, 
  Share2, 
  Calendar, 
  BookmarkPlus, 
  Check, 
  ArrowRight, 
  RotateCcw,
  Info,
  CheckCircle2,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import { FitScoreBadge } from '../../components/common/FitScoreBadge';
import { useApp } from '../../context/AppContext';
import { calculateFitScore, clientToUserProfile } from '../../utils/fitEngine';

export function AgentMatchesPage({ onNavigate, onSelectProperty }) {
  const { 
    properties, 
    agentClients, 
    setAgentClients, 
    scheduleVisit 
  } = useApp();

  const [selectedClientId, setSelectedClientId] = useState(agentClients[0]?.id || 'cl-1');
  const selectedClient = agentClients.find(c => c.id === selectedClientId) || agentClients[0];

  // The 7 Interactive Weight Sliders required by specification
  const [weights, setWeights] = useState({
    budget: 25,
    commute: 15,
    space: 15,
    naturalLight: 20,
    quiet: 15,
    green: 5,
    workFriendly: 5
  });

  const [shareSuccess, setShareSuccess] = useState(null);
  const [shortlistSuccess, setShortlistSuccess] = useState(null);

  const resetWeights = () => {
    setWeights({
      budget: 25,
      commute: 15,
      space: 15,
      naturalLight: 20,
      quiet: 15,
      green: 5,
      workFriendly: 5
    });
  };

  // Re-rank properties on the fly using central calculateFitScore engine with custom agent weight overrides
  const rankedResults = useMemo(() => {
    if (!properties || properties.length === 0) return [];
    const clientProfile = clientToUserProfile(selectedClient);

    const totalWeight = Object.values(weights).reduce((a, b) => a + b, 0) || 1;
    const customWeights = {
      budget: weights.budget / totalWeight,
      commute: weights.commute / totalWeight,
      space: weights.space / totalWeight,
      lifestyle: (weights.naturalLight + weights.quiet + weights.green + weights.workFriendly) / (2 * totalWeight),
      homeDNA: (weights.naturalLight + weights.quiet) / (2 * totalWeight),
      location: 0.15,
      futureFit: 0.10
    };

    return properties.map(p => {
      const fitResult = calculateFitScore(p, clientProfile, customWeights);
      const dynamicScore = fitResult.score;

      const reasons = fitResult.reasons && fitResult.reasons.length > 0 ? fitResult.reasons : [
        `Optimal architectural positioning aligned with ${selectedClient?.name}'s parameters.`
      ];

      const tradeoffs = fitResult.compromises && fitResult.compromises.length > 0 ? fitResult.compromises : [
        'Minimal material compromises identified.'
      ];

      return {
        ...p,
        dynamicScore,
        componentScores: {
          budget: fitResult.componentScores?.budget || 85,
          commute: fitResult.componentScores?.commute || 85,
          space: fitResult.componentScores?.space || 85,
          naturalLight: p.homeDNA?.naturalLight || 80,
          quiet: p.homeDNA?.quiet || 75,
          green: p.homeDNA?.green || 70,
          workFriendly: p.homeDNA?.workFriendly || 80
        },
        reasons,
        tradeoffs
      };
    }).sort((a, b) => b.dynamicScore - a.dynamicScore);
  }, [properties, selectedClient, weights]);

  const handleWeightChange = (key, val) => {
    setWeights(prev => ({
      ...prev,
      [key]: parseInt(val, 10)
    }));
  };

  const handleAddToShortlist = (propertyId) => {
    if (!selectedClient) return;
    setAgentClients(prev => prev.map(c => {
      if (c.id === selectedClient.id) {
        const existing = c.assignedProperties || [];
        if (!existing.includes(propertyId)) {
          return { ...c, assignedProperties: [...existing, propertyId] };
        }
      }
      return c;
    }));
    setShortlistSuccess(propertyId);
    setTimeout(() => setShortlistSuccess(null), 2500);
  };

  const handleShareDossier = (property) => {
    setShareSuccess(property.id);
    navigator.clipboard?.writeText(`https://vistara.chennai/match/${selectedClient?.id}/${property.id}`);
    setTimeout(() => setShareSuccess(null), 3000);
  };

  return (
    <div className="min-h-screen bg-vistara-bg pb-24 text-vistara-primary">
      
      {/* Top Header */}
      <div className="bg-vistara-surface border-b border-vistara-border px-4 sm:px-6 py-6">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-4 h-4 text-vistara-accent" />
              <span className="text-xs uppercase font-bold tracking-wider text-vistara-accent">
                DYNAMIC RE-RANKING ENGINE
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-vistara-primary tracking-tight">
              Client ↔ Property Matching
            </h1>
            <p className="text-xs text-vistara-secondary mt-1">
              Adjust weight priorities in real-time. Watch inventory scores and trade-off analyses update immediately.
            </p>
          </div>

          {/* Client Selector Dropdown */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-vistara-elevated px-3 py-1.5 rounded-lg border border-vistara-border">
              <Users className="w-4 h-4 text-vistara-secondary" />
              <span className="text-xs font-medium text-vistara-secondary">Client:</span>
              <select
                value={selectedClientId}
                onChange={(e) => setSelectedClientId(e.target.value)}
                className="bg-transparent text-xs font-bold text-vistara-primary focus:outline-none cursor-pointer"
              >
                {agentClients.map(c => (
                  <option key={c.id} value={c.id} className="bg-vistara-surface text-vistara-primary">
                    {c.name} ({c.type} • {c.budget})
                  </option>
                ))}
              </select>
            </div>

            <Button
              size="sm"
              variant="secondary"
              onClick={resetWeights}
              icon={RotateCcw}
              title="Reset weights to default balance"
            >
              Reset Weights
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 pt-6">
        
        {/* Main Layout: 7-Axis Weight Controls (Left) & Live Ranked Matches (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: 7 Sliders (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="p-5 bg-vistara-surface border border-vistara-border rounded-xl shadow-card sticky top-20">
              <div className="flex items-center justify-between pb-3 border-b border-vistara-border">
                <div className="flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-vistara-accent" />
                  <h3 className="font-bold text-sm text-vistara-primary">7 Matching Sliders</h3>
                </div>
                <span className="text-[11px] font-mono text-vistara-secondary">Real-Time</span>
              </div>

              <div className="mt-4 space-y-4 text-xs">
                
                {/* 1. Budget */}
                <div>
                  <div className="flex justify-between font-semibold text-vistara-primary mb-1">
                    <span>1. Budget Flexibility</span>
                    <span className="font-mono text-vistara-accent">{weights.budget}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={weights.budget}
                    onChange={(e) => handleWeightChange('budget', e.target.value)}
                    className="w-full h-1.5 bg-vistara-border rounded-lg appearance-none cursor-pointer accent-vistara-primary"
                  />
                  <div className="flex justify-between text-[10px] text-vistara-secondary mt-0.5">
                    <span>Loose ceiling</span>
                    <span>Strict budget</span>
                  </div>
                </div>

                {/* 2. Commute */}
                <div>
                  <div className="flex justify-between font-semibold text-vistara-primary mb-1">
                    <span>2. Commute Proximity</span>
                    <span className="font-mono text-vistara-accent">{weights.commute}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={weights.commute}
                    onChange={(e) => handleWeightChange('commute', e.target.value)}
                    className="w-full h-1.5 bg-vistara-border rounded-lg appearance-none cursor-pointer accent-vistara-primary"
                  />
                  <div className="flex justify-between text-[10px] text-vistara-secondary mt-0.5">
                    <span>Flexible transit</span>
                    <span>Sub-15m required</span>
                  </div>
                </div>

                {/* 3. Space */}
                <div>
                  <div className="flex justify-between font-semibold text-vistara-primary mb-1">
                    <span>3. Space & Carpet Area</span>
                    <span className="font-mono text-vistara-accent">{weights.space}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={weights.space}
                    onChange={(e) => handleWeightChange('space', e.target.value)}
                    className="w-full h-1.5 bg-vistara-border rounded-lg appearance-none cursor-pointer accent-vistara-primary"
                  />
                  <div className="flex justify-between text-[10px] text-vistara-secondary mt-0.5">
                    <span>Compact okay</span>
                    <span>Expansive volume</span>
                  </div>
                </div>

                {/* 4. Natural Light */}
                <div>
                  <div className="flex justify-between font-semibold text-vistara-primary mb-1">
                    <span>4. Natural Light & Sunlight</span>
                    <span className="font-mono text-vistara-accent">{weights.naturalLight}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={weights.naturalLight}
                    onChange={(e) => handleWeightChange('naturalLight', e.target.value)}
                    className="w-full h-1.5 bg-vistara-border rounded-lg appearance-none cursor-pointer accent-vistara-primary"
                  />
                  <div className="flex justify-between text-[10px] text-vistara-secondary mt-0.5">
                    <span>Standard glazing</span>
                    <span>Floor-to-ceiling sun</span>
                  </div>
                </div>

                {/* 5. Quiet */}
                <div>
                  <div className="flex justify-between font-semibold text-vistara-primary mb-1">
                    <span>5. Acoustic Stillness / Quiet</span>
                    <span className="font-mono text-vistara-accent">{weights.quiet}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={weights.quiet}
                    onChange={(e) => handleWeightChange('quiet', e.target.value)}
                    className="w-full h-1.5 bg-vistara-border rounded-lg appearance-none cursor-pointer accent-vistara-primary"
                  />
                  <div className="flex justify-between text-[10px] text-vistara-secondary mt-0.5">
                    <span>Urban tolerance</span>
                    <span>Sub-40dB silence</span>
                  </div>
                </div>

                {/* 6. Green */}
                <div>
                  <div className="flex justify-between font-semibold text-vistara-primary mb-1">
                    <span>6. Green & Canopy Proximity</span>
                    <span className="font-mono text-vistara-accent">{weights.green}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={weights.green}
                    onChange={(e) => handleWeightChange('green', e.target.value)}
                    className="w-full h-1.5 bg-vistara-border rounded-lg appearance-none cursor-pointer accent-vistara-primary"
                  />
                  <div className="flex justify-between text-[10px] text-vistara-secondary mt-0.5">
                    <span>Low canopy</span>
                    <span>Parkside living</span>
                  </div>
                </div>

                {/* 7. Work Friendly */}
                <div>
                  <div className="flex justify-between font-semibold text-vistara-primary mb-1">
                    <span>7. Work-Friendly Suitability</span>
                    <span className="font-mono text-vistara-accent">{weights.workFriendly}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={weights.workFriendly}
                    onChange={(e) => handleWeightChange('workFriendly', e.target.value)}
                    className="w-full h-1.5 bg-vistara-border rounded-lg appearance-none cursor-pointer accent-vistara-primary"
                  />
                  <div className="flex justify-between text-[10px] text-vistara-secondary mt-0.5">
                    <span>Standard desks</span>
                    <span>Dual studio + fiber</span>
                  </div>
                </div>

              </div>

              <div className="mt-4 pt-4 border-t border-vistara-border/60 text-[11px] text-vistara-secondary">
                <span className="font-bold text-vistara-primary block mb-0.5">Algorithm Note:</span>
                Scores are recalculated automatically as you move the sliders. Properties dynamically swap positions.
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Ranked Properties (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            
            <div className="flex items-center justify-between pb-1">
              <div>
                <span className="text-xs font-bold text-vistara-primary">
                  {rankedResults.length} Properties Evaluated for {selectedClient?.name}
                </span>
                <span className="text-xs text-vistara-secondary block">
                  Sorted by live weighted compatibility score
                </span>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-600">
                Top Match: {rankedResults[0]?.dynamicScore}%
              </span>
            </div>

            <div className="space-y-4">
              {rankedResults.map((property, idx) => {
                const isTopThree = idx < 3;
                const isShortlisted = selectedClient?.assignedProperties?.includes(property.id);

                return (
                  <div
                    key={property.id}
                    className={`p-5 rounded-xl border bg-vistara-surface shadow-card transition-all ${
                      idx === 0
                        ? 'border-vistara-accent ring-1 ring-vistara-accent/20'
                        : 'border-vistara-border hover:border-vistara-border/80'
                    }`}
                  >
                    <div className="flex flex-col md:flex-row gap-5">
                      
                      {/* Property Thumbnail & Rank */}
                      <div className="relative md:w-56 h-40 rounded-lg overflow-hidden shrink-0 bg-gray-200">
                        <img 
                          src={property.images?.hero || property.coverImage || property.heroImage} 
                          alt={property.name || property.title} 
                          className="w-full h-full object-cover" 
                          loading="lazy" 
                        />
                        
                        {/* Rank Badge */}
                        <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/80 text-white text-xs font-extrabold flex items-center gap-1">
                          <span>#{idx + 1}</span>
                          {idx === 0 && <span className="text-amber-400">★ BEST</span>}
                        </div>

                        {/* Fit Score Badge overlay */}
                        <div className="absolute bottom-2 right-2">
                          <FitScoreBadge score={property.dynamicScore} size="sm" />
                        </div>
                      </div>

                      {/* Property Match Breakdown */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h3 
                                onClick={() => onSelectProperty ? onSelectProperty(property.id) : null}
                                className="font-bold text-base text-vistara-primary hover:text-vistara-accent cursor-pointer transition-colors"
                              >
                                {property.name || property.title}
                              </h3>
                              <p className="text-xs text-vistara-secondary font-medium mt-0.5">
                                {property.bhk} BHK • {(property.area || property.carpetArea || 1800).toLocaleString('en-IN')} sq.ft • {property.microMarket}
                              </p>
                            </div>

                            <div className="text-right">
                              <div className="text-base font-extrabold text-vistara-primary font-mono">{property.priceDisplay}</div>
                              <div className="text-[10px] text-vistara-secondary font-mono">{property.pricePerSqFt || `₹${Math.round((property.priceNum || 15000000) / (property.area || 1800)).toLocaleString('en-IN')}/sq.ft`}</div>
                            </div>
                          </div>

                          {/* Reasons & Strengths */}
                          <div className="mt-3 space-y-1.5 text-xs">
                            <div className="flex items-start gap-1.5 text-emerald-700 dark:text-emerald-400 font-medium">
                              <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                              <span>{property.reasons[0]}</span>
                            </div>
                            <div className="flex items-start gap-1.5 text-amber-700 dark:text-amber-400 text-[11px]">
                              <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                              <span>Trade-off: {property.tradeoffs[0]}</span>
                            </div>
                          </div>
                        </div>

                        {/* Interactive Agent Action Bar */}
                        <div className="mt-4 pt-3 border-t border-vistara-border/60 flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-2 text-[11px] text-vistara-secondary">
                            <span>Light: <strong>{property.componentScores.naturalLight}</strong></span>
                            <span>•</span>
                            <span>Quiet: <strong>{property.componentScores.quiet}</strong></span>
                            <span>•</span>
                            <span>Work: <strong>{property.componentScores.workFriendly}</strong></span>
                          </div>

                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant={isShortlisted ? 'secondary' : 'primary'}
                              onClick={() => handleAddToShortlist(property.id)}
                              icon={isShortlisted ? Check : BookmarkPlus}
                            >
                              {shortlistSuccess === property.id 
                                ? 'Added!' 
                                : isShortlisted 
                                ? 'In Shortlist' 
                                : 'Add to Shortlist'}
                            </Button>

                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleShareDossier(property)}
                              icon={Share2}
                              title="Copy co-branded shareable link for client"
                            >
                              {shareSuccess === property.id ? 'Copied Link!' : 'Share'}
                            </Button>

                            <button
                              type="button"
                              onClick={() => onSelectProperty ? onSelectProperty(property.id) : null}
                              className="p-1.5 text-vistara-secondary hover:text-vistara-primary rounded"
                              title="Open full property intelligence"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                      </div>

                    </div>
                  </div>
                );
              })}
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
