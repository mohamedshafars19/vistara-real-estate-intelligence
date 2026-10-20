import React, { useState } from 'react';
import { 
  Heart, 
  FolderPlus, 
  Scale, 
  Trash2, 
  ArrowRight, 
  TrendingDown, 
  Folder,
  Plus
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { PropertyCard } from '../components/common/PropertyCard';
import { useApp } from '../context/AppContext';

export function SavedPage({ onSelectProperty, onNavigate }) {
  const { properties, savedPropertyIds, collections, setCollections, mode } = useApp();

  const [activeTab, setActiveTab] = useState('all'); // 'all' | collectionId
  const [showNewCollectionModal, setShowNewCollectionModal] = useState(false);
  const [newColName, setNewColName] = useState('');
  const [newColDesc, setNewColDesc] = useState('');

  // Filter saved properties
  const savedProperties = properties.filter(p => savedPropertyIds.includes(p.id));

  // If a specific collection is active, filter by that collection's propertyIds
  const currentCollection = collections.find(c => c.id === activeTab);
  const displayedProperties = activeTab === 'all'
    ? savedProperties
    : properties.filter(p => currentCollection?.propertyIds?.includes(p.id));

  const handleCreateCollection = (e) => {
    e.preventDefault();
    if (!newColName.trim()) return;
    const newCol = {
      id: `col-${Date.now()}`,
      name: newColName,
      description: newColDesc || 'Curated residence collection',
      propertyIds: []
    };
    setCollections(prev => [...prev, newCol]);
    setNewColName('');
    setNewColDesc('');
    setShowNewCollectionModal(false);
    setActiveTab(newCol.id);
  };

  return (
    <div className="min-h-screen bg-vistara-bg pb-24 text-vistara-primary">
      
      {/* Top Header */}
      <div className="bg-vistara-surface border-b border-vistara-border px-4 sm:px-6 py-6">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
              <span className="text-xs uppercase font-bold tracking-wider text-rose-500">
                CURATED WORKSPACE
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-vistara-primary tracking-tight">
              Saved Residences & Collections
            </h1>
            <p className="text-xs text-vistara-secondary mt-1">
              Organize your shortlisted Chennai homes into thematic folders and track price changes.
            </p>
          </div>

          <Button
            size="sm"
            variant="secondary"
            icon={FolderPlus}
            onClick={() => setShowNewCollectionModal(true)}
          >
            Create New Collection
          </Button>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 pt-6 space-y-6">
        
        {/* Collections Tab Bar */}
        <div className="flex flex-wrap items-center gap-2 border-b border-vistara-border pb-3">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${
              activeTab === 'all'
                ? 'bg-[#142334] text-white shadow-subtle'
                : 'bg-vistara-surface text-vistara-secondary hover:text-vistara-primary border border-vistara-border'
            }`}
          >
            All Saved ({savedProperties.length})
          </button>

          {collections.map(col => (
            <button
              key={col.id}
              onClick={() => setActiveTab(col.id)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors ${
                activeTab === col.id
                  ? 'bg-[#142334] text-white shadow-subtle'
                  : 'bg-vistara-surface text-vistara-secondary hover:text-vistara-primary border border-vistara-border'
              }`}
            >
              <Folder className="w-3.5 h-3.5" />
              <span>{col.name}</span>
              <span className="opacity-70">({col.propertyIds.length})</span>
            </button>
          ))}
        </div>

        {/* Collection Description if selected */}
        {currentCollection && (
          <div className="p-3 bg-vistara-surface border border-vistara-border rounded-lg text-xs text-vistara-secondary">
            <span className="font-bold text-vistara-primary">{currentCollection.name}: </span>
            {currentCollection.description}
          </div>
        )}

        {/* Properties Grid */}
        {displayedProperties.length === 0 ? (
          <div className="p-12 text-center bg-vistara-surface border border-vistara-border rounded-xl">
            <Heart className="w-12 h-12 text-vistara-muted mx-auto mb-3" />
            <h4 className="font-bold text-vistara-primary text-base">No Residences in this View</h4>
            <p className="text-xs text-vistara-secondary max-w-sm mx-auto mt-1 mb-4">
              Explore matching residences and save them with the heart icon to compile your personal portfolio.
            </p>
            <Button size="sm" variant="primary" onClick={() => onNavigate('explore')}>
              Explore Homes
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayedProperties.map(property => (
              <PropertyCard
                key={property.id}
                property={property}
                onSelect={(id) => onSelectProperty(id)}
              />
            ))}
          </div>
        )}

      </div>

      {/* New Collection Modal */}
      {showNewCollectionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
          <div className="bg-vistara-surface border border-vistara-border rounded-xl p-6 max-w-md w-full shadow-popover text-xs">
            <h3 className="text-base font-bold text-vistara-primary mb-1">
              Create New Collection
            </h3>
            <p className="text-vistara-secondary mb-4">
              e.g. "Weekend Retreats", "High Internet Speed for WFH", "Walking Distance to Elliot’s Beach"
            </p>

            <form onSubmit={handleCreateCollection} className="space-y-4">
              <div>
                <label className="block font-semibold text-vistara-primary mb-1">Collection Name</label>
                <input
                  type="text"
                  required
                  value={newColName}
                  onChange={(e) => setNewColName(e.target.value)}
                  placeholder="e.g. Quiet OMR Sanctuaries"
                  className="w-full bg-vistara-elevated border border-vistara-border rounded p-2 text-vistara-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-vistara-primary mb-1">Description (Optional)</label>
                <input
                  type="text"
                  value={newColDesc}
                  onChange={(e) => setNewColDesc(e.target.value)}
                  placeholder="Brief context on criteria for this folder..."
                  className="w-full bg-vistara-elevated border border-vistara-border rounded p-2 text-vistara-primary focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button size="sm" variant="secondary" onClick={() => setShowNewCollectionModal(false)}>
                  Cancel
                </Button>
                <Button size="sm" variant="primary" type="submit">
                  Create Folder
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
