import React, { useState } from 'react';
import { 
  Compass, 
  MapPin, 
  TrendingDown, 
  Heart, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  Radar
} from 'lucide-react';
import { ChennaiMap } from '../components/common/ChennaiMap';
import { FitScoreBadge } from '../components/common/FitScoreBadge';
import { Button } from '../components/common/Button';
import { useApp } from '../context/AppContext';
import { calculateFitScore } from '../utils/fitEngine';

export function PulsePage({ onSelectProperty, onNavigate }) {
  const { properties, currentUser, mode, savedPropertyIds } = useApp();

  // Selected Radius in meters: 500m, 1000m, 2000m, 3000m
  const [radiusMeters, setRadiusMeters] = useState(2000);

  // Default Pulse location: Guindy / Adyar intersection
  const [pulseCenter, setPulseCenter] = useState([13.0067, 80.2575]);
  const [pulseCenterLabel, setPulseCenterLabel] = useState('Adyar / Gandhi Nagar');

  // Locations user can simulate being in:
  const presetLocations = [
    { label: 'Adyar / Gandhi Nagar', coords: [13.0067, 80.2575] },
    { label: 'OMR - Kandanchavadi', coords: [12.9654, 80.2443] },
    { label: 'Besant Nagar Promenade', coords: [13.0002, 80.2687] },
    { label: 'Boat Club Enclave', coords: [13.0232, 80.2458] },
    { label: 'Anna Nagar East', coords: [13.0850, 80.2150] }
  ];

  // Helper to compute approximate distance in meters (Haversine formula)
  const getDistanceMeters = (coord1, coord2) => {
    if (!coord1 || !coord2) return 999999;
    const R = 6371e3; // metres
    const phi1 = coord1[0] * Math.PI / 180;
    const phi2 = coord2[0] * Math.PI / 180;
    const deltaPhi = (coord2[0] - coord1[0]) * Math.PI / 180;
    const deltaLambda = (coord2[1] - coord1[1]) * Math.PI / 180;

    const a = Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
              Math.cos(phi1) * Math.cos(phi2) *
              Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return Math.round(R * c);
  };

  // Find properties within radius
  const nearbyProperties = properties.map(p => {
    const dist = getDistanceMeters(pulseCenter, p.coordinates);
    const fit = calculateFitScore(p, currentUser);
    const isSaved = (savedPropertyIds || []).includes(p.id);
    return { ...p, distanceMeters: dist, fit, isSaved };
  }).filter(p => p.distanceMeters <= radiusMeters)
    .sort((a, b) => a.distanceMeters - b.distanceMeters);

  return (
    <div className="min-h-screen bg-vistara-bg pb-24 text-vistara-primary">
      
      {/* Top Header */}
      <div className="bg-vistara-surface border-b border-vistara-border px-4 sm:px-6 py-6">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Compass className="w-4 h-4 text-vistara-accent" />
              <span className="text-xs uppercase font-bold tracking-wider text-vistara-accent">
                PROXIMITY RADAR
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-vistara-primary tracking-tight">
              Vistara Pulse
            </h1>
            <p className="text-xs text-vistara-secondary mt-1">
              Spatial discovery around your selected location.
            </p>
          </div>

          {/* Simulated Location Selector */}
          <div className="flex items-center gap-2 bg-vistara-elevated p-1 rounded-lg border border-vistara-border text-xs">
            <MapPin className="w-4 h-4 text-vistara-accent ml-2" />
            <span className="text-vistara-secondary font-medium">Your Simulated Spot:</span>
            <select
              value={pulseCenterLabel}
              onChange={(e) => {
                const found = presetLocations.find(l => l.label === e.target.value);
                if (found) {
                  setPulseCenter(found.coords);
                  setPulseCenterLabel(found.label);
                }
              }}
              className="bg-vistara-surface border border-vistara-border rounded px-2 py-1 text-vistara-primary font-semibold focus:outline-none"
            >
              {presetLocations.map(loc => (
                <option key={loc.label} value={loc.label}>{loc.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 pt-6 space-y-6">
        
        {/* Radius Filter Pills */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-vistara-surface p-4 rounded-xl border border-vistara-border shadow-subtle text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-vistara-primary">Detection Radius:</span>
            {[
              { label: '500m Walking', val: 500 },
              { label: '1.0 km Neighborhood', val: 1000 },
              { label: '2.0 km District', val: 2000 },
              { label: '3.0 km Corridor', val: 3000 }
            ].map(r => (
              <button
                key={r.val}
                type="button"
                onClick={() => setRadiusMeters(r.val)}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                  radiusMeters === r.val
                    ? 'bg-[#142334] text-white'
                    : 'bg-vistara-elevated text-vistara-secondary hover:text-vistara-primary border border-vistara-border'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>

          <div className="text-vistara-secondary">
            Detected <strong className="text-vistara-primary">{nearbyProperties.length} residences</strong> within {radiusMeters >= 1000 ? `${radiusMeters/1000} km` : `${radiusMeters}m`}
          </div>
        </div>

        {/* Pulse Grid: Left Signals List, Right Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[600px]">
          
          {/* Left: Nearby Signals Feed */}
          <div className="lg:col-span-5 h-full overflow-y-auto space-y-3 pr-1">
            {nearbyProperties.length === 0 ? (
              <div className="p-8 text-center bg-vistara-surface border border-vistara-border rounded-xl">
                <Compass className="w-10 h-10 text-vistara-muted mx-auto mb-2" />
                <h4 className="font-bold text-vistara-primary text-sm">No Residences Within {radiusMeters}m</h4>
                <p className="text-xs text-vistara-secondary mt-1 mb-4">
                  Expand detection radius to 2.0 km or 3.0 km to uncover nearby architectural enclaves.
                </p>
                <Button size="sm" variant="secondary" onClick={() => setRadiusMeters(3000)}>
                  Expand Radius to 3.0 km
                </Button>
              </div>
            ) : (
              nearbyProperties.map(prop => (
                <div
                  key={prop.id}
                  onClick={() => onSelectProperty(prop.id)}
                  className="p-4 bg-vistara-surface border border-vistara-border rounded-xl shadow-card hover:border-vistara-accent transition-all cursor-pointer flex flex-col justify-between group text-xs"
                >
                  <div className="flex items-start justify-between gap-3">
                    <img
                      src={prop.coverImage}
                      alt={prop.name}
                      className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-1.5 text-[11px] font-bold text-vistara-accent mb-0.5">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{prop.distanceMeters >= 1000 ? `${(prop.distanceMeters/1000).toFixed(1)} km away` : `${prop.distanceMeters}m away`}</span>
                      </div>
                      <h4 className="font-bold text-vistara-primary text-sm group-hover:text-vistara-accent transition-colors line-clamp-1">
                        {prop.name}
                      </h4>
                      <p className="text-vistara-secondary text-[11px] line-clamp-1">
                        {prop.location}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-vistara-border">
                    <div className="flex items-center gap-2">
                      <FitScoreBadge score={prop.fit.score} size="sm" showLabel={false} />
                      <span className="font-bold text-vistara-primary">
                        {mode === 'buy' ? prop.priceDisplay : prop.rentDisplay}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-vistara-secondary group-hover:text-vistara-accent font-semibold text-[11px]">
                      <span>Inspect</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Right: Map with Pulse Circle */}
          <div className="lg:col-span-7 h-full">
            <ChennaiMap
              properties={properties}
              pulseCenter={pulseCenter}
              pulseRadiusMeters={radiusMeters}
              onSelectProperty={(id) => onSelectProperty(id)}
            />
          </div>

        </div>

      </div>

    </div>
  );
}
