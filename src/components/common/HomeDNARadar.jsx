import React from 'react';

export function HomeDNARadar({ dna, size = 260, showLabels = true, interactive = true }) {
  // Dimensions ordered around the polygon
  const dimensions = [
    { key: 'quiet', label: 'Quiet Living' },
    { key: 'naturalLight', label: 'Natural Light' },
    { key: 'social', label: 'Social & Hosting' },
    { key: 'workFriendly', label: 'Work Friendly' },
    { key: 'green', label: 'Green & Canopy' },
    { key: 'familyFriendly', label: 'Family Friendly' }
  ];

  const totalPoints = dimensions.length;
  const center = size / 2;
  const radius = size * 0.38;

  // Compute coordinates on regular polygon for a given value (0 to 100)
  const getCoordinates = (index, value) => {
    const angle = (Math.PI * 2 / totalPoints) * index - Math.PI / 2;
    const distance = (value / 100) * radius;
    const x = center + distance * Math.cos(angle);
    const y = center + distance * Math.sin(angle);
    return { x, y, angle };
  };

  // Generate grid webs at 25%, 50%, 75%, 100%
  const gridLevels = [25, 50, 75, 100];

  // Data points polygon string
  const pointsString = dimensions.map((dim, i) => {
    const val = dna[dim.key] || 75;
    const { x, y } = getCoordinates(i, val);
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="relative inline-flex flex-col items-center justify-center select-none">
      <svg width={size} height={size} className="overflow-visible">
        {/* Background Grid Rings */}
        {gridLevels.map((lvl) => {
          const webPoints = dimensions.map((_, i) => {
            const { x, y } = getCoordinates(i, lvl);
            return `${x},${y}`;
          }).join(' ');
          return (
            <polygon
              key={lvl}
              points={webPoints}
              fill="transparent"
              stroke="var(--v-border)"
              strokeWidth={lvl === 100 ? "1.5" : "0.75"}
              strokeDasharray={lvl < 100 ? "3 3" : undefined}
              className="opacity-70"
            />
          );
        })}

        {/* Axis Spokes from Center */}
        {dimensions.map((_, i) => {
          const { x, y } = getCoordinates(i, 100);
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={x}
              y2={y}
              stroke="var(--v-border)"
              strokeWidth="1"
              className="opacity-60"
            />
          );
        })}

        {/* DNA Polygon Area */}
        <polygon
          points={pointsString}
          fill="var(--v-accent)"
          fillOpacity="0.22"
          stroke="var(--v-accent)"
          strokeWidth="2.5"
          className="transition-all duration-500 ease-out"
        />

        {/* Data Vertices Nodes */}
        {dimensions.map((dim, i) => {
          const val = dna[dim.key] || 75;
          const { x, y } = getCoordinates(i, val);
          return (
            <g key={dim.key} className="cursor-pointer group">
              <circle
                cx={x}
                cy={y}
                r="4.5"
                fill="var(--v-primary)"
                stroke="var(--v-surface)"
                strokeWidth="1.5"
                className="transition-transform group-hover:scale-150 duration-150"
              />
              {interactive && (
                <title>{`${dim.label}: ${val}/100`}</title>
              )}
            </g>
          );
        })}

        {/* Labels around perimeter */}
        {showLabels && dimensions.map((dim, i) => {
          const { angle } = getCoordinates(i, 100);
          const labelDist = radius + 22;
          const lx = center + labelDist * Math.cos(angle);
          const ly = center + labelDist * Math.sin(angle);
          const val = dna[dim.key] || 75;

          // Align text depending on angle
          let textAnchor = 'middle';
          if (Math.cos(angle) > 0.3) textAnchor = 'start';
          else if (Math.cos(angle) < -0.3) textAnchor = 'end';

          return (
            <text
              key={dim.key}
              x={lx}
              y={ly}
              textAnchor={textAnchor}
              dominantBaseline="middle"
              className="text-[11px] font-medium fill-[var(--v-primary)] tracking-tight"
            >
              {dim.label} <tspan className="font-bold fill-[var(--v-accent)]">({val})</tspan>
            </text>
          );
        })}
      </svg>
    </div>
  );
}
