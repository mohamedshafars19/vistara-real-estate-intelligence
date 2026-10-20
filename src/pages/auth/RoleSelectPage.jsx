import React from 'react';
import { User, Building, Briefcase, ArrowRight, CheckCircle2 } from 'lucide-react';
import { VistaraLogo } from '../../components/common/VistaraLogo';
import { useApp } from '../../context/AppContext';

export function RoleSelectPage({ onNavigate }) {
  const { currentUser, chooseRole } = useApp();

  const handleSelectRole = (selectedRole) => {
    chooseRole(selectedRole);
    onNavigate('onboarding');
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-vistara-bg flex items-center justify-center p-4">
      <div className="w-full max-w-4xl text-center py-8">
        
        <div className="flex justify-center mb-4">
          <VistaraLogo size="md" showWordmark={true} />
        </div>

        <span className="text-xs font-bold uppercase tracking-widest text-vistara-accent">
          WELCOME TO VISTARA{currentUser?.name ? `, ${currentUser.name.toUpperCase()}` : ''}
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-vistara-primary tracking-tight mt-2 mb-3">
          Choose your Vistara experience
        </h1>
        <p className="text-sm text-vistara-secondary max-w-xl mx-auto mb-10">
          Vistara provides three distinct purpose-built workspaces. Select the role that matches your primary mission.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left text-xs">
          
          {/* Card 1: Home Seeker */}
          <div
            onClick={() => handleSelectRole('seeker')}
            className="group bg-vistara-surface border-2 border-vistara-border hover:border-vistara-accent rounded-2xl p-6 shadow-card hover:shadow-elevated transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-vistara-elevated group-hover:bg-[#142334] group-hover:text-white transition-colors flex items-center justify-center text-vistara-primary mb-4">
                <User className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-vistara-primary group-hover:text-vistara-accent transition-colors">
                Home Seeker
              </h3>
              <p className="text-vistara-secondary mt-1.5 leading-relaxed">
                Discover Chennai residences that fit your living rhythm, natural light needs, and acoustic priorities for buying or renting.
              </p>
              
              <ul className="mt-4 space-y-2 text-[11px] text-vistara-secondary">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-vistara-accent flex-shrink-0" />
                  <span>Lifestyle Profile & LifeFit Score</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-vistara-accent flex-shrink-0" />
                  <span>3D Spatial Models & Sunlight Simulator</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-vistara-accent flex-shrink-0" />
                  <span>Collaborative Decision Room</span>
                </li>
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t border-vistara-border flex items-center justify-between font-bold text-vistara-primary group-hover:text-vistara-accent">
              <span>Select Home Seeker</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2: Property Seller */}
          <div
            onClick={() => handleSelectRole('seller')}
            className="group bg-vistara-surface border-2 border-vistara-border hover:border-vistara-accent rounded-2xl p-6 shadow-card hover:shadow-elevated transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-vistara-elevated group-hover:bg-[#142334] group-hover:text-white transition-colors flex items-center justify-center text-vistara-primary mb-4">
                <Building className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-vistara-primary group-hover:text-vistara-accent transition-colors">
                Property Seller
              </h3>
              <p className="text-vistara-secondary mt-1.5 leading-relaxed">
                Professional Property Operations Studio to list, benchmark fair pricing, inspect photo quality, and manage buyer inquiries.
              </p>
              
              <ul className="mt-4 space-y-2 text-[11px] text-vistara-secondary">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-vistara-accent flex-shrink-0" />
                  <span>9-Step Listing Wizard with Live Preview</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-vistara-accent flex-shrink-0" />
                  <span>Fair Price & Rate/Sq.Ft Simulator</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-vistara-accent flex-shrink-0" />
                  <span>Live Buyer Demand & Save Signals</span>
                </li>
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t border-vistara-border flex items-center justify-between font-bold text-vistara-primary group-hover:text-vistara-accent">
              <span>Select Seller Studio</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 3: Matching Agent */}
          <div
            onClick={() => handleSelectRole('agent')}
            className="group bg-vistara-surface border-2 border-vistara-border hover:border-vistara-accent rounded-2xl p-6 shadow-card hover:shadow-elevated transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-vistara-elevated group-hover:bg-[#142334] group-hover:text-white transition-colors flex items-center justify-center text-vistara-primary mb-4">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-vistara-primary group-hover:text-vistara-accent transition-colors">
                Matching Agent
              </h3>
              <p className="text-vistara-secondary mt-1.5 leading-relaxed">
                Client & Property Matching CRM with customizable weight sliders, buyer pipelines, tour coordination, and shortlist builders.
              </p>
              
              <ul className="mt-4 space-y-2 text-[11px] text-vistara-secondary">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-vistara-accent flex-shrink-0" />
                  <span>Multi-Slider Dynamic Matching Engine</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-vistara-accent flex-shrink-0" />
                  <span>Kanban Deal Pipeline & Follow-ups</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-vistara-accent flex-shrink-0" />
                  <span>Client Dossiers & Shortlist Exports</span>
                </li>
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t border-vistara-border flex items-center justify-between font-bold text-vistara-primary group-hover:text-vistara-accent">
              <span>Select Agent CRM</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
