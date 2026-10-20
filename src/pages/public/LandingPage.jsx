import React, { useState, useMemo } from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  Compass, 
  Layers, 
  Scale, 
  ShieldCheck, 
  Sun, 
  Building, 
  Briefcase, 
  User, 
  CheckCircle2,
  LogIn,
  Sliders,
  Clock,
  MapPin,
  Heart,
  Volume2,
  Laptop,
  Trees,
  Users2,
  Check,
  ChevronRight,
  Eye,
  Calendar,
  Maximize2
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import { VistaraLogo } from '../../components/common/VistaraLogo';
import { FitScoreBadge } from '../../components/common/FitScoreBadge';
import { HomeDNARadar } from '../../components/common/HomeDNARadar';
import { SplineSceneViewer } from '../../components/spatial/SplineSceneViewer';
import { ContainerScroll } from '../../components/ui/container-scroll-animation';
import { GlowCard } from '../../components/ui/spotlight-card';
import { useApp } from '../../context/AppContext';


export function LandingPage({ onNavigate }) {
  const { launchJudgeDemo } = useApp();

  // ----------------------------------------------------
  // CHAPTER 01 & 02: Interactive Lifestyle Sliders
  // ----------------------------------------------------
  const [quietVal, setQuietVal] = useState(88);
  const [lightVal, setLightVal] = useState(92);
  const [wfhVal, setWfhVal] = useState(85);
  const [greenVal, setGreenVal] = useState(78);
  const [commuteMax, setCommuteMax] = useState(25);
  const [socialVal, setSocialVal] = useState(65);

  // Dynamic user profile synthesis based on slider values
  const userProfileName = useMemo(() => {
    if (quietVal >= 80 && greenVal >= 75) return "Quiet Nature Commuter";
    if (lightVal >= 85 && wfhVal >= 80) return "Sunlit Remote Technologist";
    if (socialVal >= 75 && lightVal >= 75) return "Vibrant Coastal Entertainer";
    return "Balanced Urban Professional";
  }, [quietVal, lightVal, wfhVal, greenVal, socialVal]);

  // ----------------------------------------------------
  // CHAPTER 03: Dynamic Fit Scoring across sample homes
  // ----------------------------------------------------
  const sampleHomes = useMemo(() => {
    // Thoraipakkam Sunlit Atrium (strong in light & WFH, moderate quiet)
    const fit1 = Math.min(98, Math.max(55, Math.round(
      (lightVal * 0.35) + (wfhVal * 0.30) + (quietVal * 0.20) + ((45 - commuteMax) * 0.35)
    )));

    // Adyar River Villa (strong in quiet, green, luxury)
    const fit2 = Math.min(99, Math.max(50, Math.round(
      (quietVal * 0.35) + (greenVal * 0.35) + (lightVal * 0.15) + (socialVal * 0.15)
    )));

    // Besant Nagar Loft (strong in coastal breeze, social, moderate commute)
    const fit3 = Math.min(97, Math.max(52, Math.round(
      (socialVal * 0.35) + (lightVal * 0.25) + (greenVal * 0.20) + (quietVal * 0.20)
    )));

    return [
      {
        id: 'sample-1',
        title: 'The Sunlit Atrium',
        location: 'OMR - Thoraipakkam',
        bhk: 3,
        area: 1680,
        price: '₹1.15 Cr',
        fitScore: fit1,
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
        dna: { quiet: 82, naturalLight: 95, workFriendly: 92, green: 76, social: 70, familyFriendly: 84 },
        strongMatches: ['Dual-aspect natural daylight (95/100)', 'Dedicated acoustic study with high-speed fiber conduits', 'Under 18 mins to Tidel Park'],
        goodMatches: ['Cross-ventilation atrium layout', 'Covered parking with EV charging'],
        tradeoff: 'Balcony faces interior residential courtyard rather than arterial road'
      },
      {
        id: 'sample-2',
        title: 'The River-Canopy Villa',
        location: 'Boat Club / Adyar',
        bhk: 4,
        area: 3450,
        price: '₹8.40 Cr',
        fitScore: fit2,
        image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
        dna: { quiet: 96, naturalLight: 88, workFriendly: 90, green: 95, social: 85, familyFriendly: 92 },
        strongMatches: ['Acoustic stillness (96/100) insulated by mature rain trees', 'Direct Adyar riverbank canopy views', 'Full private security enclave'],
        goodMatches: ['Private plunge deck', 'Double-height library ceiling'],
        tradeoff: 'Substantially higher capital acquisition budget'
      },
      {
        id: 'sample-3',
        title: 'Coastal Breeze Loft',
        location: 'Besant Nagar',
        bhk: 3,
        area: 1920,
        price: '₹2.85 Cr',
        fitScore: fit3,
        image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
        dna: { quiet: 78, naturalLight: 91, workFriendly: 80, green: 84, social: 90, familyFriendly: 82 },
        strongMatches: ['5-minute walk to Elliot’s Beach', 'East-facing sea breeze ventilation', 'High walking score to cafes & arts centers'],
        goodMatches: ['Rooftop sunset terrace', 'Open entertainer kitchen'],
        tradeoff: 'Higher ambient weekend activity from beach promenade'
      }
    ].sort((a, b) => b.fitScore - a.fitScore);
  }, [quietVal, lightVal, wfhVal, greenVal, commuteMax, socialVal]);

  // ----------------------------------------------------
  // CHAPTER 05: See My Home - Interactive Spatial Tab
  // ----------------------------------------------------
  const [spatialTab, setSpatialTab] = useState('3d'); // '3d' | 'floorplan' | 'gallery'
  const [activeRoomIndex, setActiveRoomIndex] = useState(0);
  const sampleRooms = [
    { name: 'Double-Height Living Atrium', dimensions: '22 x 18 ft', daylight: '95%', desc: 'Clerestory windows illuminate natural stone flooring with zero afternoon glare.' },
    { name: 'Acoustic Work Sanctuary', dimensions: '14 x 12 ft', daylight: '88%', desc: 'Sound-dampened solid core door, dual CAT-6 ports, and corner garden view.' },
    { name: 'Master Sunset Suite', dimensions: '18 x 16 ft', daylight: '91%', desc: 'Cross-breeze balcony with golden hour warm glow from 4:30 PM to 6:00 PM.' },
    { name: 'Open Kitchen & Breakfast Bar', dimensions: '16 x 11 ft', daylight: '84%', desc: 'Granite prep island connecting seamlessly with dining circulation flow.' }
  ];

  // ----------------------------------------------------
  // CHAPTER 06: Sunlight / Golden Hour Simulator
  // ----------------------------------------------------
  const [sunlightTime, setSunlightTime] = useState('goldenHour'); // 'morning' | 'noon' | 'goldenHour' | 'evening'
  const sunlightStates = {
    morning: {
      time: '08:00 AM — Dawn Orientation',
      angle: '45° East',
      lux: '14,200 Lux',
      desc: 'Gentle low-angle sunlight strikes the breakfast nook and east balcony through rain tree leaves.',
      bgGradient: 'from-amber-100/40 via-sky-50/20 to-transparent dark:from-amber-950/20 dark:via-sky-950/10'
    },
    noon: {
      time: '01:00 PM — Solar Zenith',
      angle: '88° Overhead',
      lux: '32,000 Lux (Diffused by Overhangs)',
      desc: 'Architectural deep eaves shield living interiors, preventing heat build-up while keeping rooms filled with indirect white light.',
      bgGradient: 'from-blue-100/30 via-slate-50/10 to-transparent dark:from-blue-950/20 dark:via-slate-900/10'
    },
    goldenHour: {
      time: '04:30 PM — Golden Hour Warmth',
      angle: '28° South-West',
      lux: '9,800 Lux (Warm 3200K)',
      desc: 'Warm amber tones wash across the teak dining table and private terrace. Ideal living atmosphere.',
      bgGradient: 'from-amber-200/50 via-orange-100/30 to-amber-50/10 dark:from-amber-950/40 dark:via-orange-950/20'
    },
    evening: {
      time: '07:00 PM — Twilight Stillness',
      angle: 'Dusk',
      lux: 'Ambient City Glow',
      desc: 'Cool offshore Bay of Bengal breeze begins. Warm interior recessed warm LED accents take over.',
      bgGradient: 'from-indigo-900/30 via-slate-900/20 to-transparent dark:from-indigo-950/50 dark:via-slate-950/30'
    }
  };

  // ----------------------------------------------------
  // CHAPTER 10: Decision Room Simulator
  // ----------------------------------------------------
  const [decisionBucket, setDecisionBucket] = useState({
    mustHave: ['The Sunlit Atrium'],
    niceToHave: ['Coastal Breeze Loft'],
    concern: ['The River-Canopy Villa'],
    reject: []
  });

  return (
    <div className="min-h-screen bg-vistara-bg text-vistara-primary">
      
      {/* ====================================================
          EDITORIAL HERO SECTION
          ==================================================== */}
      <section className="relative pt-16 pb-20 border-b border-vistara-border overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-vistara-elevated border border-vistara-border text-xs font-semibold text-vistara-secondary mb-6 w-fit">
                <Sparkles className="w-3.5 h-3.5 text-vistara-accent" />
                <span>ARCHITECTURAL REAL ESTATE INTELLIGENCE</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-vistara-primary mb-6">
                Find a home that fits your life.
              </h1>

              <p className="text-base sm:text-lg text-vistara-secondary font-normal leading-relaxed max-w-2xl mb-8">
                Vistara does not just show you properties. It understands your living preferences, analyzes spatial Home DNA, and explains the trade-offs behind each home.
              </p>

              {/* High-contrast public CTAs */}
              <div className="flex flex-wrap items-center gap-3">
                <Button
                  size="lg"
                  variant="primary"
                  icon={ArrowRight}
                  iconPosition="right"
                  onClick={() => onNavigate('signup')}
                >
                  Get Started
                </Button>
                
                <Button
                  size="lg"
                  variant="secondary"
                  icon={LogIn}
                  onClick={() => onNavigate('login')}
                >
                  Log In
                </Button>

                <Button
                  size="lg"
                  variant="ghost"
                  onClick={() => {
                    const el = document.getElementById('story-start');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Explore How Vistara Works ↓
                </Button>
              </div>

              {/* Factual Product Markers */}
              <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-vistara-border text-xs">
                <div>
                  <div className="text-2xl font-bold text-vistara-primary">15+</div>
                  <div className="text-vistara-secondary mt-0.5">Chennai Micro-Markets</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-vistara-accent">7-Axis</div>
                  <div className="text-vistara-secondary mt-0.5">LifeFit Compatibility</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-vistara-primary">Spatial 3D</div>
                  <div className="text-vistara-secondary mt-0.5">Architectural Simulation</div>
                </div>
              </div>
            </div>

            {/* Hero Right: Live Interactive LifeFit Experience Preview */}
            <div className="lg:col-span-5 relative">
              <div className="relative bg-vistara-surface border border-vistara-border rounded-2xl p-5 shadow-card overflow-hidden">
                <div className="flex items-center justify-between mb-3 text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-vistara-primary">
                    <Sliders className="w-3.5 h-3.5 text-vistara-accent" />
                    <span>Live LifeFit Calibration</span>
                  </div>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-vistara-elevated border border-vistara-border text-vistara-secondary">
                    {userProfileName}
                  </span>
                </div>

                <div className="aspect-[16/10] rounded-xl overflow-hidden bg-vistara-elevated relative mb-3 group">
                  <img
                    src={sampleHomes[0]?.image}
                    alt={sampleHomes[0]?.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 right-3">
                    <FitScoreBadge score={sampleHomes[0]?.fitScore || 92} size="sm" showLabel={true} />
                  </div>
                  <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded bg-black/80 backdrop-blur-sm text-white text-xs font-semibold">
                    {sampleHomes[0]?.title} • {sampleHomes[0]?.location}
                  </div>
                </div>

                {/* 3 Interactive Sliders */}
                <div className="space-y-2.5 p-3 bg-vistara-elevated rounded-xl border border-vistara-border mb-3 text-xs">
                  <div>
                    <div className="flex justify-between items-center text-[11px] mb-1">
                      <span className="text-vistara-secondary font-medium">Quiet Living</span>
                      <span className="font-mono font-bold text-vistara-primary">{quietVal}%</span>
                    </div>
                    <input
                      type="range"
                      min="40"
                      max="98"
                      value={quietVal}
                      onChange={(e) => setQuietVal(Number(e.target.value))}
                      className="w-full accent-[#142334] h-1.5 bg-vistara-border rounded-lg cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center text-[11px] mb-1">
                      <span className="text-vistara-secondary font-medium">Natural Light</span>
                      <span className="font-mono font-bold text-vistara-primary">{lightVal}%</span>
                    </div>
                    <input
                      type="range"
                      min="40"
                      max="98"
                      value={lightVal}
                      onChange={(e) => setLightVal(Number(e.target.value))}
                      className="w-full accent-[#142334] h-1.5 bg-vistara-border rounded-lg cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center text-[11px] mb-1">
                      <span className="text-vistara-secondary font-medium">Work From Home</span>
                      <span className="font-mono font-bold text-vistara-primary">{wfhVal}%</span>
                    </div>
                    <input
                      type="range"
                      min="40"
                      max="98"
                      value={wfhVal}
                      onChange={(e) => setWfhVal(Number(e.target.value))}
                      className="w-full accent-[#142334] h-1.5 bg-vistara-border rounded-lg cursor-pointer"
                    />
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-vistara-primary">Why This Home Matches:</span>
                    <span className="text-emerald-700 dark:text-emerald-300 font-semibold">{sampleHomes[0]?.fitScore}% High LifeFit</span>
                  </div>
                  <p className="text-vistara-secondary leading-relaxed">
                    {sampleHomes[0]?.strongMatches[0]}. {sampleHomes[0]?.strongMatches[1]}.
                  </p>
                  <div className="pt-2 border-t border-vistara-border/60 flex items-center justify-between text-[11px] text-vistara-secondary">
                    <span>{sampleHomes[0]?.bhk} BHK • {sampleHomes[0]?.area} sq.ft</span>
                    <span className="font-mono font-bold text-vistara-accent">{sampleHomes[0]?.price}</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* ====================================================
          10-CHAPTER INTERACTIVE PRODUCT STORY
          ==================================================== */}
      <div id="story-start" className="divide-y divide-vistara-border">

        {/* ----------------------------------------------------
            CHAPTER 01: UNDERSTAND ME
            ---------------------------------------------------- */}
        <section className="py-20 bg-vistara-surface">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-vistara-accent">
                CHAPTER 01 — UNDERSTAND ME
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-vistara-primary mt-2">
                We start with how you live, not hundreds of random listings.
              </h2>
              <p className="text-sm text-vistara-secondary mt-3 leading-relaxed">
                Traditional portals ask for BHK and price, then dump thousands of uncurated links. Vistara analyzes your everyday living dimensions first. Move the sliders below to see your profile and home matches adapt in real time.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {/* Slider 1: Quiet Living */}
              <div className="p-5 bg-vistara-bg border border-vistara-border rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Volume2 className="w-4 h-4 text-vistara-accent" />
                    <span className="font-bold text-xs text-vistara-primary">Quiet Living</span>
                  </div>
                  <span className="font-mono font-bold text-xs text-vistara-accent">{quietVal}%</span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="100"
                  value={quietVal}
                  onChange={(e) => setQuietVal(Number(e.target.value))}
                  className="w-full accent-[#142334] cursor-pointer"
                />
                <p className="text-[11px] text-vistara-secondary mt-2">
                  Acoustic buffer from arterial roads and horn decibels.
                </p>
              </div>

              {/* Slider 2: Natural Light */}
              <div className="p-5 bg-vistara-bg border border-vistara-border rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Sun className="w-4 h-4 text-amber-500" />
                    <span className="font-bold text-xs text-vistara-primary">Natural Light</span>
                  </div>
                  <span className="font-mono font-bold text-xs text-vistara-accent">{lightVal}%</span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="100"
                  value={lightVal}
                  onChange={(e) => setLightVal(Number(e.target.value))}
                  className="w-full accent-[#142334] cursor-pointer"
                />
                <p className="text-[11px] text-vistara-secondary mt-2">
                  Dual-aspect windows, atrium circulation, and direct morning sun.
                </p>
              </div>

              {/* Slider 3: Work From Home */}
              <div className="p-5 bg-vistara-bg border border-vistara-border rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Laptop className="w-4 h-4 text-blue-500" />
                    <span className="font-bold text-xs text-vistara-primary">Work From Home</span>
                  </div>
                  <span className="font-mono font-bold text-xs text-vistara-accent">{wfhVal}%</span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="100"
                  value={wfhVal}
                  onChange={(e) => setWfhVal(Number(e.target.value))}
                  className="w-full accent-[#142334] cursor-pointer"
                />
                <p className="text-[11px] text-vistara-secondary mt-2">
                  Dedicated study sanctuary with isolated video conferencing acoustics.
                </p>
              </div>

              {/* Slider 4: Green Space */}
              <div className="p-5 bg-vistara-bg border border-vistara-border rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Trees className="w-4 h-4 text-emerald-600" />
                    <span className="font-bold text-xs text-vistara-primary">Green Space & Canopy</span>
                  </div>
                  <span className="font-mono font-bold text-xs text-vistara-accent">{greenVal}%</span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="100"
                  value={greenVal}
                  onChange={(e) => setGreenVal(Number(e.target.value))}
                  className="w-full accent-[#142334] cursor-pointer"
                />
                <p className="text-[11px] text-vistara-secondary mt-2">
                  Proximity to coastal parks, Adyar river greenway, or private garden deck.
                </p>
              </div>

              {/* Slider 5: Commute Ceiling */}
              <div className="p-5 bg-vistara-bg border border-vistara-border rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-purple-600" />
                    <span className="font-bold text-xs text-vistara-primary">Max Commute to IT Hub</span>
                  </div>
                  <span className="font-mono font-bold text-xs text-vistara-accent">{commuteMax} mins</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="45"
                  step="5"
                  value={commuteMax}
                  onChange={(e) => setCommuteMax(Number(e.target.value))}
                  className="w-full accent-[#142334] cursor-pointer"
                />
                <p className="text-[11px] text-vistara-secondary mt-2">
                  Peak-hour door-to-door transit tolerance to Tidel Park or OMR Expressway.
                </p>
              </div>

              {/* Slider 6: Social & Dining */}
              <div className="p-5 bg-vistara-bg border border-vistara-border rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Users2 className="w-4 h-4 text-rose-500" />
                    <span className="font-bold text-xs text-vistara-primary">Social & Walkability</span>
                  </div>
                  <span className="font-mono font-bold text-xs text-vistara-accent">{socialVal}%</span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="100"
                  value={socialVal}
                  onChange={(e) => setSocialVal(Number(e.target.value))}
                  className="w-full accent-[#142334] cursor-pointer"
                />
                <p className="text-[11px] text-vistara-secondary mt-2">
                  Walking distance to cafes, cultural centers, and weekend beach promenades.
                </p>
              </div>

            </div>
          </div>
        </section>


        {/* ----------------------------------------------------
            CHAPTER 02: BUILD MY LIFE PROFILE
            ---------------------------------------------------- */}
        <section className="py-20 bg-vistara-bg">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              <div className="lg:col-span-6">
                <span className="text-xs font-bold uppercase tracking-widest text-vistara-accent">
                  CHAPTER 02 — BUILD MY LIFE PROFILE
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-vistara-primary mt-2">
                  Your distinct personal profile.
                </h2>
                <p className="text-sm text-vistara-secondary mt-3 leading-relaxed">
                  Based on the priorities you just adjusted, Vistara synthesizes your Life Profile. This is <strong>your</strong> living blueprint—distinct from any property's physical Home DNA.
                </p>

                <div className="mt-6 p-5 bg-vistara-surface border border-vistara-border rounded-xl shadow-card">
                  <div className="flex items-center gap-2 mb-2">
                    <User className="w-4 h-4 text-vistara-accent" />
                    <span className="text-xs uppercase font-bold text-vistara-accent">SYNTHESIZED PERSONA</span>
                  </div>
                  <h3 className="text-2xl font-extrabold text-vistara-primary">{userProfileName}</h3>
                  <p className="text-xs text-vistara-secondary mt-1">
                    Prioritizing daylight penetration, sub-45dB acoustic thresholds, and disciplined commute boundaries.
                  </p>
                </div>
              </div>

              {/* Life Profile Dimension Gauge Strip */}
              <div className="lg:col-span-6 bg-vistara-surface border border-vistara-border rounded-2xl p-6 shadow-card space-y-4">
                <h4 className="font-bold text-sm text-vistara-primary border-b border-vistara-border pb-2">
                  User Life Profile Dimensions (Live)
                </h4>

                {[
                  { label: 'Acoustic Stillness', val: quietVal, color: 'bg-emerald-600' },
                  { label: 'Natural Daylight Intensity', val: lightVal, color: 'bg-amber-500' },
                  { label: 'Work From Home Suitability', val: wfhVal, color: 'bg-blue-600' },
                  { label: 'Biophilic Green Proximity', val: greenVal, color: 'bg-teal-600' },
                  { label: 'Social & Walkability Index', val: socialVal, color: 'bg-rose-500' }
                ].map(item => (
                  <div key={item.label} className="text-xs">
                    <div className="flex justify-between font-medium text-vistara-primary mb-1">
                      <span>{item.label}</span>
                      <span className="font-mono font-bold text-vistara-accent">{item.val}/100</span>
                    </div>
                    <div className="w-full bg-vistara-elevated h-2 rounded-full overflow-hidden border border-vistara-border">
                      <div className={`h-full ${item.color} rounded-full transition-all duration-300`} style={{ width: `${item.val}%` }} />
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </section>


        {/* ----------------------------------------------------
            CHAPTER 03: FIND MY FIT
            ---------------------------------------------------- */}
        <section className="py-20 bg-vistara-surface">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-vistara-accent">
                CHAPTER 03 — FIND MY FIT
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-vistara-primary mt-2">
                Watch candidate homes re-rank as your life changes.
              </h2>
              <p className="text-sm text-vistara-secondary mt-3 leading-relaxed">
                Fit Scores are not static labels. When you value natural light or shorter commutes, properties dynamically shift ranking positions based on real spatial and location data.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {sampleHomes.map((home, idx) => (
                <GlowCard
                  key={home.id}
                  customSize={true}
                  glowColor={idx === 0 ? 'orange' : idx === 1 ? 'blue' : 'purple'}
                  className={`bg-vistara-bg border rounded-xl overflow-hidden shadow-card transition-all ${
                    idx === 0 ? 'border-vistara-accent ring-1 ring-vistara-accent/20' : 'border-vistara-border'
                  }`}
                >
                  <div className="flex flex-col h-full justify-between">
                    <div>
                      <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-gray-200 mb-4">
                        <img src={home.image} alt={home.title} className="w-full h-full object-cover" />
                        <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-black/80 text-white text-xs font-bold">
                          #{idx + 1} Best Fit
                        </div>
                        <div className="absolute top-3 right-3">
                          <FitScoreBadge score={home.fitScore} size="sm" showLabel={true} />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <div className="text-xs text-vistara-secondary font-medium">{home.location}</div>
                          <h4 className="font-bold text-base text-vistara-primary mt-0.5">{home.title}</h4>
                          <div className="text-xs font-semibold text-vistara-accent mt-1">
                            {home.bhk} BHK • {home.area} sq.ft • {home.price}
                          </div>
                        </div>

                        <div className="text-xs text-vistara-secondary space-y-1 pt-2 border-t border-vistara-border">
                          <div className="text-emerald-700 dark:text-emerald-300 font-medium flex items-center gap-1.5">
                            <Check className="w-3.5 h-3.5" />
                            <span>{home.strongMatches[0]}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-vistara-border/60 flex items-center justify-between text-xs">
                      <span className="text-[11px] text-vistara-secondary font-mono">Spotlight Active</span>
                      <span className="text-vistara-accent font-semibold flex items-center gap-1">
                        Explore DNA <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </GlowCard>
              ))}
            </div>
          </div>
        </section>


        {/* ----------------------------------------------------
            CHAPTER 04: WHY THIS HOME?
            ---------------------------------------------------- */}
        <section className="py-20 bg-vistara-bg">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-vistara-accent">
                CHAPTER 04 — WHY THIS HOME?
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-vistara-primary mt-2">
                Explainable matching. Zero arbitrary scores.
              </h2>
              <p className="text-sm text-vistara-secondary mt-3 leading-relaxed">
                Vistara never presents a score without defending it. We break down the exact architectural, acoustic, and transit components that justify the match.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Strong Matches */}
              <div className="p-6 bg-vistara-surface border border-vistara-border rounded-xl shadow-card">
                <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300 mb-4">
                  <CheckCircle2 className="w-5 h-5" />
                  <h3 className="font-bold text-base text-vistara-primary">Strong Match</h3>
                </div>
                <ul className="space-y-3 text-xs text-vistara-secondary">
                  <li className="p-3 bg-vistara-bg rounded-lg border border-vistara-border">
                    <strong className="text-vistara-primary block mb-0.5">Natural Daylight Index (95/100)</strong>
                    East-facing clerestory glass floods morning living areas with glare-free ambient light.
                  </li>
                  <li className="p-3 bg-vistara-bg rounded-lg border border-vistara-border">
                    <strong className="text-vistara-primary block mb-0.5">Quiet Residential Enclave (82/100)</strong>
                    Set 400m back from OMR expressway. Decibel levels average sub-44dB in study.
                  </li>
                  <li className="p-3 bg-vistara-bg rounded-lg border border-vistara-border">
                    <strong className="text-vistara-primary block mb-0.5">Commute to Tidel Park (18 Mins)</strong>
                    Well within your target 25-minute transit threshold.
                  </li>
                </ul>
              </div>

              {/* Good Matches */}
              <div className="p-6 bg-vistara-surface border border-vistara-border rounded-xl shadow-card">
                <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300 mb-4">
                  <Compass className="w-5 h-5" />
                  <h3 className="font-bold text-base text-vistara-primary">Good Match</h3>
                </div>
                <ul className="space-y-3 text-xs text-vistara-secondary">
                  <li className="p-3 bg-vistara-bg rounded-lg border border-vistara-border">
                    <strong className="text-vistara-primary block mb-0.5">Dual Work-from-Home Alcoves</strong>
                    Space for 2 separate desk setups without sacrificing master bedroom circulation.
                  </li>
                  <li className="p-3 bg-vistara-bg rounded-lg border border-vistara-border">
                    <strong className="text-vistara-primary block mb-0.5">Biophilic Tree Canopy (76/100)</strong>
                    Living room overlooks private planted perimeter with flowering gulmohar trees.
                  </li>
                </ul>
              </div>

              {/* Transparent Trade-offs */}
              <div className="p-6 bg-vistara-surface border border-amber-300/40 rounded-xl shadow-card">
                <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 mb-4">
                  <Scale className="w-5 h-5" />
                  <h3 className="font-bold text-base text-vistara-primary">Honest Trade-off</h3>
                </div>
                <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg text-xs space-y-2">
                  <strong className="text-vistara-primary block">Narrow Secondary Balcony</strong>
                  <p className="text-vistara-secondary leading-relaxed">
                    The guest bedroom balcony measures 4.5 ft in depth—suitable for potted herbs and a single reading chair, but not expansive outdoor dining.
                  </p>
                  <p className="text-[11px] font-semibold text-amber-800 dark:text-amber-300">
                    We disclose this immediately so you never waste a weekend walkthrough.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>


        {/* ----------------------------------------------------
            CHAPTER 05: SEE MY HOME
            ---------------------------------------------------- */}
        <section className="py-20 bg-vistara-surface">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-vistara-accent">
                CHAPTER 05 — SEE MY HOME
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-vistara-primary mt-2">
                Spatial dimensions, floor plans & immersive previews.
              </h2>
              <p className="text-sm text-vistara-secondary mt-3 leading-relaxed">
                Step beyond flat photos. Inspect room hotspots, architectural proportions, and circulation flow before visiting in person.
              </p>
            </div>

            <div className="bg-vistara-bg border border-vistara-border rounded-2xl p-6 shadow-card">
              
              {/* Tab Selector */}
              <div className="flex items-center gap-2 border-b border-vistara-border pb-4 mb-6 text-xs">
                <button
                  onClick={() => setSpatialTab('3d')}
                  className={`px-4 py-2 rounded-lg font-bold transition-colors ${
                    spatialTab === '3d' ? 'bg-[#142334] text-white' : 'bg-vistara-surface text-vistara-secondary hover:text-vistara-primary'
                  }`}
                >
                  Immersive Preview (Hotspots)
                </button>
                <button
                  onClick={() => setSpatialTab('floorplan')}
                  className={`px-4 py-2 rounded-lg font-bold transition-colors ${
                    spatialTab === 'floorplan' ? 'bg-[#142334] text-white' : 'bg-vistara-surface text-vistara-secondary hover:text-vistara-primary'
                  }`}
                >
                  Interactive Floor Plan
                </button>
                <button
                  onClick={() => setSpatialTab('gallery')}
                  className={`px-4 py-2 rounded-lg font-bold transition-colors ${
                    spatialTab === 'gallery' ? 'bg-[#142334] text-white' : 'bg-vistara-surface text-vistara-secondary hover:text-vistara-primary'
                  }`}
                >
                  Architectural Gallery
                </button>
                <button
                  onClick={() => setSpatialTab('scroll')}
                  className={`px-4 py-2 rounded-lg font-bold transition-colors ${
                    spatialTab === 'scroll' ? 'bg-[#142334] text-white' : 'bg-vistara-surface text-vistara-secondary hover:text-vistara-primary'
                  }`}
                >
                  Scroll 3D Perspective
                </button>
              </div>

              {/* Tab: Immersive Scroll Projection with ContainerScroll */}
              {spatialTab === 'scroll' && (
                <div className="py-2 overflow-hidden rounded-xl bg-vistara-surface border border-vistara-border">
                  <ContainerScroll
                    titleComponent={
                      <div className="mb-4">
                        <span className="text-xs uppercase tracking-widest font-bold text-vistara-accent">
                          IMMERSIVE SCROLL PROJECTION
                        </span>
                        <h3 className="text-3xl sm:text-5xl font-extrabold text-vistara-primary mt-2">
                          Dynamic Architectural Tilt & Elevation
                        </h3>
                        <p className="text-xs sm:text-sm text-vistara-secondary mt-2 max-w-lg mx-auto">
                          Scroll down to rotate and tilt the residence into natural perspective.
                        </p>
                      </div>
                    }
                  >
                    <div className="relative w-full h-full rounded-2xl overflow-hidden group">
                      <img
                        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80"
                        alt="The Sunlit Atrium"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#142334]/90 via-black/30 to-transparent flex flex-col justify-end p-6 sm:p-8 text-white">
                        <div className="text-xs uppercase tracking-widest font-semibold text-amber-300 mb-1">
                          Vistara Signature Architectural Residence
                        </div>
                        <h4 className="text-xl sm:text-3xl font-bold">The Sunlit Atrium • Thoraipakkam</h4>
                        <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-white/80 mt-2">
                          <span>3 BHK • 1,680 sq.ft</span>
                          <span>•</span>
                          <span>Daylight Score 95/100</span>
                          <span>•</span>
                          <span className="bg-emerald-600/90 px-2 py-0.5 rounded font-bold text-white">96% LifeFit</span>
                        </div>
                      </div>
                    </div>
                  </ContainerScroll>
                </div>
              )}

              {/* Tab 1: Immersive Hotspot Showcase with Spline 3D Storytelling */}
              {spatialTab === '3d' && (
                <div className="space-y-6">
                  <SplineSceneViewer 
                    title="Architectural Spatial Storytelling • The Sunlit Atrium"
                    fallbackImage="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=80"
                  />

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
                    {sampleRooms.map((r, i) => (
                      <div
                        key={r.name}
                        onClick={() => setActiveRoomIndex(i)}
                        className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                          activeRoomIndex === i
                            ? 'bg-vistara-surface border-vistara-accent shadow-card ring-1 ring-vistara-accent/30'
                            : 'bg-vistara-surface/60 border-vistara-border hover:border-vistara-accent/50'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <strong className="text-vistara-primary text-xs font-bold">{r.name}</strong>
                          <span className="text-[10px] font-mono text-amber-600 font-bold">{r.daylight}</span>
                        </div>
                        <span className="text-[11px] font-mono text-vistara-secondary block mb-1">{r.dimensions}</span>
                        <p className="text-[10px] text-vistara-secondary line-clamp-2 leading-relaxed">{r.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 2: Floor Plan */}
              {spatialTab === 'floorplan' && (
                <div className="p-8 text-center bg-vistara-surface rounded-xl border border-vistara-border">
                  <div className="max-w-md mx-auto space-y-3">
                    <Layers className="w-8 h-8 text-vistara-accent mx-auto" />
                    <h4 className="font-bold text-base text-vistara-primary">Architectural CAD Blueprint</h4>
                    <p className="text-xs text-vistara-secondary">
                      Full dimensioned floor plan showing carpet area ratios, acoustic insulation boundaries, and cross-ventilation flow.
                    </p>
                    <div className="p-4 bg-vistara-bg rounded-lg border font-mono text-xs text-left space-y-1">
                      <div>Carpet Area: 1,680 sq.ft (82% efficiency ratio)</div>
                      <div>Balcony Depth: 6.5 ft East Terrace</div>
                      <div>Ceiling Clearance: 10.5 ft floor-to-soffit</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 3: Gallery */}
              {spatialTab === 'gallery' && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80" alt="Living" className="rounded-lg object-cover h-48 w-full" />
                  <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80" alt="Study" className="rounded-lg object-cover h-48 w-full" />
                  <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80" alt="Balcony" className="rounded-lg object-cover h-48 w-full" />
                </div>
              )}

            </div>
          </div>
        </section>


        {/* ----------------------------------------------------
            CHAPTER 06: FEEL THE LIGHT
            ---------------------------------------------------- */}
        <section className="py-20 bg-vistara-bg">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-vistara-accent">
                CHAPTER 06 — FEEL THE LIGHT
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-vistara-primary mt-2">
                Sunlight and golden-hour solar simulation.
              </h2>
              <p className="text-sm text-vistara-secondary mt-3 leading-relaxed">
                Chennai's tropical sun changes dramatically throughout the day. Simulate morning dawn, noon shading, and sunset golden hour before committing to a lease or purchase.
              </p>
            </div>

            <div className="bg-vistara-surface border border-vistara-border rounded-2xl p-6 shadow-card">
              
              {/* Time selection pills */}
              <div className="flex flex-wrap gap-2 mb-6">
                {[
                  { key: 'morning', label: 'Morning (08:00 AM)' },
                  { key: 'noon', label: 'Noon (01:00 PM)' },
                  { key: 'goldenHour', label: 'Golden Hour (04:30 PM)' },
                  { key: 'evening', label: 'Evening (07:00 PM)' }
                ].map(t => (
                  <button
                    key={t.key}
                    onClick={() => setSunlightTime(t.key)}
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                      sunlightTime === t.key
                        ? 'bg-[#142334] text-white shadow-md'
                        : 'bg-vistara-elevated text-vistara-secondary hover:text-vistara-primary'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {/* Simulated Lighting Display */}
              <div className={`p-8 rounded-xl border border-vistara-border bg-gradient-to-br ${sunlightStates[sunlightTime].bgGradient} transition-all duration-500`}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                  <div>
                    <span className="text-[11px] uppercase font-bold text-vistara-accent">SOLAR TIME</span>
                    <h3 className="text-xl font-extrabold text-vistara-primary mt-1">
                      {sunlightStates[sunlightTime].time}
                    </h3>
                    <div className="mt-3 space-y-1 text-xs text-vistara-secondary font-mono">
                      <div>Sun Azimuth: <strong>{sunlightStates[sunlightTime].angle}</strong></div>
                      <div>Lux Reading: <strong>{sunlightStates[sunlightTime].lux}</strong></div>
                    </div>
                  </div>

                  <div className="md:col-span-2 p-5 bg-vistara-surface/90 rounded-lg border border-vistara-border text-xs text-vistara-primary leading-relaxed">
                    <p className="font-medium text-sm mb-1 text-vistara-primary">
                      Architectural Illumination Behavior:
                    </p>
                    {sunlightStates[sunlightTime].desc}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>


        {/* ----------------------------------------------------
            CHAPTER 07: UNDERSTAND THE NEIGHBORHOOD
            ---------------------------------------------------- */}
        <section className="py-20 bg-vistara-surface">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-vistara-accent">
                CHAPTER 07 — UNDERSTAND THE NEIGHBORHOOD
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-vistara-primary mt-2">
                Context beyond the four walls.
              </h2>
              <p className="text-sm text-vistara-secondary mt-3 leading-relaxed">
                A home is inseparable from its neighborhood. We audit transit friction, sound profiles across time of day, and local capital growth trends.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
              
              {/* Card 1: Commute Matrix */}
              <div className="p-6 bg-vistara-bg border border-vistara-border rounded-xl">
                <div className="flex items-center gap-2 mb-4 text-vistara-primary font-bold text-sm">
                  <Clock className="w-4 h-4 text-vistara-accent" />
                  <span>Door-to-Door Commute</span>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-2.5 bg-vistara-surface rounded border border-vistara-border">
                    <span>Tidel Park / Ascendas</span>
                    <strong className="text-emerald-700 dark:text-emerald-300 font-mono">18 Mins</strong>
                  </div>
                  <div className="flex justify-between items-center p-2.5 bg-vistara-surface rounded border border-vistara-border">
                    <span>Chennai Int'l Airport</span>
                    <strong className="text-vistara-primary font-mono">32 Mins</strong>
                  </div>
                  <div className="flex justify-between items-center p-2.5 bg-vistara-surface rounded border border-vistara-border">
                    <span>Thoraipakkam Metro (Phase 2)</span>
                    <strong className="text-blue-700 dark:text-blue-300 font-mono">4 Mins Walk</strong>
                  </div>
                </div>
              </div>

              {/* Card 2: Sound Environment */}
              <div className="p-6 bg-vistara-bg border border-vistara-border rounded-xl">
                <div className="flex items-center gap-2 mb-4 text-vistara-primary font-bold text-sm">
                  <Volume2 className="w-4 h-4 text-vistara-accent" />
                  <span>Time-of-Day Acoustics</span>
                </div>
                <div className="space-y-3">
                  <div className="p-2.5 bg-vistara-surface rounded border border-vistara-border">
                    <div className="flex justify-between font-bold text-vistara-primary">
                      <span>Morning (6 AM - 10 AM)</span>
                      <span className="text-emerald-700 dark:text-emerald-300">38 dB (Quiet)</span>
                    </div>
                    <p className="text-[11px] text-vistara-secondary mt-1">Light neighborhood birdsong; minimal local vehicle circulation.</p>
                  </div>
                  <div className="p-2.5 bg-vistara-surface rounded border border-vistara-border">
                    <div className="flex justify-between font-bold text-vistara-primary">
                      <span>Evening (6 PM - 9 PM)</span>
                      <span className="text-amber-700 dark:text-amber-300">48 dB (Moderate)</span>
                    </div>
                    <p className="text-[11px] text-vistara-secondary mt-1">Distant transit hum from arterial road; well attenuated by double glass.</p>
                  </div>
                </div>
              </div>

              {/* Card 3: Capital & Rental Intelligence */}
              <div className="p-6 bg-vistara-bg border border-vistara-border rounded-xl">
                <div className="flex items-center gap-2 mb-4 text-vistara-primary font-bold text-sm">
                  <Building className="w-4 h-4 text-vistara-accent" />
                  <span>Market Valuation Index</span>
                </div>
                <div className="space-y-3">
                  <div className="p-2.5 bg-vistara-surface rounded border border-vistara-border">
                    <div className="text-vistara-secondary">Fair Price Range</div>
                    <div className="text-lg font-extrabold text-vistara-primary mt-0.5">₹6,800 - ₹7,200 / sq.ft</div>
                    <div className="text-[10px] text-emerald-600 font-bold mt-1">Listing is priced at fair market median</div>
                  </div>
                  <div className="p-2.5 bg-vistara-surface rounded border border-vistara-border">
                    <div className="text-vistara-secondary">Annual Capital Appreciation</div>
                    <div className="text-sm font-bold text-vistara-primary mt-0.5">+8.4% YoY in OMR Perungudi-Thoraipakkam</div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>


        {/* ----------------------------------------------------
            CHAPTER 08: KNOW THE TRADE-OFFS
            ---------------------------------------------------- */}
        <section className="py-20 bg-vistara-bg">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-vistara-accent">
                CHAPTER 08 — KNOW THE TRADE-OFFS
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-vistara-primary mt-2">
                "What You’ll Give Up." Clear, honest compromises.
              </h2>
              <p className="text-sm text-vistara-secondary mt-3 leading-relaxed">
                Every real estate decision involves trade-offs. We tell you what you sacrifice in exchange for what you gain.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs">
              
              <div className="p-6 bg-vistara-surface border border-vistara-border rounded-xl shadow-card space-y-4">
                <h4 className="text-sm font-bold text-vistara-primary">Case Study: The Sunlit Atrium (OMR)</h4>
                
                <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                  <strong className="text-emerald-800 dark:text-emerald-300 block mb-1 font-bold">+ What You Gain:</strong>
                  <p className="text-vistara-primary leading-relaxed">
                    12 minutes faster commute to IT corridor, exceptional morning natural daylight, and ₹35 Lakhs lower capital cost than central Adyar.
                  </p>
                </div>

                <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                  <strong className="text-amber-800 dark:text-amber-300 block mb-1 font-bold">− What You Give Up:</strong>
                  <p className="text-vistara-primary leading-relaxed">
                    Further distance from traditional south Chennai cultural centers (Music Academy, Mylapore temple zone), requiring weekend highway transit.
                  </p>
                </div>
              </div>

              <div className="p-6 bg-vistara-surface border border-vistara-border rounded-xl shadow-card space-y-4">
                <h4 className="text-sm font-bold text-vistara-primary">Case Study: Coastal Loft (Besant Nagar)</h4>
                
                <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                  <strong className="text-emerald-800 dark:text-emerald-300 block mb-1 font-bold">+ What You Gain:</strong>
                  <p className="text-vistara-primary leading-relaxed">
                    Unrivaled coastal walking lifestyle, ocean breeze cross-ventilation, and high walking score to iconic cafes.
                  </p>
                </div>

                <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                  <strong className="text-amber-800 dark:text-amber-300 block mb-1 font-bold">− What You Give Up:</strong>
                  <p className="text-vistara-primary leading-relaxed">
                    Higher price per square foot (₹19,200/sq.ft vs ₹6,900 on OMR) and higher weekend ambient promenade activity.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>


        {/* ----------------------------------------------------
            CHAPTER 09: COMPARE
            ---------------------------------------------------- */}
        <section className="py-20 bg-vistara-surface">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-vistara-accent">
                CHAPTER 09 — COMPARE
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-vistara-primary mt-2">
                Neutral, multi-dimensional comparison.
              </h2>
              <p className="text-sm text-vistara-secondary mt-3 leading-relaxed">
                We never declare a universal "winner" because the right choice depends on your specific lifestyle. Compare two homes side by side across real architectural dimensions.
              </p>
            </div>

            <div className="overflow-x-auto bg-vistara-bg border border-vistara-border rounded-xl shadow-card">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-vistara-border text-vistara-secondary uppercase text-[10px]">
                    <th className="p-4 font-bold">Dimension</th>
                    <th className="p-4 font-bold text-vistara-primary">The Sunlit Atrium (OMR)</th>
                    <th className="p-4 font-bold text-vistara-primary">Besant Nagar Coastal Loft</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-vistara-border/60">
                  <tr>
                    <td className="p-4 font-bold text-vistara-secondary">Capital Outlay</td>
                    <td className="p-4 font-mono font-bold text-vistara-primary">₹1.15 Cr</td>
                    <td className="p-4 font-mono font-bold text-vistara-primary">₹2.85 Cr</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-vistara-secondary">Carpet Area & BHK</td>
                    <td className="p-4 text-vistara-primary">3 BHK • 1,680 sq.ft</td>
                    <td className="p-4 text-vistara-primary">3 BHK • 1,920 sq.ft</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-vistara-secondary">LifeFit Score</td>
                    <td className="p-4"><span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-bold">96% High Fit</span></td>
                    <td className="p-4"><span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-700 dark:text-blue-300 font-bold">89% Good Fit</span></td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-vistara-secondary">Quiet Index (dB)</td>
                    <td className="p-4 text-vistara-primary">82/100 (Quiet suburban street)</td>
                    <td className="p-4 text-vistara-primary">78/100 (Moderate beach activity)</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-vistara-secondary">Commute to Tidel Park</td>
                    <td className="p-4 font-bold text-emerald-600">18 Mins</td>
                    <td className="p-4 text-vistara-primary">28 Mins</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-vistara-secondary">Key Compromise</td>
                    <td className="p-4 text-vistara-secondary">Courtyard view only</td>
                    <td className="p-4 text-vistara-secondary">Higher acquisition cost</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>


        {/* ----------------------------------------------------
            CHAPTER 10: DECIDE
            ---------------------------------------------------- */}
        <section className="py-20 bg-vistara-bg">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-vistara-accent">
                CHAPTER 10 — DECIDE
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-vistara-primary mt-2">
                The Decision Room. Collaborative, structured clarity.
              </h2>
              <p className="text-sm text-vistara-secondary mt-3 leading-relaxed">
                Buying or renting a home involves family consensus. Organize homes into intuitive decision columns, add notes, and export a neutral summary.
              </p>
            </div>

            {/* Decision Board Preview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs mb-16">
              
              <div className="p-4 bg-vistara-surface border-2 border-emerald-600/30 rounded-xl shadow-card">
                <div className="flex items-center justify-between pb-2 border-b border-vistara-border mb-3 font-bold text-emerald-700 dark:text-emerald-300">
                  <span>Must Have</span>
                  <span>1 Home</span>
                </div>
                <div className="p-3 bg-vistara-elevated rounded border border-vistara-border">
                  <div className="font-bold text-vistara-primary">The Sunlit Atrium</div>
                  <div className="text-[11px] text-vistara-secondary">Thoraipakkam • 96% Fit</div>
                  <div className="text-[10px] text-emerald-600 font-semibold mt-1">Priority: Morning light & WFH</div>
                </div>
              </div>

              <div className="p-4 bg-vistara-surface border border-vistara-border rounded-xl shadow-card">
                <div className="flex items-center justify-between pb-2 border-b border-vistara-border mb-3 font-bold text-blue-700 dark:text-blue-300">
                  <span>Nice to Have</span>
                  <span>1 Home</span>
                </div>
                <div className="p-3 bg-vistara-elevated rounded border border-vistara-border">
                  <div className="font-bold text-vistara-primary">Coastal Breeze Loft</div>
                  <div className="text-[11px] text-vistara-secondary">Besant Nagar • 89% Fit</div>
                </div>
              </div>

              <div className="p-4 bg-vistara-surface border border-vistara-border rounded-xl shadow-card">
                <div className="flex items-center justify-between pb-2 border-b border-vistara-border mb-3 font-bold text-amber-700 dark:text-amber-300">
                  <span>Concern</span>
                  <span>1 Home</span>
                </div>
                <div className="p-3 bg-vistara-elevated rounded border border-vistara-border">
                  <div className="font-bold text-vistara-primary">The River-Canopy Villa</div>
                  <div className="text-[11px] text-vistara-secondary">Boat Club • ₹8.40 Cr</div>
                  <div className="text-[10px] text-amber-600 font-semibold mt-1">Concern: Capital budget stretch</div>
                </div>
              </div>

              <div className="p-4 bg-vistara-surface border border-vistara-border rounded-xl shadow-card">
                <div className="flex items-center justify-between pb-2 border-b border-vistara-border mb-3 font-bold text-rose-700 dark:text-rose-300">
                  <span>Reject</span>
                  <span>0 Homes</span>
                </div>
                <div className="p-3 border border-dashed border-vistara-border rounded text-center text-vistara-muted">
                  Drag rejected candidates here
                </div>
              </div>

            </div>

            {/* Closing Final Call to Action */}
            <div className="p-10 sm:p-14 bg-vistara-surface border border-vistara-border rounded-3xl shadow-card text-center max-w-4xl mx-auto space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-vistara-accent">
                BEGIN YOUR DISCOVERY JOURNEY
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-vistara-primary tracking-tight">
                Find a home that fits your life.
              </h2>
              <p className="text-base text-vistara-secondary max-w-xl mx-auto leading-relaxed">
                Join Vistara to unlock complete 3D spatial models, personalized LifeFit calculations, verified documents, and collaborative decision workflows.
              </p>

              <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
                <Button
                  size="lg"
                  variant="primary"
                  icon={ArrowRight}
                  iconPosition="right"
                  onClick={() => onNavigate('signup')}
                >
                  Get Started Free
                </Button>
                <Button
                  size="lg"
                  variant="secondary"
                  icon={LogIn}
                  onClick={() => onNavigate('login')}
                >
                  Log In
                </Button>
              </div>

              <div className="pt-4 text-xs text-vistara-secondary">
                Zero spam • Client-side demo persistence • English only
              </div>
            </div>

          </div>
        </section>

      </div>

    </div>
  );
}
