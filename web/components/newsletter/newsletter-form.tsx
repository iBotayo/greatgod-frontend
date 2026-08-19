'use client';

import React, { useState } from 'react';
import { useDb } from '../provider/db-provider';

interface NewsletterFormProps {
  layout?: 'horizontal' | 'vertical';
  showHighlight?: boolean;
}

export function NewsletterForm({ layout = 'vertical', showHighlight = false }: NewsletterFormProps) {
  const { db, setDb } = useDb();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error' | 'duplicate'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setStatus('submitting');
    
    // Simulate network delay
    setTimeout(() => {
      const normalizedEmail = email.trim().toLowerCase();
      
      const exists = db.subscribers?.some(sub => sub.email === normalizedEmail);
      
      if (exists) {
        setStatus('duplicate');
        return;
      }

      const newSubscriber = {
        id: `sub_${Date.now()}`,
        email: normalizedEmail,
        status: 'ACTIVE' as const,
        subscribedAt: new Date().toISOString()
      };

      setDb(prev => ({
        ...prev,
        subscribers: [...(prev.subscribers || []), newSubscriber]
      }));

      setStatus('success');
    }, 600);
  };

  const handleReset = () => {
    setEmail('');
    setStatus('idle');
    setErrorMessage('');
  };

  if (status === 'success') {
    return (
      <div className="w-full flex flex-col items-center text-center bg-surface-linen p-stack-sm rounded-lg border border-outline-variant mt-stack-sm" id="success-state">
        <div className="h-12 w-12 bg-secondary-container rounded-full flex items-center justify-center mb-unit">
          <span className="material-symbols-outlined text-success-secure text-2xl">check_circle</span>
        </div>
        <h3 className="font-headline-md text-headline-md text-on-surface mb-2">Welcome.</h3>
        <p className="font-body-md text-body-md text-on-surface-variant">Your subscription is confirmed. We look forward to sharing our reflections with you soon.</p>
        <button 
          onClick={handleReset}
          className="mt-4 text-primary font-label-sm text-label-sm underline"
        >
          Subscribe another email
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`w-full flex flex-col gap-stack-sm ${layout === 'horizontal' ? 'md:flex-row md:items-start' : ''}`}>
      <div className={`relative w-full ${layout === 'horizontal' ? 'md:w-2/3' : ''}`}>
        <label className="sr-only font-label-sm text-label-sm" htmlFor="email">Email Address</label>
        <input 
          type="email" 
          id="email" 
          name="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address" 
          disabled={status === 'submitting'}
          className="w-full bg-surface-container-lowest border border-outline text-on-surface font-body-md text-body-md rounded-DEFAULT px-4 py-3 focus:outline-none focus:border-primary focus:border-2 focus:ring-0 transition-all placeholder:text-outline disabled:opacity-50"
          required 
        />
        {status === 'error' && <p className="text-error text-sm mt-1">{errorMessage}</p>}
        {status === 'duplicate' && <p className="text-primary text-sm mt-1">You are already subscribed to the newsletter.</p>}
      </div>
      
      <button 
        type="submit" 
        disabled={status === 'submitting'}
        className={`${layout === 'horizontal' ? 'md:w-1/3 py-3' : 'w-full py-4'} bg-primary text-on-primary font-label-sm text-label-sm uppercase tracking-widest rounded-DEFAULT hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-75`}
      >
        {status === 'submitting' ? 'Subscribing...' : 'Subscribe'}
        {status !== 'submitting' && <span className="material-symbols-outlined text-lg">arrow_forward</span>}
      </button>
    </form>
  );
}
