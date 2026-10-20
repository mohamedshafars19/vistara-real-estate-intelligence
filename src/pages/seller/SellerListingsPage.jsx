import React, { useState } from 'react';
import { 
  Building, 
  Plus, 
  Eye, 
  Pause, 
  Play, 
  Copy, 
  Archive, 
  Edit3, 
  Check, 
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  X,
  TrendingDown,
  Sparkles
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import { PropertyImage } from '../../components/common/PropertyImage';
import { useApp } from '../../context/AppContext';

export function SellerListingsPage({ onSelectProperty, onNavigate }) {
  const { 
    properties, 
    sellerListings, 
    pauseListing, 
    reactivateListing, 
    archiveListing, 
    publishListing,
    draftListing,
    updateProperty, 
    updatePropertyPrice,
    addProperty,
    updateListingHealth,
    mode 
  } = useApp();

  // Active filter tab
  const [activeFilter, setActiveFilter] = useState('active'); // 'active' | 'drafts' | 'archived'

  // Edit property modal state
  const [editingProp, setEditingProp] = useState(null);
  const [editForm, setEditForm] = useState({
    name: '',
    price: 0,
    bhk: 3,
    area: 1800,
    microMarket: 'OMR - Perungudi',
    location: '',
    story: '',
    amenities: ''
  });

  // Success toast feedback
  const [successToast, setSuccessToast] = useState('');

  const showToast = (msg) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(''), 3000);
  };

  // Get status for each property from central sellerListings
  const sellerProps = properties.map(p => {
    const listingMeta = sellerListings[p.id] || { status: 'Published', listingHealth: 92, missingItems: [] };
    return {
      ...p,
      sellerStatus: listingMeta.status || 'Published',
      listingHealth: listingMeta.listingHealth || 90,
      missingItems: listingMeta.missingItems || []
    };
  });

  const filtered = sellerProps.filter(p => {
    if (activeFilter === 'active') return p.sellerStatus === 'Published' || p.sellerStatus === 'Paused';
    if (activeFilter === 'drafts') return p.sellerStatus === 'Draft';
    if (activeFilter === 'archived') return p.sellerStatus === 'Archived';
    return true;
  });

  const handleTogglePause = (id, currentStatus) => {
    if (currentStatus === 'Paused') {
      reactivateListing(id);
      showToast('Listing reactivated and published to live discovery map!');
    } else {
      pauseListing(id);
      showToast('Listing temporarily paused from public search.');
    }
  };

  const handleArchive = (id) => {
    archiveListing(id);
    showToast('Listing moved to archive.');
  };

  const handleDuplicate = (prop) => {
    const cloned = addProperty({
      ...prop,
      id: `vis-che-${Date.now()}`,
      name: `${prop.name} (Draft Copy)`,
      status: 'Draft'
    });
    draftListing(cloned.id); // set initial state as Draft
    updateListingHealth(cloned.id, 80, ['Verify CAD Dimensions', 'Upload Photos']);
    showToast('Duplicate created as draft!');
    setActiveFilter('drafts');
  };

  const handleOpenEdit = (prop, specificMissingItem = null) => {
    setEditingProp(prop);
    setEditForm({
      name: prop.name,
      price: prop.price,
      bhk: prop.bhk,
      area: prop.area,
      microMarket: prop.microMarket,
      location: prop.location,
      story: prop.story || '',
      amenities: (prop.amenities || []).join(', ')
    });
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editingProp) return;

    const newPrice = Number(editForm.price);
    const priceChanged = newPrice !== editingProp.price;

    // Update standard fields
    updateProperty(editingProp.id, {
      name: editForm.name.trim(),
      bhk: Number(editForm.bhk),
      area: Number(editForm.area),
      microMarket: editForm.microMarket,
      location: editForm.location,
      story: editForm.story,
      amenities: editForm.amenities.split(',').map(a => a.trim()).filter(Boolean)
    });

    // Update price & trigger price history / price drop
    if (priceChanged) {
      updatePropertyPrice(editingProp.id, newPrice);
    }

    // Improve health score when edited
    const updatedHealth = Math.min(99, (editingProp.listingHealth || 85) + 6);
    updateListingHealth(editingProp.id, updatedHealth, []);

    setEditingProp(null);
    showToast('Changes saved successfully! Reflected across search, preview, and dashboard.');
  };

  return (
    <div className="min-h-screen bg-vistara-bg pb-24 text-vistara-primary text-xs">
      
      {/* Toast Feedback */}
      {successToast && (
        <div className="fixed top-20 right-6 z-50 bg-[#142334] text-white px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 border border-vistara-accent animate-fade-in text-xs font-semibold">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{successToast}</span>
        </div>
      )}

      {/* Header */}
      <div className="bg-vistara-surface border-b border-vistara-border px-4 sm:px-6 py-6">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Building className="w-4 h-4 text-vistara-accent" />
              <span className="text-xs uppercase font-extrabold text-vistara-accent tracking-wider">
                LISTING MANAGEMENT & STATE MACHINE
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-vistara-primary tracking-tight">
              Property Portfolio & Health
            </h1>
            <p className="text-xs text-vistara-secondary mt-1">
              Publish, pause, edit specifications, calibrate pricing, and inspect listing completeness.
            </p>
          </div>

          <Button
            size="sm"
            variant="primary"
            icon={Plus}
            onClick={() => onNavigate('seller-add')}
          >
            + Add New Property
          </Button>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 pt-6 space-y-6">
        
        {/* Filter Pills */}
        <div className="flex items-center gap-2 border-b border-vistara-border pb-3">
          <button
            onClick={() => setActiveFilter('active')}
            className={`px-4 py-2 rounded-xl font-bold transition-all ${
              activeFilter === 'active'
                ? 'bg-[#142334] text-white shadow-subtle'
                : 'bg-vistara-surface text-vistara-secondary border border-vistara-border hover:text-vistara-primary'
            }`}
          >
            Active & Paused ({sellerProps.filter(p => p.sellerStatus === 'Published' || p.sellerStatus === 'Paused').length})
          </button>
          <button
            onClick={() => setActiveFilter('drafts')}
            className={`px-4 py-2 rounded-xl font-bold transition-all ${
              activeFilter === 'drafts'
                ? 'bg-[#142334] text-white shadow-subtle'
                : 'bg-vistara-surface text-vistara-secondary border border-vistara-border hover:text-vistara-primary'
            }`}
          >
            Drafts ({sellerProps.filter(p => p.sellerStatus === 'Draft').length})
          </button>
          <button
            onClick={() => setActiveFilter('archived')}
            className={`px-4 py-2 rounded-xl font-bold transition-all ${
              activeFilter === 'archived'
                ? 'bg-[#142334] text-white shadow-subtle'
                : 'bg-vistara-surface text-vistara-secondary border border-vistara-border hover:text-vistara-primary'
            }`}
          >
            Archived ({sellerProps.filter(p => p.sellerStatus === 'Archived').length})
          </button>
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map(prop => {
            const isPaused = prop.sellerStatus === 'Paused';
            const isPublished = prop.sellerStatus === 'Published';
            const isDraft = prop.sellerStatus === 'Draft';
            const healthScore = prop.listingHealth || 88;

            return (
              <div
                key={prop.id}
                className="p-5 bg-vistara-surface border border-vistara-border rounded-xl shadow-card flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <PropertyImage
                      src={prop.images?.hero || prop.coverImage}
                      propertyName={prop.name}
                      microMarket={prop.microMarket}
                      aspectRatio="aspect-square"
                      className="w-20 h-20 rounded-xl flex-shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${
                          isPublished
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : isPaused
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : isDraft
                            ? 'bg-blue-50 text-blue-700 border border-blue-200'
                            : 'bg-gray-100 text-gray-700'
                        }`}>
                          {isPublished ? 'PUBLISHED' : isPaused ? 'PAUSED' : isDraft ? 'DRAFT' : 'ARCHIVED'}
                        </span>
                        <span className="font-extrabold text-vistara-primary text-base">
                          {prop.priceDisplay}
                        </span>
                      </div>

                      <h3 className="font-extrabold text-vistara-primary text-base mt-1 line-clamp-1">
                        {prop.name}
                      </h3>
                      <p className="text-vistara-secondary text-[11px]">
                        {prop.microMarket} • {prop.bhk} BHK • {prop.area.toLocaleString('en-IN')} sq.ft
                      </p>
                    </div>
                  </div>

                  {/* Interactive Listing Health (Priority 17) */}
                  <div className="mt-4 p-3 bg-vistara-elevated rounded-xl border border-vistara-border space-y-2">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="flex items-center gap-1.5 font-bold text-vistara-primary">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        Listing Health Diagnostic
                      </span>
                      <span className="font-extrabold text-emerald-600">
                        {healthScore}% Complete
                      </span>
                    </div>

                    {prop.missingItems && prop.missingItems.length > 0 ? (
                      <div className="space-y-1 pt-1 border-t border-vistara-border/60">
                        <span className="text-[10px] text-vistara-secondary block font-medium">
                          Opportunities to raise buyer velocity:
                        </span>
                        {prop.missingItems.map((item, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => handleOpenEdit(prop, item)}
                            className="text-[11px] text-amber-700 dark:text-amber-400 font-semibold flex items-center gap-1 hover:underline text-left"
                          >
                            <AlertCircle className="w-3 h-3 text-amber-500 flex-shrink-0" />
                            <span>Missing {item} — Click to complete</span>
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                        <Check className="w-3 h-3" />
                        <span>All architectural CAD & photos verified</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Working Action Buttons (Priority 13 & 14) */}
                <div className="pt-3 border-t border-vistara-border flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    {/* Pause / Reactivate State Machine */}
                    <Button
                      size="sm"
                      variant="secondary"
                      icon={isPaused ? Play : Pause}
                      onClick={() => handleTogglePause(prop.id, prop.sellerStatus)}
                    >
                      {isPaused ? 'Reactivate' : 'Pause'}
                    </Button>

                    {/* Edit Property */}
                    <Button
                      size="sm"
                      variant="secondary"
                      icon={Edit3}
                      onClick={() => handleOpenEdit(prop)}
                    >
                      Edit
                    </Button>

                    {/* Duplicate */}
                    <Button
                      size="sm"
                      variant="ghost"
                      icon={Copy}
                      onClick={() => handleDuplicate(prop)}
                      title="Duplicate as new draft"
                    >
                      Duplicate
                    </Button>

                    {/* Archive */}
                    {prop.sellerStatus !== 'Archived' && (
                      <Button
                        size="sm"
                        variant="ghost"
                        icon={Archive}
                        onClick={() => handleArchive(prop.id)}
                        title="Archive listing"
                      >
                        Archive
                      </Button>
                    )}
                  </div>

                  <Button
                    size="sm"
                    variant="primary"
                    icon={Eye}
                    onClick={() => onSelectProperty(prop.id)}
                  >
                    Public View
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Edit Property Modal (Priority 15 & 16) */}
      {editingProp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-none">
          <div className="bg-vistara-surface border border-vistara-border rounded-2xl p-6 max-w-lg w-full shadow-popover text-xs space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-vistara-border">
              <div>
                <h3 className="font-extrabold text-vistara-primary text-base">
                  Edit Property Specifications
                </h3>
                <p className="text-[11px] text-vistara-secondary mt-0.5">
                  Modifications persist across listings, explore search, and analytics.
                </p>
              </div>
              <button 
                type="button" 
                onClick={() => setEditingProp(null)}
                className="text-vistara-secondary hover:text-vistara-primary"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div>
                <label className="block font-bold text-vistara-primary mb-1">Property Name</label>
                <input
                  type="text"
                  required
                  value={editForm.name}
                  onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full bg-vistara-elevated border border-vistara-border rounded-lg p-2.5 text-vistara-primary font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-vistara-primary mb-1">
                    Asking Price (₹ INR)
                  </label>
                  <input
                    type="number"
                    required
                    step="100000"
                    value={editForm.price}
                    onChange={(e) => setEditForm(prev => ({ ...prev, price: e.target.value }))}
                    className="w-full bg-vistara-elevated border border-vistara-border rounded-lg p-2.5 text-vistara-primary font-bold"
                  />
                  <span className="text-[10px] text-vistara-secondary mt-0.5 block">
                    Lowering price triggers automatic Price Drop alert.
                  </span>
                </div>

                <div>
                  <label className="block font-bold text-vistara-primary mb-1">Super Area (sq.ft)</label>
                  <input
                    type="number"
                    required
                    value={editForm.area}
                    onChange={(e) => setEditForm(prev => ({ ...prev, area: e.target.value }))}
                    className="w-full bg-vistara-elevated border border-vistara-border rounded-lg p-2.5 text-vistara-primary font-semibold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-vistara-primary mb-1">Bedrooms (BHK)</label>
                  <select
                    value={editForm.bhk}
                    onChange={(e) => setEditForm(prev => ({ ...prev, bhk: e.target.value }))}
                    className="w-full bg-vistara-elevated border border-vistara-border rounded-lg p-2.5 text-vistara-primary font-semibold"
                  >
                    <option value={2}>2 BHK</option>
                    <option value={3}>3 BHK</option>
                    <option value={4}>4 BHK</option>
                    <option value={5}>5+ BHK</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-vistara-primary mb-1">Micro-Market</label>
                  <select
                    value={editForm.microMarket}
                    onChange={(e) => setEditForm(prev => ({ ...prev, microMarket: e.target.value }))}
                    className="w-full bg-vistara-elevated border border-vistara-border rounded-lg p-2.5 text-vistara-primary font-semibold"
                  >
                    <option value="Boat Club">Boat Club</option>
                    <option value="OMR - Thoraipakkam">OMR - Thoraipakkam</option>
                    <option value="OMR - Perungudi">OMR - Perungudi</option>
                    <option value="OMR - Sholinganallur">OMR - Sholinganallur</option>
                    <option value="Besant Nagar">Besant Nagar</option>
                    <option value="Adyar">Adyar</option>
                    <option value="ECR">ECR</option>
                    <option value="Poes Garden">Poes Garden</option>
                    <option value="Kotturpuram">Kotturpuram</option>
                    <option value="Anna Nagar">Anna Nagar</option>
                    <option value="Alwarpet">Alwarpet</option>
                    <option value="Nungambakkam">Nungambakkam</option>
                    <option value="Velachery">Velachery</option>
                    <option value="MRC Nagar">MRC Nagar</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-vistara-primary mb-1">Address / Landmark</label>
                <input
                  type="text"
                  value={editForm.location}
                  onChange={(e) => setEditForm(prev => ({ ...prev, location: e.target.value }))}
                  className="w-full bg-vistara-elevated border border-vistara-border rounded-lg p-2.5 text-vistara-primary"
                />
              </div>

              <div>
                <label className="block font-bold text-vistara-primary mb-1">Architectural Story & Daylight Summary</label>
                <textarea
                  rows={3}
                  value={editForm.story}
                  onChange={(e) => setEditForm(prev => ({ ...prev, story: e.target.value }))}
                  className="w-full bg-vistara-elevated border border-vistara-border rounded-lg p-2.5 text-vistara-primary"
                />
              </div>

              <div>
                <label className="block font-bold text-vistara-primary mb-1">Key Amenities (comma-separated)</label>
                <input
                  type="text"
                  value={editForm.amenities}
                  onChange={(e) => setEditForm(prev => ({ ...prev, amenities: e.target.value }))}
                  className="w-full bg-vistara-elevated border border-vistara-border rounded-lg p-2.5 text-vistara-primary"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-vistara-border">
                <Button size="sm" variant="secondary" onClick={() => setEditingProp(null)}>
                  Cancel
                </Button>
                <Button size="sm" variant="primary" type="submit">
                  Save Changes
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
