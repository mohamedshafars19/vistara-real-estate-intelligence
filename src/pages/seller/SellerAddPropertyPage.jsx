import React, { useState } from 'react';
import { 
  Building, 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  Camera, 
  Upload, 
  FileText, 
  DollarSign, 
  ShieldCheck, 
  Eye, 
  Save 
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import { useApp } from '../../context/AppContext';

export function SellerAddPropertyPage({ onNavigate }) {
  const { addProperty, publishListing, draftListing, addNotification } = useApp();
  const [currentStep, setCurrentStep] = useState(1);
  const [toastMessage, setToastMessage] = useState('');
  const [formData, setFormData] = useState({
    title: 'The Glass Pavilion at ECR',
    propertyType: 'Beachside Villa',
    microMarket: 'ECR',
    address: 'Near Akkarai Beach, East Coast Road, Chennai',
    bhk: 4,
    area: 3600,
    floor: 'Ground + 1 Floor',
    yearBuilt: 2024,
    askingPriceCrores: 7.2,
    amenities: ['Private Beach Access', 'Saltwater Lap Pool', 'Solar Grid 10kW', 'EV Double Carport'],
    story: 'Conceived as an airy seaside pavilion with double-height sliding glass opening directly to the private pool and landscaped frangipani garden.',
    quietScore: 92,
    lightScore: 95,
    cmdaNumber: 'TN/29/Building/0192/2023'
  });

  const [publishedSuccess, setPublishedSuccess] = useState(false);

  const handleNext = () => setCurrentStep(prev => Math.min(9, prev + 1));
  const handleBack = () => setCurrentStep(prev => Math.max(1, prev - 1));

  const buildPropertyPayload = (status = 'Published') => ({
    id: `vis-che-${Date.now()}`,
    name: formData.title.trim() || 'Untitled Residence',
    title: formData.title.trim() || 'Untitled Residence',
    propertyType: formData.propertyType,
    microMarket: formData.microMarket,
    location: `${formData.microMarket}, Chennai`,
    address: formData.address,
    bhk: Number(formData.bhk) || 3,
    area: Number(formData.area) || 2000,
    price: Math.round(Number(formData.askingPriceCrores || 5.0) * 10000000),
    priceDisplay: `₹${Number(formData.askingPriceCrores || 5.0).toFixed(2)} Cr`,
    amenities: formData.amenities,
    story: formData.story,
    status: status,
    cmdaNumber: formData.cmdaNumber,
    homeDNA: {
      quiet: formData.quietScore || 90,
      naturalLight: formData.lightScore || 92,
      workFriendly: 88,
      community: 86
    },
    coverImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80'
  });

  const handleSaveDraft = () => {
    const payload = buildPropertyPayload('Draft');
    addProperty(payload);
    if (draftListing) draftListing(payload.id);
    if (addNotification) {
      addNotification({
        title: 'Draft Saved',
        message: `"${payload.name}" has been saved to your drafts portfolio.`,
        type: 'listing',
        link: 'seller-listings'
      });
    }
    setToastMessage(`Draft saved! Redirecting to Managed Portfolio...`);
    setTimeout(() => {
      onNavigate('seller-listings');
    }, 1200);
  };

  const handlePublish = () => {
    const payload = buildPropertyPayload('Published');
    const created = addProperty(payload);
    publishListing(created.id);
    if (addNotification) {
      addNotification({
        title: 'Listing Published',
        message: `"${payload.name}" is now live on the Chennai spatial discovery map!`,
        type: 'listing',
        link: 'seller-listings'
      });
    }
    setPublishedSuccess(true);
  };

  return (
    <div className="min-h-screen bg-vistara-bg pb-24 text-vistara-primary text-xs">
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-[#142334] text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-emerald-500 animate-fade-in font-semibold">
          <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
      
      {/* Header */}
      <div className="bg-vistara-surface border-b border-vistara-border px-4 sm:px-6 py-6">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Building className="w-4 h-4 text-vistara-accent" />
              <span className="text-xs uppercase font-bold text-vistara-accent tracking-wider">
                LISTING WIZARD • STEP {currentStep} OF 9
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-vistara-primary tracking-tight">
              {currentStep === 1 && '1. Basic Property Information'}
              {currentStep === 2 && '2. Geographic Micro-Market & Coordinates'}
              {currentStep === 3 && '3. Spatial Volume, BHK & Floor Layout'}
              {currentStep === 4 && '4. High-Resolution Architectural Photography'}
              {currentStep === 5 && '5. Architectural Floor CAD & Blueprint'}
              {currentStep === 6 && '6. Home DNA & Infrastructure Amenities'}
              {currentStep === 7 && '7. Asking Valuation & Terms'}
              {currentStep === 8 && '8. Document Verification & Legal Clearances'}
              {currentStep === 9 && '9. Final Live Preview & Publishing'}
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="secondary"
              icon={Save}
              onClick={handleSaveDraft}
            >
              Save Draft
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onNavigate('seller-listings')}
            >
              Exit to Portfolio
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 pt-6">
        
        {/* Step Indicator Progress Pills */}
        <div className="flex items-center gap-1 overflow-x-auto pb-4 mb-6 border-b border-vistara-border text-[11px] font-mono">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
            <button
              key={num}
              onClick={() => setCurrentStep(num)}
              className={`px-3 py-1.5 rounded-lg border font-semibold flex items-center gap-1.5 transition-colors flex-shrink-0 ${
                currentStep === num
                  ? 'bg-[#142334] text-white border-[#142334]'
                  : currentStep > num
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                  : 'bg-vistara-surface text-vistara-secondary border-vistara-border'
              }`}
            >
              <span>{num}.</span>
              <span>
                {num === 1 && 'Basic'}
                {num === 2 && 'Location'}
                {num === 3 && 'Specs'}
                {num === 4 && 'Photos'}
                {num === 5 && 'CAD'}
                {num === 6 && 'DNA'}
                {num === 7 && 'Pricing'}
                {num === 8 && 'Verify'}
                {num === 9 && 'Preview'}
              </span>
            </button>
          ))}
        </div>

        {publishedSuccess ? (
          <div className="p-12 text-center bg-vistara-surface border-2 border-emerald-500 rounded-2xl shadow-elevated max-w-xl mx-auto space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <Check className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-vistara-primary">
              Residence Published to Vistara!
            </h2>
            <p className="text-xs text-vistara-secondary leading-relaxed">
              <strong>{formData.title}</strong> is now live on the Chennai spatial discovery map and actively matching against qualified buyer life profiles in ECR.
            </p>
            <div className="pt-4 flex justify-center gap-3">
              <Button size="md" variant="primary" onClick={() => onNavigate('seller-listings')}>
                View in Managed Portfolio
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Active Step Form */}
            <div className="lg:col-span-7 bg-vistara-surface border border-vistara-border rounded-xl p-6 shadow-card space-y-4">
              
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div>
                    <label className="block font-semibold text-vistara-primary mb-1">Residence Marketing Title</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full bg-vistara-elevated border border-vistara-border rounded-lg p-2.5 text-vistara-primary focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-vistara-primary mb-1">Property Type</label>
                    <select
                      value={formData.propertyType}
                      onChange={(e) => setFormData(prev => ({ ...prev, propertyType: e.target.value }))}
                      className="w-full bg-vistara-elevated border border-vistara-border rounded-lg p-2.5 text-vistara-primary focus:outline-none"
                    >
                      <option>Beachside Villa</option>
                      <option>Penthouse Villa</option>
                      <option>Apartment</option>
                      <option>Courtyard Home</option>
                    </select>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-4">
                  <div>
                    <label className="block font-semibold text-vistara-primary mb-1">Chennai Micro-Market</label>
                    <select
                      value={formData.microMarket}
                      onChange={(e) => setFormData(prev => ({ ...prev, microMarket: e.target.value }))}
                      className="w-full bg-vistara-elevated border border-vistara-border rounded-lg p-2.5 text-vistara-primary focus:outline-none"
                    >
                      <option>ECR</option>
                      <option>Adyar</option>
                      <option>Besant Nagar</option>
                      <option>Boat Club</option>
                      <option>OMR - Perungudi</option>
                      <option>Anna Nagar</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold text-vistara-primary mb-1">Complete Physical Street Address</label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                      className="w-full bg-vistara-elevated border border-vistara-border rounded-lg p-2.5 text-vistara-primary focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-vistara-primary mb-1">Bedrooms (BHK)</label>
                    <input
                      type="number"
                      value={formData.bhk}
                      onChange={(e) => setFormData(prev => ({ ...prev, bhk: parseInt(e.target.value, 10) }))}
                      className="w-full bg-vistara-elevated border border-vistara-border rounded-lg p-2.5 text-vistara-primary focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-vistara-primary mb-1">Super Built-up Area (sq.ft)</label>
                    <input
                      type="number"
                      value={formData.area}
                      onChange={(e) => setFormData(prev => ({ ...prev, area: parseInt(e.target.value, 10) }))}
                      className="w-full bg-vistara-elevated border border-vistara-border rounded-lg p-2.5 text-vistara-primary focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {currentStep >= 4 && currentStep <= 8 && (
                <div className="p-8 text-center bg-vistara-elevated rounded-xl border border-vistara-border space-y-3">
                  <Check className="w-8 h-8 text-vistara-accent mx-auto" />
                  <div className="font-bold text-vistara-primary text-sm">
                    Phase {currentStep} Automated Verification Passed
                  </div>
                  <p className="text-vistara-secondary max-w-sm mx-auto">
                    Photographic resolutions, CAD polygon meshes, and CMDA registration ({formData.cmdaNumber}) validated successfully against client schema.
                  </p>
                </div>
              )}

              {currentStep === 9 && (
                <div className="space-y-4">
                  <div className="font-bold text-vistara-primary text-sm">Review Final Listing Dossier</div>
                  <div className="p-4 bg-vistara-elevated rounded-lg border border-vistara-border space-y-2">
                    <div className="flex justify-between">
                      <span className="text-vistara-secondary">Title:</span>
                      <strong className="text-vistara-primary">{formData.title}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-vistara-secondary">Micro-Market:</span>
                      <strong className="text-vistara-primary">{formData.microMarket}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-vistara-secondary">Area & BHK:</span>
                      <strong className="text-vistara-primary">{formData.bhk} BHK • {formData.area} sq.ft</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-vistara-secondary">Target Price:</span>
                      <strong className="text-vistara-accent">₹{formData.askingPriceCrores} Cr</strong>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between pt-6 border-t border-vistara-border">
                <Button
                  size="sm"
                  variant="secondary"
                  disabled={currentStep === 1}
                  onClick={handleBack}
                  icon={ArrowLeft}
                >
                  Previous Phase
                </Button>

                {currentStep < 9 ? (
                  <Button
                    size="sm"
                    variant="primary"
                    onClick={handleNext}
                    icon={ArrowRight}
                    iconPosition="right"
                  >
                    Proceed to Step {currentStep + 1}
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    variant="primary"
                    onClick={handlePublish}
                    icon={Check}
                  >
                    Publish to Live Map
                  </Button>
                )}
              </div>
            </div>

            {/* Right Column: Live Buyer View Mockup Preview */}
            <div className="lg:col-span-5 bg-vistara-surface border border-vistara-border rounded-xl p-5 shadow-card space-y-4 sticky top-24">
              <div className="flex items-center justify-between pb-2 border-b border-vistara-border text-[11px] font-bold uppercase tracking-wider text-vistara-secondary">
                <span>Live Buyer Card Preview</span>
                <Eye className="w-3.5 h-3.5 text-vistara-accent" />
              </div>

              <div className="border border-vistara-border rounded-xl overflow-hidden shadow-subtle">
                <img
                  src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80"
                  alt="Listing Preview"
                  className="w-full h-36 object-cover"
                />
                <div className="p-3 bg-vistara-surface space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-base font-bold text-vistara-primary">₹{formData.askingPriceCrores} Cr</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Verified
                    </span>
                  </div>
                  <div className="font-bold text-vistara-primary text-sm line-clamp-1">{formData.title}</div>
                  <div className="text-[11px] text-vistara-secondary line-clamp-1">{formData.address}</div>
                  <div className="text-[11px] text-vistara-secondary pt-2 border-t border-vistara-border/60">
                    {formData.bhk} BHK • {formData.area} sq.ft • {formData.propertyType}
                  </div>
                </div>
              </div>

              <div className="text-[11px] text-vistara-muted leading-tight">
                * As you update fields on the left, your public listing card refreshes reactively.
              </div>
            </div>

          </div>
        )}

      </div>

    </div>
  );
}
