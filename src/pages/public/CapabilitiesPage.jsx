import React, { useState } from 'react';
import { ListFilter, CheckCircle2, User, Building, Briefcase, ArrowRight } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { SEEKER_CAPABILITIES, SELLER_CAPABILITIES, AGENT_CAPABILITIES } from '../../data/capabilities';

export function CapabilitiesPage({ onNavigate }) {
  const [activeTab, setActiveTab] = useState('seeker'); // 'seeker' | 'seller' | 'agent'

  const currentList = activeTab === 'seeker' 
    ? SEEKER_CAPABILITIES 
    : activeTab === 'seller' 
    ? SELLER_CAPABILITIES 
    : AGENT_CAPABILITIES;

  return (
    <div className="min-h-screen bg-vistara-bg pb-24 text-vistara-primary text-xs">
      
      {/* Header */}
      <section className="bg-vistara-surface border-b border-vistara-border py-16 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <span className="text-xs uppercase font-bold tracking-widest text-vistara-accent">
            ARCHITECTURAL PLATFORM CAPABILITIES
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-vistara-primary mt-2 mb-3">
            150 Complete Vistara Capabilities
          </h1>
          <p className="text-sm text-vistara-secondary leading-relaxed">
            Every capability across Home Seeker discovery, Seller operations studio, and Agent matching CRM is functional and grounded in real local state.
          </p>
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 pt-10">
        
        {/* Role Tabs */}
        <div className="flex justify-center gap-3 mb-8">
          <button
            onClick={() => setActiveTab('seeker')}
            className={`px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all ${
              activeTab === 'seeker'
                ? 'bg-[#142334] text-white shadow-subtle'
                : 'bg-vistara-surface text-vistara-secondary hover:text-vistara-primary border border-vistara-border'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Home Seeker (50 Capabilities)</span>
          </button>

          <button
            onClick={() => setActiveTab('seller')}
            className={`px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all ${
              activeTab === 'seller'
                ? 'bg-[#142334] text-white shadow-subtle'
                : 'bg-vistara-surface text-vistara-secondary hover:text-vistara-primary border border-vistara-border'
            }`}
          >
            <Building className="w-4 h-4" />
            <span>Seller Studio (50 Capabilities)</span>
          </button>

          <button
            onClick={() => setActiveTab('agent')}
            className={`px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all ${
              activeTab === 'agent'
                ? 'bg-[#142334] text-white shadow-subtle'
                : 'bg-vistara-surface text-vistara-secondary hover:text-vistara-primary border border-vistara-border'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Agent CRM (50 Capabilities)</span>
          </button>
        </div>

        {/* 50 Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentList.map(item => (
            <div
              key={item.id}
              className="p-4 bg-vistara-surface border border-vistara-border rounded-xl shadow-card flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="font-mono text-[10px] text-vistara-accent font-bold">
                    #{item.id < 10 ? `0${item.id}` : item.id}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-vistara-elevated border border-vistara-border text-vistara-secondary uppercase tracking-wider">
                    {item.category}
                  </span>
                </div>
                <h3 className="font-bold text-vistara-primary text-sm mb-1">
                  {item.name}
                </h3>
                <p className="text-vistara-secondary text-[11px] leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-vistara-border/60 flex items-center justify-between text-[11px] text-emerald-600 font-semibold">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Functional In App
                </span>
                <span className="text-vistara-secondary font-mono">
                  {activeTab.toUpperCase()}
                </span>
              </div>
            </div>
          ))}
        </div>

      </section>

    </div>
  );
}
