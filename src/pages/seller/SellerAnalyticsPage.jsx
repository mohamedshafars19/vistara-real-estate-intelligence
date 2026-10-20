import React from 'react';
import { BarChart3, TrendingUp, Users, Eye, Heart, Compass } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

export function SellerAnalyticsPage() {
  const viewsData = [
    { day: 'Mon', views: 240 },
    { day: 'Tue', views: 320 },
    { day: 'Wed', views: 410 },
    { day: 'Thu', views: 390 },
    { day: 'Fri', views: 520 },
    { day: 'Sat', views: 680 },
    { day: 'Sun', views: 740 }
  ];

  return (
    <div className="min-h-screen bg-vistara-bg pb-24 text-vistara-primary text-xs">
      
      {/* Header */}
      <div className="bg-vistara-surface border-b border-vistara-border px-4 sm:px-6 py-6">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <BarChart3 className="w-4 h-4 text-vistara-accent" />
              <span className="text-xs uppercase font-bold text-vistara-accent tracking-wider">
                PERFORMANCE INTELLIGENCE
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-vistara-primary tracking-tight">
              Seller Analytics & Buyer Signals
            </h1>
            <p className="text-xs text-vistara-secondary mt-1">
              Detailed tracking of buyer impressions, saves, spatial tour engagements, and micro-market velocity.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 pt-6 space-y-6">
        
        {/* Weekly Views Chart */}
        <div className="bg-vistara-surface border border-vistara-border rounded-xl p-6 shadow-card space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-vistara-border">
            <h3 className="font-bold text-vistara-primary text-sm">
              7-Day Listing Traffic & 3D Walkthrough Sessions
            </h3>
            <span className="text-emerald-600 font-semibold">+24% vs previous week</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={viewsData}>
                <XAxis dataKey="day" stroke="var(--v-secondary)" fontSize={11} />
                <YAxis stroke="var(--v-secondary)" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: 'var(--v-surface)', borderColor: 'var(--v-border)', fontSize: '11px' }} />
                <Bar dataKey="views" fill="var(--v-accent)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Competitor & Buyer Insights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-vistara-surface border border-vistara-border rounded-xl shadow-card space-y-3">
            <h3 className="font-bold text-vistara-primary text-sm">
              Nearby Micro-Market Competitor Inventory
            </h3>
            <p className="text-vistara-secondary leading-relaxed">
              In OMR Perungudi / Kandanchavadi, there are currently 12 active 3BHK residences. Your residence ranks in the top 8% for verified acoustic insulation and daylight cross-ventilation.
            </p>
            <div className="pt-2 border-t border-vistara-border text-emerald-600 font-semibold">
              Competitor Median Days on Market: 34 Days (Your est: 18 Days)
            </div>
          </div>

          <div className="p-6 bg-vistara-surface border border-vistara-border rounded-xl shadow-card space-y-3">
            <h3 className="font-bold text-vistara-primary text-sm">
              Buyer Amenity Preferences
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Fiber Gigabit Redundancy:</span>
                <strong className="text-vistara-primary">94% Demand</strong>
              </div>
              <div className="flex justify-between">
                <span>Soundproof Glazed Windows:</span>
                <strong className="text-vistara-primary">88% Demand</strong>
              </div>
              <div className="flex justify-between">
                <span>EV Charging Port:</span>
                <strong className="text-vistara-primary">76% Demand</strong>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
