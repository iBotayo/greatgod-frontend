'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function PodcastPage({ params }: { params: Promise<{ slug: string }> }) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="max-w-form-width mx-auto w-full px-margin-mobile pt-stack-md md:pt-stack-lg pb-stack-lg flex-1 flex flex-col items-center min-h-[calc(100vh-200px)]">
      {/* Cover Art */}
      <div className="w-full aspect-square max-w-[400px] mb-stack-md rounded-xl overflow-hidden shadow-sm border border-outline-variant relative group mt-8">
        <img 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCqOTT9BvRY3JuzsnUSeDysMu6m12vEsJfAPxPnOpRVb157mBPisPj1aDH8G7JenglneTHQLvH8Gy5RV6KhAhzrfr_SG0OkkWa7SBkqGmTg3SJEGYV98rWJ2eE4CPSz4E3YavaaEd93PLNpHfqMW6F3qqqPK9Dze6SplFM2ObNUMCAldW8q_uFrYSJqS4rEYMKma8g4A59g7zgSvNfcqi3WC1SRA79Ba4sfyyARdyFgGkolOHIRCzW4"
          alt="Podcast Cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Title & Series */}
      <div className="text-center mb-stack-lg w-full">
        <p className="font-label-sm text-label-sm text-secondary tracking-widest uppercase mb-2">Theology in Daily Life</p>
        <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary mb-3">
          Finding Peace in the Storm
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-prose mx-auto">
          A reflection on maintaining stillness amidst life&apos;s chaos, drawing from ancient wisdom and modern practices.
        </p>
      </div>

      {/* Player Controls */}
      <div className="w-full bg-surface-container-low rounded-2xl p-6 md:p-8 border border-outline-variant shadow-sm relative overflow-hidden">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between font-label-sm text-label-sm text-secondary mb-2">
            <span>{isPlaying ? '12:45' : '00:00'}</span>
            <span>-35:15</span>
          </div>
          <div className="w-full h-1 bg-surface-variant rounded-full relative cursor-pointer group">
            <div className={`absolute top-0 left-0 h-full bg-primary rounded-full transition-all duration-1000 ${isPlaying ? 'w-1/3' : 'w-0'}`}></div>
            <div className={`absolute top-1/2 -translate-y-1/2 ${isPlaying ? 'left-1/3' : 'left-0'} w-3 h-3 bg-primary rounded-full shadow-md scale-0 group-hover:scale-100 transition-all duration-300 -ml-1.5`}></div>
          </div>
        </div>

        {/* Main Buttons */}
        <div className="flex items-center justify-center gap-6 md:gap-8">
          <button aria-label="Playback Speed" className="text-secondary hover:text-primary transition-colors p-2 flex items-center justify-center">
            <span className="font-label-sm text-label-sm">1.2x</span>
          </button>
          <button aria-label="Skip Back 15s" className="text-on-surface hover:text-primary transition-colors p-2 flex items-center justify-center active:scale-95">
            <span className="material-symbols-outlined text-3xl">replay_10</span>
          </button>
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            aria-label="Play/Pause" 
            className="w-16 h-16 md:w-20 md:h-20 bg-primary text-on-primary rounded-full flex items-center justify-center shadow-md hover:bg-primary-fixed-variant transition-all active:scale-95"
          >
            <span className="material-symbols-outlined text-4xl">
              {isPlaying ? 'pause' : 'play_arrow'}
            </span>
          </button>
          <button aria-label="Skip Forward 15s" className="text-on-surface hover:text-primary transition-colors p-2 flex items-center justify-center active:scale-95">
            <span className="material-symbols-outlined text-3xl">forward_10</span>
          </button>
          <button aria-label="More Options" className="text-secondary hover:text-primary transition-colors p-2 flex items-center justify-center">
            <span className="material-symbols-outlined">more_vert</span>
          </button>
        </div>
      </div>

      {/* Related Content Divider */}
      <div className="w-full flex items-center gap-4 my-stack-lg">
        <div className="h-px bg-outline-variant flex-1"></div>
        <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest">Further Reading</span>
        <div className="h-px bg-outline-variant flex-1"></div>
      </div>

      {/* Related Articles */}
      <div className="w-full flex flex-col gap-4">
        <Link href="#" className="flex gap-4 p-4 rounded-xl border border-outline-variant hover:border-primary hover:bg-surface-container-lowest transition-all group bg-surface-container-lowest">
          <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
            <img 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_W-vMKCu4T9KdxW3GeXoXVTBG5KMtbYOj-H-5wYbgXTyULkS89-AQtveeuLzzIM-wZYdvhU89ndgfRv1NLXkJcT3MMRRKE_SzG7XFNc5V6Gy1MTY401WJpfAk0DOecT_JZWMGYuwmdKsOnHYGk8mzkwSsPirj58ScUdmdc7G1INeKNyOzIfY9BdpO33Rglxt00pakbDFaEFkqu1SVBrF7mGWwF1RB2EeELZxTZzMIXQZXY3XVPV6u"
              alt="Related Article"
            />
          </div>
          <div className="flex flex-col justify-center">
            <span className="font-label-sm text-label-sm text-secondary mb-1">Article</span>
            <h3 className="font-label-lg text-label-lg text-on-surface group-hover:text-primary transition-colors line-clamp-2">Navigating Silence in a Noisy World</h3>
          </div>
        </Link>
      </div>
    </div>
  );
}
