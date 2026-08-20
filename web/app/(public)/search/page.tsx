'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useDb } from '../../../components/provider/db-provider';
import { performGlobalSearch } from '../../../lib/search';

function SearchResults() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { db } = useDb();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    const trimmedQuery = query.trim();
    router.push(trimmedQuery ? `/search?q=${encodeURIComponent(trimmedQuery)}` : '/search');
  };

  const clearSearch = () => {
    setQuery('');
    router.push('/search');
  };

  const normalizedQuery = initialQuery.toLowerCase().trim();
  const searchResults = performGlobalSearch(db, normalizedQuery);
  const articles = searchResults.filter(r => r.type === 'article');
  const taxonomy = searchResults.filter(r => r.type === 'taxonomy');
  const isSearching = normalizedQuery.length > 0;
  const hasResults = searchResults.length > 0;

  return (
    <div className="flex-grow w-full max-w-[800px] mx-auto px-[20px] py-[48px] flex flex-col gap-[32px]">
      <div className="border-b border-outline-variant pb-[24px]">
        <h1 className="font-headline-lg text-primary mb-6">Search</h1>
        <form onSubmit={handleSearch} className="relative">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-[24px]">search</span>
          <input
            type="text"
            value={query}
            onChange={event => setQuery(event.target.value)}
            placeholder="Search articles, devotionals, categories..."
            className="w-full pl-12 pr-12 py-4 bg-surface-bright border border-stone-outline rounded-lg font-body-lg text-on-surface focus:ring-primary focus:border-primary shadow-sm"
          />
          {query && (
            <button type="button" onClick={clearSearch} className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface p-1 rounded-full transition-colors flex items-center justify-center" aria-label="Clear search">
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
          <h3 className="font-headline-sm text-primary">No results found for &quot;{initialQuery}&quot;</h3>
          <p className="font-body-md max-w-md">Try checking your spelling or using more general keywords.</p>
        </div>
      )}

      {isSearching && hasResults && (
        <div className="flex flex-col gap-8">
          <p className="font-label-sm uppercase tracking-wider text-outline">Showing results for <span className="text-on-surface font-bold">&quot;{initialQuery}&quot;</span></p>
          {taxonomy.length > 0 && (
            <div className="flex flex-col gap-4">
              <h2 className="font-headline-md text-primary">Topics &amp; Tags</h2>
              <div className="flex flex-wrap gap-2">
                {taxonomy.map(item => (
                  <div key={item.id} className="bg-surface-container-low border border-outline-variant px-4 py-2 rounded-full font-label-md text-on-surface flex items-center gap-2 hover:bg-surface-container transition-colors cursor-pointer" onClick={() => router.push(item.url)}>
                    <span className="material-symbols-outlined text-[18px] text-primary">{item.tags?.[0] === 'category' ? 'category' : 'tag'}</span>
                    {item.title}
                  </div>
                ))}
              </div>
            </div>
          )}
          {articles.length > 0 && (
            <div className="flex flex-col gap-4">
              <h2 className="font-headline-md text-primary">Content</h2>
              <div className="flex flex-col gap-4">
                {articles.map(article => {
                  const dbArticle = db.articles.find(a => a.id === article.id);
                  return (
                  <Link href={`/article/${article.id}`} key={article.id} className="group">
                    <div className="bg-surface-paper border border-outline-variant p-4 md:p-6 rounded-xl hover:shadow-md transition-shadow flex flex-col md:flex-row gap-4">
                      {dbArticle?.coverImage ? (
                        <div className="w-full md:w-[200px] h-[140px] flex-shrink-0 bg-surface-variant rounded-lg overflow-hidden">
                          <img src={dbArticle.coverImage} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        </div>
                      ) : (
                        <div className="w-full md:w-[200px] h-[140px] flex-shrink-0 bg-surface-container-low rounded-lg overflow-hidden flex items-center justify-center">
                          <span className="material-symbols-outlined text-[48px] text-outline opacity-50">menu_book</span>
                        </div>
                      )}
                      <div className="flex flex-col gap-2 flex-grow">
                        <div className="flex items-center gap-2"><span className="bg-surface-bright border border-stone-outline px-2 py-1 rounded text-xs font-label-sm uppercase text-on-surface">Article</span><span className="text-xs text-outline">{new Date(dbArticle?.createdAt || '').toLocaleDateString()}</span></div>
                        <h3 className="font-headline-sm text-primary group-hover:text-primary-fixed-variant transition-colors">{article.title}</h3>
                        <p className="font-body-md text-on-surface-variant line-clamp-2">{article.excerpt}</p>
                        {(article.tags && article.tags.length > 0) && <div className="flex items-center gap-2 mt-auto pt-2">{article.tags.map(tag => <span key={tag} className="text-xs text-primary bg-primary-container/20 px-2 py-1 rounded-sm">{tag}</span>)}</div>}
                      </div>
                    </div>
                  </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return <Suspense fallback={<div className="flex justify-center p-12"><span className="w-8 h-8 border-4 border-outline-variant border-t-primary rounded-full animate-spin"></span></div>}><SearchPageContent /></Suspense>;
}

function SearchPageContent() {
  const searchParams = useSearchParams();
  return <SearchResults key={searchParams.toString()} />;
}
