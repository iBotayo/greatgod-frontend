'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useDb } from '../../../components/provider/db-provider';
import { useAuth } from '../../../components/provider/auth-provider';
import { getPrimaryDashboardUrl } from '../../../lib/auth-utils';

export default function SignInPage() {
  const router = useRouter();
  const { db } = useDb();
  const { switchUser, isAuthReady, currentUser } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // If already authenticated and auth is initialized, redirect them
  if (isAuthReady && currentUser) {
    router.replace(getPrimaryDashboardUrl(currentUser));
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    if (!email || !password) {
      setError('Please provide both email and password.');
      setIsLoading(false);
      return;
    }

    // Mock network request
    setTimeout(() => {
      const user = db.users.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (!user) {
        setError('Invalid email or password.');
        setIsLoading(false);
        return;
      }
      
      // Check mock password
      if (user.password && user.password !== password) {
        setError('Invalid email or password.');
        setIsLoading(false);
        return;
      }

      // Successful mock login
      switchUser(user.id);
      
      // Redirect
      router.push(getPrimaryDashboardUrl(user));
    }, 600);
  };

  return (
    <div className="flex-grow w-full max-w-[480px] mx-auto px-[20px] py-[64px] flex flex-col justify-center min-h-[60vh]">
      <div className="bg-surface-paper border border-outline-variant rounded-xl p-[32px] sm:p-[48px] shadow-sm">
        <div className="text-center mb-[32px]">
          <h1 className="font-headline-lg text-primary mb-2">Welcome Back</h1>
          <p className="text-on-surface-variant font-body-md">Sign in to continue to GreatGod</p>
        </div>

        {error && (
          <div className="bg-error-container text-on-error-container p-4 rounded-md mb-6 font-body-md flex items-start gap-2">
            <span className="material-symbols-outlined text-error">error</span>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <label className="block font-label-sm uppercase tracking-wider text-outline mb-2" htmlFor="email">Email</label>
            <input 
              id="email"
              type="email" 
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full p-3 bg-surface-bright border border-stone-outline rounded-md font-body-md focus:ring-primary focus:border-primary text-on-surface"
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block font-label-sm uppercase tracking-wider text-outline" htmlFor="password">Password</label>
              <Link href="/password-reset" className="text-primary hover:text-primary-fixed-variant font-label-sm text-sm">Forgot password?</Link>
            </div>
            <div className="relative">
              <input 
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full p-3 pr-12 bg-surface-bright border border-stone-outline rounded-md font-body-md focus:ring-primary focus:border-primary text-on-surface"
                placeholder="Enter your password"
                required
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface flex items-center justify-center p-1"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                <span className="material-symbols-outlined text-[20px]">{showPassword ? "visibility_off" : "visibility"}</span>
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isLoading || !isAuthReady}
            className="w-full bg-primary text-on-primary px-8 py-4 font-label-sm uppercase tracking-wider rounded-md hover:bg-primary-fixed-variant transition-colors disabled:opacity-50 mt-2 flex justify-center items-center gap-2"
          >
            {isLoading ? (
              <><span className="w-5 h-5 border-2 border-on-primary border-t-transparent rounded-full animate-spin"></span> Signing in...</>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div className="mt-8 text-center border-t border-outline-variant pt-6">
          <p className="font-body-md text-on-surface-variant">
            Don't have an account? <Link href="/register" className="text-primary font-bold hover:underline">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
