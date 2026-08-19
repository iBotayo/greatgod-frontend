'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useDb } from '../../components/provider/db-provider';

function SearchResults() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { db } = useDb();
  
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  
  // Sync URL query changes to local state
  useEffect(() => {
    setQuery(searchParams.get('q') || '');
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    } else {
      router.push('/search');
    }
  };

  const clearSearch = () => {
    setQuery('');
    router.push('/search');
  };

  const getResults = () => {
    const q = initialQuery.toLowerCase().trim();
    if (!q) return { articles: [], taxonomy: [] };

    const articles = db.articles.filter(article => {
      return (
        article.title.toLowerCase().includes(q) ||
        article.excerpt.toLowerCase().includes(q) ||
        article.tags.some(t => t.toLowerCase().includes(q))
      );
    });

    const taxonomy = db.taxonomy.filter(tax => {
      return tax.name.toLowerCase().includes(q);
    });

    return { articles, taxonomy };
  };

  const results = getResults();
  const hasResults = results.articles.length > 0 || results.taxonomy.length > 0;
  const isSearching = initialQuery.trim().length > 0;

  return (
    <div className="flex-grow w-full max-w-[800px] mx-auto px-[20px] py-[48px] flex flex-col gap-[32px]">
      <div className="border-b border-outline-variant pb-[24px]">
        <h1 className="font-headline-lg text-primary mb-6">Search</h1>
        
        <form onSubmit={handleSearch} className="relative">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-[24px]">search</span>
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles, devotionals, categories..."
            className="w-full pl-12 pr-12 py-4 bg-surface-bright border border-stone-outline rounded-lg font-body-lg text-on-surface focus:ring-primary focus:border-primary shadow-sm"
          />
          {query && (
            <button 
              type="button" 
              onClick={clearSearch}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface p-1 rounded-full transition-colors flex items-center justify-center"
              aria-label="Clear search"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          )}
        </form>
      </div>

      {!isSearching && (
        <div className="py-[64px] text-center flex flex-col items-center gap-[16px] text-on-surface-variant">
          <span className="material-symbols-outlined text-[48px] text-outline opacity-50">travel_explore</span>
          <h3 className="font-headline-sm">What are you looking for?</h3>
          <p className="font-body-md max-w-md">Search our extensive library of articles, devotionals, podcasts, and sermons.</p>
        </div>
      )}

      {isSearching && !hasResults && (
        <div className="py-[64px] text-center flex flex-col items-center gap-[16px] text-on-surface-variant">
          <span className="material-symbols-outlined text-[48px] text-outline opacity-50">search_off</span>
          <h3 className="font-headline-sm text-primary">No results found for "{initialQuery}"</h3>
          <p className="font-body-md max-w-md">Try checking your spelling or using more general keywords.</p>
        </div>
      )}

      {isSearching && hasResults && (
        <div className="flex flex-col gap-8">
          <p className="font-label-sm uppercase tracking-wider text-outline">
            Showing results for <span className="text-on-surface font-bold">"{initialQuery}"</span>
          </p>

          {results.taxonomy.length > 0 && (
            <div className="flex flex-col gap-4">
              <h2 className="font-headline-md text-primary">Topics & Tags</h2>
              <div className="flex flex-wrap gap-2">
                {results.taxonomy.map(tax => (
                  <div key={tax.id} className="bg-surface-container-low border border-outline-variant px-4 py-2 rounded-full font-label-md text-on-surface flex items-center gap-2 hover:bg-surface-container transition-colors cursor-pointer">
                    <span className="material-symbols-outlined text-[18px] text-primary">{tax.type === 'category' ? 'category' : 'tag'}</span>
                    {tax.name}
                  </div>
                ))}
              </div>
            </div>
          )}

          {results.articles.length > 0 && (
            <div className="flex flex-col gap-4">
              <h2 className="font-headline-md text-primary">Content</h2>
              <div className="flex flex-col gap-4">
                {results.articles.map(article => (
                  <Link href={`/reader/article/${article.id}`} key={article.id} className="group">
                    <div className="bg-surface-paper border border-outline-variant p-4 md:p-6 rounded-xl hover:shadow-md transition-shadow flex flex-col md:flex-row gap-4">
                      {article.coverImage ? (
                        <div className="w-full md:w-[200px] h-[140px] flex-shrink-0 bg-surface-variant rounded-lg overflow-hidden">
                          <img src={article.coverImage} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        </div>
                      ) : (
                        <div className="w-full md:w-[200px] h-[140px] flex-shrink-0 bg-surface-container-low rounded-lg overflow-hidden flex items-center justify-center">
                          <span className="material-symbols-outlined text-[48px] text-outline opacity-50">menu_book</span>
                        </div>
                      )}
                      <div className="flex flex-col gap-2 flex-grow">
                        <div className="flex items-center gap-2">
                          <span className="bg-surface-bright border border-stone-outline px-2 py-1 rounded text-xs font-label-sm uppercase text-on-surface">Article</span>
                          <span className="text-xs text-outline">{new Date(article.createdAt).toLocaleDateString()}</span>
                        </div>
                        <h3 className="font-headline-sm text-primary group-hover:text-primary-fixed-variant transition-colors">{article.title}</h3>
                        <p className="font-body-md text-on-surface-variant line-clamp-2">{article.excerpt}</p>
                        {article.tags.length > 0 && (
                          <div className="flex items-center gap-2 mt-auto pt-2">
                            {article.tags.map(t => (
                              <span key={t} className="text-xs text-primary bg-primary-container/20 px-2 py-1 rounded-sm">{t}</span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="flex justify-center p-12"><span className="w-8 h-8 border-4 border-outline-variant border-t-primary rounded-full animate-spin"></span></div>}>
      <SearchResults />
    </Suspense>
  );
}
