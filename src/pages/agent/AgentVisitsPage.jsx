import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  Users, 
  Building, 
  CheckCircle2, 
  Plus, 
  ArrowRight,
  Filter,
  Check,
  CalendarCheck
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import { useApp } from '../../context/AppContext';

export function AgentVisitsPage({ onNavigate, onSelectProperty }) {
  const { visits, scheduleVisit, properties, agentClients } = useApp();

  const [filterStatus, setFilterStatus] = useState('all');
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [selectedPropertyId, setSelectedPropertyId] = useState(properties[0]?.id || '');
  const [selectedClientId, setSelectedClientId] = useState(agentClients[0]?.id || '');
  const [visitDate, setVisitDate] = useState('2026-10-02');
  const [visitTime, setVisitTime] = useState('04:30 PM (Golden Hour)');
  const [visitNotes, setVisitNotes] = useState('Reviewing acoustic insulation and balcony ocean view.');

  // Additional agent tour appointments
  const [agentAppointments, setAgentAppointments] = useState([
    {
      id: 'apt-1',
      clientName: 'Dr. Arvind Swaminathan',
      propertyId: 'vis-che-07',
      propertyTitle: 'The Poes Enclave',
      location: 'Poes Garden, Chennai',
      date: '2026-09-28',
      time: '11:00 AM',
      status: 'Confirmed',
      notes: 'Inspecting study acoustic isolation and car parking ingress.'
    },
    {
      id: 'apt-2',
      clientName: 'Priyanka & Rajiv Menon',
      propertyId: 'vis-che-02',
      propertyTitle: 'The Sunlit Atrium',
      location: 'OMR - Thoraipakkam, Chennai',
      date: '2026-09-29',
      time: '04:30 PM',
      status: 'Confirmed',
      notes: 'Golden Hour walkthrough to test terrace natural light.'
    },
    {
      id: 'apt-3',
      clientName: 'Sundar Varadarajan',
      propertyId: 'vis-che-03',
      propertyTitle: 'Besant Nagar Coastal Loft',
      location: 'Besant Nagar, Chennai',
      date: '2026-09-22',
      time: '05:00 PM',
      status: 'Completed',
      notes: 'Walked to Elliot’s Beach. Client offered ₹1.4L/mo.'
    }
  ]);

  const handleCreateAppointment = (e) => {
    e.preventDefault();
    const prop = properties.find(p => p.id === selectedPropertyId) || properties[0];
    const client = agentClients.find(c => c.id === selectedClientId) || agentClients[0];

    const newApt = {
      id: `apt-${Date.now()}`,
      clientName: client?.name || 'Client',
      propertyId: prop.id,
      propertyTitle: prop.title,
      location: prop.location,
      date: visitDate,
      time: visitTime,
      status: 'Confirmed',
      notes: visitNotes
    };

    setAgentAppointments(prev => [newApt, ...prev]);
    setShowScheduleModal(false);
  };

  const filteredAppointments = agentAppointments.filter(apt => {
    if (filterStatus === 'all') return true;
    return apt.status.toLowerCase() === filterStatus.toLowerCase();
  });

  return (
    <div className="min-h-screen bg-vistara-bg pb-24 text-vistara-primary">
      
      {/* Top Header */}
      <div className="bg-vistara-surface border-b border-vistara-border px-4 sm:px-6 py-6">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <CalendarIcon className="w-4 h-4 text-vistara-accent" />
              <span className="text-xs uppercase font-bold tracking-wider text-vistara-accent">
                TOUR LOGISTICS & SHOWINGS
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-vistara-primary tracking-tight">
              Agent Walkthrough Calendar
            </h1>
            <p className="text-xs text-vistara-secondary mt-1">
              Coordinate private property tours, acoustic audits, and golden hour daylight inspections with clients.
            </p>
          </div>

          <Button
            size="sm"
            variant="primary"
            onClick={() => setShowScheduleModal(true)}
            icon={Plus}
          >
            + Schedule Client Walkthrough
          </Button>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 pt-6 space-y-6">
        
        {/* KPI Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-vistara-surface border border-vistara-border rounded-xl shadow-card">
            <span className="text-xs text-vistara-secondary">Upcoming Showings</span>
            <div className="text-2xl font-extrabold text-vistara-primary mt-0.5">
              {agentAppointments.filter(a => a.status === 'Confirmed').length}
            </div>
            <span className="text-[11px] text-emerald-600 font-medium">All confirmed with landlords</span>
          </div>

          <div className="p-4 bg-vistara-surface border border-vistara-border rounded-xl shadow-card">
            <span className="text-xs text-vistara-secondary">Completed Showings</span>
            <div className="text-2xl font-extrabold text-vistara-primary mt-0.5">
              {agentAppointments.filter(a => a.status === 'Completed').length + 8}
            </div>
            <span className="text-[11px] text-vistara-secondary font-medium">This month</span>
          </div>

          <div className="p-4 bg-vistara-surface border border-vistara-border rounded-xl shadow-card">
            <span className="text-xs text-vistara-secondary">Show-to-Offer Conversion</span>
            <div className="text-2xl font-extrabold text-vistara-primary mt-0.5">42.8%</div>
            <span className="text-[11px] text-emerald-600 font-medium">+15% above Chennai average</span>
          </div>
        </div>

        {/* Appointments List */}
        <div className="p-6 bg-vistara-surface border border-vistara-border rounded-xl shadow-card space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-vistara-border">
            <h2 className="text-base font-bold text-vistara-primary">Scheduled Property Showings</h2>
            
            <div className="flex items-center gap-1.5 text-xs">
              {['all', 'Confirmed', 'Completed'].map(status => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-3 py-1 rounded text-xs font-semibold capitalize transition-colors ${
                    filterStatus === status
                      ? 'bg-vistara-primary text-vistara-surface'
                      : 'bg-vistara-elevated text-vistara-secondary hover:text-vistara-primary'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {filteredAppointments.map(apt => (
              <div
                key={apt.id}
                className="p-4 rounded-xl bg-vistara-elevated border border-vistara-border flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-vistara-primary">{apt.clientName}</span>
                    <span className="text-xs text-vistara-secondary">•</span>
                    <span className="text-xs font-semibold text-vistara-primary">{apt.propertyTitle}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      apt.status === 'Confirmed' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-blue-500/10 text-blue-600'
                    }`}>
                      {apt.status}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-vistara-secondary">
                    <span className="flex items-center gap-1"><CalendarIcon className="w-3.5 h-3.5" /> {apt.date}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {apt.time}</span>
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {apt.location}</span>
                  </div>

                  <p className="text-xs text-vistara-primary mt-2 font-medium">
                    Note: "{apt.notes}"
                  </p>
                </div>

                <div className="flex items-center gap-2 self-end md:self-center">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => onSelectProperty ? onSelectProperty(apt.propertyId) : null}
                  >
                    View Property
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Schedule Walkthrough Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-none flex items-center justify-center p-4">
          <div className="bg-vistara-surface border border-vistara-border rounded-xl shadow-2xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-vistara-primary">Schedule Client Tour</h3>
              <button onClick={() => setShowScheduleModal(false)} className="text-vistara-secondary hover:text-vistara-primary text-sm font-bold">✕</button>
            </div>

            <form onSubmit={handleCreateAppointment} className="space-y-3 text-xs">
              <div>
                <label className="block font-medium text-vistara-secondary mb-1">Select Client</label>
                <select
                  value={selectedClientId}
                  onChange={(e) => setSelectedClientId(e.target.value)}
                  className="w-full px-3 py-2 bg-vistara-elevated border border-vistara-border rounded-md text-vistara-primary"
                >
                  {agentClients.map(c => (
                    <option key={c.id} value={c.id}>{c.name} ({c.type})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-medium text-vistara-secondary mb-1">Select Property</label>
                <select
                  value={selectedPropertyId}
                  onChange={(e) => setSelectedPropertyId(e.target.value)}
                  className="w-full px-3 py-2 bg-vistara-elevated border border-vistara-border rounded-md text-vistara-primary"
                >
                  {properties.map(p => (
                    <option key={p.id} value={p.id}>{p.title} ({p.microMarket} • {p.priceDisplay})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-medium text-vistara-secondary mb-1">Date</label>
                  <input
                    type="date"
                    value={visitDate}
                    onChange={(e) => setVisitDate(e.target.value)}
                    className="w-full px-3 py-2 bg-vistara-elevated border border-vistara-border rounded-md text-vistara-primary"
                  />
                </div>
                <div>
                  <label className="block font-medium text-vistara-secondary mb-1">Time Slot</label>
                  <select
                    value={visitTime}
                    onChange={(e) => setVisitTime(e.target.value)}
                    className="w-full px-3 py-2 bg-vistara-elevated border border-vistara-border rounded-md text-vistara-primary"
                  >
                    <option value="10:00 AM (Morning Sun)">10:00 AM (Morning Sun)</option>
                    <option value="11:30 AM (Mid-day Light)">11:30 AM (Mid-day Light)</option>
                    <option value="02:30 PM (Acoustics Check)">02:30 PM (Acoustics Check)</option>
                    <option value="04:30 PM (Golden Hour)">04:30 PM (Golden Hour)</option>
                    <option value="06:00 PM (Evening Ambient)">06:00 PM (Evening Ambient)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-medium text-vistara-secondary mb-1">Tour Focus / Notes</label>
                <textarea
                  rows="2"
                  value={visitNotes}
                  onChange={(e) => setVisitNotes(e.target.value)}
                  className="w-full px-3 py-2 bg-vistara-elevated border border-vistara-border rounded-md text-vistara-primary"
                  placeholder="e.g. Inspect noise levels from ECR road and check master bedroom sunlight."
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <Button size="sm" variant="ghost" type="button" onClick={() => setShowScheduleModal(false)}>
                  Cancel
                </Button>
                <Button size="sm" variant="primary" type="submit">
                  Confirm Tour
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
