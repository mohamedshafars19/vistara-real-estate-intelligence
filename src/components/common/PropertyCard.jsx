import React, { useState } from 'react';
import { Heart, Scale, ShieldCheck, TrendingDown, Sun, VolumeX, Laptop, ArrowRight, Layers, Share2, Check } from 'lucide-react';
import { FitScoreBadge } from './FitScoreBadge';
import { PropertyImage } from './PropertyImage';
import { useApp } from '../../context/AppContext';
import { calculateFitScore } from '../../utils/fitEngine';

export function PropertyCard({ property, onSelect, fitScore = null }) {
  const { 
    currentUser, 
    mode, 
    savedPropertyIds, 
    toggleSaveProperty, 
    compareList, 
    toggleCompare,
    decisionRoom,
    addPropertyToDecisionRoom,
    removePropertyFromDecisionRoom
  } = useApp();

  const [isTradeoffExpanded, setIsTradeoffExpanded] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);

  const isSaved = (savedPropertyIds || []).includes(property.id);
  const isCompared = (compareList || []).includes(property.id);
  const isInDecisionRoom = (decisionRoom?.columns?.mustHave || []).includes(property.id) ||
                           (decisionRoom?.columns?.niceToHave || []).includes(property.id) ||
                           (decisionRoom?.columns?.concern || []).includes(property.id) ||
                           (decisionRoom?.columns?.reject || []).includes(property.id);

  // Compute fit if not provided
  const computedFit = fitScore || calculateFitScore(currentUser, property);

  // Format price drop display if present
  const hasPriceDrop = property.priceDrop?.hasDropped;
  const dropLakhs = hasPriceDrop ? Math.round(property.priceDrop.dropAmount / 100000) : 0;
  const dropCr = (dropLakhs / 100).toFixed(2);
  const dropLabel = dropLakhs >= 100 ? `₹${dropCr} Cr lower` : `₹${dropLakhs}L lower`;

  const handleShareClick = (e) => {
    e.stopPropagation();
    if (navigator.clipboard) {
      const url = `${window.location.origin}/#property/${property.id}`;
      navigator.clipboard.writeText(url);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    }
  };

  return (
    <div
      onClick={() => onSelect && onSelect(property.id)}
      className="group relative bg-vistara-surface border border-vistara-border rounded-xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300 cursor-pointer flex flex-col h-full justify-between"
    >
      {/* Top Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-vistara-elevated shrink-0">
        <PropertyImage
          src={property.images?.hero || property.coverImage}
          propertyName={property.name}
          microMarket={property.microMarket}
          aspectRatio="aspect-[16/10]"
          className="transition-transform duration-500 ease-out group-hover:scale-105"
        />

        {/* Top Floating Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between pointer-events-none z-10">
          <div className="flex flex-col gap-1.5 pointer-events-auto">
            {/* Signature 91% FIT Circular Badge with Solid Opaque Background for 100% Readability */}
            <FitScoreBadge 
              score={computedFit.score} 
              variant="card" 
              interactive={true} 
              breakdown={computedFit.components} 
            />

            {/* Price Drop Alert (Smaller subtle treatment) */}
            {hasPriceDrop && (
              <div className="bg-emerald-800 text-white text-[9px] font-extrabold px-2 py-0.5 rounded shadow-sm flex items-center gap-1 w-fit">
                <TrendingDown className="w-2.5 h-2.5" />
                <span>PRICE DROP • {dropLabel}</span>
              </div>
            )}
          </div>

          {/* Action Buttons: Decision Room, Compare, Share, Save */}
          <div className="flex items-center gap-1 pointer-events-auto bg-vistara-surface/90 backdrop-blur-sm p-1 rounded-full border border-vistara-border shadow-subtle">
            <button
              type="button"
              aria-label={isInDecisionRoom ? "Remove from Decision Room" : "Add to Decision Room"}
              title={isInDecisionRoom ? "In Decision Room (Click to remove)" : "Add to Decision Room"}
              onClick={(e) => {
                e.stopPropagation();
                if (isInDecisionRoom) {
                  removePropertyFromDecisionRoom(property.id);
                } else {
                  addPropertyToDecisionRoom(property.id, 'mustHave');
                }
              }}
              className={`p-1.5 rounded-full transition-colors ${
                isInDecisionRoom
                  ? 'bg-purple-600 text-white'
                  : 'text-vistara-secondary hover:text-vistara-primary hover:bg-vistara-elevated'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              aria-label={isCompared ? "Remove from comparison" : "Add to comparison"}
              title={isCompared ? "In Comparison (Click to remove)" : "Add to comparison arena"}
              onClick={(e) => {
                e.stopPropagation();
                toggleCompare(property.id);
              }}
              className={`p-1.5 rounded-full transition-colors ${
                isCompared
                  ? 'bg-[#142334] text-white'
                  : 'text-vistara-secondary hover:text-vistara-primary hover:bg-vistara-elevated'
              }`}
            >
              <Scale className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              aria-label="Share property link"
              title={copiedShare ? "Link copied!" : "Copy link to clipboard"}
              onClick={handleShareClick}
              className="p-1.5 rounded-full transition-colors text-vistara-secondary hover:text-vistara-primary hover:bg-vistara-elevated"
            >
              {copiedShare ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
            </button>

            <button
              type="button"
              aria-label={isSaved ? "Remove from saved" : "Save property"}
              title={isSaved ? "Saved in your collection" : "Save property to collection"}
              onClick={(e) => {
                e.stopPropagation();
                toggleSaveProperty(property.id);
              }}
              className={`p-1.5 rounded-full transition-colors ${
                isSaved
                  ? 'text-rose-600 bg-rose-50 dark:bg-rose-950/40'
                  : 'text-vistara-secondary hover:text-rose-600 hover:bg-vistara-elevated'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-rose-600' : ''}`} />
            </button>
          </div>
        </div>

        {/* Micro-market pill bottom left */}
        <div className="absolute bottom-2.5 left-2.5 pointer-events-none z-10">
          <span className="bg-[#142334]/90 text-white text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded shadow-sm">
            {property.microMarket}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Pricing & Verification Status */}
          <div className="flex items-baseline justify-between gap-2">
            <div>
              <span className="text-xl font-extrabold text-vistara-primary tracking-tight">
                {mode === 'buy' ? property.priceDisplay : property.rentDisplay}
              </span>
              {mode === 'buy' && property.area && (
                <span className="text-[11px] text-vistara-secondary ml-1.5 font-normal">
                  (₹{Math.round(property.price / property.area).toLocaleString('en-IN')}/sq.ft)
                </span>
              )}
            </div>
            {property.verification?.status && (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800 shrink-0">
                <ShieldCheck className="w-3 h-3" />
                Listing Verification Demo
              </span>
            )}
          </div>

          {/* Property Title & Location */}
          <h3 className="font-bold text-vistara-primary text-sm mt-1.5 group-hover:text-vistara-accent transition-colors line-clamp-1">
            {property.name}
          </h3>
          <p className="text-[11px] text-vistara-secondary mt-0.5 line-clamp-1">
            {property.location}
          </p>

          {/* Secondary Specifications Bar */}
          <div className="flex items-center gap-2 text-[11px] text-vistara-secondary my-2.5 py-1.5 border-y border-vistara-border/60">
            <span className="font-bold text-vistara-primary">{property.bhk} BHK</span>
            <span>•</span>
            <span>{(property.area || 1800).toLocaleString('en-IN')} sq.ft</span>
            <span>•</span>
            <span>{property.propertyType}</span>
          </div>

          {/* Intelligence Home DNA Indicators */}
          <div className="grid grid-cols-3 gap-1.5 text-[10px] py-0.5 font-medium">
            <div className="flex items-center gap-1 text-vistara-secondary">
              <VolumeX className="w-3 h-3 text-vistara-accent shrink-0" />
              <span>Quiet {property.homeDNA?.quiet || 85}</span>
            </div>
            <div className="flex items-center gap-1 text-vistara-secondary">
              <Sun className="w-3 h-3 text-amber-500 shrink-0" />
              <span>Light {property.homeDNA?.naturalLight || 90}</span>
            </div>
            <div className="flex items-center gap-1 text-vistara-secondary">
              <Laptop className="w-3 h-3 text-sky-600 shrink-0" />
              <span>WFH {property.homeDNA?.workFriendly || 88}</span>
            </div>
          </div>

          {/* Expandable Honest Trade-off */}
          {property.tradeoffs?.[0] && (
            <div 
              onClick={(e) => {
                e.stopPropagation();
                setIsTradeoffExpanded(!isTradeoffExpanded);
              }}
              className="mt-2.5 p-2 bg-vistara-elevated rounded-lg border border-vistara-border/80 text-[11px] text-vistara-secondary leading-relaxed cursor-pointer hover:border-vistara-accent/60 transition-colors"
            >
              <div className="flex items-center justify-between font-bold text-vistara-primary text-[10px] mb-0.5">
                <span>PROPERTY TRADE-OFF:</span>
                <span className="text-vistara-accent font-semibold text-[9px] hover:underline">
                  {isTradeoffExpanded ? 'Show less ▲' : 'View complete ▼'}
                </span>
              </div>
              <p className={isTradeoffExpanded ? 'text-vistara-primary' : 'line-clamp-2'}>
                {property.tradeoffs[0]}
              </p>
            </div>
          )}
        </div>

        {/* View Spatial Button */}
        <div className="mt-3 pt-2 border-t border-vistara-border/40 flex items-center justify-between text-xs font-semibold text-vistara-primary group-hover:text-vistara-accent">
          <span>Explore Spatial Walkthrough</span>
          <ArrowRight className="w-3.5 h-3.5 transform transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </div>
  );
}
