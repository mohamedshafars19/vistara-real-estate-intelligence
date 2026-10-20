import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Navigation, Locate, Eye, TrendingDown, Heart, ShieldCheck, Sparkles } from 'lucide-react';
import { PropertyImage } from './PropertyImage';
import { FitScoreBadge } from './FitScoreBadge';
import { useApp } from '../../context/AppContext';
import { calculateFitScore } from '../../utils/fitEngine';

// Center of Chennai (around Adyar / Guindy nexus)
const CHENNAI_CENTER = [12.9900, 80.2400];

function getDistanceMeters(coord1, coord2) {
  if (!coord1 || !coord2) return 999999;
  const R = 6371e3; // metres
  const phi1 = (coord1[0] * Math.PI) / 180;
  const phi2 = (coord2[0] * Math.PI) / 180;
  const deltaPhi = ((coord2[0] - coord1[0]) * Math.PI) / 180;
  const deltaLambda = ((coord2[1] - coord1[1]) * Math.PI) / 180;
  const a =
    Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
    Math.cos(phi1) * Math.cos(phi2) * Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

// Custom HTML Leaflet Icons
function createCustomIcon(property, isSaved, isSelected, isWithinRadius = true, hasPulseActive = false) {
  const isPriceDrop = property.priceDrop?.hasDropped;
  const bgFill = isSelected ? '#C9AD98' : '#142334';
  const textFill = '#FFFFFF';
  const opacity = hasPulseActive && !isWithinRadius ? '0.45' : '1.0';
  const border = isSaved ? '#E11D48' : isSelected ? '#FFFFFF' : (hasPulseActive && isWithinRadius ? '#10B981' : '#FAF6EE');
  const scale = hasPulseActive && !isWithinRadius ? 'scale(0.88)' : (isSelected ? 'scale(1.08)' : 'scale(1)');

  const html = `
    <div style="
      background-color: ${bgFill};
      color: ${textFill};
      opacity: ${opacity};
      padding: 4px 8px;
      border-radius: 8px;
      font-size: 11px;
      font-weight: 800;
      box-shadow: ${hasPulseActive && isWithinRadius ? '0 0 16px rgba(16,185,129,0.5)' : '0 4px 14px rgba(0,0,0,0.3)'};
      border: 2px solid ${border};
      display: flex;
      align-items: center;
      gap: 5px;
      white-space: nowrap;
      cursor: pointer;
      transform: translate(-50%, -50%) ${scale};
      transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    ">
      <span>${property.priceDisplay || '₹ Price'}</span>
      ${isPriceDrop ? '<span style="color:#34D399; font-size:11px;">▼</span>' : ''}
      ${isSaved ? '<span style="color:#FB7185; font-size:10px;">♥</span>' : ''}
      ${hasPulseActive && isWithinRadius ? '<span style="color:#34D399; font-size:9px;">●</span>' : ''}
    </div>
  `;

  return L.divIcon({
    html,
    className: 'custom-vistara-marker',
    iconSize: [84, 28],
    iconAnchor: [42, 14]
  });
}

function createUserLocationIcon() {
  const html = `
    <div style="
      width: 18px;
      height: 18px;
      background-color: #3B82F6;
      border: 3px solid #FFFFFF;
      border-radius: 50%;
      box-shadow: 0 0 12px rgba(59,130,246,0.6);
      transform: translate(-50%, -50%);
    "></div>
  `;
  return L.divIcon({
    html,
    className: 'custom-user-location-marker',
    iconSize: [18, 18],
    iconAnchor: [9, 9]
  });
}

// Controller to pan map when coordinates change
function MapController({ selectedCoords, userCoords, pulseCenter }) {
  const map = useMap();
  useEffect(() => {
    if (selectedCoords) {
      map.flyTo(selectedCoords, 14, { duration: 1.2 });
    } else if (userCoords) {
      map.flyTo(userCoords, 13, { duration: 1.2 });
    } else if (pulseCenter) {
      map.flyTo(pulseCenter, 13.5, { duration: 1.0 });
    }
  }, [selectedCoords, userCoords, pulseCenter, map]);
  return null;
}

export function ChennaiMap({ 
  properties = [], 
  selectedPropertyId = null, 
  onSelectProperty,
  pulseCenter = null,
  pulseRadiusMeters = 0
}) {
  const { savedPropertyIds, mode, currentUser } = useApp();
  const [userLocation, setUserLocation] = useState(null);
  const [locatingStatus, setLocatingStatus] = useState('idle'); // 'idle' | 'requesting' | 'located' | 'denied'

  const selectedProp = properties.find(p => p.id === selectedPropertyId);

  // Explicit user permission geolocation request
  const handleRequestLocation = () => {
    if (!navigator.geolocation) {
      setLocatingStatus('denied');
      return;
    }

    setLocatingStatus('requesting');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = [pos.coords.latitude, pos.coords.longitude];
        setUserLocation(coords);
        setLocatingStatus('located');
      },
      (err) => {
        console.warn('Location permission denied or unavailable, using Chennai demo coordinates:', err);
        setLocatingStatus('denied');
      },
      { timeout: 8000 }
    );
  };

  // Default OpenStreetMap provider: clean, fast, NO API KEY REQUIRED, no broken tiles
  const osmTileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  const osmAttribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

  return (
    <div className="w-full h-full relative rounded-xl overflow-hidden border border-vistara-border shadow-card bg-vistara-elevated">
      
      {/* Top Map Control Bar */}
      <div className="absolute top-3 right-3 z-20 flex items-center gap-2">
        <button
          type="button"
          onClick={handleRequestLocation}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold shadow-subtle border transition-all ${
            locatingStatus === 'located'
              ? 'bg-blue-600 text-white border-blue-600'
              : locatingStatus === 'requesting'
              ? 'bg-vistara-surface text-vistara-primary border-vistara-border animate-pulse'
              : 'bg-vistara-surface/95 text-vistara-primary border-vistara-border hover:bg-vistara-surface'
          }`}
          title="Grant location permission to center on your current position"
        >
          <Locate className="w-3.5 h-3.5" />
          <span>
            {locatingStatus === 'located' 
              ? 'My Location' 
              : locatingStatus === 'requesting' 
              ? 'Locating...' 
              : locatingStatus === 'denied'
              ? 'Chennai Central Hub'
              : 'Use my location'}
          </span>
        </button>
      </div>

      <MapContainer
        center={selectedProp?.coordinates || pulseCenter || CHENNAI_CENTER}
        zoom={12}
        scrollWheelZoom={true}
        className="w-full h-full z-10"
      >
        <TileLayer
          attribution={osmAttribution}
          url={osmTileUrl}
          maxZoom={19}
        />

        <MapController selectedCoords={selectedProp?.coordinates} userCoords={userLocation} pulseCenter={pulseCenter} />

        {/* User Location Pulse Marker if permission granted */}
        {userLocation && (
          <Marker position={userLocation} icon={createUserLocationIcon()}>
            <Popup>
              <div className="p-1 text-xs font-sans">
                <span className="font-bold text-vistara-primary">Your Location</span>
                <p className="text-[11px] text-vistara-secondary mt-0.5">Searching nearby Chennai residences</p>
              </div>
            </Popup>
          </Marker>
        )}

        {/* Pulse Proximity Radius Circle if active */}
        {pulseCenter && pulseRadiusMeters > 0 && (
          <Circle
            center={pulseCenter}
            radius={pulseRadiusMeters}
            pathOptions={{
              color: '#C9AD98',
              fillColor: '#C9AD98',
              fillOpacity: 0.15,
              weight: 2,
              dashArray: '4 4'
            }}
          />
        )}

        {/* Property Markers */}
        {properties.map(property => {
          const isSaved = (savedPropertyIds || []).includes(property.id);
          const isSelected = selectedPropertyId === property.id;
          const hasPulseActive = Boolean(pulseCenter && pulseRadiusMeters > 0);
          const distToPulse = hasPulseActive && property.coordinates 
            ? getDistanceMeters(pulseCenter, property.coordinates) 
            : null;
          const isWithinRadius = hasPulseActive ? (distToPulse !== null && distToPulse <= pulseRadiusMeters) : true;
          
          const customIcon = createCustomIcon(property, isSaved, isSelected, isWithinRadius, hasPulseActive);
          const fitResult = calculateFitScore(property, currentUser);
          const fitScore = fitResult.score;

          return (
            <Marker
              key={property.id}
              position={property.coordinates || CHENNAI_CENTER}
              icon={customIcon}
              eventHandlers={{
                click: () => onSelectProperty && onSelectProperty(property.id)
              }}
            >
              <Popup>
                <div className="p-1.5 max-w-[280px] text-xs font-sans space-y-2">
                  <div className="h-32 w-full rounded-lg overflow-hidden relative bg-vistara-elevated">
                    <img
                      src={property.images?.hero || property.coverImage}
                      alt={property.name}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#142334]/90 text-white text-[10px] font-bold">
                      {property.microMarket}
                    </span>
                    <div className="absolute top-2 right-2 px-2 py-0.5 rounded-lg bg-emerald-600 text-white font-extrabold text-[10px] shadow-sm flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5" />
                      <span>{fitScore}% FIT</span>
                    </div>
                  </div>

                  <div>
                    <div className="font-extrabold text-vistara-primary text-sm line-clamp-1">
                      {property.name}
                    </div>
                    <div className="text-vistara-secondary text-[11px] line-clamp-1">
                      {property.location}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-vistara-border">
                    <div>
                      <span className="font-extrabold text-vistara-primary text-sm block">
                        {mode === 'buy' ? property.priceDisplay : property.rentDisplay}
                      </span>
                      <span className="text-[10px] text-vistara-secondary font-medium">
                        {property.bhk} BHK • {property.area} sq.ft
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => onSelectProperty && onSelectProperty(property.id)}
                      className="px-3.5 py-1.5 bg-[#142334] text-white hover:bg-black rounded-lg font-bold text-xs shadow-sm transition-colors flex items-center gap-1"
                    >
                      <span>View Property</span>
                    </button>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}

