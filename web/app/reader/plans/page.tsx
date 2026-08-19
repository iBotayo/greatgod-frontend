'use client';

import React from 'react';
import Link from 'next/link';
import { useDb } from '../../../components/provider/db-provider';

export default function PlansPage() {
  const { db } = useDb();
  // Using some mock articles for plan covers
  const cover1 = db.articles[2]?.coverImage || "https://lh3.googleusercontent.com/aida-public/AB6AXuC5sszplRftCJu3FLQZ-2dOB9Tg8LAa8yrKWd6yMbOO3C07zI3T7Px1hrXFOC0qRf4LNI01YZ5mOa__XV3aRWTStvcEXtlPqExh4rWUzYsyE_0VR8vPw7ce_DoQt-XTHTMKXHUfr83_8ULsXIT_AZfurunVHvcpyWtQndBQagTxvkIoAMwk5dOImom_6jp0VTpHYwcGAlHIOBrhhyaJl7XTQOEXQsJiwk7cUGfxyGzR5pZxEEieq3rN";

  return (
    <main className="max-w-container-max mx-auto px-margin-mobile md:px-gutter py-stack-md md:py-stack-lg min-h-[calc(100vh-200px)]">
      {/* Header */}
      <div className="mb-stack-lg text-center md:text-left mt-16">
        <h1 className="font-display-lg text-headline-lg-mobile md:text-display-lg text-primary mb-2">Reading Plans</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">Structured journeys through scripture and theology, designed for contemplation and growth.</p>
      </div>

      {/* My Active Plans */}
      <section className="mb-stack-lg">
        <div className="flex items-center justify-between mb-stack-sm border-b border-outline-variant pb-2">
          <h2 className="font-headline-md text-headline-md text-on-surface">My Active Plans</h2>
          <Link href="#" className="font-label-sm text-label-sm text-primary underline hover:no-underline transition-all">View All</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-unit auto-rows-[240px]">
          
          {/* Active Plan 1 (Large Card) */}
          <article className="md:col-span-8 bg-surface-container-low border border-outline-variant rounded-lg overflow-hidden flex flex-col md:flex-row relative group">
            <div className="md:w-2/5 h-48 md:h-full relative overflow-hidden bg-surface-variant">
              <img 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                src={cover1}
                alt="Plan Cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-surface-container-low to-transparent opacity-80"></div>
            </div>
            <div className="p-stack-sm md:w-3/5 flex flex-col justify-center relative z-10">
              <span className="font-label-sm text-label-sm text-secondary uppercase mb-2">Theology</span>
              <h3 className="font-headline-md text-headline-md text-primary mb-2">The Attributes of God</h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-4 line-clamp-2">A 30-day deep dive into understanding the unchanging nature and character of the Creator.</p>
              <div className="mt-auto">
                <div className="flex justify-between font-label-sm text-label-sm text-secondary mb-1">
                  <span>Day 14 of 30</span>
                  <span>45%</span>
                </div>
                <div className="w-full h-1 bg-surface-variant rounded-full overflow-hidden">
                  <div className="h-full bg-primary-container w-[45%] rounded-full"></div>
                </div>
              </div>
            </div>
            <Link href="#" className="absolute inset-0 z-20"><span className="sr-only">Continue Plan</span></Link>
          </article>

          {/* Active Plan 2 (Small Card) */}
          <article className="md:col-span-4 bg-surface-container-low border border-outline-variant rounded-lg p-stack-sm flex flex-col relative group hover:bg-surface-container transition-colors">
            <span className="font-label-sm text-label-sm text-secondary uppercase mb-2">Scripture</span>
            <h3 className="font-headline-md text-headline-md text-primary mb-2 leading-tight">Psalms of Ascent</h3>
            <p className="font-body-md text-body-md text-on-surface-variant mb-4 text-sm line-clamp-3 flex-grow">Meditations for the pilgrimage of faith, walking through Psalms 120-134.</p>
            <div className="mt-auto">
              <div className="flex justify-between font-label-sm text-label-sm text-secondary mb-1">
                <span>Day 3 of 15</span>
                <span>20%</span>
              </div>
              <div className="w-full h-1 bg-surface-variant rounded-full overflow-hidden">
                <div className="h-full bg-primary-container w-[20%] rounded-full"></div>
              </div>
            </div>
            <Link href="#" className="absolute inset-0 z-20"><span className="sr-only">Continue Plan</span></Link>
          </article>

        </div>
      </section>

      {/* Flourish Divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-outline-variant to-transparent my-stack-lg"></div>

      {/* Browse New Plans */}
      <section>
        <div className="flex items-center justify-between mb-stack-sm border-b border-outline-variant pb-2">
          <h2 className="font-headline-md text-headline-md text-on-surface">Browse New Plans</h2>
          <div className="hidden md:flex gap-2">
            <button className="p-2 border border-outline-variant rounded-full text-secondary hover:text-primary hover:border-primary transition-colors flex items-center justify-center">
              <span className="material-symbols-outlined text-sm">chevron_left</span>
            </button>
            <button className="p-2 border border-outline-variant rounded-full text-secondary hover:text-primary hover:border-primary transition-colors flex items-center justify-center">
              <span className="material-symbols-outlined text-sm">chevron_right</span>
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-stack-sm">
          
          {/* Plan Card 1 */}
          <article className="bg-surface border border-outline-variant rounded-lg overflow-hidden group hover:shadow-sm transition-shadow">
            <div className="h-48 relative overflow-hidden bg-surface-container">
              <img 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD5yAUtmVV0DlZR3DWB6hCEZbz1yHQK7SZsWcOkROdWKMnEFq4S0pwTg-yPJb4QXgJ1u9JKj9gJzDqRNXU2MsG2mzr23rV0zOuze0n31yvPhtmPq6ofHst6SrHquyUrZZjShX4TDyC2CXXsQFInx0tbo8MVqw4zeeFVMk_wV9RdQnw1u_5kPDdaoSHJN_z8oudJGaI1tuIC6nOPgPRt_BoB70sdoTA_61zkQ-F9VTAwvz_cpmF9YS05"
                alt="Foundations"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-outline/10"></div>
            </div>
            <div className="p-stack-sm bg-surface">
              <div className="flex items-center gap-2 font-label-sm text-label-sm text-secondary mb-2 opacity-70">
                <span>12 Days</span>
                <span>·</span>
                <span>Foundations</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-primary mb-2">Foundations of Faith</h3>
              <p className="font-body-md text-body-md text-on-surface-variant text-sm mb-4">Core doctrines explained clearly for the modern believer.</p>
              <button className="font-label-sm text-label-sm text-primary underline hover:no-underline transition-all">Start Plan</button>
            </div>
          </article>

          {/* Plan Card 2 */}
          <article className="bg-surface border border-outline-variant rounded-lg overflow-hidden group hover:shadow-sm transition-shadow">
            <div className="h-48 relative overflow-hidden bg-surface-container">
              <img 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDh4wC8JWOnjNyI1YVY8iycTkDVuJEeP8-jpygnIoJ6saJMPY4_QYE8FB4A2npAU3-MWiJs-llk2F5S366D__4GD8qSlmX_1aHnVclNiIyMUN3_YnD82n7GYSmDe_VM9-VJnXi2P1yhiohYmY1NNuoxOKsBy5BSnfM5IixoJvY9Wp6UmI8KA2nE8T1SsIBcRa05Y-aOB4UBkyRaKr-zSMrIWz4hPM8v2aGWaB4NMfFAGqTeYD7L_lk5"
                alt="Gospels"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-outline/10"></div>
            </div>
            <div className="p-stack-sm bg-surface">
              <div className="flex items-center gap-2 font-label-sm text-label-sm text-secondary mb-2 opacity-70">
                <span>21 Days</span>
                <span>·</span>
                <span>Gospels</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-primary mb-2">The Gospel of John</h3>
              <p className="font-body-md text-body-md text-on-surface-variant text-sm mb-4">Explore the life of Christ through the eyes of the beloved disciple.</p>
              <button className="font-label-sm text-label-sm text-primary underline hover:no-underline transition-all">Start Plan</button>
            </div>
          </article>

          {/* Plan Card 3 */}
          <article className="bg-surface border border-outline-variant rounded-lg overflow-hidden group hover:shadow-sm transition-shadow">
            <div className="h-48 relative overflow-hidden bg-surface-container">
              <img 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB5Rigjg6BWpPd4W2Kobu7cqJU46SnmhmHQhCkh9CtWukU7GG0zCx6pI0N2yYwNT23P8O_ejCUemNFgIrB6C2yDIQIb5dI2FIfxM4yi-YNLWHAHoCZ_EfEpWIt1SKWjjOjV8nSSdbBysIX33dnCS92Udq5leEPSz4dTvmgxfAKBz_eE4Cb3U7YNQzk4xV9_y9-uhqm4xj0SKl3oPsMfGY_0O1MtZKUdIFxVNuoy6T3cx0IPSxQ02PZb"
                alt="Christian Living"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-outline/10"></div>
            </div>
            <div className="p-stack-sm bg-surface">
              <div className="flex items-center gap-2 font-label-sm text-label-sm text-secondary mb-2 opacity-70">
                <span>14 Days</span>
                <span>·</span>
                <span>Christian Living</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-primary mb-2">Practices of Peace</h3>
              <p className="font-body-md text-body-md text-on-surface-variant text-sm mb-4">Cultivating quietness and trust in an anxious age.</p>
              <button className="font-label-sm text-label-sm text-primary underline hover:no-underline transition-all">Start Plan</button>
            </div>
          </article>

        </div>
      </section>

    </main>
  );
}
