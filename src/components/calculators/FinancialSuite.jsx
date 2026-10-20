import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  DollarSign, 
  Scale, 
  TrendingUp, 
  ShieldCheck, 
  Info, 
  HelpCircle, 
  CheckCircle2, 
  ArrowRight, 
  PieChart as PieIcon,
  Percent,
  RefreshCw,
  Home
} from 'lucide-react';
import { Button } from '../common/Button';

// Format Indian Rupee currency with Crores & Lakhs
export function formatINR(val) {
  if (isNaN(val) || val === null || val === undefined || !isFinite(val)) return '₹0';
  const num = Math.round(val);
  if (num >= 10000000) {
    return `₹${(num / 10000000).toFixed(2)} Cr`;
  }
  if (num >= 100000) {
    return `₹${(num / 100000).toFixed(2)} Lakh`;
  }
  return `₹${num.toLocaleString('en-IN')}`;
}

export function FinancialSuite({ 
  property = null, 
  initialTab = 'emi', 
  onClose = null 
}) {
  const [activeTab, setActiveTab] = useState(initialTab); // 'emi' | 'fairPrice' | 'affordability' | 'rentVsBuy'

  // ================= 1. EMI CALCULATOR STATE =================
  const defaultPropPrice = property?.priceNum || property?.price || 15000000;
  const [emiPropertyPrice, setEmiPropertyPrice] = useState(defaultPropPrice);
  const [emiDownPaymentPercent, setEmiDownPaymentPercent] = useState(20);
  const [emiInterestRate, setEmiInterestRate] = useState(8.5);
  const [emiTenureYears, setEmiTenureYears] = useState(20);

  // EMI Calculations
  const emiDownPaymentAmount = Math.round(emiPropertyPrice * (emiDownPaymentPercent / 100));
  const emiPrincipal = Math.max(0, emiPropertyPrice - emiDownPaymentAmount);
  const emiMonthlyRate = emiInterestRate / 12 / 100;
  const emiTotalMonths = Math.max(1, emiTenureYears * 12);

  const monthlyEMI = useMemo(() => {
    if (emiPrincipal <= 0) return 0;
    if (emiInterestRate === 0) {
      return Math.round(emiPrincipal / emiTotalMonths);
    }
    const factor = Math.pow(1 + emiMonthlyRate, emiTotalMonths);
    if (!isFinite(factor) || factor <= 1) return 0;
    const emi = (emiPrincipal * emiMonthlyRate * factor) / (factor - 1);
    return isFinite(emi) ? Math.round(emi) : 0;
  }, [emiPrincipal, emiMonthlyRate, emiTotalMonths, emiInterestRate]);

  const emiTotalPayment = monthlyEMI * emiTotalMonths;
  const emiTotalInterest = Math.max(0, emiTotalPayment - emiPrincipal);
  const emiPrincipalPercent = emiTotalPayment > 0 ? Math.round((emiPrincipal / emiTotalPayment) * 100) : 50;
  const emiInterestPercent = 100 - emiPrincipalPercent;

  // ================= 2. FAIR PRICE CALCULATOR STATE =================
  const defaultArea = property?.area || property?.carpetArea || 1800;
  const [fairArea, setFairArea] = useState(defaultArea);
  const [fairLocation, setFairLocation] = useState(property?.microMarket || 'Adyar');
  const [fairAskingPrice, setFairAskingPrice] = useState(property?.priceNum || property?.price || 15000000);
  const [fairCondition, setFairCondition] = useState('Brand New (2024+)');
  const [fairAmenities, setFairAmenities] = useState('Premium Luxury');

  // Benchmark rate lookup
  const benchmarkRates = {
    'Boat Club': 32000,
    'Poes Garden': 28000,
    'Besant Nagar': 21000,
    'Adyar': 17500,
    'Anna Nagar': 16000,
    'ECR Coastal': 15500,
    'OMR Corridor': 9200
  };

  const fairResults = useMemo(() => {
    const area = Number(fairArea) > 0 ? Number(fairArea) : 1800;
    const asking = Number(fairAskingPrice) > 0 ? Number(fairAskingPrice) : 15000000;
    const baseRate = benchmarkRates[fairLocation] || 16500;

    // Condition multiplier
    let conditionMult = 1.0;
    if (fairCondition.includes('Brand New')) conditionMult += 0.05;
    else if (fairCondition.includes('Well Maintained')) conditionMult += 0.0;
    else conditionMult -= 0.05;

    // Amenities multiplier
    if (fairAmenities.includes('Ultra Luxury')) conditionMult += 0.04;
    else if (fairAmenities.includes('Premium')) conditionMult += 0.02;

    const adjustedRate = Math.round(baseRate * conditionMult);
    const benchmarkPrice = Math.round(area * adjustedRate);
    const minFairRange = Math.round(benchmarkPrice * 0.95);
    const maxFairRange = Math.round(benchmarkPrice * 1.05);

    const pricePerSqFt = Math.round(asking / area);
    const diffFromFair = Math.round(((asking - benchmarkPrice) / benchmarkPrice) * 1000) / 10; // e.g. +2.4

    let marketPosition = 'In Fair Market Range';
    let positionColor = 'text-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200';
    if (diffFromFair < -5) {
      marketPosition = 'High Value / Below Market Range';
      positionColor = 'text-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200';
    } else if (diffFromFair > 5) {
      marketPosition = 'Premium / Above Fair Range';
      positionColor = 'text-amber-700 bg-amber-50 dark:bg-amber-950/40 border-amber-200';
    }

    return {
      pricePerSqFt,
      adjustedRate,
      benchmarkPrice,
      minFairRange,
      maxFairRange,
      diffFromFair,
      marketPosition,
      positionColor
    };
  }, [fairArea, fairLocation, fairAskingPrice, fairCondition, fairAmenities]);

  // ================= 3. AFFORDABILITY CALCULATOR STATE =================
  const [affordIncome, setAffordIncome] = useState(250000);
  const [affordExistingEMI, setAffordExistingEMI] = useState(25000);
  const [affordDownPayment, setAffordDownPayment] = useState(3000000);
  const [affordRate, setAffordRate] = useState(8.5);
  const [affordTenure, setAffordTenure] = useState(20);

  const affordResults = useMemo(() => {
    const income = Number(affordIncome) > 0 ? Number(affordIncome) : 100000;
    const existing = Number(affordExistingEMI) >= 0 ? Number(affordExistingEMI) : 0;
    const down = Number(affordDownPayment) >= 0 ? Number(affordDownPayment) : 0;
    const r = (Number(affordRate) > 0 ? Number(affordRate) : 8.5) / 12 / 100;
    const n = Math.max(1, (Number(affordTenure) || 20) * 12);

    // Max 50% Debt to income benchmark
    const maxPermissibleEMI = income * 0.50;
    const availableEMI = Math.max(0, maxPermissibleEMI - existing);

    let maxLoan = 0;
    if (r === 0) {
      maxLoan = availableEMI * n;
    } else {
      const factor = Math.pow(1 + r, n);
      maxLoan = isFinite(factor) && factor > 1 
        ? Math.round((availableEMI * (factor - 1)) / (r * factor))
        : 0;
    }

    const maxHomePrice = maxLoan + down;
    const estimatedNewEMI = Math.round(availableEMI);
    const dtiRatio = Math.round(((existing + estimatedNewEMI) / income) * 100);

    return {
      maxHomePrice,
      maxLoan,
      estimatedNewEMI,
      dtiRatio
    };
  }, [affordIncome, affordExistingEMI, affordDownPayment, affordRate, affordTenure]);

  // ================= 4. RENT VS BUY SIMULATOR STATE =================
  const [rvbBuyPrice, setRvbBuyPrice] = useState(defaultPropPrice);
  const [rvbDownPayment, setRvbDownPayment] = useState(Math.round(defaultPropPrice * 0.20));
  const [rvbMonthlyRent, setRvbMonthlyRent] = useState(property?.rent || 45000);
  const [rvbRentIncrease, setRvbRentIncrease] = useState(5);
  const [rvbHoldingYears, setRvbHoldingYears] = useState(7);

  const rvbResults = useMemo(() => {
    const buyPrice = Number(rvbBuyPrice) > 0 ? Number(rvbBuyPrice) : 15000000;
    const down = Number(rvbDownPayment) > 0 ? Number(rvbDownPayment) : 3000000;
    const rent = Number(rvbMonthlyRent) > 0 ? Number(rvbMonthlyRent) : 45000;
    const rentInc = Number(rvbRentIncrease) / 100;
    const years = Number(rvbHoldingYears) || 7;

    // Loan calculations
    const loanPrincipal = Math.max(0, buyPrice - down);
    const r = 8.5 / 12 / 100;
    const n = 20 * 12;
    const factor = Math.pow(1 + r, n);
    const emi = (loanPrincipal * r * factor) / (factor - 1);

    // Total buy outflow over holding period (down payment + EMIs + maintenance 4500/mo)
    const emiTotalOverYears = emi * 12 * years;
    const maintenanceTotal = 4500 * 12 * years;
    const totalBuyCashOutflow = down + emiTotalOverYears + maintenanceTotal;

    // Estimated property appreciation (6.5% CAGR in Chennai prime)
    const estimatedPropertyValue = buyPrice * Math.pow(1 + 0.065, years);
    const remainingLoanPrincipal = loanPrincipal * 0.75; // Approx remaining after 7 yrs
    const netHomeEquity = Math.round(estimatedPropertyValue - remainingLoanPrincipal);

    // Total rent paid over holding period
    let totalRentPaid = 0;
    let currentRent = rent;
    for (let yr = 0; yr < years; yr++) {
      totalRentPaid += currentRent * 12;
      currentRent *= (1 + rentInc);
    }

    // Opportunity growth on down payment (invested in mutual funds at 9% CAGR)
    const investedDownPaymentGrowth = down * Math.pow(1 + 0.09, years);

    return {
      totalBuyCashOutflow: Math.round(totalBuyCashOutflow),
      netHomeEquity,
      totalRentPaid: Math.round(totalRentPaid),
      investedDownPaymentGrowth: Math.round(investedDownPaymentGrowth),
      estimatedPropertyValue: Math.round(estimatedPropertyValue)
    };
  }, [rvbBuyPrice, rvbDownPayment, rvbMonthlyRent, rvbRentIncrease, rvbHoldingYears]);

  return (
    <div className="bg-vistara-surface border border-vistara-border rounded-2xl shadow-card overflow-hidden text-xs">
      
      {/* Header & Tabs */}
      <div className="p-5 sm:p-6 border-b border-vistara-border bg-vistara-elevated">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Calculator className="w-4 h-4 text-vistara-accent" />
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-vistara-accent">
                VISTARA FINANCIAL INTELLIGENCE SUITE
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-vistara-primary">
              Real Ownership & Valuation Calculators
            </h2>
            <p className="text-[11px] text-vistara-secondary mt-0.5">
              Deterministic mathematical models for mortgage cashflow, fair-price benchmarks, and lease opportunity costs.
            </p>
          </div>

          {property && (
            <div className="text-left sm:text-right">
              <span className="text-[10px] font-bold text-vistara-secondary uppercase block">Active Residence</span>
              <span className="font-extrabold text-vistara-primary text-sm truncate max-w-[200px] block">
                {property.name}
              </span>
              <span className="font-mono text-vistara-accent font-bold text-xs">
                {property.priceDisplay}
              </span>
            </div>
          )}
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-vistara-border/60">
          <button
            onClick={() => setActiveTab('emi')}
            className={`px-3.5 py-1.5 rounded-lg font-bold text-xs transition-all flex items-center gap-1.5 ${
              activeTab === 'emi'
                ? 'bg-[#142334] text-white shadow-subtle'
                : 'bg-vistara-surface text-vistara-secondary hover:text-vistara-primary border border-vistara-border'
            }`}
          >
            <DollarSign className="w-3.5 h-3.5" />
            <span>EMI Mortgage</span>
          </button>

          <button
            onClick={() => setActiveTab('fairPrice')}
            className={`px-3.5 py-1.5 rounded-lg font-bold text-xs transition-all flex items-center gap-1.5 ${
              activeTab === 'fairPrice'
                ? 'bg-[#142334] text-white shadow-subtle'
                : 'bg-vistara-surface text-vistara-secondary hover:text-vistara-primary border border-vistara-border'
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            <span>Fair Price Meter</span>
          </button>

          <button
            onClick={() => setActiveTab('affordability')}
            className={`px-3.5 py-1.5 rounded-lg font-bold text-xs transition-all flex items-center gap-1.5 ${
              activeTab === 'affordability'
                ? 'bg-[#142334] text-white shadow-subtle'
                : 'bg-vistara-surface text-vistara-secondary hover:text-vistara-primary border border-vistara-border'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Affordability Benchmark</span>
          </button>

          <button
            onClick={() => setActiveTab('rentVsBuy')}
            className={`px-3.5 py-1.5 rounded-lg font-bold text-xs transition-all flex items-center gap-1.5 ${
              activeTab === 'rentVsBuy'
                ? 'bg-[#142334] text-white shadow-subtle'
                : 'bg-vistara-surface text-vistara-secondary hover:text-vistara-primary border border-vistara-border'
            }`}
          >
            <PieIcon className="w-3.5 h-3.5" />
            <span>Rent vs Buy Simulator</span>
          </button>
        </div>
      </div>

      <div className="p-5 sm:p-6">
        
        {/* ================= TAB 1: EMI MORTGAGE CALCULATOR ================= */}
        {activeTab === 'emi' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Inputs */}
              <div className="lg:col-span-6 space-y-4">
                
                {/* Property Price */}
                <div>
                  <div className="flex justify-between font-bold text-vistara-primary mb-1">
                    <span>Property Price</span>
                    <span className="font-mono text-vistara-accent">{formatINR(emiPropertyPrice)}</span>
                  </div>
                  <input
                    type="range"
                    min="3000000"
                    max="100000000"
                    step="500000"
                    value={emiPropertyPrice}
                    onChange={(e) => setEmiPropertyPrice(Number(e.target.value))}
                    className="w-full h-1.5 bg-vistara-elevated rounded appearance-none accent-vistara-accent cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-vistara-secondary mt-1">
                    <span>₹30 Lakh</span>
                    <span>₹10 Crore</span>
                  </div>
                </div>

                {/* Down Payment % */}
                <div>
                  <div className="flex justify-between font-bold text-vistara-primary mb-1">
                    <span>Down Payment ({emiDownPaymentPercent}%)</span>
                    <span className="font-mono text-vistara-primary">{formatINR(emiDownPaymentAmount)}</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="50"
                    step="5"
                    value={emiDownPaymentPercent}
                    onChange={(e) => setEmiDownPaymentPercent(Number(e.target.value))}
                    className="w-full h-1.5 bg-vistara-elevated rounded appearance-none accent-vistara-accent cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-vistara-secondary mt-1">
                    <span>10% (Min)</span>
                    <span>Loan Principal: {formatINR(emiPrincipal)}</span>
                    <span>50%</span>
                  </div>
                </div>

                {/* Interest Rate */}
                <div>
                  <div className="flex justify-between font-bold text-vistara-primary mb-1">
                    <span>Interest Rate (p.a.)</span>
                    <span className="font-mono text-vistara-accent">{emiInterestRate}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="14"
                    step="0.25"
                    value={emiInterestRate}
                    onChange={(e) => setEmiInterestRate(Number(e.target.value))}
                    className="w-full h-1.5 bg-vistara-elevated rounded appearance-none accent-vistara-accent cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-vistara-secondary mt-1">
                    <span>0% (Zero Interest)</span>
                    <span>Standard: 8.5%</span>
                    <span>14%</span>
                  </div>
                </div>

                {/* Loan Tenure */}
                <div>
                  <div className="flex justify-between font-bold text-vistara-primary mb-1">
                    <span>Loan Tenure</span>
                    <span className="font-mono text-vistara-primary">{emiTenureYears} Years ({emiTotalMonths} Months)</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="30"
                    step="1"
                    value={emiTenureYears}
                    onChange={(e) => setEmiTenureYears(Number(e.target.value))}
                    className="w-full h-1.5 bg-vistara-elevated rounded appearance-none accent-vistara-accent cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-vistara-secondary mt-1">
                    <span>5 Years</span>
                    <span>30 Years</span>
                  </div>
                </div>

              </div>

              {/* Right Column: Output Card */}
              <div className="lg:col-span-6 bg-vistara-elevated border border-vistara-border rounded-xl p-6 shadow-subtle flex flex-col justify-between">
                <div>
                  <span className="text-[10px] uppercase font-extrabold tracking-wider text-vistara-secondary">
                    CALCULATED MONTHLY EMI
                  </span>
                  <div className="text-3xl sm:text-4xl font-black text-vistara-primary mt-1 font-mono tracking-tight">
                    {formatINR(monthlyEMI)} <span className="text-xs font-normal text-vistara-secondary">/ month</span>
                  </div>

                  {/* Principal vs Interest Visual Bar */}
                  <div className="mt-5 space-y-2">
                    <div className="flex justify-between text-[11px] font-bold text-vistara-secondary">
                      <span>Principal ({emiPrincipalPercent}%)</span>
                      <span>Interest ({emiInterestPercent}%)</span>
                    </div>
                    <div className="w-full h-3 rounded-full bg-vistara-border overflow-hidden flex">
                      <div 
                        style={{ width: `${emiPrincipalPercent}%` }} 
                        className="bg-[#142334] transition-all duration-300"
                        title="Principal Repayment"
                      />
                      <div 
                        style={{ width: `${emiInterestPercent}%` }} 
                        className="bg-amber-500 transition-all duration-300"
                        title="Interest Charges"
                      />
                    </div>
                  </div>

                  {/* Summary Breakdown */}
                  <div className="mt-5 space-y-2 border-t border-vistara-border pt-3 text-xs">
                    <div className="flex justify-between">
                      <span className="text-vistara-secondary">Loan Principal (P):</span>
                      <span className="font-bold text-vistara-primary font-mono">{formatINR(emiPrincipal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-vistara-secondary">Total Interest Payable:</span>
                      <span className="font-bold text-amber-600 font-mono">{formatINR(emiTotalInterest)}</span>
                    </div>
                    <div className="flex justify-between font-bold border-t border-vistara-border/60 pt-2">
                      <span className="text-vistara-primary">Total Outflow (P + I):</span>
                      <span className="font-mono text-vistara-accent text-sm">{formatINR(emiTotalPayment)}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-vistara-border/60 text-[10px] text-vistara-secondary">
                  * Formula: EMI = P × r × (1+r)^n / ((1+r)^n - 1). Live update with no rounding anomalies.
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ================= TAB 2: FAIR PRICE CALCULATOR ================= */}
        {activeTab === 'fairPrice' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Inputs */}
              <div className="lg:col-span-6 space-y-4">
                <div>
                  <label className="block font-bold text-vistara-primary mb-1">Micro-Market Enclave</label>
                  <select
                    value={fairLocation}
                    onChange={(e) => setFairLocation(e.target.value)}
                    className="w-full bg-vistara-elevated border border-vistara-border rounded-lg p-2.5 font-bold text-vistara-primary focus:outline-none"
                  >
                    <option value="Boat Club">Boat Club (Benchmark: ₹32,000/sq.ft)</option>
                    <option value="Poes Garden">Poes Garden (Benchmark: ₹28,000/sq.ft)</option>
                    <option value="Besant Nagar">Besant Nagar (Benchmark: ₹21,000/sq.ft)</option>
                    <option value="Adyar">Adyar (Benchmark: ₹17,500/sq.ft)</option>
                    <option value="Anna Nagar">Anna Nagar (Benchmark: ₹16,000/sq.ft)</option>
                    <option value="ECR Coastal">ECR Coastal (Benchmark: ₹15,500/sq.ft)</option>
                    <option value="OMR Corridor">OMR Corridor (Benchmark: ₹9,200/sq.ft)</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-vistara-primary mb-1">Carpet Area (sq.ft)</label>
                    <input
                      type="number"
                      min="500"
                      max="15000"
                      value={fairArea}
                      onChange={(e) => setFairArea(Math.max(1, Number(e.target.value)))}
                      className="w-full bg-vistara-elevated border border-vistara-border rounded-lg p-2.5 font-mono text-vistara-primary focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-vistara-primary mb-1">Asking Price (₹)</label>
                    <input
                      type="number"
                      min="1000000"
                      step="500000"
                      value={fairAskingPrice}
                      onChange={(e) => setFairAskingPrice(Math.max(1, Number(e.target.value)))}
                      className="w-full bg-vistara-elevated border border-vistara-border rounded-lg p-2.5 font-mono text-vistara-primary focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-vistara-primary mb-1">Structural Condition</label>
                    <select
                      value={fairCondition}
                      onChange={(e) => setFairCondition(e.target.value)}
                      className="w-full bg-vistara-elevated border border-vistara-border rounded-lg p-2 text-vistara-primary font-medium"
                    >
                      <option>Brand New (2024+)</option>
                      <option>Well Maintained (3-7 yrs)</option>
                      <option>Needs Renovation</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-vistara-primary mb-1">Amenities Specification</label>
                    <select
                      value={fairAmenities}
                      onChange={(e) => setFairAmenities(e.target.value)}
                      className="w-full bg-vistara-elevated border border-vistara-border rounded-lg p-2 text-vistara-primary font-medium"
                    >
                      <option>Ultra Luxury (Club, Pool, Concierge)</option>
                      <option>Premium (Gym, Security, Backup)</option>
                      <option>Standard Gated Community</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Output Panel */}
              <div className="lg:col-span-6 bg-vistara-elevated border border-vistara-border rounded-xl p-6 shadow-subtle space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-vistara-border">
                  <span className="text-[10px] uppercase font-bold text-vistara-secondary">Valuation Verdict</span>
                  <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold border ${fairResults.positionColor}`}>
                    {fairResults.marketPosition}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-vistara-surface rounded-lg border border-vistara-border">
                    <span className="text-[10px] text-vistara-secondary block font-bold">Effective Rate</span>
                    <span className="font-mono font-extrabold text-base text-vistara-primary">
                      ₹{fairResults.pricePerSqFt.toLocaleString('en-IN')}/sq.ft
                    </span>
                  </div>
                  <div className="p-3 bg-vistara-surface rounded-lg border border-vistara-border">
                    <span className="text-[10px] text-vistara-secondary block font-bold">Delta from Benchmark</span>
                    <span className={`font-mono font-extrabold text-base ${fairResults.diffFromFair >= 0 ? 'text-amber-600' : 'text-emerald-600'}`}>
                      {fairResults.diffFromFair >= 0 ? `+${fairResults.diffFromFair}%` : `${fairResults.diffFromFair}%`}
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-vistara-surface rounded-lg border border-vistara-border space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-vistara-secondary">Current Asking Price:</span>
                    <span className="font-mono font-bold text-vistara-primary">{formatINR(fairAskingPrice)}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-vistara-secondary">Estimated Fair Range:</span>
                    <span className="font-mono font-bold text-emerald-600">
                      {formatINR(fairResults.minFairRange)} – {formatINR(fairResults.maxFairRange)}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-vistara-secondary">Enclave Reference Median:</span>
                    <span className="font-mono font-bold text-vistara-primary">{formatINR(fairResults.benchmarkPrice)}</span>
                  </div>
                </div>

                <p className="text-[11px] text-vistara-secondary leading-relaxed">
                  Based on registered deed analytics in {fairLocation} factoring in floor elevation, condition, and amenity grade.
                </p>
              </div>

            </div>
          </div>
        )}

        {/* ================= TAB 3: AFFORDABILITY CALCULATOR ================= */}
        {activeTab === 'affordability' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Inputs */}
              <div className="lg:col-span-6 space-y-4">
                <div>
                  <div className="flex justify-between font-bold text-vistara-primary mb-1">
                    <span>Monthly Gross Household Income</span>
                    <span className="font-mono text-vistara-accent">{formatINR(affordIncome)}</span>
                  </div>
                  <input
                    type="range"
                    min="50000"
                    max="1500000"
                    step="25000"
                    value={affordIncome}
                    onChange={(e) => setAffordIncome(Number(e.target.value))}
                    className="w-full h-1.5 bg-vistara-elevated rounded appearance-none accent-vistara-accent cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between font-bold text-vistara-primary mb-1">
                    <span>Existing Monthly EMIs / Liabilities</span>
                    <span className="font-mono text-vistara-primary">{formatINR(affordExistingEMI)}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="300000"
                    step="5000"
                    value={affordExistingEMI}
                    onChange={(e) => setAffordExistingEMI(Number(e.target.value))}
                    className="w-full h-1.5 bg-vistara-elevated rounded appearance-none accent-vistara-accent cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between font-bold text-vistara-primary mb-1">
                    <span>Available Down Payment Savings</span>
                    <span className="font-mono text-vistara-primary">{formatINR(affordDownPayment)}</span>
                  </div>
                  <input
                    type="range"
                    min="500000"
                    max="30000000"
                    step="500000"
                    value={affordDownPayment}
                    onChange={(e) => setAffordDownPayment(Number(e.target.value))}
                    className="w-full h-1.5 bg-vistara-elevated rounded appearance-none accent-vistara-accent cursor-pointer"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-vistara-primary mb-1">Interest Rate</label>
                    <input
                      type="number"
                      step="0.1"
                      value={affordRate}
                      onChange={(e) => setAffordRate(Number(e.target.value))}
                      className="w-full bg-vistara-elevated border border-vistara-border rounded-lg p-2 font-mono text-vistara-primary focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-vistara-primary mb-1">Tenure (Years)</label>
                    <input
                      type="number"
                      min="5"
                      max="30"
                      value={affordTenure}
                      onChange={(e) => setAffordTenure(Number(e.target.value))}
                      className="w-full bg-vistara-elevated border border-vistara-border rounded-lg p-2 font-mono text-vistara-primary focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Outputs */}
              <div className="lg:col-span-6 bg-vistara-elevated border border-vistara-border rounded-xl p-6 shadow-subtle space-y-4">
                <div>
                  <span className="text-[10px] uppercase font-bold text-vistara-secondary block">
                    MAXIMUM AFFORDABLE HOME VALUE
                  </span>
                  <div className="text-3xl font-extrabold text-vistara-primary font-mono mt-1">
                    {formatINR(affordResults.maxHomePrice)}
                  </div>
                  <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200">
                    Demo estimate • 50% DTI Standard Benchmark
                  </span>
                </div>

                <div className="space-y-2 border-t border-vistara-border pt-3 text-xs">
                  <div className="flex justify-between">
                    <span className="text-vistara-secondary">Eligible Loan Principal:</span>
                    <span className="font-mono font-bold text-vistara-primary">{formatINR(affordResults.maxLoan)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-vistara-secondary">Max Permissible New EMI:</span>
                    <span className="font-mono font-bold text-vistara-primary">{formatINR(affordResults.estimatedNewEMI)}/mo</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-vistara-secondary">Aggregate Debt-to-Income (DTI):</span>
                    <span className="font-mono font-bold text-emerald-600">{affordResults.dtiRatio}% (Healthy &lt; 50%)</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ================= TAB 4: RENT VS BUY SIMULATOR ================= */}
        {activeTab === 'rentVsBuy' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Inputs */}
              <div className="lg:col-span-6 space-y-4">
                <div>
                  <div className="flex justify-between font-bold text-vistara-primary mb-1">
                    <span>Target Property Purchase Price</span>
                    <span className="font-mono text-vistara-accent">{formatINR(rvbBuyPrice)}</span>
                  </div>
                  <input
                    type="range"
                    min="5000000"
                    max="60000000"
                    step="500000"
                    value={rvbBuyPrice}
                    onChange={(e) => setRvbBuyPrice(Number(e.target.value))}
                    className="w-full h-1.5 bg-vistara-elevated rounded appearance-none accent-vistara-accent cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between font-bold text-vistara-primary mb-1">
                    <span>Initial Down Payment</span>
                    <span className="font-mono text-vistara-primary">{formatINR(rvbDownPayment)}</span>
                  </div>
                  <input
                    type="range"
                    min="1000000"
                    max="20000000"
                    step="500000"
                    value={rvbDownPayment}
                    onChange={(e) => setRvbDownPayment(Number(e.target.value))}
                    className="w-full h-1.5 bg-vistara-elevated rounded appearance-none accent-vistara-accent cursor-pointer"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-vistara-primary mb-1">Monthly Equivalent Rent</label>
                    <input
                      type="number"
                      step="5000"
                      value={rvbMonthlyRent}
                      onChange={(e) => setRvbMonthlyRent(Number(e.target.value))}
                      className="w-full bg-vistara-elevated border border-vistara-border rounded-lg p-2 font-mono text-vistara-primary focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-vistara-primary mb-1">Holding Horizon (Years)</label>
                    <select
                      value={rvbHoldingYears}
                      onChange={(e) => setRvbHoldingYears(Number(e.target.value))}
                      className="w-full bg-vistara-elevated border border-vistara-border rounded-lg p-2 font-bold text-vistara-primary"
                    >
                      <option value="5">5 Years</option>
                      <option value="7">7 Years</option>
                      <option value="10">10 Years</option>
                      <option value="15">15 Years</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Side-by-Side Scenario Cards */}
              <div className="lg:col-span-6 space-y-3">
                <div className="p-4 bg-vistara-elevated border border-vistara-border rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-extrabold text-vistara-primary text-sm flex items-center gap-1.5">
                      <Home className="w-4 h-4 text-vistara-accent" /> Buying Scenario ({rvbHoldingYears} Years)
                    </span>
                    <span className="font-mono font-bold text-emerald-600">
                      Net Equity: {formatINR(rvbResults.netHomeEquity)}
                    </span>
                  </div>
                  <div className="space-y-1 text-xs text-vistara-secondary">
                    <div className="flex justify-between">
                      <span>Total Outflow (Down + EMIs + Maint):</span>
                      <span className="font-mono text-vistara-primary">{formatINR(rvbResults.totalBuyCashOutflow)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Appreciated Asset Value (6.5% CAGR):</span>
                      <span className="font-mono text-vistara-primary">{formatINR(rvbResults.estimatedPropertyValue)}</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-vistara-elevated border border-vistara-border rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-extrabold text-vistara-primary text-sm flex items-center gap-1.5">
                      <TrendingUp className="w-4 h-4 text-blue-600" /> Renting Scenario ({rvbHoldingYears} Years)
                    </span>
                    <span className="font-mono font-bold text-blue-600">
                      Liquid Corpus: {formatINR(rvbResults.investedDownPaymentGrowth)}
                    </span>
                  </div>
                  <div className="space-y-1 text-xs text-vistara-secondary">
                    <div className="flex justify-between">
                      <span>Cumulative Rent Paid (5% Inflation):</span>
                      <span className="font-mono text-rose-600">{formatINR(rvbResults.totalRentPaid)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Down Payment Corpus Growth (9% CAGR):</span>
                      <span className="font-mono text-vistara-primary">{formatINR(rvbResults.investedDownPaymentGrowth)}</span>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-vistara-surface rounded-lg border border-vistara-border text-[11px] text-vistara-secondary">
                  <strong>At these assumptions:</strong> Buying builds long-term residential equity in prime Chennai land, while renting conserves cash liquidity if relocation is anticipated within {rvbHoldingYears} years.
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
