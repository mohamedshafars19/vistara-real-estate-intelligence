import React, { useMemo } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Compass, 
  Calendar, 
  Heart, 
  Scale, 
  Layers, 
  MapPin, 
  ShieldCheck, 
  Sun, 
  VolumeX, 
  Laptop,
  ListFilter
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import { FitScoreBadge } from '../../components/common/FitScoreBadge';
import { PropertyCard } from '../../components/common/PropertyCard';
import { useApp } from '../../context/AppContext';
import { rankProperties } from '../../utils/fitEngine';

export function DashboardPage({ onSelectProperty, onNavigate }) {
  const { 
    properties, 
    currentUser, 
    mode, 
    savedPropertyIds, 
    compareList, 
    toggleCompare,
    visits, 
    notifications 
  } = useApp();

  // Dynamically rank properties for current user
  const ranked = useMemo(() => {
    return rankProperties(properties, currentUser);
  }, [properties, currentUser]);

  const bestProperty = ranked[0] || properties[0];
  const upcomingVisits = visits.filter(v => v.status === 'Scheduled');

  return (
    <div className="min-h-screen bg-vistara-bg pb-24 text-vistara-primary text-xs">
      
      {/* Top Banner Header */}
      <div className="bg-vistara-surface border-b border-vistara-border px-4 sm:px-6 py-6">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs uppercase font-bold text-vistara-accent tracking-wider">
                PERSONALIZED DISCOVERY DASHBOARD
              </span>
              <span className="px-2 py-0.5 rounded bg-vistara-elevated border border-vistara-border text-[11px] font-bold text-vistara-primary">
                {currentUser?.lifeProfile?.profileName || 'Quiet Daylight Technologist'}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-vistara-primary tracking-tight">
              Welcome back, {currentUser?.name || 'Seeker'}
            </h1>
            <p className="text-xs text-vistara-secondary mt-1">
              Currently evaluating Chennai residences in <strong>{mode.toUpperCase()}</strong> mode based on your acoustic and sunlight profile.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <Button
              size="sm"
              variant="secondary"
              icon={ListFilter}
              onClick={() => onNavigate('seeker-features')}
            >
              Capabilities
            </Button>
            <Button
              size="sm"
              variant="primary"
              icon={Compass}
              onClick={() => onNavigate('explore')}
            >
              Explore All Homes
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 pt-6 space-y-8">
        
        {/* Quick KPI Overview Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div 
            onClick={() => onNavigate('saved')}
            className="p-4 bg-vistara-surface border border-vistara-border rounded-xl shadow-card hover:border-vistara-accent transition-colors cursor-pointer"
          >
            <div className="flex items-center justify-between text-vistara-secondary">
              <span>Saved Residences</span>
              <Heart className="w-4 h-4 text-rose-500" />
            </div>
            <div className="text-2xl font-extrabold text-vistara-primary mt-2">
              {savedPropertyIds.length}
            </div>
            <div className="text-[10px] text-vistara-secondary mt-0.5">In thematic collections</div>
          </div>

          <div 
            onClick={() => onNavigate('compare')}
            className="p-4 bg-vistara-surface border border-vistara-border rounded-xl shadow-card hover:border-vistara-accent transition-colors cursor-pointer"
          >
            <div className="flex items-center justify-between text-vistara-secondary">
              <span>Compare Arena</span>
              <Scale className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-2xl font-extrabold text-vistara-primary mt-2">
              {compareList.length} / 4
            </div>
            <div className="text-[10px] text-vistara-secondary mt-0.5">Shortlisted for matrix</div>
          </div>

          <div 
            onClick={() => onNavigate('visits')}
            className="p-4 bg-vistara-surface border border-vistara-border rounded-xl shadow-card hover:border-vistara-accent transition-colors cursor-pointer"
          >
            <div className="flex items-center justify-between text-vistara-secondary">
              <span>Upcoming Visits</span>
              <Calendar className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-2xl font-extrabold text-vistara-primary mt-2">
              {upcomingVisits.length}
            </div>
            <div className="text-[10px] text-vistara-secondary mt-0.5">Private walkthroughs</div>
          </div>

          <div 
            onClick={() => onNavigate('pulse')}
            className="p-4 bg-vistara-surface border border-vistara-border rounded-xl shadow-card hover:border-vistara-accent transition-colors cursor-pointer"
          >
            <div className="flex items-center justify-between text-vistara-secondary">
              <span>Vistara Pulse</span>
              <Compass className="w-4 h-4 text-vistara-accent" />
            </div>
            <div className="text-2xl font-extrabold text-vistara-primary mt-2">
              Active
            </div>
            <div className="text-[10px] text-vistara-secondary mt-0.5">Proximity radar listening</div>
          </div>
        </div>

        {/* BEST PROPERTY FOR YOU SPOTLIGHT */}
        <section className="bg-vistara-surface border-2 border-vistara-accent rounded-2xl p-6 shadow-card">
          <div className="flex items-center justify-between pb-3 border-b border-vistara-border mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-vistara-accent" />
              <span className="font-bold uppercase tracking-wider text-vistara-accent text-xs">
                #1 BEST RESIDENCE MATCH FOR YOUR LIFE
              </span>
            </div>
            <span className="bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded text-[11px] border border-emerald-200">
              {bestProperty.fit.score}% LifeFit Match
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-5 aspect-[16/10] rounded-xl overflow-hidden bg-vistara-elevated">
              <img
                src={bestProperty.coverImage}
                alt={bestProperty.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
              <div>
                <div className="text-xs text-vistara-secondary uppercase tracking-wider">
                  {bestProperty.microMarket}
                </div>
                <h3 className="text-2xl font-extrabold text-vistara-primary mt-1">
                  {bestProperty.name}
                </h3>
                <div className="text-lg font-bold text-vistara-primary mt-1">
                  {mode === 'buy' ? bestProperty.priceDisplay : bestProperty.rentDisplay}
                  <span className="text-xs font-normal text-vistara-secondary ml-2">
                    ({bestProperty.bhk} BHK • {bestProperty.area.toLocaleString('en-IN')} sq.ft)
                  </span>
                </div>

                <div className="p-3 bg-vistara-elevated rounded-lg border border-vistara-border mt-3 space-y-1.5 text-xs">
                  <div className="font-semibold text-vistara-primary">Why This Residence Matches You:</div>
                  <p className="text-vistara-secondary">
                    {bestProperty.fit.reasons[0]}
                  </p>
                  <div className="text-amber-800 dark:text-amber-300 font-medium">
                    Trade-off: {bestProperty.tradeoffs[0]}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <Button
                  size="md"
                  variant="primary"
                  onClick={() => onSelectProperty(bestProperty.id)}
                >
                  Explore 3D Spatial Walkthrough →
                </Button>
                <Button
                  size="md"
                  variant="secondary"
                  onClick={() => {
                    if (bestProperty && !compareList.includes(bestProperty.id)) {
                      toggleCompare(bestProperty.id);
                    }
                    onNavigate('compare');
                  }}
                >
                  Compare in Arena
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Top Matching Residences Grid */}
        <section className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-vistara-border">
            <h2 className="text-base font-bold text-vistara-primary">
              Top Ranked Residences for Your Living Rhythm
            </h2>
            <button
              onClick={() => onNavigate('explore')}
              className="text-xs font-semibold text-vistara-accent hover:underline flex items-center gap-1"
            >
              <span>View All ({ranked.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ranked.slice(1, 4).map(prop => (
              <PropertyCard
                key={prop.id}
                property={prop}
                fitScore={prop.fit}
                onSelect={(id) => onSelectProperty(id)}
              />
            ))}
          </div>
        </section>

      </div>

    </div>
  );
}
