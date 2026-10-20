import React from 'react';

export function VistaraLogo({ size = 'md', showWordmark = true, className = '' }) {
  const sizeMap = {
    sm: { icon: 24, text: 'text-lg' },
    md: { icon: 32, text: 'text-xl' },
    lg: { icon: 42, text: 'text-2xl' },
    xl: { icon: 56, text: 'text-3xl' }
  };

  const current = sizeMap[size] || sizeMap.md;

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Architectural V Monogram: Intersecting spatial cantilever beams & structural perspective */}
      <svg
        width={current.icon}
        height={current.icon}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0 transition-transform hover:scale-105 duration-200"
      >
        <rect width="100" height="100" rx="18" fill="var(--v-primary)" />
        {/* Cantilevered shear beam 1 */}
        <path d="M22 24 L50 80 L57 80 L82 30 L67 30 L50 64 L34 24 Z" fill="var(--v-accent)" />
        {/* Spatial interlocking roof plane */}
        <path d="M38 24 L50 48 L62 24 L75 24 L50 74 L25 24 Z" fill="#FFFFFF" fillOpacity="0.95" />
        {/* Geometric fulcrum node */}
        <circle cx="50" cy="80" r="3.5" fill="var(--v-accent)" />
      </svg>

      {showWordmark && (
        <div className="flex flex-col leading-none">
          <span className={`font-serif tracking-widest uppercase font-bold text-vistara-primary ${current.text}`}>
            Vistara
          </span>
          <span className="text-[9px] tracking-[0.25em] uppercase text-vistara-secondary font-medium mt-0.5">
            Architectural Living
          </span>
        </div>
      )}
    </div>
  );
}
