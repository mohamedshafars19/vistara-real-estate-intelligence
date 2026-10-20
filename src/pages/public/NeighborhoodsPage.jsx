import React, { useState } from 'react';
import { MapPin, Compass, ArrowRight, Sun, VolumeX, Trees } from 'lucide-react';
import { ChennaiMap } from '../../components/common/ChennaiMap';
import { useApp } from '../../context/AppContext';

export function NeighborhoodsPage({ onNavigate }) {
  const { properties } = useApp();

  const [selectedMarket, setSelectedMarket] = useState('All');

  const microMarketData = [
    {
      name: 'Boat Club',
      desc: 'Exclusive, historic ultra-low-density riverside enclave characterized by heritage rain tree canopies and total acoustic stillness.',
      avgRate: '₹35,000 / sq.ft',
      quietIndex: 96,
      canopy: '68%'
    },
    {
      name: 'Besant Nagar',
      desc: 'Vibrant coastal neighborhood where café culture and beach promenades meet serene residential avenues.',
      avgRate: '₹20,000 / sq.ft',
      quietIndex: 88,
      canopy: '54%'
    },
    {
      name: 'Adyar',
      desc: 'Cultural heart of South Chennai, bordered by the river estuary and premier educational institutions.',
      avgRate: '₹21,500 / sq.ft',
      quietIndex: 94,
      canopy: '65%'
    },
    {
      name: 'OMR - Thoraipakkam & Perungudi',
      desc: 'High-tech residential corridor offering contemporary apartments, fiber redundancy, and optimal commute times to IT parks.',
      avgRate: '₹7,800 / sq.ft',
      quietIndex: 82,
      canopy: '32%'
    },
    {
      name: 'ECR (East Coast Road)',
      desc: 'Seaside pavilion living with open sky, sea horizons, and breezy private gardens.',
      avgRate: '₹18,500 / sq.ft',
      quietIndex: 92,
      canopy: '58%'
    },
    {
      name: 'Anna Nagar',
      desc: 'Planned tree-lined residential sanctuary with Tower Park, wide avenues, and strong community infrastructure.',
      avgRate: '₹16,500 / sq.ft',
      quietIndex: 84,
      canopy: '48%'
    }
  ];

  return (
    <div className="min-h-screen bg-vistara-bg pb-24 text-vistara-primary text-xs">
      
      {/* Header */}
      <section className="bg-vistara-surface border-b border-vistara-border py-16 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <span className="text-xs uppercase font-bold tracking-wider text-vistara-accent">
            GEOGRAPHIC SPATIAL INTELLIGENCE
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-vistara-primary mt-2 mb-3">
            Chennai Micro-Markets & Enclaves
          </h1>
          <p className="text-sm text-vistara-secondary leading-relaxed">
            From the riverside stillness of Boat Club to the tech-connected expressways of OMR and breezy shorelines of ECR.
          </p>
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[650px]">
          
          {/* Left Column: Micro-Market Dossiers */}
          <div className="lg:col-span-5 h-full overflow-y-auto space-y-4 pr-1">
            {microMarketData.map(market => (
              <div
                key={market.name}
                className="p-5 bg-vistara-surface border border-vistara-border rounded-xl shadow-card hover:border-vistara-accent transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-vistara-primary text-base flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-vistara-accent" />
                    {market.name}
                  </h3>
                  <span className="font-mono text-xs font-bold text-vistara-accent">
                    {market.avgRate}
                  </span>
                </div>

                <p className="text-vistara-secondary text-xs leading-relaxed mb-4">
                  {market.desc}
                </p>

                <div className="grid grid-cols-2 gap-2 pt-3 border-t border-vistara-border/60 text-[11px]">
                  <div className="flex items-center gap-1.5 text-vistara-secondary">
                    <VolumeX className="w-3.5 h-3.5 text-vistara-accent" />
                    <span>Quiet: <strong>{market.quietIndex}/100</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5 text-vistara-secondary">
                    <Trees className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Tree Canopy: <strong>{market.canopy}</strong></span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Chennai Interactive Map */}
          <div className="lg:col-span-7 h-full rounded-xl overflow-hidden border border-vistara-border shadow-card">
            <ChennaiMap
              properties={properties}
              onSelectProperty={() => onNavigate('login')}
            />
          </div>

        </div>
      </section>

    </div>
  );
}
