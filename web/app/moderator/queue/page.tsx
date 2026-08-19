'use client';

import React from 'react';
import Link from 'next/link';

export default function ModerationQueuePage() {
  return (
    <div className="flex-grow w-full max-w-container-max mx-auto py-4">
      {/* Page Header */}
      <div className="mb-stack-md flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-headline-lg-mobile md:text-headline-lg font-headline-lg-mobile md:font-headline-lg text-on-background mb-2">Moderation Queue</h1>
          <p className="text-body-md font-body-md text-secondary">Review flagged reflections and maintain editorial standards.</p>
        </div>
        
        {/* Mobile Search (Visible only on mobile) */}
        <div className="md:hidden flex items-center bg-surface-container-low rounded px-3 py-2 border border-outline-variant w-full focus-within:ring-2 focus-within:ring-primary-container transition-all">
          <span className="material-symbols-outlined text-secondary text-[20px] mr-2">search</span>
          <input className="bg-transparent border-none focus:outline-none text-label-sm font-label-sm w-full placeholder:text-secondary/70 text-on-surface" placeholder="Search..." type="text" />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-6 border-b border-outline-variant mb-stack-md overflow-x-auto scrollbar-hide">
        <button className="text-primary font-bold border-b-2 border-primary pb-2 text-label-sm font-label-sm whitespace-nowrap">Pending (2)</button>
        <button className="text-secondary hover:text-primary transition-colors pb-2 text-label-sm font-label-sm whitespace-nowrap">Resolved</button>
        <button className="text-secondary hover:text-primary transition-colors pb-2 text-label-sm font-label-sm whitespace-nowrap">Appeals</button>
      </div>

      {/* Queue List */}
      <div className="flex flex-col gap-4">
        
        {/* Queue Item 1 */}
        <article className="bg-[#F2EEE6] border border-[#E5E0D8] rounded-lg p-6 flex flex-col md:flex-row gap-6 hover:bg-surface-container transition-colors duration-200">
          <div className="flex-grow flex flex-col gap-2">
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-error-container text-on-error-container px-2 py-0.5 rounded text-[11px] font-label-sm uppercase tracking-wider flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">warning</span>
                Doctrinal Inaccuracy
              </span>
              <span className="text-label-sm font-label-sm text-secondary opacity-70">· Reported by Community · 2h ago</span>
            </div>
            
            <h3 className="text-headline-md font-headline-md text-on-background">Reflections on the Modern Canon</h3>
            <div className="text-body-md font-body-md text-on-surface-variant line-clamp-3 my-2">
              &quot;The rigid adherence to historical texts often stifles contemporary spiritual evolution. We must consider that many foundational dogmas were constructed more for political control than theological truth...&quot;
            </div>
            
            <div className="flex items-center gap-3 mt-auto pt-2">
              <div className="w-6 h-6 rounded-full bg-surface-variant flex items-center justify-center border border-outline-variant">
                <span className="text-[10px] font-bold">ET</span>
              </div>
              <span className="text-label-sm font-label-sm text-secondary">By Elias Thorne</span>
            </div>
          </div>
          
          <div className="flex flex-row md:flex-col justify-end md:justify-start gap-3 border-t md:border-t-0 md:border-l border-[#E5E0D8] pt-4 md:pt-0 md:pl-6 shrink-0">
            <button className="bg-primary-container text-on-primary text-label-sm font-label-sm px-4 py-2 rounded hover:bg-on-primary-fixed-variant transition-colors w-full text-center">
              View Detail
            </button>
            <button className="border border-outline text-secondary text-label-sm font-label-sm px-4 py-2 rounded hover:bg-surface-container-highest transition-colors w-full text-center">
              Approve
            </button>
            <button className="text-error hover:text-on-error-container text-label-sm font-label-sm px-4 py-2 rounded hover:bg-error-container/20 transition-colors w-full text-center flex items-center justify-center gap-1">
              <span className="material-symbols-outlined text-[18px]">delete</span> Remove
            </button>
          </div>
        </article>

        {/* Queue Item 2 */}
        <article className="bg-[#F2EEE6] border border-[#E5E0D8] rounded-lg p-6 flex flex-col md:flex-row gap-6 hover:bg-surface-container transition-colors duration-200">
          <div className="flex-grow flex flex-col gap-2">
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-tertiary-container text-on-tertiary-container px-2 py-0.5 rounded text-[11px] font-label-sm uppercase tracking-wider flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">forum</span>
                Uncivil Discourse
              </span>
              <span className="text-label-sm font-label-sm text-secondary opacity-70">· Reported by Moderator · 5h ago</span>
            </div>
            
            <h3 className="text-headline-md font-headline-md text-on-background">Comment on &apos;The Aesthetics of Liturgy&apos;</h3>
            <div className="text-body-md font-body-md text-on-surface-variant line-clamp-3 my-2 border-l-2 border-outline-variant pl-4 italic">
              &quot;This entire article is a pretentious waste of time. Anyone who thinks &apos;liturgical beauty&apos; matters more than practical charity is completely missing the point and frankly, a hypocrite.&quot;
            </div>
            
            <div className="flex items-center gap-3 mt-auto pt-2">
              <div className="w-6 h-6 rounded-full bg-surface-variant flex items-center justify-center border border-outline-variant">
                <span className="text-[10px] font-bold">MS</span>
              </div>
              <span className="text-label-sm font-label-sm text-secondary">By M. Sterling</span>
            </div>
          </div>
          
          <div className="flex flex-row md:flex-col justify-end md:justify-start gap-3 border-t md:border-t-0 md:border-l border-[#E5E0D8] pt-4 md:pt-0 md:pl-6 shrink-0">
            <button className="bg-primary-container text-on-primary text-label-sm font-label-sm px-4 py-2 rounded hover:bg-on-primary-fixed-variant transition-colors w-full text-center">
              View Detail
            </button>
            <button className="border border-outline text-secondary text-label-sm font-label-sm px-4 py-2 rounded hover:bg-surface-container-highest transition-colors w-full text-center">
              Approve
            </button>
            <button className="text-error hover:text-on-error-container text-label-sm font-label-sm px-4 py-2 rounded hover:bg-error-container/20 transition-colors w-full text-center flex items-center justify-center gap-1">
              <span className="material-symbols-outlined text-[18px]">visibility_off</span> Hide
            </button>
          </div>
        </article>

      </div>

      {/* Pagination / Load More */}
      <div className="mt-stack-md flex justify-center pb-stack-lg">
        <button className="text-primary text-label-sm font-label-sm border-b border-primary hover:border-transparent transition-colors">
          Load More Items
        </button>
      </div>
    </div>
  );
}
