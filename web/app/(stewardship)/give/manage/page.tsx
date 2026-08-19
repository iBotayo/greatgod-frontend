'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useDb } from '../../../../components/provider/db-provider';
import { useAuth } from '../../../../components/provider/auth-provider';
import { Donation } from '../../../../types';

type ManageAction = 'NONE' | 'EDIT' | 'PAUSE' | 'CANCEL';

export default function ManageRecurringGiftPage() {
  const router = useRouter();
  const { db, setDb } = useDb();
  const { currentUser, isAuthReady } = useAuth();
  
  const [selectedDonation, setSelectedDonation] = useState<Donation | null>(null);
  const [action, setAction] = useState<ManageAction>('NONE');
  
  // Edit State
  const [editAmount, setEditAmount] = useState<number>(0);
  const [editFrequency, setEditFrequency] = useState<Donation['frequency']>('MONTHLY');
  const [editFund, setEditFund] = useState<string>('');

  useEffect(() => {
    if (isAuthReady && !currentUser) {
      router.replace('/?error=unauthorized');
    }
  }, [currentUser, isAuthReady, router]);

  if (!isAuthReady || !currentUser) {
    return null;
  }

  const recurringGifts = db.donations.filter(
    d => d.userId === currentUser.id && d.frequency !== 'ONETIME' && d.status !== 'FAILED'
  );

  const activeGifts = recurringGifts.filter(d => d.status === 'ACTIVE');
  const pausedGifts = recurringGifts.filter(d => d.status === 'PAUSED');
  const cancelledGifts = recurringGifts.filter(d => d.status === 'CANCELLED');

  const startEdit = (gift: Donation) => {
    setSelectedDonation(gift);
    setEditAmount(gift.amount);
    setEditFrequency(gift.frequency);
    setEditFund(gift.purpose);
    setAction('EDIT');
  };

  const handleSaveEdit = () => {
    if (!selectedDonation) return;
    
    setDb(prev => ({
      ...prev,
      donations: prev.donations.map(d => 
        d.id === selectedDonation.id 
          ? { ...d, amount: editAmount, frequency: editFrequency, purpose: editFund } 
          : d
      )
    }));
    
    setAction('NONE');
    setSelectedDonation(null);
  };

  const handleStatusChange = (newStatus: 'ACTIVE' | 'PAUSED' | 'CANCELLED') => {
    if (!selectedDonation) return;
    
    setDb(prev => ({
      ...prev,
      donations: prev.donations.map(d => 
        d.id === selectedDonation.id 
          ? { ...d, status: newStatus } 
          : d
      )
    }));
    
    setAction('NONE');
    setSelectedDonation(null);
  };

  const renderGiftCard = (gift: Donation) => (
    <div key={gift.id} className="bg-surface-paper border border-outline-variant rounded-xl p-6 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div className="flex gap-4 items-center">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${gift.status === 'ACTIVE' ? 'bg-secondary-container text-on-secondary-container' : gift.status === 'PAUSED' ? 'bg-tertiary-container text-on-tertiary-container' : 'bg-surface-dim text-outline'}`}>
          <span className="material-symbols-outlined">{gift.status === 'ACTIVE' ? 'all_inclusive' : gift.status === 'PAUSED' ? 'pause_circle' : 'cancel'}</span>
        </div>
        <div>
          <h3 className="font-label-lg text-on-surface">{gift.purpose}</h3>
          <p className="font-body-md text-on-surface-variant">${gift.amount.toFixed(2)} / {gift.frequency.toLowerCase()}</p>
          <p className="text-xs text-outline mt-1 uppercase tracking-wider">Started {new Date(gift.date).toLocaleDateString()}</p>
        </div>
      </div>
      <div className="flex gap-2 w-full sm:w-auto mt-4 sm:mt-0">
        {gift.status !== 'CANCELLED' && (
          <button 
            onClick={() => startEdit(gift)}
            className="flex-1 sm:flex-none px-4 py-2 bg-surface-bright border border-stone-outline text-on-surface font-label-sm uppercase tracking-wider rounded hover:bg-surface-variant transition-colors"
          >
            Edit
          </button>
        )}
        {gift.status === 'ACTIVE' && (
          <button 
            onClick={() => { setSelectedDonation(gift); setAction('PAUSE'); }}
            className="flex-1 sm:flex-none px-4 py-2 bg-surface-bright border border-stone-outline text-on-surface font-label-sm uppercase tracking-wider rounded hover:bg-surface-variant transition-colors"
          >
            Pause
          </button>
        )}
        {gift.status === 'PAUSED' && (
          <button 
            onClick={() => { setSelectedDonation(gift); handleStatusChange('ACTIVE'); }}
            className="flex-1 sm:flex-none px-4 py-2 bg-primary text-on-primary font-label-sm uppercase tracking-wider rounded hover:bg-primary-fixed-variant transition-colors"
          >
            Resume
          </button>
        )}
        {gift.status !== 'CANCELLED' && (
          <button 
            onClick={() => { setSelectedDonation(gift); setAction('CANCEL'); }}
            className="flex-1 sm:flex-none px-4 py-2 text-error hover:bg-error-container hover:text-on-error-container font-label-sm uppercase tracking-wider rounded transition-colors"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex-grow w-full max-w-[800px] mx-auto px-[20px] py-[64px] flex flex-col gap-[32px]">
      <div className="border-b border-outline-variant pb-[16px]">
        <div className="flex gap-6 mb-4 font-label-sm uppercase tracking-wider text-outline">
          <Link href="/give/history" className="hover:text-primary transition-colors pb-1">History</Link>
          <span className="text-primary border-b-2 border-primary pb-1">Manage</span>
        </div>
        <h1 className="font-headline-lg text-primary">Manage Recurring Gifts</h1>
        <p className="text-on-surface-variant font-body-md">Update, pause, or cancel your ongoing stewardship commitments.</p>
      </div>

      {recurringGifts.length === 0 ? (
        <div className="bg-surface-variant rounded-xl p-[64px] text-center flex flex-col items-center gap-[16px]">
          <span className="material-symbols-outlined text-[48px] text-outline">all_inclusive</span>
          <h3 className="font-headline-md text-primary">No Recurring Gifts</h3>
          <p className="text-on-surface-variant">You do not have any active recurring commitments.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-8">
          {activeGifts.length > 0 && (
            <div className="flex flex-col gap-4">
              <h2 className="font-label-sm uppercase tracking-widest text-outline">Active Gifts</h2>
              {activeGifts.map(renderGiftCard)}
            </div>
          )}
          
          {pausedGifts.length > 0 && (
            <div className="flex flex-col gap-4">
              <h2 className="font-label-sm uppercase tracking-widest text-outline">Paused Gifts</h2>
              {pausedGifts.map(renderGiftCard)}
            </div>
          )}
          
          {cancelledGifts.length > 0 && (
            <div className="flex flex-col gap-4 opacity-75">
              <h2 className="font-label-sm uppercase tracking-widest text-outline">Cancelled Gifts</h2>
              {cancelledGifts.map(renderGiftCard)}
            </div>
          )}
        </div>
      )}

      {/* Edit Modal */}
      {action === 'EDIT' && selectedDonation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-surface-linen w-full max-w-[500px] rounded-xl shadow-lg border border-outline-variant overflow-hidden flex flex-col">
            <div className="bg-surface-variant p-4 flex justify-between items-center border-b border-outline-variant">
              <h3 className="font-headline-md text-primary">Edit Gift</h3>
              <button onClick={() => { setAction('NONE'); setSelectedDonation(null); }} className="text-on-surface-variant hover:text-primary">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="p-6 flex flex-col gap-6">
              <div>
                <label className="block font-label-sm uppercase tracking-wider text-outline mb-2">Fund/Purpose</label>
                <select 
                  value={editFund} 
                  onChange={e => setEditFund(e.target.value)}
                  className="w-full p-3 bg-white border border-stone-outline rounded-md font-body-md focus:ring-primary focus:border-primary"
                >
                  <option value="General Fund">General Fund</option>
                  <option value="Missions">Missions</option>
                  <option value="Building Fund">Building Fund</option>
                </select>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block font-label-sm uppercase tracking-wider text-outline mb-2">Amount</label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-outline">$</span>
                    <input 
                      type="number" 
                      value={editAmount} 
                      onChange={e => setEditAmount(Number(e.target.value))}
                      className="w-full pl-8 p-3 bg-white border border-stone-outline rounded-md font-body-md focus:ring-primary focus:border-primary"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <label className="block font-label-sm uppercase tracking-wider text-outline mb-2">Frequency</label>
                  <select 
                    value={editFrequency} 
                    onChange={e => setEditFrequency(e.target.value as Donation['frequency'])}
                    className="w-full p-3 bg-white border border-stone-outline rounded-md font-body-md focus:ring-primary focus:border-primary"
                  >
                    <option value="WEEKLY">Weekly</option>
                    <option value="MONTHLY">Monthly</option>
                    <option value="QUARTERLY">Quarterly</option>
                    <option value="ANNUALLY">Annually</option>
                  </select>
                </div>
              </div>
              
              <div className="bg-surface-bright p-4 rounded border border-outline-variant mt-2">
                <p className="text-sm text-on-surface-variant">Changes will take effect immediately. Mock payments will continue on the new schedule.</p>
              </div>
            </div>
            <div className="bg-surface-paper p-4 border-t border-outline-variant flex justify-end gap-2">
              <button onClick={() => { setAction('NONE'); setSelectedDonation(null); }} className="px-6 py-2 border border-stone-outline rounded font-label-sm uppercase tracking-wider text-on-surface hover:bg-surface-variant transition-colors">
                Cancel
              </button>
              <button onClick={handleSaveEdit} className="px-6 py-2 bg-primary text-on-primary rounded font-label-sm uppercase tracking-wider hover:bg-primary-fixed-variant transition-colors">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pause Confirmation Modal */}
      {action === 'PAUSE' && selectedDonation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-surface-linen w-full max-w-[400px] rounded-xl shadow-lg border border-outline-variant overflow-hidden flex flex-col">
            <div className="p-6 flex flex-col items-center text-center gap-4">
              <div className="w-16 h-16 rounded-full bg-tertiary-container text-on-tertiary-container flex items-center justify-center">
                <span className="material-symbols-outlined text-3xl">pause_circle</span>
              </div>
              <h3 className="font-headline-md text-primary">Pause Gift?</h3>
              <p className="font-body-md text-on-surface-variant">
                Are you sure you want to pause your ${selectedDonation.amount.toFixed(2)} {selectedDonation.frequency.toLowerCase()} gift to {selectedDonation.purpose}? 
                You can resume it at any time.
              </p>
            </div>
            <div className="bg-surface-paper p-4 border-t border-outline-variant flex gap-2">
              <button onClick={() => { setAction('NONE'); setSelectedDonation(null); }} className="flex-1 py-3 border border-stone-outline rounded font-label-sm uppercase tracking-wider text-on-surface hover:bg-surface-variant transition-colors">
                Keep Active
              </button>
              <button onClick={() => handleStatusChange('PAUSED')} className="flex-1 py-3 bg-primary text-on-primary rounded font-label-sm uppercase tracking-wider hover:bg-primary-fixed-variant transition-colors">
                Confirm Pause
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Confirmation Modal */}
      {action === 'CANCEL' && selectedDonation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-surface-linen w-full max-w-[400px] rounded-xl shadow-lg border border-error-container overflow-hidden flex flex-col">
            <div className="p-6 flex flex-col items-center text-center gap-4">
              <div className="w-16 h-16 rounded-full bg-error-container text-error flex items-center justify-center">
                <span className="material-symbols-outlined text-3xl">warning</span>
              </div>
              <h3 className="font-headline-md text-error">Cancel Gift?</h3>
              <p className="font-body-md text-on-surface-variant">
                This will permanently stop your recurring gift of ${selectedDonation.amount.toFixed(2)} to {selectedDonation.purpose}.
                Your past donation history will remain available.
              </p>
            </div>
            <div className="bg-surface-paper p-4 border-t border-outline-variant flex gap-2">
              <button onClick={() => { setAction('NONE'); setSelectedDonation(null); }} className="flex-1 py-3 border border-stone-outline rounded font-label-sm uppercase tracking-wider text-on-surface hover:bg-surface-variant transition-colors">
                Go Back
              </button>
              <button onClick={() => handleStatusChange('CANCELLED')} className="flex-1 py-3 bg-error text-on-error rounded font-label-sm uppercase tracking-wider hover:bg-error transition-colors">
                Confirm Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
