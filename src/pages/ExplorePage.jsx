import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Map as MapIcon, 
  Grid, 
  SlidersHorizontal, 
  Sparkles, 
  TrendingDown, 
  RotateCcw,
  Check,
  ChevronDown
} from 'lucide-react';
import { PropertyCard } from '../components/common/PropertyCard';
import { ChennaiMap } from '../components/common/ChennaiMap';
import { Button } from '../components/common/Button';
import { useApp } from '../context/AppContext';
import { rankProperties } from '../utils/fitEngine';
import { parseNaturalLanguageQuery, filterPropertiesByNL } from '../utils/naturalLanguageParser';

export function ExplorePage({ onSelectProperty, initialNLQuery = '' }) {
  const { properties, currentUser, mode, switchMode } = useApp();

  const [searchQuery, setSearchQuery] = useState(initialNLQuery);
  const [selectedBHK, setSelectedBHK] = useState(null);
  const [selectedMicroMarket, setSelectedMicroMarket] = useState('All');
  const [selectedLifestyle, setSelectedLifestyle] = useState('All');
  const [selectedSort, setSelectedSort] = useState('match'); // 'match' | 'price-asc' | 'price-desc' | 'largest' | 'price-drop'
  const [viewMode, setViewMode] = useState('split'); // 'split' | 'grid'
  const [focusedPropertyId, setFocusedPropertyId] = useState(null);
  const [showFiltersDrawer, setShowFiltersDrawer] = useState(false);

  // Micro-market filter options
  const microMarkets = ['All', 'Boat Club', 'Besant Nagar', 'OMR - Thoraipakkam', 'OMR - Perungudi', 'ECR', 'Adyar', 'Anna Nagar', 'Kotturpuram', 'Poes Garden', 'Velachery', 'Nungambakkam'];

  // Lifestyle affinities
  const lifestyles = ['All', 'Quiet Living', 'Natural Light', 'Work Friendly', 'Green', 'Social', 'Family Friendly'];

  // Parse natural language if present
  const parsedNL = useMemo(() => {
    return searchQuery.trim() ? parseNaturalLanguageQuery(searchQuery) : null;
  }, [searchQuery]);

  // Rank all properties using real Fit Engine
  const rankedAll = useMemo(() => {
    return rankProperties(properties, currentUser);
  }, [properties, currentUser]);

  // Filter properties
  const filteredProperties = useMemo(() => {
    let result = [...rankedAll];

    // Apply NL filter if user typed intent
    if (parsedNL) {
      result = filterPropertiesByNL(result, parsedNL);
    }

    // Manual BHK filter
    if (selectedBHK) {
      result = result.filter(p => p.bhk === selectedBHK);
    }

    // Manual Micro-market filter
    if (selectedMicroMarket !== 'All') {
      result = result.filter(p => p.microMarket.toLowerCase().includes(selectedMicroMarket.toLowerCase()));
    }

    // Manual Lifestyle filter
    if (selectedLifestyle !== 'All') {
      if (selectedLifestyle === 'Quiet Living') result = result.filter(p => p.homeDNA.quiet >= 80);
      else if (selectedLifestyle === 'Natural Light') result = result.filter(p => p.homeDNA.naturalLight >= 84);
      else if (selectedLifestyle === 'Work Friendly') result = result.filter(p => p.homeDNA.workFriendly >= 85);
      else if (selectedLifestyle === 'Green') result = result.filter(p => p.homeDNA.green >= 80);
      else if (selectedLifestyle === 'Social') result = result.filter(p => p.homeDNA.social >= 80);
      else if (selectedLifestyle === 'Family Friendly') result = result.filter(p => p.homeDNA.familyFriendly >= 85);
    }

    // Sorting
    if (selectedSort === 'match') {
      result.sort((a, b) => (b.fit?.score || 0) - (a.fit?.score || 0));
    } else if (selectedSort === 'price-asc') {
      result.sort((a, b) => (mode === 'buy' ? a.price - b.price : a.rent - b.rent));
    } else if (selectedSort === 'price-desc') {
      result.sort((a, b) => (mode === 'buy' ? b.price - a.price : b.rent - a.rent));
    } else if (selectedSort === 'largest') {
      result.sort((a, b) => (b.carpetArea || 0) - (a.carpetArea || 0));
    } else if (selectedSort === 'price-drop') {
      result.sort((a, b) => (b.priceDrop?.hasDropped ? 1 : 0) - (a.priceDrop?.hasDropped ? 1 : 0));
    }

    return result;
  }, [rankedAll, parsedNL, selectedBHK, selectedMicroMarket, selectedLifestyle, selectedSort, mode]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedBHK(null);
    setSelectedMicroMarket('All');
    setSelectedLifestyle('All');
    setSelectedSort('match');
  };

  const handleRelaxPreference = () => {
    // Relax the most restrictive active filter first
    if (selectedLifestyle !== 'All') {
      setSelectedLifestyle('All');
    } else if (selectedMicroMarket !== 'All') {
      setSelectedMicroMarket('All');
    } else if (selectedBHK) {
      setSelectedBHK(null);
    } else {
      setSearchQuery('');
    }
  };

  const handleShowClosestMatches = () => {
    // Clear strict location and lifestyle constraints to show best fit homes overall
    setSelectedMicroMarket('All');
    setSelectedLifestyle('All');
    setSelectedSort('match');
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-vistara-bg flex flex-col">
      
      {/* Top Search & Filter Bar */}
      <div className="bg-vistara-surface border-b border-vistara-border px-4 sm:px-6 py-4">
        <div className="max-w-[1440px] mx-auto flex flex-col gap-3">
          
          {/* Personalized Greeting Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-wider font-bold text-vistara-accent">
                  ACTIVE LIFE PROFILE
                </span>
                <span className="bg-vistara-elevated px-2 py-0.5 rounded text-[11px] font-semibold text-vistara-primary border border-vistara-border">
                  {currentUser?.lifeProfile?.profileName || 'Quiet Daylight Technologist'}
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-vistara-primary tracking-tight mt-1">
                Chennai Residences Evaluated for You
              </h1>
            </div>

            {/* View Mode Toggle (Split Map vs Full Grid) */}
            <div className="flex items-center gap-2">
              <div className="inline-flex bg-vistara-elevated p-1 rounded border border-vistara-border text-xs">
                <button
                  type="button"
                  onClick={() => setViewMode('split')}
                  className={`px-3 py-1 rounded flex items-center gap-1.5 transition-colors ${
                    viewMode === 'split' ? 'bg-[#142334] text-white font-medium' : 'text-vistara-secondary hover:text-vistara-primary'
                  }`}
                >
                  <MapIcon className="w-3.5 h-3.5" />
                  <span>Map & List</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-1 rounded flex items-center gap-1.5 transition-colors ${
                    viewMode === 'grid' ? 'bg-[#142334] text-white font-medium' : 'text-vistara-secondary hover:text-vistara-primary'
                  }`}
                >
                  <Grid className="w-3.5 h-3.5" />
                  <span>Grid Only</span>
                </button>
              </div>
            </div>
          </div>

          {/* Natural Language Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-vistara-accent absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search naturally (e.g. 'Quiet 3BHK near OMR under ₹1.6 Cr' or 'Beachfront villa in ECR')..."
              className="w-full bg-vistara-elevated border border-vistara-border rounded-lg pl-10 pr-24 py-2.5 text-xs sm:text-sm text-vistara-primary placeholder:text-vistara-muted focus:outline-none focus:border-vistara-accent transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-vistara-secondary hover:text-vistara-primary"
              >
                Clear
              </button>
            )}
          </div>

          {/* Quick Filter Chips Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
            
            <div className="flex flex-wrap items-center gap-2">
              
              {/* BHK Selector */}
              <div className="flex items-center bg-vistara-elevated p-0.5 rounded border border-vistara-border">
                <button
                  onClick={() => setSelectedBHK(null)}
                  className={`px-2.5 py-1 rounded ${selectedBHK === null ? 'bg-[#142334] text-white font-bold' : 'text-vistara-secondary'}`}
                >
                  All BHK
                </button>
                {[2, 3, 4].map(bhk => (
                  <button
                    key={bhk}
                    onClick={() => setSelectedBHK(bhk)}
                    className={`px-2.5 py-1 rounded ${selectedBHK === bhk ? 'bg-[#142334] text-white font-bold' : 'text-vistara-secondary'}`}
                  >
                    {bhk} BHK
                  </button>
                ))}
              </div>

              {/* Micro-Market Dropdown */}
              <select
                value={selectedMicroMarket}
                onChange={(e) => setSelectedMicroMarket(e.target.value)}
                className="bg-vistara-elevated border border-vistara-border rounded px-2.5 py-1.5 text-vistara-primary font-medium focus:outline-none focus:border-vistara-accent"
              >
                {microMarkets.map(m => (
                  <option key={m} value={m}>{m === 'All' ? 'All Locations' : m}</option>
                ))}
              </select>

              {/* Lifestyle Dimension Dropdown */}
              <select
                value={selectedLifestyle}
                onChange={(e) => setSelectedLifestyle(e.target.value)}
                className="bg-vistara-elevated border border-vistara-border rounded px-2.5 py-1.5 text-vistara-primary font-medium focus:outline-none focus:border-vistara-accent"
              >
                {lifestyles.map(l => (
                  <option key={l} value={l}>{l === 'All' ? 'All Lifestyles' : l}</option>
                ))}
              </select>

              {(selectedBHK || selectedMicroMarket !== 'All' || selectedLifestyle !== 'All' || searchQuery) && (
                <button
                  onClick={handleResetFilters}
                  className="flex items-center gap-1 text-vistara-secondary hover:text-vistara-primary underline text-[11px]"
                >
                  <RotateCcw className="w-3 h-3" /> Reset
                </button>
              )}
            </div>

            {/* Sorting Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-vistara-secondary font-medium">Sort by:</span>
              <select
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value)}
                className="bg-vistara-elevated border border-vistara-border rounded px-2.5 py-1.5 text-vistara-primary font-semibold focus:outline-none focus:border-vistara-accent"
              >
                <option value="match">Personalized Fit Score</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="largest">Largest Area</option>
                <option value="price-drop">Price Drops First</option>
              </select>
            </div>

          </div>

        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 max-w-[1440px] w-full mx-auto px-4 sm:px-6 py-6">
        
        {viewMode === 'split' ? (
          /* Split View: Left List, Right Map */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-14rem)] min-h-[600px]">
            
            {/* Left Property Column (Scrollable) */}
            <div className="lg:col-span-6 xl:col-span-7 h-full overflow-y-auto pr-1 space-y-4">
              <div className="flex items-center justify-between text-xs text-vistara-secondary pb-2 border-b border-vistara-border">
                <span>Showing <strong className="text-vistara-primary">{filteredProperties.length}</strong> matching residences</span>
                <span className="text-[11px]">Ranked by LifeFit compatibility</span>
              </div>

              {filteredProperties.length === 0 ? (
                /* No Results State with Section 6 Recovery Actions */
                <div className="p-8 text-center bg-vistara-surface border border-vistara-border rounded-xl space-y-4">
                  <div className="w-12 h-12 rounded-full bg-vistara-elevated mx-auto flex items-center justify-center text-vistara-accent">
                    <Search className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-vistara-primary text-base">No homes match these preferences.</h3>
                    <p className="text-xs text-vistara-secondary max-w-md mx-auto mt-1 leading-relaxed">
                      Your current criteria are too specific. You can relax your most restrictive preference, view closest architectural alternatives, or reset all filters.
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                    <Button variant="primary" size="sm" onClick={handleRelaxPreference}>
                      Relax One Preference
                    </Button>
                    <Button variant="secondary" size="sm" onClick={handleShowClosestMatches}>
                      Show Closest Matches
                    </Button>
                    <Button variant="ghost" size="sm" onClick={handleResetFilters}>
                      Reset Filters
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {filteredProperties.map(property => (
                    <div 
                      key={property.id}
                      onMouseEnter={() => setFocusedPropertyId(property.id)}
                    >
                      <PropertyCard
                        property={property}
                        fitScore={property.fit}
                        onSelect={(id) => onSelectProperty(id)}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right Map Column (Sticky) */}
            <div className="hidden lg:block lg:col-span-6 xl:col-span-5 h-full sticky top-24">
              <ChennaiMap
                properties={filteredProperties}
                selectedPropertyId={focusedPropertyId}
                onSelectProperty={(id) => onSelectProperty(id)}
              />
            </div>

          </div>
        ) : (
          /* Grid View Only */
          <div>
            <div className="flex items-center justify-between text-xs text-vistara-secondary pb-4 mb-4 border-b border-vistara-border">
              <span>Showing <strong className="text-vistara-primary">{filteredProperties.length}</strong> matching residences in Chennai</span>
            </div>

            {filteredProperties.length === 0 ? (
              <div className="p-12 text-center bg-vistara-surface border border-vistara-border rounded-xl space-y-4 max-w-lg mx-auto">
                <div className="w-12 h-12 rounded-full bg-vistara-elevated mx-auto flex items-center justify-center text-vistara-accent">
                  <Search className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-vistara-primary text-base">No homes match these preferences.</h3>
                  <p className="text-xs text-vistara-secondary mt-1 leading-relaxed">
                    Try relaxing one preference or expanding your search to nearby Chennai corridors.
                  </p>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                  <Button variant="primary" size="sm" onClick={handleRelaxPreference}>
                    Relax One Preference
                  </Button>
                  <Button variant="secondary" size="sm" onClick={handleShowClosestMatches}>
                    Show Closest Matches
                  </Button>
                  <Button variant="ghost" size="sm" onClick={handleResetFilters}>
                    Reset Filters
                  </Button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProperties.map(property => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    fitScore={property.fit}
                    onSelect={(id) => onSelectProperty(id)}
                  />
                ))}
              </div>
            )}
          </div>
        )}

      </div>

    </div>
  );
}
