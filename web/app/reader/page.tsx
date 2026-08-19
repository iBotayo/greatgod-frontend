'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '../../components/provider/auth-provider';
import { useDb } from '../../components/provider/db-provider';

export default function ReaderDashboardPage() {
  const { currentUser } = useAuth();
  const { db } = useDb();

  const articles = db.articles.filter(a => a.status === 'PUBLISHED');

  return (
    <div className="flex-grow pt-8 pb-stack-lg px-margin-mobile md:px-gutter max-w-container-max mx-auto w-full mt-16 min-h-[calc(100vh-200px)]">
      {/* Welcome Section */}
      <section className="mt-stack-md mb-stack-lg text-center md:text-left">
        <h1 className="font-headline-lg-mobile md:font-headline-lg text-primary mb-2">
          Welcome back, {currentUser?.name?.split(' ')[0] || 'Reader'}
        </h1>
        <p className="font-body-md text-on-surface-variant">Here is where you left off in your reading journey.</p>
      </section>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-stack-md">
        
        {/* Continue Reading (Spans 8 cols on desktop) */}
        <section className="md:col-span-8 bg-surface-container-low border border-outline-variant rounded-lg p-stack-md flex flex-col md:flex-row gap-stack-sm items-center shadow-sm relative overflow-hidden group">
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-r from-surface-container-low to-secondary-container/20"></div>
          <div className="w-full md:w-1/3 aspect-[3/4] relative rounded-lg overflow-hidden shrink-0">
            <img 
              className="object-cover w-full h-full" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCS6WuFaQi6z-21kQnTmmZ7ahm6L9TFqOcG1dfWqN5o-x2rSKOk1tazZuCsrDy2Kb14CKy53NgNeeXpaik30_3vzg6W_45LesKNTGKhKpx5ohS354nEN1aY5NjQwJTHQASj-bZdAG-cBYZ-FCE4cJKngwl5Y8nnnL-i_zjqQigF5U4th0uoXvUVeus7Q4ButRHIQTVuASC3HOqaySVHOTdP3uVry8oA0KvaIYwL9zdXAQeVSSVf2ls3"
              alt="Currently Reading"
            />
          </div>
          <div className="w-full md:w-2/3 flex flex-col justify-center">
            <span className="font-label-sm text-secondary uppercase tracking-widest mb-2">Continue Reading</span>
            <h2 className="font-headline-md text-on-surface mb-4">The City of God, Book X</h2>
            <p className="font-body-md text-on-surface-variant mb-6 line-clamp-3">
              Augustine continues his exploration of true worship versus false philosophy, distinguishing between the temporal and the eternal...
            </p>
            <div className="w-full bg-surface-variant h-1 rounded-full mb-2">
              <div className="bg-primary-container h-1 rounded-full w-[45%]"></div>
            </div>
            <div className="flex justify-between items-center mb-6">
              <span className="font-label-sm text-secondary">45% Complete</span>
              <span className="font-label-sm text-secondary">12 mins left</span>
            </div>
            <button className="bg-primary-container text-on-primary font-label-sm px-6 py-3 rounded hover:opacity-90 transition-opacity self-start inline-flex items-center gap-2">
              Resume Reading <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>
        </section>

        {/* Active Reading Plan (Spans 4 cols on desktop) */}
        <section className="md:col-span-4 bg-surface-container-low border border-outline-variant rounded-lg p-stack-md flex flex-col shadow-sm">
          <span className="font-label-sm text-secondary uppercase tracking-widest mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">calendar_today</span> Active Plan
          </span>
          <h3 className="font-headline-md text-on-surface mb-2">30 Days of Psalms</h3>
          <p className="font-body-md text-on-surface-variant mb-6 flex-grow">Day 18: Psalms of Ascent. A journey upward towards the presence of God.</p>
          <div className="flex justify-center items-center relative w-32 h-32 mx-auto mb-6">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle className="text-surface-variant" cx="50" cy="50" fill="none" r="45" stroke="currentColor" strokeWidth="8"></circle>
              <circle className="text-primary-container" cx="50" cy="50" fill="none" r="45" stroke="currentColor" strokeDasharray="283" strokeDashoffset="113.2" strokeLinecap="round" strokeWidth="8"></circle>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <span className="font-headline-md text-primary-container">60%</span>
            </div>
          </div>
          <button className="w-full border border-outline text-on-surface font-label-sm px-4 py-2 rounded hover:bg-surface-container transition-colors">
            Start Today&apos;s Reading
          </button>
        </section>

        {/* Divider */}
        <div className="col-span-1 md:col-span-12 py-stack-sm">
          <div className="flourish-divider w-full"></div>
        </div>

        {/* Recommended for You */}
        <section className="col-span-1 md:col-span-12">
          <h3 className="font-headline-md text-on-surface mb-stack-sm">Recommended for You</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-stack-sm">
            
            {articles.slice(0, 2).map((article, index) => (
              <Link href={`/article/${article.id}`} key={article.id} className="bg-surface-container-low border border-outline-variant rounded-lg overflow-hidden group hover:border-outline transition-colors flex flex-col h-full shadow-sm">
                <div className="h-48 relative overflow-hidden bg-surface-variant">
                  <img 
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700" 
                    src={article.coverImage || "https://lh3.googleusercontent.com/aida-public/AB6AXuA_Bugxg7zrQ3_q2nD4MlCzK1Bz_a0m6nDY3AJWaiyCS8adDXXghbPmFoPoyxCvc9a9WFK9F6aWIA9AeZde8KwY6ZWskNPAJq6s4wmSRxSiQNJ4xRxWX_QkxBijVRTmoFf4NDlNwqz10_0UpGZoLIlDDeeTQ4M-CrbzEnrr49thnIIcBHJBPTohUTC-h4bab69CiYqNdzj-RzhtidG8iO5uzNzVP6ZhIjqnb8irczNtorJksJ162-uC"}
                    alt={article.title}
                  />
                  <div className="absolute bottom-0 left-0 w-full p-2 bg-gradient-to-t from-black/60 to-transparent">
                    <p className="font-body-md text-white italic text-sm">{article.tags[0] || 'Reflection'}</p>
                  </div>
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <span className="font-label-sm text-secondary uppercase mb-1">Recommended</span>
                  <h4 className="font-headline-md text-on-surface mb-2 leading-tight">{article.title}</h4>
                  <p className="font-body-md text-on-surface-variant mb-4 line-clamp-2 flex-grow">{article.excerpt}</p>
                  <div className="font-label-sm text-secondary opacity-70">
                    {db.users.find(u => u.id === article.authorId)?.name} · {article.readTime} min read
                  </div>
                </div>
              </Link>
            ))}

            {/* Quick Links */}
            <div className="bg-surface border border-outline-variant border-dashed rounded-lg p-stack-md flex flex-col justify-center items-center text-center gap-4 hover:bg-surface-container-lowest transition-colors h-full">
              <h4 className="font-headline-md text-on-surface">Your Library</h4>
              <div className="flex flex-col w-full gap-2 mt-4">
                <Link href="/reader/bookmarks" className="w-full flex items-center justify-between p-3 bg-surface-container-low hover:bg-surface-container rounded transition-colors">
                  <span className="font-label-sm text-on-surface flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">bookmarks</span> Bookmarks
                  </span>
                  <span className="material-symbols-outlined text-secondary text-[16px]">chevron_right</span>
                </Link>
                <Link href="/reader/history" className="w-full flex items-center justify-between p-3 bg-surface-container-low hover:bg-surface-container rounded transition-colors">
                  <span className="font-label-sm text-on-surface flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">history</span> History
                  </span>
                  <span className="material-symbols-outlined text-secondary text-[16px]">chevron_right</span>
                </Link>
                <Link href="/reader/plans" className="w-full flex items-center justify-between p-3 bg-surface-container-low hover:bg-surface-container rounded transition-colors">
                  <span className="font-label-sm text-on-surface flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">calendar_month</span> Reading Plans
                  </span>
                  <span className="material-symbols-outlined text-secondary text-[16px]">chevron_right</span>
                </Link>
              </div>
            </div>
            
          </div>
        </section>
      </div>
    </div>
  );
}
