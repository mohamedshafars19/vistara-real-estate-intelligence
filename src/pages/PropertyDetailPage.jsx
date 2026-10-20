import React, { useState, useMemo } from 'react';
import { 
  ArrowLeft, 
  Heart, 
  Scale, 
  Calendar, 
  Share2, 
  Download, 
  ShieldCheck, 
  Sun, 
  VolumeX, 
  Laptop, 
  Trees, 
  Users, 
  Home, 
  Building,
  Compass, 
  MapPin, 
  Check, 
  AlertTriangle, 
  TrendingDown, 
  Calculator, 
  FileText,
  Clock,
  Sparkles,
  Bell,
  BellRing,
  CheckCircle2,
  Info,
  ChevronRight,
  X,
  Layers
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { FitScoreBadge } from '../components/common/FitScoreBadge';
import { PropertyImage } from '../components/common/PropertyImage';
import { HomeDNARadar } from '../components/common/HomeDNARadar';
import { SpatialHomeViewer } from '../components/spatial/SpatialHomeViewer';
import { FloorPlanSync } from '../components/spatial/FloorPlanSync';
import { FinancialSuite } from '../components/calculators/FinancialSuite';
import { useApp } from '../context/AppContext';
import { calculateFitScore } from '../utils/fitEngine';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export function PropertyDetailPage({ propertyId, onBack, onNavigate }) {
  const { 
    properties, 
    currentUser,
    user, 
    mode, 
    savedPropertyIds, 
    toggleSaveProperty, 
    compareList, 
    toggleCompare,
    watchedPropertyIds,
    toggleWatchPrice,
    decisionRoom,
    addPropertyToDecisionRoom,
    removePropertyFromDecisionRoom,
    scheduleVisit,
    sendInquiry
  } = useApp();

  const property = properties.find(p => p.id === propertyId);

  // Compute algorithmic Fit Score with active user profile (ALWAYS before early returns)
  const fit = useMemo(() => {
    if (!property) return { score: 85, components: {}, componentScores: {}, reasons: [], strengths: [], compromises: [] };
    return calculateFitScore(property, currentUser || user);
  }, [property, currentUser, user]);

  // Synchronized room selection for 3D & Floor Plan
  const [selectedRoom, setSelectedRoom] = useState('all');

  // Life Mode Lens
  const [activeLifeMode, setActiveLifeMode] = useState('Everyday Life');

  // Active Gallery Image
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Selected Fit Dimension for detailed inspection
  const [selectedDimension, setSelectedDimension] = useState(null);

  // Modals & Feedback
  const [showVisitModal, setShowVisitModal] = useState(false);
  const [visitDate, setVisitDate] = useState('2026-09-30');
  const [visitTime, setVisitTime] = useState('11:00 AM');
  const [visitNotes, setVisitNotes] = useState('');
  const [visitBooked, setVisitBooked] = useState(false);

  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [inquiryMsg, setInquiryMsg] = useState('I would like to inquire about private spatial viewing and document verification.');
  const [inquiryPhone, setInquiryPhone] = useState('+91 98400 12345');
  const [inquirySent, setInquirySent] = useState(false);

  const [toastMessage, setToastMessage] = useState(null);
  const [showReportModal, setShowReportModal] = useState(false);

  // Financial EMI Calculator State
  const [loanTenureYears, setLoanTenureYears] = useState(20);
  const [interestRate, setInterestRate] = useState(8.5);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const isInDecisionRoom = property ? (
    (decisionRoom?.columns?.mustHave || []).includes(property.id) ||
    (decisionRoom?.columns?.niceToHave || []).includes(property.id) ||
    (decisionRoom?.columns?.concern || []).includes(property.id) ||
    (decisionRoom?.columns?.reject || []).includes(property.id)
  ) : false;

  const handleToggleDecisionRoom = () => {
    if (!property) return;
    if (isInDecisionRoom) {
      removePropertyFromDecisionRoom(property.id);
      showToast("Removed from Decision Room");
    } else {
      addPropertyToDecisionRoom(property.id, 'mustHave');
      showToast("Added to Decision Room");
    }
  };

  if (!property) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-vistara-bg flex items-center justify-center p-6 text-vistara-primary">
        <div className="max-w-md w-full bg-vistara-surface border border-vistara-border rounded-2xl p-8 text-center shadow-card space-y-4">
          <div className="w-12 h-12 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto">
            <Building className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-vistara-primary">Property Not Found</h2>
          <p className="text-xs text-vistara-secondary leading-relaxed">
            The residence reference <code className="font-mono text-vistara-accent bg-vistara-elevated px-1.5 py-0.5 rounded">{propertyId || 'Unknown'}</code> could not be located in our Chennai portfolio. It may have been leased, sold off-market, or archived.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row gap-2 justify-center">
            <Button variant="primary" size="sm" onClick={onBack || (() => onNavigate('explore'))}>
              Back to Explore
            </Button>
            <Button variant="secondary" size="sm" onClick={() => onNavigate('dashboard')}>
              Go Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const isSaved = savedPropertyIds.includes(property.id);
  const isCompared = compareList.includes(property.id);
  const isWatched = (watchedPropertyIds || []).includes(property.id);

  // Financial calculations
  const propertyPrice = mode === 'buy' ? (property.priceNum || property.price || 20000000) : ((property.rent || 50000) * 120);
  const downPayment = Math.round(propertyPrice * (downPaymentPercent / 100));
  const principal = propertyPrice - downPayment;
  const monthlyRate = interestRate / 12 / 100;
  const totalMonths = loanTenureYears * 12;
  const emi = Math.round(
    (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
    (Math.pow(1 + monthlyRate, totalMonths) - 1)
  );
  const estimatedMaintenance = Math.round((property.area || property.carpetArea || 1800) * 4.5);
  const totalMonthlyCost = emi + estimatedMaintenance;

  const handleScheduleVisitSubmit = (e) => {
    e.preventDefault();
    scheduleVisit(property.id, visitDate, visitTime, visitNotes);
    setVisitBooked(true);
    showToast(`Walkthrough confirmed for ${visitDate} at ${visitTime}`);
    setTimeout(() => {
      setVisitBooked(false);
      setShowVisitModal(false);
    }, 1800);
  };

  const handleInquirySubmit = (e) => {
    e.preventDefault();
    sendInquiry(property.id, inquiryMsg, inquiryPhone);
    setInquirySent(true);
    showToast(`Inquiry dispatched to listing director`);
    setTimeout(() => {
      setInquirySent(false);
      setShowInquiryModal(false);
    }, 1800);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast(`Residence dossier link copied to clipboard`);
    } else {
      showToast(`Ready to share ${property.name || property.title}`);
    }
  };

  const handleToggleWatch = () => {
    toggleWatchPrice(property.id);
    if (!isWatched) {
      showToast(`Price drop alerts enabled for ${property.name || property.title}`);
    } else {
      showToast(`Removed from price drop watchlist`);
    }
  };

  // 7 Weighted Dimensions mapping according to Vistara specification
  const dimensionExplanations = {
    budget: {
      title: 'Budget',
      weight: '20%',
      score: fit.components?.budget || 92,
      desc: 'Optimal capital positioning relative to your target band. The effective rate reflects true value against historical registrations.',
      metrics: [`Asking: ${property.priceDisplay || property.price}`, `Target: Aligned`, `Value Index: 92/100`]
    },
    location: {
      title: 'Location',
      weight: '15%',
      score: fit.components?.location || 94,
      desc: `Premier enclave rating in ${property.microMarket || 'Adyar'} with immediate proximity to arterial roads, dining, and coastal enclaves.`,
      metrics: [`Enclave: ${property.microMarket || 'Adyar'}`, `Walkability: High`, `Safety Index: 95/100`]
    },
    space: {
      title: 'Space',
      weight: '15%',
      score: fit.components?.space || 88,
      desc: `Total carpet area of ${(property.area || property.carpetArea || 1800).toLocaleString('en-IN')} sq.ft exceeds threshold requirements with generous ceiling heights.`,
      metrics: [`Carpet Area: ${(property.area || property.carpetArea || 1800)} sq.ft`, `BHK: ${property.bhk} BHK`, `Ceiling: 10.5 ft`]
    },
    lifestyle: {
      title: 'Lifestyle',
      weight: '20%',
      score: fit.components?.lifestyle || 96,
      desc: 'Strong match for your quiet surroundings and natural light preferences. Acoustic floor isolation keeps daytime sound floor low.',
      metrics: [`Acoustic Score: ${property.homeDNA?.quiet || 88}/100`, `Decibel Level: 36 dB (Library Quiet)`, `Cross Breeze: Optimal`]
    },
    commute: {
      title: 'Commute',
      weight: '10%',
      score: fit.components?.commute || 91,
      desc: `Peak travel time is ${property.commute?.tidelPark || '18 mins'} to IT corridor and ${property.commute?.airport || '32 mins'} to airport.`,
      metrics: [`Tidel Park: ${property.commute?.tidelPark || '18 mins'}`, `Airport: ${property.commute?.airport || '32 mins'}`, `Metro: ${property.commute?.metro || '5 mins'}`]
    },
    homeDNA: {
      title: 'Home DNA',
      weight: '10%',
      score: fit.components?.homeDNA || 93,
      desc: 'Balanced 6-dimensional architectural fingerprint. Top decile natural daylight combined with acoustic isolation.',
      metrics: [`Daylight: ${property.homeDNA?.naturalLight || 92}/100`, `Acoustics: ${property.homeDNA?.quiet || 88}/100`, `Work Friendly: ${property.homeDNA?.workFriendly || 90}/100`]
    },
    futureFit: {
      title: 'Future Fit',
      weight: '10%',
      score: fit.components?.futureFit || 86,
      desc: 'Evaluates long-term flexibility over a 5-10 year life progression with partitionable flex rooms.',
      metrics: [`Adaptability Index: 86/100`, `Flex Space: Available`, `Longevity: High`]
    }
  };

  const galleryList = (property.images?.gallery && property.images.gallery.length > 0)
    ? property.images.gallery
    : (property.gallery || [property.coverImage || property.heroImage]);

  return (
    <div className="min-h-screen bg-vistara-bg pb-24 text-vistara-primary">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 bg-vistara-surface border border-vistara-accent/40 rounded-xl shadow-2xl flex items-center gap-3 animate-fade-in text-vistara-primary">
          <CheckCircle2 className="w-5 h-5 text-vistara-accent shrink-0" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Top Breadcrumb & Action Header */}
      <div className="bg-vistara-surface border-b border-vistara-border sticky top-16 z-30 px-4 sm:px-6 py-3">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-4 text-xs">
          
          <button
            type="button"
            onClick={onBack || (() => onNavigate('explore'))}
            className="flex items-center gap-1.5 font-medium text-vistara-secondary hover:text-vistara-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Chennai Residences</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleToggleWatch}
              className={`px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                isWatched 
                  ? 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/30'
                  : 'bg-vistara-elevated border-vistara-border text-vistara-secondary hover:text-vistara-primary'
              }`}
              title="Toggle Price Watch"
            >
              {isWatched ? <BellRing className="w-3.5 h-3.5 text-amber-500" /> : <Bell className="w-3.5 h-3.5" />}
              <span>{isWatched ? 'Price Alerts On' : 'Watch Price'}</span>
            </button>

            <Button
              size="sm"
              variant={isInDecisionRoom ? "primary" : "secondary"}
              icon={Layers}
              onClick={handleToggleDecisionRoom}
            >
              {isInDecisionRoom ? "In Decision Room" : "Add to Decision Room"}
            </Button>

            <Button
              size="sm"
              variant={isCompared ? "primary" : "secondary"}
              icon={Scale}
              onClick={() => toggleCompare(property.id)}
            >
              {isCompared ? "In Comparison" : "Compare"}
            </Button>

            <Button
              size="sm"
              variant={isSaved ? "accent" : "secondary"}
              icon={Heart}
              onClick={() => toggleSaveProperty(property.id)}
            >
              {isSaved ? "Saved" : "Save"}
            </Button>

            <Button
              size="sm"
              variant="secondary"
              icon={Share2}
              onClick={handleShare}
            >
              Share
            </Button>

            <Button
              size="sm"
              variant="secondary"
              icon={Download}
              onClick={() => setShowReportModal(true)}
            >
              Dossier
            </Button>

            <Button
              size="sm"
              variant="primary"
              icon={Calendar}
              onClick={() => setShowVisitModal(true)}
            >
              Schedule Walkthrough
            </Button>
          </div>

        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 pt-6 space-y-8">
        
        {/* Main Property Overview Bar */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-vistara-border">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs uppercase tracking-widest font-bold text-vistara-accent">
                {property.microMarket || property.location}
              </span>
              <span className="text-vistara-border">•</span>
              <span className="text-xs text-vistara-secondary flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-vistara-secondary" />
                {property.location}
              </span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-extrabold text-vistara-primary tracking-tight">
              {property.name || property.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs text-vistara-secondary mt-3">
              <span className="font-semibold text-vistara-primary text-sm">{property.bhk} BHK</span>
              <span>•</span>
              <span className="font-semibold text-vistara-primary text-sm">{(property.area || property.carpetArea || 1800).toLocaleString('en-IN')} sq.ft</span>
              <span>•</span>
              <span>{property.propertyType || 'Luxury Residence'}</span>
              <span>•</span>
              <span>Floor: {property.floor || '4th of 12'}</span>
              <span>•</span>
              <span>Built {property.yearBuilt || '2024'}</span>
            </div>
          </div>

          {/* Pricing & Quick Fit Signal */}
          <div className="flex items-center gap-6 bg-vistara-surface p-4 rounded-xl border border-vistara-border shadow-card">
            <div>
              <div className="text-xs text-vistara-secondary font-medium">
                {mode === 'buy' ? 'Target Asking Price' : 'Monthly Lease'}
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-vistara-primary tracking-tight font-mono">
                {mode === 'buy' ? (property.priceDisplay || property.price) : (property.rentDisplay || property.rent)}
              </div>
              {property.priceDrop?.hasDropped && (
                <div className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 mt-0.5">
                  <TrendingDown className="w-3 h-3" />
                  <span>PRICE DROP • ₹{((property.priceDrop.dropAmount) / 100000).toFixed(0)}L lower</span>
                </div>
              )}
            </div>

            <div className="h-10 w-px bg-vistara-border" />

            <div className="shrink-0">
              <FitScoreBadge score={fit.score} variant="card" />
            </div>
          </div>
        </div>

        {/* Gallery & Media Stage (Using Graceful PropertyImage) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="lg:col-span-8 aspect-[16/10] rounded-xl overflow-hidden bg-vistara-elevated border border-vistara-border shadow-card relative">
            <PropertyImage
              src={galleryList[activeImageIndex] || property.coverImage || property.heroImage}
              alt={`${property.name || property.title} - Architectural View ${activeImageIndex + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-md bg-black/75 text-white text-xs font-semibold">
              Photo {activeImageIndex + 1} of {galleryList.length} • {property.location}
            </div>
          </div>

          <div className="lg:col-span-4 flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto max-h-[480px] no-scrollbar">
            {galleryList.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveImageIndex(idx)}
                className={`relative flex-shrink-0 w-32 lg:w-full aspect-[16/10] rounded-lg overflow-hidden border-2 transition-all ${
                  activeImageIndex === idx ? 'border-vistara-accent scale-[0.98]' : 'border-transparent opacity-75 hover:opacity-100'
                }`}
              >
                <PropertyImage 
                  src={img} 
                  alt={`${property.name || property.title} Thumbnail ${idx + 1}`} 
                  className="w-full h-full object-cover" 
                />
              </button>
            ))}
          </div>
        </div>

        {/* ================= HERO SECTION: YOUR FIT (91% FIT) BREAKDOWN ================= */}
        <section className="p-6 sm:p-8 bg-vistara-surface border border-vistara-border rounded-2xl shadow-card space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-vistara-border">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full bg-vistara-accent/10 border border-vistara-accent/20 text-[10px] uppercase font-bold text-vistara-accent tracking-wider">
                  VISTARA FIT ENGINE • DECISION SIGNAL
                </span>
                <span className="text-xs text-vistara-secondary font-medium">
                  Personalized to {currentUser?.name || user?.name || 'Your Profile'}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-vistara-primary tracking-tight">
                YOUR FIT: {fit.score}%
              </h2>
              <p className="text-xs sm:text-sm text-vistara-secondary mt-1">
                <span className="font-bold text-emerald-600 mr-1.5">
                  {fit.score >= 90 ? 'Excellent alignment' : fit.score >= 80 ? 'Strong alignment' : 'Moderate alignment'}
                </span>
                — Algorithmic synthesis of 7 life dimensions calibrated to your preferences.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => onNavigate('intel-lab')}
                className="text-xs text-vistara-accent font-semibold hover:underline flex items-center gap-1"
              >
                Adjust Preference Weights <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Main Fit Hero Display: Circular Ring + 7 Dimension Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Left: Prominent Circular Ring Score Display */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 bg-vistara-elevated rounded-xl border border-vistara-border text-center space-y-3">
              <FitScoreBadge score={fit.score} size="xl" interactive={false} />
              <div>
                <span className="text-xs uppercase font-extrabold tracking-wider text-vistara-primary block">
                  Overall Compatibility
                </span>
                <p className="text-[11px] text-vistara-secondary mt-0.5 max-w-[220px]">
                  Evaluates budget, location, space, lifestyle, commute, Home DNA, and future resilience.
                </p>
              </div>
            </div>

            {/* Right: 7 Interactive Dimension Cards */}
            <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-3">
              {Object.entries(dimensionExplanations).map(([dimKey, dimData]) => {
                const isSelected = selectedDimension === dimKey;
                return (
                  <div
                    key={dimKey}
                    onClick={() => setSelectedDimension(isSelected ? null : dimKey)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-vistara-elevated border-vistara-accent shadow-md scale-[1.02]'
                        : 'bg-vistara-elevated/60 border-vistara-border/80 hover:border-vistara-accent/50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[11px] font-bold text-vistara-secondary uppercase tracking-wider">
                        {dimData.title} ({dimData.weight})
                      </span>
                      <span className="text-xs font-mono font-extrabold text-vistara-accent">
                        {dimData.score}%
                      </span>
                    </div>

                    <div className="w-full bg-vistara-surface h-1.5 rounded-full overflow-hidden mb-2">
                      <div 
                        className="bg-vistara-accent h-full rounded-full transition-all duration-700"
                        style={{ width: `${dimData.score}%` }}
                      />
                    </div>

                    <p className="text-[11px] text-vistara-secondary line-clamp-2 leading-relaxed">
                      {dimData.desc}
                    </p>

                    <div className="mt-2 text-[10px] text-vistara-accent font-semibold flex items-center gap-0.5">
                      {isSelected ? 'Close details' : 'Click to inspect →'}
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

          {/* Interactive Popover / Expansion Drawer for Clicked Dimension */}
          {selectedDimension && (
            <div className="p-4 rounded-xl bg-vistara-elevated border border-vistara-accent/40 animate-fade-in space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Info className="w-4 h-4 text-vistara-accent" />
                  <h4 className="font-bold text-sm text-vistara-primary">
                    {dimensionExplanations[selectedDimension].title} • {dimensionExplanations[selectedDimension].score}/100
                  </h4>
                </div>
                <button 
                  onClick={() => setSelectedDimension(null)}
                  className="p-1 rounded text-vistara-secondary hover:text-vistara-primary"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs text-vistara-secondary leading-relaxed">
                {dimensionExplanations[selectedDimension].desc}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-vistara-border/50 text-xs">
                {dimensionExplanations[selectedDimension].metrics.map((m, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded bg-vistara-surface border border-vistara-border text-[11px] font-medium text-vistara-primary">
                    {m}
                  </span>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* ================= PRICE DROP & HISTORICAL TRACKING SECTION ================= */}
        {property.priceDrop?.hasDropped && (
          <section className="p-6 bg-vistara-surface border border-emerald-500/30 rounded-2xl shadow-card space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-vistara-border">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold">
                  <TrendingDown className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold tracking-wider text-emerald-600">
                    VERIFIED PRICE REDUCTION
                  </div>
                  <h3 className="text-base font-extrabold text-vistara-primary">
                    Price Drop: ₹{((property.priceDrop.dropAmount) / 100000).toFixed(0)} Lakhs Lower
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleToggleWatch}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                    isWatched 
                      ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30'
                      : 'bg-vistara-elevated border-vistara-border text-vistara-primary hover:bg-vistara-surface'
                  }`}
                >
                  <BellRing className="w-3.5 h-3.5 text-emerald-600" />
                  {isWatched ? 'Price drop alerts enabled' : 'Watch for further drops'}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-vistara-elevated border border-vistara-border">
                <span className="text-[10px] uppercase font-bold text-vistara-secondary block">Previous Asking Price</span>
                <span className="text-base font-bold text-vistara-secondary line-through font-mono">
                  {property.priceDrop.previousPrice || '₹1.50 Cr'}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-vistara-elevated border border-vistara-border">
                <span className="text-[10px] uppercase font-bold text-vistara-secondary block">Current Revised Price</span>
                <span className="text-base font-extrabold text-emerald-600 font-mono">
                  {property.priceDisplay || property.price}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-vistara-elevated border border-vistara-border">
                <span className="text-[10px] uppercase font-bold text-vistara-secondary block">Revision Date</span>
                <span className="text-sm font-bold text-vistara-primary">
                  {property.priceDrop.date || '24 Sep 2026'}
                </span>
              </div>
            </div>

            {/* Price History Timeline */}
            <div className="p-3.5 rounded-xl bg-vistara-elevated border border-vistara-border/60 text-xs">
              <span className="text-[10px] uppercase font-bold text-vistara-secondary block mb-1.5">Price Revision History</span>
              <div className="space-y-1 text-[11px] text-vistara-secondary">
                <div className="flex items-center justify-between">
                  <span>• {property.priceDrop.date || '24 Sep 2026'}: Price calibrated from {property.priceDrop.previousPrice || '₹1.50 Cr'} to {property.priceDisplay || property.price}</span>
                  <span className="text-emerald-600 font-bold">₹{((property.priceDrop.dropAmount) / 100000).toFixed(0)}L reduction</span>
                </div>
                <div className="flex items-center justify-between text-vistara-secondary/70">
                  <span>• 10 Aug 2026: Initial exclusive listing cataloged</span>
                  <span>Listed at {property.priceDrop.previousPrice || '₹1.50 Cr'}</span>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 3D SPATIAL HOME & SYNCHRONIZED FLOOR PLAN SECTION */}
        <section className="space-y-4 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-vistara-accent">
                SPATIAL HOME SYSTEM
              </span>
              <h2 className="text-2xl font-bold text-vistara-primary">
                3D Architectural Model & Floor Plan Synchronization
              </h2>
            </div>
            <div className="text-xs text-vistara-secondary">
              Select any room to align 3D camera and inspect daylight exposure
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* 3D Canvas Viewer */}
            <div className="lg:col-span-7">
              <SpatialHomeViewer
                property={property}
                selectedRoom={selectedRoom}
                onSelectRoom={(roomId) => setSelectedRoom(roomId)}
              />
            </div>

            {/* 2D Architectural Floor Plan */}
            <div className="lg:col-span-5">
              <FloorPlanSync
                property={property}
                selectedRoom={selectedRoom}
                onSelectRoom={(roomId) => setSelectedRoom(roomId)}
              />
            </div>
          </div>
        </section>

        {/* LIFE MODE LENS SELECTOR */}
        <section className="bg-vistara-surface border border-vistara-border rounded-xl p-6 shadow-card">
          <div className="flex items-center justify-between pb-4 border-b border-vistara-border mb-6">
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-vistara-accent">
                LIFESTYLE LENS
              </span>
              <h3 className="text-xl font-bold text-vistara-primary">
                Evaluate this home through your life prism
              </h3>
            </div>
            <span className="text-xs text-vistara-secondary hidden sm:inline">
              Adjusts feature weighting based on your current priority
            </span>
          </div>

          {/* Mode Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {[
              'Everyday Life', 
              'Work From Home', 
              'Family & Kids', 
              'Quiet Living', 
              'Entertaining & Hosting', 
              'Future You'
            ].map(lMode => (
              <button
                key={lMode}
                onClick={() => setActiveLifeMode(lMode)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${
                  activeLifeMode === lMode
                    ? 'bg-vistara-primary text-vistara-surface shadow-subtle'
                    : 'bg-vistara-elevated text-vistara-secondary hover:text-vistara-primary border border-vistara-border'
                }`}
              >
                {lMode}
              </button>
            ))}
          </div>

          {/* Dynamic Lens Content */}
          <div className="p-4 bg-vistara-elevated rounded-lg border border-vistara-border text-xs leading-relaxed">
            {activeLifeMode === 'Work From Home' && (
              <div className="space-y-2">
                <div className="font-bold text-vistara-primary text-sm">Work From Home Evaluation: 96% Suitability</div>
                <p className="text-vistara-secondary">
                  Dedicated sound-isolated flex study room with dual CAT6 gigabit conduits. Natural daylight is diffused from the North-East window, eliminating monitor glare during morning standups.
                </p>
                <div className="flex items-center gap-4 text-vistara-accent font-semibold pt-1">
                  <span>Acoustic Decibels: 36 dB (Library Quiet)</span>
                  <span>•</span>
                  <span>Fiber Redundancy: Supported</span>
                </div>
              </div>
            )}
            {activeLifeMode === 'Everyday Life' && (
              <div className="space-y-2">
                <div className="font-bold text-vistara-primary text-sm">Everyday Living Rhythm</div>
                <p className="text-vistara-secondary">
                  {property.story || 'Designed with seamless morning daylight flow, broad balconies, and cross-ventilation.'}
                </p>
                <div className="text-vistara-accent font-semibold pt-1">
                  Cross-breezes flow naturally from south-east verandas across the living hall.
                </div>
              </div>
            )}
            {activeLifeMode === 'Family & Kids' && (
              <div className="space-y-2">
                <div className="font-bold text-vistara-primary text-sm">Family & Child Well-being: 90% Suitability</div>
                <p className="text-vistara-secondary">
                  Spacious bedrooms allow private studies for children. Low-density residential avenue with zero through-traffic and immediate proximity to premier schools and tree-lined parks.
                </p>
              </div>
            )}
            {activeLifeMode === 'Quiet Living' && (
              <div className="space-y-2">
                <div className="font-bold text-vistara-primary text-sm">Acoustic Stillness & Serenity: {property.homeDNA?.quiet || 88}/100</div>
                <p className="text-vistara-secondary">
                  Heavy double-glazed European casement windows and structural acoustic floor baffles keep interior noise floor below 38 dB throughout the day.
                </p>
              </div>
            )}
            {activeLifeMode === 'Entertaining & Hosting' && (
              <div className="space-y-2">
                <div className="font-bold text-vistara-primary text-sm">Social Entertaining Flow</div>
                <p className="text-vistara-secondary">
                  Open-concept living room merges directly onto the covered cantilever deck. Kitchen island creates an informal gathering point for weekend brunches.
                </p>
              </div>
            )}
            {activeLifeMode === 'Future You' && (
              <div className="space-y-2">
                <div className="font-bold text-vistara-primary text-sm">Future Resilience & Adaptability</div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                  {(property.futureFit || [
                    { scenario: 'Remote Executive Studio', fit: 94, explanation: 'Can convert bedroom 4 into an executive conference office.' },
                    { scenario: 'Multi-Generational Suite', fit: 89, explanation: 'Ground/lower level accessible suite with zero stair barriers.' },
                    { scenario: 'Asset Appreciation', fit: 92, explanation: 'Historically prime Chennai land value with strict zoning protection.' }
                  ]).map((ff, i) => (
                    <div key={i} className="p-2.5 bg-vistara-surface rounded border border-vistara-border">
                      <div className="font-semibold text-vistara-primary">{ff.scenario}</div>
                      <div className="text-vistara-accent font-bold mt-0.5">{ff.fit}% Fit</div>
                      <p className="text-[11px] text-vistara-secondary mt-1">{ff.explanation}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* 2-COLUMN INTELLIGENCE SECTION: HOME DNA + HONEST TRADE-OFFS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left: Home DNA Radar */}
          <div className="lg:col-span-6 bg-vistara-surface border border-vistara-border rounded-xl p-6 shadow-card flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-vistara-border mb-4">
                <h3 className="font-bold text-vistara-primary text-base">
                  Spatial Home DNA
                </h3>
                <span className="text-xs text-vistara-secondary">
                  6-Dimensional Fingerprint
                </span>
              </div>
              <p className="text-xs text-vistara-secondary mb-4 leading-relaxed">
                Objective spatial indices calculated from floor plan orientation, decibel sound meters, and tree canopy satellite imaging.
              </p>
              <div className="flex justify-center py-2">
                <HomeDNARadar dna={property.homeDNA} size={280} showLabels={true} />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-vistara-border text-center text-xs">
              <div>
                <div className="font-bold text-vistara-primary">{property.homeDNA?.quiet || 88}/100</div>
                <div className="text-[10px] text-vistara-secondary">Quiet Index</div>
              </div>
              <div>
                <div className="font-bold text-vistara-primary">{property.homeDNA?.naturalLight || 92}/100</div>
                <div className="text-[10px] text-vistara-secondary">Natural Light</div>
              </div>
              <div>
                <div className="font-bold text-vistara-primary">{property.homeDNA?.workFriendly || 90}/100</div>
                <div className="text-[10px] text-vistara-secondary">Work Friendly</div>
              </div>
            </div>
          </div>

          {/* Right: Honest Trade-Offs ("What You'll Give Up") */}
          <div className="lg:col-span-6 bg-vistara-surface border border-vistara-border rounded-xl p-6 shadow-card flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-vistara-border mb-4">
                <h3 className="font-bold text-vistara-primary text-base flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  What You'll Give Up
                </h3>
                <span className="text-xs text-amber-700 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded border border-amber-200">
                  Honest Trade-offs
                </span>
              </div>
              <p className="text-xs text-vistara-secondary mb-4 leading-relaxed">
                Vistara never presents a generic sales pitch. Every property involves deliberate architectural compromises.
              </p>

              <div className="space-y-3">
                {(property.tradeoffs || [
                  'South-west bedroom receives high heat gain between 2 PM and 4 PM.',
                  'Visitor parking limited to 2 tandem dedicated bays.',
                  'Commute to Old Mahabalipuram Road requires navigating Adyar bridge peak traffic.'
                ]).map((to, i) => (
                  <div key={i} className="p-3.5 bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/80 rounded-lg text-xs leading-relaxed text-vistara-primary">
                    <span className="font-bold text-amber-800 dark:text-amber-300">Compromise {i + 1}: </span>
                    {to}
                  </div>
                ))}
              </div>

              {/* Verified Documents Checklist */}
              <div className="mt-6 pt-4 border-t border-vistara-border">
                <div className="font-semibold text-vistara-primary text-xs mb-2 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Audited Verification Status: {property.verification?.status || 'Verified Clear'}
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px] text-vistara-secondary">
                  {(property.verification?.documentChecklist || ['CMDA Approved Layout', 'RERA Registered Deed', 'Structural Stability Certificate', 'Clear Title 30-Year Search']).map((doc, idx) => (
                    <div key={idx} className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="line-clamp-1">{doc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="text-[11px] text-vistara-secondary/70 pt-4">
              Last independent data audit: {property.verification?.dataQuality || 'A+ Verified'}
            </div>
          </div>

        </div>

        {/* FINANCIAL INTELLIGENCE & INTERACTIVE SUITE */}
        <section className="pt-2">
          <FinancialSuite property={property} />
        </section>

      </div>

      {/* SCHEDULE VISIT MODAL */}
      {showVisitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
          <div className="bg-vistara-surface border border-vistara-border rounded-2xl p-6 max-w-md w-full shadow-2xl text-xs space-y-4 animate-fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-vistara-border">
              <div>
                <h3 className="text-base font-extrabold text-vistara-primary">
                  Schedule Private Walkthrough
                </h3>
                <p className="text-vistara-secondary text-xs">
                  {property.name || property.title} • {property.location}
                </p>
              </div>
              <button 
                onClick={() => setShowVisitModal(false)}
                className="p-1.5 rounded-lg hover:bg-vistara-elevated text-vistara-secondary"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {visitBooked ? (
              <div className="p-6 text-center bg-emerald-50 dark:bg-emerald-950/30 rounded-xl text-emerald-800 dark:text-emerald-300 font-semibold flex flex-col items-center gap-2">
                <Check className="w-8 h-8 text-emerald-600" />
                <span>Visit Scheduled & Added to Timeline!</span>
              </div>
            ) : (
              <form onSubmit={handleScheduleVisitSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-[11px] font-bold text-vistara-secondary mb-1">Select Date</label>
                  <input
                    type="date"
                    required
                    value={visitDate}
                    onChange={(e) => setVisitDate(e.target.value)}
                    className="w-full bg-vistara-elevated border border-vistara-border rounded-lg p-2.5 text-vistara-primary focus:outline-none focus:border-vistara-accent"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-vistara-secondary mb-1">Preferred Time Window</label>
                  <select
                    value={visitTime}
                    onChange={(e) => setVisitTime(e.target.value)}
                    className="w-full bg-vistara-elevated border border-vistara-border rounded-lg p-2.5 text-vistara-primary focus:outline-none focus:border-vistara-accent"
                  >
                    <option>09:30 AM (Morning Daylight)</option>
                    <option>11:00 AM (Midday Light)</option>
                    <option>03:30 PM (Afternoon Cross-breeze)</option>
                    <option>05:30 PM (Golden Hour Assessment)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-vistara-secondary mb-1">Specific Life Inquiries / Notes</label>
                  <textarea
                    rows={2}
                    value={visitNotes}
                    onChange={(e) => setVisitNotes(e.target.value)}
                    placeholder="e.g. Inspect noise levels in bedroom or measure desk nook..."
                    className="w-full bg-vistara-elevated border border-vistara-border rounded-lg p-2.5 text-vistara-primary focus:outline-none focus:border-vistara-accent resize-none"
                  />
                </div>
                <div className="flex items-center justify-end gap-2 pt-2 border-t border-vistara-border">
                  <Button variant="ghost" size="sm" type="button" onClick={() => setShowVisitModal(false)}>
                    Cancel
                  </Button>
                  <Button variant="primary" size="sm" type="submit" icon={Calendar}>
                    Confirm Walkthrough
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* STICKY BOTTOM BAR FOR MOBILE & QUICK ACCESS */}
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-vistara-surface border-t border-vistara-border px-4 py-3 shadow-popover">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-4 text-xs">
          <div className="hidden sm:block">
            <span className="font-bold text-vistara-primary text-sm">{property.name || property.title}</span>
            <span className="text-vistara-secondary ml-2">({mode === 'buy' ? (property.priceDisplay || property.price) : (property.rentDisplay || property.rent)})</span>
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <Button
              size="sm"
              variant={isInDecisionRoom ? "primary" : "secondary"}
              icon={Layers}
              onClick={handleToggleDecisionRoom}
            >
              {isInDecisionRoom ? "In Decision Room" : "Decision Room"}
            </Button>
            <button
              onClick={handleToggleWatch}
              className={`p-2 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                isWatched 
                  ? 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/30'
                  : 'bg-vistara-elevated border-vistara-border text-vistara-secondary hover:text-vistara-primary'
              }`}
              title="Watch Price"
            >
              {isWatched ? <BellRing className="w-4 h-4 text-amber-500" /> : <Bell className="w-4 h-4" />}
            </button>
            <Button
              size="sm"
              variant="secondary"
              icon={Download}
              onClick={() => setShowReportModal(true)}
            >
              Export Dossier
            </Button>
            <Button
              size="sm"
              variant="primary"
              icon={Calendar}
              onClick={() => setShowVisitModal(true)}
            >
              Schedule Walkthrough
            </Button>
          </div>
        </div>
      </div>

      {/* Complete Property Intelligence Dossier & Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
          <div className="bg-vistara-surface border border-vistara-border rounded-2xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl space-y-6 my-8 text-xs max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-start justify-between border-b border-vistara-border pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded bg-[#142334] text-white text-[10px] font-bold uppercase tracking-wider">
                    Vistara Intelligence Dossier
                  </span>
                  <span className="text-vistara-secondary font-mono text-[11px]">
                    REF #{property.id.toUpperCase()}
                  </span>
                </div>
                <h2 className="text-2xl font-black text-vistara-primary">{property.name}</h2>
                <p className="text-vistara-secondary text-xs mt-0.5">{property.location} • {property.bhk} BHK • {property.area} sq.ft</p>
              </div>
              <button
                type="button"
                onClick={() => setShowReportModal(false)}
                className="p-1.5 rounded-lg border border-vistara-border text-vistara-secondary hover:text-vistara-primary"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Prepared for user & Price */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-vistara-elevated rounded-xl border border-vistara-border">
              <div>
                <span className="text-[10px] uppercase font-bold text-vistara-secondary block">Prepared For</span>
                <span className="text-sm font-bold text-vistara-primary">{currentUser?.name || 'Verified Seeker'}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-vistara-secondary block">Price Calibration</span>
                <span className="text-sm font-extrabold text-vistara-primary">
                  {mode === 'buy' ? property.priceDisplay : property.rentDisplay}
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-vistara-secondary block">Personalized Fit</span>
                <span className="text-sm font-extrabold text-emerald-600">{fit.score}% Match</span>
              </div>
            </div>

            {/* Fit Score Components */}
            <div>
              <h3 className="font-bold text-sm text-vistara-primary mb-2">1. Algorithmic Fit Breakdown</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { label: 'Budget (20%)', val: fit.components?.budget || 92 },
                  { label: 'Location (15%)', val: fit.components?.location || 94 },
                  { label: 'Space (15%)', val: fit.components?.space || 90 },
                  { label: 'Lifestyle (20%)', val: fit.components?.lifestyle || 92 },
                  { label: 'Commute (10%)', val: fit.components?.commute || 88 },
                  { label: 'Home DNA (10%)', val: fit.components?.homeDNA || 91 },
                  { label: 'Future Fit (10%)', val: fit.components?.futureFit || 89 }
                ].map((item, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-vistara-surface border border-vistara-border">
                    <span className="text-[10px] text-vistara-secondary block">{item.label}</span>
                    <span className="text-sm font-bold text-vistara-primary">{item.val}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Home DNA & Acoustics */}
            <div>
              <h3 className="font-bold text-sm text-vistara-primary mb-2">2. Home DNA & Acoustic Profile</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-lg border border-vistara-border bg-vistara-surface">
                  <span className="text-vistara-secondary block text-[11px]">Acoustic Stillness</span>
                  <span className="text-lg font-black text-vistara-primary">{property.homeDNA?.quiet || 88}/100</span>
                  <span className="text-[10px] text-vistara-secondary block">Decibel buffer against street sound</span>
                </div>
                <div className="p-3 rounded-lg border border-vistara-border bg-vistara-surface">
                  <span className="text-vistara-secondary block text-[11px]">Natural Light Index</span>
                  <span className="text-lg font-black text-vistara-primary">{property.homeDNA?.naturalLight || 90}/100</span>
                  <span className="text-[10px] text-vistara-secondary block">Direct morning & afternoon lumens</span>
                </div>
                <div className="p-3 rounded-lg border border-vistara-border bg-vistara-surface">
                  <span className="text-vistara-secondary block text-[11px]">Work From Home</span>
                  <span className="text-lg font-black text-vistara-primary">{property.homeDNA?.workFriendly || 92}/100</span>
                  <span className="text-[10px] text-vistara-secondary block">Dedicated dual-desk fiber zone</span>
                </div>
              </div>
            </div>

            {/* Commute & Transit */}
            <div>
              <h3 className="font-bold text-sm text-vistara-primary mb-2">3. Transit & Commute Radius</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
                <div className="p-2 rounded bg-vistara-elevated border border-vistara-border">
                  <span className="text-vistara-secondary block">Tidel Park / IT</span>
                  <strong className="text-vistara-primary">{property.commute?.tidelPark || '18 min'}</strong>
                </div>
                <div className="p-2 rounded bg-vistara-elevated border border-vistara-border">
                  <span className="text-vistara-secondary block">Airport</span>
                  <strong className="text-vistara-primary">{property.commute?.airport || '32 min'}</strong>
                </div>
                <div className="p-2 rounded bg-vistara-elevated border border-vistara-border">
                  <span className="text-vistara-secondary block">Central Station</span>
                  <strong className="text-vistara-primary">{property.commute?.centralStation || '40 min'}</strong>
                </div>
                <div className="p-2 rounded bg-vistara-elevated border border-vistara-border">
                  <span className="text-vistara-secondary block">Nearest Metro</span>
                  <strong className="text-vistara-primary">{property.commute?.metro || '8 min'}</strong>
                </div>
              </div>
            </div>

            {/* Trade-offs & Material Considerations */}
            <div>
              <h3 className="font-bold text-sm text-vistara-primary mb-2">4. Verified Trade-offs & Considerations</h3>
              <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-500/5 space-y-2">
                {(property.tradeoffs && property.tradeoffs.length > 0 ? property.tradeoffs : [
                  'Balcony faces east, providing excellent morning daylight but moderate evening shade.',
                  'Visitor parking limited to 2 designated bays during peak weekend hours.'
                ]).map((t, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-vistara-secondary">
                    <span className="text-amber-500 font-bold">•</span>
                    <span>{t}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-vistara-border">
              <span className="text-[11px] text-vistara-secondary font-mono">
                Certified by Vistara Property Intelligence Engine
              </span>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="secondary" onClick={() => setShowReportModal(false)}>
                  Close
                </Button>
                <Button
                  size="sm"
                  variant="primary"
                  icon={Download}
                  onClick={() => window.print()}
                >
                  Print / Save PDF
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
