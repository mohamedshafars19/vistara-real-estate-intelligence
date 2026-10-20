import React, { useState } from 'react';
import { 
  Check, 
  ArrowRight, 
  Sparkles, 
  MapPin, 
  Compass, 
  VolumeX, 
  Sun, 
  Laptop, 
  Trees, 
  Users, 
  Home, 
  Building, 
  Briefcase 
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import { VistaraLogo } from '../../components/common/VistaraLogo';
import { useApp } from '../../context/AppContext';

export function OnboardingPage({ onNavigate }) {
  const { currentUser, completeOnboarding } = useApp();
  const role = currentUser?.role || 'seeker';

  // ================= HOME SEEKER ONBOARDING STATE =================
  const [seekerMode, setSeekerMode] = useState('buy'); // 'buy' | 'rent'
  const [selectedLocations, setSelectedLocations] = useState(['OMR', 'Adyar', 'Besant Nagar']);
  const [budgetCrores, setBudgetCrores] = useState(1.6);
  const [rentThousands, setRentThousands] = useState(45);
  const [selectedBHK, setSelectedBHK] = useState(3);
  const [selectedPropertyType, setSelectedPropertyType] = useState('Apartment');
  const [selectedAffinities, setSelectedAffinities] = useState(['Quiet Living', 'Natural Light', 'Work Friendly']);
  const [commuteDestination, setCommuteDestination] = useState('tidelPark');
  const [futureScenarios, setFutureScenarios] = useState(['Need more WFH space']);

  // ================= SELLER ONBOARDING STATE =================
  const [sellerEntity, setSellerEntity] = useState('Individual Private Owner');
  const [sellerMarket, setSellerMarket] = useState('OMR - Perungudi');
  const [portfolioSize, setPortfolioSize] = useState('1 Residence');
  const [sellerObjective, setSellerObjective] = useState('Maximize Fair Value');

  // ================= AGENT ONBOARDING STATE =================
  const [agencyName, setAgencyName] = useState('Chennai Luxury Advisors');
  const [reraLicense, setReraLicense] = useState('TN/AGENT/0492/2024');
  const [agentTerritory, setAgentTerritory] = useState('South Chennai & Coastal ECR');
  const [clientSegment, setClientSegment] = useState('High-Net-Worth Buyers & Tech Leaders');

  const toggleLocation = (loc) => {
    setSelectedLocations(prev => 
      prev.includes(loc) ? prev.filter(l => l !== loc) : [...prev, loc]
    );
  };

  const toggleAffinity = (aff) => {
    setSelectedAffinities(prev => 
      prev.includes(aff) ? prev.filter(a => a !== aff) : [...prev, aff]
    );
  };

  const toggleFutureScenario = (scen) => {
    setFutureScenarios(prev => 
      prev.includes(scen) ? prev.filter(s => s !== scen) : [...prev, scen]
    );
  };

  const handleFinishOnboarding = () => {
    if (role === 'seeker') {
      // Synthesize Human-Readable Life Profile
      let profileTitle = 'Balanced Urban Living';
      if (selectedAffinities.includes('Quiet Living') && selectedAffinities.includes('Natural Light')) {
        profileTitle = 'Quiet Daylight Technologist';
      } else if (selectedAffinities.includes('Green') && selectedAffinities.includes('Family Friendly')) {
        profileTitle = 'Multi-Gen Green Family';
      } else if (selectedAffinities.includes('Social')) {
        profileTitle = 'Cosmopolitan Host & Entertainer';
      }

      const onboardingData = {
        mode: seekerMode,
        lifeProfile: {
          profileName: profileTitle,
          affinities: selectedAffinities,
          commuteDestination,
          futureScenarios
        },
        buyPreferences: {
          preferredLocations: selectedLocations,
          maxBudget: budgetCrores * 10000000,
          bhk: selectedBHK,
          propertyType: selectedPropertyType
        },
        rentPreferences: {
          preferredLocations: selectedLocations,
          maxBudget: rentThousands * 1000,
          bhk: selectedBHK,
          propertyType: selectedPropertyType
        }
      };

      completeOnboarding(onboardingData);
      onNavigate('dashboard');
    } else if (role === 'seller') {
      completeOnboarding({
        sellerPreferences: {
          entityType: sellerEntity,
          primaryMarket: sellerMarket,
          portfolioSize,
          objective: sellerObjective
        }
      });
      onNavigate('seller-dashboard');
    } else if (role === 'agent') {
      completeOnboarding({
        agentPreferences: {
          agencyName,
          reraLicense,
          specialization: agentTerritory,
          clientSegment
        }
      });
      onNavigate('agent-dashboard');
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-vistara-bg flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-vistara-surface border border-vistara-border rounded-2xl p-6 sm:p-8 shadow-card text-xs">
        
        {/* Header */}
        <div className="text-center mb-6 pb-4 border-b border-vistara-border">
          <div className="flex justify-center mb-2">
            <VistaraLogo size="md" showWordmark={true} />
          </div>
          <span className="text-xs uppercase font-bold text-vistara-accent tracking-wider">
            STEP 2 OF 2 • {role.toUpperCase()} ONBOARDING
          </span>
          <h1 className="text-2xl font-bold text-vistara-primary tracking-tight mt-1">
            {role === 'seeker' && 'Configure Your Life Profile'}
            {role === 'seller' && 'Configure Your Operations Profile'}
            {role === 'agent' && 'Configure Your Client Matching Agency'}
          </h1>
          <p className="text-vistara-secondary mt-1">
            {role === 'seeker' && 'We calibrate the 7-axis LifeFit algorithm around your personal rhythm before showing properties.'}
            {role === 'seller' && 'Setup your property portfolio context to calibrate pricing algorithms and buyer demand signals.'}
            {role === 'agent' && 'Establish agency licensing and target territories to streamline your matching pipelines.'}
          </p>
        </div>

        {/* ================= HOME SEEKER ONBOARDING FLOW ================= */}
        {role === 'seeker' && (
          <div className="space-y-6">
            
            {/* 1. Buy vs Rent Mode */}
            <div>
              <label className="block font-bold text-vistara-primary mb-1.5">Primary Intent</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setSeekerMode('buy')}
                  className={`p-3 rounded-lg border font-bold flex items-center justify-center gap-2 transition-all ${
                    seekerMode === 'buy'
                      ? 'bg-[#142334] text-white border-[#142334] shadow-subtle'
                      : 'bg-vistara-elevated text-vistara-secondary border-vistara-border hover:text-vistara-primary'
                  }`}
                >
                  <Home className="w-4 h-4" />
                  <span>I am Looking to Buy</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSeekerMode('rent')}
                  className={`p-3 rounded-lg border font-bold flex items-center justify-center gap-2 transition-all ${
                    seekerMode === 'rent'
                      ? 'bg-[#142334] text-white border-[#142334] shadow-subtle'
                      : 'bg-vistara-elevated text-vistara-secondary border-vistara-border hover:text-vistara-primary'
                  }`}
                >
                  <Building className="w-4 h-4" />
                  <span>I am Looking to Rent</span>
                </button>
              </div>
            </div>

            {/* 2. Target Locations in Chennai */}
            <div>
              <label className="block font-bold text-vistara-primary mb-1.5">
                Preferred Chennai Micro-Markets
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  'OMR', 'Adyar', 'Besant Nagar', 'Boat Club', 'ECR', 
                  'Anna Nagar', 'Kotturpuram', 'Poes Garden', 'Velachery', 'Nungambakkam', 'Alwarpet'
                ].map(loc => {
                  const active = selectedLocations.includes(loc);
                  return (
                    <button
                      key={loc}
                      type="button"
                      onClick={() => toggleLocation(loc)}
                      className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                        active
                          ? 'bg-[#142334] text-white border-[#142334]'
                          : 'bg-vistara-elevated text-vistara-secondary border-vistara-border hover:text-vistara-primary'
                      }`}
                    >
                      {active && <Check className="w-3 h-3 text-vistara-accent" />}
                      <span>{loc}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Budget & BHK */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-vistara-primary mb-1">
                  {seekerMode === 'buy' ? 'Max Capital Budget' : 'Max Monthly Rent'}
                </label>
                {seekerMode === 'buy' ? (
                  <div>
                    <div className="flex justify-between font-bold text-vistara-accent mb-1">
                      <span>Threshold:</span>
                      <span>₹{budgetCrores.toFixed(1)} Cr</span>
                    </div>
                    <input
                      type="range"
                      min="0.7"
                      max="15.0"
                      step="0.1"
                      value={budgetCrores}
                      onChange={(e) => setBudgetCrores(parseFloat(e.target.value))}
                      className="w-full h-1.5 bg-vistara-elevated rounded appearance-none accent-vistara-accent cursor-pointer"
                    />
                  </div>
                ) : (
                  <div>
                    <div className="flex justify-between font-bold text-vistara-accent mb-1">
                      <span>Threshold:</span>
                      <span>₹{rentThousands}k / mo</span>
                    </div>
                    <input
                      type="range"
                      min="20"
                      max="300"
                      step="5"
                      value={rentThousands}
                      onChange={(e) => setRentThousands(parseInt(e.target.value, 10))}
                      className="w-full h-1.5 bg-vistara-elevated rounded appearance-none accent-vistara-accent cursor-pointer"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block font-bold text-vistara-primary mb-1">Bedrooms (BHK)</label>
                <div className="grid grid-cols-4 gap-1.5">
                  {[1, 2, 3, 4].map(bhk => (
                    <button
                      key={bhk}
                      type="button"
                      onClick={() => setSelectedBHK(bhk)}
                      className={`p-2 rounded border font-bold text-center ${
                        selectedBHK === bhk
                          ? 'bg-[#142334] text-white border-[#142334]'
                          : 'bg-vistara-elevated text-vistara-secondary border-vistara-border'
                      }`}
                    >
                      {bhk} BHK
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 4. Lifestyle Affinities */}
            <div>
              <label className="block font-bold text-vistara-primary mb-1.5">
                Core Lifestyle Affinities (Select top 3)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  { name: 'Quiet Living', icon: VolumeX },
                  { name: 'Natural Light', icon: Sun },
                  { name: 'Work Friendly', icon: Laptop },
                  { name: 'Green', icon: Trees },
                  { name: 'Social', icon: Users },
                  { name: 'Family Friendly', icon: Home }
                ].map(aff => {
                  const active = selectedAffinities.includes(aff.name);
                  const Icon = aff.icon;
                  return (
                    <button
                      key={aff.name}
                      type="button"
                      onClick={() => toggleAffinity(aff.name)}
                      className={`p-2.5 rounded-lg border font-semibold flex items-center gap-2 transition-all ${
                        active
                          ? 'bg-[#142334] text-white border-[#142334]'
                          : 'bg-vistara-elevated text-vistara-secondary border-vistara-border hover:text-vistara-primary'
                      }`}
                    >
                      <Icon className={`w-3.5 h-3.5 ${active ? 'text-vistara-accent' : ''}`} />
                      <span>{aff.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 5. Primary Commute Destination */}
            <div>
              <label className="block font-bold text-vistara-primary mb-1">
                Primary Daily Commute Hub
              </label>
              <select
                value={commuteDestination}
                onChange={(e) => setCommuteDestination(e.target.value)}
                className="w-full bg-vistara-elevated border border-vistara-border rounded-lg p-2.5 text-vistara-primary font-semibold focus:outline-none"
              >
                <option value="tidelPark">Tidel Park / OMR IT Corridor</option>
                <option value="airport">Chennai International Airport</option>
                <option value="centralStation">Chennai Central Railway Station</option>
                <option value="ecrBeaches">ECR Coastal Workspaces</option>
              </select>
            </div>

          </div>
        )}

        {/* ================= SELLER ONBOARDING FLOW ================= */}
        {role === 'seller' && (
          <div className="space-y-4">
            <div>
              <label className="block font-bold text-vistara-primary mb-1">Seller Entity Type</label>
              <select
                value={sellerEntity}
                onChange={(e) => setSellerEntity(e.target.value)}
                className="w-full bg-vistara-elevated border border-vistara-border rounded-lg p-2.5 text-vistara-primary font-semibold focus:outline-none"
              >
                <option>Individual Private Owner</option>
                <option>Real Estate Investment Trust / Investor</option>
                <option>Boutique Architecture Builder</option>
                <option>Institutional Developer</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-vistara-primary mb-1">Primary Chennai Micro-Market</label>
              <select
                value={sellerMarket}
                onChange={(e) => setSellerMarket(e.target.value)}
                className="w-full bg-vistara-elevated border border-vistara-border rounded-lg p-2.5 text-vistara-primary font-semibold focus:outline-none"
              >
                <option>OMR - Perungudi</option>
                <option>OMR - Thoraipakkam</option>
                <option>Adyar</option>
                <option>Besant Nagar</option>
                <option>Boat Club</option>
                <option>ECR</option>
                <option>Anna Nagar</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-vistara-primary mb-1">Active Portfolio Size</label>
              <select
                value={portfolioSize}
                onChange={(e) => setPortfolioSize(e.target.value)}
                className="w-full bg-vistara-elevated border border-vistara-border rounded-lg p-2.5 text-vistara-primary font-semibold focus:outline-none"
              >
                <option>1 Residence</option>
                <option>2-5 Residences</option>
                <option>6-15 Residences</option>
                <option>15+ Multi-Family Units</option>
              </select>
            </div>
          </div>
        )}

        {/* ================= AGENT ONBOARDING FLOW ================= */}
        {role === 'agent' && (
          <div className="space-y-4">
            <div>
              <label className="block font-semibold text-vistara-primary mb-1">Agency or Brokerage Name</label>
              <input
                type="text"
                value={agencyName}
                onChange={(e) => setAgencyName(e.target.value)}
                className="w-full bg-vistara-elevated border border-vistara-border rounded-lg p-2.5 text-vistara-primary font-semibold focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-vistara-primary mb-1">Tamil Nadu RERA License No.</label>
              <input
                type="text"
                value={reraLicense}
                onChange={(e) => setReraLicense(e.target.value)}
                className="w-full bg-vistara-elevated border border-vistara-border rounded-lg p-2.5 text-vistara-primary font-semibold focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-vistara-primary mb-1">Primary Mandate Territory</label>
              <input
                type="text"
                value={agentTerritory}
                onChange={(e) => setAgentTerritory(e.target.value)}
                className="w-full bg-vistara-elevated border border-vistara-border rounded-lg p-2.5 text-vistara-primary font-semibold focus:outline-none"
              />
            </div>
          </div>
        )}

        {/* Footer CTAs */}
        <div className="mt-8 pt-5 border-t border-vistara-border flex items-center justify-between">
          <div className="text-[11px] text-vistara-secondary">
            Settings can be updated anytime in your profile.
          </div>

          <Button
            size="md"
            variant="primary"
            icon={ArrowRight}
            iconPosition="right"
            onClick={handleFinishOnboarding}
          >
            Launch Personalized Workspace
          </Button>
        </div>

      </div>
    </div>
  );
}
