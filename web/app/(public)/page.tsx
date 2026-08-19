'use client';

import React from 'react';
import Link from 'next/link';
import { useDb } from '../../components/provider/db-provider';

export default function HomePage() {
  const { db } = useDb();
  
  // Get featured article (e.g., most recently published)
  const publishedArticles = db.articles.filter(a => a.status === 'PUBLISHED');
  const featuredArticle = publishedArticles.length > 0 ? publishedArticles[0] : null;
  const recentArticles = publishedArticles.slice(1, 4);

  return (
    <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter pt-stack-md w-full">
      {/* Hero Section: Featured Article */}
      {featuredArticle && (
        <section className="mb-stack-lg relative overflow-hidden rounded-xl border border-outline-variant/50 bg-surface-container-lowest">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-0 md:gap-gutter items-center">
            <div className="md:col-span-7 h-[400px] md:h-[600px] relative">
              <img 
                className="absolute inset-0 w-full h-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAeztJYJu2wWypMxYxFXLBrGQ4mWhClsfHIITwgD0qFkv9zpoJrYPrSj3n7EJWgtiUPS5dEtVSevEDf3qN39psXeerFO6Yra83g8pR6kDJCTIISwM1L9_X18o283wDyU16Qwd9RXfvF6pIq4KnzSCBfy2K9840vk7t3bEAh64-3MUpjKwUS1qBEtf4Zvnc6zNpy8KxeMs_YDcOhKJG9ADtjM0FZsfffPS2DdGzMTxUNxehHqItUKU73"
                alt="A warm, cinematic photograph of sunlight"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent md:hidden"></div>
            </div>
            <div className="md:col-span-5 p-stack-md md:pr-stack-lg relative z-10 -mt-12 md:mt-0 bg-surface-container-lowest md:bg-transparent mx-margin-mobile md:mx-0 rounded-t-xl md:rounded-none">
              <div className="flex items-center gap-2 mb-unit text-label-sm font-label-sm text-secondary uppercase tracking-widest">
                <span>Featured Essay</span>
                <span className="w-1 h-1 rounded-full bg-outline"></span>
                <span>{featuredArticle.readTime} min read</span>
              </div>
              
              <h1 className="font-display-lg text-headline-lg-mobile md:text-headline-lg text-on-surface leading-tight mb-stack-sm">
                {featuredArticle.title}
              </h1>
              
              <p className="font-body-md text-body-md text-on-surface-variant mb-stack-md line-clamp-3 md:line-clamp-none">
                {featuredArticle.excerpt}
              </p>
              
              <div className="flex items-center gap-3">
                <img 
                  className="w-10 h-10 rounded-full object-cover border border-outline-variant" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA51YS2yNhFt7GPjsRVibYtMFB7UfRkbbUWVq7zp1DPLoXwlA_BfxzrU0ts-Wht8WMVcc4p_vKn85CCrgjnu2Z5Qn75NZJcdx0bByuGr7fs7CcGODXVbmwB2ojkTY8i87lByhLvpfy6JIIyS3oIZgBPVpHL4rEvykkpZUAYeFWPzAOpCQFrn9pApaibC1zYgxp5g6aJx-X4pD6AAHZBRMsxqZ-uXLt4IWbfuOyfyAPyp4Ctk7hCxELd"
                  alt="Author headshot"
                />
                <div>
                  <p className="font-label-sm text-label-sm text-on-surface">
                    {db.users.find(u => u.id === featuredArticle.authorId)?.name || 'Unknown Author'}
                  </p>
                  <p className="font-label-sm text-xs text-secondary">Theologian & Writer</p>
                </div>
              </div>
              
              <Link 
                href={`/article/${featuredArticle.id}`}
                className="inline-flex items-center justify-center mt-stack-md px-6 py-3 bg-primary-container text-on-primary font-label-sm text-label-sm rounded-DEFAULT hover:bg-primary transition-colors"
              >
                Read Full Essay
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Scripture of the Day Callout */}
      <section className="mb-stack-lg max-w-[720px] mx-auto text-center px-stack-md py-stack-md border-y border-outline-variant relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-4 text-outline">
          <span className="material-symbols-outlined text-2xl">book_4</span>
        </div>
        <h2 className="font-label-sm text-label-sm text-secondary uppercase tracking-widest mb-unit">Scripture of the Day</h2>
        <blockquote className="font-headline-md text-headline-md text-on-surface italic mb-stack-sm">
          &quot;But he said to me, &apos;My grace is sufficient for you, for my power is made perfect in weakness.&apos; Therefore I will boast all the more gladly about my weaknesses, so that Christ’s power may rest on me.&quot;
        </blockquote>
        <cite className="font-label-sm text-label-sm text-on-surface-variant not-italic">— 2 Corinthians 12:9</cite>
      </section>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter mb-stack-lg">
        {/* Left Column: Recent Articles */}
        <div className="md:col-span-8 space-y-stack-md">
          <div className="flex items-center justify-between border-b border-outline-variant pb-2 mb-stack-sm">
            <h2 className="font-headline-md text-headline-md text-on-surface">Recent Articles</h2>
            <Link href="/search" className="font-label-sm text-label-sm text-primary underline hover:no-underline">View All</Link>
          </div>
          
          {recentArticles.map((article, idx) => (
            <React.Fragment key={article.id}>
              <article className="flex flex-col sm:flex-row gap-stack-sm items-start group">
                <Link href={`/article/${article.id}`} className="w-full sm:w-1/3 aspect-[4/3] rounded-lg overflow-hidden border border-outline-variant shrink-0 block">
                  <img 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    src={article.coverImage || "https://lh3.googleusercontent.com/aida-public/AB6AXuBHzp-s6u3Ps4kL2mHfeWaC0khvUkHMgBwB0vc61UgeUEg8TfgE2LItIfzdCbCEDlgBMOTVu0gx_O68AJMPUKHAu8ouOWQ59sNfkWpj1o4Y8EbC6AkeIWQDp2WB_z_mZMv278_l44tyofX3wAZCug6TeUlwBlpShxk-Bpu55HvZYqo_235Rru-sTebFpXtOTPV3_8CXvln3CsVxV6L87C__unX8bCFMbiOzYV905MNykk2CRNGOeyjq"}
                    alt={article.title}
                  />
                </Link>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1 text-label-sm font-label-sm text-secondary uppercase tracking-widest">
                    <span>{article.tags?.[0] || 'Theology'}</span>
                  </div>
                  <Link href={`/article/${article.id}`}>
                    <h3 className="font-headline-md text-headline-lg-mobile text-on-surface mb-2 group-hover:text-primary-container transition-colors">
                      {article.title}
                    </h3>
                  </Link>
                  <p className="font-body-md text-body-md text-on-surface-variant mb-2 line-clamp-2">
                    {article.excerpt}
                  </p>
                  <div className="font-label-sm text-xs text-secondary">
                    By {db.users.find(u => u.id === article.authorId)?.name || 'Unknown'} · {new Date(article.publishedAt || article.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} · {article.readTime} min read
                  </div>
                </div>
              </article>
              {idx < recentArticles.length - 1 && <hr className="border-t border-outline-variant/30" />}
            </React.Fragment>
          ))}
        </div>

        {/* Right Column: Sidebar */}
        <div className="md:col-span-4 space-y-stack-md mt-stack-md md:mt-0">
          {/* Daily Devotional Card */}
          <div className="bg-surface-container-low border border-outline-variant rounded-xl p-stack-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <span className="material-symbols-outlined text-6xl">local_fire_department</span>
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <span className="material-symbols-outlined text-primary-container text-sm">calendar_today</span>
                <span className="font-label-sm text-label-sm text-primary-container uppercase tracking-widest">Daily Devotional</span>
              </div>
              <h3 className="font-headline-md text-headline-lg-mobile text-on-surface mb-2">Resting in Sovereignty</h3>
              <p className="font-body-md text-sm text-on-surface-variant mb-4">
                When the storm rages, the truest test of faith is not attempting to calm the sea, but sleeping in the boat alongside the Savior.
              </p>
              <Link 
                href="/devotional/resting-in-sovereignty"
                className="inline-flex items-center justify-center w-full py-2 border border-outline text-on-surface font-label-sm text-label-sm rounded-DEFAULT hover:bg-surface-container-highest transition-colors"
              >
                Read Today&apos;s Entry
              </Link>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="bg-surface-container-highest border border-outline-variant rounded-xl p-stack-sm">
            <h3 className="font-headline-md text-headline-lg-mobile text-on-surface mb-1">The Weekly Sabbath</h3>
            <p className="font-body-md text-sm text-on-surface-variant mb-4">
              A curated digest of essays, liturgy, and art for your weekend reading.
            </p>
            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="sr-only" htmlFor="email">Email address</label>
                <input 
                  type="email" 
                  id="email" 
                  placeholder="Your email address" 
                  className="w-full bg-surface-container-lowest border border-outline text-on-surface font-body-md text-sm rounded-DEFAULT focus:ring-2 focus:ring-primary-container focus:border-primary-container p-2" 
                />
              </div>
              <button 
                type="submit" 
                className="w-full py-2 bg-on-surface text-surface font-label-sm text-label-sm rounded-DEFAULT hover:bg-inverse-surface transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
