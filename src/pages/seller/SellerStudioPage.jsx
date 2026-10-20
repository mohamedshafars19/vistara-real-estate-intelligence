import React, { useState } from 'react';
import { 
  Building, 
  Plus, 
  TrendingUp, 
  Users, 
  Eye, 
  Heart, 
  ShieldCheck, 
  DollarSign, 
  Check, 
  Camera, 
  FileText, 
  Sliders,
  ChevronRight,
  AlertCircle
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import { useApp } from '../../context/AppContext';

export function SellerStudioPage({ onSelectProperty, onNavigate }) {
  const { properties } = useApp();

  const [activeTab, setActiveTab] = useState('cockpit'); // 'cockpit' | 'listings' | 'pricing' | 'wizard'

  // Pricing simulator inputs
  const [askingPriceCrores, setAskingPriceCrores] = useState(1.45);
  const [propertyAreaSqFt, setPropertyAreaSqFt] = useState(1820);

  // Add Property Wizard State (9 Steps)
  const [wizardStep, setWizardStep] = useState(1);
  const [wizardData, setWizardData] = useState({
    title: '',
    microMarket: 'OMR - Perungudi',
    bhk: 3,
    area: 1750,
    price: '1.40 Cr',
    amenities: ['Gigabit Fiber', 'Dual Balconies', 'Covered Parking']
  });
  const [wizardPublished, setWizardPublished] = useState(false);

  // Compute pricing simulation stats
  const calculatedRatePerSqFt = Math.round((askingPriceCrores * 10000000) / propertyAreaSqFt);
  const marketBenchmarkRate = 7850;
  const priceVariance = Math.round(((calculatedRatePerSqFt - marketBenchmarkRate) / marketBenchmarkRate) * 100);

  return (
    <div className="min-h-screen bg-vistara-bg pb-24 text-vistara-primary">
      
      {/* Top Header */}
      <div className="bg-vistara-surface border-b border-vistara-border px-4 sm:px-6 py-6">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Building className="w-4 h-4 text-vistara-accent" />
              <span className="text-xs uppercase font-bold tracking-wider text-vistara-accent">
                PROPERTY OPERATIONS STUDIO
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-vistara-primary tracking-tight">
              Seller Command Center
            </h1>
            <p className="text-xs text-vistara-secondary mt-1">
              Professional asset management, pricing stress-testing, and buyer demand intelligence for Chennai residences.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="secondary"
              onClick={() => setActiveTab('pricing')}
            >
              Pricing Simulator
            </Button>
            <Button
              size="sm"
              variant="primary"
              icon={Plus}
              onClick={() => { setActiveTab('wizard'); setWizardStep(1); }}
            >
              List New Residence
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 pt-6 space-y-6">
        
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-vistara-border pb-3 text-xs font-semibold">
          {[
            { id: 'cockpit', label: 'Operations Cockpit' },
            { id: 'listings', label: 'Active Listings & Health' },
            { id: 'pricing', label: 'Pricing Simulator' },
            { id: 'wizard', label: 'Add Residence Wizard' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === tab.id
                  ? 'bg-[#142334] text-white shadow-subtle'
                  : 'bg-vistara-surface text-vistara-secondary hover:text-vistara-primary border border-vistara-border'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: OPERATIONS COCKPIT */}
        {activeTab === 'cockpit' && (
          <div className="space-y-6 text-xs">
            
            {/* Top KPI Metrics Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 bg-vistara-surface border border-vistara-border rounded-xl shadow-card">
                <div className="flex items-center justify-between text-vistara-secondary">
                  <span>Total Listing Impressions</span>
                  <Eye className="w-4 h-4 text-vistara-muted" />
                </div>
                <div className="text-2xl font-extrabold text-vistara-primary mt-2">14,820</div>
                <div className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> +18% past 14 days
                </div>
              </div>

              <div className="p-5 bg-vistara-surface border border-vistara-border rounded-xl shadow-card">
                <div className="flex items-center justify-between text-vistara-secondary">
                  <span>Buyer Saves & Wishlists</span>
                  <Heart className="w-4 h-4 text-rose-500" />
                </div>
                <div className="text-2xl font-extrabold text-vistara-primary mt-2">342</div>
                <div className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> High buyer intent signals
                </div>
              </div>

              <div className="p-5 bg-vistara-surface border border-vistara-border rounded-xl shadow-card">
                <div className="flex items-center justify-between text-vistara-secondary">
                  <span>Verified Inquiries</span>
                  <Users className="w-4 h-4 text-purple-600" />
                </div>
                <div className="text-2xl font-extrabold text-vistara-primary mt-2">28</div>
                <div className="text-[11px] text-vistara-accent font-semibold mt-1">
                  6 scheduled walkthroughs
                </div>
              </div>

              <div className="p-5 bg-vistara-surface border border-vistara-border rounded-xl shadow-card">
                <div className="flex items-center justify-between text-vistara-secondary">
                  <span>Average Completeness</span>
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="text-2xl font-extrabold text-vistara-primary mt-2">96%</div>
                <div className="text-[11px] text-emerald-600 font-semibold mt-1">
                  CMDA & RERA audited
                </div>
              </div>
            </div>

            {/* Buyer Interest Radar & Demand Signals */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-8 bg-vistara-surface border border-vistara-border rounded-xl p-6 shadow-card space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-vistara-border">
                  <h3 className="font-bold text-vistara-primary text-sm">
                    Live Buyer Demand Signals for OMR Corridor
                  </h3>
                  <span className="text-[11px] text-vistara-secondary">Updated 24 Sep 2026</span>
                </div>

                <div className="space-y-3">
                  <div className="p-3 bg-vistara-elevated rounded-lg border border-vistara-border flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-vistara-primary">Demand Spike: 3BHK WFH Units under ₹1.5 Cr</div>
                      <div className="text-vistara-secondary text-[11px]">84 active home seekers currently have this exact profile</div>
                    </div>
                    <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded font-bold text-[10px]">
                      High Match (94%)
                    </span>
                  </div>

                  <div className="p-3 bg-vistara-elevated rounded-lg border border-vistara-border flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-vistara-primary">Daylight & Acoustic Sensitivity Index</div>
                      <div className="text-vistara-secondary text-[11px]">72% of buyers in South Chennai now require verified decibel meter ratings</div>
                    </div>
                    <span className="px-2.5 py-1 bg-vistara-surface border border-vistara-border text-vistara-primary rounded font-bold text-[10px]">
                      Audited
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Listing Health Box */}
              <div className="lg:col-span-4 bg-vistara-surface border border-vistara-border rounded-xl p-6 shadow-card flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-vistara-primary text-sm mb-2">
                    Listing Health Cockpit
                  </h3>
                  <p className="text-vistara-secondary text-[11px] mb-4">
                    Complete all 6 verification stages to gain the Vistara Verified trust mark.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-600" /> High-Resolution 3D Model</span>
                      <span className="font-bold text-emerald-600">100%</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-600" /> CMDA & RERA Registration</span>
                      <span className="font-bold text-emerald-600">Verified</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-600" /> Acoustic Decibel Audit</span>
                      <span className="font-bold text-emerald-600">38 dB</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-600" /> Architectural Floor CAD</span>
                      <span className="font-bold text-emerald-600">Synced</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-3 border-t border-vistara-border text-[11px] text-vistara-muted">
                  Overall Studio Quality Score: <strong>96 / 100</strong>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: ACTIVE LISTINGS & HEALTH */}
        {activeTab === 'listings' && (
          <div className="space-y-4 text-xs">
            <div className="text-xs uppercase font-bold text-vistara-secondary pb-2 border-b border-vistara-border">
              Managed Portfolio ({properties.slice(0, 4).length} Active Listings)
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {properties.slice(0, 4).map(prop => (
                <div
                  key={prop.id}
                  className="bg-vistara-surface border border-vistara-border rounded-xl p-5 shadow-card flex flex-col justify-between"
                >
                  <div className="flex items-start gap-4">
                    <img
                      src={prop.coverImage || prop.images?.hero || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=400&q=80'}
                      alt={prop.name}
                      className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {prop.status || 'Published'}
                        </span>
                        <span className="font-bold text-vistara-primary text-sm">
                          {prop.priceDisplay}
                        </span>
                      </div>
                      <h4 className="font-bold text-vistara-primary text-base mt-1 line-clamp-1">
                        {prop.name}
                      </h4>
                      <p className="text-vistara-secondary text-[11px]">
                        {prop.location} • {prop.bhk} BHK • {prop.area} sq.ft
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-vistara-border flex items-center justify-between">
                    <span className="text-vistara-secondary text-[11px]">
                      Health: <strong className="text-emerald-600">{prop.verification?.completenessScore || 92}% Complete</strong>
                    </span>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => onSelectProperty(prop.id)}
                    >
                      Inspect Public View
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: PRICING SIMULATOR */}
        {activeTab === 'pricing' && (
          <div className="bg-vistara-surface border border-vistara-border rounded-xl p-6 shadow-card space-y-6 text-xs">
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-vistara-accent">
                VALUATION LAB
              </span>
              <h3 className="text-xl font-bold text-vistara-primary mt-1">
                Asking Price & Micro-Market Comparison Simulator
              </h3>
              <p className="text-vistara-secondary mt-1">
                Stress-test your asking price against verified transactions in the immediate Chennai micro-market.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Sliders */}
              <div className="lg:col-span-7 space-y-5">
                <div>
                  <div className="flex justify-between font-semibold text-vistara-primary mb-1">
                    <span>Target Asking Price (Crores)</span>
                    <span className="font-bold text-base text-vistara-accent">₹{askingPriceCrores.toFixed(2)} Cr</span>
                  </div>
                  <input
                    type="range"
                    min="0.70"
                    max="10.0"
                    step="0.05"
                    value={askingPriceCrores}
                    onChange={(e) => setAskingPriceCrores(parseFloat(e.target.value))}
                    className="w-full h-1.5 bg-vistara-elevated rounded appearance-none accent-vistara-accent cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between font-semibold text-vistara-primary mb-1">
                    <span>Super Built-up Area</span>
                    <span>{propertyAreaSqFt} sq.ft</span>
                  </div>
                  <input
                    type="range"
                    min="1000"
                    max="5000"
                    step="50"
                    value={propertyAreaSqFt}
                    onChange={(e) => setPropertyAreaSqFt(parseInt(e.target.value, 10))}
                    className="w-full h-1.5 bg-vistara-elevated rounded appearance-none accent-vistara-accent cursor-pointer"
                  />
                </div>

                <div className="p-4 bg-vistara-elevated rounded-lg border border-vistara-border">
                  <div className="font-bold text-vistara-primary text-sm mb-1">Fair Price Meter Analysis</div>
                  <p className="text-vistara-secondary leading-relaxed">
                    At ₹{calculatedRatePerSqFt.toLocaleString('en-IN')}/sq.ft, this asking price is {priceVariance >= 0 ? `+${priceVariance}% above` : `${priceVariance}% below`} the verified micro-market median (₹{marketBenchmarkRate}/sq.ft).
                  </p>
                </div>
              </div>

              {/* Output Summary Card */}
              <div className="lg:col-span-5 p-6 bg-vistara-elevated rounded-xl border border-vistara-border space-y-4">
                <div className="text-[11px] uppercase font-bold text-vistara-secondary">
                  Valuation Breakdown
                </div>
                <div className="text-3xl font-extrabold text-vistara-primary">
                  ₹{calculatedRatePerSqFt.toLocaleString('en-IN')} <span className="text-xs font-normal text-vistara-secondary">/ sq.ft</span>
                </div>

                <div className="space-y-2 text-xs text-vistara-secondary border-t border-vistara-border pt-3">
                  <div className="flex justify-between">
                    <span>Market Median:</span>
                    <span className="font-semibold text-vistara-primary">₹7,850 / sq.ft</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Buyer Match Velocity:</span>
                    <span className="font-bold text-emerald-600">High (12-18 Days Est.)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Fair Price Band:</span>
                    <span className="font-semibold text-vistara-primary">₹1.38 Cr - ₹1.48 Cr</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 4: ADD PROPERTY 9-STEP WIZARD */}
        {activeTab === 'wizard' && (
          <div className="bg-vistara-surface border border-vistara-border rounded-xl p-6 shadow-card space-y-6 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-vistara-border">
              <div>
                <span className="text-xs uppercase font-bold text-vistara-accent">
                  STEP {wizardStep} OF 9
                </span>
                <h3 className="text-xl font-bold text-vistara-primary">
                  {wizardStep === 1 && 'Basic Information'}
                  {wizardStep === 2 && 'Location & Micro-Market'}
                  {wizardStep === 3 && 'Spatial Specs & BHK'}
                  {wizardStep === 4 && 'High-Resolution Photography'}
                  {wizardStep === 5 && 'Architectural Floor CAD'}
                  {wizardStep === 6 && 'Home DNA & Amenities'}
                  {wizardStep === 7 && 'Asking Price & Lease Terms'}
                  {wizardStep === 8 && 'Document Checklist & Verification'}
                  {wizardStep === 9 && 'Preview & Publish'}
                </h3>
              </div>

              <div className="flex items-center gap-1 font-mono text-xs text-vistara-secondary">
                Step {wizardStep}/9
              </div>
            </div>

            {wizardPublished ? (
              <div className="p-8 text-center bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-900 space-y-3">
                <Check className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="text-lg font-bold">Property Published Successfully!</h4>
                <p className="text-xs text-emerald-800 max-w-md mx-auto">
                  Your residence is now indexed on the Chennai spatial discovery map and matching against active buyer life profiles.
                </p>
                <Button size="sm" variant="primary" onClick={() => setActiveTab('listings')}>
                  View in Managed Listings
                </Button>
              </div>
            ) : (
              <div>
                {/* Step Content */}
                {wizardStep === 1 && (
                  <div className="space-y-4 max-w-lg">
                    <div>
                      <label className="block font-semibold text-vistara-primary mb-1">Residence Marketing Title</label>
                      <input
                        type="text"
                        value={wizardData.title}
                        onChange={(e) => setWizardData(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="e.g. The Glass Pavilion at ECR"
                        className="w-full bg-vistara-elevated border border-vistara-border rounded p-2.5 text-vistara-primary focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-vistara-primary mb-1">Property Type</label>
                      <select className="w-full bg-vistara-elevated border border-vistara-border rounded p-2.5 text-vistara-primary focus:outline-none">
                        <option>Apartment</option>
                        <option>Penthouse</option>
                        <option>Villa</option>
                        <option>Courtyard Home</option>
                      </select>
                    </div>
                  </div>
                )}

                {wizardStep >= 2 && wizardStep <= 8 && (
                  <div className="p-8 text-center bg-vistara-elevated rounded-xl border border-vistara-border space-y-2">
                    <Check className="w-8 h-8 text-vistara-accent mx-auto" />
                    <div className="font-bold text-vistara-primary text-sm">
                      Step {wizardStep} Configuration Validated
                    </div>
                    <p className="text-vistara-secondary max-w-sm mx-auto text-xs">
                      All required spatial coordinates, document attachments, and CAD vectors have passed local client-side audit checks.
                    </p>
                  </div>
                )}

                {wizardStep === 9 && (
                  <div className="p-6 bg-vistara-elevated rounded-xl border border-vistara-border space-y-4">
                    <div className="font-bold text-vistara-primary text-sm">Review & Publish Listing</div>
                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div>
                        <span className="text-vistara-secondary">Title:</span>
                        <div className="font-bold text-vistara-primary">{wizardData.title || 'The Glass Pavilion at ECR'}</div>
                      </div>
                      <div>
                        <span className="text-vistara-secondary">Micro-Market:</span>
                        <div className="font-bold text-vistara-primary">{wizardData.microMarket}</div>
                      </div>
                      <div>
                        <span className="text-vistara-secondary">Area & BHK:</span>
                        <div className="font-bold text-vistara-primary">{wizardData.bhk} BHK • {wizardData.area} sq.ft</div>
                      </div>
                      <div>
                        <span className="text-vistara-secondary">Asking Price:</span>
                        <div className="font-bold text-vistara-primary">{wizardData.price}</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Wizard Navigation Footer */}
                <div className="flex items-center justify-between pt-6 border-t border-vistara-border mt-6">
                  <Button
                    size="sm"
                    variant="secondary"
                    disabled={wizardStep === 1}
                    onClick={() => setWizardStep(prev => Math.max(1, prev - 1))}
                  >
                    Previous
                  </Button>

                  {wizardStep < 9 ? (
                    <Button
                      size="sm"
                      variant="primary"
                      onClick={() => setWizardStep(prev => Math.min(9, prev + 1))}
                    >
                      Continue to Step {wizardStep + 1} →
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      variant="primary"
                      onClick={() => setWizardPublished(true)}
                    >
                      Publish Residence to Vistara
                    </Button>
                  )}
                </div>
              </div>
            )}

          </div>
        )}

      </div>

    </div>
  );
}
