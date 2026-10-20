import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  CheckCircle2, 
  ArrowUpRight, 
  Compass, 
  DollarSign, 
  Calendar,
  Layers,
  Award
} from 'lucide-react';
import { Button } from '../../components/common/Button';

export function AgentAnalyticsPage({ onNavigate }) {
  const funnelSteps = [
    { label: 'Portal Inquiries & Leads', count: 48, pct: '100%', sub: 'Direct from Vistara verified listings' },
    { label: 'Life Profile Qualified', count: 34, pct: '70.8%', sub: 'Budget & acoustic tolerance documented' },
    { label: 'Dynamic Matches Shortlisted', count: 26, pct: '76.5%', sub: 'Client accepted AI-assisted recommendation' },
    { label: 'Private Walkthroughs', count: 18, pct: '69.2%', sub: 'Daylight & floor plan verified in person' },
    { label: 'Offers / Term Sheets', count: 9, pct: '50.0%', sub: 'Legal checks & pricing negotiation' },
    { label: 'Closed Transactions', count: 6, pct: '66.7%', sub: '₹14.8 Cr cumulative volume' }
  ];

  const microMarketData = [
    { name: 'OMR Corridor', avgPrice: '₹8,450/sq.ft', daysOnMarket: '24 days', demand: '+18% MoM', leadType: 'Tech Professionals' },
    { name: 'Boat Club & Poes Garden', avgPrice: '₹32,500/sq.ft', daysOnMarket: '68 days', demand: 'Stable', leadType: 'HNW Founders / Legacy' },
    { name: 'Besant Nagar Coastal', avgPrice: '₹19,200/sq.ft', daysOnMarket: '18 days', demand: '+14% MoM', leadType: 'Creative & Expat Renters' },
    { name: 'Adyar / Kotturpuram', avgPrice: '₹17,800/sq.ft', daysOnMarket: '32 days', demand: '+9% MoM', leadType: 'Senior Executives' }
  ];

  return (
    <div className="min-h-screen bg-vistara-bg pb-24 text-vistara-primary">
      
      {/* Top Header */}
      <div className="bg-vistara-surface border-b border-vistara-border px-4 sm:px-6 py-6">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <BarChart3 className="w-4 h-4 text-vistara-accent" />
              <span className="text-xs uppercase font-bold tracking-wider text-vistara-accent">
                AGENCY INTELLIGENCE & PRODUCTION
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-vistara-primary tracking-tight">
              Conversion Tracking & Territory Reports
            </h1>
            <p className="text-xs text-vistara-secondary mt-1">
              Analyze matchmaking velocity, tour-to-close ratios, and Chennai micro-market capital yields.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="primary"
              onClick={() => onNavigate('agent-matches')}
            >
              Open Match Engine
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 pt-6 space-y-6">
        
        {/* KPI Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-vistara-surface border border-vistara-border rounded-xl shadow-card">
            <span className="text-xs text-vistara-secondary">Total Closed Volume</span>
            <div className="text-2xl font-extrabold text-vistara-primary mt-0.5">₹14.8 Cr</div>
            <div className="text-[11px] text-emerald-600 font-medium flex items-center gap-1 mt-1">
              <ArrowUpRight className="w-3.5 h-3.5" /> +24% vs Last Quarter
            </div>
          </div>

          <div className="p-4 bg-vistara-surface border border-vistara-border rounded-xl shadow-card">
            <span className="text-xs text-vistara-secondary">Agency Commission</span>
            <div className="text-2xl font-extrabold text-vistara-accent mt-0.5">₹29.6 L</div>
            <div className="text-[11px] text-vistara-secondary mt-1">2% average fee structure</div>
          </div>

          <div className="p-4 bg-vistara-surface border border-vistara-border rounded-xl shadow-card">
            <span className="text-xs text-vistara-secondary">Average Match-to-Offer</span>
            <div className="text-2xl font-extrabold text-vistara-primary mt-0.5">14.2 Days</div>
            <div className="text-[11px] text-emerald-600 font-medium mt-1">3x faster than traditional brokers</div>
          </div>

          <div className="p-4 bg-vistara-surface border border-vistara-border rounded-xl shadow-card">
            <span className="text-xs text-vistara-secondary">Recommendation Accuracy</span>
            <div className="text-2xl font-extrabold text-vistara-primary mt-0.5">87.4%</div>
            <div className="text-[11px] text-blue-500 font-medium mt-1">Clients rated match "Spot On"</div>
          </div>
        </div>

        {/* Conversion Funnel */}
        <div className="p-6 bg-vistara-surface border border-vistara-border rounded-xl shadow-card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-vistara-primary">Match-to-Close Conversion Funnel</h2>
              <p className="text-xs text-vistara-secondary">How buyer Life Profiles convert through to registered title deeds</p>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-600">Overall Win Rate: 12.5%</span>
          </div>

          <div className="space-y-3">
            {funnelSteps.map((step, idx) => (
              <div key={step.label} className="p-3 rounded-lg bg-vistara-elevated border border-vistara-border">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-vistara-primary text-vistara-surface text-[10px] font-bold flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <span className="font-bold text-vistara-primary">{step.label}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-vistara-secondary font-mono">{step.count} deals</span>
                    <span className="px-2 py-0.5 rounded bg-vistara-surface font-bold text-[10px] text-vistara-accent">
                      {step.pct}
                    </span>
                  </div>
                </div>

                <div className="w-full bg-vistara-border h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-vistara-primary h-full rounded-full transition-all"
                    style={{ width: step.pct }}
                  />
                </div>
                <div className="text-[10px] text-vistara-secondary mt-1">
                  {step.sub}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Territory Benchmark Table */}
        <div className="p-6 bg-vistara-surface border border-vistara-border rounded-xl shadow-card">
          <h2 className="text-base font-bold text-vistara-primary mb-1">Chennai Territory Production Benchmarks</h2>
          <p className="text-xs text-vistara-secondary mb-4">Pricing velocity and predominant buyer personas across key corridors</p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-vistara-border text-vistara-secondary uppercase text-[10px]">
                  <th className="pb-2.5 font-bold">Micro-Market</th>
                  <th className="pb-2.5 font-bold">Avg. Price / Sq.Ft</th>
                  <th className="pb-2.5 font-bold">Days on Market</th>
                  <th className="pb-2.5 font-bold">Monthly Velocity</th>
                  <th className="pb-2.5 font-bold">Primary Buyer Persona</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-vistara-border/60">
                {microMarketData.map(d => (
                  <tr key={d.name} className="hover:bg-vistara-elevated/40">
                    <td className="py-3 font-bold text-vistara-primary">{d.name}</td>
                    <td className="py-3 font-mono text-vistara-accent font-semibold">{d.avgPrice}</td>
                    <td className="py-3 text-vistara-secondary">{d.daysOnMarket}</td>
                    <td className="py-3 font-bold text-emerald-600">{d.demand}</td>
                    <td className="py-3 text-vistara-secondary">{d.leadType}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </div>
  );
}
