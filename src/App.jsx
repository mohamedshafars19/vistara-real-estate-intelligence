import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';

// Layout Navbars
import { PublicNavbar } from './components/layout/PublicNavbar';
import { SeekerNavbar } from './components/layout/SeekerNavbar';
import { SellerNavbar } from './components/layout/SellerNavbar';
import { AgentNavbar } from './components/layout/AgentNavbar';
import { MobileBottomNav } from './components/layout/MobileBottomNav';
import { CommandPalette } from './components/common/CommandPalette';
import { ProfileModal } from './components/common/ProfileModal';
import { FeaturesMegaModal } from './components/common/FeaturesMegaModal';

// Public Marketing Pages
import { LandingPage } from './pages/public/LandingPage';
import { HowItWorksPage } from './pages/public/HowItWorksPage';
import { CapabilitiesPage } from './pages/public/CapabilitiesPage';
import { NeighborhoodsPage } from './pages/public/NeighborhoodsPage';
import { PremiumPage } from './pages/public/PremiumPage';

// Auth & Onboarding Pages
import { LoginPage } from './pages/auth/LoginPage';
import { SignUpPage } from './pages/auth/SignUpPage';
import { RoleSelectPage } from './pages/auth/RoleSelectPage';
import { OnboardingPage } from './pages/auth/OnboardingPage';

// Home Seeker Pages
import { DashboardPage as SeekerDashboardPage } from './pages/seeker/DashboardPage';
import { ExplorePage } from './pages/ExplorePage';
import { PropertyDetailPage } from './pages/PropertyDetailPage';
import { CompareArenaPage } from './pages/CompareArenaPage';
import { DecisionRoomPage } from './pages/DecisionRoomPage';
import { PulsePage } from './pages/PulsePage';
import { VisitsPage } from './pages/VisitsPage';
import { SavedPage } from './pages/SavedPage';
import { IntelligenceLabPage } from './pages/IntelligenceLabPage';
import { SeekerFeaturesDirectoryPage } from './pages/seeker/SeekerFeaturesDirectoryPage';

// Seller Operations Pages
import { SellerDashboardPage } from './pages/seller/SellerDashboardPage';
import { SellerListingsPage } from './pages/seller/SellerListingsPage';
import { SellerInquiriesPage } from './pages/seller/SellerInquiriesPage';
import { SellerVisitsPage } from './pages/seller/SellerVisitsPage';
import { SellerPricingPage } from './pages/seller/SellerPricingPage';
import { SellerAnalyticsPage } from './pages/seller/SellerAnalyticsPage';
import { SellerAddPropertyPage } from './pages/seller/SellerAddPropertyPage';
import { SellerFeaturesDirectoryPage } from './pages/seller/SellerFeaturesDirectoryPage';

// Agent Matching CRM Pages
import { AgentDashboardPage } from './pages/agent/AgentDashboardPage';
import { AgentClientsPage } from './pages/agent/AgentClientsPage';
import { AgentPropertiesPage } from './pages/agent/AgentPropertiesPage';
import { AgentInquiriesPage } from './pages/agent/AgentInquiriesPage';
import { AgentVisitsPage } from './pages/agent/AgentVisitsPage';
import { AgentMatchesPage } from './pages/agent/AgentMatchesPage';
import { AgentAnalyticsPage } from './pages/agent/AgentAnalyticsPage';
import { AgentFeaturesDirectoryPage } from './pages/agent/AgentFeaturesDirectoryPage';

const PUBLIC_ROUTES = ['landing', 'how-it-works', 'capabilities', 'neighborhoods', 'premium'];
const AUTH_ENTRY_ROUTES = ['login', 'signup'];
const SEEKER_ROUTES = [
  'dashboard', 
  'explore', 
  'property', 
  'compare', 
  'decision-room', 
  'pulse', 
  'visits', 
  'saved', 
  'intel-lab', 
  'seeker-features'
];
const SELLER_ROUTES = [
  'seller-dashboard', 
  'seller-listings', 
  'seller-inquiries', 
  'seller-visits', 
  'seller-pricing', 
  'seller-analytics', 
  'seller-add', 
  'seller-features'
];
const AGENT_ROUTES = [
  'agent-dashboard', 
  'agent-clients', 
  'agent-properties', 
  'agent-inquiries', 
  'agent-visits', 
  'agent-matches', 
  'agent-analytics', 
  'agent-features'
];

function AppContent() {
  const { 
    currentUser, 
    isAuthenticated, 
    role, 
    isOnboardingComplete,
    isCommandPaletteOpen, 
    setIsCommandPaletteOpen 
  } = useApp();

  // Route state
  const [route, setRoute] = useState(() => {
    const hash = window.location.hash.replace(/^#\/?/, '');
    if (hash.startsWith('property/')) return 'property';
    return hash || 'landing';
  });

  const [activePropertyId, setActivePropertyId] = useState(() => {
    const hash = window.location.hash.replace(/^#\/?/, '');
    if (hash.startsWith('property/')) {
      return hash.split('/')[1] || 'vis-che-02';
    }
    return 'vis-che-02';
  });

  const [initialNLQuery, setInitialNLQuery] = useState('');

  // Synchronize hash with window history
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace(/^#\/?/, '');
      if (hash.startsWith('property/')) {
        const id = hash.split('/')[1];
        setActivePropertyId(id);
        setRoute('property');
      } else {
        setRoute(hash || 'landing');
      }
      window.scrollTo(0, 0);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Global Ctrl+K / Cmd+K Command Palette listener
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [setIsCommandPaletteOpen]);

  const navigate = (newRoute, param = null) => {
    if (newRoute === 'property' && param) {
      setActivePropertyId(param);
      setRoute('property');
      window.location.hash = `property/${param}`;
    } else if (newRoute === 'explore' && param && param.nlQuery) {
      setInitialNLQuery(param.nlQuery);
      setRoute('explore');
      window.location.hash = 'explore';
    } else {
      setRoute(newRoute);
      window.location.hash = newRoute === 'landing' ? '' : newRoute;
    }
    window.scrollTo(0, 0);
  };

  // ================= ROUTE GUARDS ENFORCEMENT =================
  useEffect(() => {
    // 1. Unauthenticated Users
    if (!isAuthenticated) {
      const isAllowedPublic = PUBLIC_ROUTES.includes(route) || AUTH_ENTRY_ROUTES.includes(route);
      if (!isAllowedPublic) {
        navigate('login');
      }
      return;
    }

    // 2. Authenticated but No Role Selected
    if (!currentUser?.role) {
      if (route !== 'role-select') {
        navigate('role-select');
      }
      return;
    }

    // 3. Authenticated & Has Role, but Incomplete Onboarding
    if (!currentUser?.onboardingComplete) {
      if (route !== 'onboarding' && route !== 'role-select') {
        navigate('onboarding');
      }
      return;
    }

    // 4. Authenticated & Complete Onboarding - Enforce Strict Role Boundaries
    if (currentUser?.role === 'seeker') {
      if (route === 'landing' || AUTH_ENTRY_ROUTES.includes(route) || route === 'role-select' || route === 'onboarding') {
        navigate('dashboard');
      } else if (SELLER_ROUTES.includes(route) || AGENT_ROUTES.includes(route)) {
        navigate('dashboard');
      }
    } else if (currentUser?.role === 'seller') {
      if (route === 'landing' || AUTH_ENTRY_ROUTES.includes(route) || route === 'role-select' || route === 'onboarding') {
        navigate('seller-dashboard');
      } else if (SEEKER_ROUTES.includes(route) || AGENT_ROUTES.includes(route)) {
        navigate('seller-dashboard');
      }
    } else if (currentUser?.role === 'agent') {
      if (route === 'landing' || AUTH_ENTRY_ROUTES.includes(route) || route === 'role-select' || route === 'onboarding') {
        navigate('agent-dashboard');
      } else if (SEEKER_ROUTES.includes(route) || SELLER_ROUTES.includes(route)) {
        navigate('agent-dashboard');
      }
    }
  }, [isAuthenticated, currentUser?.role, currentUser?.onboardingComplete, route]);

  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showFeaturesModal, setShowFeaturesModal] = useState(false);

  // Determine Active Navbar
  const renderNavbar = () => {
    if (!isAuthenticated || AUTH_ENTRY_ROUTES.includes(route) || route === 'role-select' || route === 'onboarding') {
      return <PublicNavbar activeRoute={route} onNavigate={navigate} />;
    }

    if (currentUser?.role === 'seller') {
      return <SellerNavbar activeRoute={route} onNavigate={navigate} />;
    }

    if (currentUser?.role === 'agent') {
      return <AgentNavbar activeRoute={route} onNavigate={navigate} />;
    }

    return <SeekerNavbar activeRoute={route} onNavigate={navigate} />;
  };

  return (
    <div className="min-h-screen bg-vistara-bg text-vistara-primary flex flex-col font-sans transition-colors duration-300">
      
      {/* Dynamic Role-Based Navbar */}
      {renderNavbar()}

      {/* Global Command Palette (Ctrl+K / Cmd+K) */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onNavigate={navigate}
      />

      {/* Main Routed Page Content */}
      <main className="flex-1 pb-20 lg:pb-0">
        
        {/* PUBLIC MARKETING ROUTES */}
        {route === 'landing' && <LandingPage onNavigate={navigate} />}
        {route === 'how-it-works' && <HowItWorksPage onNavigate={navigate} />}
        {route === 'capabilities' && <CapabilitiesPage onNavigate={navigate} />}
        {route === 'neighborhoods' && <NeighborhoodsPage onNavigate={navigate} />}
        {route === 'premium' && <PremiumPage onNavigate={navigate} />}

        {/* AUTHENTICATION & ONBOARDING ROUTES */}
        {route === 'login' && <LoginPage onNavigate={navigate} />}
        {route === 'signup' && <SignUpPage onNavigate={navigate} />}
        {route === 'role-select' && <RoleSelectPage onNavigate={navigate} />}
        {route === 'onboarding' && <OnboardingPage onNavigate={navigate} />}

        {/* HOME SEEKER ROUTES */}
        {route === 'dashboard' && <SeekerDashboardPage onNavigate={navigate} onSelectProperty={(id) => navigate('property', id)} />}
        {route === 'explore' && <ExplorePage initialNLQuery={initialNLQuery} onSelectProperty={(id) => navigate('property', id)} />}
        {route === 'property' && <PropertyDetailPage propertyId={activePropertyId} onBack={() => navigate('explore')} onNavigate={navigate} />}
        {route === 'compare' && <CompareArenaPage onSelectProperty={(id) => navigate('property', id)} onNavigate={navigate} />}
        {route === 'decision-room' && <DecisionRoomPage onSelectProperty={(id) => navigate('property', id)} onNavigate={navigate} />}
        {route === 'pulse' && <PulsePage onSelectProperty={(id) => navigate('property', id)} onNavigate={navigate} />}
        {route === 'visits' && <VisitsPage onSelectProperty={(id) => navigate('property', id)} onNavigate={navigate} />}
        {route === 'saved' && <SavedPage onSelectProperty={(id) => navigate('property', id)} onNavigate={navigate} />}
        {route === 'intel-lab' && <IntelligenceLabPage onSelectProperty={(id) => navigate('property', id)} onNavigate={navigate} />}
        {route === 'seeker-features' && <SeekerFeaturesDirectoryPage onNavigate={navigate} />}

        {/* SELLER OPERATIONS ROUTES */}
        {route === 'seller-dashboard' && <SellerDashboardPage onNavigate={navigate} />}
        {route === 'seller-listings' && <SellerListingsPage onNavigate={navigate} onSelectProperty={(id) => navigate('property', id)} />}
        {route === 'seller-inquiries' && <SellerInquiriesPage onNavigate={navigate} />}
        {route === 'seller-visits' && <SellerVisitsPage onNavigate={navigate} />}
        {route === 'seller-pricing' && <SellerPricingPage onNavigate={navigate} />}
        {route === 'seller-analytics' && <SellerAnalyticsPage onNavigate={navigate} />}
        {route === 'seller-add' && <SellerAddPropertyPage onNavigate={navigate} />}
        {route === 'seller-features' && <SellerFeaturesDirectoryPage onNavigate={navigate} />}

        {/* AGENT MATCHING CRM ROUTES */}
        {route === 'agent-dashboard' && <AgentDashboardPage onNavigate={navigate} onSelectProperty={(id) => navigate('property', id)} />}
        {route === 'agent-clients' && <AgentClientsPage onNavigate={navigate} />}
        {route === 'agent-properties' && <AgentPropertiesPage onNavigate={navigate} onSelectProperty={(id) => navigate('property', id)} />}
        {route === 'agent-inquiries' && <AgentInquiriesPage onNavigate={navigate} />}
        {route === 'agent-visits' && <AgentVisitsPage onNavigate={navigate} onSelectProperty={(id) => navigate('property', id)} />}
        {route === 'agent-matches' && <AgentMatchesPage onNavigate={navigate} onSelectProperty={(id) => navigate('property', id)} />}
        {route === 'agent-analytics' && <AgentAnalyticsPage onNavigate={navigate} />}
        {route === 'agent-features' && <AgentFeaturesDirectoryPage onNavigate={navigate} />}
      </main>

      {/* Role-Specific Mobile Fixed Bottom Nav */}
      {isAuthenticated && currentUser?.role && currentUser?.onboardingComplete && (
        <MobileBottomNav
          activeRoute={route}
          onNavigate={navigate}
          onOpenProfile={() => setShowProfileModal(true)}
          onOpenFeatures={() => setShowFeaturesModal(true)}
        />
      )}

      {/* Global Modals for Mobile & Deep Links */}
      <ProfileModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        onNavigate={navigate}
      />

      <FeaturesMegaModal
        isOpen={showFeaturesModal}
        onClose={() => setShowFeaturesModal(false)}
        onNavigate={navigate}
      />

      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onNavigate={navigate}
      />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
