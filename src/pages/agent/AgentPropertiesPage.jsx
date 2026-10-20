import React, { useState } from 'react';
import { 
  Building, 
  Search, 
  Filter, 
  MapPin, 
  ShieldCheck, 
  SlidersHorizontal, 
  Sparkles, 
  ArrowRight,
  ExternalLink,
  Plus,
  Compass
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import { PropertyImage } from '../../components/common/PropertyImage';
import { useApp } from '../../context/AppContext';

export function AgentPropertiesPage({ onNavigate, onSelectProperty }) {
  const { properties } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [bhkFilter, setBhkFilter] = useState('all');
  const [locFilter, setLocFilter] = useState('all');

  const filteredProperties = properties.filter(p => {
    const pTitle = (p.name || p.title || '').toLowerCase();
    const pLoc = (p.location || '').toLowerCase();
    const pMicro = (p.microMarket || '').toLowerCase();
    const q = searchQuery.toLowerCase();
    const matchesSearch = !q || pTitle.includes(q) || pLoc.includes(q) || pMicro.includes(q);
    const matchesBhk = bhkFilter === 'all' || (p.bhk && p.bhk.toString() === bhkFilter);
    const matchesLoc = locFilter === 'all' || pMicro.includes(locFilter.toLowerCase());
    return matchesSearch && matchesBhk && matchesLoc;
  });

  return (
    <div className="min-h-screen bg-vistara-bg pb-24 text-vistara-primary">
      
      {/* Top Header */}
      <div className="bg-vistara-surface border-b border-vistara-border px-4 sm:px-6 py-6">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Building className="w-4 h-4 text-vistara-accent" />
              <span className="text-xs uppercase font-bold tracking-wider text-vistara-accent">
                PORTFOLIO & INVENTORY
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-vistara-primary tracking-tight">
              Agency Property Pool
            </h1>
            <p className="text-xs text-vistara-secondary mt-1">
              Chennai residences audited with 6-axis Home DNA, legal titles, and acoustic readings ready for client matching.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="primary"
              onClick={() => onNavigate('agent-matches')}
              icon={Sparkles}
            >
              Match With Client
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 pt-6 space-y-6">
        
        {/* Search & Filter Toolbar */}
        <div className="p-4 bg-vistara-surface border border-vistara-border rounded-xl shadow-card flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-vistara-secondary" />
            <input
              type="text"
              placeholder="Search by building name, enclave, or amenities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-vistara-elevated border border-vistara-border rounded-md text-xs text-vistara-primary focus:outline-none focus:border-vistara-accent"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto text-xs">
            <select
              value={bhkFilter}
              onChange={(e) => setBhkFilter(e.target.value)}
              className="px-3 py-2 bg-vistara-elevated border border-vistara-border rounded-md text-vistara-primary focus:outline-none cursor-pointer"
            >
              <option value="all">All BHKs</option>
              <option value="2">2 BHK</option>
              <option value="3">3 BHK</option>
              <option value="4">4 BHK</option>
              <option value="5">5+ BHK</option>
            </select>

            <select
              value={locFilter}
              onChange={(e) => setLocFilter(e.target.value)}
              className="px-3 py-2 bg-vistara-elevated border border-vistara-border rounded-md text-vistara-primary focus:outline-none cursor-pointer"
            >
              <option value="all">All Micro-Markets</option>
              <option value="boat club">Boat Club</option>
              <option value="poes garden">Poes Garden</option>
              <option value="adyar">Adyar</option>
              <option value="besant nagar">Besant Nagar</option>
              <option value="omr">OMR Corridor</option>
              <option value="ecr">ECR Coastal</option>
              <option value="anna nagar">Anna Nagar</option>
            </select>
          </div>
        </div>

        {/* Property Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map(property => (
            <div
              key={property.id}
              className="bg-vistara-surface border border-vistara-border rounded-xl shadow-card overflow-hidden flex flex-col justify-between hover:border-vistara-accent/40 transition-all"
            >
              <div>
                <div className="relative h-48 bg-gray-200">
                  <PropertyImage
                    src={property.images?.hero || property.coverImage}
                    propertyName={property.name || property.title}
                    microMarket={property.microMarket}
                    aspectRatio="aspect-video"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/75 text-white text-xs font-bold">
                    {property.bhk} BHK • {(property.area || property.carpetArea || 1800).toLocaleString('en-IN')} sq.ft
                  </div>
                  <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-emerald-700 text-white text-[10px] font-bold flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    {property.verification?.status || property.verificationStatus || 'Verified'}
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-center justify-between text-xs text-vistara-secondary mb-1">
                    <span>{property.microMarket}</span>
                    <span className="font-mono font-bold text-vistara-accent">
                      {property.pricePerSqFt || (property.priceNum && property.area ? `₹${Math.round(property.priceNum / property.area).toLocaleString('en-IN')}/sq.ft` : '₹16,500/sq.ft')}
                    </span>
                  </div>

                  <h3 
                    onClick={() => onSelectProperty ? onSelectProperty(property.id) : null}
                    className="font-bold text-base text-vistara-primary hover:text-vistara-accent cursor-pointer transition-colors"
                  >
                    {property.name || property.title}
                  </h3>

                  <div className="mt-2 text-xl font-extrabold text-vistara-primary font-mono">
                    {property.priceDisplay}
                  </div>

                  {/* Home DNA Indicators */}
                  <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-vistara-border/60 text-[11px] text-vistara-secondary">
                    <div>
                      <span className="block text-[10px]">Natural Light</span>
                      <strong className="text-vistara-primary">{property.homeDNA?.naturalLight || 90}/100</strong>
                    </div>
                    <div>
                      <span className="block text-[10px]">Quietness</span>
                      <strong className="text-vistara-primary">{property.homeDNA?.quiet || 85}/100</strong>
                    </div>
                    <div>
                      <span className="block text-[10px]">Work Space</span>
                      <strong className="text-vistara-primary">{property.homeDNA?.workFriendly || 88}/100</strong>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-vistara-elevated border-t border-vistara-border flex items-center justify-between">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => onNavigate('agent-matches')}
                >
                  Match with Client
                </Button>

                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onSelectProperty ? onSelectProperty(property.id) : null}
                  icon={ExternalLink}
                >
                  Intelligence Dossier
                </Button>
              </div>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
}
