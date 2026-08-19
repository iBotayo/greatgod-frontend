'use client';

import React from 'react';
import Link from 'next/link';
import { useDb } from '../../../components/provider/db-provider';

export default function HistoryPage() {
  const { db } = useDb();

  // For prototype purposes, just mock some history from db
  const historyArticles = db.articles.slice(1, 4);

  return (
    <main className="flex-grow w-full max-w-[720px] mx-auto px-margin-mobile pt-stack-lg md:pt-[96px] min-h-[calc(100vh-200px)]">
      <div className="mb-stack-md mt-16">
        <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-2">Reading History</h1>
        <p className="font-body-md text-body-md text-on-surface-variant">Your recently accessed texts and articles.</p>
      </div>

      {/* Today Group */}
      <section className="mb-stack-lg">
        <h2 className="font-label-sm text-label-sm text-outline uppercase tracking-widest mb-stack-sm pb-2 border-b border-outline-variant">Today</h2>
        <div className="flex flex-col gap-unit">
          
          {/* History Item 1 */}
          <Link href={`/article/${historyArticles[0]?.id}`} className="block">
            <article className="group flex items-start gap-stack-sm p-stack-sm rounded-lg hover:bg-surface-container-low transition-colors duration-200 cursor-pointer">
              <div className="w-16 h-20 flex-shrink-0 bg-surface-container rounded border border-outline-variant overflow-hidden">
                <img 
                  className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300" 
                  src={historyArticles[0]?.coverImage || "https://lh3.googleusercontent.com/aida-public/AB6AXuCQgRxC4U-CWcTQ7ULT2LP8-ls3GS29f3g4LnnCgQOyWKdcJEND3ji-1skxtEil7ZV0rl2NxI-xIu7gSgBJ4GT0O0ECsdVXPaq9ZwyP0epdjPrlcV5l7D_diUAG2c1tnfdo-D2SxwVooxVIxXXn02k_XvwDstWJXSxWrg1yzLRs8QUGydHVa48KWU_GsSM4oBHFm2EJx6NKCjveFwPxXBtsdjAo-EZTz_icMX8lHBfu-U-SaCXejkSX"}
                  alt={historyArticles[0]?.title}
                />
              </div>
              <div className="flex-grow">
                <div className="flex justify-between items-baseline mb-1">
                  <span className="font-label-sm text-label-sm text-secondary">{historyArticles[0]?.tags[0] || 'Theology'}</span>
                  <span className="font-label-sm text-label-sm text-primary-container">Finished</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface mb-1 group-hover:text-primary transition-colors">
                  {historyArticles[0]?.title}
                </h3>
                <p className="font-label-sm text-label-sm text-on-surface-variant opacity-70">
                  {db.users.find(u => u.id === historyArticles[0]?.authorId)?.name} · {historyArticles[0]?.readTime} min read
                </p>
              </div>
            </article>
          </Link>

          {/* Divider */}
          <div className="h-px w-full bg-outline-variant opacity-50 ml-[88px] max-w-[calc(100%-88px)]"></div>
          
          {/* History Item 2 */}
          <Link href={`/article/${historyArticles[1]?.id}`} className="block">
            <article className="group flex items-start gap-stack-sm p-stack-sm rounded-lg hover:bg-surface-container-low transition-colors duration-200 cursor-pointer">
              <div className="w-16 h-20 flex-shrink-0 bg-surface-container rounded border border-outline-variant overflow-hidden flex items-center justify-center">
                <span className="material-symbols-outlined text-outline-variant text-3xl">article</span>
              </div>
              <div className="flex-grow">
                <div className="flex justify-between items-baseline mb-1">
                  <span className="font-label-sm text-label-sm text-secondary">{historyArticles[1]?.tags[0] || 'Essay'}</span>
                  <span className="font-label-sm text-label-sm text-outline">64% Read</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface mb-1 group-hover:text-primary transition-colors">
                  {historyArticles[1]?.title}
                </h3>
                <p className="font-label-sm text-label-sm text-on-surface-variant opacity-70">
                  {db.users.find(u => u.id === historyArticles[1]?.authorId)?.name} · {historyArticles[1]?.readTime} min read
                </p>
                {/* Progress Bar */}
                <div className="w-full h-1 bg-surface-container-high rounded-full mt-3 overflow-hidden">
                  <div className="h-full bg-outline w-[64%] rounded-full"></div>
                </div>
              </div>
            </article>
          </Link>

        </div>
      </section>

      {/* Yesterday Group */}
      <section className="mb-stack-lg">
        <h2 className="font-label-sm text-label-sm text-outline uppercase tracking-widest mb-stack-sm pb-2 border-b border-outline-variant">Yesterday</h2>
        <div className="flex flex-col gap-unit">
          
          {/* History Item 3 */}
          <Link href={`/article/${historyArticles[2]?.id}`} className="block">
            <article className="group flex items-start gap-stack-sm p-stack-sm rounded-lg hover:bg-surface-container-low transition-colors duration-200 cursor-pointer">
              <div className="w-16 h-20 flex-shrink-0 bg-surface-container rounded border border-outline-variant overflow-hidden">
                <img 
                  className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300" 
                  src={historyArticles[2]?.coverImage || "https://lh3.googleusercontent.com/aida-public/AB6AXuAZ2-Ut4mt9Xd1jb3ofO7Ae2j90emAiZk0rNmo91qD32JrE2HvI1_0Kr10bYIVznBEiKtBl8ULgs2VdJ7BzNpSqX8zjduykCAt1CF2bA9lTFc5MsPmjtDKkvnGvrezhipSj8EUICdONToPIqT0E8hakaYaVMnMrFxLcmynSGVgfLoaTGyJ8bundje9UaaU6Cydigj4oqiPpCknODRSKZDf3wm5uo5qR8zvNEnE__2dvqKhddUJcmlxa"}
                  alt={historyArticles[2]?.title}
                />
              </div>
              <div className="flex-grow">
                <div className="flex justify-between items-baseline mb-1">
                  <span className="font-label-sm text-label-sm text-secondary">{historyArticles[2]?.tags[0] || 'Devotional'}</span>
                  <span className="font-label-sm text-label-sm text-primary-container">Finished</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface mb-1 group-hover:text-primary transition-colors">
                  {historyArticles[2]?.title}
                </h3>
                <p className="font-label-sm text-label-sm text-on-surface-variant opacity-70">
                  {db.users.find(u => u.id === historyArticles[2]?.authorId)?.name} · {historyArticles[2]?.readTime} min read
                </p>
              </div>
            </article>
          </Link>
          
        </div>
      </section>

    </main>
  );
}
