'use client';

import React, { use, useState } from 'react';
import Link from 'next/link';
import { useDb } from '../../../../components/provider/db-provider';

export default function SermonPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const { db } = useDb();
  const [isPlaying, setIsPlaying] = useState(false);

  // For the prototype, we can use an article but treat it as a sermon
  const article = db.articles.find(a => a.id === resolvedParams.slug) || db.articles[0];
  const author = db.users.find(u => u.id === article?.authorId);

  if (!article) {
    return <div className="p-stack-lg text-center mt-24">Sermon not found</div>;
  }

  return (
    <main className="max-w-[800px] mx-auto px-margin-mobile md:px-0 py-stack-lg flex flex-col space-y-stack-lg mt-8 min-h-[calc(100vh-200px)]">
      {/* Header Section */}
      <section className="text-center space-y-stack-sm pt-8">
        <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">
          Sermon Transcript · {new Date(article.publishedAt || article.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>
        <h1 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-on-surface">
          {article.title}
        </h1>
        <p className="font-body-md text-body-md text-secondary italic">
          Delivered by {author?.name || 'Unknown'} at Grace Fellowship
        </p>
      </section>

      {/* Embedded Player */}
      <div className="w-full bg-surface-container-low rounded-2xl p-6 md:p-8 border border-outline-variant shadow-sm relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            aria-label="Play/Pause" 
            className="w-16 h-16 bg-primary text-on-primary rounded-full flex items-center justify-center shadow-md hover:bg-primary-fixed-variant transition-all active:scale-95 shrink-0"
          >
            <span className="material-symbols-outlined text-4xl">
              {isPlaying ? 'pause' : 'play_arrow'}
            </span>
          </button>
          
          <div className="flex-1 w-full">
            <h3 className="font-label-lg text-label-lg text-on-surface mb-2">Listen to Audio Sermon</h3>
            <div className="w-full h-1 bg-surface-variant rounded-full relative cursor-pointer group mt-4">
              <div className={`absolute top-0 left-0 h-full bg-primary rounded-full transition-all duration-1000 ${isPlaying ? 'w-1/3' : 'w-0'}`}></div>
              <div className={`absolute top-1/2 -translate-y-1/2 ${isPlaying ? 'left-1/3' : 'left-0'} w-3 h-3 bg-primary rounded-full shadow-md scale-0 group-hover:scale-100 transition-all duration-300 -ml-1.5`}></div>
            </div>
            <div className="flex justify-between font-label-sm text-[10px] text-secondary mt-2">
              <span>{isPlaying ? '12:45' : '00:00'}</span>
              <span>45:20</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sermon Content */}
      <article 
        className="font-body-md text-body-md text-on-surface space-y-6 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />

      {/* Action Bar */}
      <section className="flex flex-col sm:flex-row items-center justify-center gap-4 py-8 border-t border-b border-outline-variant">
        <button className="flex items-center gap-2 px-6 py-3 border border-outline rounded-full hover:bg-surface-container-low transition-colors w-full sm:w-auto justify-center group">
          <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors">bookmark</span>
          <span className="font-label-lg text-label-lg text-on-surface">Bookmark</span>
        </button>
      </section>
    </main>
  );
}
