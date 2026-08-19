'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '../../components/provider/auth-provider';
import { useDb } from '../../components/provider/db-provider';

export default function AuthorDashboardPage() {
  const { currentUser } = useAuth();
  const { db } = useDb();

  // Mock data for the author
  const activeDrafts = db.articles.filter(a => a.authorId === currentUser?.id && a.status === 'DRAFT');
  const inReview = db.articles.filter(a => a.authorId === currentUser?.id && a.status === 'IN_REVIEW');
  const published = db.articles.filter(a => a.authorId === currentUser?.id && a.status === 'PUBLISHED');

  return (
    <main className="flex-grow pt-16 pb-[100px] px-margin-mobile md:px-0 max-w-container-max mx-auto min-h-[calc(100vh-200px)]">
      {/* Greeting Section */}
      <section className="py-stack-md flex flex-col items-center text-center mt-8">
        <div className="w-24 h-24 rounded-full overflow-hidden mb-stack-sm border border-outline-variant p-1 bg-surface-container-low">
          <img 
            src={currentUser?.avatarUrl || "https://lh3.googleusercontent.com/aida-public/AB6AXuDxrH7T4lbTFVoJN2-14MKLJOrTDzcd35ZkTiLIjSmYxmKj7HFY2X1jJRs18RwTlnFA7zD9Qs_KdF9y94G7zY2BNky68o-Vr-sYhQIkP3WvRg01F7QBgKmjFTxYp9Er1dCODldra2_WiMmRQEtpGrtWogejKef8a63b30XvPZN2nYDrQL1kL4hMMuM0nDA_bGV6_OkFyV-1aiwSvdHDs6YdQVm5CxzLiGUlUqVI7XjTR8K1vlCue5kk"}
          />
        </div>
        <h1 className="font-headline-lg-mobile md:text-headline-lg text-on-surface mb-2">
          Welcome back, {currentUser?.name?.split(' ')[0] || 'Author'}.
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant">Your voice is needed today. What will you write?</p>
      </section>

      {/* Primary Actions */}
      <section className="flex flex-col gap-unit mb-stack-lg max-w-2xl mx-auto">
        <Link href="/author/editor" className="w-full bg-primary-container text-on-primary py-3 rounded font-label-sm tracking-wider uppercase flex items-center justify-center gap-2 hover:bg-primary-container/90 transition-colors">
          <span className="material-symbols-outlined text-[18px]">edit_document</span> Start New Draft
        </Link>
        <Link href="/author/drafts" className="w-full border border-secondary text-secondary py-3 rounded font-label-sm tracking-wider uppercase flex items-center justify-center gap-2 hover:bg-surface-container-low transition-colors">
          <span className="material-symbols-outlined text-[18px]">list_alt</span> View All Drafts
        </Link>
      </section>

      {/* Divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-outline-variant to-transparent mb-stack-lg max-w-3xl mx-auto"></div>

      {/* Active Drafts */}
      <section className="mb-stack-lg max-w-3xl mx-auto">
        <h2 className="font-headline-md text-on-surface mb-stack-sm flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">edit</span>
          Active Drafts
        </h2>
        <div className="flex flex-col gap-stack-sm">
          {activeDrafts.length > 0 ? (
            activeDrafts.map(draft => (
              <Link key={draft.id} href={`/author/editor?id=${draft.id}`} className="block bg-surface-container-low border border-outline-variant p-stack-sm rounded-lg hover:border-primary/30 transition-colors cursor-pointer group">
                <article>
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-label-sm text-secondary uppercase tracking-wider">{draft.tags[0] || 'Draft'}</span>
                    <span className="material-symbols-outlined text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity">arrow_forward</span>
                  </div>
                  <h3 className="font-headline-md text-[22px] leading-[28px] text-on-surface mb-2 group-hover:text-primary transition-colors">
                    {draft.title || 'Untitled Draft'}
                  </h3>
                  <div className="flex items-center gap-2 font-label-sm text-on-surface-variant/70">
                    <span>{draft.content.split(' ').length} words</span>
                    <span>·</span>
                    <span>Last edited recently</span>
                  </div>
                </article>
              </Link>
            ))
          ) : (
            <p className="text-on-surface-variant font-body-md italic text-center py-4 bg-surface-container-lowest border border-outline-variant rounded-lg">No active drafts. Start writing!</p>
          )}
        </div>
      </section>

      {/* In Review */}
      <section className="mb-stack-lg max-w-3xl mx-auto">
        <h2 className="font-headline-md text-on-surface mb-stack-sm flex items-center gap-2">
          <span className="material-symbols-outlined text-tertiary">rate_review</span>
          In Review
        </h2>
        <div className="flex flex-col gap-stack-sm">
          {inReview.length > 0 ? (
            inReview.map(reviewItem => (
              <Link key={reviewItem.id} href={`/author/editor?id=${reviewItem.id}`} className="block bg-surface border border-outline-variant p-stack-sm rounded-lg relative overflow-hidden">
                <article>
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-tertiary-container"></div>
                  <div className="pl-2">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-label-sm text-tertiary-container uppercase tracking-wider flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">pending</span>Pending Review
                      </span>
                    </div>
                    <h3 className="font-headline-md text-[22px] leading-[28px] text-on-surface mb-2">{reviewItem.title}</h3>
                    <p className="font-body-md text-[15px] leading-[24px] text-on-surface-variant mb-2">Submitted to the &apos;{reviewItem.tags[0] || 'General'}&apos; column. Awaiting editorial feedback.</p>
                  </div>
                </article>
              </Link>
            ))
          ) : (
            <p className="text-on-surface-variant font-body-md italic text-center py-4 bg-surface-container-lowest border border-outline-variant rounded-lg">No items currently in review.</p>
          )}
        </div>
      </section>

      {/* Recently Published */}
      <section className="mb-stack-lg max-w-3xl mx-auto">
        <h2 className="font-headline-md text-on-surface mb-stack-sm flex items-center gap-2">
          <span className="material-symbols-outlined text-secondary">history_edu</span>
          Recently Published
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-sm">
          {published.length > 0 ? (
            published.slice(0, 2).map(pubItem => (
              <article key={pubItem.id} className="flex gap-4 items-center bg-surface-container-lowest border border-outline-variant p-2 rounded-lg">
                <div className="w-20 h-20 shrink-0 overflow-hidden rounded-md border border-outline-variant/50 bg-surface-variant">
                  <img 
                    className="w-full h-full object-cover" 
                    src={pubItem.coverImage || "https://lh3.googleusercontent.com/aida-public/AB6AXuCEey4w37NUYVrR-Ip2Z6pzKYZ2mVUv4ug5jTzYpcIqVT3Vsx7NQCbi6SJ9-kiWvEgKpRlxsrVV2_Qm4gy4_imOvzXrzIHEeALIT9nUQWbAsYJGOSxMnNp-ameWh1q5AVxww2FwYmLUmJlhKABX0mKVM3XB4SIQ9TaqEQKGiTZ7-m82fkCQSFgtNbYoWgGbV_qhFeD3TY6Z8ICNpwKAMAZrEN2ZAILkCChcA_nJCRD_BtqeI278ODur"}
                    alt={pubItem.title}
                  />
                </div>
                <div>
                  <h3 className="font-headline-md text-[18px] leading-[24px] text-on-surface mb-1 line-clamp-2">{pubItem.title}</h3>
                  <div className="font-label-sm text-on-surface-variant/70">
                    Published {new Date(pubItem.publishedAt || pubItem.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </article>
            ))
          ) : (
            <p className="text-on-surface-variant font-body-md italic text-center py-4 col-span-2">You haven&apos;t published any articles yet.</p>
          )}
        </div>
      </section>
    </main>
  );
}
