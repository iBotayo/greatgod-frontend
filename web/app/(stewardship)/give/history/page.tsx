'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useDb } from '../../../../components/provider/db-provider';
import { useAuth } from '../../../../components/provider/auth-provider';
import { Donation } from '../../../../types';

export default function DonationHistoryPage() {
  const router = useRouter();
  const { db } = useDb();
  const { currentUser, isAuthReady } = useAuth();
  
  const [selectedDonation, setSelectedDonation] = useState<Donation | null>(null);

  useEffect(() => {
    if (isAuthReady && !currentUser) {
      router.replace('/?error=unauthorized');
    }
  }, [currentUser, isAuthReady, router]);

  if (!isAuthReady || !currentUser) {
    return null;
  }

  const userDonations = db.donations.filter(d => d.userId === currentUser.id);
  const totalGiven = userDonations.filter(d => d.status === 'COMPLETED').reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="flex-grow w-full max-w-[800px] mx-auto px-[20px] py-[64px] flex flex-col gap-[32px]">
      <div className="flex justify-between items-end border-b border-outline-variant pb-[16px]">
        <div>
          <div className="flex gap-6 mb-4 font-label-sm uppercase tracking-wider text-outline">
            <span className="text-primary border-b-2 border-primary pb-1">History</span>
            <Link href="/give/manage" className="hover:text-primary transition-colors pb-1">Manage</Link>
          </div>
          <h1 className="font-headline-lg text-primary">Giving History</h1>
          <p className="text-on-surface-variant font-body-md">Your faithful stewardship record.</p>
        </div>
        <div className="text-right">
          <p className="text-outline font-label-sm uppercase tracking-wider">Total Given</p>
          <p className="font-headline-md text-primary">${totalGiven.toFixed(2)}</p>
        </div>
      </div>

      {userDonations.length === 0 ? (
        <div className="bg-surface-variant rounded-xl p-[64px] text-center flex flex-col items-center gap-[16px]">
          <span className="material-symbols-outlined text-[48px] text-outline">receipt_long</span>
          <h3 className="font-headline-md text-primary">No History Found</h3>
          <p className="text-on-surface-variant">You have not made any donations yet.</p>
        </div>
      ) : (
        <div className="bg-surface-paper border border-outline-variant rounded-xl overflow-hidden shadow-sm">
          <table className="w-full text-left">
            <thead className="bg-surface-variant text-on-surface-variant font-label-sm uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Fund</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {userDonations.map(donation => (
                <tr key={donation.id} className="hover:bg-surface-bright transition-colors">
                  <td className="px-6 py-4 font-body-md">{new Date(donation.date).toLocaleDateString()}</td>
                  <td className="px-6 py-4 font-body-md">{donation.purpose}</td>
                  <td className="px-6 py-4 font-label-lg text-primary">${donation.amount.toFixed(2)} {donation.frequency !== 'ONETIME' && <span className="text-xs text-outline ml-1">({donation.frequency.toLowerCase()})</span>}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-label-sm uppercase ${donation.status === 'COMPLETED' || donation.status === 'ACTIVE' ? 'bg-secondary-container text-on-secondary-container' : 'bg-surface-dim text-outline'}`}>
                      {donation.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => setSelectedDonation(donation)}
                      className="text-primary hover:text-primary-fixed-variant transition-colors flex items-center justify-end gap-1 font-label-sm"
                    >
                      <span className="material-symbols-outlined text-[18px]">visibility</span> View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Receipt Modal */}
      {selectedDonation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-surface-linen w-full max-w-[400px] rounded-xl shadow-lg border border-outline-variant overflow-hidden flex flex-col">
            <div className="bg-surface-variant p-4 flex justify-between items-center border-b border-outline-variant">
              <h3 className="font-headline-md text-primary">Receipt</h3>
              <button onClick={() => setSelectedDonation(null)} className="text-on-surface-variant hover:text-primary">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="p-6 flex flex-col gap-4">
              <div className="text-center pb-4 border-b border-outline-variant border-dashed">
                <p className="text-outline font-label-sm uppercase tracking-widest mb-2">Donation Amount</p>
                <p className="font-headline-lg text-primary">${selectedDonation.amount.toFixed(2)}</p>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-label-sm text-outline">Reference ID</span>
                <span className="font-body-md">{selectedDonation.id}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-label-sm text-outline">Date</span>
                <span className="font-body-md">{new Date(selectedDonation.date).toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-label-sm text-outline">Fund</span>
                <span className="font-body-md">{selectedDonation.purpose}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-label-sm text-outline">Frequency</span>
                <span className="font-body-md capitalize">{selectedDonation.frequency.toLowerCase()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-label-sm text-outline">Status</span>
                <span className="font-body-md">{selectedDonation.status}</span>
              </div>
            </div>
            <div className="bg-surface-paper p-4 border-t border-outline-variant text-center">
              <p className="text-xs text-outline italic">GreatGod Media is a registered 501(c)(3) organization. This receipt serves as official documentation for tax purposes.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
