import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Check, 
  Star, 
  ArrowRight, 
  MessageSquare,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { useApp } from '../context/AppContext';

export function VisitsPage({ onSelectProperty, onNavigate }) {
  const { properties, visits, rescheduleVisit, cancelVisit, submitVisitFeedback, mode } = useApp();

  const [activeFeedbackVisitId, setActiveFeedbackVisitId] = useState(null);
  const [activeRescheduleVisitId, setActiveRescheduleVisitId] = useState(null);
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('11:00 AM');

  const [feedbackRatings, setFeedbackRatings] = useState({
    naturalLight: 5,
    space: 4,
    noise: 4,
    location: 5,
    overall: 4
  });
  const [feedbackVerdict, setFeedbackVerdict] = useState('Loved');

  const handleSubmitFeedback = (visitId) => {
    submitVisitFeedback(visitId, feedbackRatings, feedbackVerdict);
    setActiveFeedbackVisitId(null);
  };

  const handleConfirmReschedule = (e) => {
    e.preventDefault();
    if (!activeRescheduleVisitId || !newDate) return;
    rescheduleVisit(activeRescheduleVisitId, newDate, newTime);
    setActiveRescheduleVisitId(null);
    setNewDate('');
  };

  return (
    <div className="min-h-screen bg-vistara-bg pb-24 text-vistara-primary">
      
      {/* Top Header */}
      <div className="bg-vistara-surface border-b border-vistara-border px-4 sm:px-6 py-6">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="w-4 h-4 text-amber-600" />
              <span className="text-xs uppercase font-bold tracking-wider text-amber-600">
                FIELD VISITS & FEEDBACK
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-vistara-primary tracking-tight">
              Walkthrough Scheduler & Timeline
            </h1>
            <p className="text-xs text-vistara-secondary mt-1">
              Organize private property viewings and record grounded sensory feedback after each visit.
            </p>
          </div>

          <Button
            size="sm"
            variant="primary"
            onClick={() => onNavigate('explore')}
          >
            + Schedule From Explore
          </Button>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 pt-6 space-y-8">
        
        {/* Visits Timeline */}
        <div className="space-y-4">
          <div className="text-xs uppercase font-bold tracking-wider text-vistara-secondary pb-2 border-b border-vistara-border">
            Timeline ({visits.length} Walkthroughs)
          </div>

          {visits.length === 0 ? (
            <div className="p-12 text-center bg-vistara-surface border border-vistara-border rounded-xl">
              <Calendar className="w-12 h-12 text-vistara-muted mx-auto mb-3" />
              <h4 className="font-bold text-vistara-primary text-sm">No Walkthroughs Scheduled</h4>
              <p className="text-xs text-vistara-secondary max-w-sm mx-auto mt-1 mb-4">
                Schedule a private visit to inspect natural daylight, acoustic decibel levels, and cross-ventilation firsthand.
              </p>
              <Button size="sm" variant="secondary" onClick={() => onNavigate('explore')}>
                Browse Available Residences
              </Button>
            </div>
          ) : (
            visits.map(visit => {
              const prop = properties.find(p => p.id === visit.propertyId) || properties[0];
              const isCompleted = visit.status === 'Completed';

              return (
                <div
                  key={visit.id}
                  className="bg-vistara-surface border border-vistara-border rounded-xl p-5 shadow-card text-xs flex flex-col md:flex-row md:items-center justify-between gap-6"
                >
                  {/* Left Property Info */}
                  <div className="flex items-start gap-4 flex-1">
                    <img
                      src={prop.coverImage}
                      alt={prop.name}
                      className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                          isCompleted
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : visit.status === 'Cancelled'
                            ? 'bg-rose-50 text-rose-700 border border-rose-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}>
                          {visit.status}
                        </span>
                        <span className="text-vistara-secondary text-[11px] font-mono">
                          {visit.date} at {visit.time}
                        </span>
                      </div>

                      <h3 
                        onClick={() => onSelectProperty(prop.id)}
                        className="text-base font-bold text-vistara-primary hover:text-vistara-accent cursor-pointer transition-colors mt-1"
                      >
                        {prop.name}
                      </h3>
                      <p className="text-vistara-secondary text-[11px] mt-0.5">
                        {prop.location} • {prop.bhk} BHK • {mode === 'buy' ? prop.priceDisplay : prop.rentDisplay}
                      </p>

                      {visit.notes && (
                        <p className="mt-2 text-vistara-primary italic bg-vistara-elevated p-2 rounded border border-vistara-border/60">
                          "{visit.notes}"
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Right: Feedback & Evaluation */}
                  <div className="flex flex-col items-start md:items-end justify-between gap-2 border-t md:border-t-0 pt-3 md:pt-0">
                    {isCompleted ? (
                      <div className="bg-vistara-elevated p-3 rounded-lg border border-vistara-border w-full md:w-auto">
                        <div className="font-semibold text-vistara-primary mb-1 flex items-center justify-between gap-3">
                          <span>Post-Visit Rating:</span>
                          <span className="text-emerald-700 font-bold">{visit.verdict}</span>
                        </div>
                        {visit.ratings && (
                          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[11px] text-vistara-secondary">
                            <div>Daylight: {'★'.repeat(visit.ratings.naturalLight)}</div>
                            <div>Acoustics: {'★'.repeat(visit.ratings.noise)}</div>
                            <div>Space: {'★'.repeat(visit.ratings.space)}</div>
                            <div>Location: {'★'.repeat(visit.ratings.location)}</div>
                          </div>
                        )}
                      </div>
                    ) : visit.status === 'Cancelled' ? (
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-rose-600 font-medium">Walkthrough Cancelled</span>
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => {
                            setActiveRescheduleVisitId(visit.id);
                            setNewDate(visit.date);
                          }}
                        >
                          Reschedule
                        </Button>
                      </div>
                    ) : (
                      <div className="flex flex-wrap items-center gap-2">
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => setActiveFeedbackVisitId(visit.id)}
                        >
                          Complete & Review
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            setActiveRescheduleVisitId(visit.id);
                            setNewDate(visit.date);
                          }}
                        >
                          Reschedule
                        </Button>
                        <button
                          type="button"
                          onClick={() => cancelVisit(visit.id)}
                          className="px-2.5 py-1 text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg transition-colors"
                          title="Cancel scheduled walkthrough"
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

      </div>

      {/* Post-Visit Feedback Modal */}
      {activeFeedbackVisitId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
          <div className="bg-vistara-surface border border-vistara-border rounded-xl p-6 max-w-md w-full shadow-popover text-xs">
            <h3 className="text-base font-bold text-vistara-primary mb-1">
              Grounded Walkthrough Feedback
            </h3>
            <p className="text-vistara-secondary mb-4">
              Rate your sensory impressions to refine your life profile and Decision Room matrix.
            </p>

            <div className="space-y-3">
              {[
                { key: 'naturalLight', label: 'Natural Light & Glare' },
                { key: 'noise', label: 'Acoustic Stillness (Street Hum)' },
                { key: 'space', label: 'Ceiling Height & Floor Volume' },
                { key: 'location', label: 'Neighborhood & Street Feel' }
              ].map(dim => (
                <div key={dim.key} className="flex items-center justify-between">
                  <span className="font-medium text-vistara-primary">{dim.label}</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFeedbackRatings(prev => ({ ...prev, [dim.key]: star }))}
                        className={`text-base ${star <= (feedbackRatings[dim.key] || 5) ? 'text-amber-500' : 'text-vistara-border'}`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              <div className="pt-2 border-t border-vistara-border">
                <label className="block font-semibold text-vistara-primary mb-1">Final Verdict</label>
                <div className="grid grid-cols-4 gap-1.5 text-center">
                  {['Loved', 'Okay', 'Concern', 'Reject'].map(v => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setFeedbackVerdict(v)}
                      className={`p-2 rounded font-semibold border ${
                        feedbackVerdict === v
                          ? 'bg-[#142334] text-white border-[#142334]'
                          : 'bg-vistara-elevated text-vistara-secondary border-vistara-border'
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-5">
              <Button size="sm" variant="secondary" onClick={() => setActiveFeedbackVisitId(null)}>
                Cancel
              </Button>
              <Button size="sm" variant="primary" onClick={() => handleSubmitFeedback(activeFeedbackVisitId)}>
                Submit Grounded Feedback
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Reschedule Walkthrough Modal */}
      {activeRescheduleVisitId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
          <form onSubmit={handleConfirmReschedule} className="bg-vistara-surface border border-vistara-border rounded-xl p-6 max-w-sm w-full shadow-popover text-xs space-y-4">
            <h3 className="text-base font-bold text-vistara-primary">
              Reschedule Walkthrough
            </h3>
            <p className="text-vistara-secondary">
              Select a new preferred calendar date and time for your private on-site inspection.
            </p>

            <div>
              <label className="block font-semibold text-vistara-primary mb-1">New Date</label>
              <input
                type="text"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                placeholder="e.g. 24 Oct, 2026 or Tomorrow"
                className="w-full bg-vistara-elevated border border-vistara-border rounded-lg p-2.5 text-vistara-primary font-medium focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block font-semibold text-vistara-primary mb-1">Preferred Time</label>
              <select
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
                className="w-full bg-vistara-elevated border border-vistara-border rounded-lg p-2.5 text-vistara-primary font-medium focus:outline-none"
              >
                <option value="10:00 AM">10:00 AM (Morning Natural Light)</option>
                <option value="11:30 AM">11:30 AM (Peak Overhead Sun)</option>
                <option value="02:00 PM">02:00 PM (Afternoon Acoustic Check)</option>
                <option value="04:30 PM">04:30 PM (Golden Hour Inspection)</option>
                <option value="06:00 PM">06:00 PM (Evening Twilight & Street Hum)</option>
              </select>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-vistara-border">
              <Button size="sm" variant="secondary" type="button" onClick={() => setActiveRescheduleVisitId(null)}>
                Cancel
              </Button>
              <Button size="sm" variant="primary" type="submit">
                Confirm Reschedule
              </Button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}
