'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '../../components/provider/auth-provider';
import { useDb } from '../../components/provider/db-provider';

export default function EditorDashboardPage() {
  const { currentUser } = useAuth();
  const { db } = useDb();

  const awaitingReview = db.articles.filter(a => a.status === 'IN_REVIEW');
  const changesRequested = db.articles.filter(a => a.status === 'CHANGES_REQUESTED');
  const approved = db.articles.filter(a => a.status === 'APPROVED');
  const scheduled = db.articles.filter(a => a.status === 'SCHEDULED');

  return (
    <>
      <header className="mb-stack-lg border-b border-outline-variant pb-stack-sm flex justify-between items-end">
        <div>
          <h1 className="text-headline-lg-mobile md:text-headline-lg font-headline-lg-mobile md:font-headline-lg text-primary mb-2">
            Good morning, {currentUser?.name?.split(' ')[0] || 'Editor'}.
          </h1>
          <p className="text-body-md font-body-md text-secondary">Here is the current state of the editorial queue.</p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter w-full">
        
        {/* Left Column (Main Focus) */}
        <div className="lg:col-span-8 flex flex-col gap-stack-md">
          
          {/* Critical Alerts */}
          <section>
            <h2 className="text-label-sm font-label-sm text-secondary uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-error text-[16px]">warning</span> Critical Attention Required
            </h2>
            <div className="flex flex-col gap-unit">
              <div className="bg-error-container text-on-error-container border border-[#e8b5b1] p-4 flex justify-between items-center rounded">
                <div>
                  <span className="text-label-sm font-label-sm font-bold block mb-1">Overdue Reviews (2)</span>
                  <span className="text-body-md font-body-md text-sm">Manuscripts pending review for {'>'} 7 days.</span>
                </div>
                <button className="px-4 py-2 bg-on-error-container text-error-container text-label-sm font-label-sm rounded hover:opacity-90 transition-opacity">Review Now</button>
              </div>
            </div>
          </section>

          {/* Status Summary Bento Grid */}
          <section className="mt-stack-sm">
            <h2 className="text-headline-md font-headline-md text-primary mb-6">Pipeline Summary</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="/editor/queue" className="bg-surface-container-low border border-outline-variant p-6 flex flex-col items-start hover:bg-surface-container transition-colors cursor-pointer group rounded">
                <span className="material-symbols-outlined text-tertiary mb-4">pending_actions</span>
                <span className="text-display-lg font-display-lg text-on-surface mb-2 leading-none">{awaitingReview.length}</span>
                <span className="text-label-sm font-label-sm text-secondary group-hover:text-primary transition-colors">Awaiting Review</span>
              </Link>
              <div className="bg-surface-container-low border border-outline-variant p-6 flex flex-col items-start hover:bg-surface-container transition-colors cursor-pointer group rounded">
                <span className="material-symbols-outlined text-outline mb-4">edit_note</span>
                <span className="text-display-lg font-display-lg text-on-surface mb-2 leading-none">{changesRequested.length}</span>
                <span className="text-label-sm font-label-sm text-secondary group-hover:text-primary transition-colors">Changes Req.</span>
              </div>
              <div className="bg-surface-container-low border border-outline-variant p-6 flex flex-col items-start hover:bg-surface-container transition-colors cursor-pointer group rounded">
                <span className="material-symbols-outlined text-[#4a7c59] mb-4">task_alt</span>
                <span className="text-display-lg font-display-lg text-on-surface mb-2 leading-none">{approved.length}</span>
                <span className="text-label-sm font-label-sm text-secondary group-hover:text-primary transition-colors">Approved</span>
              </div>
              <div className="bg-surface-container-low border border-outline-variant p-6 flex flex-col items-start hover:bg-surface-container transition-colors cursor-pointer group rounded">
                <span className="material-symbols-outlined text-[#3b719f] mb-4">event_available</span>
                <span className="text-display-lg font-display-lg text-on-surface mb-2 leading-none">{scheduled.length}</span>
                <span className="text-label-sm font-label-sm text-secondary group-hover:text-primary transition-colors">Scheduled</span>
              </div>
            </div>
          </section>

          {/* Active Queue with SLA Indicators */}
          <section className="mt-stack-sm border-t border-outline-variant pt-stack-md">
            <div className="flex justify-between items-end mb-6">
              <h2 className="text-headline-md font-headline-md text-primary">Active Queue</h2>
              <Link className="text-label-sm font-label-sm text-primary underline hover:no-underline" href="/editor/queue">View All</Link>
            </div>
            <div className="flex flex-col gap-4">
              {awaitingReview.length > 0 ? awaitingReview.slice(0, 3).map(article => (
                <div key={article.id} className="bg-surface-container-lowest border border-outline-variant p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 rounded">
                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 rounded-full bg-tertiary mt-2 flex-shrink-0" title="Awaiting Review"></div>
                    <div>
                      <h3 className="text-body-lg font-body-lg font-medium text-on-surface mb-1">{article.title}</h3>
                      <div className="text-label-sm font-label-sm text-secondary flex items-center gap-2">
                        <span>{db.users.find(u => u.id === article.authorId)?.name}</span>
                        <span>·</span>
                        <span>{article.tags[0] || 'General'}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 border border-outline text-secondary text-label-sm font-label-sm rounded hover:bg-surface-container transition-colors">Assign</button>
                    <Link href={`/editor/review/${article.id}`} className="px-3 py-1 bg-primary-container text-on-primary text-label-sm font-label-sm rounded hover:opacity-90 transition-opacity inline-block">Review</Link>
                  </div>
                </div>
              )) : (
                <p className="text-on-surface-variant italic font-body-md">No items currently in the active queue.</p>
              )}
            </div>
          </section>

        </div>

        {/* Right Column (Sidebar) */}
        <div className="lg:col-span-4 flex flex-col gap-stack-md mt-stack-md lg:mt-0">
          
          {/* Quick Actions */}
          <section className="bg-surface-container-low border border-outline-variant p-6 rounded">
            <h3 className="text-label-sm font-label-sm text-secondary uppercase tracking-widest mb-6 border-b border-outline-variant pb-2">Quick Actions</h3>
            <div className="flex flex-col gap-3">
              <Link className="flex items-center justify-between p-3 border border-outline-variant rounded hover:bg-surface-container transition-colors group bg-surface-container-lowest" href="/editor/queue">
                <span className="text-body-md font-body-md text-on-surface group-hover:text-primary">Jump to Review Queue</span>
                <span className="material-symbols-outlined text-secondary group-hover:text-primary transition-transform group-hover:translate-x-1">arrow_forward</span>
              </Link>
            </div>
          </section>

          {/* Recent Activity Feed */}
          <section className="bg-surface-container-low border border-outline-variant p-6 flex-1 rounded">
            <h3 className="text-label-sm font-label-sm text-secondary uppercase tracking-widest mb-6 border-b border-outline-variant pb-2">Recent Activity</h3>
            <div className="flex flex-col gap-6">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-surface-variant flex items-center justify-center border border-outline-variant flex-shrink-0">
                  <span className="material-symbols-outlined text-secondary text-[16px]">auto_awesome</span>
                </div>
                <div>
                  <p className="text-body-md font-body-md text-sm leading-snug">System automatically scheduled 4 approved articles for this week&apos;s issue.</p>
                  <span className="text-label-sm font-label-sm text-secondary mt-1 block">5 hours ago</span>
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>
    </>
  );
}
