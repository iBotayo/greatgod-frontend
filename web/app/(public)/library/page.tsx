'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useDb } from '../../../components/provider/db-provider';

export default function LibraryPage() {
  const { db } = useDb();
  const [filter, setFilter] = useState('All Content');
  const [search, setSearch] = useState('');

  const publishedContent = db.articles.filter(a => a.status === 'PUBLISHED');

  const filteredContent = publishedContent.filter(article => {
    // Basic text search
    if (search && !article.title.toLowerCase().includes(search.toLowerCase())) return false;
    
    // Type filter (using tags as a proxy for type in this prototype)
    if (filter === 'All Content') return true;
    if (filter === 'Articles' && article.tags[0] === 'Christian Living') return true;
    if (filter === 'Sermons' && article.tags[0] === 'Theology') return true; // Just mapping for demo
    if (filter === 'Devotionals' && article.tags[0] === 'Church History') return true; // Just mapping for demo
    
    return false;
  });

  return (
    <div className="flex-1 min-h-[calc(100vh-200px)] flex flex-col relative w-full">
      {/* Header Section */}
      <div className="px-margin-mobile md:px-gutter py-stack-md border-b border-outline-variant bg-surface-bright mt-8">
        <div className="max-w-container-max mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="font-display-lg text-headline-lg-mobile md:text-display-lg text-primary mb-2">Library</h1>
            <p className="font-body-md text-body-md text-secondary max-w-xl">Master archive of all published works, sermons, and devotionals.</p>
          </div>
          <div className="flex items-center gap-4 bg-surface-container-low p-2 rounded-lg border border-outline-variant">
            <span className="material-symbols-outlined text-secondary ml-2">search</span>
            <input 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent border-none focus:ring-0 font-body-md text-body-md text-on-background placeholder:text-secondary/70 w-full md:w-64 outline-none" 
              placeholder="Search titles, authors, tags..." 
              type="text"
            />
          </div>
        </div>
      </div>

      {/* Filter & View Controls */}
      <div className="px-margin-mobile md:px-gutter py-4 border-b border-outline-variant bg-surface sticky top-[64px] z-30">
        <div className="max-w-container-max mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            {['All Content', 'Articles', 'Sermons', 'Devotionals'].map(f => (
              <button 
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-1.5 rounded-full font-label-sm text-label-sm whitespace-nowrap transition-colors ${filter === f ? 'bg-primary-container text-on-primary-container' : 'border border-outline-variant text-secondary hover:border-primary hover:text-primary'}`}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3 self-end md:self-auto">
            <button className="flex items-center gap-1 text-secondary hover:text-primary font-label-sm text-label-sm transition-colors">
              <span className="material-symbols-outlined text-sm">filter_list</span> Filter
            </button>
            <div className="w-px h-4 bg-outline-variant"></div>
            <button className="flex items-center gap-1 text-secondary hover:text-primary font-label-sm text-label-sm transition-colors">
              <span className="material-symbols-outlined text-sm">sort</span> Sort: Newest
            </button>
          </div>
        </div>
      </div>

      {/* Library Content Canvas */}
      <div className="flex-1 px-margin-mobile md:px-gutter py-stack-md bg-background">
        <div className="max-w-container-max mx-auto flex flex-col gap-6">
          {filteredContent.map(article => (
            <Link key={article.id} href={`/article/${article.id}`} className="block">
              <article className="group flex flex-col md:flex-row gap-6 p-4 md:p-6 bg-surface-container-low border border-outline-variant rounded-lg hover:border-outline transition-colors relative">
                <div className="w-full md:w-48 h-48 md:h-auto shrink-0 bg-surface-variant rounded flex items-center justify-center overflow-hidden">
                  <img 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    src={article.coverImage || "https://lh3.googleusercontent.com/aida-public/AB6AXuB7Nt8CdGZL46VLGraW9TAaoRlL-GM6OyMbsaKqiJ-KbmyJT92ctzzeMeGdsyW4lUxoKz600d5GvOSoJvMwnl6Dly6Fbml3UWIGbX6Ui0foJ87y5DXyw1-2PelEiwoIzdHpzhhc9W4wSPnPPCrxJ5aNz5x8fmT-WTHK7Y8EN4xn1jQ5rBbkBgl9ktLeQdPzzAWauBilMnOywyz1zkltvXzKPDkIUScSwod5XikxYyRztOzpaHpSOteh"}
                    alt={article.title}
                  />
                </div>
                <div className="flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-label-sm text-label-sm text-primary uppercase tracking-wider">{article.tags[0] || 'Article'}</span>
                    <span className="text-secondary">·</span>
                    <span className="font-label-sm text-label-sm text-secondary">
                      Published {new Date(article.publishedAt || article.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                  <h2 className="font-headline-md text-headline-md text-on-background mb-3 group-hover:text-primary transition-colors">
                    {article.title}
                  </h2>
                  <p className="font-body-md text-body-md text-on-surface-variant mb-4 line-clamp-2">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center gap-4 mt-auto pt-4 border-t border-outline-variant/50">
                    <div className="flex items-center gap-1 text-secondary">
                      <span className="material-symbols-outlined text-sm">visibility</span>
                      <span className="font-label-sm text-label-sm">{((article.title.length % 10) + 1).toFixed(1)}k</span>
                    </div>
                    <div className="flex items-center gap-1 text-secondary">
                      <span className="material-symbols-outlined text-sm">bookmark</span>
                      <span className="font-label-sm text-label-sm">{(article.title.length * 13) % 500}</span>
                    </div>
                    <div className="ml-auto flex gap-2">
                      <span className="p-2 text-secondary group-hover:text-primary rounded-full group-hover:bg-surface-container-high transition-colors flex items-center gap-1 font-label-sm text-label-sm">
                        Read <span className="material-symbols-outlined text-sm">arrow_forward</span>
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          ))}
          
          {filteredContent.length === 0 && (
            <div className="py-12 text-center text-on-surface-variant font-body-md">
              No content found matching your filters.
            </div>
          )}
        </div>
        
        {filteredContent.length > 0 && (
          <div className="flex justify-center mt-stack-md">
            <button className="px-6 py-2 border border-outline-variant rounded text-primary font-label-sm text-label-sm hover:bg-surface-container-low transition-colors">
              Load More Archive
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
