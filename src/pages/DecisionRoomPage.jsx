import React, { useState, useMemo } from 'react';
import { 
  Layers, 
  CheckCircle2, 
  HelpCircle, 
  AlertCircle, 
  XCircle, 
  Plus, 
  Users, 
  MessageSquare, 
  Edit3,
  Trash2,
  X,
  Sparkles,
  Sliders,
  ChevronRight,
  TrendingUp,
  Check
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { PropertyImage } from '../components/common/PropertyImage';
import { FitScoreBadge } from '../components/common/FitScoreBadge';
import { useApp } from '../context/AppContext';
import { calculateFitScore } from '../utils/fitEngine';

// Priority weight multipliers for calculating member-specific fit
const WEIGHT_MULTIPLIERS = {
  High: 1.25,
  Medium: 1.0,
  Low: 0.65
};

export function DecisionRoomPage({ onSelectProperty, onNavigate }) {
  const { 
    properties, 
    currentUser, 
    decisionRoom, 
    moveDecisionItem, 
    addPropertyToDecisionRoom,
    removePropertyFromDecisionRoom,
    addFamilyMember, 
    updateFamilyMember, 
    removeFamilyMember, 
    addFamilyNote, 
    deleteFamilyNote,
    mode 
  } = useApp();

  const members = decisionRoom.members || [];
  const columns = decisionRoom.columns || {
    mustHave: ['vis-che-02'],
    niceToHave: ['vis-che-03', 'vis-che-04'],
    concern: ['vis-che-09'],
    reject: []
  };

  // Active member selected for perspectives
  const [activeMemberId, setActiveMemberId] = useState(members[0]?.id || 'mem-self');

  // Modals state
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [showAddPropertyModal, setShowAddPropertyModal] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [noteModalData, setNoteModalData] = useState(null); // { propertyId }

  // Member form state
  const [memberName, setMemberName] = useState('');
  const [memberRelationship, setMemberRelationship] = useState('Partner');
  const [memberRole, setMemberRole] = useState('Co-Decision Maker');
  const [memberPriorities, setMemberPriorities] = useState({
    budget: 'High',
    location: 'High',
    space: 'Medium',
    commute: 'High',
    lifestyle: 'High',
    schools: 'Medium',
    amenities: 'Medium',
    futureFit: 'High'
  });

  // Note form state
  const [noteText, setNoteText] = useState('');
  const [noteType, setNoteType] = useState('Must-have'); // 'Must-have' | 'Nice-to-have' | 'Concern' | 'Note'

  const activeMember = members.find(m => m.id === activeMemberId) || members[0];

  const totalPropertiesCount = (columns.mustHave?.length || 0) + 
                               (columns.niceToHave?.length || 0) + 
                               (columns.concern?.length || 0) + 
                               (columns.reject?.length || 0);

  const getCategoryProperties = (propIds) => {
    return (propIds || []).map(id => properties.find(p => p.id === id)).filter(Boolean);
  };

  // Calculate personalized fit score for a specific family member on a property
  const calculateMemberScore = (property, member) => {
    if (!property) return 88;
    // For primary user / self, use exact single-source-of-truth score
    if (!member || member.id === 'mem-self' || member.relationship === 'Self') {
      return calculateFitScore(property, currentUser).score;
    }
    const prio = member.priorities || {};
    const bWeight = WEIGHT_MULTIPLIERS[prio.budget] || 1.0;
    const lWeight = WEIGHT_MULTIPLIERS[prio.location] || 1.0;
    const sWeight = WEIGHT_MULTIPLIERS[prio.space] || 1.0;
    const cWeight = WEIGHT_MULTIPLIERS[prio.commute] || 1.0;
    const lsWeight = WEIGHT_MULTIPLIERS[prio.lifestyle] || 1.0;
    const fWeight = WEIGHT_MULTIPLIERS[prio.futureFit] || 1.0;

    const totalMultiplier = (0.20 * bWeight) + (0.15 * lWeight) + (0.15 * sWeight) + (0.20 * lsWeight) + (0.10 * cWeight) + (0.10 * lsWeight) + (0.10 * fWeight) || 1;

    const customWeights = {
      budget: (0.20 * bWeight) / totalMultiplier,
      location: (0.15 * lWeight) / totalMultiplier,
      space: (0.15 * sWeight) / totalMultiplier,
      lifestyle: (0.20 * lsWeight) / totalMultiplier,
      commute: (0.10 * cWeight) / totalMultiplier,
      homeDNA: (0.10 * lsWeight) / totalMultiplier,
      futureFit: (0.10 * fWeight) / totalMultiplier
    };

    return calculateFitScore(property, currentUser, customWeights).score;
  };

  // Open Add Member Modal
  const handleOpenAddModal = () => {
    setMemberName('');
    setMemberRelationship('Partner');
    setMemberRole('Co-Decision Maker');
    setMemberPriorities({
      budget: 'High',
      location: 'High',
      space: 'Medium',
      commute: 'High',
      lifestyle: 'High',
      schools: 'Medium',
      amenities: 'Medium',
      futureFit: 'High'
    });
    setEditingMember(null);
    setShowAddMemberModal(true);
  };

  // Open Edit Member Modal
  const handleOpenEditModal = (member) => {
    setMemberName(member.name);
    setMemberRelationship(member.relationship);
    setMemberRole(member.role);
    setMemberPriorities({ ...member.priorities });
    setEditingMember(member);
    setShowAddMemberModal(true);
  };

  const handleSaveMember = (e) => {
    e.preventDefault();
    if (!memberName.trim()) return;

    if (editingMember) {
      updateFamilyMember(editingMember.id, {
        name: memberName.trim(),
        relationship: memberRelationship,
        role: memberRole,
        priorities: memberPriorities
      });
    } else {
      addFamilyMember({
        name: memberName.trim(),
        relationship: memberRelationship,
        role: memberRole,
        priorities: memberPriorities
      });
    }

    setShowAddMemberModal(false);
    setEditingMember(null);
  };

  const handleSaveNote = (e) => {
    e.preventDefault();
    if (!noteText.trim() || !noteModalData) return;

    addFamilyNote(activeMember.id, noteModalData.propertyId, noteText, noteType);
    setNoteModalData(null);
    setNoteText('');
  };

  const categories = [
    { key: 'mustHave', label: 'Must Have', icon: CheckCircle2, color: 'text-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200' },
    { key: 'niceToHave', label: 'Nice to Have', icon: HelpCircle, color: 'text-blue-700 bg-blue-50 dark:bg-blue-950/40 border-blue-200' },
    { key: 'concern', label: 'Under Review / Concern', icon: AlertCircle, color: 'text-amber-700 bg-amber-50 dark:bg-amber-950/40 border-amber-200' },
    { key: 'reject', label: 'Rejected', icon: XCircle, color: 'text-rose-700 bg-rose-50 dark:bg-rose-950/40 border-rose-200' }
  ];

  // Compile all member notes across properties
  const allNotes = useMemo(() => {
    const list = [];
    members.forEach(mem => {
      (mem.notes || []).forEach(n => {
        list.push({ ...n, memberName: mem.name, memberRole: mem.role });
      });
    });
    return list;
  }, [members]);

  return (
    <div className="min-h-screen bg-vistara-bg pb-24 text-vistara-primary text-xs">
      
      {/* Top Header */}
      <div className="bg-vistara-surface border-b border-vistara-border px-4 sm:px-6 py-6">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Layers className="w-4 h-4 text-purple-600" />
              <span className="text-xs uppercase font-extrabold tracking-wider text-purple-600">
                COLLABORATIVE DECISION SUITE
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-vistara-primary tracking-tight">
              The Decision Room
            </h1>
            <p className="text-xs text-vistara-secondary mt-1">
              Collaboratively calibrate priorities, weigh trade-offs, and inspect family alignment.
            </p>
          </div>

          {/* Family Member Manager & Switcher */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5 bg-vistara-elevated p-1 rounded-xl border border-vistara-border">
              <Users className="w-4 h-4 text-vistara-secondary ml-2" />
              <span className="text-vistara-secondary font-medium mr-1">Perspective:</span>
              {members.map(member => (
                <button
                  key={member.id}
                  onClick={() => setActiveMemberId(member.id)}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                    activeMemberId === member.id
                      ? 'bg-[#142334] text-white shadow-subtle'
                      : 'text-vistara-secondary hover:text-vistara-primary'
                  }`}
                >
                  {member.name} ({member.relationship})
                </button>
              ))}
            </div>

            <Button
              size="sm"
              variant="secondary"
              icon={Plus}
              onClick={() => setShowAddPropertyModal(true)}
            >
              Add Home
            </Button>

            <Button
              size="sm"
              variant="primary"
              icon={Plus}
              onClick={handleOpenAddModal}
            >
              Add Family Member
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 pt-6 space-y-6">
        
        {/* Family Member Profiles Strip & Priority Weights */}
        <div className="p-5 bg-vistara-surface border border-vistara-border rounded-xl shadow-card space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-vistara-border pb-3">
            <div>
              <h2 className="text-sm font-bold text-vistara-primary flex items-center gap-2">
                <Users className="w-4 h-4 text-vistara-accent" />
                <span>Family Decision Circle ({members.length} Members)</span>
              </h2>
              <p className="text-[11px] text-vistara-secondary">
                Each member has independent preference weights that influence how residences score for them.
              </p>
            </div>
            <span className="text-[11px] text-vistara-secondary italic">
              "Different priorities create different perspectives."
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {members.map(member => {
              const isSelf = member.id === 'mem-self';
              const prio = member.priorities || {};

              return (
                <div 
                  key={member.id}
                  className={`p-4 rounded-xl border transition-all ${
                    activeMemberId === member.id
                      ? 'bg-vistara-elevated border-vistara-accent shadow-subtle'
                      : 'bg-vistara-surface border-vistara-border'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-extrabold text-sm text-vistara-primary flex items-center gap-1.5">
                        <span>{member.name}</span>
                        {isSelf && (
                          <span className="px-1.5 py-0.5 rounded bg-vistara-accent/20 text-vistara-primary text-[9px] font-bold">
                            YOU
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-vistara-secondary font-medium">
                        {member.relationship} • {member.role}
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleOpenEditModal(member)}
                        className="p-1 rounded text-vistara-secondary hover:text-vistara-primary hover:bg-vistara-surface"
                        title="Edit profile & weights"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      {!isSelf && (
                        <button
                          type="button"
                          onClick={() => removeFamilyMember(member.id)}
                          className="p-1 rounded text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                          title="Remove family member"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Priority Badges */}
                  <div className="mt-3 pt-2.5 border-t border-vistara-border/60">
                    <div className="text-[10px] font-bold uppercase text-vistara-secondary mb-1.5">
                      Top Priority Drivers
                    </div>
                    <div className="grid grid-cols-2 gap-1.5 text-[11px]">
                      {Object.entries(prio).slice(0, 4).map(([dim, weight]) => (
                        <div key={dim} className="flex justify-between items-center bg-vistara-surface px-2 py-1 rounded border border-vistara-border/60">
                          <span className="capitalize text-vistara-secondary">{dim}</span>
                          <span className={`font-bold ${
                            weight === 'High' ? 'text-emerald-600' : weight === 'Medium' ? 'text-amber-600' : 'text-vistara-muted'
                          }`}>
                            {weight}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Objective Neutral Decision Synthesis Box (No 'winner', purely trade-offs) */}
        <div className="p-6 bg-vistara-surface border border-vistara-border rounded-xl shadow-card space-y-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-vistara-elevated text-vistara-accent">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-vistara-primary">
                Objective Decision Support Synthesis
              </h3>
              <p className="text-[11px] text-vistara-secondary">
                Neutral assessment of alignment across all {members.length} family perspectives.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 text-xs leading-relaxed">
            <div className="p-3.5 bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 rounded-lg">
              <span className="font-extrabold text-emerald-800 dark:text-emerald-300 block mb-1">
                SHARED PRIORITIES
              </span>
              <ul className="space-y-1 text-vistara-secondary text-[11px]">
                <li>• Quiet residential location with low street decibels.</li>
                <li>• Plentiful morning daylight and cross-ventilation.</li>
                <li>• Short commute to south Chennai technology hubs.</li>
              </ul>
            </div>

            <div className="p-3.5 bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <span className="font-extrabold text-blue-800 dark:text-blue-300 block mb-1">
                DIFFERING PRIORITIES
              </span>
              <ul className="space-y-1 text-vistara-secondary text-[11px]">
                <li>• You prioritize dedicated acoustic work-from-home space.</li>
                <li>• Parent/Advisor prioritizes capital safety and immediate title clarity.</li>
                <li>• Partner prioritizes open entertainment layout and walkability.</li>
              </ul>
            </div>

            <div className="p-3.5 bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg">
              <span className="font-extrabold text-amber-800 dark:text-amber-300 block mb-1">
                CORE TRADE-OFFS
              </span>
              <p className="text-vistara-secondary text-[11px]">
                <strong>The Sunlit Atrium</strong> delivers unmatched daylight and quiet acoustics within target budget, but has slightly smaller balcony terrace than <strong>Bayview Promenade</strong>.
              </p>
            </div>
          </div>
        </div>

        {/* 4-Column Decision Matrix or Empty State */}
        {totalPropertiesCount === 0 ? (
          <div className="p-12 text-center bg-vistara-surface border border-dashed border-vistara-border rounded-2xl shadow-card my-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-vistara-accent/10 text-vistara-accent flex items-center justify-center mx-auto">
              <Layers className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-vistara-primary">Your Decision Room is ready for homes.</h2>
            <p className="text-xs text-vistara-secondary max-w-md mx-auto">
              Add candidate residences from Explore, Saved, or Compare to collaboratively calibrate priorities and resolve trade-offs with family members.
            </p>
            <div className="pt-2 flex justify-center gap-3">
              <Button variant="primary" size="md" onClick={() => onNavigate('explore')}>
                Explore Homes
              </Button>
              <Button variant="secondary" size="md" onClick={() => setShowAddPropertyModal(true)}>
                Add from Pool
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 items-start">
            {categories.map(cat => {
              const Icon = cat.icon;
              const items = getCategoryProperties(columns[cat.key] || []);

              return (
                <div 
                  key={cat.key}
                  onDragOver={(e) => {
                    e.preventDefault();
                    e.dataTransfer.dropEffect = 'move';
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    const droppedId = e.dataTransfer.getData('text/plain');
                    if (droppedId) {
                      moveDecisionItem(droppedId, cat.key);
                    }
                  }}
                  className="bg-vistara-surface border border-vistara-border rounded-xl p-4 shadow-card flex flex-col min-h-[500px]"
                >
                  {/* Column Title */}
                  <div className={`flex items-center justify-between p-2.5 rounded-lg border ${cat.color} mb-4 text-xs font-bold`}>
                    <div className="flex items-center gap-1.5">
                      <Icon className="w-4 h-4" />
                      <span>{cat.label}</span>
                    </div>
                    <span className="w-5 h-5 rounded-full bg-white dark:bg-black/40 flex items-center justify-center text-[10px]">
                      {items.length}
                    </span>
                  </div>

                  {/* Cards List */}
                  <div className="space-y-3 flex-1">
                    {items.length === 0 ? (
                      <div className="h-44 border-2 border-dashed border-vistara-border/60 rounded-xl flex items-center justify-center text-vistara-muted text-xs text-center p-4">
                        Drag or move candidate homes here.
                      </div>
                    ) : (
                      items.map(prop => {
                        const propNotes = allNotes.filter(n => n.propertyId === prop.id);

                        return (
                          <div
                            key={prop.id}
                            draggable
                            onDragStart={(e) => {
                              e.dataTransfer.setData('text/plain', prop.id);
                            }}
                            className="bg-vistara-elevated border border-vistara-border rounded-xl p-3.5 shadow-subtle hover:border-vistara-accent transition-all text-xs cursor-grab active:cursor-grabbing"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <PropertyImage
                                src={prop.images?.hero || prop.coverImage}
                                propertyName={prop.name}
                                microMarket={prop.microMarket}
                                aspectRatio="aspect-square"
                                className="w-14 h-14 rounded-lg flex-shrink-0"
                              />
                              <div className="flex-1 min-w-0">
                                <div 
                                  onClick={() => onSelectProperty(prop.id)}
                                  className="font-extrabold text-vistara-primary hover:text-vistara-accent cursor-pointer line-clamp-1"
                                >
                                  {prop.name}
                                </div>
                                <div className="text-[11px] text-vistara-secondary font-medium">
                                  {mode === 'buy' ? prop.priceDisplay : prop.rentDisplay} • {prop.microMarket}
                                </div>
                              </div>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removePropertyFromDecisionRoom(prop.id);
                                }}
                                className="p-1 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors shrink-0"
                                title="Remove property from Decision Room"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            {/* How each person values this home (Priority 10) */}
                            <div className="mt-3 p-2 bg-vistara-surface rounded-lg border border-vistara-border/60">
                              <div className="text-[10px] font-bold text-vistara-secondary uppercase tracking-wider mb-1.5 flex items-center justify-between">
                                <span>Family Perspectives</span>
                                <span className="text-vistara-muted">Fit Scores</span>
                              </div>
                              <div className="space-y-1">
                                {members.map(mem => {
                                  const mScore = calculateMemberScore(prop, mem);
                                  return (
                                    <div key={mem.id} className="flex justify-between items-center text-[11px]">
                                      <span className="text-vistara-secondary truncate max-w-[120px]">
                                        {mem.name}:
                                      </span>
                                      <span className={`font-bold ${
                                        mScore >= 90 ? 'text-emerald-600' : 'text-vistara-primary'
                                      }`}>
                                        {mScore}% Fit
                                      </span>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>

                            {/* Member Notes & Must-Haves */}
                            {propNotes.length > 0 && (
                              <div className="mt-2.5 space-y-1.5">
                                {propNotes.map((note, idx) => (
                                  <div 
                                    key={idx} 
                                    className="text-[11px] bg-vistara-surface p-2 rounded-lg border-l-2 border-vistara-accent relative group"
                                  >
                                    <div className="flex items-center justify-between font-semibold text-vistara-primary text-[10px]">
                                      <span>{note.memberName}</span>
                                      <div className="flex items-center gap-1.5">
                                        <span className="text-vistara-accent text-[9px] uppercase">{note.type}</span>
                                        <button
                                          type="button"
                                          onClick={() => deleteFamilyNote(activeMember.id, note.id)}
                                          className="p-0.5 rounded text-rose-400 hover:text-rose-600 transition-colors"
                                          title="Remove note"
                                        >
                                          <X className="w-2.5 h-2.5" />
                                        </button>
                                      </div>
                                    </div>
                                    <p className="text-vistara-secondary italic mt-0.5">"{note.text}"</p>
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* Move & Note Actions */}
                            <div className="mt-3 pt-2.5 border-t border-vistara-border/60 flex items-center justify-between text-[11px]">
                              <select
                                value={cat.key}
                                onChange={(e) => moveDecisionItem(prop.id, e.target.value)}
                                className="bg-vistara-surface border border-vistara-border rounded-lg px-2 py-1 text-vistara-primary font-bold focus:outline-none"
                              >
                                <option value="mustHave">Must Have</option>
                                <option value="niceToHave">Nice to Have</option>
                                <option value="concern">Concern</option>
                                <option value="reject">Reject</option>
                              </select>

                              <button
                                type="button"
                                onClick={() => {
                                  setNoteModalData({ propertyId: prop.id });
                                  setNoteText('');
                                }}
                                className="text-vistara-accent hover:underline font-bold"
                              >
                                + Member Note
                              </button>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* Add / Edit Family Member Modal */}
      {showAddMemberModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-none">
          <div className="bg-vistara-surface border border-vistara-border rounded-2xl p-6 max-w-md w-full shadow-popover text-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-vistara-border">
              <h3 className="font-extrabold text-vistara-primary text-base">
                {editingMember ? `Edit ${editingMember.name}'s Profile` : 'Add Family Member'}
              </h3>
              <button 
                type="button" 
                onClick={() => setShowAddMemberModal(false)}
                className="text-vistara-secondary hover:text-vistara-primary"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveMember} className="space-y-3.5">
              <div>
                <label className="block font-bold text-vistara-primary mb-1">Name</label>
                <input
                  type="text"
                  required
                  value={memberName}
                  onChange={(e) => setMemberName(e.target.value)}
                  placeholder="e.g. Arun, Meera, Sundaram"
                  className="w-full bg-vistara-elevated border border-vistara-border rounded-lg p-2.5 text-vistara-primary focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-vistara-primary mb-1">Relationship</label>
                  <select
                    value={memberRelationship}
                    onChange={(e) => setMemberRelationship(e.target.value)}
                    className="w-full bg-vistara-elevated border border-vistara-border rounded-lg p-2.5 text-vistara-primary font-medium"
                  >
                    <option>Partner</option>
                    <option>Parent</option>
                    <option>Sibling</option>
                    <option>Child</option>
                    <option>Friend</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-vistara-primary mb-1">Decision Role</label>
                  <select
                    value={memberRole}
                    onChange={(e) => setMemberRole(e.target.value)}
                    className="w-full bg-vistara-elevated border border-vistara-border rounded-lg p-2.5 text-vistara-primary font-medium"
                  >
                    <option>Primary Decision Maker</option>
                    <option>Co-Decision Maker</option>
                    <option>Advisor</option>
                    <option>Viewer</option>
                  </select>
                </div>
              </div>

              {/* Priority Dimensions Weights */}
              <div>
                <label className="block font-bold text-vistara-primary mb-1.5">
                  Priority Weights (Influences Fit Score)
                </label>
                <div className="grid grid-cols-2 gap-2 bg-vistara-elevated p-3 rounded-xl border border-vistara-border">
                  {Object.entries(memberPriorities).map(([key, val]) => (
                    <div key={key} className="flex items-center justify-between">
                      <span className="capitalize text-vistara-secondary font-medium">{key}:</span>
                      <select
                        value={val}
                        onChange={(e) => setMemberPriorities(prev => ({ ...prev, [key]: e.target.value }))}
                        className="bg-vistara-surface border border-vistara-border rounded px-1.5 py-0.5 font-bold text-[10px]"
                      >
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                      </select>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-vistara-border">
                <Button size="sm" variant="secondary" onClick={() => setShowAddMemberModal(false)}>
                  Cancel
                </Button>
                <Button size="sm" variant="primary" type="submit">
                  {editingMember ? 'Save Changes' : 'Add to Decision Room'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Family Note Modal */}
      {noteModalData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-none">
          <div className="bg-vistara-surface border border-vistara-border rounded-2xl p-6 max-w-sm w-full shadow-popover text-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-vistara-border">
              <h3 className="font-extrabold text-vistara-primary text-sm">
                Add Perspective as {activeMember.name}
              </h3>
              <button onClick={() => setNoteModalData(null)}>
                <X className="w-4 h-4 text-vistara-secondary" />
              </button>
            </div>

            <form onSubmit={handleSaveNote} className="space-y-3">
              <div>
                <label className="block font-bold text-vistara-primary mb-1">Perspective Type</label>
                <select
                  value={noteType}
                  onChange={(e) => setNoteType(e.target.value)}
                  className="w-full bg-vistara-elevated border border-vistara-border rounded-lg p-2 text-vistara-primary font-bold"
                >
                  <option value="Must-have">Must-have</option>
                  <option value="Nice-to-have">Nice-to-have</option>
                  <option value="Concern">Concern</option>
                  <option value="Note">General Note</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-vistara-primary mb-1">Note / Feedback</label>
                <textarea
                  rows={3}
                  required
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  placeholder="e.g. Need east-facing morning light for meditation, commute under 40 mins..."
                  className="w-full bg-vistara-elevated border border-vistara-border rounded-lg p-2.5 text-vistara-primary focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-vistara-border">
                <Button size="sm" variant="secondary" onClick={() => setNoteModalData(null)}>
                  Cancel
                </Button>
                <Button size="sm" variant="primary" type="submit">
                  Save Perspective
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Property To Decision Room Modal */}
      {showAddPropertyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-none">
          <div className="bg-vistara-surface border border-vistara-border rounded-2xl p-6 max-w-lg w-full max-h-[85vh] flex flex-col shadow-popover text-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-vistara-border">
              <div>
                <h3 className="font-extrabold text-vistara-primary text-base">
                  Add Residence to Decision Room
                </h3>
                <p className="text-[11px] text-vistara-secondary mt-0.5">
                  Select a property from the audited portfolio to evaluate with family members.
                </p>
              </div>
              <button 
                type="button" 
                onClick={() => setShowAddPropertyModal(false)}
                className="text-vistara-secondary hover:text-vistara-primary"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="overflow-y-auto flex-1 space-y-2.5 pr-1">
              {properties.map(p => {
                const inRoom = (columns.mustHave || []).includes(p.id) ||
                               (columns.niceToHave || []).includes(p.id) ||
                               (columns.concern || []).includes(p.id) ||
                               (columns.reject || []).includes(p.id);

                return (
                  <div 
                    key={p.id}
                    className="p-3 bg-vistara-elevated border border-vistara-border rounded-xl flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <PropertyImage
                        src={p.images?.hero || p.coverImage}
                        propertyName={p.name}
                        microMarket={p.microMarket}
                        aspectRatio="aspect-square"
                        className="w-12 h-12 rounded-lg flex-shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="font-bold text-vistara-primary text-xs truncate">
                          {p.name}
                        </div>
                        <div className="text-[11px] text-vistara-secondary">
                          {mode === 'buy' ? p.priceDisplay : p.rentDisplay} • {p.microMarket}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {inRoom ? (
                        <span className="px-2.5 py-1 rounded-md bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 font-bold text-[10px] flex items-center gap-1 border border-emerald-200">
                          <Check className="w-3 h-3" /> In Room
                        </span>
                      ) : (
                        <div className="flex items-center gap-1.5">
                          <Button
                            size="sm"
                            variant="primary"
                            icon={Plus}
                            onClick={() => {
                              addPropertyToDecisionRoom(p.id, 'mustHave');
                            }}
                          >
                            Add
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-3 border-t border-vistara-border flex justify-between items-center">
              <span className="text-[11px] text-vistara-secondary">
                {properties.length} residences available
              </span>
              <Button size="sm" variant="secondary" onClick={() => setShowAddPropertyModal(false)}>
                Done
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
