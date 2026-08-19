'use client';

import React from 'react';
import Link from 'next/link';
import { useDb } from '../../../components/provider/db-provider';

export default function BookmarksPage() {
  const { db } = useDb();

  // For prototype purposes, just mock some bookmarked articles from db
  const bookmarkedArticles = db.articles.slice(0, 3);

  return (
    <main className="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-gutter pt-8 pb-stack-lg mt-16 min-h-[calc(100vh-200px)]">
      {/* Header Section */}
      <div className="mb-stack-lg flex flex-col md:flex-row md:items-end justify-between gap-stack-sm border-b border-outline-variant pb-stack-sm">
        <div>
          <h2 className="font-headline-lg-mobile md:font-headline-lg text-on-surface mb-2">My Bookmarks</h2>
          <p className="font-body-md text-on-surface-variant">Saved articles and resources for deep reading.</p>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          {/* Search */}
          <div className="relative w-full sm:w-64">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm">search</span>
            <input 
              className="w-full pl-10 pr-4 py-2 bg-surface-container-low border border-outline-variant rounded font-body-md text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary-container focus:border-transparent transition-all" 
              placeholder="Search bookmarks..." 
              type="text"
            />
          </div>
          
          {/* Sort */}
          <div className="relative w-full sm:w-auto shrink-0">
            <select className="w-full appearance-none pl-4 pr-10 py-2 bg-surface border border-outline-variant rounded font-label-sm text-label-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary-container focus:border-transparent transition-all cursor-pointer">
              <option>Date Saved (Newest)</option>
              <option>Date Saved (Oldest)</option>
              <option>Title (A-Z)</option>
              <option>Author (A-Z)</option>
            </select>
            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">expand_more</span>
          </div>
        </div>
      </div>

      {/* Bookmarks List */}
      <div className="space-y-6">
        {bookmarkedArticles.map(article => (
          <article key={article.id} className="group flex flex-col sm:flex-row gap-6 p-4 rounded-lg border border-transparent border-b-outline-variant sm:border-b-transparent hover:bg-surface-container-low hover:border-outline-variant transition-all cursor-pointer">
            <Link href={`/article/${article.id}`} className="w-full sm:w-48 h-32 shrink-0 rounded overflow-hidden bg-surface-container">
              <img 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                src={article.coverImage || "https://lh3.googleusercontent.com/aida-public/AB6AXuAUEHHtfZs5CJToxMEkG9xP0i_UzfAySmEDY76h9sKYDw2TqRtR24soh_PyYYPdcTx9jHc-f4LEk3Upqf3xfKnyOTMTMYdGh1QXF1ifMqiafhqc3ZdbQ2HrzOvwhE8XRuCP9BEjiTAvPAiG6b5BCEPLUAr2YYFcL2EnfnRo7UYjvscGWEtCpYY_ZYtGaDhExsWk0SyeyxOeO6xv40RgULv3ekcNP_Chd9S8coXxDESH-4VAYNotjkRG"}
                alt={article.title}
              />
            </Link>
            
            <div className="flex flex-col justify-center flex-grow">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">{article.tags[0] || 'Article'}</span>
                <span className="text-outline text-xs">•</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">Saved {(article.title.length % 5) + 1} days ago</span>
              </div>
              <Link href={`/article/${article.id}`}>
                <h3 className="font-headline-md text-headline-md text-on-surface mb-2 hover:text-primary transition-colors cursor-pointer">
                  {article.title}
                </h3>
              </Link>
              <div className="flex items-center gap-2 mt-auto">
                <span className="font-label-sm text-label-sm text-secondary">
                  By {db.users.find(u => u.id === article.authorId)?.name}
                </span>
              </div>
            </div>
            
            <div className="flex sm:flex-col items-center justify-end sm:justify-start gap-4 shrink-0 sm:pt-2">
              <button aria-label="Remove bookmark" className="text-on-surface-variant hover:text-primary transition-colors focus:outline-none">
                <span className="material-symbols-outlined fill-icon" style={{ fontVariationSettings: "'FILL' 1" }}>bookmark</span>
              </button>
              <button aria-label="More options" className="text-on-surface-variant hover:text-primary transition-colors focus:outline-none">
                <span className="material-symbols-outlined">more_vert</span>
              </button>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
