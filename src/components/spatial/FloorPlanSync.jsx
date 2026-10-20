import React from 'react';
import { Maximize2, Compass, Layers } from 'lucide-react';

export function FloorPlanSync({ property, selectedRoom, onSelectRoom }) {
  const rooms = [
    {
      id: 'living',
      name: 'Living & Dining Hall',
      dimensions: '24\' x 18\' (432 sq.ft)',
      x: 120,
      y: 160,
      width: 220,
      height: 180,
      lightOrientation: 'East Facing Light'
    },
    {
      id: 'kitchen',
      name: 'Modular Kitchen',
      dimensions: '14\' x 12\' (168 sq.ft)',
      x: 20,
      y: 40,
      width: 140,
      height: 140,
      lightOrientation: 'Morning East Window'
    },
    {
      id: 'bedroom',
      name: 'Master Bedroom Suite',
      dimensions: '18\' x 16\' (288 sq.ft)',
      x: 240,
      y: 40,
      width: 180,
      height: 140,
      lightOrientation: 'North-East Corner'
    },
    {
      id: 'workspace',
      name: 'Dedicated WFH Study',
      dimensions: '12\' x 11\' (132 sq.ft)',
      x: 20,
      y: 200,
      width: 120,
      height: 140,
      lightOrientation: 'Diffused Daylight'
    },
    {
      id: 'balcony',
      name: 'Garden Terrace Deck',
      dimensions: '22\' x 8\' (176 sq.ft)',
      x: 120,
      y: 350,
      width: 220,
      height: 70,
      lightOrientation: 'Open Coastal Sky'
    }
  ];

  return (
    <div className="bg-vistara-surface border border-vistara-border rounded-xl p-5 shadow-card flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-vistara-border text-xs">
        <div>
          <span className="font-bold text-vistara-primary text-sm">
            Architectural Floor Plan
          </span>
          <span className="text-vistara-secondary ml-2">
            ({property.area} sq.ft Super Built-up)
          </span>
        </div>
        <div className="flex items-center gap-2 text-vistara-secondary">
          <span className="flex items-center gap-1">
            <Compass className="w-3.5 h-3.5 text-vistara-accent" />
            North Facing Entry
          </span>
        </div>
      </div>

      {/* Interactive Blueprint SVG */}
      <div className="relative my-4 flex items-center justify-center bg-vistara-elevated border border-vistara-border/80 rounded-lg p-4 select-none">
        <svg
          viewBox="0 0 460 440"
          className="w-full max-w-md h-auto"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Blueprint Grid Lines */}
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="var(--v-border)" strokeWidth="0.5" strokeOpacity="0.4" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Exterior Structural Perimeter Wall */}
          <rect
            x="15"
            y="35"
            width="410"
            height="390"
            fill="none"
            stroke="var(--v-primary)"
            strokeWidth="4"
            rx="4"
          />

          {/* Render Interactive Rooms */}
          {rooms.map(room => {
            const isSelected = selectedRoom === room.id;
            return (
              <g
                key={room.id}
                onClick={() => onSelectRoom(room.id)}
                className="cursor-pointer transition-all duration-200 group"
              >
                {/* Room Floor Rectangle */}
                <rect
                  x={room.x}
                  y={room.y}
                  width={room.width}
                  height={room.height}
                  fill={isSelected ? "var(--v-accent)" : "var(--v-surface)"}
                  fillOpacity={isSelected ? "0.35" : "0.85"}
                  stroke={isSelected ? "var(--v-accent)" : "var(--v-border)"}
                  strokeWidth={isSelected ? "2.5" : "1.5"}
                  className="transition-colors group-hover:fill-vistara-accent/20"
                />

                {/* Room Name Label */}
                <text
                  x={room.x + room.width / 2}
                  y={room.y + room.height / 2 - 8}
                  textAnchor="middle"
                  className={`text-[12px] font-semibold tracking-tight ${
                    isSelected ? 'fill-vistara-primary font-bold' : 'fill-vistara-primary'
                  }`}
                >
                  {room.name}
                </text>

                {/* Dimensions Label */}
                <text
                  x={room.x + room.width / 2}
                  y={room.y + room.height / 2 + 10}
                  textAnchor="middle"
                  className="text-[10px] fill-vistara-secondary font-mono"
                >
                  {room.dimensions}
                </text>

                {/* Sunlight indicator */}
                <text
                  x={room.x + room.width / 2}
                  y={room.y + room.height / 2 + 25}
                  textAnchor="middle"
                  className="text-[9px] fill-vistara-muted italic"
                >
                  {room.lightOrientation}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Blueprint watermark */}
        <div className="absolute bottom-2 right-3 text-[10px] text-vistara-muted tracking-widest uppercase font-mono">
          VISTARA CAD 1:50 SCALE
        </div>
      </div>

      {/* Sync Instruction Pill */}
      <div className="flex items-center justify-between text-xs text-vistara-secondary pt-2 border-t border-vistara-border/60">
        <span>Click any room to synchronize 3D camera & sunlight exposure</span>
        <button
          onClick={() => onSelectRoom('all')}
          className="text-vistara-accent font-semibold hover:underline"
        >
          Reset View
        </button>
      </div>

    </div>
  );
}
