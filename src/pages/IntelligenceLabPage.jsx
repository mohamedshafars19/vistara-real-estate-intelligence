import React, { useState, useMemo } from 'react';
import { 
  Sliders, 
  Sparkles, 
  RotateCcw, 
  ArrowRight, 
  VolumeX, 
  Sun, 
  Laptop, 
  Trees, 
  Users, 
  Clock, 
  DollarSign, 
  Building
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { FitScoreBadge } from '../components/common/FitScoreBadge';
import { useApp } from '../context/AppContext';
import { rankProperties } from '../utils/fitEngine';

export function IntelligenceLabPage({ onSelectProperty, onNavigate }) {
  const { properties, user, mode } = useApp();

  // Dynamic weight sliders (0 to 1 scale)
  const [weights, setWeights] = useState({
    budget: 0.20,
    location: 0.15,
    space: 0.15,
    lifestyle: 0.20,
    commute: 0.10,
    homeDNA: 0.10,
    futureFit: 0.10
  });

  // Re-rank properties dynamically with the custom weights
  const dynamicallyRanked = useMemo(() => {
    return rankProperties(properties, user, weights);
  }, [properties, user, weights]);

  const handleSliderChange = (key, value) => {
    setWeights(prev => ({
      ...prev,
      [key]: parseFloat(value)
    }));
  };

  const handleResetWeights = () => {
    setWeights({
      budget: 0.20,
      location: 0.15,
      space: 0.15,
      lifestyle: 0.20,
      commute: 0.10,
      homeDNA: 0.10,
      futureFit: 0.10
    });
  };

  return (
    <div className="min-h-screen bg-vistara-bg pb-24 text-vistara-primary">
      
      {/* Top Header */}
      <div className="bg-vistara-surface border-b border-vistara-border px-4 sm:px-6 py-6">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sliders className="w-4 h-4 text-vistara-accent" />
              <span className="text-xs uppercase font-bold tracking-wider text-vistara-accent">
                RECOMMENDATION ENGINE EXPERIMENTATION
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-vistara-primary tracking-tight">
              Vistara Intelligence Lab & What-If Simulator
            </h1>
            <p className="text-xs text-vistara-secondary mt-1">
              Directly manipulate the multi-dimensional algorithm to observe live re-ranking and explainable trade-offs in real time.
            </p>
          </div>

          <Button
            size="sm"
            variant="secondary"
            icon={RotateCcw}
            onClick={handleResetWeights}
          >
            Reset Default Weights
          </Button>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Weights Cockpit (Sticky) */}
          <div className="lg:col-span-5 bg-vistara-surface border border-vistara-border rounded-xl p-6 shadow-card space-y-5 sticky top-24 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-vistara-border">
              <h3 className="font-bold text-vistara-primary text-sm flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-vistara-accent" />
                Algorithm Weight Controls
              </h3>
              <span className="text-[11px] text-vistara-secondary">Live Reactive Engine</span>
            </div>

            {/* Slider 1: Budget Priority */}
            <div>
              <div className="flex justify-between font-semibold text-vistara-primary mb-1">
                <span>Budget Strictness (Weight: {Math.round(weights.budget * 100)}%)</span>
              </div>
              <input
                type="range"
                min="0.05"
                max="0.45"
                step="0.05"
                value={weights.budget}
                onChange={(e) => handleSliderChange('budget', e.target.value)}
                className="w-full h-1.5 bg-vistara-elevated rounded appearance-none accent-vistara-accent cursor-pointer"
              />
            </div>

            {/* Slider 2: Lifestyle & Daylight */}
            <div>
              <div className="flex justify-between font-semibold text-vistara-primary mb-1">
                <span>Lifestyle & Natural Daylight (Weight: {Math.round(weights.lifestyle * 100)}%)</span>
              </div>
              <input
                type="range"
                min="0.05"
                max="0.45"
                step="0.05"
                value={weights.lifestyle}
                onChange={(e) => handleSliderChange('lifestyle', e.target.value)}
                className="w-full h-1.5 bg-vistara-elevated rounded appearance-none accent-vistara-accent cursor-pointer"
              />
            </div>

            {/* Slider 3: Commute & Transit Tolerance */}
            <div>
              <div className="flex justify-between font-semibold text-vistara-primary mb-1">
                <span>Commute Sensitivity (Weight: {Math.round(weights.commute * 100)}%)</span>
              </div>
              <input
                type="range"
                min="0.05"
                max="0.45"
                step="0.05"
                value={weights.commute}
                onChange={(e) => handleSliderChange('commute', e.target.value)}
                className="w-full h-1.5 bg-vistara-elevated rounded appearance-none accent-vistara-accent cursor-pointer"
              />
            </div>

            {/* Slider 4: Home DNA & Acoustics */}
            <div>
              <div className="flex justify-between font-semibold text-vistara-primary mb-1">
                <span>Home DNA & Acoustic Stillness (Weight: {Math.round(weights.homeDNA * 100)}%)</span>
              </div>
              <input
                type="range"
                min="0.05"
                max="0.45"
                step="0.05"
                value={weights.homeDNA}
                onChange={(e) => handleSliderChange('homeDNA', e.target.value)}
                className="w-full h-1.5 bg-vistara-elevated rounded appearance-none accent-vistara-accent cursor-pointer"
              />
            </div>

            {/* Slider 5: Space & Volume */}
            <div>
              <div className="flex justify-between font-semibold text-vistara-primary mb-1">
                <span>Floor Area & Volume (Weight: {Math.round(weights.space * 100)}%)</span>
              </div>
              <input
                type="range"
                min="0.05"
                max="0.45"
                step="0.05"
                value={weights.space}
                onChange={(e) => handleSliderChange('space', e.target.value)}
                className="w-full h-1.5 bg-vistara-elevated rounded appearance-none accent-vistara-accent cursor-pointer"
              />
            </div>

            {/* Slider 6: Location */}
            <div>
              <div className="flex justify-between font-semibold text-vistara-primary mb-1">
                <span>Micro-Market Strictness (Weight: {Math.round(weights.location * 100)}%)</span>
              </div>
              <input
                type="range"
                min="0.05"
                max="0.45"
                step="0.05"
                value={weights.location}
                onChange={(e) => handleSliderChange('location', e.target.value)}
                className="w-full h-1.5 bg-vistara-elevated rounded appearance-none accent-vistara-accent cursor-pointer"
              />
            </div>

            <div className="p-3 bg-vistara-elevated rounded border border-vistara-border text-[11px] text-vistara-secondary leading-relaxed">
              <strong>Algorithm Proof:</strong> Notice how increasing <em>Commute Sensitivity</em> immediately promotes tech corridor homes in Perungudi/Thoraipakkam, while increasing <em>Acoustic Stillness</em> elevates riverside sanctuaries in Adyar and Boat Club.
            </div>
          </div>

          {/* Right Column: Live Dynamic Ranking Results */}
          <div className="lg:col-span-7 space-y-4 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-vistara-border">
              <span className="font-bold text-vistara-primary">
                Live Re-Ranked Residences ({dynamicallyRanked.length})
              </span>
              <span className="text-[11px] text-vistara-secondary">
                Top match updates instantly as you adjust sliders
              </span>
            </div>

            {dynamicallyRanked.map((prop, index) => (
              <div
                key={prop.id}
                onClick={() => onSelectProperty(prop.id)}
                className="p-4 bg-vistara-surface border border-vistara-border rounded-xl shadow-card hover:border-vistara-accent transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
              >
                <div className="flex items-start gap-4">
                  {/* Rank number badge */}
                  <div className="w-7 h-7 rounded-full bg-[#142334] text-white flex items-center justify-center font-bold text-xs flex-shrink-0 mt-1">
                    #{index + 1}
                  </div>

                  <img
                    src={prop.coverImage}
                    alt={prop.name}
                    className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                  />

                  <div>
                    <div className="font-bold text-vistara-primary text-sm group-hover:text-vistara-accent transition-colors line-clamp-1">
                      {prop.name}
                    </div>
                    <div className="text-vistara-secondary text-[11px] mt-0.5">
                      {prop.microMarket} • {prop.bhk} BHK • {mode === 'buy' ? prop.priceDisplay : prop.rentDisplay}
                    </div>
                    <div className="text-[11px] text-vistara-primary mt-1.5 flex items-center gap-3">
                      <span className="text-amber-600 font-semibold">Light: {prop.homeDNA.naturalLight}</span>
                      <span>•</span>
                      <span className="text-vistara-accent font-semibold">Quiet: {prop.homeDNA.quiet}</span>
                      <span>•</span>
                      <span className="text-sky-600 font-semibold">Commute: {prop.commute.tidelPark}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 pt-2 sm:pt-0">
                  <FitScoreBadge score={prop.fit.score} size="md" showLabel={true} />
                  <ArrowRight className="w-4 h-4 text-vistara-secondary group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

    </div>
  );
}
