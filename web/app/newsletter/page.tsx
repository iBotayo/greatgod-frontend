'use client';

import React from 'react';
import { NewsletterForm } from '../../components/newsletter/newsletter-form';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function NewsletterSubscriptionPage() {
  const router = useRouter();

  return (
    <div className="h-full bg-surface-paper text-on-surface antialiased overflow-x-hidden flex flex-col fixed inset-0 z-[100] md:relative md:z-auto">
      {/* TopAppBar (Transactional - Hidden/Modified) */}
      <header className="flex justify-between items-center w-full px-margin-mobile h-16 max-w-container-max mx-auto bg-surface dark:bg-surface border-b border-outline-variant dark:border-outline flat no shadows sticky top-0 z-50">
        <button 
          onClick={() => router.back()}
          className="text-on-surface-variant dark:text-on-surface-variant hover:bg-surface-container-low dark:hover:bg-surface-container-highest transition-colors rounded-full p-2 flex items-center justify-center"
        >
          <span className="material-symbols-outlined">close</span>
        </button>
        <h1 className="font-headline-md text-headline-md text-primary dark:text-primary-fixed tracking-tight">GreatGod</h1>
        <div className="w-10"></div> {/* Spacer for centering */}
      </header>
      
      <main className="flex-grow flex flex-col px-margin-mobile pt-stack-md pb-stack-lg relative bg-surface-paper">
        {/* Background Decorative Element */}
        <div aria-hidden="true" className="absolute inset-0 z-0 opacity-10 pointer-events-none flex justify-center items-start pt-10 overflow-hidden">
          <span className="material-symbols-outlined text-[300px] text-primary">menu_book</span>
        </div>
        
        <div className="relative z-10 flex flex-col items-center text-center max-w-form-width mx-auto w-full mt-4">
          <div className="mb-stack-sm flex justify-center w-full">
            <div className="h-16 w-16 bg-surface-linen rounded-full border border-outline flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-3xl">mail</span>
            </div>
          </div>
          
          <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-unit">Join the GreatGod Weekly</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mb-stack-md">Receive scholarly clarity and spiritual stewardship directly to your inbox. A reflective, heritage-inspired digest.</p>
          
          {/* Highlights */}
          <ul className="flex flex-col gap-unit w-full mb-stack-md bg-surface-linen p-4 rounded-lg border border-outline-variant text-left">
            <li className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>auto_stories</span>
              <span className="font-label-lg text-label-lg text-on-surface">Weekly Reflections</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>headphones</span>
              <span className="font-label-lg text-label-lg text-on-surface">Latest Sermons</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>bookmark</span>
              <span className="font-label-lg text-label-lg text-on-surface">New Releases</span>
            </li>
          </ul>
          
          <NewsletterForm layout="vertical" />
        </div>
      </main>
      
      {/* Footer (Stewardship Footer for transactional flows) */}
      <footer className="w-full py-stack-md px-margin-mobile text-center flex flex-col items-center gap-unit bg-surface-linen dark:bg-surface-container flat no shadows border-t border-outline-variant mt-auto">
        <div className="flex items-center gap-2 text-success-secure mb-unit">
          <span className="material-symbols-outlined text-sm">lock</span>
          <span className="font-label-sm text-label-sm">Secure SSL Connection</span>
        </div>
        <p className="font-body-md text-body-md text-secondary dark:text-secondary-fixed-dim">© 2024 GreatGod Media.</p>
        <div className="flex gap-4 mt-2">
          <Link className="font-label-sm text-label-sm text-outline hover:text-primary transition-colors" href="#">Privacy Policy</Link>
          <Link className="font-label-sm text-label-sm text-outline hover:text-primary transition-colors" href="#">Terms</Link>
        </div>
      </footer>
    </div>
  );
}
