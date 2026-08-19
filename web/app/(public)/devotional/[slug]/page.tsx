'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { useDb } from '../../../../components/provider/db-provider';

export default function DevotionalPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const { db } = useDb();

  // For the prototype, we can use an article but treat it as a devotional
  const article = db.articles.find(a => a.id === resolvedParams.slug) || db.articles[0];
  const author = db.users.find(u => u.id === article?.authorId);

  if (!article) {
    return <div className="p-stack-lg text-center mt-24">Devotional not found</div>;
  }

  return (
    <main className="max-w-[800px] mx-auto px-margin-mobile md:px-0 py-stack-lg flex flex-col space-y-stack-lg mt-8 min-h-[calc(100vh-200px)]">
      {/* Header Section */}
      <section className="text-center space-y-stack-sm pt-8">
        <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">
          Daily Devotional · {new Date(article.publishedAt || article.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
        </p>
        <h1 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-on-surface">
          {article.title}
        </h1>
        <p className="font-body-md text-body-md text-secondary italic">
          {article.excerpt}
        </p>
      </section>

      {/* Primary Scripture Callout */}
      <section className="bg-surface-container-low border border-outline p-stack-md rounded-lg text-center relative shadow-sm">
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-surface-container-low px-4 border border-outline rounded-full flex items-center justify-center">
          <span className="material-symbols-outlined text-primary text-sm py-1">auto_stories</span>
        </div>
        <h2 className="font-label-lg text-label-lg text-primary mb-4">Scripture Passage</h2>
        <blockquote className="font-body-lg text-body-lg text-on-surface max-w-2xl mx-auto italic">
          &quot;Whoever can be trusted with very little can also be trusted with much, and whoever is dishonest with very little will also be dishonest with much.&quot;
        </blockquote>
      </section>

      {/* Devotional Content */}
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
        <button className="flex items-center gap-2 px-6 py-3 bg-primary text-on-primary rounded-full hover:bg-primary-container transition-colors w-full sm:w-auto justify-center group shadow-sm">
          <span className="material-symbols-outlined text-on-primary group-hover:scale-110 transition-transform">check_circle</span>
          <span className="font-label-lg text-label-lg text-on-primary">Mark as Read</span>
        </button>
      </section>

      {/* Author Bio */}
      <section className="flex flex-col md:flex-row items-center md:items-start gap-6 bg-surface-container-lowest p-stack-sm rounded-lg border border-outline-variant">
        <div className="w-20 h-20 rounded-full overflow-hidden shrink-0 border border-outline">
          <img 
            className="w-full h-full object-cover" 
            src={author?.avatarUrl || "https://lh3.googleusercontent.com/aida-public/AB6AXuDyMpccX-VVUH-eywZ6gwcF8mgRWYlAh5wP4LETVSYjxIKKxTEBgS8BTujn-GRLV-0PZ4lM03USf6e72JiziV8a_OSTXvePXsdwALMTz4jghOhh9vDsUjZz22BtDWvM0-bIQ4O1rkSqGygtXs_xsZruItgD0YFd1rvfkGPtnL5EWjLhi0cl3-eMADwdMUI-V6HxTCheIRNkTN6yAjZKgyo6_npjq5rjoHHM9V2khHgAvS1vkGaVh8nu"}
            alt={author?.name}
          />
        </div>
        <div className="text-center md:text-left space-y-2">
          <h3 className="font-label-lg text-label-lg text-on-surface">{author?.name || 'Unknown Author'}</h3>
          <p className="font-label-sm text-label-sm text-secondary">Director of Theological Stewardship</p>
          <p className="font-body-md text-body-md text-on-surface-variant text-sm">
            {author?.name} has spent over two decades writing on the intersection of faith, daily work, and financial stewardship.
          </p>
        </div>
      </section>
    </main>
  );
}
