'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useDb } from '../../../components/provider/db-provider';

export default function SearchPage() {
  const { db } = useDb();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('All');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const results = db.articles.filter(article => {
    if (!query) return false;
    const q = query.toLowerCase();
    return article.title.toLowerCase().includes(q) || article.excerpt.toLowerCase().includes(q);
  });

  return (
    <div className="w-full max-w-container-max px-margin-mobile md:px-gutter mx-auto flex-grow flex flex-col gap-stack-lg py-stack-lg min-h-[calc(100vh-200px)]">
      
      {!query ? (
        <>
          <header className="w-full flex flex-col gap-stack-sm items-center text-center mt-12">
            <h1 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-primary">Search GreatGod</h1>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">Search by keyword, author, or Scripture reference.</p>
            <div className="relative w-full max-w-3xl mt-unit">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">search</span>
              <input 
                value={query}
                onChange={handleSearch}
                className="w-full bg-surface-container-lowest border-2 border-outline-variant rounded-xl py-4 pl-12 pr-4 font-body-md text-body-md text-on-surface placeholder:text-outline-variant focus:border-primary-container focus:ring-0 focus:outline-none transition-colors" 
                placeholder="Search articles, scripture, and media..." 
                type="text"
                autoFocus
              />
            </div>
            
            <div className="flex flex-wrap justify-center gap-unit mt-stack-sm">
              <button className="bg-surface-container-low border border-outline-variant rounded-full px-4 py-2 font-label-sm text-label-sm text-on-surface-variant hover:bg-secondary-container transition-colors">Articles</button>
              <button className="bg-surface-container-low border border-outline-variant rounded-full px-4 py-2 font-label-sm text-label-sm text-on-surface-variant hover:bg-secondary-container transition-colors">Audio</button>
              <button className="bg-surface-container-low border border-outline-variant rounded-full px-4 py-2 font-label-sm text-label-sm text-on-surface-variant hover:bg-secondary-container transition-colors">Video</button>
              <button className="bg-surface-container-low border border-outline-variant rounded-full px-4 py-2 font-label-sm text-label-sm text-on-surface-variant hover:bg-secondary-container transition-colors">Scripture</button>
            </div>
          </header>
          
          <div className="w-full h-px bg-outline-variant max-w-3xl mx-auto"></div>
          
          <section className="w-full max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-gutter">
            <div className="flex flex-col gap-stack-sm">
              <h2 className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">Recent Searches</h2>
              <ul className="flex flex-col gap-unit">
                {['Romans 8 commentary', 'Sermon on the Mount', 'Meaning of repentance'].map(term => (
                  <li key={term} className="flex items-center gap-3 py-2 border-b border-outline-variant border-opacity-50 last:border-0 group cursor-pointer" onClick={() => setQuery(term)}>
                    <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors text-sm">history</span>
                    <span className="font-body-md text-body-md text-on-surface group-hover:text-primary transition-colors">{term}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-stack-sm">
              <h2 className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">Trending Topics</h2>
              <div className="flex flex-wrap gap-2">
                {['Grace', 'Faith', 'Biblical Justice', 'Parenting', 'Prayer', 'Psalms', 'Theology'].map(topic => (
                  <span key={topic} onClick={() => setQuery(topic)} className="bg-surface-container rounded-lg px-3 py-1 font-body-md text-sm text-on-surface cursor-pointer hover:bg-secondary-container hover:text-primary transition-colors">
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          </section>
        </>
      ) : (
        <div className="w-full max-w-[720px] mx-auto mt-8">
          <div className="mb-stack-md">
            <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-stack-sm">Search Results</h1>
            <div className="relative w-full">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-secondary text-xl">search</span>
              <input 
                value={query}
                onChange={handleSearch}
                className="w-full bg-surface-container-lowest border border-outline-variant rounded-full py-4 pl-12 pr-4 font-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary-container focus:border-transparent transition-all shadow-sm" 
                placeholder="Search GreatGod..." 
                type="text" 
              />
            </div>
          </div>
          
          <div className="flex overflow-x-auto gap-unit mb-stack-sm py-2">
            {['All', 'Articles', 'Audio', 'Video', 'Scripture'].map(f => (
              <button 
                key={f}
                onClick={() => setFilter(f)}
                className={`whitespace-nowrap px-4 py-2 rounded-full font-label-sm text-label-sm shadow-sm transition-colors ${filter === f ? 'bg-primary-container text-on-primary' : 'border border-outline-variant text-on-surface hover:bg-surface-container-low'}`}
              >
                {f}
              </button>
            ))}
          </div>
          
          <div className="mb-stack-md font-label-sm text-label-sm text-secondary opacity-70">
            {results.length} results for &quot;{query}&quot;
          </div>
          
          <div className="flex flex-col">
            {results.map(article => (
              <article key={article.id} className="py-stack-sm border-b border-outline-variant last:border-0 flex flex-col justify-center group cursor-pointer">
                <Link href={`/article/${article.id}`}>
                  <div className="font-label-sm text-label-sm text-secondary opacity-70 mb-2 flex items-center gap-2">
                    <span>{article.tags?.[0] || 'Article'}</span>
                    <span>·</span>
                    <span>{article.readTime} min read</span>
                  </div>
                  <h3 className="font-headline-md text-headline-md text-on-surface mb-2 group-hover:text-surface-tint transition-colors">{article.title}</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant">by {db.users.find(u => u.id === article.authorId)?.name}</p>
                </Link>
              </article>
            ))}
            {results.length === 0 && (
              <div className="py-stack-lg text-center text-on-surface-variant">
                No results found matching your query.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
