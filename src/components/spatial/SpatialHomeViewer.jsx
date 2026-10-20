import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Grid } from '@react-three/drei';
import * as THREE from 'three';
import { Sun, Clock, Eye, RotateCcw, Compass } from 'lucide-react';

// Room coordinates & camera views inside the architectural model
const ROOM_CAMERA_TARGETS = {
  all: { pos: [9, 8, 9], lookAt: [0, 0, 0] },
  living: { pos: [3.5, 3.2, 3.5], lookAt: [0, 0.5, 0] },
  kitchen: { pos: [-2.5, 2.8, -1.5], lookAt: [-2, 0.5, -1] },
  bedroom: { pos: [3.2, 2.8, -2.5], lookAt: [2, 0.5, -1.8] },
  workspace: { pos: [-2.8, 2.6, 2.5], lookAt: [-1.8, 0.5, 1.5] },
  balcony: { pos: [0, 2.5, 4.8], lookAt: [0, 0.5, 2.8] }
};

// Smooth Camera Controller
function CameraController({ selectedRoom }) {
  const controlsRef = useRef();
  const targetConfig = ROOM_CAMERA_TARGETS[selectedRoom] || ROOM_CAMERA_TARGETS.all;

  useFrame((state) => {
    if (controlsRef.current) {
      // Lerp camera position
      state.camera.position.lerp(
        new THREE.Vector3(...targetConfig.pos),
        0.05
      );
      // Lerp target
      controlsRef.current.target.lerp(
        new THREE.Vector3(...targetConfig.lookAt),
        0.05
      );
      controlsRef.current.update();
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enableDamping
      dampingFactor={0.06}
      maxPolarAngle={Math.PI / 2 - 0.05} // don't go below ground
      minDistance={3}
      maxDistance={22}
    />
  );
}

// Architectural Building Model
function ArchitecturalHouse({ selectedRoom, onSelectRoom, timeHour }) {
  // Sunlight calculations based on hour (6 AM - 21 PM)
  // Azimuth rotates east (morning) to west (evening)
  const angle = ((timeHour - 6) / 12) * Math.PI;
  const sunX = Math.cos(angle) * 12;
  const sunY = Math.max(1, Math.sin(angle) * 10);
  const sunZ = Math.sin(angle * 0.5) * 6;

  // Sun color temperature
  let sunColor = '#FFF5E6';
  let sunIntensity = 2.0;
  if (timeHour <= 7 || timeHour >= 18) {
    sunColor = '#FFA25B'; // Golden Hour / Sunrise warm amber
    sunIntensity = 1.4;
  } else if (timeHour >= 11 && timeHour <= 14) {
    sunColor = '#FFFFFF'; // Crisp midday sunlight
    sunIntensity = 2.4;
  }

  return (
    <group>
      {/* Sun Light Source */}
      <directionalLight
        position={[sunX, sunY, sunZ]}
        intensity={sunIntensity}
        color={sunColor}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <ambientLight intensity={timeHour >= 19 ? 0.4 : 0.7} color="#EDF2F7" />

      {/* Ground Plaza / Lawn */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]} receiveShadow>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color="#E8E2D9" roughness={0.9} />
      </mesh>

      {/* Main Concrete Foundation Slab */}
      <mesh position={[0, 0.1, 0]} receiveShadow castShadow>
        <boxGeometry args={[11, 0.2, 9]} />
        <meshStandardMaterial color="#FAF8F5" roughness={0.4} />
      </mesh>

      {/* Architectural Ceiling / Cantilever Roof */}
      <mesh position={[0, 2.6, 0]} castShadow>
        <boxGeometry args={[11.6, 0.15, 9.6]} />
        <meshStandardMaterial color="#FAF6F0" roughness={0.3} />
      </mesh>

      {/* Skylight aperture in roof */}
      <mesh position={[0, 2.6, 0]}>
        <boxGeometry args={[2.5, 0.16, 2.5]} />
        <meshStandardMaterial color="#99C0DE" transparent opacity={0.3} roughness={0.1} />
      </mesh>

      {/* ROOM 1: LIVING ROOM (Center / Front) */}
      <group position={[0, 0.2, 0]} onClick={(e) => { e.stopPropagation(); onSelectRoom('living'); }}>
        {/* Floor finish */}
        <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[5, 4.5]} />
          <meshStandardMaterial color={selectedRoom === 'living' ? '#C9AD98' : '#F2ECE4'} />
        </mesh>
        {/* Modern Sectional Sofa */}
        <mesh position={[0, 0.35, -0.8]} castShadow>
          <boxGeometry args={[2.8, 0.45, 1.2]} />
          <meshStandardMaterial color="#2B394A" roughness={0.8} />
        </mesh>
        {/* Coffee Table */}
        <mesh position={[0, 0.2, 0.3]} castShadow>
          <boxGeometry args={[1.5, 0.2, 0.7]} />
          <meshStandardMaterial color="#D7C2B0" roughness={0.3} />
        </mesh>
        {/* Glass Sliding Wall to Balcony */}
        <mesh position={[0, 1.2, 2.2]}>
          <boxGeometry args={[4.8, 2.2, 0.05]} />
          <meshStandardMaterial color="#C4DBE8" transparent opacity={0.3} roughness={0.1} />
        </mesh>
      </group>

      {/* ROOM 2: KITCHEN (Left Rear) */}
      <group position={[-3.2, 0.2, -2.2]} onClick={(e) => { e.stopPropagation(); onSelectRoom('kitchen'); }}>
        <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[3.8, 3.8]} />
          <meshStandardMaterial color={selectedRoom === 'kitchen' ? '#C9AD98' : '#E8EFF2'} />
        </mesh>
        {/* Kitchen Island Counter */}
        <mesh position={[0, 0.5, 0]} castShadow>
          <boxGeometry args={[2.2, 0.9, 1.0]} />
          <meshStandardMaterial color="#1D2E40" roughness={0.2} />
        </mesh>
        {/* Rear Cabinet Wall */}
        <mesh position={[0, 1.1, -1.7]} castShadow>
          <boxGeometry args={[3.6, 2.0, 0.4]} />
          <meshStandardMaterial color="#FAF6F0" roughness={0.4} />
        </mesh>
      </group>

      {/* ROOM 3: MASTER BEDROOM (Right Rear) */}
      <group position={[3.2, 0.2, -2.2]} onClick={(e) => { e.stopPropagation(); onSelectRoom('bedroom'); }}>
        <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[4.0, 3.8]} />
          <meshStandardMaterial color={selectedRoom === 'bedroom' ? '#C9AD98' : '#EFEBE4'} />
        </mesh>
        {/* King Bed Frame */}
        <mesh position={[0, 0.35, -0.6]} castShadow>
          <boxGeometry args={[2.2, 0.5, 2.2]} />
          <meshStandardMaterial color="#EAE3E0" roughness={0.6} />
        </mesh>
        {/* Headboard */}
        <mesh position={[0, 0.9, -1.7]} castShadow>
          <boxGeometry args={[2.4, 0.8, 0.15]} />
          <meshStandardMaterial color="#725F50" roughness={0.7} />
        </mesh>
      </group>

      {/* ROOM 4: WORKSPACE / STUDY (Left Front) */}
      <group position={[-3.2, 0.2, 1.8]} onClick={(e) => { e.stopPropagation(); onSelectRoom('workspace'); }}>
        <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[3.8, 3.6]} />
          <meshStandardMaterial color={selectedRoom === 'workspace' ? '#C9AD98' : '#E8ECF0'} />
        </mesh>
        {/* Executive Ergonomic Desk */}
        <mesh position={[0, 0.45, 0]} castShadow>
          <boxGeometry args={[2.0, 0.8, 0.9]} />
          <meshStandardMaterial color="#4A3B32" roughness={0.4} />
        </mesh>
        {/* Dual Monitors */}
        <mesh position={[0, 0.95, -0.1]} castShadow>
          <boxGeometry args={[1.3, 0.35, 0.08]} />
          <meshStandardMaterial color="#142334" roughness={0.2} />
        </mesh>
      </group>

      {/* ROOM 5: CANTILEVER BALCONY (Front Center Deck) */}
      <group position={[0, 0.2, 3.3]} onClick={(e) => { e.stopPropagation(); onSelectRoom('balcony'); }}>
        <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[4.8, 2.0]} />
          <meshStandardMaterial color={selectedRoom === 'balcony' ? '#C9AD98' : '#C4A88E'} roughness={0.6} />
        </mesh>
        {/* Planter boxes */}
        <mesh position={[-1.8, 0.3, 0.7]} castShadow>
          <boxGeometry args={[0.9, 0.5, 0.4]} />
          <meshStandardMaterial color="#3D5A40" roughness={0.9} />
        </mesh>
        <mesh position={[1.8, 0.3, 0.7]} castShadow>
          <boxGeometry args={[0.9, 0.5, 0.4]} />
          <meshStandardMaterial color="#3D5A40" roughness={0.9} />
        </mesh>
        {/* Glass balustrade */}
        <mesh position={[0, 0.6, 0.95]}>
          <boxGeometry args={[4.6, 1.0, 0.04]} />
          <meshStandardMaterial color="#D1E4EE" transparent opacity={0.4} />
        </mesh>
      </group>
    </group>
  );
}

export function SpatialHomeViewer({ property, selectedRoom, onSelectRoom }) {
  const [timeHour, setTimeHour] = useState(17.5); // Default to 5:30 PM Golden Hour!

  const hourLabels = {
    6: '6:00 AM (Sunrise)',
    9: '9:00 AM (Morning)',
    12: '12:00 PM (Midday)',
    15: '3:00 PM (Afternoon)',
    17.5: '5:30 PM (Golden Hour)',
    20: '8:00 PM (Evening Dusk)'
  };

  const currentRoomInfo = property.rooms3D?.find(r => r.id === selectedRoom) || {
    name: 'Full Spatial View',
    desc: 'Interactive 3D model of residence showing natural light orientation and architectural floor flow.'
  };

  return (
    <div className="relative w-full h-[520px] bg-[#101A27] rounded-xl overflow-hidden border border-vistara-border shadow-elevated flex flex-col select-none">
      
      {/* 3D Canvas */}
      <div className="relative flex-1 w-full h-full">
        <Canvas shadows camera={{ position: [9, 8, 9], fov: 48 }}>
          <CameraController selectedRoom={selectedRoom} />
          <ArchitecturalHouse
            selectedRoom={selectedRoom}
            onSelectRoom={onSelectRoom}
            timeHour={timeHour}
          />
        </Canvas>

        {/* Top Left: Active Room Tag & Info */}
        <div className="absolute top-4 left-4 z-10 max-w-sm bg-vistara-surface/95 border border-vistara-border p-3 rounded-lg shadow-card text-xs">
          <div className="flex items-center justify-between gap-2">
            <span className="font-bold text-vistara-primary text-sm">
              {currentRoomInfo.name}
            </span>
            {selectedRoom !== 'all' && (
              <button
                type="button"
                onClick={() => onSelectRoom('all')}
                className="text-[11px] font-semibold text-vistara-accent hover:underline flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" /> Full Overview
              </button>
            )}
          </div>
          <p className="text-[11px] text-vistara-secondary mt-1 leading-relaxed">
            {currentRoomInfo.desc}
          </p>
        </div>

        {/* Top Right: Orientation & Compass */}
        <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
          <div className="bg-vistara-surface/90 border border-vistara-border px-3 py-1.5 rounded-full shadow-subtle flex items-center gap-2 text-xs font-semibold text-vistara-primary">
            <Compass className="w-3.5 h-3.5 text-vistara-accent animate-spin-slow" />
            <span>North-East Facing</span>
          </div>
        </div>

        {/* Room Navigation Hotspot Tabs */}
        <div className="absolute bottom-16 left-4 right-4 z-10 flex items-center justify-center">
          <div className="flex flex-wrap gap-1.5 bg-vistara-surface/95 border border-vistara-border p-1.5 rounded-lg shadow-card text-xs">
            <button
              onClick={() => onSelectRoom('all')}
              className={`px-2.5 py-1 rounded transition-colors ${
                selectedRoom === 'all'
                  ? 'bg-[#142334] text-white font-semibold'
                  : 'text-vistara-secondary hover:text-vistara-primary'
              }`}
            >
              Full Model
            </button>
            {property.rooms3D?.map(room => (
              <button
                key={room.id}
                onClick={() => onSelectRoom(room.id)}
                className={`px-2.5 py-1 rounded transition-colors ${
                  selectedRoom === room.id
                    ? 'bg-[#142334] text-white font-semibold'
                    : 'text-vistara-secondary hover:text-vistara-primary'
                }`}
              >
                {room.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar: Day-in-this-Home Sunlight Slider & Phase Presets */}
      <div className="bg-vistara-surface border-t border-vistara-border px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 z-20 text-xs">
        <div className="flex items-center gap-2 text-vistara-primary font-semibold flex-shrink-0">
          <Sun className="w-4 h-4 text-amber-500" />
          <span className="hidden sm:inline">Sunlight:</span>
          <span className="text-vistara-accent font-bold">
            {timeHour === 17.5 ? '5:30 PM (Golden Hour)' : hourLabels[timeHour] || `${Math.floor(timeHour)}:${timeHour % 1 === 0 ? '00' : '30'} ${timeHour >= 12 ? 'PM' : 'AM'}`}
          </span>
        </div>

        {/* 4 Requested Phase Presets */}
        <div className="flex items-center gap-1.5">
          {[
            { label: 'Morning (8 AM)', hour: 8 },
            { label: 'Afternoon (1 PM)', hour: 13 },
            { label: 'Golden Hour (5:30 PM)', hour: 17.5 },
            { label: 'Evening (7:30 PM)', hour: 19.5 }
          ].map(phase => (
            <button
              key={phase.label}
              type="button"
              onClick={() => setTimeHour(phase.hour)}
              className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-all ${
                timeHour === phase.hour
                  ? 'bg-amber-500 text-white shadow-sm'
                  : 'bg-vistara-elevated hover:bg-vistara-border/50 text-vistara-primary border border-vistara-border'
              }`}
            >
              {phase.label}
            </button>
          ))}
        </div>

        {/* Time slider */}
        <div className="flex items-center gap-2 w-full sm:w-44">
          <span className="text-[10px] text-vistara-secondary font-mono">6 AM</span>
          <input
            type="range"
            min="6"
            max="20"
            step="0.5"
            value={timeHour}
            onChange={(e) => setTimeHour(parseFloat(e.target.value))}
            className="w-full h-1.5 bg-vistara-elevated rounded-lg appearance-none cursor-pointer accent-amber-500"
          />
          <span className="text-[10px] text-vistara-secondary font-mono">8 PM</span>
        </div>
      </div>

    </div>
  );
}
