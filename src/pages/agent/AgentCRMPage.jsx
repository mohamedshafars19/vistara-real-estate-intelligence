import React, { useState } from 'react';
import { 
  Briefcase, 
  Users, 
  Sparkles, 
  Phone, 
  Mail, 
  Sliders, 
  Check, 
  ArrowRight, 
  Calendar, 
  Plus, 
  Search,
  Filter
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import { FitScoreBadge } from '../../components/common/FitScoreBadge';
import { useApp } from '../../context/AppContext';
import { rankProperties } from '../../utils/fitEngine';

export function AgentCRMPage({ onSelectProperty, onNavigate }) {
  const { properties, agentClients, setAgentClients, toggleClientShortlist, addNotification, mode } = useApp();

  const [activeTab, setActiveTab] = useState('pipeline'); // 'pipeline' | 'matching' | 'clients'
  const [selectedClientId, setSelectedClientId] = useState('cl-1');

  // Interactive matching engine weights for the agent
  const [matchingWeights, setMatchingWeights] = useState({
    budget: 0.20,
    lifestyle: 0.25,
    commute: 0.15,
    homeDNA: 0.15,
    space: 0.15,
    location: 0.10
  });

  const activeClient = agentClients.find(c => c.id === selectedClientId) || agentClients[0];

  // Re-rank properties dynamically for the selected client
  const clientRankedProperties = rankProperties(properties, {
    mode: activeClient.type === 'Renter' ? 'rent' : 'buy',
    lifeProfile: {
      affinities: activeClient.keyAffinities,
      commuteDestination: 'tidelPark'
    },
    buyPreferences: {
      preferredLocations: activeClient.targetLocations,
      maxBudget: 60000000
    },
    rentPreferences: {
      preferredLocations: activeClient.targetLocations,
      maxBudget: 150000
    }
  }, matchingWeights);

  const handleUpdatePipelineStatus = (clientId, newStatus) => {
    setAgentClients(prev => prev.map(c => {
      if (c.id === clientId) return { ...c, pipelineStatus: newStatus };
      return c;
    }));
  };

  return (
    <div className="min-h-screen bg-vistara-bg pb-24 text-vistara-primary">
      
      {/* Top Header */}
      <div className="bg-vistara-surface border-b border-vistara-border px-4 sm:px-6 py-6">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Briefcase className="w-4 h-4 text-vistara-accent" />
              <span className="text-xs uppercase font-bold tracking-wider text-vistara-accent">
                CLIENT & MATCHING CRM
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-vistara-primary tracking-tight">
              Agent Matching Command Center
            </h1>
            <p className="text-xs text-vistara-secondary mt-1">
              High-precision client life profile matching, custom weighting, and institutional pipeline management.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="secondary"
              onClick={() => setActiveTab('matching')}
            >
              Matching Engine
            </Button>
            <Button
              size="sm"
              variant="primary"
              onClick={() => setActiveTab('pipeline')}
            >
              Client Pipeline
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 pt-6 space-y-6">
        
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-vistara-border pb-3 text-xs font-semibold">
          {[
            { id: 'pipeline', label: 'Client Pipeline Kanban' },
            { id: 'matching', label: 'Interactive Matching Engine' },
            { id: 'clients', label: 'Client Database' }
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

        {/* TAB 1: PIPELINE KANBAN */}
        {activeTab === 'pipeline' && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
            {['New Leads', 'Visit Scheduled', 'Shortlisted', 'Negotiating'].map(stage => {
              const clientsInStage = agentClients.filter(c => c.pipelineStatus === stage || (stage === 'New Leads' && !['Visit Scheduled', 'Shortlisted', 'Negotiating'].includes(c.pipelineStatus)));

              return (
                <div key={stage} className="bg-vistara-surface border border-vistara-border rounded-xl p-4 shadow-card flex flex-col min-h-[480px]">
                  <div className="flex items-center justify-between pb-3 border-b border-vistara-border mb-3 font-bold text-vistara-primary">
                    <span>{stage}</span>
                    <span className="w-5 h-5 rounded-full bg-vistara-elevated flex items-center justify-center text-[10px] text-vistara-secondary">
                      {clientsInStage.length}
                    </span>
                  </div>

                  <div className="space-y-3 flex-1">
                    {clientsInStage.map(client => (
                      <div
                        key={client.id}
                        className="bg-vistara-elevated border border-vistara-border rounded-lg p-3 shadow-subtle hover:border-vistara-accent transition-colors space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-vistara-primary text-sm">{client.name}</span>
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-vistara-surface border border-vistara-border text-vistara-secondary">
                            {client.type}
                          </span>
                        </div>

                        <div className="text-[11px] text-vistara-secondary">
                          Budget: <strong className="text-vistara-primary">{client.budget}</strong>
                        </div>
                        <div className="text-[11px] text-vistara-secondary line-clamp-1">
                          Affinities: {client.keyAffinities.join(', ')}
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-vistara-border/60 text-[11px]">
                          <button
                            onClick={() => {
                              setSelectedClientId(client.id);
                              setActiveTab('matching');
                            }}
                            className="text-vistara-accent font-semibold hover:underline flex items-center gap-1"
                          >
                            <Sparkles className="w-3 h-3" /> Run Match
                          </button>

                          <select
                            value={client.pipelineStatus}
                            onChange={(e) => handleUpdatePipelineStatus(client.id, e.target.value)}
                            className="bg-vistara-surface border border-vistara-border rounded px-1.5 py-0.5 text-vistara-primary font-medium focus:outline-none"
                          >
                            <option value="New Leads">New Leads</option>
                            <option value="Visit Scheduled">Visit Scheduled</option>
                            <option value="Shortlisted">Shortlisted</option>
                            <option value="Negotiating">Negotiating</option>
                          </select>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* TAB 2: INTERACTIVE MATCHING ENGINE */}
        {activeTab === 'matching' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-xs">
            
            {/* Left Column: Client Selector & Weight Sliders */}
            <div className="lg:col-span-5 bg-vistara-surface border border-vistara-border rounded-xl p-6 shadow-card space-y-5 sticky top-24">
              <div>
                <div className="font-bold text-vistara-primary text-sm mb-1">
                  Active Client Profile
                </div>
                <select
                  value={selectedClientId}
                  onChange={(e) => setSelectedClientId(e.target.value)}
                  className="w-full bg-vistara-elevated border border-vistara-border rounded p-2 text-vistara-primary font-semibold focus:outline-none"
                >
                  {agentClients.map(c => (
                    <option key={c.id} value={c.id}>{c.name} ({c.type} • {c.budget})</option>
                  ))}
                </select>
              </div>

              <div className="p-3 bg-vistara-elevated rounded border border-vistara-border text-[11px] space-y-1">
                <div><strong>Target Enclaves:</strong> {activeClient.targetLocations.join(', ')}</div>
                <div><strong>Key Life Affinities:</strong> {activeClient.keyAffinities.join(', ')}</div>
              </div>

              <div className="pt-3 border-t border-vistara-border space-y-4">
                <div className="font-bold text-vistara-primary text-xs uppercase tracking-wider">
                  Weight Sliders for Client Matching
                </div>

                <div>
                  <div className="flex justify-between font-semibold text-vistara-primary mb-1">
                    <span>Lifestyle & Daylight ({Math.round(matchingWeights.lifestyle * 100)}%)</span>
                  </div>
                  <input
                    type="range"
                    min="0.05"
                    max="0.45"
                    step="0.05"
                    value={matchingWeights.lifestyle}
                    onChange={(e) => setMatchingWeights(prev => ({ ...prev, lifestyle: parseFloat(e.target.value) }))}
                    className="w-full h-1.5 bg-vistara-elevated rounded appearance-none accent-vistara-accent cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between font-semibold text-vistara-primary mb-1">
                    <span>Commute Strictness ({Math.round(matchingWeights.commute * 100)}%)</span>
                  </div>
                  <input
                    type="range"
                    min="0.05"
                    max="0.45"
                    step="0.05"
                    value={matchingWeights.commute}
                    onChange={(e) => setMatchingWeights(prev => ({ ...prev, commute: parseFloat(e.target.value) }))}
                    className="w-full h-1.5 bg-vistara-elevated rounded appearance-none accent-vistara-accent cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between font-semibold text-vistara-primary mb-1">
                    <span>Acoustic Decibel Stillness ({Math.round(matchingWeights.homeDNA * 100)}%)</span>
                  </div>
                  <input
                    type="range"
                    min="0.05"
                    max="0.45"
                    step="0.05"
                    value={matchingWeights.homeDNA}
                    onChange={(e) => setMatchingWeights(prev => ({ ...prev, homeDNA: parseFloat(e.target.value) }))}
                    className="w-full h-1.5 bg-vistara-elevated rounded appearance-none accent-vistara-accent cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Right Column: Live Ranked Inventory for Client */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-vistara-border">
                <span className="font-bold text-vistara-primary text-sm">
                  Recommended Residences for {activeClient.name}
                </span>
                <span className="text-[11px] text-vistara-secondary">
                  Dynamically weighted matches
                </span>
              </div>

              {clientRankedProperties.slice(0, 5).map((prop, idx) => (
                <div
                  key={prop.id}
                  className="p-4 bg-vistara-surface border border-vistara-border rounded-xl shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-4">
                    <img
                      src={prop.coverImage}
                      alt={prop.name}
                      className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-vistara-primary text-sm">{prop.name}</span>
                        <span className="font-bold text-vistara-accent text-xs">#{idx + 1} Match</span>
                      </div>
                      <div className="text-[11px] text-vistara-secondary mt-0.5">
                        {prop.microMarket} • {prop.bhk} BHK • {prop.priceDisplay}
                      </div>
                      <div className="text-[11px] text-emerald-600 mt-1 font-medium">
                        Why Match: {prop.fit.reasons[0] || 'Matches client criteria'}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => onSelectProperty(prop.id)}
                    >
                      Inspect Details
                    </Button>
                    <Button
                      size="sm"
                      variant={activeClient.assignedProperties?.includes(prop.id) ? "accent" : "primary"}
                      onClick={() => {
                        toggleClientShortlist(activeClient.id, prop.id);
                        addNotification({
                          type: 'Agent CRM',
                          title: 'Client Shortlist Updated',
                          description: `${prop.name} updated in ${activeClient.name}'s active portfolio.`,
                          message: `${prop.name} shortlisted for ${activeClient.name}`,
                          action: 'agent-matches'
                        });
                      }}
                    >
                      {activeClient.assignedProperties?.includes(prop.id) ? "Shortlisted ✓" : "Shortlist for Client"}
                    </Button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* TAB 3: CLIENT DATABASE */}
        {activeTab === 'clients' && (
          <div className="bg-vistara-surface border border-vistara-border rounded-xl p-6 shadow-card space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-vistara-border">
              <h3 className="font-bold text-vistara-primary text-sm">
                Active Client Relationships ({agentClients.length})
              </h3>
            </div>

            <div className="divide-y divide-vistara-border">
              {agentClients.map(client => (
                <div key={client.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="font-bold text-vistara-primary text-sm">{client.name}</div>
                    <div className="text-vistara-secondary text-[11px] mt-0.5 flex items-center gap-4">
                      <span>{client.phone}</span>
                      <span>•</span>
                      <span>{client.email}</span>
                      <span>•</span>
                      <span className="font-semibold text-vistara-primary">{client.type}</span>
                    </div>
                    <div className="text-[11px] text-vistara-primary mt-1">
                      Target: {client.targetLocations.join(', ')} ({client.budget})
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => {
                        setSelectedClientId(client.id);
                        setActiveTab('matching');
                      }}
                    >
                      Run Matching Engine
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
