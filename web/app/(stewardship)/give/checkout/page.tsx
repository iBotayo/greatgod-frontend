'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useDb } from '../../../../components/provider/db-provider';
import { useAuth } from '../../../../components/provider/auth-provider';
import { Donation } from '../../../../types';

type CheckoutStep = 'type' | 'fund' | 'amount' | 'frequency' | 'payment' | 'review' | 'processing' | 'success' | 'failure';

export default function CheckoutPage() {
  const router = useRouter();
  const { db, setDb } = useDb();
  const { currentUser } = useAuth();
  
  const [step, setStep] = useState<CheckoutStep>('type');
  
  const [donationType, setDonationType] = useState<'ONETIME' | 'RECURRING'>('ONETIME');
  const [fund, setFund] = useState('General Fund');
  const [amount, setAmount] = useState<number>(50);
  const [frequency, setFrequency] = useState<'ONETIME' | 'WEEKLY' | 'MONTHLY' | 'QUARTERLY' | 'ANNUALLY'>('ONETIME');
  
  const handleComplete = () => {
    setStep('processing');
    
    // Simulate API call
    setTimeout(() => {
      // Create donation record
      const newDonation: Donation = {
        id: `don_${Date.now()}`,
        userId: currentUser?.id || 'guest',
        amount: amount,
        frequency: donationType === 'RECURRING' ? frequency : 'ONETIME',
        status: 'COMPLETED',
        date: new Date().toISOString(),
        purpose: fund,
      };
      
      setDb(prev => ({
        ...prev,
        donations: [newDonation, ...prev.donations]
      }));
      
      setStep('success');
    }, 1500);
  };

  // 1. Donation Type
  const renderTypeSelection = () => (
    <div className="flex flex-col gap-[32px]">
      <div className="text-center">
        <span className="font-label-sm text-label-sm text-outline uppercase tracking-widest block mb-[8px]">01 Type</span>
        <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary">Donation Type</h2>
        <p className="font-body-md text-body-md text-on-surface-variant mt-[16px] max-w-md mx-auto">
          Will this be a one-time gift, or a recurring commitment?
        </p>
      </div>
      <div className="flex gap-[16px] flex-col md:flex-row">
        <button 
          onClick={() => { setDonationType('ONETIME'); setFrequency('ONETIME'); }}
          className={`flex-1 py-[32px] px-[20px] rounded-lg border-2 transition-all flex flex-col items-center gap-[8px] ${donationType === 'ONETIME' ? 'border-primary bg-surface-paper' : 'border-stone-outline bg-surface-bright hover:bg-surface-paper'}`}
        >
          <span className={`material-symbols-outlined text-[32px] ${donationType === 'ONETIME' ? 'text-primary' : 'text-on-surface'}`}>volunteer_activism</span>
          <span className={`font-label-lg text-label-lg ${donationType === 'ONETIME' ? 'text-primary' : 'text-on-surface'}`}>One-time Gift</span>
        </button>
        <button 
          onClick={() => setDonationType('RECURRING')}
          className={`flex-1 py-[32px] px-[20px] rounded-lg border-2 transition-all flex flex-col items-center gap-[8px] ${donationType === 'RECURRING' ? 'border-primary bg-surface-paper' : 'border-stone-outline bg-surface-bright hover:bg-surface-paper'}`}
        >
          <span className={`material-symbols-outlined text-[32px] ${donationType === 'RECURRING' ? 'text-primary' : 'text-on-surface'}`}>all_inclusive</span>
          <span className={`font-label-lg text-label-lg ${donationType === 'RECURRING' ? 'text-primary' : 'text-on-surface'}`}>Recurring Gift</span>
        </button>
      </div>
      <div className="flex justify-end mt-[32px]">
        <button onClick={() => setStep('fund')} className="w-full sm:w-auto bg-primary text-on-primary px-8 py-3 font-label-sm text-label-sm uppercase tracking-wider rounded-md hover:bg-primary-fixed-variant transition-colors flex items-center justify-center gap-2">
          Continue <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </button>
      </div>
    </div>
  );

  // 2. Fund Selection
  const renderFundSelection = () => (
    <div className="flex flex-col gap-[32px]">
      <div className="text-center">
        <span className="font-label-sm text-label-sm text-outline uppercase tracking-widest block mb-[8px]">02 Purpose</span>
        <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary">Direct Your Gift</h2>
      </div>
      <div className="flex flex-col gap-[16px]">
        {['General Fund', 'Missions', 'Building Fund'].map(f => (
          <label key={f} className="block relative cursor-pointer group">
            <input type="radio" name="fund" value={f} checked={fund === f} onChange={() => setFund(f)} className="sr-only custom-radio" />
            <div className={`w-full border-2 rounded-md p-4 flex items-center justify-between transition-colors ${fund === f ? 'border-primary bg-surface-paper' : 'border-stone-outline bg-white hover:border-primary group-hover:bg-surface-bright'}`}>
              <span className={`font-label-lg text-label-lg ${fund === f ? 'text-primary' : 'text-on-surface'}`}>{f}</span>
              {fund === f && <span className="material-symbols-outlined text-primary">check_circle</span>}
            </div>
          </label>
        ))}
      </div>
      <div className="flex justify-between mt-[32px]">
        <button onClick={() => setStep('type')} className="px-6 py-3 font-label-sm text-label-sm uppercase tracking-wider text-outline border border-stone-outline rounded-md hover:bg-surface-variant transition-colors flex items-center justify-center gap-2">
          <span className="material-symbols-outlined text-sm">arrow_back</span> Back
        </button>
        <button onClick={() => setStep('amount')} className="bg-primary text-on-primary px-8 py-3 font-label-sm text-label-sm uppercase tracking-wider rounded-md hover:bg-primary-fixed-variant transition-colors flex items-center justify-center gap-2">
          Continue <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </button>
      </div>
    </div>
  );

  // 3. Amount Selection
  const renderAmountSelection = () => (
    <div className="flex flex-col gap-[32px]">
      <div className="text-center">
        <span className="font-label-sm text-label-sm text-outline uppercase tracking-widest block mb-[8px]">03 Amount</span>
        <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary">Your Stewardship</h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-[8px]">
        {[25, 50, 100, 250].map(amt => (
          <button 
            key={amt}
            onClick={() => setAmount(amt)}
            className={`flex items-center justify-center py-4 border-2 rounded-lg transition-all relative ${amount === amt ? 'border-primary bg-surface-paper' : 'border-stone-outline bg-surface-bright hover:bg-surface-paper'}`}
          >
            <span className={`font-label-lg text-label-lg ${amount === amt ? 'text-primary' : 'text-on-surface'}`}>${amt}</span>
            {amount === amt && <span className="material-symbols-outlined absolute top-1 right-1 text-[12px] text-primary">check_circle</span>}
          </button>
        ))}
      </div>
      <div className="relative mt-2">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <span className="font-donation-amount text-[48px] font-medium leading-[56px] text-outline">$</span>
        </div>
        <input 
          type="number" 
          value={amount || ''} 
          onChange={(e) => setAmount(Number(e.target.value))}
          className="block w-full pl-12 pr-4 py-4 bg-surface-bright border border-stone-outline rounded-lg font-donation-amount text-[48px] font-medium leading-[56px] text-on-surface focus:ring-0 focus:border-primary focus:border-2 transition-all text-right" 
        />
      </div>
      <div className="flex justify-between mt-[32px]">
        <button onClick={() => setStep('fund')} className="px-6 py-3 font-label-sm text-label-sm uppercase tracking-wider text-outline border border-stone-outline rounded-md hover:bg-surface-variant transition-colors flex items-center justify-center gap-2">
          <span className="material-symbols-outlined text-sm">arrow_back</span> Back
        </button>
        <button 
          onClick={() => setStep(donationType === 'RECURRING' ? 'frequency' : 'payment')} 
          disabled={!amount || amount <= 0}
          className="bg-primary text-on-primary px-8 py-3 font-label-sm text-label-sm uppercase tracking-wider rounded-md hover:bg-primary-fixed-variant transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
        >
          Continue <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </button>
      </div>
    </div>
  );

  // 4. Frequency Selection (only if RECURRING)
  const renderFrequencySelection = () => (
    <div className="flex flex-col gap-[32px]">
      <div className="text-center">
        <span className="font-label-sm text-label-sm text-outline uppercase tracking-widest block mb-[8px]">04 Frequency</span>
        <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary">Rhythm of Giving</h2>
      </div>
      <div className="flex flex-col gap-[16px]">
        {(['WEEKLY', 'MONTHLY', 'QUARTERLY', 'ANNUALLY'] as const).map(f => (
          <label key={f} className="block relative cursor-pointer group">
            <input type="radio" name="freq" value={f} checked={frequency === f} onChange={() => setFrequency(f)} className="sr-only custom-radio" />
            <div className={`w-full border-2 rounded-md p-4 flex items-center justify-between transition-colors ${frequency === f ? 'border-primary bg-surface-paper' : 'border-stone-outline bg-white hover:border-primary group-hover:bg-surface-bright'}`}>
              <span className={`font-label-lg text-label-lg capitalize ${frequency === f ? 'text-primary' : 'text-on-surface'}`}>{f.toLowerCase()}</span>
              {frequency === f && <span className="material-symbols-outlined text-primary">check_circle</span>}
            </div>
          </label>
        ))}
      </div>
      <div className="flex justify-between mt-[32px]">
        <button onClick={() => setStep('amount')} className="px-6 py-3 font-label-sm text-label-sm uppercase tracking-wider text-outline border border-stone-outline rounded-md hover:bg-surface-variant transition-colors flex items-center justify-center gap-2">
          <span className="material-symbols-outlined text-sm">arrow_back</span> Back
        </button>
        <button onClick={() => setStep('payment')} className="bg-primary text-on-primary px-8 py-3 font-label-sm text-label-sm uppercase tracking-wider rounded-md hover:bg-primary-fixed-variant transition-colors flex items-center justify-center gap-2">
          Continue <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </button>
      </div>
    </div>
  );

  // 5. Payment Method
  const renderPaymentSelection = () => (
    <div className="flex flex-col gap-[32px]">
      <div className="text-center">
        <span className="font-label-sm text-label-sm text-outline uppercase tracking-widest block mb-[8px]">{donationType === 'RECURRING' ? '05' : '04'} Payment</span>
        <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary">Mock Payment</h2>
      </div>
      <div className="bg-surface-bright p-4 rounded-lg border border-stone-outline">
        <p className="text-sm text-on-surface-variant mb-4">This is a frontend prototype. No real payment will be processed.</p>
        <div className="space-y-4">
          <div>
            <label className="block font-label-sm text-on-surface mb-1">Card Number (Mock)</label>
            <input type="text" placeholder="•••• •••• •••• 4242" className="w-full p-2 border border-stone-outline rounded-md bg-white" />
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block font-label-sm text-on-surface mb-1">Expiry</label>
              <input type="text" placeholder="MM/YY" className="w-full p-2 border border-stone-outline rounded-md bg-white" />
            </div>
            <div className="flex-1">
              <label className="block font-label-sm text-on-surface mb-1">CVC</label>
              <input type="text" placeholder="123" className="w-full p-2 border border-stone-outline rounded-md bg-white" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between mt-[32px]">
        <button onClick={() => setStep(donationType === 'RECURRING' ? 'frequency' : 'amount')} className="px-6 py-3 font-label-sm text-label-sm uppercase tracking-wider text-outline border border-stone-outline rounded-md hover:bg-surface-variant transition-colors flex items-center justify-center gap-2">
          <span className="material-symbols-outlined text-sm">arrow_back</span> Back
        </button>
        <button onClick={() => setStep('review')} className="bg-primary text-on-primary px-8 py-3 font-label-sm text-label-sm uppercase tracking-wider rounded-md hover:bg-primary-fixed-variant transition-colors flex items-center justify-center gap-2">
          Review <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </button>
      </div>
    </div>
  );

  // 6. Review
  const renderReview = () => (
    <div className="flex flex-col gap-[32px]">
      <div className="text-center">
        <span className="font-label-sm text-label-sm text-outline uppercase tracking-widest block mb-[8px]">{donationType === 'RECURRING' ? '06' : '05'} Review</span>
        <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary">Confirm Your Gift</h2>
      </div>
      <div className="bg-surface-bright p-6 rounded-lg border border-stone-outline space-y-4">
        <div className="flex justify-between items-center border-b border-outline-variant pb-4">
          <span className="font-label-sm text-outline">Amount</span>
          <span className="font-headline-md text-primary">${amount}</span>
        </div>
        <div className="flex justify-between items-center border-b border-outline-variant pb-4">
          <span className="font-label-sm text-outline">Type</span>
          <span className="font-label-lg text-on-surface">{donationType === 'RECURRING' ? `Recurring (${frequency.toLowerCase()})` : 'One-time'}</span>
        </div>
        <div className="flex justify-between items-center border-b border-outline-variant pb-4">
          <span className="font-label-sm text-outline">Fund</span>
          <span className="font-label-lg text-on-surface">{fund}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-label-sm text-outline">Payment</span>
          <span className="font-label-lg text-on-surface">Mock Card ending in 4242</span>
        </div>
      </div>
      <div className="flex justify-between mt-[32px]">
        <button onClick={() => setStep('payment')} className="px-6 py-3 font-label-sm text-label-sm uppercase tracking-wider text-outline border border-stone-outline rounded-md hover:bg-surface-variant transition-colors flex items-center justify-center gap-2">
          <span className="material-symbols-outlined text-sm">arrow_back</span> Back
        </button>
        <button onClick={handleComplete} className="bg-primary text-on-primary px-8 py-3 font-label-sm text-label-sm uppercase tracking-wider rounded-md hover:bg-primary-fixed-variant transition-colors flex items-center justify-center gap-2">
          Complete Gift
        </button>
      </div>
    </div>
  );

  // 7. Processing
  const renderProcessing = () => (
    <div className="flex flex-col items-center justify-center py-[64px] gap-[16px]">
      <div className="w-12 h-12 border-4 border-outline-variant border-t-primary rounded-full animate-spin"></div>
      <h2 className="font-headline-md text-primary">Processing...</h2>
      <p className="text-on-surface-variant">Please wait while we securely process your mock payment.</p>
    </div>
  );

  // 8. Success
  const renderSuccess = () => (
    <div className="flex flex-col items-center justify-center text-center gap-[32px] py-[32px]">
      <div className="w-20 h-20 bg-surface-container-high rounded-full flex items-center justify-center text-primary">
        <span className="material-symbols-outlined text-[40px]">check_circle</span>
      </div>
      <div>
        <h2 className="font-headline-lg-mobile md:font-headline-lg text-primary mb-[16px]">Thank You</h2>
        <p className="font-body-md text-on-surface-variant max-w-md mx-auto">
          Your stewardship helps sustain our mission. A receipt has been saved to your history.
        </p>
      </div>
      <div className="flex flex-col gap-4 mt-[16px] w-full max-w-[300px]">
        {currentUser ? (
          <Link href="/give/history" className="w-full bg-primary text-on-primary px-8 py-3 font-label-sm text-label-sm uppercase tracking-wider rounded-md hover:bg-primary-fixed-variant transition-colors flex items-center justify-center">
            View History
          </Link>
        ) : (
          <p className="text-sm text-outline italic">Sign in to view donation history.</p>
        )}
        <Link href="/" className="w-full px-8 py-3 font-label-sm text-label-sm uppercase tracking-wider text-outline border border-stone-outline rounded-md hover:bg-surface-variant transition-colors flex items-center justify-center">
          Return Home
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex flex-col items-center pt-[64px] pb-[64px] px-[20px]">
      <div className="w-full max-w-[560px]">
        {/* Header inside checkout */}
        <div className="flex justify-between items-center mb-[32px]">
          <Link href="/give" className="text-on-surface-variant hover:bg-surface-container-low p-2 rounded-full transition-colors flex items-center">
            <span className="material-symbols-outlined">close</span>
          </Link>
          <div className="font-headline-md text-primary">GreatGod Giving</div>
          <div className="w-10"></div> {/* spacer */}
        </div>

        {/* Vessel */}
        <div className="bg-surface-linen rounded-xl border border-outline-variant shadow-sm overflow-hidden relative p-[32px]">
          {step === 'type' && renderTypeSelection()}
          {step === 'fund' && renderFundSelection()}
          {step === 'amount' && renderAmountSelection()}
          {step === 'frequency' && renderFrequencySelection()}
          {step === 'payment' && renderPaymentSelection()}
          {step === 'review' && renderReview()}
          {step === 'processing' && renderProcessing()}
          {step === 'success' && renderSuccess()}
        </div>
      </div>
    </div>
  );
}
