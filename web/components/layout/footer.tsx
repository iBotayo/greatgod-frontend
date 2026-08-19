'use client';

import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="w-full py-stack-md px-margin-mobile text-center flex flex-col items-center gap-unit bg-surface-paper border-t border-surface-linen mt-stack-lg">
      <div className="font-label-lg text-label-lg text-primary">GreatGod</div>
      <p className="font-body-md text-body-md text-secondary">© 2026 GreatGod Media. All donations are tax-deductible.</p>
      
      <div className="flex flex-wrap justify-center gap-4 mt-2">
        <span className="font-label-sm text-label-sm text-outline">Secure SSL Encrypted</span>
        <Link href="#" className="font-label-sm text-label-sm text-outline hover:text-primary transition-colors">Privacy Policy</Link>
        <Link href="#" className="font-label-sm text-label-sm text-outline hover:text-primary transition-colors">Terms of Stewardship</Link>
      </div>
    </footer>
  );
}
