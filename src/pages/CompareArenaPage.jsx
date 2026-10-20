import React, { useState } from 'react';
import { 
  Scale, 
  X, 
  Plus, 
  Check, 
  AlertTriangle, 
  ShieldCheck, 
  Sun, 
  VolumeX, 
  Laptop, 
  MapPin, 
  Eye,
  TrendingUp,
  Sparkles,
  Layers
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { FitScoreBadge } from '../components/common/FitScoreBadge';
import { useApp } from '../context/AppContext';
import { calculateFitScore } from '../utils/fitEngine';

export function CompareArenaPage({ onSelectProperty, onNavigate }) {
  const { 
    properties, 
    currentUser, 
    mode, 
    compareList, 
    toggleCompare,
    reorderCompare,
    decisionRoom,
    addPropertyToDecisionRoom,
    removePropertyFromDecisionRoom 
  } = useApp();

  const [activeLens, setActiveLens] = useState('All Dimensions');
  const [highlightDifferences, setHighlightDifferences] = useState(false);

  // Get selected properties in exact compareList order (up to 4)
  const comparedProperties = (compareList || [])
    .map(id => properties.find(p => p.id === id))
    .filter(Boolean);

  // Compute fit scores using central calculateFitScore
  const propertyFits = comparedProperties.map(p => ({
    property: p,
    fit: calculateFitScore(p, currentUser)
  }));

  const lenses = [
    'All Dimensions',
    'Financials & Fair Price',
    'Home DNA & Lifestyle',
    'Commute & Connectivity',
    'Future Resilience'
  ];

  return (
    <div className="min-h-screen bg-vistara-bg pb-24 text-vistara-primary">
      
      {/* Top Header */}
      <div className="bg-vistara-surface border-b border-vistara-border px-4 sm:px-6 py-6">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Scale className="w-4 h-4 text-vistara-accent" />
              <span className="text-xs uppercase font-bold tracking-wider text-vistara-accent">
                DECISION MATRIX
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-vistara-primary tracking-tight">
              Smart Compare Arena
            </h1>
            <p className="text-xs text-vistara-secondary mt-1">
              Side-by-side structural comparison of up to 4 shortlisted residences.
            </p>
          </div>

          {/* Lens & Difference Toggle */}
          <div className="flex flex-wrap items-center gap-3">
            <label className="flex items-center gap-2 text-xs text-vistara-secondary cursor-pointer select-none">
              <input
                type="checkbox"
                checked={highlightDifferences}
                onChange={(e) => setHighlightDifferences(e.target.checked)}
                className="rounded accent-vistara-accent"
              />
              <span>Highlight Key Differences</span>
            </label>

            <Button
              size="sm"
              variant="secondary"
              onClick={() => onNavigate('explore')}
            >
              + Add More Homes
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 pt-6">
        
        {/* Lens Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {lenses.map(lens => (
            <button
              key={lens}
              onClick={() => setActiveLens(lens)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                activeLens === lens
                  ? 'bg-[#142334] text-white shadow-subtle'
                  : 'bg-vistara-surface text-vistara-secondary hover:text-vistara-primary border border-vistara-border'
              }`}
            >
              {lens}
            </button>
          ))}
        </div>

        {comparedProperties.length === 0 ? (
          /* Empty Compare State */
          <div className="p-12 text-center bg-vistara-surface border border-vistara-border rounded-xl">
            <Scale className="w-12 h-12 text-vistara-muted mx-auto mb-3" />
            <h3 className="font-bold text-vistara-primary text-base">No Residences Selected for Comparison</h3>
            <p className="text-xs text-vistara-secondary max-w-sm mx-auto mt-1 mb-6">
              Select up to 4 properties from the Explore page or Map to compare pricing, Home DNA, commute times, and trade-offs side-by-side.
            </p>
            <Button variant="primary" size="md" onClick={() => onNavigate('explore')}>
              Explore Chennai Homes
            </Button>
          </div>
        ) : (
          /* Comparison Matrix Table */
          <div className="bg-vistara-surface border border-vistara-border rounded-xl shadow-card overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse min-w-[750px]">
              
              {/* Table Header: Property Cards */}
              <thead>
                <tr className="border-b border-vistara-border bg-vistara-elevated">
                  <th className="p-4 w-44 font-semibold text-vistara-secondary uppercase text-[10px] tracking-wider align-top">
                    Properties ({comparedProperties.length}/4)
                  </th>
                  {propertyFits.map(({ property, fit }) => (
                    <th key={property.id} className="p-4 align-top w-64">
                      <div className="relative flex flex-col gap-2">
                        <div className="flex items-center justify-between gap-1">
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() => reorderCompare(property.id, 'left')}
                              className="px-1.5 py-0.5 rounded bg-vistara-surface border border-vistara-border text-vistara-secondary hover:text-vistara-primary text-[10px] font-bold"
                              title="Move Left"
                            >
                              ◀
                            </button>
                            <button
                              type="button"
                              onClick={() => reorderCompare(property.id, 'right')}
                              className="px-1.5 py-0.5 rounded bg-vistara-surface border border-vistara-border text-vistara-secondary hover:text-vistara-primary text-[10px] font-bold"
                              title="Move Right"
                            >
                              ▶
                            </button>
                          </div>
                          <button
                            type="button"
                            onClick={() => toggleCompare(property.id)}
                            className="p-1 rounded-full bg-vistara-surface border border-vistara-border text-vistara-secondary hover:text-rose-600 shadow-subtle"
                            title="Remove from comparison"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        
                        <img
                          src={property.coverImage}
                          alt={property.name}
                          className="w-full h-28 object-cover rounded-lg"
                        />

                        <div className="font-bold text-vistara-primary text-sm line-clamp-1">
                          {property.name}
                        </div>
                        <div className="text-[11px] text-vistara-secondary">
                          {property.microMarket}
                        </div>

                        <div className="flex items-center justify-between mt-1">
                          <FitScoreBadge score={fit.score} size="sm" showLabel={false} />
                          <span className="font-extrabold text-vistara-primary text-base">
                            {mode === 'buy' ? property.priceDisplay : property.rentDisplay}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 mt-1">
                          <Button
                            size="sm"
                            variant="secondary"
                            className="flex-1 text-[11px]"
                            onClick={() => onSelectProperty(property.id)}
                          >
                            View Spatial
                          </Button>
                          {(() => {
                            const inRoom = (decisionRoom?.columns?.mustHave || []).includes(property.id) ||
                                           (decisionRoom?.columns?.niceToHave || []).includes(property.id) ||
                                           (decisionRoom?.columns?.concern || []).includes(property.id) ||
                                           (decisionRoom?.columns?.reject || []).includes(property.id);
                            return (
                              <button
                                type="button"
                                title={inRoom ? "In Decision Room" : "Add to Decision Room"}
                                onClick={() => {
                                  if (inRoom) {
                                    removePropertyFromDecisionRoom(property.id);
                                  } else {
                                    addPropertyToDecisionRoom(property.id, 'mustHave');
                                  }
                                }}
                                className={`p-2 rounded-lg border transition-colors ${
                                  inRoom
                                    ? 'bg-purple-600 text-white border-purple-600'
                                    : 'bg-vistara-surface border-vistara-border text-vistara-primary hover:bg-vistara-elevated'
                                }`}
                              >
                                <Layers className="w-3.5 h-3.5" />
                              </button>
                            );
                          })()}
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-vistara-border">
                
                {/* 1. LifeFit Compatibility */}
                {(activeLens === 'All Dimensions' || activeLens === 'Home DNA & Lifestyle') && (
                  <tr className="hover:bg-vistara-elevated/40">
                    <td className="p-4 font-bold text-vistara-primary bg-vistara-elevated/60">
                      LifeFit Match Score
                    </td>
                    {propertyFits.map(({ property, fit }) => (
                      <td key={property.id} className="p-4">
                        <div className="font-extrabold text-sm text-vistara-primary">
                          {fit.score}% Compatibility
                        </div>
                        <div className="text-[11px] text-vistara-secondary mt-1">
                          {fit.reasons[0] || 'Matches lifestyle profile'}
                        </div>
                      </td>
                    ))}
                  </tr>
                )}

                {/* 2. Space & Area */}
                {(activeLens === 'All Dimensions') && (
                  <tr className="hover:bg-vistara-elevated/40">
                    <td className="p-4 font-bold text-vistara-primary bg-vistara-elevated/60">
                      Configuration & Area
                    </td>
                    {propertyFits.map(({ property }) => (
                      <td key={property.id} className="p-4">
                        <div className="font-bold text-vistara-primary text-sm">
                          {property.bhk} BHK • {property.area.toLocaleString('en-IN')} sq.ft
                        </div>
                        <div className="text-vistara-secondary text-[11px] mt-0.5">
                          {property.propertyType} • {property.floor}
                        </div>
                      </td>
                    ))}
                  </tr>
                )}

                {/* 3. Financial Fair Price & Sq.Ft Rate */}
                {(activeLens === 'All Dimensions' || activeLens === 'Financials & Fair Price') && (
                  <tr className="hover:bg-vistara-elevated/40">
                    <td className="p-4 font-bold text-vistara-primary bg-vistara-elevated/60">
                      Rate / Sq.Ft & Fair Price
                    </td>
                    {propertyFits.map(({ property }) => (
                      <td key={property.id} className="p-4">
                        <div className="font-bold text-vistara-primary">
                          ₹{Math.round(property.price / property.area).toLocaleString('en-IN')} / sq.ft
                        </div>
                        <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {property.fairPrice.status}
                        </span>
                      </td>
                    ))}
                  </tr>
                )}

                {/* 4. Home DNA: Quiet Rating */}
                {(activeLens === 'All Dimensions' || activeLens === 'Home DNA & Lifestyle') && (
                  <tr className="hover:bg-vistara-elevated/40">
                    <td className="p-4 font-bold text-vistara-primary bg-vistara-elevated/60 flex items-center gap-1.5">
                      <VolumeX className="w-3.5 h-3.5 text-vistara-accent" />
                      Quiet Living Index
                    </td>
                    {propertyFits.map(({ property }) => (
                      <td key={property.id} className="p-4 font-semibold text-vistara-primary">
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-vistara-border rounded-full h-2 overflow-hidden">
                            <div className="bg-[#142334] h-full rounded-full" style={{ width: `${property.homeDNA.quiet}%` }} />
                          </div>
                          <span>{property.homeDNA.quiet}/100</span>
                        </div>
                        <div className="text-[10px] text-vistara-secondary mt-0.5">{property.neighborhood.noiseLevel}</div>
                      </td>
                    ))}
                  </tr>
                )}

                {/* 5. Home DNA: Natural Light */}
                {(activeLens === 'All Dimensions' || activeLens === 'Home DNA & Lifestyle') && (
                  <tr className="hover:bg-vistara-elevated/40">
                    <td className="p-4 font-bold text-vistara-primary bg-vistara-elevated/60 flex items-center gap-1.5">
                      <Sun className="w-3.5 h-3.5 text-amber-500" />
                      Natural Daylight
                    </td>
                    {propertyFits.map(({ property }) => (
                      <td key={property.id} className="p-4 font-semibold text-vistara-primary">
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-vistara-border rounded-full h-2 overflow-hidden">
                            <div className="bg-amber-500 h-full rounded-full" style={{ width: `${property.homeDNA.naturalLight}%` }} />
                          </div>
                          <span>{property.homeDNA.naturalLight}/100</span>
                        </div>
                        <div className="text-[10px] text-vistara-secondary mt-0.5 line-clamp-1">{property.sunlight.goldenHourQuality}</div>
                      </td>
                    ))}
                  </tr>
                )}

                {/* 6. Commute to Tidel Park */}
                {(activeLens === 'All Dimensions' || activeLens === 'Commute & Connectivity') && (
                  <tr className="hover:bg-vistara-elevated/40">
                    <td className="p-4 font-bold text-vistara-primary bg-vistara-elevated/60">
                      Commute to Tidel Park
                    </td>
                    {propertyFits.map(({ property }) => (
                      <td key={property.id} className="p-4 font-semibold text-vistara-primary">
                        {property.commute.tidelPark}
                        <div className="text-[10px] text-vistara-secondary font-normal mt-0.5">
                          Metro: {property.commute.metro}
                        </div>
                      </td>
                    ))}
                  </tr>
                )}

                {/* 7. Commute to Airport */}
                {(activeLens === 'All Dimensions' || activeLens === 'Commute & Connectivity') && (
                  <tr className="hover:bg-vistara-elevated/40">
                    <td className="p-4 font-bold text-vistara-primary bg-vistara-elevated/60">
                      Airport Transit
                    </td>
                    {propertyFits.map(({ property }) => (
                      <td key={property.id} className="p-4 font-semibold text-vistara-primary">
                        {property.commute.airport}
                      </td>
                    ))}
                  </tr>
                )}

                {/* 8. Honest Compromise (What You'll Give Up) */}
                <tr className="hover:bg-vistara-elevated/40">
                  <td className="p-4 font-bold text-amber-800 dark:text-amber-400 bg-amber-50/50 dark:bg-amber-950/20 align-top">
                    Honest Compromise
                  </td>
                  {propertyFits.map(({ property }) => (
                    <td key={property.id} className="p-4 text-xs text-vistara-secondary leading-relaxed align-top">
                      {property.tradeoffs[0] || 'Minor architectural trade-off.'}
                    </td>
                  ))}
                </tr>

              </tbody>
            </table>
          </div>
        )}

      </div>

    </div>
  );
}
