'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function PasswordResetPage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    if (!email) {
      setStatus('error');
      return;
    }

    // Mock network request
    setTimeout(() => {
      // Simulate success for any email format for the prototype
      setStatus('success');
    }, 1200);
  };

  return (
    <div className="flex-grow w-full max-w-[480px] mx-auto px-[20px] py-[64px] flex flex-col justify-center min-h-[60vh]">
      <div className="bg-surface-paper border border-outline-variant rounded-xl p-[32px] sm:p-[48px] shadow-sm">
        <div className="text-center mb-[32px]">
          <h1 className="font-headline-lg text-primary mb-2">Reset Password</h1>
          <p className="text-on-surface-variant font-body-md">Enter your email and we'll send you instructions.</p>
        </div>

        {status === 'success' ? (
          <div className="flex flex-col items-center justify-center text-center gap-6 py-4">
            <div className="w-16 h-16 bg-primary-container text-on-primary-container rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-[32px]">mark_email_read</span>
            </div>
            <div>
              <h2 className="font-headline-md text-primary mb-2">Check your email</h2>
              <p className="font-body-md text-on-surface-variant">
                If an account exists for <span className="font-bold text-on-surface">{email}</span>, we have sent password reset instructions.
              </p>
            </div>
            <div className="bg-surface-bright border border-outline-variant rounded p-4 text-sm mt-2 text-on-surface-variant">
              <span className="font-bold block mb-1">Prototype Note:</span>
              No real email was sent. This is just a simulated state.
            </div>
            <Link href="/sign-in" className="w-full bg-primary text-on-primary px-8 py-4 font-label-sm uppercase tracking-wider rounded-md hover:bg-primary-fixed-variant transition-colors mt-2 flex justify-center items-center">
              Return to Sign In
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {status === 'error' && (
              <div className="bg-error-container text-on-error-container p-4 rounded-md font-body-md flex items-start gap-2">
                <span className="material-symbols-outlined text-error">error</span>
                <span>Please enter a valid email address.</span>
              </div>
            )}

            <div>
              <label className="block font-label-sm uppercase tracking-wider text-outline mb-2" htmlFor="email">Email Address</label>
              <input 
                id="email"
                type="email" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full p-3 bg-surface-bright border border-stone-outline rounded-md font-body-md focus:ring-primary focus:border-primary text-on-surface"
                placeholder="name@example.com"
                required
              />
            </div>
            
            <button 
              type="submit" 
              disabled={status === 'loading'}
              className="w-full bg-primary text-on-primary px-8 py-4 font-label-sm uppercase tracking-wider rounded-md hover:bg-primary-fixed-variant transition-colors disabled:opacity-50 mt-2 flex justify-center items-center gap-2"
            >
              {status === 'loading' ? (
                <><span className="w-5 h-5 border-2 border-on-primary border-t-transparent rounded-full animate-spin"></span> Sending...</>
              ) : (
                'Send Reset Link'
              )}
            </button>
          </form>
        )}

        {status !== 'success' && (
          <div className="mt-8 text-center border-t border-outline-variant pt-6">
            <Link href="/sign-in" className="text-primary font-bold hover:underline flex items-center justify-center gap-1">
              <span className="material-symbols-outlined text-[18px]">arrow_back</span> Back to Sign in
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
