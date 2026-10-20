import React from 'react';
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
  Eye,
  CheckCircle2
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { VistaraLogo } from '../components/common/VistaraLogo';
import { useApp } from '../context/AppContext';

export function LandingPage({ onNavigate }) {
  const { t, switchRole, loadDemoPreset } = useApp();

  const handleRoleSelection = (roleName) => {
    switchRole(roleName);
    if (roleName === 'seeker') onNavigate('explore');
    else if (roleName === 'seller') onNavigate('seller-dashboard');
    else if (roleName === 'agent') onNavigate('agent-dashboard');
  };

  return (
    <div className="min-h-screen bg-vistara-bg text-vistara-primary">
      
      {/* Editorial Hero Section */}
      <section className="relative pt-16 pb-24 overflow-hidden border-b border-vistara-border">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Brand Philosophy & CTAs */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-vistara-elevated border border-vistara-border text-xs font-semibold text-vistara-secondary mb-6 w-fit">
                <Sparkles className="w-3.5 h-3.5 text-vistara-accent" />
                <span>ARCHITECTURAL REAL ESTATE INTELLIGENCE</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-vistara-primary mb-6">
                Find a home that fits your life.
              </h1>

              <p className="text-lg sm:text-xl text-vistara-secondary font-normal leading-relaxed max-w-2xl mb-8">
                Vistara does not just show you properties. It understands your living rhythm first, analyzes spatial Home DNA second, and explains the honest trade-offs of where you choose to live.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <Button
                  size="lg"
                  variant="primary"
                  icon={ArrowRight}
                  iconPosition="right"
                  onClick={() => handleRoleSelection('seeker')}
                >
                  Enter as Home Seeker
                </Button>
                
                <Button
                  size="lg"
                  variant="secondary"
                  onClick={() => {
                    loadDemoPreset('WFH Professional');
                    onNavigate('explore');
                  }}
                >
                  ⚡ Launch Judge Demo
                </Button>
              </div>

              {/* Trust & Guarantee Markers */}
              <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-vistara-border text-xs">
                <div>
                  <div className="text-2xl font-bold text-vistara-primary">15+</div>
                  <div className="text-vistara-secondary mt-0.5">Chennai Micro-Markets</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-vistara-accent">100%</div>
                  <div className="text-vistara-secondary mt-0.5">Audited & Verified Listings</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-vistara-primary">7-Axis</div>
                  <div className="text-vistara-secondary mt-0.5">LifeFit Compatibility Model</div>
                </div>
              </div>

            </div>

            {/* Right Column: Architectural Spatial Preview Teaser */}
            <div className="lg:col-span-5 relative">
              <div className="relative bg-vistara-surface border border-vistara-border rounded-2xl p-4 shadow-elevated overflow-hidden">
                <div className="aspect-[4/3] rounded-xl overflow-hidden bg-vistara-elevated relative">
                  <img
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80"
                    alt="Vistara Architectural Residence"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#142334]/80 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                    <div className="text-xs uppercase tracking-widest font-semibold text-vistara-accent mb-1">
                      Featured Residence
                    </div>
                    <div className="text-xl font-bold">The Sunlit Atrium, Thoraipakkam</div>
                    <div className="text-xs text-white/80 mt-1 flex items-center justify-between">
                      <span>3 BHK • 1,680 sq.ft • ₹1.15 Cr</span>
                      <span className="bg-emerald-600 px-2 py-0.5 rounded text-[11px] font-bold">96% LifeFit</span>
                    </div>
                  </div>
                </div>

                {/* Micro-insight callout */}
                <div className="mt-4 p-3 bg-vistara-elevated rounded-lg border border-vistara-border text-xs flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sun className="w-4 h-4 text-amber-500" />
                    <span className="text-vistara-secondary font-medium">Dual aspect light & cross-breeze channel</span>
                  </div>
                  <span className="text-vistara-accent font-bold">Daylight Score 96</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* The Three Pillars Section */}
      <section className="py-20 border-b border-vistara-border bg-vistara-surface">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-vistara-accent">
              THE VISTARA METHODOLOGY
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-vistara-primary mt-2">
              Three distinct concepts. Zero generic guesswork.
            </h2>
            <p className="text-base text-vistara-secondary mt-3">
              Traditional real estate treats every buyer as a generic budget filter. Vistara constructs an explicit mathematical relationship between your life and the space.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Pillar 1: Life Profile */}
            <div className="p-8 bg-vistara-bg border border-vistara-border rounded-xl flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-lg bg-[#142334] text-white flex items-center justify-center mb-6">
                  <User className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-vistara-primary mb-3">
                  1. Life Profile
                </h3>
                <p className="text-sm text-vistara-secondary leading-relaxed mb-4">
                  Understands your daily routine, acoustic sensitivity, natural daylight needs, commute destinations, and future expansion plans before looking at a single listing.
                </p>
              </div>
              <div className="pt-4 border-t border-vistara-border/80 text-xs font-semibold text-vistara-accent">
                Synthesizes: Quiet Living • WFH Suitability • Family Growth
              </div>
            </div>

            {/* Pillar 2: Home DNA */}
            <div className="p-8 bg-vistara-bg border border-vistara-border rounded-xl flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-lg bg-[#142334] text-white flex items-center justify-center mb-6">
                  <Layers className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-vistara-primary mb-3">
                  2. Home DNA
                </h3>
                <p className="text-sm text-vistara-secondary leading-relaxed mb-4">
                  An intrinsic 6-dimensional spatial fingerprint evaluating decibel levels, sunlight trajectory, tree canopies, and entertaining flow from actual structural data.
                </p>
              </div>
              <div className="pt-4 border-t border-vistara-border/80 text-xs font-semibold text-vistara-accent">
                Measures: Acoustic dB • Sunlight Vector • Floor Circulation
              </div>
            </div>

            {/* Pillar 3: Fit Score & Honest Trade-offs */}
            <div className="p-8 bg-vistara-bg border border-vistara-border rounded-xl flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-lg bg-[#142334] text-white flex items-center justify-center mb-6">
                  <Scale className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-vistara-primary mb-3">
                  3. Fit Score & Trade-offs
                </h3>
                <p className="text-sm text-vistara-secondary leading-relaxed mb-4">
                  Calculates a true 7-axis compatibility index and reveals explicit compromises. We never claim a property is universally perfect.
                </p>
              </div>
              <div className="pt-4 border-t border-vistara-border/80 text-xs font-semibold text-vistara-accent">
                Reveals: "What You'll Give Up" & Dynamic Re-ranking
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Role Selection Showcase */}
      <section className="py-20 bg-vistara-bg">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-vistara-accent">
              THREE PURPOSE-BUILT EXPERIENCES
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-vistara-primary mt-2">
              Choose your product workspace
            </h2>
            <p className="text-sm text-vistara-secondary mt-2">
              Different information architecture tailored to discoverers, property owners, and matching advisors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Seeker Card */}
            <div 
              onClick={() => handleRoleSelection('seeker')}
              className="group bg-vistara-surface border border-vistara-border rounded-xl p-6 shadow-card hover:shadow-elevated transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="inline-flex p-3 rounded-lg bg-vistara-elevated text-vistara-primary group-hover:bg-[#142334] group-hover:text-white transition-colors mb-4">
                  <User className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-vistara-primary group-hover:text-vistara-accent transition-colors">
                  Home Seeker
                </h3>
                <p className="text-xs text-vistara-secondary mt-2 leading-relaxed">
                  Discover Chennai residences via Natural Language search, 3D interactive models, sunlight simulations, and collaborative Decision Rooms.
                </p>
                <ul className="mt-6 space-y-2 text-xs text-vistara-secondary">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-vistara-accent" /> Buy and Rent modes</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-vistara-accent" /> Sunlight & Golden Hour simulation</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-vistara-accent" /> Multi-user Decision Room</li>
                </ul>
              </div>
              <div className="mt-8 pt-4 border-t border-vistara-border flex items-center justify-between text-xs font-semibold text-vistara-primary">
                <span>Enter as Seeker</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Seller Card */}
            <div 
              onClick={() => handleRoleSelection('seller')}
              className="group bg-vistara-surface border border-vistara-border rounded-xl p-6 shadow-card hover:shadow-elevated transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="inline-flex p-3 rounded-lg bg-vistara-elevated text-vistara-primary group-hover:bg-[#142334] group-hover:text-white transition-colors mb-4">
                  <Building className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-vistara-primary group-hover:text-vistara-accent transition-colors">
                  Seller Studio
                </h3>
                <p className="text-xs text-vistara-secondary mt-2 leading-relaxed">
                  Property Operations Studio with real-time Listing Completeness Scoring, Fair Price Meters, and Buyer Interest Radars.
                </p>
                <ul className="mt-6 space-y-2 text-xs text-vistara-secondary">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-vistara-accent" /> 9-Step Listing Wizard</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-vistara-accent" /> Pricing Simulation Cockpit</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-vistara-accent" /> Buyer Interest Signals</li>
                </ul>
              </div>
              <div className="mt-8 pt-4 border-t border-vistara-border flex items-center justify-between text-xs font-semibold text-vistara-primary">
                <span>Enter Operations Studio</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Agent Card */}
            <div 
              onClick={() => handleRoleSelection('agent')}
              className="group bg-vistara-surface border border-vistara-border rounded-xl p-6 shadow-card hover:shadow-elevated transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="inline-flex p-3 rounded-lg bg-vistara-elevated text-vistara-primary group-hover:bg-[#142334] group-hover:text-white transition-colors mb-4">
                  <Briefcase className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-vistara-primary group-hover:text-vistara-accent transition-colors">
                  Agent CRM
                </h3>
                <p className="text-xs text-vistara-secondary mt-2 leading-relaxed">
                  Client & Property Matching Engine with interactive weight sliders, pipeline management, and client shortlisting.
                </p>
                <ul className="mt-6 space-y-2 text-xs text-vistara-secondary">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-vistara-accent" /> Live Weight Re-Ranking Engine</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-vistara-accent" /> Buyer & Renter Pipeline</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-vistara-accent" /> Shortlist & Visit Management</li>
                </ul>
              </div>
              <div className="mt-8 pt-4 border-t border-vistara-border flex items-center justify-between text-xs font-semibold text-vistara-primary">
                <span>Enter Agent Matching CRM</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Instant Demo Launcher Bar for Competition Judges */}
      <section className="py-12 bg-vistara-surface border-t border-vistara-border">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-vistara-accent/15 text-vistara-primary text-xs font-bold mb-4">
            <Sparkles className="w-3.5 h-3.5 text-vistara-accent" />
            FOR EVALUATION & JUDGING
          </div>
          <h3 className="text-2xl font-bold text-vistara-primary mb-2">
            Load Pre-Configured Competition Personas
          </h3>
          <p className="text-xs text-vistara-secondary mb-6">
            Instantly populate complete user life profiles, search preferences, and decision rooms with a single click.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {[
              { name: 'First-Time Buyer', desc: '₹1.2 Cr OMR Tech Commuter' },
              { name: 'WFH Professional', desc: 'Acoustic Calm & Fiber in Adyar' },
              { name: 'Family Buyer', desc: '₹4.5 Cr Multi-Gen in Anna Nagar' },
              { name: 'Renter', desc: '₹1.4L Beachfront Besant Nagar' }
            ].map(p => (
              <button
                key={p.name}
                type="button"
                onClick={() => {
                  loadDemoPreset(p.name);
                  onNavigate('explore');
                }}
                className="px-4 py-2.5 rounded-lg bg-vistara-elevated border border-vistara-border hover:border-vistara-accent hover:bg-vistara-surface text-left transition-colors"
              >
                <div className="text-xs font-bold text-vistara-primary">{p.name}</div>
                <div className="text-[10px] text-vistara-secondary">{p.desc}</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Architectural Editorial Footer */}
      <footer className="py-12 bg-[#142334] text-white border-t border-vistara-border text-xs">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <VistaraLogo size="sm" showWordmark={true} />
            <span className="text-white/60 ml-4 border-l border-white/20 pl-4">
              Zero Custom Backend • Local-First Architecture
            </span>
          </div>
          <div className="text-white/60 text-center md:text-right">
            <span>© 2026 Vistara Real Estate Platform. Designed for architectural clarity.</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
