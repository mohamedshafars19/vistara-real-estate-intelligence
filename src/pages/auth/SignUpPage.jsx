import React, { useState } from 'react';
import { UserPlus, AlertCircle, Check } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { VistaraLogo } from '../../components/common/VistaraLogo';
import { useApp } from '../../context/AppContext';

export function SignUpPage({ onNavigate }) {
  const { signup } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Please provide your full name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    const res = signup(name, email, password);
    if (!res.success) {
      setError(res.error);
      return;
    }

    // Account created, proceed directly to role selection
    onNavigate('role-select');
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-vistara-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-vistara-surface border border-vistara-border rounded-2xl p-6 sm:p-8 shadow-card text-xs">
        
        <div className="text-center mb-6">
          <div className="flex justify-center mb-3">
            <VistaraLogo size="md" showWordmark={true} />
          </div>
          <h1 className="text-2xl font-bold text-vistara-primary tracking-tight">
            Create your Vistara Account
          </h1>
          <p className="text-vistara-secondary mt-1">
            Join the lifestyle-first real estate discovery and operations platform.
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900 rounded-lg text-rose-700 dark:text-rose-300 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="block font-semibold text-vistara-primary mb-1">Full Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Maya Sundaram"
              className="w-full bg-vistara-elevated border border-vistara-border rounded-lg p-2.5 text-vistara-primary focus:outline-none focus:border-vistara-accent text-xs"
            />
          </div>

          <div>
            <label className="block font-semibold text-vistara-primary mb-1">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="maya.sundaram@gmail.com"
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
              placeholder="At least 6 characters"
              className="w-full bg-vistara-elevated border border-vistara-border rounded-lg p-2.5 text-vistara-primary focus:outline-none focus:border-vistara-accent text-xs"
            />
          </div>

          <div>
            <label className="block font-semibold text-vistara-primary mb-1">Confirm Password</label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter password"
              className="w-full bg-vistara-elevated border border-vistara-border rounded-lg p-2.5 text-vistara-primary focus:outline-none focus:border-vistara-accent text-xs"
            />
          </div>

          <Button
            type="submit"
            size="md"
            variant="primary"
            className="w-full mt-3"
          >
            Create Account & Choose Role →
          </Button>
        </form>

        <div className="mt-4 p-2.5 bg-vistara-elevated rounded border border-vistara-border text-[11px] text-vistara-muted leading-relaxed">
          * Local Browser-Persistence Architecture: Your account is saved safely in client local state.
        </div>

        <div className="mt-5 text-center text-vistara-secondary">
          Already have an account?{' '}
          <button
            type="button"
            onClick={() => onNavigate('login')}
            className="text-vistara-accent font-semibold hover:underline"
          >
            Log In
          </button>
        </div>

      </div>
    </div>
  );
}
