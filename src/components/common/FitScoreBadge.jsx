import React, { useState, useEffect } from 'react';
import { Info, Sparkles } from 'lucide-react';

/**
 * FitScoreBadge: Signature Vistara Decision Signal.
 * Features an animated circular progress ring, clear numeric fit percentage (e.g. 91% FIT),
 * and interactive breakdown tooltip.
 */
export function FitScoreBadge({ 
  score = 91, 
  breakdown = null, 
  size = 'md', 
  showLabel = true, 
  interactive = false,
  variant = 'default' // 'default' | 'card' | 'hero'
}) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [animatedScore, setAnimatedScore] = useState(0);
  const [displayNumber, setDisplayNumber] = useState(0);

  // Animated circular ring progress and rolling number count-up
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedScore(score);
    }, 50);

    let startTimestamp = null;
    const duration = 750; // ms
    let animationFrame;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setDisplayNumber(Math.round(ease * score));
      if (progress < 1) {
        animationFrame = requestAnimationFrame(step);
      }
    };

    animationFrame = requestAnimationFrame(step);
    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(animationFrame);
    };
  }, [score]);

  // Color tones adhering to Vistara's warm, sophisticated palette
  let strokeColor = '#142334'; // Navy default
  let trackColor = 'rgba(20, 35, 52, 0.12)';
  let accentTextColor = 'text-vistara-primary';

  if (score >= 90) {
    strokeColor = '#059669'; // Emerald
    trackColor = 'rgba(5, 150, 105, 0.18)';
    accentTextColor = 'text-emerald-700 dark:text-emerald-400';
  } else if (score >= 75) {
    strokeColor = '#C9AD98'; // Warm Sand / Accent
    trackColor = 'rgba(201, 173, 152, 0.22)';
    accentTextColor = 'text-amber-800 dark:text-amber-300';
  }

  // Radii & dimensions
  let dim = 54;
  let strokeWidth = 4;
  let textSize = 'text-sm font-extrabold';

  if (size === 'card' || variant === 'card') {
    dim = 62;
    strokeWidth = 4.5;
    textSize = 'text-base font-black';
  } else if (size === 'lg' || variant === 'hero') {
    dim = 84;
    strokeWidth = 6;
    textSize = 'text-2xl font-black';
  } else if (size === 'sm') {
    dim = 42;
    strokeWidth = 3;
    textSize = 'text-xs font-black';
  }

  const radius = (dim - strokeWidth * 2) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

  if (variant === 'card' || size === 'card') {
    return (
      <div 
        className="relative inline-flex items-center justify-center select-none bg-vistara-surface border-2 border-vistara-border/90 rounded-2xl p-1.5 shadow-card hover:scale-105 transition-transform"
        onMouseEnter={() => interactive && setShowTooltip(true)}
        onMouseLeave={() => interactive && setShowTooltip(false)}
      >
        <div className="relative flex items-center justify-center" style={{ width: dim, height: dim }}>
          <svg height={dim} width={dim} className="transform -rotate-90">
            {/* Background track */}
            <circle
              stroke={trackColor}
              fill="transparent"
              strokeWidth={strokeWidth}
              r={radius}
              cx={dim / 2}
              cy={dim / 2}
            />
            {/* Animated progress stroke */}
            <circle
              stroke={strokeColor}
              fill="transparent"
              strokeWidth={strokeWidth}
              strokeDasharray={`${circumference} ${circumference}`}
              style={{ 
                strokeDashoffset,
                transition: 'stroke-dashoffset 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
              strokeLinecap="round"
              r={radius}
              cx={dim / 2}
              cy={dim / 2}
            />
          </svg>

          {/* Central Dominant Stack: e.g. 91% FIT */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center leading-none">
            <span className={`${textSize} text-vistara-primary tracking-tight font-black`}>
              {displayNumber}%
            </span>
            <span className="text-[9px] font-black text-vistara-secondary uppercase tracking-widest mt-0.5">
              FIT
            </span>
          </div>
        </div>

        {/* Interactive breakdown popover */}
        {interactive && showTooltip && breakdown && (
          <div className="absolute top-full left-0 mt-2 z-50 w-64 p-3 bg-vistara-surface border border-vistara-border shadow-popover rounded-xl text-xs">
            <div className="font-bold text-vistara-primary pb-2 border-b border-vistara-border flex justify-between items-center">
              <span>Decision Match Signal</span>
              <span className="text-emerald-600 font-extrabold">{score}% Overall</span>
            </div>
            <div className="space-y-1.5 pt-2">
              {Object.entries(breakdown).map(([key, val]) => (
                <div key={key} className="flex justify-between items-center text-vistara-secondary">
                  <span className="capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                  <span className="font-bold text-vistara-primary">{val}%</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div 
      className="relative inline-flex items-center gap-3 select-none"
      onMouseEnter={() => interactive && setShowTooltip(true)}
      onMouseLeave={() => interactive && setShowTooltip(false)}
    >
      <div className="relative flex items-center justify-center" style={{ width: dim, height: dim }}>
        <svg height={dim} width={dim} className="transform -rotate-90">
          <circle
            stroke={trackColor}
            fill="transparent"
            strokeWidth={strokeWidth}
            r={radius}
            cx={dim / 2}
            cy={dim / 2}
          />
          <circle
            stroke={strokeColor}
            fill="transparent"
            strokeWidth={strokeWidth}
            strokeDasharray={`${circumference} ${circumference}`}
            style={{ 
              strokeDashoffset,
              transition: 'stroke-dashoffset 1s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
            strokeLinecap="round"
            r={radius}
            cx={dim / 2}
            cy={dim / 2}
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center leading-none">
          <span className={`font-extrabold ${textSize} text-vistara-primary tracking-tight`}>
            {displayNumber}%
          </span>
          {size !== 'sm' && (
            <span className="text-[8px] font-bold text-vistara-secondary uppercase tracking-widest mt-0.5">
              FIT
            </span>
          )}
        </div>
      </div>

      {showLabel && (
        <div className="flex flex-col text-left">
          <span className="text-[10px] uppercase tracking-wider font-bold text-vistara-secondary flex items-center gap-1">
            Fit Compatibility
            {interactive && <Info className="w-3 h-3 text-vistara-muted" />}
          </span>
          <span className={`text-xs font-bold ${accentTextColor}`}>
            {score >= 90 ? '91%+ Exceptional Match' : score >= 80 ? 'Strong Match' : 'Moderate Match'}
          </span>
        </div>
      )}

      {/* Interactive breakdown popover */}
      {interactive && showTooltip && breakdown && (
        <div className="absolute top-full left-0 mt-2 z-50 w-64 p-3 bg-vistara-surface border border-vistara-border shadow-popover rounded-xl text-xs">
          <div className="font-bold text-vistara-primary pb-2 border-b border-vistara-border flex justify-between items-center">
            <span>Decision Match Signal</span>
            <span className="text-emerald-600 font-extrabold">{score}% Overall</span>
          </div>
          <div className="space-y-1.5 pt-2">
            {Object.entries(breakdown).map(([key, val]) => (
              <div key={key} className="flex justify-between items-center text-vistara-secondary">
                <span className="capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                <span className="font-bold text-vistara-primary">{val}%</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
