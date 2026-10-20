import React, { createContext, useContext, useState, useEffect } from 'react';
import { CHENNAI_PROPERTIES } from '../data/properties';

const AppContext = createContext();

const STORAGE_KEYS = {
  THEME: 'vistara_theme',
  AUTH_USER: 'vistara_auth_user',
  REGISTERED_USERS: 'vistara_registered_users',
  PROPERTIES: 'vistara_properties',
  SAVED: 'vistara_saved_properties',
  COLLECTIONS: 'vistara_collections',
  COMPARE: 'vistara_compare_list',
  DECISION: 'vistara_decision_room',
  VISITS: 'vistara_visits',
  INQUIRIES: 'vistara_inquiries',
  SELLER_LISTINGS: 'vistara_seller_listings',
  AGENT_CLIENTS: 'vistara_agent_clients',
  NOTIFICATIONS: 'vistara_notifications',
  WATCHED_PRICES: 'vistara_watched_prices'
};

// Seed accounts for instant demo login and testing
const SEED_USERS = [
  {
    id: 'usr-seeker-01',
    name: 'Mohamed Shafar S',
    email: 'seeker@vistara.ai',
    password: 'password123',
    role: 'seeker',
    mode: 'buy',
    onboardingComplete: true,
    isPremium: false,
    lifeProfile: {
      profileName: 'Quiet Daylight Technologist',
      affinities: ['Quiet Living', 'Natural Light', 'Work Friendly'],
      commuteDestination: 'tidelPark',
      futureScenarios: ['Need more WFH space', 'Family expansion']
    },
    buyPreferences: {
      preferredLocations: ['OMR', 'Besant Nagar', 'Adyar', 'Boat Club'],
      maxBudget: 16000000,
      bhk: 3,
      propertyType: 'Apartment'
    },
    rentPreferences: {
      preferredLocations: ['Besant Nagar', 'OMR', 'Adyar'],
      maxBudget: 50000,
      bhk: 3,
      propertyType: 'Apartment'
    }
  },
  {
    id: 'usr-seller-01',
    name: 'Suresh Narayanan',
    email: 'seller@vistara.ai',
    password: 'password123',
    role: 'seller',
    onboardingComplete: true,
    sellerPreferences: {
      entityType: 'Private Owner',
      primaryMarket: 'OMR - Perungudi',
      portfolioSize: '1-3 Residences'
    }
  },
  {
    id: 'usr-agent-01',
    name: 'Aravind Swaminathan',
    email: 'agent@vistara.ai',
    password: 'password123',
    role: 'agent',
    onboardingComplete: true,
    agentPreferences: {
      agencyName: 'Vistara Prime Partners',
      reraLicense: 'TN/AGENT/0091/2023',
      specialization: 'South Chennai & Coastal Luxury'
    }
  }
];

const INITIAL_COLLECTIONS = [
  { id: 'col-1', name: 'Work-Friendly Sanctuaries', description: 'Homes with acoustic isolation and fiber infrastructure', propertyIds: ['vis-che-02', 'vis-che-04'] },
  { id: 'col-2', name: 'Coastal Shortlist', description: 'Within 5 minutes walk of ECR or Besant Nagar beach', propertyIds: ['vis-che-03', 'vis-che-06'] },
  { id: 'col-3', name: 'Family Longlist', description: 'Proximity to parks and top academic institutions', propertyIds: ['vis-che-08', 'vis-che-07'] }
];

const INITIAL_DECISION = {
  columns: {
    mustHave: ['vis-che-02'],
    niceToHave: ['vis-che-03', 'vis-che-04'],
    concern: ['vis-che-09'],
    reject: []
  },
  members: [
    {
      id: 'mem-self',
      name: 'Mohamed Shafar S',
      relationship: 'Self',
      role: 'Primary Decision Maker',
      priorities: {
        budget: 'High',
        location: 'High',
        space: 'Medium',
        commute: 'High',
        lifestyle: 'High',
        schools: 'Low',
        amenities: 'Medium',
        futureFit: 'High'
      },
      notes: [
        { id: 'n-1', propertyId: 'vis-che-02', text: 'Love the dual-aspect morning sun in the breakfast nook.', type: 'Must-have' }
      ]
    },
    {
      id: 'mem-partner',
      name: 'Priya',
      relationship: 'Partner',
      role: 'Co-Decision Maker',
      priorities: {
        budget: 'Medium',
        location: 'High',
        space: 'High',
        commute: 'High',
        lifestyle: 'High',
        schools: 'Medium',
        amenities: 'High',
        futureFit: 'High'
      },
      notes: [
        { id: 'n-2', propertyId: 'vis-che-04', text: 'Commute to Tidel Park is under 8 minutes; ideal for sprint weeks.', type: 'Nice-to-have' }
      ]
    },
    {
      id: 'mem-parent',
      name: 'Sundaram',
      relationship: 'Parent',
      role: 'Advisor',
      priorities: {
        budget: 'High',
        location: 'High',
        space: 'High',
        commute: 'Low',
        lifestyle: 'High',
        schools: 'Low',
        amenities: 'Medium',
        futureFit: 'Medium'
      },
      notes: [
        { id: 'n-3', propertyId: 'vis-che-03', text: 'Beach walk is wonderful for evenings, but weekend parking is crowded.', type: 'Concern' }
      ]
    }
  ]
};

const INITIAL_VISITS = [
  {
    id: 'vis-sched-01',
    propertyId: 'vis-che-02',
    date: '2026-09-28',
    time: '11:00 AM',
    status: 'Scheduled',
    notes: 'Confirming natural light in east bedroom at noon',
    ratings: null,
    verdict: null
  },
  {
    id: 'vis-sched-02',
    propertyId: 'vis-che-04',
    date: '2026-09-22',
    time: '04:30 PM',
    status: 'Completed',
    notes: 'Acoustic glass was remarkably quiet even with OMR traffic',
    ratings: { naturalLight: 5, space: 4, noise: 4, location: 5, overall: 4 },
    verdict: 'Loved'
  }
];

const INITIAL_NOTIFICATIONS = [
  {
    id: 'notif-1',
    type: 'Price Drop',
    title: 'Price Drop: The Sanctuary at Boat Club',
    description: 'The Sanctuary at Boat Club dropped ₹1.00 Cr. Current asking price: ₹24.50 Cr.',
    message: 'The Sanctuary at Boat Club dropped ₹1.00 Cr (Now ₹24.50 Cr).',
    timestamp: '2 hours ago',
    date: '2 hours ago',
    read: false,
    propertyId: 'vis-che-01',
    action: 'property'
  },
  {
    id: 'notif-2',
    type: 'Visit Reminder',
    title: 'Upcoming Private Walkthrough',
    description: 'The Sunlit Atrium, Thoraipakkam visit confirmed for Sep 28 at 11:00 AM.',
    message: 'The Sunlit Atrium, Thoraipakkam visit confirmed for Sep 28 at 11:00 AM.',
    timestamp: 'Yesterday',
    date: 'Yesterday',
    read: false,
    propertyId: 'vis-che-02',
    action: 'visits'
  },
  {
    id: 'notif-3',
    type: 'New Match',
    title: 'New 95% Fit Property Listed',
    description: 'Silicon Horizon in Perungudi matches your WFH and natural light criteria.',
    message: 'Silicon Horizon in Perungudi matches your WFH and natural light criteria.',
    timestamp: '2 days ago',
    date: '2 days ago',
    read: false,
    propertyId: 'vis-che-04',
    action: 'property'
  },
  {
    id: 'notif-4',
    type: 'Inquiry',
    title: 'New Buyer Inquiry Received',
    description: 'Dr. S. K. Narayanan sent an inquiry regarding Title verification on Boat Club villa.',
    message: 'Dr. S. K. Narayanan sent an inquiry regarding Title verification.',
    timestamp: '3 days ago',
    date: '3 days ago',
    read: true,
    propertyId: 'vis-che-01',
    action: 'seller-inquiries'
  },
  {
    id: 'notif-5',
    type: 'Seller Update',
    title: 'Listing Health Milestone Reached',
    description: 'Your Besant Nagar residence achieved 96% listing completeness score.',
    message: 'Listing completeness reached 96%.',
    timestamp: '4 days ago',
    date: '4 days ago',
    read: true,
    propertyId: 'vis-che-03',
    action: 'seller-listings'
  },
  {
    id: 'notif-6',
    type: 'Agent Follow-up',
    title: 'Advisory Dossier Dispatched',
    description: 'Agent Arvind Swaminathan shared acoustic survey for Kotturpuram Sanctuary.',
    message: 'Acoustic survey dossier dispatched by agent.',
    timestamp: '5 days ago',
    date: '5 days ago',
    read: true,
    propertyId: 'vis-che-07',
    action: 'agent-dashboard'
  },
  {
    id: 'notif-7',
    type: 'Saved Home Update',
    title: 'Saved Residence Gallery Updated',
    description: '3 new high-res architectural photos and updated floor plans added to Harrington Enclave.',
    message: 'New photos and CAD plans added.',
    timestamp: '6 days ago',
    date: '6 days ago',
    read: true,
    propertyId: 'vis-che-16',
    action: 'property'
  },
  {
    id: 'notif-8',
    type: 'Nearby Match',
    title: 'Matching Home in Besant Nagar',
    description: 'A 4 BHK sea-breeze residence was just verified within 500m of your search radius.',
    message: 'New verified residence within 500m of target.',
    timestamp: '1 week ago',
    date: '1 week ago',
    read: true,
    propertyId: 'vis-che-03',
    action: 'property'
  }
];

const INITIAL_SELLER_LISTINGS = {
  'vis-che-01': { status: 'Published', listingHealth: 98, missingItems: [] },
  'vis-che-02': { status: 'Published', listingHealth: 92, missingItems: ['Detailed CAD Blueprint'] },
  'vis-che-04': { status: 'Published', listingHealth: 88, missingItems: ['2 Additional Photos', 'Acoustic Certificate'] },
  'vis-che-06': { status: 'Paused', listingHealth: 84, missingItems: ['Floor Plan Dimensions'] }
};

const INITIAL_INQUIRIES = [
  {
    id: 'lead-01',
    name: 'Priyanka Menon',
    phone: '+91 98401 99281',
    email: 'p.menon@techcorp.io',
    propertyId: 'vis-che-02',
    date: '24 Sep 2026',
    message: 'Inquiring about top-floor natural light and immediate sale registration timeline.',
    status: 'Qualified',
    source: '3D Spatial Tour',
    replies: []
  },
  {
    id: 'lead-02',
    name: 'Rohan Deshmukh',
    phone: '+91 97910 44211',
    email: 'rohan.d@finadvisors.in',
    propertyId: 'vis-che-04',
    date: '23 Sep 2026',
    message: 'Would like to visit this Saturday around 11:30 AM to inspect acoustic WFH setup.',
    status: 'Visit Scheduled',
    source: 'Compare Arena',
    replies: []
  },
  {
    id: 'lead-03',
    name: 'Dr. S. K. Narayanan',
    phone: '+91 94440 12891',
    email: 'dr.narayanan@apollo.org',
    propertyId: 'vis-che-01',
    date: '22 Sep 2026',
    message: 'Checking title deeds and patta verification status for the Boat Club residence.',
    status: 'Contacted',
    source: 'Verified Badge',
    replies: []
  }
];

const INITIAL_AGENT_CLIENTS = [
  {
    id: 'cl-1',
    name: 'Dr. Arvind Swaminathan',
    phone: '+91 98401 23456',
    email: 'arvind.s@apollo.org',
    type: 'Buyer',
    budget: '₹4.5 - 6.0 Cr',
    targetLocations: ['Boat Club', 'Adyar', 'Kotturpuram'],
    bhk: 4,
    lifestyle: 'Quiet Living & Nature Canopy',
    keyAffinities: ['Quiet Living', 'Green', 'Natural Light'],
    commute: 'Airport under 30 mins',
    homeDNA: 'Acoustic Stillness > 90',
    futureFit: 'Library & WFH space',
    notes: 'Prefers ground or lower floors with mature garden views.',
    pipelineStatus: 'Shortlisted',
    assignedProperties: ['vis-che-07', 'vis-che-10'],
    lastContact: 'Yesterday',
    nextFollowUp: 'Today, 2:00 PM',
    followUps: [
      { id: 'fu-1', text: 'Share Acoustic Report for Kotturpuram Sanctuary', due: 'Today, 2:00 PM', status: 'Due Today' },
      { id: 'fu-2', text: 'Confirm walkthrough with family', due: 'Tomorrow, 10:00 AM', status: 'Upcoming' }
    ]
  },
  {
    id: 'cl-2',
    name: 'Priyanka & Rajiv Menon',
    phone: '+91 97910 88231',
    email: 'menon.rajiv@techcorp.io',
    type: 'Buyer',
    budget: '₹1.2 - 1.6 Cr',
    targetLocations: ['OMR - Thoraipakkam', 'Perungudi'],
    bhk: 3,
    lifestyle: 'Work Friendly & High Daylight',
    keyAffinities: ['Work Friendly', 'Natural Light'],
    commute: 'Tidel Park under 10 mins',
    homeDNA: 'Daylight Index > 92',
    futureFit: 'Dedicated Dual-Desk WFH',
    notes: 'Both partners lead engineering teams; acoustic isolation is non-negotiable.',
    pipelineStatus: 'Visit Scheduled',
    assignedProperties: ['vis-che-02', 'vis-che-04'],
    lastContact: '3 days ago',
    nextFollowUp: 'Sunday 11:00 AM',
    followUps: [
      { id: 'fu-3', text: 'Conduct private tour at The Sunlit Atrium', due: 'Sunday 11:00 AM', status: 'Upcoming' }
    ]
  },
  {
    id: 'cl-3',
    name: 'Sundar Varadarajan',
    phone: '+91 94440 91823',
    email: 'sundar.v@finvest.in',
    type: 'Renter',
    budget: '₹1.2 - 1.5 L / mo',
    targetLocations: ['Besant Nagar', 'Alwarpet'],
    bhk: 3,
    lifestyle: 'Beachside & Social Entertaining',
    keyAffinities: ['Social', 'Green'],
    commute: 'Adyar bridge under 15 mins',
    homeDNA: 'Social Entertaining > 85',
    futureFit: 'Guest suite',
    notes: 'Relocating from Singapore; looking for sea breeze and high walkability.',
    pipelineStatus: 'Negotiating',
    assignedProperties: ['vis-che-03'],
    lastContact: '5 hours ago',
    nextFollowUp: 'Tomorrow 11:30 AM',
    followUps: [
      { id: 'fu-4', text: 'Negotiate Besant Nagar sea-breeze lease deposit terms', due: 'Tomorrow 11:30 AM', status: 'Upcoming' }
    ]
  }
];

export function AppProvider({ children }) {
  // Theme: 'light' | 'dark' | 'golden-hour' (Defaults to 'light')
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem(STORAGE_KEYS.THEME) || 'light';
  });

  // Registered Users Registry (Local Storage Database)
  const [registeredUsers, setRegisteredUsers] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.REGISTERED_USERS);
      return saved ? JSON.parse(saved) : SEED_USERS;
    } catch {
      return SEED_USERS;
    }
  });

  // Authenticated User Session (null if guest / unauthenticated)
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.AUTH_USER);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Controlled Judge Demo Flag
  const [isJudgeDemo, setIsJudgeDemo] = useState(false);

  // Command Palette Open state (Ctrl+K)
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  // User State Helpers
  const role = currentUser?.role || null;
  const mode = currentUser?.mode || 'buy';
  const isAuthenticated = Boolean(currentUser);
  const isOnboardingComplete = Boolean(currentUser?.onboardingComplete);

  // Central Properties State (Allows Seller Edits, Price Drops, Additions to persist!)
  const [properties, setProperties] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROPERTIES);
      return saved ? JSON.parse(saved) : CHENNAI_PROPERTIES;
    } catch {
      return CHENNAI_PROPERTIES;
    }
  });

  // Saved Properties
  const [savedPropertyIds, setSavedPropertyIds] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SAVED);
      return saved ? JSON.parse(saved) : ['vis-che-02', 'vis-che-03'];
    } catch {
      return ['vis-che-02', 'vis-che-03'];
    }
  });

  // Watched Price Alerts
  const [watchedPropertyIds, setWatchedPropertyIds] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.WATCHED_PRICES);
      return saved ? JSON.parse(saved) : ['vis-che-01', 'vis-che-02'];
    } catch {
      return ['vis-che-01', 'vis-che-02'];
    }
  });

  // Collections
  const [collections, setCollections] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.COLLECTIONS);
      return saved ? JSON.parse(saved) : INITIAL_COLLECTIONS;
    } catch {
      return INITIAL_COLLECTIONS;
    }
  });

  // Compare List
  const [compareList, setCompareList] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.COMPARE);
      return saved ? JSON.parse(saved) : ['vis-che-02', 'vis-che-04'];
    } catch {
      return ['vis-che-02', 'vis-che-04'];
    }
  });

  // Decision Room State (with family members, priorities, and notes)
  const [decisionRoom, setDecisionRoom] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.DECISION);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.columns && parsed.members) return parsed;
        // Migration if older format
        return {
          columns: parsed.mustHave ? parsed : INITIAL_DECISION.columns,
          members: INITIAL_DECISION.members
        };
      }
      return INITIAL_DECISION;
    } catch {
      return INITIAL_DECISION;
    }
  });

  // Scheduled Visits
  const [visits, setVisits] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.VISITS);
      return saved ? JSON.parse(saved) : INITIAL_VISITS;
    } catch {
      return INITIAL_VISITS;
    }
  });

  // Notifications
  const [notifications, setNotifications] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
      return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
    } catch {
      return INITIAL_NOTIFICATIONS;
    }
  });

  // Inquiries Leads
  const [inquiries, setInquiries] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.INQUIRIES);
      return saved ? JSON.parse(saved) : INITIAL_INQUIRIES;
    } catch {
      return INITIAL_INQUIRIES;
    }
  });

  // Seller Listings State Machine & Health Tracking
  const [sellerListings, setSellerListings] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SELLER_LISTINGS);
      return saved ? JSON.parse(saved) : INITIAL_SELLER_LISTINGS;
    } catch {
      return INITIAL_SELLER_LISTINGS;
    }
  });

  // Agent CRM Clients
  const [agentClients, setAgentClients] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.AGENT_CLIENTS);
      return saved ? JSON.parse(saved) : INITIAL_AGENT_CLIENTS;
    } catch {
      return INITIAL_AGENT_CLIENTS;
    }
  });

  // Sync Theme to HTML Root
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
  }, [theme]);

  // Sync Auth User
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(STORAGE_KEYS.AUTH_USER, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(STORAGE_KEYS.AUTH_USER);
    }
  }, [currentUser]);

  // Sync Registered Users Database
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.REGISTERED_USERS, JSON.stringify(registeredUsers));
  }, [registeredUsers]);

  // Sync Properties
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PROPERTIES, JSON.stringify(properties));
  }, [properties]);

  // Sync Saved
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SAVED, JSON.stringify(savedPropertyIds));
  }, [savedPropertyIds]);

  // Sync Watched Prices
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.WATCHED_PRICES, JSON.stringify(watchedPropertyIds));
  }, [watchedPropertyIds]);

  // Sync Collections
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.COLLECTIONS, JSON.stringify(collections));
  }, [collections]);

  // Sync Compare
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.COMPARE, JSON.stringify(compareList));
  }, [compareList]);

  // Sync Decision Room
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.DECISION, JSON.stringify(decisionRoom));
  }, [decisionRoom]);

  // Sync Visits
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.VISITS, JSON.stringify(visits));
  }, [visits]);

  // Sync Notifications
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
  }, [notifications]);

  // Sync Inquiries
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(inquiries));
  }, [inquiries]);

  // Sync Seller Listings
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SELLER_LISTINGS, JSON.stringify(sellerListings));
  }, [sellerListings]);

  // Sync Agent Clients
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.AGENT_CLIENTS, JSON.stringify(agentClients));
  }, [agentClients]);

  // Update Decision Room 'Self' member name whenever currentUser.name changes
  useEffect(() => {
    if (currentUser?.name) {
      setDecisionRoom(prev => ({
        ...prev,
        members: (prev.members || []).map(m => 
          m.id === 'mem-self' ? { ...m, name: currentUser.name } : m
        )
      }));
    }
  }, [currentUser?.name]);

  // ================= AUTHENTICATION ACTIONS =================

  const login = (email, password) => {
    const trimmedEmail = email.trim().toLowerCase();
    const found = registeredUsers.find(u => u.email.toLowerCase() === trimmedEmail && u.password === password);
    if (!found) {
      return { success: false, error: 'Invalid email or password. You may use a demo account below.' };
    }
    setCurrentUser(found);
    setIsJudgeDemo(false);
    return { success: true, user: found };
  };

  const signup = (name, email, password) => {
    const trimmedEmail = email.trim().toLowerCase();
    const existing = registeredUsers.find(u => u.email.toLowerCase() === trimmedEmail);
    if (existing) {
      return { success: false, error: 'An account with this email already exists. Please log in.' };
    }
    const newUser = {
      id: `usr-${Date.now()}`,
      name: name.trim(),
      email: trimmedEmail,
      password,
      role: null,
      mode: 'buy',
      onboardingComplete: false,
      isPremium: false,
      lifeProfile: {},
      buyPreferences: {},
      rentPreferences: {},
      sellerPreferences: {},
      agentPreferences: {}
    };
    setRegisteredUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
    setIsJudgeDemo(false);
    return { success: true, user: newUser };
  };

  const logout = () => {
    setCurrentUser(null);
    setIsJudgeDemo(false);
  };

  const chooseRole = (newRole) => {
    if (!currentUser) return;
    const updated = {
      ...currentUser,
      role: newRole,
      onboardingComplete: false
    };
    setCurrentUser(updated);
    setRegisteredUsers(prev => prev.map(u => u.id === updated.id ? updated : u));
  };

  const completeOnboarding = (onboardingData) => {
    if (!currentUser) return;
    const updated = {
      ...currentUser,
      ...onboardingData,
      onboardingComplete: true
    };
    setCurrentUser(updated);
    setRegisteredUsers(prev => prev.map(u => u.id === updated.id ? updated : u));
  };

  const switchMode = (newMode) => {
    if (!currentUser) return;
    const updated = { ...currentUser, mode: newMode };
    setCurrentUser(updated);
  };

  const togglePremium = () => {
    if (!currentUser) return;
    const updated = { ...currentUser, isPremium: !currentUser.isPremium };
    setCurrentUser(updated);
  };

  const updateCurrentUser = (updates) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...updates };
    setCurrentUser(updated);
    setRegisteredUsers(prev => prev.map(u => u.id === updated.id ? updated : u));
  };

  const launchJudgeDemo = (presetName = 'WFH Professional') => {
    const activeName = currentUser?.name || 'Mohamed Shafar S';
    let demoProfile = { ...SEED_USERS[0], name: activeName };
    if (presetName === 'Seller Operations') demoProfile = { ...SEED_USERS[1], name: activeName };
    else if (presetName === 'Agent CRM') demoProfile = { ...SEED_USERS[2], name: activeName };
    else if (presetName === 'First-Time Buyer') {
      demoProfile = {
        ...SEED_USERS[0],
        name: activeName,
        mode: 'buy',
        lifeProfile: {
          profileName: 'Tech Commuter & First-Time Buyer',
          affinities: ['Work Friendly', 'Natural Light', 'Social'],
          commuteDestination: 'tidelPark',
          futureScenarios: ['Need more WFH space']
        },
        buyPreferences: {
          preferredLocations: ['OMR - Sholinganallur', 'OMR - Perungudi', 'OMR - Navalur'],
          maxBudget: 12000000,
          bhk: 2,
          propertyType: 'Apartment'
        }
      };
    } else if (presetName === 'Family Buyer') {
      demoProfile = {
        ...SEED_USERS[0],
        name: activeName,
        mode: 'buy',
        lifeProfile: {
          profileName: 'Multi-Gen Green Family',
          affinities: ['Family Friendly', 'Green', 'Quiet Living', 'Natural Light'],
          commuteDestination: 'airport',
          futureScenarios: ['Family expansion', 'Need more storage']
        },
        buyPreferences: {
          preferredLocations: ['Anna Nagar', 'Adyar', 'Kotturpuram', 'Poes Garden'],
          maxBudget: 75000000,
          bhk: 4,
          propertyType: 'Courtyard Apartment'
        }
      };
    } else if (presetName === 'Renter') {
      demoProfile = {
        ...SEED_USERS[0],
        name: activeName,
        mode: 'rent',
        lifeProfile: {
          profileName: 'Beachside Hybrid Renter',
          affinities: ['Natural Light', 'Social', 'Work Friendly'],
          commuteDestination: 'tidelPark',
          futureScenarios: ['Need more WFH space']
        },
        rentPreferences: {
          preferredLocations: ['Besant Nagar', 'ECR', 'Adyar'],
          maxBudget: 150000,
          bhk: 3,
          propertyType: 'Coastal Apartment'
        }
      };
    }
    setCurrentUser(demoProfile);
    setIsJudgeDemo(true);
  };

  // ================= PROPERTY ACTIONS & PERSISTENCE =================

  const updateProperty = (propertyId, updatedData) => {
    setProperties(prev => prev.map(p => {
      if (p.id === propertyId) {
        return { ...p, ...updatedData };
      }
      return p;
    }));
  };

  const addProperty = (newProperty) => {
    const formatted = {
      ...newProperty,
      id: newProperty.id || `vis-che-${Date.now()}`,
      images: newProperty.images || {
        hero: newProperty.coverImage || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
        gallery: [newProperty.coverImage || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80'],
        thumbnail: newProperty.coverImage || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=400&q=80',
        floorPlan: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=800&q=80',
        immersive: newProperty.coverImage || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
        neighborhood: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80'
      }
    };
    setProperties(prev => [formatted, ...prev]);
    setSellerListings(prev => ({
      ...prev,
      [formatted.id]: { 
        status: formatted.status || 'Published', 
        listingHealth: (formatted.status === 'Draft' ? 75 : 90), 
        missingItems: (formatted.status === 'Draft' ? ['Architectural CAD Upload', 'CMDA Registration Certificate'] : []) 
      }
    }));
    return formatted;
  };

  // Price Editing with Price Drop & Price History
  const updatePropertyPrice = (propertyId, newPrice) => {
    setProperties(prev => prev.map(p => {
      if (p.id === propertyId) {
        const oldPrice = p.price;
        const isDecrease = newPrice < oldPrice;
        const dropAmount = isDecrease ? oldPrice - newPrice : 0;

        const newHistory = [
          ...(p.priceHistory || []),
          {
            date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
            oldPrice,
            newPrice
          }
        ];

        // Format price display
        const priceCr = (newPrice / 10000000).toFixed(2);
        const priceLakhs = (newPrice / 100000).toFixed(0);
        const priceDisplay = newPrice >= 10000000 ? `₹${priceCr} Cr` : `₹${priceLakhs} Lakhs`;

        const updated = {
          ...p,
          price: newPrice,
          priceDisplay,
          priceHistory: newHistory,
          priceDrop: isDecrease ? {
            hasDropped: true,
            previousPrice: oldPrice,
            currentPrice: newPrice,
            dropAmount,
            date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
          } : p.priceDrop
        };

        // If price decreased, trigger a notification
        if (isDecrease) {
          const dropLakhs = Math.round(dropAmount / 100000);
          addNotification({
            type: 'Price Drop',
            title: `Price Drop: ${p.name}`,
            description: `${p.name} dropped ₹${dropLakhs} Lakhs (Now ${priceDisplay}).`,
            message: `${p.name} dropped ₹${dropLakhs} Lakhs (Now ${priceDisplay}).`,
            propertyId: p.id,
            action: 'property'
          });
        }

        return updated;
      }
      return p;
    }));
  };

  // Watch Price Drop toggle
  const toggleWatchPrice = (propertyId) => {
    setWatchedPropertyIds(prev => {
      const isWatched = prev.includes(propertyId);
      const updated = isWatched ? prev.filter(id => id !== propertyId) : [...prev, propertyId];
      
      const prop = properties.find(p => p.id === propertyId);
      if (!isWatched && prop) {
        addNotification({
          type: 'Saved Home Update',
          title: 'Price Drop Alerts Enabled',
          description: `You will be notified immediately when ${prop.name} adjusts pricing.`,
          message: `Price drop tracking activated for ${prop.name}.`,
          propertyId,
          action: 'property'
        });
      }
      return updated;
    });
  };

  // Toggle Save Property
  const toggleSaveProperty = (propertyId) => {
    setSavedPropertyIds(prev => {
      if (prev.includes(propertyId)) return prev.filter(id => id !== propertyId);
      return [...prev, propertyId];
    });
  };

  // Toggle Compare
  const toggleCompare = (propertyId) => {
    setCompareList(prev => {
      if (prev.includes(propertyId)) return prev.filter(id => id !== propertyId);
      if (prev.length >= 4) {
        addNotification({
          type: 'Saved Home Update',
          title: 'Comparison Limit (4 Homes)',
          description: 'You can compare up to 4 residences simultaneously. Remove one to add another.',
          message: 'Comparison limit reached (maximum 4 residences).',
          action: 'compare'
        });
        return prev;
      }
      return [...prev, propertyId];
    });
  };

  // Reorder Compare Items
  const reorderCompare = (propertyId, direction) => {
    setCompareList(prev => {
      const idx = prev.indexOf(propertyId);
      if (idx === -1) return prev;
      const targetIdx = direction === 'left' ? idx - 1 : idx + 1;
      if (targetIdx < 0 || targetIdx >= prev.length) return prev;
      const copy = [...prev];
      const temp = copy[idx];
      copy[idx] = copy[targetIdx];
      copy[targetIdx] = temp;
      return copy;
    });
  };

  // ================= SELLER LISTING STATE MACHINE =================
  // DRAFT -> PUBLISHED -> PAUSED -> REACTIVATED -> ARCHIVED

  const pauseListing = (propertyId) => {
    setSellerListings(prev => ({
      ...prev,
      [propertyId]: {
        ...(prev[propertyId] || {}),
        status: 'Paused'
      }
    }));
  };

  const reactivateListing = (propertyId) => {
    setSellerListings(prev => ({
      ...prev,
      [propertyId]: {
        ...(prev[propertyId] || {}),
        status: 'Published'
      }
    }));
  };

  const archiveListing = (propertyId) => {
    setSellerListings(prev => ({
      ...prev,
      [propertyId]: {
        ...(prev[propertyId] || {}),
        status: 'Archived'
      }
    }));
  };

  const publishListing = (propertyId) => {
    setSellerListings(prev => ({
      ...prev,
      [propertyId]: {
        ...(prev[propertyId] || {}),
        status: 'Published'
      }
    }));
  };

  const draftListing = (propertyId) => {
    setSellerListings(prev => ({
      ...prev,
      [propertyId]: {
        ...(prev[propertyId] || {}),
        status: 'Draft'
      }
    }));
  };

  const updateListingHealth = (propertyId, score, missingItems = []) => {
    setSellerListings(prev => ({
      ...prev,
      [propertyId]: {
        ...(prev[propertyId] || {}),
        listingHealth: score,
        missingItems
      }
    }));
  };

  // ================= DECISION ROOM ACTIONS =================

  const moveDecisionItem = (propertyId, targetCategory) => {
    setDecisionRoom(prev => {
      const currentCols = prev.columns || prev;
      const updatedCols = {
        mustHave: (currentCols.mustHave || []).filter(id => id !== propertyId),
        niceToHave: (currentCols.niceToHave || []).filter(id => id !== propertyId),
        concern: (currentCols.concern || []).filter(id => id !== propertyId),
        reject: (currentCols.reject || []).filter(id => id !== propertyId)
      };
      if (targetCategory && updatedCols[targetCategory]) {
        updatedCols[targetCategory].push(propertyId);
      }
      return {
        ...prev,
        columns: updatedCols
      };
    });
  };

  const addFamilyMember = (memberData) => {
    const newMember = {
      id: `mem-${Date.now()}`,
      name: memberData.name.trim(),
      relationship: memberData.relationship || 'Partner',
      role: memberData.role || 'Co-Decision Maker',
      priorities: memberData.priorities || {
        budget: 'High',
        location: 'High',
        space: 'Medium',
        commute: 'High',
        lifestyle: 'High',
        schools: 'Low',
        amenities: 'Medium',
        futureFit: 'High'
      },
      notes: []
    };
    setDecisionRoom(prev => ({
      ...prev,
      members: [...(prev.members || []), newMember]
    }));
  };

  const updateFamilyMember = (memberId, updatedData) => {
    setDecisionRoom(prev => ({
      ...prev,
      members: (prev.members || []).map(m => m.id === memberId ? { ...m, ...updatedData } : m)
    }));
  };

  const removeFamilyMember = (memberId) => {
    if (memberId === 'mem-self') return; // Cannot delete primary owner
    setDecisionRoom(prev => ({
      ...prev,
      members: (prev.members || []).filter(m => m.id !== memberId)
    }));
  };

  const addFamilyNote = (memberId, propertyId, noteText, noteType = 'Note') => {
    setDecisionRoom(prev => ({
      ...prev,
      members: (prev.members || []).map(m => {
        if (m.id === memberId) {
          const newNote = {
            id: `note-${Date.now()}`,
            propertyId,
            text: noteText.trim(),
            type: noteType,
            date: 'Just now'
          };
          return {
            ...m,
            notes: [newNote, ...(m.notes || [])]
          };
        }
        return m;
      })
    }));
  };

  const deleteFamilyNote = (memberId, noteId) => {
    setDecisionRoom(prev => ({
      ...prev,
      members: (prev.members || []).map(m => {
        if (m.id === memberId) {
          return {
            ...m,
            notes: (m.notes || []).filter(n => n.id !== noteId)
          };
        }
        return m;
      })
    }));
  };

  const addPropertyToDecisionRoom = (propertyId, targetCategory = 'mustHave') => {
    let wasAdded = false;
    setDecisionRoom(prev => {
      const currentCols = prev.columns || { mustHave: [], niceToHave: [], concern: [], reject: [] };
      const exists = (currentCols.mustHave || []).includes(propertyId) ||
                     (currentCols.niceToHave || []).includes(propertyId) ||
                     (currentCols.concern || []).includes(propertyId) ||
                     (currentCols.reject || []).includes(propertyId);
      if (exists) {
        return prev;
      }
      wasAdded = true;
      return {
        ...prev,
        columns: {
          ...currentCols,
          [targetCategory]: [...(currentCols[targetCategory] || []), propertyId]
        }
      };
    });
    return wasAdded;
  };

  const removePropertyFromDecisionRoom = (propertyId) => {
    setDecisionRoom(prev => {
      const currentCols = prev.columns || { mustHave: [], niceToHave: [], concern: [], reject: [] };
      return {
        ...prev,
        columns: {
          mustHave: (currentCols.mustHave || []).filter(id => id !== propertyId),
          niceToHave: (currentCols.niceToHave || []).filter(id => id !== propertyId),
          concern: (currentCols.concern || []).filter(id => id !== propertyId),
          reject: (currentCols.reject || []).filter(id => id !== propertyId)
        }
      };
    });
  };

  const isPropertyInDecisionRoom = (propertyId) => {
    const currentCols = decisionRoom?.columns || {};
    return (currentCols.mustHave || []).includes(propertyId) ||
           (currentCols.niceToHave || []).includes(propertyId) ||
           (currentCols.concern || []).includes(propertyId) ||
           (currentCols.reject || []).includes(propertyId);
  };

  // ================= NOTIFICATIONS ACTIONS =================

  const addNotification = (notif) => {
    const formatted = {
      id: `notif-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      type: notif.type || 'Seller Update',
      title: notif.title || 'Vistara Notification',
      description: notif.description || notif.message || '',
      message: notif.message || notif.description || '',
      timestamp: 'Just now',
      date: 'Just now',
      read: false,
      propertyId: notif.propertyId || null,
      action: notif.action || 'dashboard'
    };
    setNotifications(prev => [formatted, ...prev]);
  };

  const markNotificationAsRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  // ================= VISITS ACTIONS =================

  const scheduleVisit = (propertyId, date, time, notes) => {
    const newVisit = {
      id: `vis-${Date.now()}`,
      propertyId,
      date,
      time,
      status: 'Scheduled',
      notes,
      ratings: null,
      verdict: null
    };
    setVisits(prev => [newVisit, ...prev]);
    addNotification({
      type: 'Visit Reminder',
      title: 'Private Walkthrough Confirmed',
      description: `Walkthrough confirmed for ${date} at ${time}.`,
      message: `Walkthrough confirmed for ${date} at ${time}.`,
      propertyId,
      action: 'visits'
    });
  };

  const rescheduleVisit = (visitId, date, time) => {
    let propId = null;
    let propName = 'Residence';
    setVisits(prev => prev.map(v => {
      if (v.id === visitId) {
        propId = v.propertyId;
        const p = properties.find(prop => prop.id === v.propertyId);
        if (p) propName = p.name;
        return { ...v, date, time, status: 'Scheduled' };
      }
      return v;
    }));
    addNotification({
      type: 'Visit Reminder',
      title: 'Walkthrough Rescheduled',
      description: `Your walkthrough for ${propName} has been rescheduled to ${date} at ${time}.`,
      message: `Your walkthrough for ${propName} has been rescheduled to ${date} at ${time}.`,
      propertyId: propId,
      action: 'visits'
    });
  };

  const cancelVisit = (visitId) => {
    let propId = null;
    let propName = 'Residence';
    setVisits(prev => prev.map(v => {
      if (v.id === visitId) {
        propId = v.propertyId;
        const p = properties.find(prop => prop.id === v.propertyId);
        if (p) propName = p.name;
        return { ...v, status: 'Cancelled' };
      }
      return v;
    }));
    addNotification({
      type: 'Visit Reminder',
      title: 'Walkthrough Cancelled',
      description: `Your walkthrough for ${propName} has been cancelled.`,
      message: `Your walkthrough for ${propName} has been cancelled.`,
      propertyId: propId,
      action: 'visits'
    });
  };

  const submitVisitFeedback = (visitId, ratings, verdict) => {
    setVisits(prev => prev.map(v => {
      if (v.id === visitId) {
        return { ...v, status: 'Completed', ratings, verdict };
      }
      return v;
    }));
  };

  // ================= INQUIRIES & LEADS =================

  const sendInquiry = (propertyId, message, phone) => {
    const newInquiry = {
      id: `lead-${Date.now()}`,
      name: currentUser?.name || 'Verified Seeker',
      phone: phone || '+91 98400 12345',
      email: currentUser?.email || 'seeker@vistara.ai',
      propertyId,
      message,
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      status: 'New',
      source: 'Direct Message',
      replies: []
    };
    setInquiries(prev => [newInquiry, ...prev]);
    addNotification({
      type: 'Inquiry',
      title: 'Inquiry Dispatched',
      description: `Your inquiry for the residence has been sent to the listing director.`,
      message: `Your inquiry has been sent to the listing director.`,
      propertyId,
      action: 'seller-inquiries'
    });
  };

  const updateInquiryStatus = (inquiryId, newStatus) => {
    setInquiries(prev => prev.map(inq => inq.id === inquiryId ? { ...inq, status: newStatus } : inq));
  };

  const replyToInquiry = (inquiryId, replyText) => {
    setInquiries(prev => prev.map(inq => {
      if (inq.id === inquiryId) {
        const newReply = {
          id: `rep-${Date.now()}`,
          sender: currentUser?.name || 'Seller Director',
          text: replyText.trim(),
          date: 'Just now'
        };
        return {
          ...inq,
          status: inq.status === 'New' ? 'Contacted' : inq.status,
          replies: [...(inq.replies || []), newReply]
        };
      }
      return inq;
    }));
  };

  // ================= AGENT CRM CLIENT ACTIONS =================

  const addAgentClient = (clientData) => {
    const newClient = {
      id: `cl-${Date.now()}`,
      name: clientData.name.trim(),
      phone: clientData.phone || '+91 98400 00000',
      email: clientData.email || 'client@vistara.ai',
      type: clientData.type || 'Buyer',
      budget: clientData.budget || '₹1.5 - 2.5 Cr',
      targetLocations: clientData.targetLocations || ['OMR', 'Adyar'],
      bhk: clientData.bhk || 3,
      lifestyle: clientData.lifestyle || 'Work Friendly & High Light',
      keyAffinities: clientData.keyAffinities || ['Work Friendly', 'Natural Light'],
      commute: clientData.commute || 'Under 20 mins to Tidel Park',
      homeDNA: clientData.homeDNA || 'Daylight Index > 90',
      futureFit: clientData.futureFit || 'WFH expansion',
      notes: clientData.notes || '',
      pipelineStatus: clientData.pipelineStatus || 'New',
      assignedProperties: clientData.assignedProperties || ['vis-che-02'],
      lastContact: 'Just now',
      nextFollowUp: 'Tomorrow, 10:00 AM',
      followUps: [
        { id: `fu-${Date.now()}`, text: `Initial intake consultation with ${clientData.name}`, due: 'Tomorrow, 10:00 AM', status: 'Due Today' }
      ]
    };
    setAgentClients(prev => [newClient, ...prev]);
  };

  const updateClientStage = (clientId, newStage) => {
    setAgentClients(prev => prev.map(c => c.id === clientId ? { ...c, pipelineStatus: newStage } : c));
  };

  const updateClient = (clientId, updatedData) => {
    setAgentClients(prev => prev.map(c => c.id === clientId ? { ...c, ...updatedData } : c));
  };

  const addClientFollowUp = (clientId, text, due = 'Tomorrow') => {
    setAgentClients(prev => prev.map(c => {
      if (c.id === clientId) {
        const newFu = {
          id: `fu-${Date.now()}`,
          text,
          due,
          status: 'Upcoming'
        };
        return {
          ...c,
          nextFollowUp: due,
          followUps: [...(c.followUps || []), newFu]
        };
      }
      return c;
    }));
  };

  const completeFollowUp = (clientId, followUpId) => {
    setAgentClients(prev => prev.map(c => {
      if (c.id === clientId) {
        return {
          ...c,
          followUps: (c.followUps || []).map(f => f.id === followUpId ? { ...f, status: 'Completed' } : f)
        };
      }
      return c;
    }));
  };

  const deleteAgentClient = (clientId) => {
    setAgentClients(prev => prev.filter(c => c.id !== clientId));
  };

  const toggleClientShortlist = (clientId, propertyId) => {
    setAgentClients(prev => prev.map(c => {
      if (c.id === clientId) {
        const assigned = c.assignedProperties || [];
        const exists = assigned.includes(propertyId);
        const updated = exists 
          ? assigned.filter(id => id !== propertyId)
          : [...assigned, propertyId];
        return { ...c, assignedProperties: updated };
      }
      return c;
    }));
  };

  return (
    <AppContext.Provider value={{
      theme,
      setTheme,
      currentUser,
      user: currentUser,
      isAuthenticated,
      isOnboardingComplete,
      role,
      mode,
      switchMode,
      login,
      signup,
      logout,
      chooseRole,
      completeOnboarding,
      togglePremium,
      updateCurrentUser,
      isJudgeDemo,
      launchJudgeDemo,
      
      // Properties Central Store
      properties,
      setProperties,
      updateProperty,
      addProperty,
      updatePropertyPrice,
      
      // Saved & Watched Prices
      savedPropertyIds,
      toggleSaveProperty,
      watchedPropertyIds,
      toggleWatchPrice,
      collections,
      setCollections,
      compareList,
      toggleCompare,
      reorderCompare,

      // Decision Room
      decisionRoom,
      moveDecisionItem,
      addPropertyToDecisionRoom,
      removePropertyFromDecisionRoom,
      isPropertyInDecisionRoom,
      addFamilyMember,
      updateFamilyMember,
      removeFamilyMember,
      addFamilyNote,
      deleteFamilyNote,

      // Scheduled Visits
      visits,
      scheduleVisit,
      rescheduleVisit,
      cancelVisit,
      submitVisitFeedback,

      // Inquiries
      inquiries,
      sendInquiry,
      updateInquiryStatus,
      replyToInquiry,

      // Notifications
      notifications,
      setNotifications,
      addNotification,
      markNotificationAsRead,
      markAllNotificationsAsRead,
      deleteNotification,
      clearAllNotifications,

      // Seller Operations
      sellerListings,
      pauseListing,
      reactivateListing,
      archiveListing,
      publishListing,
      draftListing,
      updateListingHealth,

      // Agent CRM
      agentClients,
      setAgentClients,
      addAgentClient,
      updateClientStage,
      updateClient,
      deleteAgentClient,
      addClientFollowUp,
      completeFollowUp,
      toggleClientShortlist,

      isCommandPaletteOpen,
      setIsCommandPaletteOpen,
      seedUsers: SEED_USERS
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

// Reusable convenience hooks for clean architecture
export function useCurrentUser() {
  const { currentUser, role, mode, isAuthenticated, isOnboardingComplete, updateCurrentUser } = useApp();
  return { currentUser, role, mode, isAuthenticated, isOnboardingComplete, updateCurrentUser };
}

export function useProperties() {
  const { properties, updateProperty, addProperty, updatePropertyPrice } = useApp();
  return { properties, updateProperty, addProperty, updatePropertyPrice };
}

export function useSavedProperties() {
  const { savedPropertyIds, toggleSaveProperty, collections, setCollections } = useApp();
  return { savedPropertyIds, toggleSaveProperty, collections, setCollections };
}

export function useNotifications() {
  const { notifications, markNotificationAsRead, markAllNotificationsAsRead, deleteNotification, clearAllNotifications, addNotification } = useApp();
  return { notifications, markNotificationAsRead, markAllNotificationsAsRead, deleteNotification, clearAllNotifications, addNotification };
}

export function useDecisionRoom() {
  const { 
    decisionRoom, 
    moveDecisionItem, 
    addPropertyToDecisionRoom,
    removePropertyFromDecisionRoom,
    isPropertyInDecisionRoom,
    addFamilyMember, 
    updateFamilyMember, 
    removeFamilyMember, 
    addFamilyNote,
    deleteFamilyNote 
  } = useApp();
  return { 
    decisionRoom, 
    moveDecisionItem, 
    addPropertyToDecisionRoom, 
    removePropertyFromDecisionRoom,
    isPropertyInDecisionRoom,
    addFamilyMember, 
    updateFamilyMember, 
    removeFamilyMember, 
    addFamilyNote,
    deleteFamilyNote 
  };
}

export function useSellerListings() {
  const { sellerListings, pauseListing, reactivateListing, archiveListing, publishListing, draftListing, updateListingHealth } = useApp();
  return { sellerListings, pauseListing, reactivateListing, archiveListing, publishListing, draftListing, updateListingHealth };
}

export function useAgentClients() {
  const { agentClients, addAgentClient, updateClientStage, updateClient, deleteAgentClient, addClientFollowUp, completeFollowUp, toggleClientShortlist } = useApp();
  return { agentClients, addAgentClient, updateClientStage, updateClient, deleteAgentClient, addClientFollowUp, completeFollowUp, toggleClientShortlist };
}

export function useTheme() {
  const { theme, setTheme } = useApp();
  return { theme, setTheme };
}

