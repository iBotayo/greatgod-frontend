'use client';

import React, { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { useDb } from '../../../../components/provider/db-provider';

export default function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const { db } = useDb();
  const [scrollProgress, setScrollProgress] = useState(0);

  const article = db.articles.find(a => a.id === resolvedParams.slug) || db.articles[0]; // fallback to first for prototype
  const author = db.users.find(u => u.id === article?.authorId);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!article) {
    return <div className="p-stack-lg text-center mt-24">Article not found</div>;
  }

  return (
    <>
      {/* Reading Progress Bar */}
      <div className="fixed top-16 left-0 w-full h-1 bg-surface-container-highest z-40">
        <div 
          className="h-full bg-primary-container w-full" 
          style={{ transformOrigin: '0% 50%', transform: `scaleX(${scrollProgress})`, transition: 'transform 0.1s linear' }}
        />
      </div>

      <div className="w-full max-w-container-max mx-auto px-margin-mobile md:px-gutter pb-stack-lg">
        {/* Article Header */}
        <article className="pt-stack-lg md:pt-24 max-w-[720px] mx-auto">
          <header className="mb-stack-md text-center flex flex-col items-center">
            <div className="flex items-center gap-2 mb-6">
              <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary-container">Article</span>
              <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
              <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary">{article.tags[0] || 'Christian Living'}</span>
            </div>
            
            <h1 className="font-display-lg text-headline-lg-mobile md:text-display-lg text-primary mb-6 text-balance">
              {article.title}
            </h1>
            
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-8 text-balance max-w-2xl italic">
              {article.excerpt}
            </p>
            
            <div className="flex items-center gap-4 text-on-surface-variant border-y border-outline-variant py-4 w-full justify-between">
              <div className="flex items-center gap-3">
                <img 
                  className="w-10 h-10 rounded-full object-cover border border-outline-variant" 
                  src={author?.avatarUrl || "https://lh3.googleusercontent.com/aida-public/AB6AXuDgUVrn5s8RpllfDjgO6IEDOiQNXWzTEXevCQTgW4Tzay_k_lcAcIzVWTkORiGaQU01j-nrphUR6gajsa4kc5whCRocS3A6oOyEJG0bssQkIP32oPsXYDAB3DUD0CuRU3BmT8tQ7H11DLPV5X7Jlq6YaJq0t9z0hrQxCf4Ci9GrM9FifGA_Q7HzDR3HYFG1M5NhQm0jNY2KXngP56mFTADmT3T1OXXFYLoVQIK1hM5ewJfw2xE7bDVO"}
                  alt="Author"
                />
                <div className="flex flex-col items-start">
                  <span className="font-label-sm text-label-sm text-on-surface">{author?.name || 'Unknown'}</span>
                  <span className="font-label-sm text-label-sm text-secondary opacity-70">
                    {new Date(article.publishedAt || article.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-label-sm text-label-sm text-secondary opacity-70 hidden sm:inline-flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">schedule</span>
                  {article.readTime} min read
                </span>
                <div className="flex items-center gap-2">
                  <button aria-label="Bookmark" className="p-2 text-secondary hover:text-primary transition-colors rounded-full hover:bg-surface-container-low">
                    <span className="material-symbols-outlined">bookmark</span>
                  </button>
                  <button aria-label="Share" className="p-2 text-secondary hover:text-primary transition-colors rounded-full hover:bg-surface-container-low">
                    <span className="material-symbols-outlined">share</span>
                  </button>
                </div>
              </div>
            </div>
          </header>

          {/* Hero Image */}
          <figure className="mb-stack-lg rounded-[4px] overflow-hidden bg-surface-container-low border border-outline-variant/50 relative">
            <img 
              className="w-full aspect-[16/9] md:aspect-[21/9] object-cover" 
              src={article.coverImage || "https://lh3.googleusercontent.com/aida-public/AB6AXuAiRd8q9cA9X_4Absniwkn1rGdLxIyvIK_y2Jq92ioGxIn0btg7MkRTH9SWxLpI1vS1kRffWKMuwomghLqFLQOHVkgkks-FWlnnDasjX8cycrn0YUY1mqc4JWn1iyhfeVN2QDoTkwR4q49abMc6TPR-AuOUtfuZbRkwNq4OFg6VIiJh3nTGEl4mCu6SPxEPipvfhUYNH_IRa6okp-D22GNK5L96PvN--j92Agp-JoXImFkFvegFXKWf"}
              alt={article.title}
            />
            <figcaption className="p-3 text-left font-body-md text-[14px] italic text-secondary bg-surface-container-low/80 backdrop-blur-sm border-t border-outline-variant/30">
              Finding stillness in the early hours.
            </figcaption>
          </figure>

          {/* Article Body */}
          <div 
            className="font-body-lg text-body-lg text-on-surface space-y-6 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Flourish Divider */}
          <div className="flex items-center justify-center my-stack-lg gap-4 opacity-50">
            <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-outline"></div>
            <span className="material-symbols-outlined text-outline text-[16px]">eco</span>
            <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-outline"></div>
          </div>

          {/* Author Bio */}
          <div className="bg-surface-container-low p-6 md:p-8 rounded-lg border border-outline-variant flex flex-col sm:flex-row gap-6 items-start sm:items-center">
            <img 
              className="w-20 h-20 rounded-full object-cover border border-outline-variant shrink-0" 
              src={author?.avatarUrl || "https://lh3.googleusercontent.com/aida-public/AB6AXuATQpKoBYxjP4debLywiJKTL5Pg8jjJTAoTs7N9GnNItsKl7R3-kmElmmW2Y_QFC5jRTNUHINw4jURsLzUVvh1RgN-sM2ZRxa393o4ZcE8TmudqPU7C1WdWDsOBIRIJzG_rYhT3f0WNOPg-62cOHPK7-bKPtHWNYyQGaRAUodsa71peAt6g7i0GOdGMP7Ousw4o2Mf0yR_6s-5m5Zk070olRvHV4YVWf_2JvUo1yKIfg-cQJydzVTYx"}
              alt={author?.name}
            />
            <div>
              <h3 className="font-headline-md text-[22px] text-primary mb-2">{author?.name || 'Unknown'}</h3>
              <p className="font-body-md text-on-surface-variant text-[15px] leading-snug">
                {author?.name} is a writer and theologian exploring the intersection of modern life and ancient faith.
              </p>
              <Link href="#" className="mt-3 font-label-sm text-label-sm text-primary-container uppercase tracking-widest hover:underline flex items-center gap-1">
                Read more by {author?.name?.split(' ')[0]} <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </Link>
            </div>
          </div>
        </article>

        {/* Related Content (Bento style) */}
        <section className="mt-stack-lg pt-stack-md border-t border-outline-variant">
          <h2 className="font-display-lg text-headline-lg-mobile md:text-[40px] text-primary mb-8 text-center">More from {article.tags[0]}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {db.articles.filter(a => a.id !== article.id && a.status === 'PUBLISHED').slice(0, 3).map((relatedArticle, idx) => (
              <Link 
                key={relatedArticle.id}
                href={`/article/${relatedArticle.id}`} 
                className={`${idx === 0 ? 'md:col-span-2' : ''} group bg-surface-container-lowest rounded-lg border border-outline-variant overflow-hidden hover:border-outline transition-colors hover:shadow-sm`}
              >
                <div className={`flex ${idx === 0 ? 'flex-col md:flex-row h-full' : 'flex-col'}`}>
                  <div className={`w-full ${idx === 0 ? 'md:w-1/2 aspect-[4/3] md:aspect-auto md:h-full' : 'aspect-[4/3]'} relative overflow-hidden bg-surface-container-low`}>
                    <img 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                      src={relatedArticle.coverImage || "https://lh3.googleusercontent.com/aida-public/AB6AXuCVmVdlZR0hxE9NL-hYF-xdIchHL2sLHB1sxXvbnK0xEz0wS8h2MKXIuTiQaVL2lkYOWcKigYsgoTzM-SZ7GcvRa_KQQ59ljM0ogYSUXwtW4Q5jaBxNdZ8PCa6yzDVOlg4iQAZapB4f9jL0sRVik4o3N6QC8IrFDT7LlR2X-MOZHTU8Cxo5Z4_zm10oB1fi25TQhKq6mV06FMPYvIsy3_2UH4MbFcpYg9_LyXDIWpAfx8hhM_n_QLNv"}
                      alt={relatedArticle.title}
                    />
                  </div>
                  <div className={`${idx === 0 ? 'p-6 md:p-8 flex flex-col justify-center w-full md:w-1/2' : 'p-5 flex flex-col flex-grow'}`}>
                    <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary mb-3">{relatedArticle.tags[0]}</span>
                    <h3 className="font-headline-md text-headline-md text-primary mb-3 group-hover:text-primary-container transition-colors">
                      {relatedArticle.title}
                    </h3>
                    <p className={`font-body-md text-on-surface-variant ${idx === 0 ? 'line-clamp-3 mb-4' : 'line-clamp-2 text-[15px] mb-4'}`}>
                      {relatedArticle.excerpt}
                    </p>
                    <span className="font-label-sm text-label-sm text-secondary opacity-70 mt-auto pt-2">
                      {db.users.find(u => u.id === relatedArticle.authorId)?.name} · {new Date(relatedArticle.publishedAt || relatedArticle.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
