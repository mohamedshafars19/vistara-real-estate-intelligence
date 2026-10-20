import React, { useState } from 'react';
import { LogIn, ArrowRight, ShieldCheck, AlertCircle, Sparkles } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { VistaraLogo } from '../../components/common/VistaraLogo';
import { useApp } from '../../context/AppContext';

export function LoginPage({ onNavigate }) {
  const { login, seedUsers } = useApp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please provide both email and password.');
      return;
    }

    const res = login(email, password);
    if (!res.success) {
      setError(res.error);
      return;
    }

    // Redirect to role home or role select if role not chosen
    if (!res.user.role) {
      onNavigate('role-select');
    } else if (!res.user.onboardingComplete) {
      onNavigate('onboarding');
    } else {
      if (res.user.role === 'seeker') onNavigate('dashboard');
      else if (res.user.role === 'seller') onNavigate('seller-dashboard');
      else if (res.user.role === 'agent') onNavigate('agent-dashboard');
    }
  };

  const handleQuickDemoFill = (demoUser) => {
    setEmail(demoUser.email);
    setPassword(demoUser.password);
    setError('');
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-vistara-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-vistara-surface border border-vistara-border rounded-2xl p-6 sm:p-8 shadow-card text-xs">
        
        <div className="text-center mb-6">
          <div className="flex justify-center mb-3">
            <VistaraLogo size="md" showWordmark={true} />
          </div>
          <h1 className="text-2xl font-bold text-vistara-primary tracking-tight">
            Log in to Vistara
          </h1>
          <p className="text-vistara-secondary mt-1">
            Access your personalized life profile, spatial models, and decision workspaces.
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900 rounded-lg text-rose-700 dark:text-rose-300 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold text-vistara-primary mb-1">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. seeker@vistara.ai"
              className="w-full bg-vistara-elevated border border-vistara-border rounded-lg p-2.5 text-vistara-primary focus:outline-none focus:border-vistara-accent text-xs"
            />
          </div>

          <div>
            <label className="block font-semibold text-vistara-primary mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-vistara-elevated border border-vistara-border rounded-lg p-2.5 text-vistara-primary focus:outline-none focus:border-vistara-accent text-xs"
            />
          </div>

          <Button
            type="submit"
            size="md"
            variant="primary"
            className="w-full mt-2"
          >
            Log In to Workspace →
          </Button>
        </form>

        {/* Instant 1-Click Demo Logins */}
        <div className="mt-6 pt-5 border-t border-vistara-border">
          <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-vistara-secondary mb-2.5">
            <Sparkles className="w-3.5 h-3.5 text-vistara-accent" />
            <span>Instant Demo Account Logins:</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handleQuickDemoFill(seedUsers[0])}
              className="p-2 bg-vistara-elevated border border-vistara-border rounded hover:border-vistara-accent text-left"
            >
              <div className="font-bold text-vistara-primary text-[11px]">Seeker</div>
              <div className="text-[10px] text-vistara-secondary">seeker@vistara.ai</div>
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemoFill(seedUsers[1])}
              className="p-2 bg-vistara-elevated border border-vistara-border rounded hover:border-vistara-accent text-left"
            >
              <div className="font-bold text-vistara-primary text-[11px]">Seller</div>
              <div className="text-[10px] text-vistara-secondary">seller@vistara.ai</div>
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemoFill(seedUsers[2])}
              className="p-2 bg-vistara-elevated border border-vistara-border rounded hover:border-vistara-accent text-left"
            >
              <div className="font-bold text-vistara-primary text-[11px]">Agent</div>
              <div className="text-[10px] text-vistara-secondary">agent@vistara.ai</div>
            </button>
          </div>
        </div>

        <div className="mt-6 text-center text-vistara-secondary">
          Don't have an account?{' '}
          <button
            type="button"
            onClick={() => onNavigate('signup')}
            className="text-vistara-accent font-semibold hover:underline"
          >
            Create an Account
          </button>
        </div>

      </div>
    </div>
  );
}
