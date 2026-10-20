import React, { useState } from 'react';
import { 
  Users, 
  UserPlus, 
  Sparkles, 
  Phone, 
  Mail, 
  MapPin, 
  DollarSign, 
  Calendar, 
  FileText, 
  CheckCircle2, 
  Clock, 
  Plus, 
  Search,
  Filter,
  ArrowRight,
  Shield,
  Trash2,
  Edit3
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import { HomeDNARadar } from '../../components/common/HomeDNARadar';
import { useApp } from '../../context/AppContext';

export function AgentClientsPage({ onNavigate }) {
  const { agentClients, setAgentClients, deleteAgentClient, updateClient } = useApp();

  const [selectedClientId, setSelectedClientId] = useState(agentClients[0]?.id || 'cl-1');
  const [filterType, setFilterType] = useState('all'); // 'all' | 'Buyer' | 'Renter' | 'Seller'
  const [searchQuery, setSearchQuery] = useState('');
  
  // Add Client Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [newClient, setNewClient] = useState({
    name: '',
    phone: '',
    email: '',
    type: 'Buyer',
    budget: '',
    targetLocations: '',
    bhk: '3 BHK',
    propertyType: 'Luxury Apartment',
    lifestyle: 'Quiet Living, Natural Light',
    commute: 'Under 30 mins to Tidel Park',
    homeDNA: 'High daylight & acoustics',
    futureFit: 'Adaptable workspace',
    notes: '',
    affinities: ['Quiet Living', 'Natural Light']
  });

  // Client Note State
  const [newNote, setNewNote] = useState('');
  const [clientNotes, setClientNotes] = useState({
    'cl-1': [
      { id: 'n1', text: 'Prefers north-east facing balconies for morning sun. Highly sensitive to traffic hum.', date: 'Sep 22, 2026' },
      { id: 'n2', text: 'Bank loan pre-approved for ₹5 Cr from HDFC.', date: 'Sep 19, 2026' }
    ],
    'cl-2': [
      { id: 'n3', text: 'Both work in Silicon Horizon tech park, need dual workstation setups.', date: 'Sep 21, 2026' }
    ],
    'cl-3': [
      { id: 'n4', text: 'Wants to be within walking distance of Elliot’s Beach for daily evening runs.', date: 'Sep 23, 2026' }
    ]
  });

  const selectedClient = agentClients.find(c => c.id === selectedClientId) || agentClients[0];

  const filteredClients = agentClients.filter(client => {
    const matchesType = filterType === 'all' || client.type === filterType;
    const clientLocs = client.targetLocations || [];
    const matchesSearch = client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          clientLocs.some(l => l.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesType && matchesSearch;
  });

  const handleAddClient = (e) => {
    e.preventDefault();
    if (!newClient.name.trim()) return;

    const created = {
      id: `cl-${Date.now()}`,
      name: newClient.name,
      phone: newClient.phone || '+91 98000 00000',
      email: newClient.email || 'client@example.com',
      type: newClient.type,
      budget: newClient.budget || '₹2.0 - 3.5 Cr',
      targetLocations: newClient.targetLocations ? newClient.targetLocations.split(',').map(s => s.trim()) : ['Adyar', 'OMR'],
      bhk: newClient.bhk || '3 BHK',
      propertyType: newClient.propertyType || 'Luxury Apartment',
      lifestyle: newClient.lifestyle,
      commute: newClient.commute,
      homeDNA: newClient.homeDNA,
      futureFit: newClient.futureFit,
      keyAffinities: newClient.affinities || ['Quiet Living', 'Natural Light'],
      pipelineStatus: 'New',
      assignedProperties: [],
      lastContact: 'Just now'
    };

    setAgentClients(prev => [created, ...prev]);
    if (newClient.notes.trim()) {
      setClientNotes(prev => ({
        ...prev,
        [created.id]: [{ id: `n-${Date.now()}`, text: newClient.notes.trim(), date: 'Just now' }]
      }));
    }

    setSelectedClientId(created.id);
    setShowAddModal(false);
    setNewClient({
      name: '',
      phone: '',
      email: '',
      type: 'Buyer',
      budget: '',
      targetLocations: '',
      bhk: '3 BHK',
      propertyType: 'Luxury Apartment',
      lifestyle: 'Quiet Living, Natural Light',
      commute: 'Under 30 mins to Tidel Park',
      homeDNA: 'High daylight & acoustics',
      futureFit: 'Adaptable workspace',
      notes: '',
      affinities: ['Quiet Living', 'Natural Light']
    });
  };

  const handleAddNote = () => {
    if (!newNote.trim() || !selectedClient) return;
    const noteObj = {
      id: `n-${Date.now()}`,
      text: newNote.trim(),
      date: 'Just now'
    };

    setClientNotes(prev => ({
      ...prev,
      [selectedClient.id]: [noteObj, ...(prev[selectedClient.id] || [])]
    }));
    setNewNote('');
  };

  // Convert client affinities to synthetic DNA radar for visualization
  const clientDNA = {
    naturalLight: selectedClient?.keyAffinities?.includes('Natural Light') ? 92 : 75,
    acousticComfort: selectedClient?.keyAffinities?.includes('Quiet Living') ? 95 : 70,
    spatialEfficiency: 82,
    crossVentilation: 88,
    workSuitability: selectedClient?.keyAffinities?.includes('Work Friendly') ? 96 : 72,
    futureFlexibility: 80
  };

  return (
    <div className="min-h-screen bg-vistara-bg pb-24 text-vistara-primary">
      
      {/* Top Header */}
      <div className="bg-vistara-surface border-b border-vistara-border px-4 sm:px-6 py-6">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Users className="w-4 h-4 text-vistara-accent" />
              <span className="text-xs uppercase font-bold tracking-wider text-vistara-accent">
                CLIENT RELATIONSHIP MANAGEMENT
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-vistara-primary tracking-tight">
              Client Dossiers & Preferences
            </h1>
            <p className="text-xs text-vistara-secondary mt-1">
              Maintain institutional memory of buyer living requirements, acoustic tolerances, and financial bandwidth.
            </p>
          </div>

          <Button
            size="sm"
            variant="primary"
            onClick={() => setShowAddModal(true)}
            icon={UserPlus}
          >
            + Register New Client
          </Button>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 pt-6">
        
        {/* Main 2-Column Interface: Client Master List (Left) & Client Detail Dossier (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Client List (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Search and Filters */}
            <div className="p-4 bg-vistara-surface border border-vistara-border rounded-xl shadow-card space-y-3">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-vistara-secondary" />
                <input
                  type="text"
                  placeholder="Search client by name or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-vistara-elevated border border-vistara-border rounded-md text-xs text-vistara-primary focus:outline-none focus:border-vistara-accent"
                />
              </div>

              <div className="flex items-center gap-1.5 pt-1">
                {['all', 'Buyer', 'Renter'].map(type => (
                  <button
                    key={type}
                    onClick={() => setFilterType(type)}
                    className={`px-3 py-1 rounded text-xs font-semibold capitalize transition-colors ${
                      filterType === type
                        ? 'bg-vistara-primary text-vistara-surface'
                        : 'bg-vistara-elevated text-vistara-secondary hover:text-vistara-primary'
                    }`}
                  >
                    {type === 'all' ? 'All Clients' : `${type}s`}
                  </button>
                ))}
              </div>
            </div>

            {/* List of Clients */}
            <div className="space-y-2.5">
              {filteredClients.map(client => {
                const isSelected = selectedClientId === client.id;
                return (
                  <div
                    key={client.id}
                    onClick={() => setSelectedClientId(client.id)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-vistara-elevated border-vistara-accent shadow-card'
                        : 'bg-vistara-surface border-vistara-border hover:border-vistara-border/80'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-sm text-vistara-primary">{client.name}</h4>
                          <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                            client.type === 'Buyer' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-blue-500/10 text-blue-600'
                          }`}>
                            {client.type}
                          </span>
                        </div>
                        <p className="text-xs text-vistara-secondary mt-0.5 font-medium">
                          {client.budget} • {client.targetLocations.join(', ')}
                        </p>
                      </div>

                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-vistara-surface border border-vistara-border text-vistara-secondary">
                        {client.pipelineStatus}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 mt-3">
                      {client.keyAffinities.map(aff => (
                        <span key={aff} className="px-2 py-0.5 rounded bg-vistara-surface/80 border border-vistara-border text-[10px] text-vistara-secondary">
                          {aff}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

          {/* Right Column: Active Client Dossier (7 cols) */}
          <div className="lg:col-span-7">
            {selectedClient ? (
              <div className="space-y-6">
                
                {/* Client Header Card */}
                <div className="p-6 bg-vistara-surface border border-vistara-border rounded-xl shadow-card">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-vistara-border">
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-xl font-extrabold text-vistara-primary">{selectedClient.name}</h2>
                        <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                          selectedClient.type === 'Buyer' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-blue-500/10 text-blue-600'
                        }`}>
                          {selectedClient.type} Client
                        </span>
                      </div>
                      <div className="flex items-center gap-4 mt-2 text-xs text-vistara-secondary">
                        <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" /> {selectedClient.phone}</span>
                        <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" /> {selectedClient.email}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          if (window.confirm(`Delete client dossier for ${selectedClient.name}?`)) {
                            deleteAgentClient(selectedClient.id);
                            const remaining = agentClients.filter(c => c.id !== selectedClient.id);
                            if (remaining.length > 0) setSelectedClientId(remaining[0].id);
                          }
                        }}
                        className="p-2 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-transparent hover:border-rose-200 transition-colors"
                        title="Delete Client"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <Button
                        size="sm"
                        variant="primary"
                        onClick={() => onNavigate('agent-matches')}
                        icon={Sparkles}
                      >
                        Run Matching Engine
                      </Button>
                    </div>
                  </div>

                  {/* Criteria Strip */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 text-xs">
                    <div className="p-3 rounded-lg bg-vistara-elevated border border-vistara-border">
                      <span className="text-vistara-secondary text-[10px] uppercase font-bold">Approved Budget</span>
                      <div className="font-extrabold text-sm text-vistara-primary mt-0.5">{selectedClient.budget}</div>
                    </div>

                    <div className="p-3 rounded-lg bg-vistara-elevated border border-vistara-border">
                      <span className="text-vistara-secondary text-[10px] uppercase font-bold">Target Corridors</span>
                      <div className="font-extrabold text-sm text-vistara-primary mt-0.5">{selectedClient.targetLocations.join(', ')}</div>
                    </div>

                    <div className="p-3 rounded-lg bg-vistara-elevated border border-vistara-border">
                      <span className="text-vistara-secondary text-[10px] uppercase font-bold">Pipeline Stage</span>
                      <div className="font-extrabold text-sm text-vistara-accent mt-0.5">{selectedClient.pipelineStatus}</div>
                    </div>
                  </div>
                </div>

                {/* Spatial Home DNA & Priorities */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-5 bg-vistara-surface border border-vistara-border rounded-xl shadow-card flex flex-col items-center">
                    <h3 className="font-bold text-xs text-vistara-primary mb-1 self-start">Client's Desired Home DNA</h3>
                    <p className="text-[11px] text-vistara-secondary mb-3 self-start">Calculated from client's stated lifestyle priorities</p>
                    <HomeDNARadar dna={clientDNA} size={200} showLabels={true} />
                  </div>

                  <div className="p-5 bg-vistara-surface border border-vistara-border rounded-xl shadow-card">
                    <h3 className="font-bold text-xs text-vistara-primary mb-2">Institutional Verification & KYC</h3>
                    
                    <div className="space-y-2 text-xs">
                      <div className="p-2.5 rounded bg-vistara-elevated border border-vistara-border flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>Government ID & PAN Verified</span>
                        </div>
                        <span className="text-[10px] text-emerald-600 font-bold">Verified</span>
                      </div>

                      <div className="p-2.5 rounded bg-vistara-elevated border border-vistara-border flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>Bank Pre-Sanction Letter (₹5 Cr)</span>
                        </div>
                        <span className="text-[10px] text-emerald-600 font-bold">Attached</span>
                      </div>

                      <div className="p-2.5 rounded bg-vistara-elevated border border-vistara-border flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>Broker Exclusive Mandate</span>
                        </div>
                        <span className="text-[10px] text-emerald-600 font-bold">Active</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-vistara-border/60">
                      <span className="text-[11px] font-bold text-vistara-secondary block mb-1">Key Living Affinities:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedClient.keyAffinities.map(aff => (
                          <span key={aff} className="px-2 py-0.5 rounded bg-vistara-elevated border border-vistara-border text-xs text-vistara-primary font-medium">
                            ✓ {aff}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Confidential Broker Notes */}
                <div className="p-6 bg-vistara-surface border border-vistara-border rounded-xl shadow-card space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-sm text-vistara-primary">Confidential Agent Notes</h3>
                      <p className="text-xs text-vistara-secondary">Private observations regarding negotiation flexibility & family decision makers</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Add an observational note..."
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleAddNote()}
                      className="flex-1 px-3 py-2 bg-vistara-elevated border border-vistara-border rounded-md text-xs text-vistara-primary focus:outline-none focus:border-vistara-accent"
                    />
                    <Button size="sm" variant="primary" onClick={handleAddNote}>
                      Add Note
                    </Button>
                  </div>

                  <div className="space-y-2 pt-2">
                    {(clientNotes[selectedClient.id] || []).map(note => (
                      <div key={note.id} className="p-3 rounded-lg bg-vistara-elevated border border-vistara-border text-xs">
                        <p className="text-vistara-primary">{note.text}</p>
                        <span className="text-[10px] text-vistara-secondary mt-1 block">{note.date}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            ) : (
              <div className="p-12 text-center bg-vistara-surface border border-vistara-border rounded-xl">
                <p className="text-vistara-secondary text-sm">Select a client from the list or register a new one.</p>
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Add Client Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-none flex items-center justify-center p-4">
          <div className="bg-vistara-surface border border-vistara-border rounded-xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-vistara-border">
              <h3 className="font-bold text-base text-vistara-primary">Register New Client Mandate</h3>
              <button onClick={() => setShowAddModal(false)} className="text-vistara-secondary hover:text-vistara-primary text-sm font-bold">✕</button>
            </div>

            <form onSubmit={handleAddClient} className="space-y-3 text-xs">
              <div>
                <label className="block font-medium text-vistara-secondary mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vikramaditya Reddy"
                  value={newClient.name}
                  onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                  className="w-full px-3 py-2 bg-vistara-elevated border border-vistara-border rounded-md text-vistara-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-medium text-vistara-secondary mb-1">Phone Number</label>
                  <input
                    type="text"
                    placeholder="+91 98400..."
                    value={newClient.phone}
                    onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
                    className="w-full px-3 py-2 bg-vistara-elevated border border-vistara-border rounded-md text-vistara-primary"
                  />
                </div>
                <div>
                  <label className="block font-medium text-vistara-secondary mb-1">Client Role</label>
                  <select
                    value={newClient.type}
                    onChange={(e) => setNewClient({ ...newClient, type: e.target.value })}
                    className="w-full px-3 py-2 bg-vistara-elevated border border-vistara-border rounded-md text-vistara-primary font-bold"
                  >
                    <option value="Buyer">Buyer</option>
                    <option value="Renter">Renter</option>
                    <option value="Seller">Seller Client</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-medium text-vistara-secondary mb-1">Email</label>
                  <input
                    type="email"
                    placeholder="client@company.com"
                    value={newClient.email}
                    onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                    className="w-full px-3 py-2 bg-vistara-elevated border border-vistara-border rounded-md text-vistara-primary"
                  />
                </div>
                <div>
                  <label className="block font-medium text-vistara-secondary mb-1">Budget Target</label>
                  <input
                    type="text"
                    placeholder="e.g. ₹3.0 - 4.5 Cr"
                    value={newClient.budget}
                    onChange={(e) => setNewClient({ ...newClient, budget: e.target.value })}
                    className="w-full px-3 py-2 bg-vistara-elevated border border-vistara-border rounded-md text-vistara-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-medium text-vistara-secondary mb-1">BHK Requirement</label>
                  <select
                    value={newClient.bhk}
                    onChange={(e) => setNewClient({ ...newClient, bhk: e.target.value })}
                    className="w-full px-3 py-2 bg-vistara-elevated border border-vistara-border rounded-md text-vistara-primary"
                  >
                    <option>2 BHK</option>
                    <option>3 BHK</option>
                    <option>4 BHK</option>
                    <option>5+ BHK / Penthouse</option>
                  </select>
                </div>
                <div>
                  <label className="block font-medium text-vistara-secondary mb-1">Property Type</label>
                  <select
                    value={newClient.propertyType}
                    onChange={(e) => setNewClient({ ...newClient, propertyType: e.target.value })}
                    className="w-full px-3 py-2 bg-vistara-elevated border border-vistara-border rounded-md text-vistara-primary"
                  >
                    <option>Luxury Apartment</option>
                    <option>Independent Villa</option>
                    <option>Coastal Residence</option>
                    <option>Sky Penthouse</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-medium text-vistara-secondary mb-1">Target Locations (Comma-separated)</label>
                <input
                  type="text"
                  placeholder="e.g. Adyar, Boat Club, Kotturpuram, ECR"
                  value={newClient.targetLocations}
                  onChange={(e) => setNewClient({ ...newClient, targetLocations: e.target.value })}
                  className="w-full px-3 py-2 bg-vistara-elevated border border-vistara-border rounded-md text-vistara-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-medium text-vistara-secondary mb-1">Lifestyle Preference</label>
                  <input
                    type="text"
                    placeholder="e.g. High daylight, acoustic stillness"
                    value={newClient.lifestyle}
                    onChange={(e) => setNewClient({ ...newClient, lifestyle: e.target.value })}
                    className="w-full px-3 py-2 bg-vistara-elevated border border-vistara-border rounded-md text-vistara-primary"
                  />
                </div>
                <div>
                  <label className="block font-medium text-vistara-secondary mb-1">Commute Corridor</label>
                  <input
                    type="text"
                    placeholder="e.g. Under 25 mins to Tidel Park"
                    value={newClient.commute}
                    onChange={(e) => setNewClient({ ...newClient, commute: e.target.value })}
                    className="w-full px-3 py-2 bg-vistara-elevated border border-vistara-border rounded-md text-vistara-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-medium text-vistara-secondary mb-1">Home DNA Benchmark</label>
                  <input
                    type="text"
                    placeholder="e.g. Quiet &gt; 85, Light &gt; 90"
                    value={newClient.homeDNA}
                    onChange={(e) => setNewClient({ ...newClient, homeDNA: e.target.value })}
                    className="w-full px-3 py-2 bg-vistara-elevated border border-vistara-border rounded-md text-vistara-primary"
                  />
                </div>
                <div>
                  <label className="block font-medium text-vistara-secondary mb-1">Future Fit Scenario</label>
                  <input
                    type="text"
                    placeholder="e.g. Dedicated work studio, multigenerational"
                    value={newClient.futureFit}
                    onChange={(e) => setNewClient({ ...newClient, futureFit: e.target.value })}
                    className="w-full px-3 py-2 bg-vistara-elevated border border-vistara-border rounded-md text-vistara-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-vistara-secondary mb-1">Confidential Broker Memo / Notes</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Pre-approved loan from HDFC, seeking off-market pocket listings..."
                  value={newClient.notes}
                  onChange={(e) => setNewClient({ ...newClient, notes: e.target.value })}
                  className="w-full px-3 py-2 bg-vistara-elevated border border-vistara-border rounded-md text-vistara-primary resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-vistara-border">
                <Button size="sm" variant="ghost" type="button" onClick={() => setShowAddModal(false)}>
                  Cancel
                </Button>
                <Button size="sm" variant="primary" type="submit">
                  Save Client
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
