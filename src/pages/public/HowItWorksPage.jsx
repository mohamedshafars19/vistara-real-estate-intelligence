import React from 'react';
import { ArrowRight, User, Layers, Scale, Sun, Compass, CheckCircle2 } from 'lucide-react';
import { Button } from '../../components/common/Button';

export function HowItWorksPage({ onNavigate }) {
  const steps = [
    {
      num: "01",
      title: "Synthesize Your Life Profile",
      icon: User,
      desc: "Instead of asking for basic bedroom counts, Vistara understands how you live: your acoustic sensitivity, work-from-home concentration requirements, natural sunlight preference, and daily transit destinations."
    },
    {
      num: "02",
      title: "Analyze Spatial Home DNA",
      icon: Layers,
      desc: "Every residence in our Chennai inventory is independently mapped into 6 spatial dimensions: Quietness (decibel level), Natural Daylight (orientation & lux), Work Friendliness, Green Canopy, Social Hosting, and Family Adaptability."
    },
    {
      num: "03",
      title: "Compute Dynamic LifeFit Compatibility",
      icon: Scale,
      desc: "Our 7-axis algorithm calculates an individualized compatibility score (0-100%) between your personal rhythm and the residence's structural characteristics, explaining specific strengths and compromises."
    },
    {
      num: "04",
      title: "Explore 3D Models & Sunlight Simulators",
      icon: Sun,
      desc: "Walk through interactive 3D architectural models connected directly to 2D CAD floor plans. Slide the time-of-day control from 6 AM sunrise to 5:30 PM Golden Hour to witness natural light exposure."
    },
    {
      num: "05",
      title: "Collaborate in the Decision Room",
      icon: Compass,
      desc: "Compare up to 4 residences side-by-side without declaring an artificial winner. Move properties between 'Must Have', 'Nice to Have', and 'Concern' with family members to reach grounded consensus."
    }
  ];

  return (
    <div className="min-h-screen bg-vistara-bg pb-24 text-vistara-primary text-xs">
      
      {/* Hero */}
      <section className="bg-vistara-surface border-b border-vistara-border py-16 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <span className="text-xs uppercase font-bold tracking-widest text-vistara-accent">
            THE METHODOLOGY
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-vistara-primary mt-2 mb-3">
            How Vistara Works
          </h1>
          <p className="text-sm text-vistara-secondary leading-relaxed">
            Understanding a home is not about browsing thumbnail photos. It is an architectural inquiry into how physical space influences human well-being.
          </p>
        </div>
      </section>

      {/* Steps List */}
      <section className="max-w-4xl mx-auto px-4 py-16 space-y-12">
        {steps.map(step => {
          const Icon = step.icon;
          return (
            <div key={step.num} className="p-8 bg-vistara-surface border border-vistara-border rounded-2xl shadow-card flex flex-col md:flex-row gap-8 items-start">
              <div className="w-14 h-14 rounded-xl bg-[#142334] text-white flex items-center justify-center font-bold text-xl flex-shrink-0">
                {step.num}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2 text-vistara-accent font-semibold">
                  <Icon className="w-4 h-4" />
                  <span className="uppercase tracking-wider text-[11px]">Phase {step.num}</span>
                </div>
                <h3 className="text-xl font-bold text-vistara-primary mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-vistara-secondary leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          );
        })}

        <div className="p-8 text-center bg-[#142334] text-white rounded-2xl shadow-elevated">
          <h2 className="text-2xl font-bold mb-2">Ready to discover your home?</h2>
          <p className="text-xs text-white/70 max-w-md mx-auto mb-6">
            Create an account or launch our controlled judge demo mode to experience the complete architecture firsthand.
          </p>
          <div className="flex justify-center gap-3">
            <Button size="md" variant="accent" onClick={() => onNavigate('signup')}>
              Get Started Now
            </Button>
            <Button size="md" variant="secondary" onClick={() => onNavigate('login')}>
              Log In
            </Button>
          </div>
        </div>
      </section>

    </div>
  );
}
