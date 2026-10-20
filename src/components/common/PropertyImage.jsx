import React, { useState } from 'react';
import { Building, ImageOff } from 'lucide-react';

/**
 * PropertyImage: Graceful property image component with skeleton preloader,
 * smooth transition, meaningful alt text, and property-specific SVG/architectural fallback.
 * Prevents broken image icons or blank beige rectangles across the application.
 */
export function PropertyImage({
  src,
  alt,
  propertyName = 'Vistara Chennai Residence',
  microMarket = 'Chennai',
  className = '',
  aspectRatio = 'aspect-[16/10]',
  priority = false,
  onClick = null
}) {
  const [status, setStatus] = useState('loading'); // 'loading' | 'loaded' | 'error'

  const effectiveAlt = alt || `${propertyName} in ${microMarket}, Chennai`;

  return (
    <div 
      className={`relative overflow-hidden bg-vistara-elevated select-none ${aspectRatio} ${className}`}
      onClick={onClick}
    >
      {/* Subtle loading skeleton */}
      {status === 'loading' && (
        <div className="absolute inset-0 bg-gradient-to-r from-vistara-elevated via-vistara-border/40 to-vistara-elevated animate-pulse flex items-center justify-center">
          <Building className="w-8 h-8 text-vistara-border/60 animate-bounce duration-1000" />
        </div>
      )}

      {/* Actual image */}
      {status !== 'error' && (
        <img
          src={src}
          alt={effectiveAlt}
          loading={priority ? 'eager' : 'lazy'}
          onLoad={() => setStatus('loaded')}
          onError={() => setStatus('error')}
          className={`w-full h-full object-cover transition-opacity duration-500 ease-out ${
            status === 'loaded' ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}

      {/* Property-specific graceful fallback (No broken icon, no empty beige box) */}
      {status === 'error' && (
        <div className="absolute inset-0 bg-vistara-surface border border-vistara-border/60 p-4 flex flex-col items-center justify-center text-center">
          <div className="w-12 h-12 rounded-xl bg-vistara-elevated border border-vistara-border flex items-center justify-center text-vistara-accent mb-2">
            <Building className="w-6 h-6" />
          </div>
          <span className="text-[11px] font-bold text-vistara-primary line-clamp-1 max-w-[90%]">
            {propertyName}
          </span>
          <span className="text-[10px] text-vistara-secondary uppercase tracking-wider mt-0.5">
            {microMarket} • Architectural Preview
          </span>
        </div>
      )}
    </div>
  );
}
