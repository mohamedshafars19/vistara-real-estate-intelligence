import React, { useState, useMemo } from 'react';
import { 
  Briefcase, 
  Users, 
  Sparkles, 
  Calendar, 
  ArrowRight, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Building,
  UserPlus,
  PhoneCall,
  Search,
  ChevronRight,
  Plus,
  Compass,
  Filter,
  Share2,
  BookmarkPlus,
  Check,
  Phone,
  Mail,
  MapPin,
  Car,
  ShieldCheck,
  Sliders,
  X,
  FileText
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import { FitScoreBadge } from '../../components/common/FitScoreBadge';
import { PropertyImage } from '../../components/common/PropertyImage';
import { useApp } from '../../context/AppContext';
import { calculateFitScore, clientToUserProfile } from '../../utils/fitEngine';

const PIPELINE_STAGES = [
  'New',
  'Contacted',
  'Qualified',
  'Shortlisted',
  'Visit Scheduled',
  'Visited',
  'Negotiating',
  'Closed'
];

export function AgentDashboardPage({ onNavigate, onSelectProperty }) {
  const { 
    currentUser,
    agentClients, 
    addAgentClient,
    updateClientStage,
    updateClient,
    addClientFollowUp,
    completeFollowUp,
    toggleClientShortlist,
    properties, 
    visits, 
    scheduleVisit,
    addNotification
  } = useApp();

  const [selectedClientId, setSelectedClientId] = useState(agentClients[0]?.id || 'cl-1');
  const [pipelineFilter, setPipelineFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [actionTab, setActionTab] = useState('Due Today'); // 'Due Today' | 'Upcoming' | 'Completed'
  
  // Modals state
  const [showAddClientModal, setShowAddClientModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [scheduleProperty, setScheduleProperty] = useState(null);
  const [scheduleDate, setScheduleDate] = useState('2026-09-28');
  const [scheduleTime, setScheduleTime] = useState('11:00 AM');
  const [scheduleNotes, setScheduleNotes] = useState('');
  const [showAddNoteModal, setShowAddNoteModal] = useState(false);
  const [clientNoteText, setClientNoteText] = useState('');
  const [toastMessage, setToastMessage] = useState(null);

  // New Client Form State
  const [newClientData, setNewClientData] = useState({
    name: '',
    phone: '',
    email: '',
    type: 'Buyer',
    budget: '₹2.5 - 3.5 Cr',
    targetLocations: 'Adyar, Besant Nagar',
    bhk: 3,
    lifestyle: 'Quiet Living & High Daylight',
    commute: 'Under 25 mins to CBD',
    homeDNA: 'Acoustic Stillness > 88',
    futureFit: 'WFH Studio',
    notes: '',
    pipelineStatus: 'New'
  });

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const selectedClient = useMemo(() => {
    return agentClients.find(c => c.id === selectedClientId) || agentClients[0] || null;
  }, [agentClients, selectedClientId]);

  // Filter clients by pipeline stage and search
  const filteredClients = useMemo(() => {
    return agentClients.filter(c => {
      const matchesStage = pipelineFilter === 'All' || c.pipelineStatus === pipelineFilter;
      const matchesSearch = !searchQuery || 
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.targetLocations?.some(loc => loc.toLowerCase().includes(searchQuery.toLowerCase())) ||
        c.type.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesStage && matchesSearch;
    });
  }, [agentClients, pipelineFilter, searchQuery]);

  // Multi-axis Vistara Fit Matching Engine for the Selected Client
  const matchedProperties = useMemo(() => {
    if (!selectedClient || !properties || properties.length === 0) return [];
    const clientProfile = clientToUserProfile(selectedClient);

    return properties.map(property => {
      const fitResult = calculateFitScore(property, clientProfile);
      const fitScore = fitResult.score;

      const whyMatch = fitResult.reasons?.[0] || 
        `High compatibility with ${selectedClient.name}'s lifestyle priorities (${property.bhk} BHK in ${property.location}).`;

      const potentialConcern = fitResult.compromises?.[0] || 
        (property.price > 40000000 && selectedClient.budget?.includes('2')
          ? `Asking price exceeds initial conservative band by approx 15%.`
          : `High demand area; multiple active inquiries this week.`);

      return {
        ...property,
        fitScore,
        whyMatch,
        potentialConcern,
        isShortlisted: (selectedClient.assignedProperties || []).includes(property.id)
      };
    }).sort((a, b) => b.fitScore - a.fitScore);
  }, [selectedClient, properties]);

  // Extract all follow-up tasks across clients or for selected client
  const allFollowUps = useMemo(() => {
    const list = [];
    agentClients.forEach(client => {
      (client.followUps || []).forEach(fu => {
        list.push({
          ...fu,
          clientId: client.id,
          clientName: client.name,
          clientType: client.type
        });
      });
    });
    return list;
  }, [agentClients]);

  const filteredFollowUps = useMemo(() => {
    return allFollowUps.filter(fu => {
      if (actionTab === 'Due Today') return fu.status === 'Due Today';
      if (actionTab === 'Upcoming') return fu.status === 'Upcoming';
      return fu.status === 'Completed';
    });
  }, [allFollowUps, actionTab]);

  // Handle stage change
  const handleStageChange = (clientId, newStage) => {
    updateClientStage(clientId, newStage);
    showToast(`Client pipeline updated to "${newStage}"`);
  };

  // Handle new client submit
  const handleCreateClient = (e) => {
    e.preventDefault();
    if (!newClientData.name.trim()) return;

    addAgentClient({
      name: newClientData.name,
      phone: newClientData.phone,
      email: newClientData.email,
      type: newClientData.type,
      budget: newClientData.budget,
      targetLocations: newClientData.targetLocations.split(',').map(s => s.trim()).filter(Boolean),
      bhk: parseInt(newClientData.bhk, 10) || 3,
      lifestyle: newClientData.lifestyle,
      commute: newClientData.commute,
      homeDNA: newClientData.homeDNA,
      futureFit: newClientData.futureFit,
      notes: newClientData.notes,
      pipelineStatus: newClientData.pipelineStatus
    });

    setShowAddClientModal(false);
    showToast(`Client profile for "${newClientData.name}" created and synced.`);
    setNewClientData({
      name: '',
      phone: '',
      email: '',
      type: 'Buyer',
      budget: '₹2.5 - 3.5 Cr',
      targetLocations: 'Adyar, Besant Nagar',
      bhk: 3,
      lifestyle: 'Quiet Living & High Daylight',
      commute: 'Under 25 mins to CBD',
      homeDNA: 'Acoustic Stillness > 88',
      futureFit: 'WFH Studio',
      notes: '',
      pipelineStatus: 'New'
    });
  };

  // Handle Schedule Visit for Client
  const handleConfirmSchedule = (e) => {
    e.preventDefault();
    if (!scheduleProperty || !selectedClient) return;

    scheduleVisit(
      scheduleProperty.id,
      scheduleDate,
      scheduleTime,
      `Client Walkthrough with ${selectedClient.name} (${selectedClient.phone}). Notes: ${scheduleNotes}`
    );

    // Also advance client status to 'Visit Scheduled'
    updateClientStage(selectedClient.id, 'Visit Scheduled');
    addClientFollowUp(selectedClient.id, `Accompanied tour with ${selectedClient.name} at ${scheduleProperty.title}`, `${scheduleDate} at ${scheduleTime}`);

    setShowScheduleModal(false);
    showToast(`Private tour scheduled for ${selectedClient.name} at ${scheduleProperty.title}`);
  };

  // Add Note to Client
  const handleSaveNote = (e) => {
    e.preventDefault();
    if (!clientNoteText.trim() || !selectedClient) return;

    const updatedNotes = selectedClient.notes 
      ? `${selectedClient.notes}\n[${new Date().toLocaleDateString('en-GB')}]: ${clientNoteText.trim()}`
      : `[${new Date().toLocaleDateString('en-GB')}]: ${clientNoteText.trim()}`;

    updateClient(selectedClient.id, { notes: updatedNotes });
    setClientNoteText('');
    setShowAddNoteModal(false);
    showToast(`Client dossier updated with note.`);
  };

  return (
    <div className="min-h-screen bg-vistara-bg pb-24 text-vistara-primary">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 bg-vistara-surface border border-vistara-accent/40 rounded-xl shadow-2xl flex items-center gap-3 animate-fade-in text-vistara-primary">
          <CheckCircle2 className="w-5 h-5 text-vistara-accent shrink-0" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Header: Personalized Cockpit */}
      <div className="bg-vistara-surface border-b border-vistara-border px-4 sm:px-6 py-5">
        <div className="max-w-[1520px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded bg-vistara-accent/10 border border-vistara-accent/20 text-[10px] uppercase font-bold tracking-wider text-vistara-accent">
                CLIENT MATCHING STUDIO
              </span>
              <span className="text-xs text-vistara-secondary font-medium">
                • Chennai RERA Certified Advisory
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-vistara-primary tracking-tight">
              Good morning, {currentUser?.name || 'Partner Agent'}
            </h1>
            <p className="text-xs text-vistara-secondary mt-1">
              Active matching workspace connecting client Life Profiles with curated Chennai residences.
            </p>
          </div>

          <div className="flex items-center flex-wrap gap-2.5">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-vistara-secondary" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search clients or locations..."
                className="pl-9 pr-3 py-1.5 text-xs bg-vistara-elevated border border-vistara-border rounded-lg text-vistara-primary placeholder:text-vistara-secondary focus:outline-none focus:border-vistara-accent w-48 sm:w-60"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-vistara-secondary hover:text-vistara-primary"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            <Button
              size="sm"
              variant="secondary"
              onClick={() => onNavigate('agent-matches')}
              icon={Sparkles}
            >
              Matching Engine
            </Button>

            <Button
              size="sm"
              variant="primary"
              onClick={() => setShowAddClientModal(true)}
              icon={UserPlus}
            >
              Add Client
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-[1520px] mx-auto px-4 sm:px-6 pt-6 space-y-6">
        
        {/* KPI Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
          <div className="p-3.5 bg-vistara-surface border border-vistara-border rounded-xl shadow-card">
            <div className="flex items-center justify-between text-xs text-vistara-secondary mb-1">
              <span>Active Clients</span>
              <Users className="w-4 h-4 text-vistara-accent" />
            </div>
            <div className="text-2xl font-extrabold text-vistara-primary">{agentClients.length}</div>
            <div className="text-[10px] text-vistara-secondary mt-0.5">
              {agentClients.filter(c => c.type === 'Buyer').length} Buyers • {agentClients.filter(c => c.type === 'Renter').length} Renters
            </div>
          </div>

          <div className="p-3.5 bg-vistara-surface border border-vistara-border rounded-xl shadow-card">
            <div className="flex items-center justify-between text-xs text-vistara-secondary mb-1">
              <span>New Matches</span>
              <Sparkles className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-2xl font-extrabold text-vistara-primary">
              {matchedProperties.filter(p => p.fitScore >= 90).length}
            </div>
            <div className="text-[10px] text-amber-600 dark:text-amber-400 mt-0.5 font-medium">Over 90% Fit Score</div>
          </div>

          <div className="p-3.5 bg-vistara-surface border border-vistara-border rounded-xl shadow-card">
            <div className="flex items-center justify-between text-xs text-vistara-secondary mb-1">
              <span>Today's Visits</span>
              <Calendar className="w-4 h-4 text-blue-500" />
            </div>
            <div className="text-2xl font-extrabold text-vistara-primary">
              {visits.filter(v => v.status === 'Scheduled').length}
            </div>
            <div className="text-[10px] text-blue-600 dark:text-blue-400 mt-0.5 font-medium">Private tours active</div>
          </div>

          <div className="p-3.5 bg-vistara-surface border border-vistara-border rounded-xl shadow-card">
            <div className="flex items-center justify-between text-xs text-vistara-secondary mb-1">
              <span>Follow-ups</span>
              <Clock className="w-4 h-4 text-rose-500" />
            </div>
            <div className="text-2xl font-extrabold text-vistara-primary">
              {allFollowUps.filter(f => f.status === 'Due Today').length}
            </div>
            <div className="text-[10px] text-rose-600 dark:text-rose-400 mt-0.5 font-medium">Due today</div>
          </div>

          <div className="p-3.5 bg-vistara-surface border border-vistara-border rounded-xl shadow-card">
            <div className="flex items-center justify-between text-xs text-vistara-secondary mb-1">
              <span>Client Pipeline</span>
              <Briefcase className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-extrabold text-vistara-primary">8 Stages</div>
            <div className="text-[10px] text-emerald-600 dark:text-emerald-400 mt-0.5 font-medium">Active negotiations</div>
          </div>

          <div className="p-3.5 bg-vistara-surface border border-vistara-border rounded-xl shadow-card">
            <div className="flex items-center justify-between text-xs text-vistara-secondary mb-1">
              <span>Top Match Signal</span>
              <TrendingUp className="w-4 h-4 text-vistara-accent" />
            </div>
            <div className="text-2xl font-extrabold text-vistara-primary">96%</div>
            <div className="text-[10px] text-vistara-accent mt-0.5 font-medium">Kotturpuram Sanctuary</div>
          </div>
        </div>

        {/* 3-Column Studio Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* ================= COLUMN 1: CLIENT PIPELINE (Left 3.5 Cols) ================= */}
          <div className="lg:col-span-3 space-y-4">
            <div className="p-4 bg-vistara-surface border border-vistara-border rounded-xl shadow-card space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-vistara-accent" />
                  <h2 className="font-bold text-sm text-vistara-primary">Client Pipeline</h2>
                </div>
                <button
                  onClick={() => setShowAddClientModal(true)}
                  className="p-1 rounded hover:bg-vistara-elevated text-vistara-accent"
                  title="Add Client"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Stage Filter Scroll */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-[11px]">
                <button
                  onClick={() => setPipelineFilter('All')}
                  className={`px-2.5 py-1 rounded-full whitespace-nowrap font-medium transition-colors ${
                    pipelineFilter === 'All'
                      ? 'bg-vistara-primary text-vistara-surface font-bold'
                      : 'bg-vistara-elevated text-vistara-secondary hover:text-vistara-primary'
                  }`}
                >
                  All ({agentClients.length})
                </button>
                {PIPELINE_STAGES.map(stage => {
                  const count = agentClients.filter(c => c.pipelineStatus === stage).length;
                  if (count === 0 && pipelineFilter !== stage) return null;
                  return (
                    <button
                      key={stage}
                      onClick={() => setPipelineFilter(stage)}
                      className={`px-2.5 py-1 rounded-full whitespace-nowrap font-medium transition-colors ${
                        pipelineFilter === stage
                          ? 'bg-vistara-primary text-vistara-surface font-bold'
                          : 'bg-vistara-elevated text-vistara-secondary hover:text-vistara-primary'
                      }`}
                    >
                      {stage} ({count})
                    </button>
                  );
                })}
              </div>

              {/* Client List */}
              <div className="space-y-2 max-h-[640px] overflow-y-auto pr-1">
                {filteredClients.length === 0 ? (
                  <div className="p-6 text-center text-xs text-vistara-secondary">
                    No clients found for this stage.
                  </div>
                ) : (
                  filteredClients.map(client => {
                    const isSelected = client.id === selectedClientId;
                    return (
                      <div
                        key={client.id}
                        onClick={() => setSelectedClientId(client.id)}
                        className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-vistara-elevated border-vistara-accent shadow-sm'
                            : 'bg-vistara-elevated/50 border-vistara-border/70 hover:border-vistara-accent/40'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="font-bold text-xs text-vistara-primary line-clamp-1">{client.name}</span>
                              <span className={`px-1.5 py-0.2 rounded text-[9px] font-bold ${
                                client.type === 'Buyer' 
                                  ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300' 
                                  : 'bg-blue-500/10 text-blue-700 dark:text-blue-300'
                              }`}>
                                {client.type}
                              </span>
                            </div>
                            <p className="text-[11px] font-medium text-vistara-accent mt-0.5">{client.budget}</p>
                          </div>

                          {/* Pipeline Stage Dropdown */}
                          <select
                            value={client.pipelineStatus}
                            onChange={(e) => {
                              e.stopPropagation();
                              handleStageChange(client.id, e.target.value);
                            }}
                            onClick={(e) => e.stopPropagation()}
                            className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-vistara-surface border border-vistara-border text-vistara-primary focus:outline-none focus:border-vistara-accent cursor-pointer"
                          >
                            {PIPELINE_STAGES.map(st => (
                              <option key={st} value={st}>{st}</option>
                            ))}
                          </select>
                        </div>

                        <div className="mt-2 text-[10px] text-vistara-secondary line-clamp-1">
                          {client.targetLocations?.join(', ')} • {client.bhk} BHK
                        </div>

                        {/* Affinity tags */}
                        {client.keyAffinities && client.keyAffinities.length > 0 && (
                          <div className="flex items-center gap-1 mt-2 flex-wrap">
                            {client.keyAffinities.slice(0, 2).map(aff => (
                              <span key={aff} className="px-1.5 py-0.2 rounded bg-vistara-surface border border-vistara-border text-[9px] text-vistara-secondary font-medium">
                                {aff}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Quick Micro-Market Signals */}
            <div className="p-4 bg-vistara-surface border border-vistara-border rounded-xl shadow-card space-y-2.5">
              <h3 className="font-bold text-xs uppercase tracking-wider text-vistara-secondary">
                Chennai Corridor Velocity
              </h3>
              <div className="space-y-2 text-[11px]">
                <div className="p-2 rounded-lg bg-vistara-elevated border border-vistara-border flex items-center justify-between">
                  <div>
                    <div className="font-bold text-vistara-primary">OMR Cyber Corridor</div>
                    <div className="text-[10px] text-vistara-secondary">High tech-executive demand</div>
                  </div>
                  <span className="text-emerald-600 font-bold text-[10px]">+18% MoM</span>
                </div>
                <div className="p-2 rounded-lg bg-vistara-elevated border border-vistara-border flex items-center justify-between">
                  <div>
                    <div className="font-bold text-vistara-primary">Boat Club & Poes Garden</div>
                    <div className="text-[10px] text-vistara-secondary">Ultra-prime scarcity</div>
                  </div>
                  <span className="text-blue-600 font-bold text-[10px]">Prime Stable</span>
                </div>
              </div>
            </div>
          </div>

          {/* ================= COLUMN 2: ACTIVE MATCHING WORKSPACE (Center 5.5 Cols) ================= */}
          <div className="lg:col-span-6 space-y-4">
            
            {/* Selected Client Profile Dossier */}
            {selectedClient ? (
              <div className="p-5 bg-vistara-surface border border-vistara-border rounded-xl shadow-card space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg font-extrabold text-vistara-primary">{selectedClient.name}</h2>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        selectedClient.type === 'Buyer' ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300' : 'bg-blue-500/10 text-blue-700 dark:text-blue-300'
                      }`}>
                        {selectedClient.type}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-vistara-accent/10 text-vistara-accent border border-vistara-accent/20">
                        {selectedClient.pipelineStatus}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-vistara-secondary mt-1">
                      <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {selectedClient.phone}</span>
                      <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {selectedClient.email}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setShowAddNoteModal(true)}
                      icon={FileText}
                    >
                      Add Note
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => {
                        const nextStageIndex = PIPELINE_STAGES.indexOf(selectedClient.pipelineStatus);
                        if (nextStageIndex < PIPELINE_STAGES.length - 1) {
                          handleStageChange(selectedClient.id, PIPELINE_STAGES[nextStageIndex + 1]);
                        }
                      }}
                    >
                      Advance Stage →
                    </Button>
                  </div>
                </div>

                {/* Multi-axis Life Profile Matrix */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2 border-t border-vistara-border/60 text-xs">
                  <div className="p-2.5 rounded-lg bg-vistara-elevated">
                    <span className="text-[10px] uppercase font-bold text-vistara-secondary block">Budget Band</span>
                    <strong className="text-vistara-primary font-mono text-[11px]">{selectedClient.budget}</strong>
                  </div>
                  <div className="p-2.5 rounded-lg bg-vistara-elevated">
                    <span className="text-[10px] uppercase font-bold text-vistara-secondary block">Locations</span>
                    <strong className="text-vistara-primary text-[11px]">{selectedClient.targetLocations?.join(', ')}</strong>
                  </div>
                  <div className="p-2.5 rounded-lg bg-vistara-elevated">
                    <span className="text-[10px] uppercase font-bold text-vistara-secondary block">Space & Commute</span>
                    <strong className="text-vistara-primary text-[11px]">{selectedClient.bhk} BHK • {selectedClient.commute || 'Sub 25 mins'}</strong>
                  </div>
                  <div className="p-2.5 rounded-lg bg-vistara-elevated">
                    <span className="text-[10px] uppercase font-bold text-vistara-secondary block">Home DNA Priority</span>
                    <strong className="text-vistara-primary text-[11px]">{selectedClient.homeDNA || 'High Daylight & Quiet'}</strong>
                  </div>
                </div>

                {/* Notes & Context */}
                {selectedClient.notes && (
                  <div className="p-3 rounded-lg bg-vistara-elevated border border-vistara-border/60 text-xs">
                    <span className="text-[10px] uppercase font-bold text-vistara-accent block mb-1">Dossier Notes</span>
                    <p className="text-vistara-secondary whitespace-pre-line text-[11px] leading-relaxed">
                      {selectedClient.notes}
                    </p>
                  </div>
                )}
              </div>
            ) : null}

            {/* Active Matching Inventory Section */}
            <div className="p-5 bg-vistara-surface border border-vistara-border rounded-xl shadow-card space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-vistara-accent" />
                    <h3 className="font-bold text-sm text-vistara-primary">
                      Matching Properties for {selectedClient?.name || 'Client'}
                    </h3>
                  </div>
                  <p className="text-xs text-vistara-secondary">
                    Algorithmic ranking evaluating budget, commute, daylight index & acoustic stillness
                  </p>
                </div>
                <span className="px-2 py-0.5 rounded bg-vistara-elevated text-xs font-mono font-bold text-vistara-primary">
                  {matchedProperties.length} Candidates
                </span>
              </div>

              {/* Matched Property Cards */}
              <div className="space-y-3.5">
                {matchedProperties.slice(0, 5).map(property => (
                  <div
                    key={property.id}
                    className="p-4 rounded-xl bg-vistara-elevated border border-vistara-border hover:border-vistara-accent/50 transition-all space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                      {/* Property Image */}
                      <div className="relative w-full sm:w-36 h-28 rounded-lg overflow-hidden shrink-0 bg-gray-200">
                        <PropertyImage
                          images={property.images}
                          alt={property.name || property.title}
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 rounded bg-black/75 text-white text-[9px] font-bold">
                          {property.bhk} BHK • {property.location}
                        </span>
                      </div>

                      {/* Details & Fit */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h4 
                              onClick={() => onSelectProperty ? onSelectProperty(property.id) : onNavigate('agent-properties')}
                              className="font-bold text-sm text-vistara-primary hover:text-vistara-accent cursor-pointer line-clamp-1"
                            >
                              {property.name || property.title}
                            </h4>
                            <div className="flex items-center gap-3 text-xs mt-0.5">
                              <span className="font-mono font-bold text-vistara-accent text-sm">{property.price}</span>
                              <span className="text-vistara-secondary">•</span>
                              <span className="text-vistara-secondary">{property.carpetArea} sq.ft</span>
                            </div>
                          </div>

                          {/* Fit Score Badge */}
                          <div className="shrink-0">
                            <FitScoreBadge score={property.fitScore} variant="card" />
                          </div>
                        </div>

                        {/* Match Analysis: Why Match + Concern */}
                        <div className="mt-2.5 space-y-1 text-xs">
                          <div className="flex items-start gap-1.5 text-emerald-700 dark:text-emerald-300">
                            <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                            <span className="text-[11px] leading-tight">
                              <strong>Why Match:</strong> {property.whyMatch}
                            </span>
                          </div>
                          <div className="flex items-start gap-1.5 text-amber-700 dark:text-amber-300">
                            <AlertCircle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                            <span className="text-[11px] leading-tight">
                              <strong>Trade-off:</strong> {property.potentialConcern}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Bar */}
                    <div className="pt-2 border-t border-vistara-border/50 flex flex-wrap items-center justify-between gap-2 text-xs">
                      <div className="text-[10px] text-vistara-secondary flex items-center gap-2">
                        <span className="flex items-center gap-1">
                          <Car className="w-3 h-3" /> {property.commute?.tidelPark || '20 mins'} to tech hub
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => {
                            toggleClientShortlist(selectedClient.id, property.id);
                            showToast(
                              property.isShortlisted 
                                ? `Removed ${property.name || property.title} from shortlist`
                                : `Added ${property.name || property.title} to client shortlist`
                            );
                          }}
                          className={`px-2.5 py-1 rounded text-xs font-semibold flex items-center gap-1 transition-colors ${
                            property.isShortlisted
                              ? 'bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30'
                              : 'bg-vistara-surface border border-vistara-border text-vistara-primary hover:bg-vistara-elevated'
                          }`}
                        >
                          <BookmarkPlus className="w-3.5 h-3.5" />
                          {property.isShortlisted ? 'Shortlisted' : 'Shortlist'}
                        </button>

                        <button
                          onClick={() => {
                            navigator.clipboard?.writeText(window.location.href);
                            showToast(`Curated property link copied to clipboard`);
                          }}
                          className="px-2.5 py-1 rounded bg-vistara-surface border border-vistara-border text-vistara-primary hover:bg-vistara-elevated text-xs font-semibold flex items-center gap-1"
                        >
                          <Share2 className="w-3.5 h-3.5" />
                          Share
                        </button>

                        <Button
                          size="sm"
                          variant="primary"
                          onClick={() => {
                            setScheduleProperty(property);
                            setShowScheduleModal(true);
                          }}
                          icon={Calendar}
                        >
                          Schedule Visit
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* ================= COLUMN 3: TODAY'S ACTIONS & FOLLOW-UPS (Right 3.5 Cols) ================= */}
          <div className="lg:col-span-3 space-y-4">
            
            {/* Quick Follow-up Action Bar */}
            <div className="p-4 bg-vistara-surface border border-vistara-border rounded-xl shadow-card space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-vistara-accent" />
                  <h3 className="font-bold text-sm text-vistara-primary">Follow-up Engine</h3>
                </div>
                <span className="text-[11px] font-bold text-vistara-secondary">
                  {allFollowUps.filter(f => f.status !== 'Completed').length} Pending
                </span>
              </div>

              {/* Status Filter Tabs */}
              <div className="flex items-center gap-1 bg-vistara-elevated p-1 rounded-lg text-xs font-medium">
                {['Due Today', 'Upcoming', 'Completed'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActionTab(tab)}
                    className={`flex-1 py-1 text-center rounded transition-colors text-[11px] ${
                      actionTab === tab 
                        ? 'bg-vistara-surface text-vistara-primary font-bold shadow-sm'
                        : 'text-vistara-secondary hover:text-vistara-primary'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Task Items */}
              <div className="space-y-2">
                {filteredFollowUps.length === 0 ? (
                  <div className="p-6 text-center text-xs text-vistara-secondary">
                    No follow-ups in this category.
                  </div>
                ) : (
                  filteredFollowUps.map(fu => {
                    const isDone = fu.status === 'Completed';
                    return (
                      <div
                        key={fu.id}
                        onClick={() => {
                          if (!isDone) {
                            completeFollowUp(fu.clientId, fu.id);
                            showToast(`Task marked completed for ${fu.clientName}`);
                          }
                        }}
                        className={`p-3 rounded-xl border cursor-pointer transition-all ${
                          isDone 
                            ? 'bg-vistara-elevated/40 border-vistara-border/40 opacity-60' 
                            : 'bg-vistara-elevated border-vistara-border hover:border-vistara-accent/40'
                        }`}
                      >
                        <div className="flex items-start gap-2.5">
                          <input
                            type="checkbox"
                            checked={isDone}
                            onChange={() => {}}
                            className="mt-0.5 rounded text-vistara-accent focus:ring-0 cursor-pointer"
                          />
                          <div className="flex-1 min-w-0">
                            <p className={`text-xs font-medium leading-snug ${isDone ? 'line-through text-vistara-secondary' : 'text-vistara-primary'}`}>
                              {fu.text}
                            </p>
                            <div className="flex items-center justify-between text-[10px] text-vistara-secondary mt-1.5">
                              <span className="font-bold text-vistara-primary">{fu.clientName}</span>
                              <span>{fu.due}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Working Quick Action Buttons */}
              <div className="pt-2 border-t border-vistara-border/50 space-y-1.5">
                <span className="text-[10px] uppercase font-bold text-vistara-secondary block">Quick Action Prompts</span>
                
                <button
                  onClick={() => {
                    if (!selectedClient) return;
                    addClientFollowUp(selectedClient.id, `Phone call check-in with ${selectedClient.name}`, 'Tomorrow, 10:00 AM');
                    showToast(`Logged call reminder for ${selectedClient.name} tomorrow 10 AM`);
                  }}
                  className="w-full p-2 rounded-lg bg-vistara-elevated border border-vistara-border hover:border-vistara-accent/40 text-left text-xs font-medium text-vistara-primary flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <PhoneCall className="w-3.5 h-3.5 text-vistara-accent" />
                    Call {selectedClient?.name?.split(' ')[0] || 'Client'} Tomorrow
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-vistara-secondary" />
                </button>

                <button
                  onClick={() => {
                    if (!selectedClient || !matchedProperties[0]) return;
                    toggleClientShortlist(selectedClient.id, matchedProperties[0].id);
                    addClientFollowUp(selectedClient.id, `Send dossier for ${matchedProperties[0].name || matchedProperties[0].title}`, 'Today, 4:00 PM');
                    showToast(`Added #1 match to shortlist and queued dossier share`);
                  }}
                  className="w-full p-2 rounded-lg bg-vistara-elevated border border-vistara-border hover:border-vistara-accent/40 text-left text-xs font-medium text-vistara-primary flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    Dispatch Top Match Dossier
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-vistara-secondary" />
                </button>

                <button
                  onClick={() => setShowAddNoteModal(true)}
                  className="w-full p-2 rounded-lg bg-vistara-elevated border border-vistara-border hover:border-vistara-accent/40 text-left text-xs font-medium text-vistara-primary flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5 text-blue-500" />
                    Record Consultation Note
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-vistara-secondary" />
                </button>
              </div>
            </div>

            {/* Upcoming Visits Calendar Widget */}
            <div className="p-4 bg-vistara-surface border border-vistara-border rounded-xl shadow-card space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-blue-500" />
                  <h3 className="font-bold text-sm text-vistara-primary">Upcoming Walkthroughs</h3>
                </div>
                <button
                  onClick={() => onNavigate('agent-visits')}
                  className="text-xs text-vistara-accent hover:underline font-semibold"
                >
                  All Visits →
                </button>
              </div>

              <div className="space-y-2">
                {visits.slice(0, 3).map(visit => {
                  const prop = properties.find(p => p.id === visit.propertyId);
                  return (
                    <div
                      key={visit.id}
                      className="p-2.5 rounded-lg bg-vistara-elevated border border-vistara-border text-xs flex items-center justify-between"
                    >
                      <div>
                        <div className="font-bold text-vistara-primary line-clamp-1">{prop?.name || prop?.title || 'Chennai Residence'}</div>
                        <div className="text-[10px] text-vistara-secondary">{visit.date} • {visit.time}</div>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        visit.status === 'Scheduled' ? 'bg-blue-500/10 text-blue-600' : 'bg-emerald-500/10 text-emerald-600'
                      }`}>
                        {visit.status}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* ================= MODAL: ADD CLIENT ================= */}
      {showAddClientModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-vistara-surface border border-vistara-border rounded-2xl w-full max-w-lg p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-vistara-border">
              <div>
                <h3 className="text-base font-extrabold text-vistara-primary">Add New Client to Pipeline</h3>
                <p className="text-xs text-vistara-secondary">Register buyer or renter preferences for automated matching</p>
              </div>
              <button 
                onClick={() => setShowAddClientModal(false)}
                className="p-1.5 rounded-lg hover:bg-vistara-elevated text-vistara-secondary"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateClient} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-vistara-secondary mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={newClientData.name}
                    onChange={(e) => setNewClientData({...newClientData, name: e.target.value})}
                    placeholder="e.g. Senthil Kumar"
                    className="w-full px-3 py-2 bg-vistara-elevated border border-vistara-border rounded-lg text-vistara-primary focus:outline-none focus:border-vistara-accent"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-vistara-secondary mb-1">Client Type</label>
                  <select
                    value={newClientData.type}
                    onChange={(e) => setNewClientData({...newClientData, type: e.target.value})}
                    className="w-full px-3 py-2 bg-vistara-elevated border border-vistara-border rounded-lg text-vistara-primary focus:outline-none focus:border-vistara-accent"
                  >
                    <option value="Buyer">Buyer</option>
                    <option value="Renter">Renter</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-vistara-secondary mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={newClientData.phone}
                    onChange={(e) => setNewClientData({...newClientData, phone: e.target.value})}
                    placeholder="+91 98400 12345"
                    className="w-full px-3 py-2 bg-vistara-elevated border border-vistara-border rounded-lg text-vistara-primary focus:outline-none focus:border-vistara-accent"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-vistara-secondary mb-1">Email</label>
                  <input
                    type="email"
                    value={newClientData.email}
                    onChange={(e) => setNewClientData({...newClientData, email: e.target.value})}
                    placeholder="client@company.com"
                    className="w-full px-3 py-2 bg-vistara-elevated border border-vistara-border rounded-lg text-vistara-primary focus:outline-none focus:border-vistara-accent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-vistara-secondary mb-1">Budget</label>
                  <input
                    type="text"
                    value={newClientData.budget}
                    onChange={(e) => setNewClientData({...newClientData, budget: e.target.value})}
                    placeholder="₹2.5 - 3.5 Cr"
                    className="w-full px-3 py-2 bg-vistara-elevated border border-vistara-border rounded-lg text-vistara-primary focus:outline-none focus:border-vistara-accent"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-vistara-secondary mb-1">Target BHK</label>
                  <select
                    value={newClientData.bhk}
                    onChange={(e) => setNewClientData({...newClientData, bhk: e.target.value})}
                    className="w-full px-3 py-2 bg-vistara-elevated border border-vistara-border rounded-lg text-vistara-primary focus:outline-none focus:border-vistara-accent"
                  >
                    <option value="2">2 BHK</option>
                    <option value="3">3 BHK</option>
                    <option value="4">4 BHK</option>
                    <option value="5">5+ BHK</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-vistara-secondary mb-1">Pipeline Stage</label>
                  <select
                    value={newClientData.pipelineStatus}
                    onChange={(e) => setNewClientData({...newClientData, pipelineStatus: e.target.value})}
                    className="w-full px-3 py-2 bg-vistara-elevated border border-vistara-border rounded-lg text-vistara-primary focus:outline-none focus:border-vistara-accent"
                  >
                    {PIPELINE_STAGES.map(st => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-vistara-secondary mb-1">Target Locations (Comma separated)</label>
                <input
                  type="text"
                  value={newClientData.targetLocations}
                  onChange={(e) => setNewClientData({...newClientData, targetLocations: e.target.value})}
                  placeholder="e.g. Adyar, Besant Nagar, Kotturpuram"
                  className="w-full px-3 py-2 bg-vistara-elevated border border-vistara-border rounded-lg text-vistara-primary focus:outline-none focus:border-vistara-accent"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-vistara-secondary mb-1">Initial Consultation Notes</label>
                <textarea
                  rows="3"
                  value={newClientData.notes}
                  onChange={(e) => setNewClientData({...newClientData, notes: e.target.value})}
                  placeholder="Specific requirements, school proximities, balcony sunlight orientation..."
                  className="w-full px-3 py-2 bg-vistara-elevated border border-vistara-border rounded-lg text-vistara-primary focus:outline-none focus:border-vistara-accent resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-vistara-border">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setShowAddClientModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  icon={UserPlus}
                >
                  Create Client
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: SCHEDULE VISIT ================= */}
      {showScheduleModal && scheduleProperty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-vistara-surface border border-vistara-border rounded-2xl w-full max-w-md p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-vistara-border">
              <div>
                <h3 className="text-base font-extrabold text-vistara-primary">Schedule Client Walkthrough</h3>
                <p className="text-xs text-vistara-secondary">Private viewing with {selectedClient?.name}</p>
              </div>
              <button 
                onClick={() => setShowScheduleModal(false)}
                className="p-1.5 rounded-lg hover:bg-vistara-elevated text-vistara-secondary"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3 rounded-lg bg-vistara-elevated border border-vistara-border text-xs space-y-1">
              <strong className="text-vistara-primary block">{scheduleProperty.name || scheduleProperty.title}</strong>
              <p className="text-vistara-secondary">{scheduleProperty.location} • {scheduleProperty.bhk} BHK • {scheduleProperty.price}</p>
            </div>

            <form onSubmit={handleConfirmSchedule} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-vistara-secondary mb-1">Date</label>
                  <input
                    type="date"
                    required
                    value={scheduleDate}
                    onChange={(e) => setScheduleDate(e.target.value)}
                    className="w-full px-3 py-2 bg-vistara-elevated border border-vistara-border rounded-lg text-vistara-primary focus:outline-none focus:border-vistara-accent"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-vistara-secondary mb-1">Preferred Time</label>
                  <select
                    value={scheduleTime}
                    onChange={(e) => setScheduleTime(e.target.value)}
                    className="w-full px-3 py-2 bg-vistara-elevated border border-vistara-border rounded-lg text-vistara-primary focus:outline-none focus:border-vistara-accent"
                  >
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="11:30 AM">11:30 AM</option>
                    <option value="02:00 PM">02:00 PM</option>
                    <option value="04:30 PM">04:30 PM</option>
                    <option value="06:00 PM">06:00 PM</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-vistara-secondary mb-1">Special Client Instructions</label>
                <textarea
                  rows="2"
                  value={scheduleNotes}
                  onChange={(e) => setScheduleNotes(e.target.value)}
                  placeholder="Need key concierge, acoustic meter test on balcony..."
                  className="w-full px-3 py-2 bg-vistara-elevated border border-vistara-border rounded-lg text-vistara-primary focus:outline-none focus:border-vistara-accent resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-vistara-border">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setShowScheduleModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  icon={Calendar}
                >
                  Confirm Walkthrough
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: ADD NOTE ================= */}
      {showAddNoteModal && selectedClient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-vistara-surface border border-vistara-border rounded-2xl w-full max-w-md p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-vistara-border">
              <div>
                <h3 className="text-base font-extrabold text-vistara-primary">Add Consultation Note</h3>
                <p className="text-xs text-vistara-secondary">Appending to {selectedClient.name}'s dossier</p>
              </div>
              <button 
                onClick={() => setShowAddNoteModal(false)}
                className="p-1.5 rounded-lg hover:bg-vistara-elevated text-vistara-secondary"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveNote} className="space-y-3 text-xs">
              <div>
                <textarea
                  rows="4"
                  required
                  value={clientNoteText}
                  onChange={(e) => setClientNoteText(e.target.value)}
                  placeholder="Enter detailed feedback from today's discussion or property review..."
                  className="w-full px-3 py-2 bg-vistara-elevated border border-vistara-border rounded-lg text-vistara-primary focus:outline-none focus:border-vistara-accent resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-vistara-border">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setShowAddNoteModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  icon={FileText}
                >
                  Save to Dossier
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
