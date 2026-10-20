// Vistara Central Property Dataset - Authentic Chennai Micro-Markets
// Every property has unique characteristics, coordinates, Home DNA, sunlight profile, and trade-offs.

const RAW_CHENNAI_PROPERTIES = [
  {
    id: 'vis-che-01',
    name: 'The Sanctuary at Boat Club',
    location: 'Boat Club Road, RA Puram',
    microMarket: 'Boat Club',
    coordinates: [13.0232, 80.2458],
    price: 245000000,
    priceDisplay: '₹24.50 Cr',
    rent: 550000,
    rentDisplay: '₹5.50 L / mo',
    bhk: 4,
    area: 4850,
    propertyType: 'Penthouse Villa',
    status: 'Available',
    yearBuilt: 2024,
    floor: '4th of 5 floors',
    images: {
      hero: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      gallery: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80'
      ],
      thumbnail: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=400&q=80',
      floorPlan: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=800&q=80',
      immersive: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
      neighborhood: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80'
    },
    coverImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80'
    ],
    homeDNA: {
      quiet: 96,
      naturalLight: 90,
      social: 84,
      workFriendly: 94,
      green: 95,
      familyFriendly: 88
    },
    amenities: [
      'Private Plunge Pool',
      'Dedicated Lift Access',
      'Acoustic WFH Suite',
      'River-Canopy Deck',
      'Italian Marble Flooring',
      'Full Home Automation',
      'Triple Covered Parking',
      '100% DG Power Backup'
    ],
    sunlight: {
      morning: 'East-facing river terrace catches first filtered dawn light through mature rain trees.',
      noon: 'Central skylight atrium floods living and dining zones with diffused, glare-free light.',
      evening: 'South-west lounge captures warm golden reflections off the Adyar river water.',
      goldenHourQuality: 'Sublime (5:30 PM - 6:20 PM)'
    },
    commute: {
      tidelPark: '18 min',
      airport: '25 min',
      centralStation: '28 min',
      ecrBeaches: '22 min',
      metro: '5 min walk to Nandanam Metro'
    },
    neighborhood: {
      walkScore: 88,
      quietRating: 95,
      treeCanopyPercent: 68,
      safetyIndex: 'Exceptional',
      noiseLevel: '34 dB (Extremely Quiet)'
    },
    priceTrend: [
      { year: '2021', price: 21.0 },
      { year: '2022', price: 22.2 },
      { year: '2023', price: 23.1 },
      { year: '2024', price: 23.8 },
      { year: '2025', price: 24.2 },
      { year: '2026', price: 24.5 }
    ],
    fairPrice: {
      estimatedValue: 242000000,
      marketRangeLow: 235000000,
      marketRangeHigh: 248000000,
      status: 'Fairly Priced'
    },
    priceDrop: {
      hasDropped: true,
      previousPrice: 255000000,
      currentPrice: 245000000,
      dropAmount: 10000000,
      date: '10 Sep 2026'
    },
    tradeoffs: [
      'Highest echelon of privacy and tree canopy, but significant capital commitment with ₹42,000/mo association maintenance.',
      'Nestled in exclusive low-density enclave, meaning nearest high-street commercial retail requires a 7-minute car ride.'
    ],
    story: 'Designed as an architectural pavilion on the banks of the Adyar River, this residence prioritizes stillness. Double-glazed acoustic glass ensures absolute quiet, while 11-foot finished ceilings evoke timeless mid-century calm.',
    verification: {
      status: 'Fully Verified',
      completenessScore: 98,
      documentChecklist: ['CMDA Sanctioned', 'RERA No: TN/29/Building/0041', 'Clear Title by Senior Advocate', 'Patta & Encumbrance Verified'],
      dataQuality: 'Audited (Sep 2026)'
    },
    futureFit: [
      { scenario: 'Need more WFH space', fit: 98, explanation: 'Standalone library/study with dedicated acoustic baffling and terrace breakout.' },
      { scenario: 'Family expansion', fit: 92, explanation: 'Secondary master suite perfectly suited for multi-generational living or nursery.' },
      { scenario: 'Need more storage', fit: 90, explanation: 'Walk-in dressing rooms in three suites plus basement climate-controlled storage.' }
    ],
    rooms3D: [
      { id: 'living', name: 'Grand Living Hall', position: [0, 1.3, 0], fov: 62, desc: 'Expansive 750 sq.ft salon with sliding teak doors opening to the river deck.' },
      { id: 'kitchen', name: 'Gourmet Poggenpohl Kitchen', position: [-2.8, 1.1, -1.2], fov: 58, desc: 'Integrated Sub-Zero refrigeration, induction island, and attached wet kitchen.' },
      { id: 'bedroom', name: 'River-Facing Master Suite', position: [2.5, 1.2, -2.0], fov: 60, desc: 'Panoramic corner glass overlooking green treetops with motorized sheer blinds.' },
      { id: 'workspace', name: 'Acoustic Study & Library', position: [-2.0, 1.1, 1.8], fov: 52, desc: 'Fitted oak bookshelves, dual workstation desk, and dedicated fiber junction.' },
      { id: 'balcony', name: 'Cantilevered River Terrace', position: [0.2, 1.0, 3.2], fov: 68, desc: 'Hardwood Ipe timber decking with integrated planter boxes and coastal breeze.' }
    ]
  },
  {
    id: 'vis-che-02',
    name: 'The Sunlit Atrium',
    location: '200 Feet Radial Road, Thoraipakkam',
    microMarket: 'OMR - Thoraipakkam',
    coordinates: [12.9416, 80.2285],
    price: 11500000,
    priceDisplay: '₹1.15 Cr',
    rent: 36000,
    rentDisplay: '₹36,000 / mo',
    bhk: 3,
    area: 1680,
    propertyType: 'Apartment',
    status: 'Available',
    yearBuilt: 2023,
    floor: '7th of 14 floors',
    images: {
      hero: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      gallery: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80'
      ],
      thumbnail: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=400&q=80',
      floorPlan: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=800&q=80',
      immersive: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
      neighborhood: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80'
    },
    coverImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80'
    ],
    homeDNA: {
      quiet: 80,
      naturalLight: 96,
      social: 82,
      workFriendly: 90,
      green: 74,
      familyFriendly: 86
    },
    amenities: [
      'Sunlit Dual Aspect Balconies',
      'Fiber-to-Home Gigabit Cabling',
      'Rooftop Infinity Lap Pool',
      'EV Car Charging Bay',
      'Clubhouse & Squash Court',
      'Covered Basement Parking'
    ],
    sunlight: {
      morning: 'East-facing kitchen and breakfast nook flooded with morning sunshine.',
      noon: 'Cross-ventilated north-south breezes keep the center living area cool.',
      evening: 'Unobstructed sunset horizon visible from the west master balcony.',
      goldenHourQuality: 'Vibrant (5:45 PM - 6:30 PM)'
    },
    commute: {
      tidelPark: '14 min',
      airport: '22 min',
      centralStation: '38 min',
      ecrBeaches: '12 min',
      metro: '8 min walk to upcoming Thoraipakkam Metro'
    },
    neighborhood: {
      walkScore: 82,
      quietRating: 78,
      treeCanopyPercent: 32,
      safetyIndex: 'High',
      noiseLevel: '46 dB (Moderate Urban)'
    },
    priceTrend: [
      { year: '2021', price: 0.94 },
      { year: '2022', price: 1.01 },
      { year: '2023', price: 1.06 },
      { year: '2024', price: 1.10 },
      { year: '2025', price: 1.13 },
      { year: '2026', price: 1.15 }
    ],
    fairPrice: {
      estimatedValue: 11400000,
      marketRangeLow: 11000000,
      marketRangeHigh: 11800000,
      status: 'Fairly Priced'
    },
    priceDrop: {
      hasDropped: false
    },
    tradeoffs: [
      'Outstanding natural light with dual aspects, but located 400m from OMR main corridor which carries light peak-hour vehicle hum on the east balcony.',
      'Slightly compact dining space when hosting larger social gatherings over 8 people.'
    ],
    story: 'Engineered specifically for tech professionals seeking sunlight and seamless connectivity to both OMR IT corridors and the ECR coastline. Every room benefits from oversized casement windows.',
    verification: {
      status: 'Fully Verified',
      completenessScore: 94,
      documentChecklist: ['CMDA Approved', 'RERA No: TN/29/Building/0812', 'Occupancy Certificate Issued', 'Bank Loan Approved: HDFC, SBI'],
      dataQuality: 'High'
    },
    futureFit: [
      { scenario: 'Need more WFH space', fit: 92, explanation: 'Bedroom 3 easily reconfigures into a dedicated zoom-ready office studio.' },
      { scenario: 'Family expansion', fit: 86, explanation: 'Well-proportioned rooms with space for crib and storage.' },
      { scenario: 'Need more storage', fit: 78, explanation: 'Requires customized modular wardrobes to optimize wall height.' }
    ],
    rooms3D: [
      { id: 'living', name: 'Open Living & Dining', position: [0, 1.2, 0], fov: 60, desc: 'High-ceiling open layout with light oak flooring and continuous daylight.' },
      { id: 'kitchen', name: 'Modular Kitchen & Breakfast Bar', position: [-2.4, 1.0, -1.0], fov: 55, desc: 'Granite counters with built-in hob and tall appliance pantry.' },
      { id: 'bedroom', name: 'Primary Suite with Sun Balcony', position: [2.2, 1.1, -1.6], fov: 58, desc: 'Large corner windows framing open sky with attached ensuite.' },
      { id: 'workspace', name: 'Quiet Work Alcove', position: [-1.6, 1.0, 1.4], fov: 50, desc: 'Direct view of the city skyline with ergonomic power hub.' },
      { id: 'balcony', name: 'Daylight Balcony', position: [0, 0.9, 2.8], fov: 65, desc: 'Wide open deck with stainless steel railings.' }
    ]
  },
  {
    id: 'vis-che-03',
    name: 'Bayview Promenade',
    location: '4th Main Road, Besant Nagar',
    microMarket: 'Besant Nagar',
    coordinates: [13.0002, 80.2687],
    price: 49000000,
    priceDisplay: '₹4.90 Cr',
    rent: 140000,
    rentDisplay: '₹1.40 L / mo',
    bhk: 3,
    area: 2450,
    propertyType: 'Coastal Apartment',
    status: 'Available',
    yearBuilt: 2022,
    floor: '3rd of 4 floors',
    images: {
      hero: 'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=1200&q=80',
      gallery: [
      'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1200&q=80'
      ],
      thumbnail: 'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=400&q=80',
      floorPlan: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80',
      immersive: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1200&q=80',
      neighborhood: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'
    },
    coverImage: 'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1200&q=80'
    ],
    homeDNA: {
      quiet: 88,
      naturalLight: 94,
      social: 92,
      workFriendly: 86,
      green: 90,
      familyFriendly: 94
    },
    amenities: [
      'Sea Breeze Balconies',
      '3-Minute Walk to Elliot’s Beach',
      'Private Terrace Garden',
      'Marine-Grade Fittings',
      'Covered Stilt Parking',
      'Rooftop Yoga Gazebo'
    ],
    sunlight: {
      morning: 'East balconies receive sea-horizon sunrise with gentle coastal breeze.',
      noon: 'High trees outside soften direct overhead midday sun.',
      evening: 'Ambient sea-air breezes cool the residence naturally without heavy air conditioning.',
      goldenHourQuality: 'Magical (5:20 PM - 6:15 PM)'
    },
    commute: {
      tidelPark: '10 min',
      airport: '28 min',
      centralStation: '32 min',
      ecrBeaches: '10 min',
      metro: '12 min to Guindy Metro'
    },
    neighborhood: {
      walkScore: 94,
      quietRating: 86,
      treeCanopyPercent: 54,
      safetyIndex: 'High',
      noiseLevel: '38 dB (Coastal Quiet)'
    },
    priceTrend: [
      { year: '2021', price: 4.1 },
      { year: '2022', price: 4.35 },
      { year: '2023', price: 4.55 },
      { year: '2024', price: 4.72 },
      { year: '2025', price: 4.85 },
      { year: '2026', price: 4.90 }
    ],
    fairPrice: {
      estimatedValue: 48500000,
      marketRangeLow: 47000000,
      marketRangeHigh: 50500000,
      status: 'Fairly Priced'
    },
    priceDrop: {
      hasDropped: true,
      previousPrice: 51500000,
      currentPrice: 49000000,
      dropAmount: 2500000,
      date: '18 Sep 2026'
    },
    tradeoffs: [
      'Unmatched walking access to Elliot’s Beach cafés and seaside culture, but weekends near the main promenade experience higher pedestrian footfall.',
      'Salty coastal air requires periodic maintenance of exterior metal finishes.'
    ],
    story: 'Situated in the cultural heart of Besant Nagar, this home marries beachside leisure with refined quietude. Stepping outside places you within tree-shaded residential avenues seconds from artisan coffee shops.',
    verification: {
      status: 'Fully Verified',
      completenessScore: 97,
      documentChecklist: ['CMDA Approved', 'Clear Coastal Zone (CRZ) Clearance', 'RERA Registered', 'Original Title Deeds Inspected'],
      dataQuality: 'High'
    },
    futureFit: [
      { scenario: 'Need more WFH space', fit: 88, explanation: 'Balcony-adjacent bedroom offers an inspiring, sea-facing work environment.' },
      { scenario: 'Family expansion', fit: 95, explanation: 'Besant Nagar is one of Chennai’s premier family neighborhoods with immediate beach access.' },
      { scenario: 'Need more storage', fit: 84, explanation: 'Generous wardrobe niches and overhead loft provisions.' }
    ],
    rooms3D: [
      { id: 'living', name: 'Coastal Living Room', position: [0, 1.2, 0], fov: 62, desc: 'Louvered windows and sliding glass drawing in steady maritime cross-breezes.' },
      { id: 'kitchen', name: 'Open Island Kitchen', position: [-2.2, 1.0, -1.0], fov: 55, desc: 'Minimalist white cabinetry with breakfast seating.' },
      { id: 'bedroom', name: 'Oceanview Master Suite', position: [2.3, 1.2, -1.8], fov: 60, desc: 'North-East facing bedroom with natural light and wood accents.' },
      { id: 'workspace', name: 'Garden Facing Study', position: [-1.8, 1.0, 1.6], fov: 50, desc: 'Overlooks mature gulmohar trees with acoustic glazed pane.' },
      { id: 'balcony', name: 'Deep Sea Breeze Balcony', position: [0.1, 0.9, 3.0], fov: 68, desc: 'Wide terrace suitable for morning yoga and evening family gatherings.' }
    ]
  },
  {
    id: 'vis-che-04',
    name: 'Silicon Horizon',
    location: 'Kandanchavadi, Perungudi, OMR',
    microMarket: 'OMR - Perungudi',
    coordinates: [12.9654, 80.2443],
    price: 14500000,
    priceDisplay: '₹1.45 Cr',
    rent: 44000,
    rentDisplay: '₹44,000 / mo',
    bhk: 3,
    area: 1820,
    propertyType: 'Apartment',
    status: 'Available',
    yearBuilt: 2024,
    floor: '9th of 18 floors',
    images: {
      hero: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&w=1200&q=80',
      gallery: [
      'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80'
      ],
      thumbnail: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&w=400&q=80',
      floorPlan: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80',
      immersive: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80',
      neighborhood: 'https://images.unsplash.com/photo-1477959858617-67f30bc75b82?auto=format&fit=crop&w=800&q=80'
    },
    coverImage: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80'
    ],
    homeDNA: {
      quiet: 82,
      naturalLight: 90,
      social: 78,
      workFriendly: 96,
      green: 72,
      familyFriendly: 84
    },
    amenities: [
      'Dual Acoustic Home Offices',
      'Fast 1Gbps Fiber Infrastructure',
      'Co-Working Lounge with Meeting Pods',
      'Heated Swimming Pool',
      'EV Supercharging Bay',
      'Gym & Yoga Studio'
    ],
    sunlight: {
      morning: 'Direct morning light through corner bedroom windows from 6:30 AM.',
      noon: 'Overhanging facade louvers shield direct midday heat.',
      evening: 'Warm amber glow across living room and study from 5:00 PM.',
      goldenHourQuality: 'Rich (5:30 PM - 6:25 PM)'
    },
    commute: {
      tidelPark: '6 min',
      airport: '24 min',
      centralStation: '36 min',
      ecrBeaches: '14 min',
      metro: '4 min to Kandanchavadi Metro Station'
    },
    neighborhood: {
      walkScore: 84,
      quietRating: 80,
      treeCanopyPercent: 28,
      safetyIndex: 'High',
      noiseLevel: '44 dB (Controlled Tech Enclave)'
    },
    priceTrend: [
      { year: '2021', price: 1.18 },
      { year: '2022', price: 1.26 },
      { year: '2023', price: 1.34 },
      { year: '2024', price: 1.40 },
      { year: '2025', price: 1.43 },
      { year: '2026', price: 1.45 }
    ],
    fairPrice: {
      estimatedValue: 14400000,
      marketRangeLow: 13900000,
      marketRangeHigh: 14800000,
      status: 'Fairly Priced'
    },
    priceDrop: {
      hasDropped: true,
      previousPrice: 15200000,
      currentPrice: 14500000,
      dropAmount: 700000,
      date: '08 Sep 2026'
    },
    tradeoffs: [
      'Unrivaled 6-minute commute to Tidel Park and OMR tech parks, but neighborhood is commercial-heavy during business hours.',
      'Slightly lower park density compared to south Adyar or Boat Club.'
    ],
    story: 'Crafted for modern founders and remote leaders who refuse to compromise between commute times and work-from-home comfort. Acoustic insulation on all perimeter walls guarantees silent video conferencing.',
    verification: {
      status: 'Fully Verified',
      completenessScore: 95,
      documentChecklist: ['CMDA Approved', 'RERA Registered', 'NOC from Fire and Environmental Boards', 'Builder Handover Complete'],
      dataQuality: 'High'
    },
    futureFit: [
      { scenario: 'Need more WFH space', fit: 98, explanation: 'Pre-configured dual home office setup with sound-dampened acoustic wall panels.' },
      { scenario: 'Family expansion', fit: 84, explanation: 'Well laid-out 3 bedrooms with room for changing needs.' },
      { scenario: 'Need more storage', fit: 86, explanation: 'Utility balcony includes modular storage sheds.' }
    ],
    rooms3D: [
      { id: 'living', name: 'Open Tech-Lounge', position: [0, 1.2, 0], fov: 60, desc: 'Smart automated lighting, motorized roller blinds, and sleek engineered stone floor.' },
      { id: 'kitchen', name: 'Minimalist Linear Kitchen', position: [-2.3, 1.0, -1.0], fov: 55, desc: 'Matte dark cabinetry with built-in dishwasher and coffee bar.' },
      { id: 'bedroom', name: 'Tranquil Master Suite', position: [2.2, 1.1, -1.7], fov: 58, desc: 'Sound-dampened drywall and double-glazed low-E windows.' },
      { id: 'workspace', name: 'Dual Screen Command Desk', position: [-1.7, 1.1, 1.5], fov: 52, desc: 'Cable-managed walnut desk with dual monitor arm mounts.' },
      { id: 'balcony', name: 'Skyline Terrace', position: [0, 0.9, 2.9], fov: 65, desc: 'Unobstructed view of the illuminated OMR expressway.' }
    ]
  },
  {
    id: 'vis-che-05',
    name: 'The Verandah Estate',
    location: 'Binny Road, Poes Garden',
    microMarket: 'Poes Garden',
    coordinates: [13.0482, 80.2523],
    price: 182000000,
    priceDisplay: '₹18.20 Cr',
    rent: 420000,
    rentDisplay: '₹4.20 L / mo',
    bhk: 4,
    area: 4200,
    propertyType: 'Heritage Modern Villa',
    status: 'Available',
    yearBuilt: 2021,
    floor: 'Independent 2-Storey Villa',
    images: {
      hero: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
      gallery: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1617325247661-675ab4b64ae2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1200&q=80'
      ],
      thumbnail: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=400&q=80',
      floorPlan: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=800&q=80',
      immersive: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1200&q=80',
      neighborhood: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80'
    },
    coverImage: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1617325247661-675ab4b64ae2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1200&q=80'
    ],
    homeDNA: {
      quiet: 94,
      naturalLight: 88,
      social: 90,
      workFriendly: 92,
      green: 96,
      familyFriendly: 92
    },
    amenities: [
      'Wrap-Around Traditional Verandah',
      'Courtyard with Rainwater Feature',
      'Private Lush Lawn & Gazebo',
      'Staff Quarters & Driver Restroom',
      '4-Car Gated Driveway',
      'High Security VIP Zone'
    ],
    sunlight: {
      morning: 'Verandah receives gentle sun filtered through hundred-year-old neem trees.',
      noon: 'Deep overhangs keep internal living spaces 4°C cooler than ambient city heat.',
      evening: 'Courtyard fountain reflects warm twilight.',
      goldenHourQuality: 'Serene & Warm (5:30 PM - 6:20 PM)'
    },
    commute: {
      tidelPark: '22 min',
      airport: '26 min',
      centralStation: '20 min',
      ecrBeaches: '26 min',
      metro: '6 min to AG-DMS Metro Station'
    },
    neighborhood: {
      walkScore: 90,
      quietRating: 94,
      treeCanopyPercent: 62,
      safetyIndex: 'Highest Tier',
      noiseLevel: '35 dB (Quiet Residential)'
    },
    priceTrend: [
      { year: '2021', price: 15.8 },
      { year: '2022', price: 16.5 },
      { year: '2023', price: 17.1 },
      { year: '2024', price: 17.6 },
      { year: '2025', price: 17.9 },
      { year: '2026', price: 18.2 }
    ],
    fairPrice: {
      estimatedValue: 180000000,
      marketRangeLow: 175000000,
      marketRangeHigh: 185000000,
      status: 'Fairly Priced'
    },
    priceDrop: {
      hasDropped: false
    },
    tradeoffs: [
      'High prestige and security in Chennai’s most revered historic residential enclave, but comes with stringent external aesthetic restrictions.',
      'Mature trees and traditional roof tiles require dedicated seasonal foliage clearing.'
    ],
    story: 'A masterclass in tropical modernism inspired by Geoffrey Bawa, reinterpreting the Chettinad courtyard home with steel, polished concrete, and Burma teak verandas.',
    verification: {
      status: 'Fully Verified',
      completenessScore: 99,
      documentChecklist: ['Heritage Freehold Patta', 'CMDA Sanctioned Plan', 'Clean Title Search for 60 Years', 'Single Owner Property'],
      dataQuality: 'Exceptional'
    },
    futureFit: [
      { scenario: 'Need more WFH space', fit: 95, explanation: 'Upper gallery studio with independent garden entrance and powder room.' },
      { scenario: 'Family expansion', fit: 96, explanation: 'Generous 4-bedroom layout with independent suites for each family member.' },
      { scenario: 'Need more storage', fit: 92, explanation: 'Spacious dedicated attic and ground level storage pantry.' }
    ],
    rooms3D: [
      { id: 'living', name: 'Courtyard Living Salon', position: [0, 1.3, 0], fov: 65, desc: 'Sunken courtyard surrounded by colonnaded verandas and water pool.' },
      { id: 'kitchen', name: 'Chettinad & Modern Kitchen', position: [-2.6, 1.1, -1.2], fov: 56, desc: 'Terrazzo countertops, brass hardware, and modern induction cooktops.' },
      { id: 'bedroom', name: 'First Floor Master Suite', position: [2.4, 1.3, -2.0], fov: 60, desc: 'High timber-beam ceiling with private balcony looking out to the lawn.' },
      { id: 'workspace', name: 'Verandah Reading Nook', position: [-1.9, 1.1, 1.6], fov: 50, desc: 'Natural breeze, antique writing desk, and garden birdsong.' },
      { id: 'balcony', name: 'Open Sky Terrace', position: [0, 1.0, 3.2], fov: 70, desc: 'Upper level terrace flanked by terracotta tiles and greenery.' }
    ]
  },
  {
    id: 'vis-che-06',
    name: 'ECR Coastal Pavilion',
    location: 'Near Akkarai Beach, ECR',
    microMarket: 'ECR',
    coordinates: [12.9023, 80.2467],
    price: 72000000,
    priceDisplay: '₹7.20 Cr',
    rent: 180000,
    rentDisplay: '₹1.80 L / mo',
    bhk: 4,
    area: 3600,
    propertyType: 'Beachside Villa',
    status: 'Available',
    yearBuilt: 2023,
    floor: 'Ground + 1 Floor',
    images: {
      hero: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80',
      gallery: [
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80'
      ],
      thumbnail: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=400&q=80',
      floorPlan: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80',
      immersive: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      neighborhood: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'
    },
    coverImage: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80'
    ],
    homeDNA: {
      quiet: 92,
      naturalLight: 95,
      social: 94,
      workFriendly: 88,
      green: 92,
      familyFriendly: 90
    },
    amenities: [
      '200m Private Walkway to Sandy Beach',
      'Saltwater Lap Pool',
      'Outdoor Barbecue Pergola',
      'Solar Rooftop Grid 10kW',
      'High Boundary Perimeter with CCTV',
      'Double Carport with EV Charger'
    ],
    sunlight: {
      morning: 'Stunning Bay of Bengal sunrise visible from the upper bedroom terrace.',
      noon: 'Breezy pergola provides shade while keeping the pool area luminous.',
      evening: 'South-east coastal breezes carry cool air through all French windows.',
      goldenHourQuality: 'Breathtaking (5:20 PM - 6:20 PM)'
    },
    commute: {
      tidelPark: '20 min',
      airport: '34 min',
      centralStation: '45 min',
      ecrBeaches: '1 min walk',
      metro: '15 min to Sholinganallur Metro'
    },
    neighborhood: {
      walkScore: 72,
      quietRating: 92,
      treeCanopyPercent: 58,
      safetyIndex: 'High (Gated Enclave)',
      noiseLevel: '36 dB (Gentle Waves)'
    },
    priceTrend: [
      { year: '2021', price: 5.8 },
      { year: '2022', price: 6.2 },
      { year: '2023', price: 6.6 },
      { year: '2024', price: 6.9 },
      { year: '2025', price: 7.1 },
      { year: '2026', price: 7.2 }
    ],
    fairPrice: {
      estimatedValue: 71000000,
      marketRangeLow: 68500000,
      marketRangeHigh: 73500000,
      status: 'Fairly Priced'
    },
    priceDrop: {
      hasDropped: true,
      previousPrice: 75000000,
      currentPrice: 72000000,
      dropAmount: 3000000,
      date: '14 Sep 2026'
    },
    tradeoffs: [
      'Pure coastal paradise with sandy beach access within 200 meters, but 45-minute drive to Chennai Central Station during weekday mornings.',
      'Requires private vehicle for daily school runs.'
    ],
    story: 'A serene architectural retreat with expansive frameless glass openings framing landscaped frangipani and coconut groves. Designed for those who value fresh sea breezes and mental clarity.',
    verification: {
      status: 'Fully Verified',
      completenessScore: 96,
      documentChecklist: ['CRZ Sanction Approved', 'Panchayat & CMDA Cleared', 'Patta Verified', 'Solar Net Metering Active'],
      dataQuality: 'High'
    },
    futureFit: [
      { scenario: 'Need more WFH space', fit: 94, explanation: 'Poolside detached studio ideal for undisturbed creative work and calls.' },
      { scenario: 'Family expansion', fit: 92, explanation: '4 large ensuite bedrooms and immense open garden for children.' },
      { scenario: 'Need more storage', fit: 88, explanation: 'Dedicated garden tool shed and interior linen closets.' }
    ],
    rooms3D: [
      { id: 'living', name: 'Open Beachfront Lounge', position: [0, 1.2, 0], fov: 64, desc: 'Sliding glass walls merging the indoor living space with the swimming pool patio.' },
      { id: 'kitchen', name: 'Chef’s Island Kitchen', position: [-2.5, 1.0, -1.0], fov: 56, desc: 'Solid teak counter bar, concealed wine cooler, and stainless appliances.' },
      { id: 'bedroom', name: 'Sea-Horizon Master Suite', position: [2.3, 1.2, -1.8], fov: 62, desc: 'Corner suite with frameless glass corner and ocean breeze terrace.' },
      { id: 'workspace', name: 'Garden Workspace', position: [-1.8, 1.0, 1.5], fov: 50, desc: 'Overlooks the swimming pool with natural daylight all day.' },
      { id: 'balcony', name: 'Upper Sunrise Balcony', position: [0.1, 1.0, 3.1], fov: 68, desc: 'Wide open deck with glass balustrade facing towards the ocean.' }
    ]
  },
  {
    id: 'vis-che-07',
    name: 'Kottur Pavilion',
    location: 'Gandhi Nagar, Kotturpuram',
    microMarket: 'Kotturpuram',
    coordinates: [13.0189, 80.2394],
    price: 68000000,
    priceDisplay: '₹6.80 Cr',
    rent: 165000,
    rentDisplay: '₹1.65 L / mo',
    bhk: 3,
    area: 2850,
    propertyType: 'Boutique Apartment',
    status: 'Available',
    yearBuilt: 2023,
    floor: '2nd of 4 floors',
    images: {
      hero: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80',
      gallery: [
      'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80'
      ],
      thumbnail: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=400&q=80',
      floorPlan: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=800&q=80',
      immersive: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80',
      neighborhood: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80'
    },
    coverImage: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80'
    ],
    homeDNA: {
      quiet: 92,
      naturalLight: 90,
      social: 86,
      workFriendly: 92,
      green: 94,
      familyFriendly: 90
    },
    amenities: [
      'Overlooks Anna Centenary Library Park',
      'Private Elevator Lobby',
      'Hardwood Teak Flooring',
      'Double Covered Basement Car Parking',
      'Full Solar Water Heating System',
      '24/7 Security & Concierge'
    ],
    sunlight: {
      morning: 'Lush greenery outside filters early morning sunlight into soft dappled patterns.',
      noon: 'Protected by surrounding tree canopy; stays naturally cool during Chennai summers.',
      evening: 'Golden light reflects through upper library park foliage.',
      goldenHourQuality: 'Lush & Amber (5:35 PM - 6:25 PM)'
    },
    commute: {
      tidelPark: '12 min',
      airport: '22 min',
      centralStation: '26 min',
      ecrBeaches: '16 min',
      metro: '7 min to Guindy / Nandanam Metro'
    },
    neighborhood: {
      walkScore: 92,
      quietRating: 92,
      treeCanopyPercent: 64,
      safetyIndex: 'Exceptional',
      noiseLevel: '36 dB (Parkside Tranquility)'
    },
    priceTrend: [
      { year: '2021', price: 5.7 },
      { year: '2022', price: 6.0 },
      { year: '2023', price: 6.3 },
      { year: '2024', price: 6.55 },
      { year: '2025', price: 6.7 },
      { year: '2026', price: 6.8 }
    ],
    fairPrice: {
      estimatedValue: 67500000,
      marketRangeLow: 65000000,
      marketRangeHigh: 69500000,
      status: 'Fairly Priced'
    },
    priceDrop: {
      hasDropped: false
    },
    tradeoffs: [
      'Exceptional green serenity opposite Anna Centenary Library, but strict boutique building rules limit loud weekend parties past 10 PM.',
      'Slightly higher per-sq.ft price reflecting premier central Kotturpuram land values.'
    ],
    story: 'Only 8 exclusive residences in this architectural low-rise. Overlooking one of Chennai’s most intellectual and leafy green pockets, the home feels like living inside a private botanical sanctuary.',
    verification: {
      status: 'Fully Verified',
      completenessScore: 98,
      documentChecklist: ['CMDA Approved', 'RERA: TN/29/Building/0342', 'Clear Encumbrance for 40 Years', 'Occupancy Certificate Verified'],
      dataQuality: 'High'
    },
    futureFit: [
      { scenario: 'Need more WFH space', fit: 94, explanation: 'Park-facing study with acoustic glass provides a tranquil zoom environment.' },
      { scenario: 'Family expansion', fit: 90, explanation: 'Generous room sizes, low density, and proximity to elite Adyar/Kottur schools.' },
      { scenario: 'Need more storage', fit: 86, explanation: 'Spacious utility room and deep storage pantries.' }
    ],
    rooms3D: [
      { id: 'living', name: 'Canopy Living Room', position: [0, 1.2, 0], fov: 60, desc: 'Large picture windows framing green treetops with solid teak wood detailing.' },
      { id: 'kitchen', name: 'Contemporary Kitchen', position: [-2.2, 1.0, -1.0], fov: 55, desc: 'Modern quartz counters with hidden pantry.' },
      { id: 'bedroom', name: 'Tranquil Master Suite', position: [2.3, 1.1, -1.7], fov: 58, desc: 'Lush green views with walk-in dressing area.' },
      { id: 'workspace', name: 'Library Study', position: [-1.7, 1.0, 1.4], fov: 50, desc: 'Acoustic glass desk looking over Kotturpuram tree tops.' },
      { id: 'balcony', name: 'Tree Deck Balcony', position: [0, 0.9, 2.9], fov: 65, desc: 'Generous private terrace immersed in fresh air.' }
    ]
  },
  {
    id: 'vis-che-08',
    name: 'The Anna Courtyard',
    location: '2nd Avenue, Anna Nagar East',
    microMarket: 'Anna Nagar',
    coordinates: [13.0850, 80.2150],
    price: 36000000,
    priceDisplay: '₹3.60 Cr',
    rent: 95000,
    rentDisplay: '₹95,000 / mo',
    bhk: 3,
    area: 2200,
    propertyType: 'Courtyard Apartment',
    status: 'Available',
    yearBuilt: 2022,
    floor: '4th of 6 floors',
    images: {
      hero: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      gallery: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1556912173-3bb406ef7e77?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80'
      ],
      thumbnail: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80',
      floorPlan: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80',
      immersive: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      neighborhood: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=800&q=80'
    },
    coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1556912173-3bb406ef7e77?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80'
    ],
    homeDNA: {
      quiet: 84,
      naturalLight: 88,
      social: 90,
      workFriendly: 86,
      green: 82,
      familyFriendly: 96
    },
    amenities: [
      'Internal Courtyard Lightwell',
      'Walking Distance to Tower Park',
      'High-Speed Schindler Elevator',
      '2 Dedicated Covered Car Bays',
      'Solar Rooftop Common Lighting',
      'Rooftop Clubhouse & Children Play Area'
    ],
    sunlight: {
      morning: 'Central lightwell funnels daylight directly into interior living and family spaces.',
      noon: 'Courtyard acts as a thermal chimney, naturally venting hot air upward.',
      evening: 'West balcony captures warm city sunset over Anna Nagar Tower.',
      goldenHourQuality: 'Warm & Dynamic (5:35 PM - 6:25 PM)'
    },
    commute: {
      tidelPark: '34 min',
      airport: '30 min',
      centralStation: '18 min',
      ecrBeaches: '38 min',
      metro: '5 min walk to Anna Nagar Tower Metro'
    },
    neighborhood: {
      walkScore: 96,
      quietRating: 84,
      treeCanopyPercent: 48,
      safetyIndex: 'High',
      noiseLevel: '40 dB (Residential Avenue)'
    },
    priceTrend: [
      { year: '2021', price: 3.0 },
      { year: '2022', price: 3.18 },
      { year: '2023', price: 3.32 },
      { year: '2024', price: 3.45 },
      { year: '2025', price: 3.55 },
      { year: '2026', price: 3.60 }
    ],
    fairPrice: {
      estimatedValue: 35800000,
      marketRangeLow: 34500000,
      marketRangeHigh: 37000000,
      status: 'Fairly Priced'
    },
    priceDrop: {
      hasDropped: true,
      previousPrice: 38000000,
      currentPrice: 36000000,
      dropAmount: 2000000,
      date: '04 Sep 2026'
    },
    tradeoffs: [
      'Peerless family lifestyle with schools, parks, and dining within 500m walk, but commute to OMR tech parks is 35+ minutes.',
      'Slightly higher city property tax slab for Anna Nagar East.'
    ],
    story: 'Engineered for families who love the vibrant social tapestry of Anna Nagar but demand architectural calm at home. Features an ingenious internal courtyard providing continuous ambient daylight.',
    verification: {
      status: 'Fully Verified',
      completenessScore: 96,
      documentChecklist: ['CMDA Sanctioned', 'RERA No: TN/29/Building/0521', 'Tower Park Neighborhood NOC Cleared', 'Occupancy Certificate'],
      dataQuality: 'High'
    },
    futureFit: [
      { scenario: 'Need more WFH space', fit: 86, explanation: 'Flex study area off the central courtyard.' },
      { scenario: 'Family expansion', fit: 96, explanation: 'Best-in-class family community with Anna Nagar Tower Park right down the street.' },
      { scenario: 'Need more storage', fit: 90, explanation: 'Ample utility area and built-in cupboards.' }
    ],
    rooms3D: [
      { id: 'living', name: 'Courtyard Living Area', position: [0, 1.2, 0], fov: 60, desc: 'Central courtyard skylight infusing the room with daylight.' },
      { id: 'kitchen', name: 'Family Kitchen & Store', position: [-2.3, 1.0, -1.0], fov: 55, desc: 'Full modular layout with granite platform.' },
      { id: 'bedroom', name: 'Master Bedroom', position: [2.2, 1.1, -1.7], fov: 58, desc: 'Acoustic glazed windows facing quiet avenue.' },
      { id: 'workspace', name: 'Work / Study Room', position: [-1.6, 1.0, 1.4], fov: 50, desc: 'Overlooks the green avenue trees.' },
      { id: 'balcony', name: 'Tower View Balcony', position: [0, 0.9, 2.8], fov: 65, desc: 'Sunset views over Anna Nagar green canopies.' }
    ]
  },
  {
    id: 'vis-che-09',
    name: 'Cyber Nest',
    location: 'Sholinganallur Junction, OMR',
    microMarket: 'OMR - Sholinganallur',
    coordinates: [12.9010, 80.2279],
    price: 9200000,
    priceDisplay: '₹92 Lakhs',
    rent: 28000,
    rentDisplay: '₹28,000 / mo',
    bhk: 2,
    area: 1240,
    propertyType: 'Apartment',
    status: 'Available',
    yearBuilt: 2024,
    floor: '5th of 12 floors',
    images: {
      hero: 'https://images.unsplash.com/photo-1515263487990-61b07816b324?auto=format&fit=crop&w=1200&q=80',
      gallery: [
      'https://images.unsplash.com/photo-1515263487990-61b07816b324?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80'
      ],
      thumbnail: 'https://images.unsplash.com/photo-1515263487990-61b07816b324?auto=format&fit=crop&w=400&q=80',
      floorPlan: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=800&q=80',
      immersive: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
      neighborhood: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80'
    },
    coverImage: 'https://images.unsplash.com/photo-1515263487990-61b07816b324?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1515263487990-61b07816b324?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80'
    ],
    homeDNA: {
      quiet: 78,
      naturalLight: 88,
      social: 82,
      workFriendly: 94,
      green: 70,
      familyFriendly: 80
    },
    amenities: [
      'Dual Broadband Line Redundancy',
      'Integrated Smart Home Lighting',
      'Co-Working Hub & Coffee Lounge',
      'Fitness Gym & Badminton Court',
      'Direct Shuttle to ELCOT SEZ',
      'Covered Parking'
    ],
    sunlight: {
      morning: 'East orientation welcomes bright morning rays for a productive start to the day.',
      noon: 'Cross ventilation keeps energy bills low.',
      evening: 'Open eastern and northern vistas avoid harsh west heat.',
      goldenHourQuality: 'Clear (5:45 PM - 6:25 PM)'
    },
    commute: {
      tidelPark: '16 min',
      airport: '28 min',
      centralStation: '42 min',
      ecrBeaches: '10 min',
      metro: '3 min walk to upcoming Sholinganallur Metro Junction'
    },
    neighborhood: {
      walkScore: 80,
      quietRating: 76,
      treeCanopyPercent: 24,
      safetyIndex: 'High',
      noiseLevel: '48 dB (Active Tech Corridor)'
    },
    priceTrend: [
      { year: '2021', price: 0.74 },
      { year: '2022', price: 0.79 },
      { year: '2023', price: 0.84 },
      { year: '2024', price: 0.88 },
      { year: '2025', price: 0.90 },
      { year: '2026', price: 0.92 }
    ],
    fairPrice: {
      estimatedValue: 9100000,
      marketRangeLow: 8700000,
      marketRangeHigh: 9400000,
      status: 'Fairly Priced'
    },
    priceDrop: {
      hasDropped: true,
      previousPrice: 9800000,
      currentPrice: 9200000,
      dropAmount: 600000,
      date: '15 Sep 2026'
    },
    tradeoffs: [
      'Outstanding price-to-value under ₹1 Cr right at ELCOT SEZ gate, but 2BHK layout limits long-term expansion for larger families.',
      'Sholinganallur junction undergoes metro construction during daytime hours.'
    ],
    story: 'Designed as an accessible, high-efficiency launchpad for tech professionals looking to stop renting and build equity within walking distance of major IT employers.',
    verification: {
      status: 'Fully Verified',
      completenessScore: 93,
      documentChecklist: ['CMDA Approved', 'RERA Registered', 'NOC Received', 'Bank Approved: SBI, ICICI'],
      dataQuality: 'High'
    },
    futureFit: [
      { scenario: 'Need more WFH space', fit: 88, explanation: 'Second bedroom is wired for dual standing desks and high-capacity WiFi.' },
      { scenario: 'Family expansion', fit: 75, explanation: 'Comfortable for couple with one young child.' },
      { scenario: 'Need more storage', fit: 74, explanation: 'Requires custom vertical cabinetry.' }
    ],
    rooms3D: [
      { id: 'living', name: 'Smart Living Space', position: [0, 1.2, 0], fov: 60, desc: 'Compact modern living room with clean lines and wall-mounted entertainment unit.' },
      { id: 'kitchen', name: 'Efficient Modular Kitchen', position: [-2.0, 1.0, -0.9], fov: 55, desc: 'Quartz counter and overhead cabinets.' },
      { id: 'bedroom', name: 'Master Bedroom', position: [2.0, 1.1, -1.5], fov: 58, desc: 'East facing window with ample daylight.' },
      { id: 'workspace', name: 'Study Corner', position: [-1.4, 1.0, 1.2], fov: 50, desc: 'Built-in work desk with cable pass-throughs.' },
      { id: 'balcony', name: 'Morning Balcony', position: [0, 0.9, 2.6], fov: 65, desc: 'Overlooks the internal landscaped gardens.' }
    ]
  },
  {
    id: 'vis-che-10',
    name: 'Chamiers Terraces',
    location: 'Chamiers Road, Alwarpet',
    microMarket: 'Alwarpet',
    coordinates: [13.0315, 80.2505],
    price: 48000000,
    priceDisplay: '₹4.80 Cr',
    rent: 130000,
    rentDisplay: '₹1.30 L / mo',
    bhk: 3,
    area: 2350,
    propertyType: 'Boutique Terrace Home',
    status: 'Available',
    yearBuilt: 2023,
    floor: '3rd of 5 floors',
    images: {
      hero: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80',
      gallery: [
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1540518614846-7ede433c4ef3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80'
      ],
      thumbnail: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=400&q=80',
      floorPlan: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80',
      immersive: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
      neighborhood: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=800&q=80'
    },
    coverImage: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1540518614846-7ede433c4ef3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80'
    ],
    homeDNA: {
      quiet: 86,
      naturalLight: 92,
      social: 95,
      workFriendly: 90,
      green: 88,
      familyFriendly: 90
    },
    amenities: [
      'Terrace Garden with Pergola',
      'Steps to Chamiers Café & Amethyst',
      'Italian Fluted Wood Paneling',
      'Two Covered Stilt Parking Bays',
      'Gym & Wellness Studio',
      '100% Power Backup'
    ],
    sunlight: {
      morning: 'East-facing living terrace enjoys filtered daylight through surrounding bougainvillea.',
      noon: 'Deep cantilevered roof terrace blocks intense overhead rays.',
      evening: 'South-west warm light bathes the dining terrace.',
      goldenHourQuality: 'Warm & Cosmopolitan (5:30 PM - 6:20 PM)'
    },
    commute: {
      tidelPark: '16 min',
      airport: '24 min',
      centralStation: '24 min',
      ecrBeaches: '18 min',
      metro: '6 min to Teynampet Metro'
    },
    neighborhood: {
      walkScore: 98,
      quietRating: 88,
      treeCanopyPercent: 52,
      safetyIndex: 'High',
      noiseLevel: '38 dB (Sheltered Residential Lane)'
    },
    priceTrend: [
      { year: '2021', price: 4.1 },
      { year: '2022', price: 4.3 },
      { year: '2023', price: 4.5 },
      { year: '2024', price: 4.65 },
      { year: '2025', price: 4.75 },
      { year: '2026', price: 4.8 }
    ],
    fairPrice: {
      estimatedValue: 47800000,
      marketRangeLow: 46000000,
      marketRangeHigh: 49500000,
      status: 'Fairly Priced'
    },
    priceDrop: {
      hasDropped: false
    },
    tradeoffs: [
      'Incredible walking lifestyle with Chennai’s finest cultural cafés and boutiques at your doorstep, but evening traffic along main Chamiers Road requires using residential side-lanes.',
      'Slightly compact kitchen footprint designed for contemporary culinary styles.'
    ],
    story: 'Impeccably detailed for design-conscious homeowners. Located just off Pasumpon Muthuramalinga Thevar Road, offering an idyllic balance between vibrant café culture and private terrace sanctuary.',
    verification: {
      status: 'Fully Verified',
      completenessScore: 97,
      documentChecklist: ['CMDA Sanctioned', 'Clear Legal Opinion by Legal 500 Firm', 'RERA Registered', 'Patta Verified'],
      dataQuality: 'High'
    },
    futureFit: [
      { scenario: 'Need more WFH space', fit: 92, explanation: 'Terrace room easily functions as an inspiring private office or client meeting studio.' },
      { scenario: 'Family expansion', fit: 88, explanation: 'Spacious 3 bedrooms with quiet interior sleeping quarters.' },
      { scenario: 'Need more storage', fit: 84, explanation: 'Built-in storage beneath terrace benches and hallway recesses.' }
    ],
    rooms3D: [
      { id: 'living', name: 'Terrace Living Salon', position: [0, 1.2, 0], fov: 62, desc: 'Seamless floor transitions connecting the living room to the garden terrace.' },
      { id: 'kitchen', name: 'Designer Kitchen', position: [-2.2, 1.0, -1.0], fov: 55, desc: 'Smumed glass cabinets and integrated induction stove.' },
      { id: 'bedroom', name: 'Master Sanctuary', position: [2.3, 1.1, -1.7], fov: 58, desc: 'Quiet rear-facing bedroom with rich acoustic paneling.' },
      { id: 'workspace', name: 'Terrace Study Alcove', position: [-1.7, 1.0, 1.5], fov: 50, desc: 'Direct view of the terrace bougainvillea trellis.' },
      { id: 'balcony', name: 'Bougainvillea Terrace', position: [0, 0.9, 3.0], fov: 68, desc: 'Private rooftop deck with wooden pergola and bench seating.' }
    ]
  },
  {
    id: 'vis-che-11',
    name: 'Adyar River Villa',
    location: 'Gandhi Nagar, Adyar',
    microMarket: 'Adyar',
    coordinates: [13.0067, 80.2575],
    price: 84000000,
    priceDisplay: '₹8.40 Cr',
    rent: 210000,
    rentDisplay: '₹2.10 L / mo',
    bhk: 4,
    area: 3900,
    propertyType: 'Riverfront Villa',
    status: 'Available',
    yearBuilt: 2022,
    floor: 'Ground + 2 Floors',
    images: {
      hero: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
      gallery: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80'
      ],
      thumbnail: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=400&q=80',
      floorPlan: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80',
      immersive: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
      neighborhood: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80'
    },
    coverImage: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80'
    ],
    homeDNA: {
      quiet: 94,
      naturalLight: 92,
      social: 88,
      workFriendly: 94,
      green: 96,
      familyFriendly: 94
    },
    amenities: [
      'Panoramic Adyar River View',
      'Private Swimming Pool',
      'Solar Rooftop 8kW System',
      'Double Height Ceiling in Living Room',
      '3-Car Covered Parking',
      'Private Elevator to All 3 Floors'
    ],
    sunlight: {
      morning: 'East water reflections cast glittering morning light across the double-height ceiling.',
      noon: 'Perimeter trees shade ground floor verandas.',
      evening: 'Golden sunset casts warm reflections across the river water.',
      goldenHourQuality: 'Sensational (5:25 PM - 6:20 PM)'
    },
    commute: {
      tidelPark: '10 min',
      airport: '26 min',
      centralStation: '30 min',
      ecrBeaches: '12 min',
      metro: '8 min to Adyar Depot Metro'
    },
    neighborhood: {
      walkScore: 90,
      quietRating: 94,
      treeCanopyPercent: 65,
      safetyIndex: 'High',
      noiseLevel: '34 dB (Riverside Whisper)'
    },
    priceTrend: [
      { year: '2021', price: 7.2 },
      { year: '2022', price: 7.6 },
      { year: '2023', price: 7.9 },
      { year: '2024', price: 8.15 },
      { year: '2025', price: 8.3 },
      { year: '2026', price: 8.4 }
    ],
    fairPrice: {
      estimatedValue: 83500000,
      marketRangeLow: 81000000,
      marketRangeHigh: 86000000,
      status: 'Fairly Priced'
    },
    priceDrop: {
      hasDropped: true,
      previousPrice: 89000000,
      currentPrice: 84000000,
      dropAmount: 5000000,
      date: '02 Sep 2026'
    },
    tradeoffs: [
      'Rare direct water-facing freehold villa in Adyar, but riverfront proximity demands seasonal mosquito screen management.',
      'Premium pricing reflecting irreplaceable river-facing land parcel.'
    ],
    story: 'Directly overlooking the Adyar River estuary, this villa combines contemporary architectural drama with double-height volume and a private internal lift connecting all floors.',
    verification: {
      status: 'Fully Verified',
      completenessScore: 98,
      documentChecklist: ['Clear Freehold Patta', 'CMDA Sanctioned Plan', 'All River Buffer Clearances Approved', 'RERA Compliant'],
      dataQuality: 'Exceptional'
    },
    futureFit: [
      { scenario: 'Need more WFH space', fit: 98, explanation: 'Top floor penthouse office with 180° river views and private balcony.' },
      { scenario: 'Family expansion', fit: 96, explanation: 'Spacious 4 bedroom layout with separate ground floor guest suite for elders.' },
      { scenario: 'Need more storage', fit: 94, explanation: 'Basement cellar and built-in walk-in closets.' }
    ],
    rooms3D: [
      { id: 'living', name: 'Double-Height River Salon', position: [0, 1.4, 0], fov: 66, desc: 'Towering 20-foot glass curtain wall looking onto the river water.' },
      { id: 'kitchen', name: 'Open Plan Island Kitchen', position: [-2.5, 1.1, -1.2], fov: 56, desc: 'Premium Dekton countertops and built-in Miele appliances.' },
      { id: 'bedroom', name: 'Top Floor Master Sanctuary', position: [2.4, 1.3, -2.0], fov: 60, desc: 'Expansive private terrace overlooking river greenery.' },
      { id: 'workspace', name: 'Riverside Executive Study', position: [-1.9, 1.1, 1.6], fov: 52, desc: 'Tranquil desk space overlooking drifting watercraft.' },
      { id: 'balcony', name: 'River Deck & Pool Terrace', position: [0.1, 1.0, 3.2], fov: 70, desc: 'Hardwood deck surrounding the private infinity pool.' }
    ]
  },
  {
    id: 'vis-che-12',
    name: 'Grand Southern Court',
    location: 'Velachery Main Road, Near Phoenix Mall',
    microMarket: 'Velachery',
    coordinates: [12.9815, 80.2180],
    price: 13500000,
    priceDisplay: '₹1.35 Cr',
    rent: 38000,
    rentDisplay: '₹38,000 / mo',
    bhk: 3,
    area: 1720,
    propertyType: 'Apartment',
    status: 'Available',
    yearBuilt: 2023,
    floor: '6th of 14 floors',
    images: {
      hero: 'https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1200&q=80',
      gallery: [
      'https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1200&q=80'
      ],
      thumbnail: 'https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=400&q=80',
      floorPlan: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80',
      immersive: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1200&q=80',
      neighborhood: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80'
    },
    coverImage: 'https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1200&q=80'
    ],
    homeDNA: {
      quiet: 76,
      naturalLight: 86,
      social: 92,
      workFriendly: 88,
      green: 74,
      familyFriendly: 90
    },
    amenities: [
      '500m to Phoenix MarketCity',
      'Olympic-Length Swimming Pool',
      'Fully Equipped Gymnasium',
      'Children’s Creche & Play Zone',
      'Covered Car Parking',
      '100% Power Backup'
    ],
    sunlight: {
      morning: 'East balconies catch direct morning light.',
      noon: 'Center core layout maintains balanced internal temperature.',
      evening: 'Warm sunset views over Guindy National Park treeline.',
      goldenHourQuality: 'Lively & Bright (5:40 PM - 6:25 PM)'
    },
    commute: {
      tidelPark: '14 min',
      airport: '18 min',
      centralStation: '32 min',
      ecrBeaches: '18 min',
      metro: '5 min to Velachery MRTS / Metro'
    },
    neighborhood: {
      walkScore: 92,
      quietRating: 76,
      treeCanopyPercent: 30,
      safetyIndex: 'High',
      noiseLevel: '46 dB (Lively Urban)'
    },
    priceTrend: [
      { year: '2021', price: 1.10 },
      { year: '2022', price: 1.18 },
      { year: '2023', price: 1.25 },
      { year: '2024', price: 1.30 },
      { year: '2025', price: 1.33 },
      { year: '2026', price: 1.35 }
    ],
    fairPrice: {
      estimatedValue: 13400000,
      marketRangeLow: 12900000,
      marketRangeHigh: 13800000,
      status: 'Fairly Priced'
    },
    priceDrop: {
      hasDropped: false
    },
    tradeoffs: [
      'Unsurpassed retail and dining convenience with Phoenix Mall steps away, but Velachery main junction sees peak hour traffic congestion.',
      'Slightly higher community density compared to low-rise enclaves.'
    ],
    story: 'A highly functional, well-built home positioned at the nexus of South Chennai transit. Ideal for active families and professionals desiring immediate access to world-class entertainment, shopping, and metro links.',
    verification: {
      status: 'Fully Verified',
      completenessScore: 94,
      documentChecklist: ['CMDA Approved', 'RERA Registered', 'Fire Safety NOC', 'Occupancy Certificate Verified'],
      dataQuality: 'High'
    },
    futureFit: [
      { scenario: 'Need more WFH space', fit: 88, explanation: 'Third bedroom easily functions as private work study.' },
      { scenario: 'Family expansion', fit: 92, explanation: 'Comprehensive children amenities and proximity to top schools.' },
      { scenario: 'Need more storage', fit: 82, explanation: 'Built-in storage niches.' }
    ],
    rooms3D: [
      { id: 'living', name: 'Open Living Lounge', position: [0, 1.2, 0], fov: 60, desc: 'Warm living space with balcony access and city views.' },
      { id: 'kitchen', name: 'Modular Kitchen', position: [-2.1, 1.0, -1.0], fov: 55, desc: 'Granite platform with piped gas provision.' },
      { id: 'bedroom', name: 'Comfortable Master Bedroom', position: [2.1, 1.1, -1.6], fov: 58, desc: 'Laminate wood flooring and attached bath.' },
      { id: 'workspace', name: 'Work Corner', position: [-1.5, 1.0, 1.3], fov: 50, desc: 'Quiet spot with power sockets.' },
      { id: 'balcony', name: 'City Skyline Balcony', position: [0, 0.9, 2.7], fov: 65, desc: 'Views towards the south skyline.' }
    ]
  },
  {
    id: 'vis-che-13',
    name: 'Rutland Manor',
    location: 'Rutland Gate, Nungambakkam',
    microMarket: 'Nungambakkam',
    coordinates: [13.0601, 80.2450],
    price: 54000000,
    priceDisplay: '₹5.40 Cr',
    rent: 150000,
    rentDisplay: '₹1.50 L / mo',
    bhk: 3,
    area: 2600,
    propertyType: 'Luxury Apartment',
    status: 'Available',
    yearBuilt: 2023,
    floor: '3rd of 5 floors',
    images: {
      hero: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      gallery: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80'
      ],
      thumbnail: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=400&q=80',
      floorPlan: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=800&q=80',
      immersive: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
      neighborhood: 'https://images.unsplash.com/photo-1477959858617-67f30bc75b82?auto=format&fit=crop&w=800&q=80'
    },
    coverImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80'
    ],
    homeDNA: {
      quiet: 90,
      naturalLight: 90,
      social: 92,
      workFriendly: 94,
      green: 86,
      familyFriendly: 90
    },
    amenities: [
      'Private Elevator Access',
      'Consular District Quiet Lane',
      'Imported Statuario Marble Flooring',
      'Double Reserved Stilt Parking',
      'Rooftop Plunge Pool & Gym',
      '24/7 Security Concierge'
    ],
    sunlight: {
      morning: 'Gentle sunrise filtering through surrounding colonial bungalows.',
      noon: 'Deep exterior balcony reveals protect interior from glare.',
      evening: 'Warm dusk sky visible through wide south-west windows.',
      goldenHourQuality: 'Refined & Muted (5:30 PM - 6:20 PM)'
    },
    commute: {
      tidelPark: '24 min',
      airport: '24 min',
      centralStation: '16 min',
      ecrBeaches: '24 min',
      metro: '5 min to Thousand Lights Metro'
    },
    neighborhood: {
      walkScore: 94,
      quietRating: 90,
      treeCanopyPercent: 56,
      safetyIndex: 'Exceptional (Consular Zone)',
      noiseLevel: '36 dB (Consular Enclave Quiet)'
    },
    priceTrend: [
      { year: '2021', price: 4.6 },
      { year: '2022', price: 4.85 },
      { year: '2023', price: 5.1 },
      { year: '2024', price: 5.25 },
      { year: '2025', price: 5.35 },
      { year: '2026', price: 5.4 }
    ],
    fairPrice: {
      estimatedValue: 53500000,
      marketRangeLow: 51500000,
      marketRangeHigh: 55500000,
      status: 'Fairly Priced'
    },
    priceDrop: {
      hasDropped: true,
      previousPrice: 57500000,
      currentPrice: 54000000,
      dropAmount: 3500000,
      date: '11 Sep 2026'
    },
    tradeoffs: [
      'Prestigious diplomatic enclave with utmost security and central city access, but guest street parking is strictly regulated.',
      'Slightly higher monthly common maintenance at ₹18,000/mo.'
    ],
    story: 'Nestled along the tree-lined Rutland Gate consular boulevard, this boutique residence offers classical symmetry merged with contemporary structural refinement. Just steps from Chennai’s finest cultural institutions.',
    verification: {
      status: 'Fully Verified',
      completenessScore: 97,
      documentChecklist: ['CMDA Sanctioned', 'Clear Title for 50 Years', 'RERA Approved', 'Diplomatic Security Clearance'],
      dataQuality: 'Exceptional'
    },
    futureFit: [
      { scenario: 'Need more WFH space', fit: 96, explanation: 'Soundproofed corner study with private balcony.' },
      { scenario: 'Family expansion', fit: 90, explanation: 'Generous room layouts with private en-suite for each bedroom.' },
      { scenario: 'Need more storage', fit: 88, explanation: 'Custom European walk-in closets.' }
    ],
    rooms3D: [
      { id: 'living', name: 'Grand Marble Salon', position: [0, 1.3, 0], fov: 62, desc: 'Statuario marble floor and floor-to-ceiling glass doors.' },
      { id: 'kitchen', name: 'Gourmet Kitchen', position: [-2.4, 1.1, -1.1], fov: 56, desc: 'Concealed cabinetry and composite marble island.' },
      { id: 'bedroom', name: 'Master Suite', position: [2.3, 1.2, -1.8], fov: 58, desc: 'Rich oak paneling with morning sunlight.' },
      { id: 'workspace', name: 'Executive Corner Study', position: [-1.8, 1.1, 1.5], fov: 50, desc: 'Quiet desk with built-in bookshelves.' },
      { id: 'balcony', name: 'Verdant Tree-Top Balcony', position: [0, 1.0, 3.0], fov: 68, desc: 'Overlooks Rutland Gate tree avenue.' }
    ]
  },
  {
    id: 'vis-che-14',
    name: 'Palavakkam Breakers',
    location: 'Kalaignar Karunanidhi Salai, Palavakkam',
    microMarket: 'ECR',
    coordinates: [12.9580, 80.2560],
    price: 38000000,
    priceDisplay: '₹3.80 Cr',
    rent: 90000,
    rentDisplay: '₹90,000 / mo',
    bhk: 3,
    area: 2150,
    propertyType: 'Coastal Home',
    status: 'Available',
    yearBuilt: 2023,
    floor: '2nd of 3 floors',
    images: {
      hero: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80',
      gallery: [
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1200&q=80'
      ],
      thumbnail: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=400&q=80',
      floorPlan: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80',
      immersive: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1200&q=80',
      neighborhood: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'
    },
    coverImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1200&q=80'
    ],
    homeDNA: {
      quiet: 90,
      naturalLight: 94,
      social: 88,
      workFriendly: 90,
      green: 92,
      familyFriendly: 88
    },
    amenities: [
      '300m to Sandy Palavakkam Beach',
      'Rooftop Stargazing Deck',
      'Private Terrace Garden',
      'Solar Heated Water',
      'Covered Stilt Parking',
      '24/7 Gated Security'
    ],
    sunlight: {
      morning: 'East balcony captures coastal dawn light.',
      noon: 'Continuous sea breeze maintains airy microclimate.',
      evening: 'Warm amber tones across terrace garden.',
      goldenHourQuality: 'Vivid (5:25 PM - 6:20 PM)'
    },
    commute: {
      tidelPark: '14 min',
      airport: '28 min',
      centralStation: '38 min',
      ecrBeaches: '3 min walk',
      metro: '10 min to Thoraipakkam Metro'
    },
    neighborhood: {
      walkScore: 82,
      quietRating: 90,
      treeCanopyPercent: 50,
      safetyIndex: 'High',
      noiseLevel: '38 dB (Coastal Quiet)'
    },
    priceTrend: [
      { year: '2021', price: 3.1 },
      { year: '2022', price: 3.35 },
      { year: '2023', price: 3.55 },
      { year: '2024', price: 3.7 },
      { year: '2025', price: 3.75 },
      { year: '2026', price: 3.8 }
    ],
    fairPrice: {
      estimatedValue: 37800000,
      marketRangeLow: 36500000,
      marketRangeHigh: 39000000,
      status: 'Fairly Priced'
    },
    priceDrop: {
      hasDropped: false
    },
    tradeoffs: [
      'Idyllic beach proximity and coastal serenity, but proximity to sea air necessitates periodic check of exterior paint finishes.',
      'A 14-minute drive across to OMR during peak morning hours.'
    ],
    story: 'A seaside haven thoughtfully positioned just 300 meters from the shoreline. High ceilings, wide overhangs, and natural travertine surfaces create an organic coastal experience.',
    verification: {
      status: 'Fully Verified',
      completenessScore: 95,
      documentChecklist: ['CMDA Approved', 'CRZ Cleared', 'Patta Verified', 'RERA Registered'],
      dataQuality: 'High'
    },
    futureFit: [
      { scenario: 'Need more WFH space', fit: 92, explanation: 'Breezy terrace study ideal for focused remote work.' },
      { scenario: 'Family expansion', fit: 88, explanation: 'Safe gated lane for kids with quick beach outings.' },
      { scenario: 'Need more storage', fit: 84, explanation: 'Built-in lofts and storage alcoves.' }
    ],
    rooms3D: [
      { id: 'living', name: 'Coastal Living Room', position: [0, 1.2, 0], fov: 62, desc: 'Travertine floors and French doors opening to coastal breeze.' },
      { id: 'kitchen', name: 'Open Kitchen', position: [-2.2, 1.0, -1.0], fov: 55, desc: 'Natural oak cabinets and breakfast counter.' },
      { id: 'bedroom', name: 'Sea-Breeze Master', position: [2.2, 1.1, -1.7], fov: 58, desc: 'Cross-ventilated bedroom with natural light.' },
      { id: 'workspace', name: 'Quiet Study Nook', position: [-1.6, 1.0, 1.4], fov: 50, desc: 'Desk facing green palm garden.' },
      { id: 'balcony', name: 'Sea Breeze Deck', position: [0, 0.9, 2.9], fov: 66, desc: 'Wooden deck with planter boxes.' }
    ]
  },
  {
    id: 'vis-che-15',
    name: 'Navalur Green Spire',
    location: 'OMR Expressway, Navalur',
    microMarket: 'OMR - Navalur',
    coordinates: [12.8465, 80.2268],
    price: 7800000,
    priceDisplay: '₹78 Lakhs',
    rent: 24000,
    rentDisplay: '₹24,000 / mo',
    bhk: 2,
    area: 1180,
    propertyType: 'Apartment',
    status: 'Available',
    yearBuilt: 2024,
    floor: '8th of 16 floors',
    images: {
      hero: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
      gallery: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1200&q=80'
      ],
      thumbnail: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80',
      floorPlan: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80',
      immersive: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1200&q=80',
      neighborhood: 'https://images.unsplash.com/photo-1477959858617-67f30bc75b82?auto=format&fit=crop&w=800&q=80'
    },
    coverImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1200&q=80'
    ],
    homeDNA: {
      quiet: 76,
      naturalLight: 88,
      social: 84,
      workFriendly: 92,
      green: 78,
      familyFriendly: 82
    },
    amenities: [
      'Panoramic 8th Floor Views',
      'Rooftop Jogging Track',
      'Gigabit Fiber Pre-Installed',
      'Clubhouse with Indoor Badminton',
      'Covered Parking',
      'Solar Powered Common Utilities'
    ],
    sunlight: {
      morning: 'Clear morning light through large East facing living room windows.',
      noon: 'Cross draft between front door and balcony keeps unit breezy.',
      evening: 'Dusk light softens over the Navalur lake in the distance.',
      goldenHourQuality: 'Bright & Open (5:45 PM - 6:30 PM)'
    },
    commute: {
      tidelPark: '24 min',
      airport: '34 min',
      centralStation: '48 min',
      ecrBeaches: '14 min',
      metro: '6 min to upcoming Siruseri SIPCOT Metro'
    },
    neighborhood: {
      walkScore: 78,
      quietRating: 78,
      treeCanopyPercent: 26,
      safetyIndex: 'High',
      noiseLevel: '44 dB (Moderate Suburb)'
    },
    priceTrend: [
      { year: '2021', price: 0.62 },
      { year: '2022', price: 0.67 },
      { year: '2023', price: 0.71 },
      { year: '2024', price: 0.74 },
      { year: '2025', price: 0.76 },
      { year: '2026', price: 0.78 }
    ],
    fairPrice: {
      estimatedValue: 7700000,
      marketRangeLow: 7400000,
      marketRangeHigh: 8000000,
      status: 'Fairly Priced'
    },
    priceDrop: {
      hasDropped: true,
      previousPrice: 8300000,
      currentPrice: 7800000,
      dropAmount: 500000,
      date: '17 Sep 2026'
    },
    tradeoffs: [
      'Accessible entry point under ₹80L with modern high-rise amenities, but longer commute to central Chennai.',
      'Navalur expressway experiences peak-hour rush near toll junctions.'
    ],
    story: 'Designed as an intelligent first-time buyer home for IT specialists working in Siruseri SIPCOT. Combines efficient square-footage design with green park amenities.',
    verification: {
      status: 'Fully Verified',
      completenessScore: 92,
      documentChecklist: ['DTCP & CMDA Approved', 'RERA: TN/29/Building/0781', 'Clear Legal Scrutiny', 'SBI Approved Project'],
      dataQuality: 'High'
    },
    futureFit: [
      { scenario: 'Need more WFH space', fit: 86, explanation: 'Second bedroom easily fits dual monitors and desk.' },
      { scenario: 'Family expansion', fit: 78, explanation: 'Suited for young couple starting a family.' },
      { scenario: 'Need more storage', fit: 76, explanation: 'Overhead lofts available in both bedrooms.' }
    ],
    rooms3D: [
      { id: 'living', name: 'Open Living Hall', position: [0, 1.2, 0], fov: 60, desc: 'Efficient layout with light tiled floors and lake breeze.' },
      { id: 'kitchen', name: 'L-Shaped Kitchen', position: [-2.0, 1.0, -0.9], fov: 55, desc: 'Granite counter with stainless sink.' },
      { id: 'bedroom', name: 'Master Bedroom', position: [2.0, 1.1, -1.5], fov: 58, desc: 'Large window with open suburban vista.' },
      { id: 'workspace', name: 'Work Nook', position: [-1.4, 1.0, 1.2], fov: 50, desc: 'Compact dedicated work alcove.' },
      { id: 'balcony', name: 'High-Rise Balcony', position: [0, 0.9, 2.6], fov: 65, desc: 'Views overlooking Navalur green expanses.' }
    ]
  }
,
  {
    id: 'vis-che-16',
    name: 'The Harrington Enclave',
    location: 'Harrington Road, Chetpet',
    microMarket: 'Nungambakkam',
    coordinates: [13.0725, 80.2378],
    price: 46000000,
    priceDisplay: '₹4.60 Cr',
    rent: 110000,
    rentDisplay: '₹1.10 L / mo',
    bhk: 3,
    area: 2450,
    propertyType: 'Boutique Residence',
    status: 'Available',
    yearBuilt: 2024,
    floor: '2nd of 4 floors',
    coverImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1556912173-3bb406ef7e77?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80'
    ],
    images: {
      hero: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1556912173-3bb406ef7e77?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80'
      ],
      thumbnail: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=400&q=80',
      floorPlan: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=800&q=80',
      immersive: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      neighborhood: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80'
    },
    homeDNA: {
      quiet: 94,
      naturalLight: 90,
      social: 78,
      workFriendly: 92,
      green: 94,
      familyFriendly: 90
    },
    amenities: [
      'Mature Rain Tree Canopy View',
      'Dedicated Acoustic Flex Study',
      'Italian Statuario Marble Living',
      'Private Direct Lift Entry',
      'Double Covered Basement Parking',
      '100% DG Power Backup'
    ],
    sunlight: {
      morning: 'Gentle sunrise filtered through avenue rain trees into east-facing living loggia.',
      noon: 'Deep overhangs preserve natural cool ambient light during peak sun hours.',
      evening: 'Warm west golden reflections over colonial-style garden court.',
      goldenHourQuality: 'Sublime (5:15 PM - 6:15 PM)'
    },
    commute: {
      tidelPark: '26 min',
      airport: '30 min',
      centralStation: '14 min',
      ecrBeaches: '28 min',
      metro: '7 min walk to Chetpet Metro'
    },
    neighborhood: {
      walkScore: 92,
      quietRating: 94,
      treeCanopyPercent: 64,
      safetyIndex: 'Exceptional',
      noiseLevel: '36 dB (Avenue Quiet)'
    },
    priceTrend: [
      { year: '2021', price: 3.8 },
      { year: '2022', price: 4.0 },
      { year: '2023', price: 4.2 },
      { year: '2024', price: 4.4 },
      { year: '2025', price: 4.5 },
      { year: '2026', price: 4.6 }
    ],
    fairPrice: {
      estimatedValue: 45500000,
      marketRangeLow: 44000000,
      marketRangeHigh: 47000000,
      status: 'Fairly Priced'
    },
    priceDrop: {
      hasDropped: true,
      previousPrice: 48000000,
      currentPrice: 46000000,
      dropAmount: 2000000,
      date: '12 Sep 2026'
    },
    tradeoffs: [
      'Boutique enclave of only 8 residences provides privacy, but lower shared amenities compared to massive townships.',
      'Harrington Road experiences moderate school-hour traffic at 8:30 AM.'
    ],
    story: 'Designed as a quiet, tree-canopy sanctuary on Harrington Road. Incorporates soundproof triple glazing, expansive verandahs, and bespoke wood finishes.',
    verification: {
      status: 'Fully Verified',
      completenessScore: 96,
      documentChecklist: ['CMDA Sanctioned', 'Clear Title by Senior Counsel', 'Patta Verified', 'Occupancy Certificate Issued'],
      dataQuality: 'High'
    },
    futureFit: [
      { scenario: 'Need more WFH space', fit: 94, explanation: 'Standalone study with soundproof door and garden view.' },
      { scenario: 'Family expansion', fit: 88, explanation: 'Generous 3BHK footprint accommodates children and elderly parents.' }
    ],
    rooms3D: [
      { id: 'living', name: 'Canopy Living Hall', position: [0, 1.2, 0], fov: 60, desc: 'Expansive living room opening to rain tree loggia.' },
      { id: 'kitchen', name: 'Warm Oak Kitchen', position: [-2.2, 1.0, -1.0], fov: 55, desc: 'Quartz counters and pantry.' },
      { id: 'bedroom', name: 'Treeview Master Suite', position: [2.2, 1.1, -1.6], fov: 58, desc: 'East-facing bedroom with dressing room.' }
    ]
  },
  {
    id: 'vis-che-17',
    name: 'The MRC Oceanfront Sky Penthouse',
    location: 'Santhome High Road, MRC Nagar',
    microMarket: 'MRC Nagar',
    coordinates: [13.0185, 80.2764],
    price: 185000000,
    priceDisplay: '₹18.50 Cr',
    rent: 420000,
    rentDisplay: '₹4.20 L / mo',
    bhk: 4,
    area: 4200,
    propertyType: 'Ocean Penthouse',
    status: 'Available',
    yearBuilt: 2025,
    floor: '18th of 20 floors',
    coverImage: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1540518614846-7ede433c4ef3?auto=format&fit=crop&w=1200&q=80'
    ],
    images: {
      hero: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1540518614846-7ede433c4ef3?auto=format&fit=crop&w=1200&q=80'
      ],
      thumbnail: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=400&q=80',
      floorPlan: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80',
      immersive: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
      neighborhood: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'
    },
    homeDNA: {
      quiet: 90,
      naturalLight: 98,
      social: 95,
      workFriendly: 94,
      green: 80,
      familyFriendly: 86
    },
    amenities: [
      '180-Degree Bay of Bengal Panorama',
      'Private Jacuzzi Terrace',
      'Sub-Zero & Poggenpohl Kitchen',
      'Smart Home Biometrics & Voice Automation',
      'Triple Covered Parking',
      'Infinity Pool & Sky Lounge Access'
    ],
    sunlight: {
      morning: 'Spectacular unobstructed dawn sunrise over the ocean horizon.',
      noon: 'Filtered ocean daylight with reflective low-E double glazing.',
      evening: 'Golden sunset reflections over the Adyar estuary.',
      goldenHourQuality: 'Unmatched (5:00 PM - 6:15 PM)'
    },
    commute: {
      tidelPark: '14 min',
      airport: '28 min',
      centralStation: '22 min',
      ecrBeaches: '12 min',
      metro: '10 min to Mandaveli Metro'
    },
    neighborhood: {
      walkScore: 84,
      quietRating: 90,
      treeCanopyPercent: 42,
      safetyIndex: 'Exceptional',
      noiseLevel: '38 dB (Sea Breeze)'
    },
    priceTrend: [
      { year: '2021', price: 15.5 },
      { year: '2022', price: 16.2 },
      { year: '2023', price: 17.0 },
      { year: '2024', price: 17.6 },
      { year: '2025', price: 18.0 },
      { year: '2026', price: 18.5 }
    ],
    fairPrice: {
      estimatedValue: 182000000,
      marketRangeLow: 178000000,
      marketRangeHigh: 188000000,
      status: 'Fairly Priced'
    },
    priceDrop: {
      hasDropped: true,
      previousPrice: 195000000,
      currentPrice: 185000000,
      dropAmount: 10000000,
      date: '20 Sep 2026'
    },
    tradeoffs: [
      'High-altitude sea spray requires specialized marine-grade window seals maintenance once every 2 years.',
      'Exclusive high-ticket asset with ₹38,000/mo association maintenance.'
    ],
    story: 'Panoramic oceanfront penthouse overlooking both the Adyar estuary and the Bay of Bengal. Floor-to-ceiling glass wraps around the 700 sq.ft entertainment salon.',
    verification: {
      status: 'Fully Verified',
      completenessScore: 98,
      documentChecklist: ['CMDA Approved', 'Coastal Zone Clearance', 'Clear Legal Scrutiny', 'SBI Approved'],
      dataQuality: 'Exceptional'
    },
    futureFit: [
      { scenario: 'Need more WFH space', fit: 96, explanation: 'Ocean-facing executive study with sound baffling.' },
      { scenario: 'Family expansion', fit: 90, explanation: 'Four large ensuite bedrooms with private zoning.' }
    ],
    rooms3D: [
      { id: 'living', name: 'Panoramic Ocean Salon', position: [0, 1.3, 0], fov: 65, desc: 'Expansive living room framing open sea horizon.' },
      { id: 'kitchen', name: 'Poggenpohl Ocean Kitchen', position: [-2.6, 1.1, -1.2], fov: 56, desc: 'Sub-Zero refrigeration and breakfast counter.' },
      { id: 'bedroom', name: 'Oceanfront Master Suite', position: [2.5, 1.2, -2.0], fov: 60, desc: 'Wake up to the Bay of Bengal sunrise.' }
    ]
  }
];

export const CHENNAI_PROPERTIES = RAW_CHENNAI_PROPERTIES.map(p => {
  const hero = p.images?.hero || p.coverImage;
  const gallery = p.images?.gallery || p.gallery || [hero];
  return {
    ...p,
    title: p.name || p.title,
    name: p.name || p.title,
    images: p.images || {
      hero,
      gallery,
      thumbnail: p.coverImage,
      floorPlan: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=800&q=80',
      immersive: hero,
      neighborhood: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80'
    },
    heroImage: hero,
    coverImage: hero,
    gallery,
    carpetArea: p.area || p.carpetArea,
    area: p.area || p.carpetArea
  };
});

