import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Check, User, Phone, ArrowRight, X, Plus } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { PropertyImage } from '../../components/common/PropertyImage';
import { useApp } from '../../context/AppContext';

export function SellerVisitsPage({ onSelectProperty, onNavigate }) {
  const { properties, visits, rescheduleVisit, cancelVisit, submitVisitFeedback, scheduleVisit } = useApp();

  const [activeRescheduleId, setActiveRescheduleId] = useState(null);
  const [newDate, setNewDate] = useState('2026-10-02');
  const [newTime, setNewTime] = useState('03:00 PM');

  const [showNewVisitModal, setShowNewVisitModal] = useState(false);
  const [newVisitPropId, setNewVisitPropId] = useState(properties[0]?.id || 'vis-che-01');
  const [newVisitDate, setNewVisitDate] = useState('2026-10-05');
  const [newVisitTime, setNewVisitTime] = useState('11:00 AM');
  const [newVisitNotes, setNewVisitNotes] = useState('Private architecture showing with buyer family.');

  const handleRescheduleSubmit = (e) => {
    e.preventDefault();
    if (!activeRescheduleId) return;
    rescheduleVisit(activeRescheduleId, newDate, newTime);
    setActiveRescheduleId(null);
  };

  const handleScheduleNew = (e) => {
    e.preventDefault();
    scheduleVisit(newVisitPropId, newVisitDate, newVisitTime, newVisitNotes);
    setShowNewVisitModal(false);
  };

  return (
    <div className="min-h-screen bg-vistara-bg pb-24 text-vistara-primary text-xs">
      
      {/* Header */}
      <div className="bg-vistara-surface border-b border-vistara-border px-4 sm:px-6 py-6">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="w-4 h-4 text-amber-600" />
              <span className="text-xs uppercase font-extrabold text-amber-600 tracking-wider">
                FIELD TOUR MANAGEMENT
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-vistara-primary tracking-tight">
              Seller Walkthrough Appointments
            </h1>
            <p className="text-xs text-vistara-secondary mt-1">
              Coordinated on-site viewing schedules, confirmations, and walkthrough lifecycle tracking.
            </p>
          </div>

          <Button
            size="sm"
            variant="primary"
            icon={Plus}
            onClick={() => setShowNewVisitModal(true)}
          >
            + Schedule Walkthrough
          </Button>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 pt-6 space-y-4">
        
        <div className="flex items-center justify-between pb-2 border-b border-vistara-border">
          <span className="font-extrabold text-vistara-primary text-sm">
            Active Appointments ({visits.length})
          </span>
          <span className="text-vistara-secondary text-[11px]">
            Integrated across Dashboard, Calendar, and Inquiry lifecycle.
          </span>
        </div>

        <div className="space-y-4">
          {visits.map(visit => {
            const prop = properties.find(p => p.id === visit.propertyId) || properties[0] || {};
            const isCompleted = visit.status === 'Completed';
            const isCancelled = visit.status === 'Cancelled';
            const isScheduled = visit.status === 'Scheduled';

            return (
              <div
                key={visit.id}
                className="p-5 bg-vistara-surface border border-vistara-border rounded-xl shadow-card flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="flex items-start gap-4 flex-1">
                  <PropertyImage
                    src={prop.images?.hero || prop.coverImage}
                    propertyName={prop.name}
                    microMarket={prop.microMarket}
                    aspectRatio="aspect-square"
                    className="w-16 h-16 rounded-xl flex-shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                        isScheduled
                          ? 'bg-amber-100 text-amber-800'
                          : isCompleted
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}>
                        {visit.status}
                      </span>
                      <span className="font-mono text-vistara-secondary flex items-center gap-1 font-semibold">
                        <Clock className="w-3.5 h-3.5 text-vistara-accent" />
                        {visit.date} at {visit.time}
                      </span>
                    </div>

                    <h3 className="font-extrabold text-vistara-primary text-base line-clamp-1">
                      {prop.name}
                    </h3>
                    <p className="text-vistara-secondary text-[11px]">
                      {prop.location} • {prop.priceDisplay}
                    </p>
                    {visit.notes && (
                      <p className="mt-2 text-vistara-primary italic bg-vistara-elevated p-2.5 rounded-lg border border-vistara-border/60">
                        Notes: "{visit.notes}"
                      </p>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-2">
                  {isScheduled && (
                    <>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => {
                          setActiveRescheduleId(visit.id);
                          setNewDate(visit.date);
                          setNewTime(visit.time);
                        }}
                      >
                        Reschedule
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => submitVisitFeedback(visit.id, { overall: 5 }, 'Loved')}
                      >
                        Complete
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                        onClick={() => cancelVisit(visit.id)}
                      >
                        Cancel
                      </Button>
                    </>
                  )}

                  <Button
                    size="sm"
                    variant="primary"
                    onClick={() => onSelectProperty(prop.id)}
                  >
                    View Residence
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Reschedule Modal */}
      {activeRescheduleId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-none">
          <div className="bg-vistara-surface border border-vistara-border rounded-2xl p-6 max-w-sm w-full shadow-popover text-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-vistara-border">
              <h3 className="font-extrabold text-vistara-primary text-sm">
                Reschedule Walkthrough
              </h3>
              <button onClick={() => setActiveRescheduleId(null)}>
                <X className="w-4 h-4 text-vistara-secondary" />
              </button>
            </div>

            <form onSubmit={handleRescheduleSubmit} className="space-y-3">
              <div>
                <label className="block font-bold text-vistara-primary mb-1">New Date</label>
                <input
                  type="date"
                  required
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  className="w-full bg-vistara-elevated border border-vistara-border rounded-lg p-2.5 text-vistara-primary font-bold"
                />
              </div>

              <div>
                <label className="block font-bold text-vistara-primary mb-1">New Time</label>
                <input
                  type="text"
                  required
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                  placeholder="e.g. 11:30 AM"
                  className="w-full bg-vistara-elevated border border-vistara-border rounded-lg p-2.5 text-vistara-primary font-bold"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-vistara-border">
                <Button size="sm" variant="secondary" onClick={() => setActiveRescheduleId(null)}>
                  Cancel
                </Button>
                <Button size="sm" variant="primary" type="submit">
                  Confirm Reschedule
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Schedule New Walkthrough Modal */}
      {showNewVisitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-none">
          <div className="bg-vistara-surface border border-vistara-border rounded-2xl p-6 max-w-md w-full shadow-popover text-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-vistara-border">
              <h3 className="font-extrabold text-vistara-primary text-base">
                Schedule Private Walkthrough
              </h3>
              <button onClick={() => setShowNewVisitModal(false)}>
                <X className="w-4 h-4 text-vistara-secondary" />
              </button>
            </div>

            <form onSubmit={handleScheduleNew} className="space-y-3.5">
              <div>
                <label className="block font-bold text-vistara-primary mb-1">Select Property</label>
                <select
                  value={newVisitPropId}
                  onChange={(e) => setNewVisitPropId(e.target.value)}
                  className="w-full bg-vistara-elevated border border-vistara-border rounded-lg p-2.5 text-vistara-primary font-bold"
                >
                  {properties.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.microMarket})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-vistara-primary mb-1">Date</label>
                  <input
                    type="date"
                    required
                    value={newVisitDate}
                    onChange={(e) => setNewVisitDate(e.target.value)}
                    className="w-full bg-vistara-elevated border border-vistara-border rounded-lg p-2.5 text-vistara-primary font-bold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-vistara-primary mb-1">Time</label>
                  <input
                    type="text"
                    required
                    value={newVisitTime}
                    onChange={(e) => setNewVisitTime(e.target.value)}
                    placeholder="e.g. 04:00 PM"
                    className="w-full bg-vistara-elevated border border-vistara-border rounded-lg p-2.5 text-vistara-primary font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-vistara-primary mb-1">Walkthrough Notes</label>
                <textarea
                  rows={2}
                  value={newVisitNotes}
                  onChange={(e) => setNewVisitNotes(e.target.value)}
                  className="w-full bg-vistara-elevated border border-vistara-border rounded-lg p-2.5 text-vistara-primary"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-vistara-border">
                <Button size="sm" variant="secondary" onClick={() => setShowNewVisitModal(false)}>
                  Cancel
                </Button>
                <Button size="sm" variant="primary" type="submit">
                  Book Walkthrough
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
