import React, { useState } from 'react';
import { DollarSign, TrendingUp, Sliders, Check, Download, AlertCircle, Building, TrendingDown } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { useApp } from '../../context/AppContext';

export function SellerPricingPage({ onNavigate }) {
  const { properties, updatePropertyPrice } = useApp();

  const [selectedPropId, setSelectedPropId] = useState(properties[1]?.id || properties[0]?.id || 'vis-che-02');
  const targetProp = properties.find(p => p.id === selectedPropId) || properties[0];

  const currentPriceCrores = targetProp ? targetProp.price / 10000000 : 1.45;
  const [askingPriceCrores, setAskingPriceCrores] = useState(currentPriceCrores);
  const [propertyAreaSqFt, setPropertyAreaSqFt] = useState(targetProp ? targetProp.area : 1680);

  const [appliedNotice, setAppliedNotice] = useState('');

  const calculatedRate = Math.round((askingPriceCrores * 10000000) / propertyAreaSqFt);
  const neighborhoodMedian = 7850;
  const variancePercent = Math.round(((calculatedRate - neighborhoodMedian) / neighborhoodMedian) * 100);

  const isPriceDecreased = (askingPriceCrores * 10000000) < targetProp.price;
  const diffLakhs = Math.abs(Math.round(((askingPriceCrores * 10000000) - targetProp.price) / 100000));

  const handleApplyPrice = () => {
    const newPriceVal = Math.round(askingPriceCrores * 10000000);
    updatePropertyPrice(targetProp.id, newPriceVal);

    setAppliedNotice(
      `Asking price for ${targetProp.name} updated to ₹${askingPriceCrores.toFixed(2)} Cr! ${
        isPriceDecreased ? `Generated automated Price Drop signal (₹${diffLakhs}L lower).` : ''
      }`
    );
    setTimeout(() => setAppliedNotice(''), 4000);
  };

  const handleSelectProperty = (id) => {
    setSelectedPropId(id);
    const prop = properties.find(p => p.id === id);
    if (prop) {
      setAskingPriceCrores(prop.price / 10000000);
      setPropertyAreaSqFt(prop.area);
    }
  };

  return (
    <div className="min-h-screen bg-vistara-bg pb-24 text-vistara-primary text-xs">
      
      {/* Toast Notification */}
      {appliedNotice && (
        <div className="fixed top-20 right-6 z-50 bg-[#142334] text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-emerald-500 animate-fade-in font-semibold">
          <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>{appliedNotice}</span>
        </div>
      )}

      {/* Header */}
      <div className="bg-vistara-surface border-b border-vistara-border px-4 sm:px-6 py-6">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <DollarSign className="w-4 h-4 text-emerald-600" />
              <span className="text-xs uppercase font-extrabold text-emerald-600 tracking-wider">
                PRICING VALUATION LAB
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-vistara-primary tracking-tight">
              Pricing Simulator & Fair Price Calibration
            </h1>
            <p className="text-xs text-vistara-secondary mt-1">
              Stress-test asking prices, track price history revisions, and generate price-drop alerts.
            </p>
          </div>

          <Button
            size="sm"
            variant="secondary"
            icon={Download}
            onClick={() => window.print()}
          >
            Export Pricing Report
          </Button>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 pt-6 space-y-6">
        
        {/* Residence Selector */}
        <div className="p-4 bg-vistara-surface border border-vistara-border rounded-xl shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 font-bold text-vistara-primary">
            <Building className="w-4 h-4 text-vistara-accent" />
            <span>Select Listing to Calibrate:</span>
          </div>

          <select
            value={selectedPropId}
            onChange={(e) => handleSelectProperty(e.target.value)}
            className="bg-vistara-elevated border border-vistara-border rounded-lg px-3 py-2 text-vistara-primary font-bold focus:outline-none"
          >
            {properties.map(p => (
              <option key={p.id} value={p.id}>
                {p.name} — Current: {p.priceDisplay} ({p.microMarket})
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Sliders & Controls */}
          <div className="lg:col-span-7 bg-vistara-surface border border-vistara-border rounded-xl p-6 shadow-card space-y-6">
            <div className="flex items-center justify-between border-b border-vistara-border pb-3">
              <h3 className="font-bold text-vistara-primary text-base">
                Asking Price Stress-Testing
              </h3>
              <span className="text-[11px] text-vistara-secondary">
                Current Live: <strong className="text-vistara-primary">{targetProp.priceDisplay}</strong>
              </span>
            </div>

            <div>
              <div className="flex justify-between font-semibold text-vistara-primary mb-1">
                <span>Proposed Asking Price</span>
                <div className="text-right">
                  <span className="font-extrabold text-vistara-accent text-base">
                    ₹{askingPriceCrores.toFixed(2)} Cr
                  </span>
                  {isPriceDecreased && (
                    <span className="text-emerald-600 font-bold text-xs ml-2">
                      (₹{diffLakhs}L Price Drop)
                    </span>
                  )}
                </div>
              </div>
              <input
                type="range"
                min="0.5"
                max="25.0"
                step="0.05"
                value={askingPriceCrores}
                onChange={(e) => setAskingPriceCrores(parseFloat(e.target.value))}
                className="w-full h-2 bg-vistara-elevated rounded-lg appearance-none accent-vistara-accent cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between font-semibold text-vistara-primary mb-1">
                <span>Super Built-up Area</span>
                <span className="font-bold text-vistara-primary">{propertyAreaSqFt} sq.ft</span>
              </div>
              <input
                type="range"
                min="800"
                max="6000"
                step="50"
                value={propertyAreaSqFt}
                onChange={(e) => setPropertyAreaSqFt(parseInt(e.target.value, 10))}
                className="w-full h-2 bg-vistara-elevated rounded-lg appearance-none accent-vistara-accent cursor-pointer"
              />
            </div>

            <div className="p-4 bg-vistara-elevated rounded-xl border border-vistara-border leading-relaxed space-y-2">
              <div className="font-bold text-vistara-primary text-xs flex items-center justify-between">
                <span>Fair Price Meter Diagnostic</span>
                <span className={`font-bold px-2 py-0.5 rounded text-[10px] ${
                  variancePercent <= 5 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {variancePercent <= 5 ? 'Fairly Priced' : `${variancePercent}% Above Median`}
                </span>
              </div>
              <p className="text-vistara-secondary text-[11px]">
                At <strong>₹{calculatedRate.toLocaleString('en-IN')}/sq.ft</strong>, this asking price aligns with top tier construction in {targetProp.microMarket}. Estimated buyer absorption cycle: 14 to 21 Days.
              </p>
            </div>

            {/* Price Revision History */}
            {targetProp.priceHistory && targetProp.priceHistory.length > 0 && (
              <div className="pt-2">
                <span className="text-[11px] font-bold text-vistara-primary block mb-2">
                  Recorded Price Revision History:
                </span>
                <div className="space-y-1.5">
                  {targetProp.priceHistory.map((h, i) => (
                    <div key={i} className="p-2 bg-vistara-elevated rounded-lg border border-vistara-border/60 flex justify-between text-[11px]">
                      <span className="text-vistara-secondary font-mono">{h.date}</span>
                      <span className="text-vistara-muted line-through">₹{(h.oldPrice / 10000000).toFixed(2)} Cr</span>
                      <span className="font-bold text-emerald-600">→ ₹{(h.newPrice / 10000000).toFixed(2)} Cr</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: Comp Benchmarks & Apply Action */}
          <div className="lg:col-span-5 bg-vistara-surface border border-vistara-border rounded-xl p-6 shadow-card space-y-4">
            <h3 className="font-bold text-vistara-primary text-base">
              Micro-Market Valuation Comp
            </h3>

            <div className="space-y-3">
              <div className="p-3 bg-vistara-elevated rounded-xl border border-vistara-border flex justify-between">
                <span className="text-vistara-secondary">Micro-Market:</span>
                <strong className="text-vistara-primary">{targetProp.microMarket}</strong>
              </div>
              <div className="p-3 bg-vistara-elevated rounded-xl border border-vistara-border flex justify-between">
                <span className="text-vistara-secondary">Current Listed Price:</span>
                <strong className="text-vistara-primary">{targetProp.priceDisplay}</strong>
              </div>
              <div className="p-3 bg-vistara-elevated rounded-xl border border-vistara-border flex justify-between">
                <span className="text-vistara-secondary">Proposed Calibration:</span>
                <strong className="text-vistara-accent">₹{askingPriceCrores.toFixed(2)} Cr</strong>
              </div>
              <div className="p-3 bg-vistara-elevated rounded-xl border border-vistara-border flex justify-between">
                <span className="text-vistara-secondary">Fair Price Benchmark:</span>
                <strong className="text-emerald-600">₹7,400 - ₹8,400 / sq.ft</strong>
              </div>
            </div>

            <Button
              size="md"
              variant="primary"
              className="w-full mt-4"
              onClick={handleApplyPrice}
            >
              Apply Price Update to Active Listing
            </Button>
          </div>

        </div>

      </div>

    </div>
  );
}
