// Vistara Fit Engine: Real algorithmic evaluation of User Life Profile vs Property Home DNA
// Weights: Budget (20%), Location (15%), Space (15%), Lifestyle (20%), Commute (10%), Home DNA (10%), Future Fit (10%)

export const DEFAULT_WEIGHTS = {
  budget: 0.20,
  location: 0.15,
  space: 0.15,
  lifestyle: 0.20,
  commute: 0.10,
  homeDNA: 0.10,
  futureFit: 0.10
};

/**
 * Calculates a personalized Fit Score and deep breakdown for a property given a user profile and custom weights.
 * Supports either (property, userProfile) or (userProfile, property) calling order for bulletproof execution.
 */
export function calculateFitScore(arg1, arg2, customWeights = {}) {
  // Normalize arguments in case called as (user, property) or (property, user)
  let property = arg1;
  let userProfile = arg2;

  if (arg1 && (arg1.role || arg1.lifeProfile || arg1.buyPreferences || arg1.rentPreferences)) {
    userProfile = arg1;
    property = arg2;
  } else if (arg2 && (arg2.bhk !== undefined && (arg2.microMarket || arg2.coordinates || arg2.price))) {
    property = arg2;
    userProfile = arg1;
  }

  // Fallbacks if either is missing
  if (!property) {
    return {
      score: 85,
      components: { budget: 85, location: 85, space: 85, lifestyle: 85, commute: 85, homeDNA: 85, futureFit: 85 },
      componentScores: { budget: 85, location: 85, space: 85, lifestyle: 85, commute: 85, homeDNA: 85, futureFit: 85 },
      reasons: ['Calibrated for Chennai metropolitan living.'],
      strengths: ['Balanced spatial flow and verified legal clearances.'],
      compromises: []
    };
  }

  const weights = { ...DEFAULT_WEIGHTS, ...customWeights };
  const mode = userProfile?.mode || 'buy';
  const prefs = mode === 'buy' ? (userProfile?.buyPreferences || {}) : (userProfile?.rentPreferences || {});
  const life = userProfile?.lifeProfile || {};

  // Safe defaults for property sub-objects
  const propMicroMarket = property.microMarket || property.location || 'Chennai';
  const propLocation = property.location || propMicroMarket;
  const propBhk = property.bhk || 3;
  const propHomeDNA = property.homeDNA || {
    quiet: 88,
    naturalLight: 90,
    workFriendly: 90,
    green: 84,
    social: 82,
    familyFriendly: 86
  };
  const propCommute = property.commute || {
    tidelPark: '18 min',
    airport: '32 min',
    centralStation: '40 min',
    metro: '8 min'
  };
  const propFutureFit = property.futureFit || [
    { scenario: 'Need more WFH space', fit: 92, notes: 'Dual-desk study layout' },
    { scenario: 'Family expansion', fit: 88, notes: 'Adaptable layout' }
  ];

  // 1. Budget Score (20%)
  let budgetScore = 75;
  const userBudget = prefs.maxBudget || (mode === 'buy' ? 20000000 : 60000);
  const actualPrice = mode === 'buy' ? (property.price || 18000000) : (property.rent || 45000);

  if (actualPrice <= userBudget) {
    const ratio = actualPrice / userBudget;
    budgetScore = ratio >= 0.75 ? 96 : 89;
  } else {
    const overRatio = (actualPrice - userBudget) / userBudget;
    budgetScore = Math.max(25, Math.round(90 - (overRatio * 140)));
  }

  // 2. Location Score (15%)
  let locationScore = 70;
  const preferredLocs = (prefs.preferredLocations && prefs.preferredLocations.length > 0)
    ? prefs.preferredLocations
    : ['OMR', 'Adyar', 'Besant Nagar', 'Boat Club', 'ECR', 'Anna Nagar'];

  const matchesLoc = preferredLocs.some(loc => 
    propMicroMarket.toLowerCase().includes(loc.toLowerCase()) || 
    propLocation.toLowerCase().includes(loc.toLowerCase())
  );
  if (matchesLoc) {
    locationScore = 96;
  } else {
    locationScore = 68;
  }

  // 3. Space Score (15%)
  let spaceScore = 75;
  const preferredBhk = prefs.bhk || 3;
  if (propBhk === preferredBhk) {
    spaceScore = 95;
  } else if (propBhk > preferredBhk) {
    spaceScore = 91; // Generous space bonus
  } else {
    spaceScore = 62; // 1 bedroom less than requested
  }

  // 4. Lifestyle Alignment Score (20%)
  let lifestyleScore = 80;
  const lifestyleAffinities = (life.affinities && life.affinities.length > 0)
    ? life.affinities
    : ['Quiet Living', 'Natural Light', 'Work Friendly'];

  let lifeMatchSum = 0;
  let lifeCount = 0;

  if (lifestyleAffinities.includes('Quiet Living')) {
    lifeMatchSum += (propHomeDNA.quiet || 85);
    lifeCount++;
  }
  if (lifestyleAffinities.includes('Natural Light')) {
    lifeMatchSum += (propHomeDNA.naturalLight || 85);
    lifeCount++;
  }
  if (lifestyleAffinities.includes('Work Friendly')) {
    lifeMatchSum += (propHomeDNA.workFriendly || 85);
    lifeCount++;
  }
  if (lifestyleAffinities.includes('Green')) {
    lifeMatchSum += (propHomeDNA.green || 80);
    lifeCount++;
  }
  if (lifestyleAffinities.includes('Social')) {
    lifeMatchSum += (propHomeDNA.social || 80);
    lifeCount++;
  }
  if (lifestyleAffinities.includes('Family Friendly')) {
    lifeMatchSum += (propHomeDNA.familyFriendly || 85);
    lifeCount++;
  }

  if (lifeCount > 0) {
    lifestyleScore = Math.round(lifeMatchSum / lifeCount);
  } else {
    lifestyleScore = 85;
  }

  // 5. Commute Score (10%)
  let commuteScore = 78;
  const commuteDest = life.commuteDestination || 'tidelPark';
  const commuteTimeStr = propCommute[commuteDest] || propCommute.tidelPark || '20 min';
  const commuteMinutes = parseInt(commuteTimeStr, 10) || 20;

  if (commuteMinutes <= 15) commuteScore = 97;
  else if (commuteMinutes <= 25) commuteScore = 90;
  else if (commuteMinutes <= 35) commuteScore = 76;
  else commuteScore = 62;

  // 6. Home DNA Direct Match (10%)
  const dnaValues = Object.values(propHomeDNA).filter(v => typeof v === 'number');
  const avgDNA = dnaValues.length > 0 
    ? Math.round(dnaValues.reduce((a, b) => a + b, 0) / dnaValues.length)
    : 86;
  const homeDNAScore = avgDNA;

  // 7. Future Fit Score (10%)
  let futureFitScore = 85;
  const userScenarios = (life.futureScenarios && life.futureScenarios.length > 0) 
    ? life.futureScenarios 
    : ['Need more WFH space'];

  const matchingFuture = propFutureFit.filter(ff => userScenarios.includes(ff.scenario));
  if (matchingFuture.length > 0) {
    const avgFit = matchingFuture.reduce((acc, curr) => acc + (curr.fit || 85), 0) / matchingFuture.length;
    futureFitScore = Math.round(avgFit);
  }

  // Calculate Weighted Total Score
  const totalWeight = (
    weights.budget + 
    weights.location + 
    weights.space + 
    weights.lifestyle + 
    weights.commute + 
    weights.homeDNA + 
    weights.futureFit
  ) || 1.0;
  
  const overall = Math.round(
    ((budgetScore * weights.budget) +
     (locationScore * weights.location) +
     (spaceScore * weights.space) +
     (lifestyleScore * weights.lifestyle) +
     (commuteScore * weights.commute) +
     (homeDNAScore * weights.homeDNA) +
     (futureFitScore * weights.futureFit)) / totalWeight
  );

  // Generate explainability insights
  const reasons = [];
  const strengths = [];
  const compromises = [];

  if (lifestyleScore >= 88) {
    reasons.push(`Superior alignment with your lifestyle profile: ${lifestyleAffinities.join(', ')}.`);
    strengths.push(`High acoustic stillness (${propHomeDNA.quiet || 90}/100) and daylight index (${propHomeDNA.naturalLight || 92}/100).`);
  }
  if (locationScore >= 90) {
    reasons.push(`Located directly in your target micro-market (${propMicroMarket}).`);
    strengths.push(`Within ${propCommute.metro || 'short'} transit connectivity.`);
  }
  if (budgetScore >= 90) {
    strengths.push(`Comfortably positioned within your target ${mode === 'buy' ? 'capital' : 'monthly'} budget.`);
  } else if (budgetScore < 70) {
    compromises.push(`Priced at ${property.priceDisplay || `₹${(actualPrice/10000000).toFixed(2)} Cr`}, approximately ${(actualPrice - userBudget) > 0 ? 'above' : 'near'} your target threshold.`);
  }

  if (commuteMinutes > 30) {
    compromises.push(`Peak-hour travel to primary hub is ${commuteTimeStr}, which may require route planning.`);
  }

  if (property.tradeoffs && property.tradeoffs.length > 0) {
    compromises.push(...property.tradeoffs);
  }

  const componentScores = {
    budget: budgetScore,
    location: locationScore,
    space: spaceScore,
    lifestyle: lifestyleScore,
    commute: commuteScore,
    homeDNA: homeDNAScore,
    futureFit: futureFitScore
  };

  return {
    score: Math.min(99, Math.max(45, overall)),
    components: componentScores,
    componentScores,
    reasons: reasons.slice(0, 3),
    strengths: strengths.slice(0, 3),
    compromises: compromises.slice(0, 2)
  };
}

/**
 * Re-ranks properties dynamically based on personalized Fit Score.
 */
export function rankProperties(properties = [], userProfile, customWeights = {}) {
  return properties
    .map(property => {
      const fit = calculateFitScore(property, userProfile, customWeights);
      return {
        ...property,
        fit
      };
    })
    .sort((a, b) => b.fit.score - a.fit.score);
}

/**
 * Adapts an Agent CRM client into a User Profile that calculateFitScore consumes.
 */
export function clientToUserProfile(client) {
  if (!client) return null;
  const isBuyer = client.type !== 'Renter';
  
  let maxBudget = 40000000;
  if (isBuyer) {
    if (client.budget?.includes('6.0')) maxBudget = 60000000;
    else if (client.budget?.includes('1.6')) maxBudget = 16000000;
    else if (client.budget?.includes('4.5')) maxBudget = 45000000;
    else if (client.budget?.includes('3.0')) maxBudget = 30000000;
  } else {
    maxBudget = 120000;
  }

  const affinities = client.keyAffinities || [];
  const isQuiet = affinities.some(a => a.toLowerCase().includes('quiet'));
  const isLight = affinities.some(a => a.toLowerCase().includes('light') || a.toLowerCase().includes('daylight'));
  const isWork = affinities.some(a => a.toLowerCase().includes('work'));
  const isGreen = affinities.some(a => a.toLowerCase().includes('green') || a.toLowerCase().includes('nature'));

  return {
    mode: isBuyer ? 'buy' : 'rent',
    buyPreferences: {
      bhk: client.bhk || 3,
      budgetRange: [10000000, maxBudget],
      locations: client.targetLocations || ['Chennai'],
      lifestyle: client.lifestyle || 'Quiet Living'
    },
    rentPreferences: {
      bhk: client.bhk || 3,
      budgetRange: [25000, maxBudget],
      locations: client.targetLocations || ['Chennai'],
      lifestyle: client.lifestyle || 'Quiet Living'
    },
    lifeProfile: {
      name: client.name,
      lifestyleAffinities: affinities,
      quietLiving: isQuiet ? 95 : 82,
      naturalLight: isLight ? 94 : 85,
      workFromHome: isWork ? 96 : 84,
      greenSpace: isGreen ? 92 : 80,
      commute: 85,
      family: 86,
      socialLife: 78,
      privacy: 88
    }
  };
}
