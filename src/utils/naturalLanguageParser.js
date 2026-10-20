// Vistara Natural Language Property Parser
// Parses human intent: "Quiet 3BHK near OMR with good natural light under 1.6 Cr"
// Extracts structured preferences safely without hallucinating or inventing properties.

export function parseNaturalLanguageQuery(queryText) {
  if (!queryText || typeof queryText !== 'string') return null;

  const lower = queryText.toLowerCase().trim();
  const result = {
    originalQuery: queryText,
    detectedParams: {},
    matchedFilters: {
      bhk: null,
      maxBudget: null,
      mode: null,
      locations: [],
      lifestyleAffinities: [],
      propertyType: null,
      keywords: []
    }
  };

  // 1. Detect Mode (Buy vs Rent)
  if (lower.includes('rent') || lower.includes('rental') || lower.includes('lease') || lower.includes('/mo') || lower.includes('per month')) {
    result.matchedFilters.mode = 'rent';
    result.detectedParams.mode = 'Rent';
  } else if (lower.includes('buy') || lower.includes('purchase') || lower.includes('crore') || lower.includes('cr') || lower.includes('sale')) {
    result.matchedFilters.mode = 'buy';
    result.detectedParams.mode = 'Buy';
  }

  // 2. Detect BHK
  const bhkMatch = lower.match(/(\d+)\s*(bhk|bed|bedroom)/);
  if (bhkMatch) {
    const count = parseInt(bhkMatch[1], 10);
    result.matchedFilters.bhk = count;
    result.detectedParams.bhk = `${count} BHK`;
  }

  // 3. Detect Budget (Crores, Lakhs, Thousands)
  // Check for "under 1.6 Cr", "below 2 crore", "under 40k", etc.
  const crMatch = lower.match(/(?:under|below|max|upto|within|budget of)?\s*(?:₹|rs\.?)?\s*(\d+(?:\.\d+)?)\s*(?:cr|crore|crores)/);
  const lakhMatch = lower.match(/(?:under|below|max|upto|within|budget of)?\s*(?:₹|rs\.?)?\s*(\d+(?:\.\d+)?)\s*(?:l|lac|lakh|lakhs)/);
  const kMatch = lower.match(/(?:under|below|max|upto|within|budget of)?\s*(?:₹|rs\.?)?\s*(\d+(?:\.\d+)?)\s*(?:k|thousand)/);

  if (crMatch) {
    const val = parseFloat(crMatch[1]) * 10000000;
    result.matchedFilters.maxBudget = val;
    result.detectedParams.maxBudget = `Under ₹${crMatch[1]} Cr`;
  } else if (lakhMatch) {
    const val = parseFloat(lakhMatch[1]) * 100000;
    result.matchedFilters.maxBudget = val;
    result.detectedParams.maxBudget = `Under ₹${lakhMatch[1]} Lakhs`;
  } else if (kMatch) {
    const val = parseFloat(kMatch[1]) * 1000;
    result.matchedFilters.maxBudget = val;
    result.detectedParams.maxBudget = `Under ₹${kMatch[1]}k / mo`;
    if (!result.matchedFilters.mode) result.matchedFilters.mode = 'rent';
  }

  // 4. Detect Chennai Locations / Micro-markets
  const knownLocations = [
    { name: 'Boat Club', aliases: ['boat club', 'ra puram'] },
    { name: 'Poes Garden', aliases: ['poes garden'] },
    { name: 'Adyar', aliases: ['adyar', 'gandhi nagar'] },
    { name: 'Besant Nagar', aliases: ['besant nagar', 'elliot', 'beach'] },
    { name: 'Kotturpuram', aliases: ['kotturpuram', 'kottur'] },
    { name: 'ECR', aliases: ['ecr', 'east coast road', 'palavakkam', 'akkarai', 'coastal', 'beachside'] },
    { name: 'OMR', aliases: ['omr', 'old mahabalipuram', 'it corridor', 'perungudi', 'thoraipakkam', 'sholinganallur', 'navalur'] },
    { name: 'Anna Nagar', aliases: ['anna nagar', 'tower park'] },
    { name: 'Nungambakkam', aliases: ['nungambakkam', 'rutland'] },
    { name: 'Alwarpet', aliases: ['alwarpet', 'chamiers'] },
    { name: 'Velachery', aliases: ['velachery', 'phoenix mall'] }
  ];

  knownLocations.forEach(loc => {
    if (loc.aliases.some(alias => lower.includes(alias))) {
      result.matchedFilters.locations.push(loc.name);
    }
  });
  if (result.matchedFilters.locations.length > 0) {
    result.detectedParams.locations = result.matchedFilters.locations.join(', ');
  }

  // 5. Detect Lifestyle Affinities
  if (lower.includes('quiet') || lower.includes('peaceful') || lower.includes('calm') || lower.includes('serene') || lower.includes('tranquil')) {
    result.matchedFilters.lifestyleAffinities.push('Quiet Living');
  }
  if (lower.includes('natural light') || lower.includes('sunlight') || lower.includes('sunlit') || lower.includes('bright') || lower.includes('airy') || lower.includes('breeze')) {
    result.matchedFilters.lifestyleAffinities.push('Natural Light');
  }
  if (lower.includes('work friendly') || lower.includes('wfh') || lower.includes('office') || lower.includes('desk') || lower.includes('fiber') || lower.includes('study')) {
    result.matchedFilters.lifestyleAffinities.push('Work Friendly');
  }
  if (lower.includes('green') || lower.includes('nature') || lower.includes('park') || lower.includes('tree') || lower.includes('garden')) {
    result.matchedFilters.lifestyleAffinities.push('Green');
  }
  if (lower.includes('social') || lower.includes('host') || lower.includes('entertain') || lower.includes('terrace')) {
    result.matchedFilters.lifestyleAffinities.push('Social');
  }
  if (lower.includes('family') || lower.includes('kid') || lower.includes('school') || lower.includes('play')) {
    result.matchedFilters.lifestyleAffinities.push('Family Friendly');
  }
  if (result.matchedFilters.lifestyleAffinities.length > 0) {
    result.detectedParams.lifestyle = result.matchedFilters.lifestyleAffinities.join(', ');
  }

  // 6. Property Type
  if (lower.includes('villa')) {
    result.matchedFilters.propertyType = 'Villa';
    result.detectedParams.propertyType = 'Villa';
  } else if (lower.includes('penthouse')) {
    result.matchedFilters.propertyType = 'Penthouse';
    result.detectedParams.propertyType = 'Penthouse';
  } else if (lower.includes('apartment') || lower.includes('flat')) {
    result.matchedFilters.propertyType = 'Apartment';
    result.detectedParams.propertyType = 'Apartment';
  }

  return result;
}

/**
 * Filter properties using parsed natural language filters.
 */
export function filterPropertiesByNL(properties, nlResult) {
  if (!nlResult || !nlResult.matchedFilters) return properties;
  const filters = nlResult.matchedFilters;

  return properties.filter(prop => {
    // BHK
    if (filters.bhk && prop.bhk !== filters.bhk) {
      return false;
    }

    // Budget
    if (filters.maxBudget) {
      const priceToCheck = filters.mode === 'rent' ? prop.rent : prop.price;
      if (priceToCheck > filters.maxBudget) return false;
    }

    // Locations
    if (filters.locations.length > 0) {
      const matchesAny = filters.locations.some(loc => 
        prop.microMarket.toLowerCase().includes(loc.toLowerCase()) || 
        prop.location.toLowerCase().includes(loc.toLowerCase())
      );
      if (!matchesAny) return false;
    }

    // Property Type
    if (filters.propertyType && !prop.propertyType.toLowerCase().includes(filters.propertyType.toLowerCase())) {
      return false;
    }

    // Lifestyle affinities check: if user asked for "quiet", score should be >= 80
    if (filters.lifestyleAffinities.includes('Quiet Living') && prop.homeDNA.quiet < 78) {
      return false;
    }
    if (filters.lifestyleAffinities.includes('Natural Light') && prop.homeDNA.naturalLight < 82) {
      return false;
    }
    if (filters.lifestyleAffinities.includes('Work Friendly') && prop.homeDNA.workFriendly < 80) {
      return false;
    }

    return true;
  });
}
