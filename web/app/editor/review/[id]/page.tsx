'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useDb } from '../../../../components/provider/db-provider';

export default function EditorialReviewPage() {
  const { id } = useParams();
  const router = useRouter();
  const { db, setDb } = useDb();
  
  const [rationale, setRationale] = useState('');

  const article = db.articles.find(a => a.id === id);
  const author = db.users.find(u => u.id === article?.authorId);

  if (!article) {
    return (
      <div className="flex flex-col items-center justify-center p-16 h-full">
        <h2 className="font-headline-lg text-primary mb-4">Submission Not Found</h2>
        <Link href="/editor/queue" className="text-secondary underline">Return to Queue</Link>
      </div>
    );
  }

  const handleAction = (actionType: 'reject' | 'changes' | 'approve') => {
    setDb(prev => {
      const newStatus = actionType === 'approve' ? 'APPROVED' 
                      : actionType === 'changes' ? 'CHANGES_REQUESTED' 
                      : 'ARCHIVED';
      
      const updatedArticles = prev.articles.map(a => 
        a.id === id ? { ...a, status: newStatus as typeof a.status } : a
      );

      const notificationMessage = actionType === 'approve' ? `Article Approved: ${article?.title} has been approved.`
                                : actionType === 'changes' ? `Changes Requested: Revisions requested for ${article?.title}.`
                                : `Article Rejected: ${article?.title} has been rejected.`;

      const newNotification = {
        id: `notif_${Date.now()}`,
        userId: article?.authorId || '',
        type: 'system',
        message: notificationMessage,
        read: false,
        createdAt: new Date().toISOString(),
        link: `/author` // Just link to author dashboard for now
      };

      return {
        ...prev,
        articles: updatedArticles,
        notifications: [newNotification, ...prev.notifications]
      };
    });

    alert(`Mock: ${actionType} recorded for article ${id}`);
    router.push('/editor/queue');
  };

  return (
    <>
      {/* Top Navigation specific to Review */}
      <div className="flex items-center gap-4 mb-stack-md border-b border-outline-variant pb-4">
        <Link href="/editor/queue" className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors cursor-pointer group">
          <span className="material-symbols-outlined text-xl group-hover:-translate-x-1 transition-transform">arrow_back</span>
          <span className="font-label-sm text-label-sm uppercase tracking-wider">Back to Review Queue</span>
        </Link>
      </div>

      <div className="flex-grow flex flex-col lg:flex-row w-full gap-gutter">
        
        {/* Left Column: Context & Summary */}
        <aside className="w-full lg:w-[320px] flex flex-col gap-stack-sm flex-shrink-0">
          
          {/* Manuscript Metadata Card */}
          <div className="bg-surface-container-low border border-outline-variant rounded p-6 shadow-sm">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary opacity-80 block mb-2">Manuscript Under Review</span>
            <h2 className="font-headline-md text-headline-md text-primary mb-2">{article.title || 'Untitled'}</h2>
            <div className="flex flex-col gap-1 mt-4 border-t border-outline-variant pt-4">
              <p className="font-body-md text-body-md text-on-surface-variant"><span className="font-bold text-on-background">Author:</span> {author?.name || 'Unknown'}</p>
              <p className="font-body-md text-body-md text-on-surface-variant"><span className="font-bold text-on-background">Submission ID:</span> #{article.id.slice(0, 8)}</p>
              <p className="font-body-md text-body-md text-on-surface-variant"><span className="font-bold text-on-background">Received:</span> {new Date(article.createdAt).toLocaleDateString()}</p>
              <p className="font-body-md text-body-md text-on-surface-variant mt-2 border-t border-outline-variant/30 pt-2"><span className="font-bold text-on-background">Word Count:</span> {article.content.split(/\s+/).length}</p>
            </div>
            
            {/* Quick Preview Button */}
            <div className="mt-6">
              <Link href={`/article/${article.id}`} target="_blank" className="w-full py-2 bg-surface border border-outline-variant text-on-surface text-center rounded block hover:bg-surface-container-high transition-colors font-label-sm text-label-sm uppercase tracking-widest">
                Preview Article
              </Link>
            </div>
          </div>
          
          {/* Consequence Info */}
          <div className="bg-inverse-surface text-inverse-on-surface rounded p-6 shadow-sm mt-stack-sm">
            <h3 className="font-headline-md text-body-lg text-inverse-primary mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>info</span>
              Action Outcomes
            </h3>
            <div className="space-y-4">
              <div>
                <p className="font-label-sm text-label-sm uppercase text-secondary-fixed opacity-70 mb-1 border-b border-on-surface-variant pb-1">Approve</p>
                <p className="font-body-md text-[15px] leading-relaxed text-inverse-on-surface opacity-90">Moves manuscript to &quot;Approved&quot; state, ready for scheduling.</p>
              </div>
              <div>
                <p className="font-label-sm text-label-sm uppercase text-secondary-fixed opacity-70 mb-1 border-b border-on-surface-variant pb-1">Request Changes</p>
                <p className="font-body-md text-[15px] leading-relaxed text-inverse-on-surface opacity-90">Moves manuscript to &quot;Awaiting Author Revision&quot; state. The author will be notified via email.</p>
              </div>
              <div>
                <p className="font-label-sm text-label-sm uppercase text-error-container opacity-70 mb-1 border-b border-on-surface-variant pb-1">Reject Submission</p>
                <p className="font-body-md text-[15px] leading-relaxed text-inverse-on-surface opacity-90">Closes the submission permanently.</p>
              </div>
            </div>
          </div>

        </aside>

        {/* Right Column: Action Form */}
        <div className="w-full flex-grow flex flex-col">
          <div className="bg-surface border border-outline-variant rounded shadow-sm p-6 md:p-10 flex flex-col flex-grow">
            
            <div className="mb-stack-md border-b border-outline-variant pb-6">
              <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary mb-2">Editorial Decision</h1>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">Detail your rationale for requesting revisions or rejecting this manuscript. This feedback is critical for our editorial integrity and the author&apos;s development.</p>
            </div>
            
            <form className="flex flex-col flex-grow gap-stack-md">
              
              {/* Text Area Section */}
              <div className="flex flex-col gap-2">
                <label className="font-label-sm text-label-sm uppercase tracking-wider text-on-background flex items-center justify-between" htmlFor="editorial_reason">
                  <span>Editorial Rationale <span className="text-error">*</span></span>
                  <span className="text-secondary opacity-60 normal-case font-normal text-xs">Required for revisions/rejections</span>
                </label>
                <p className="font-body-md text-[14px] leading-tight text-on-surface-variant mb-2">Provide detailed feedback. If requesting changes, outline exactly what is needed. If rejecting, provide a respectful explanation.</p>
                <div className="relative group flex-grow min-h-[200px]">
                  <textarea 
                    id="editorial_reason" 
                    className="w-full h-full min-h-[200px] bg-surface-container-lowest border border-outline-variant text-on-background font-body-md focus:ring-2 focus:ring-primary-container focus:border-transparent rounded shadow-inner resize-y p-4 transition-shadow outline-none" 
                    placeholder="Begin your editorial notes here..." 
                    value={rationale}
                    onChange={(e) => setRationale(e.target.value)}
                  ></textarea>
                </div>
              </div>
              
              {/* Action Items Categorization */}
              <div className="flex flex-col gap-4 pt-4 border-t border-outline-variant">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-label-sm text-label-sm uppercase tracking-wider text-on-background">Key Action Areas for Author</h3>
                  <span className="font-body-md text-xs text-secondary italic">Select primary areas requiring attention</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="flex items-start gap-3 p-4 border border-outline-variant rounded bg-surface-container-low hover:bg-surface-container-high transition-colors cursor-pointer group">
                    <div className="flex items-center h-5">
                      <input type="checkbox" className="w-4 h-4 text-primary-container bg-surface-container-lowest border-outline-variant rounded focus:ring-primary focus:ring-2" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-label-sm text-label-sm uppercase text-on-background group-hover:text-primary transition-colors">Theological Clarity</span>
                      <span className="font-body-md text-[13px] leading-tight text-on-surface-variant mt-1">Issues with doctrinal precision or clarity of argumentation.</span>
                    </div>
                  </label>
                  
                  <label className="flex items-start gap-3 p-4 border border-outline-variant rounded bg-surface-container-low hover:bg-surface-container-high transition-colors cursor-pointer group">
                    <div className="flex items-center h-5">
                      <input type="checkbox" className="w-4 h-4 text-primary-container bg-surface-container-lowest border-outline-variant rounded focus:ring-primary focus:ring-2" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-label-sm text-label-sm uppercase text-on-background group-hover:text-primary transition-colors">Structural Edit</span>
                      <span className="font-body-md text-[13px] leading-tight text-on-surface-variant mt-1">Significant reorganization of chapters, pacing, or flow required.</span>
                    </div>
                  </label>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="mt-auto pt-stack-md border-t border-outline-variant flex flex-col sm:flex-row justify-end items-center gap-4">
                <button 
                  type="button" 
                  onClick={() => handleAction('reject')}
                  className="w-full sm:w-auto px-6 py-3 font-label-sm text-label-sm uppercase tracking-widest text-error border border-error rounded hover:bg-error-container hover:text-on-error-container transition-colors duration-200 flex items-center justify-center gap-2 group"
                >
                  <span className="material-symbols-outlined text-[18px] group-hover:scale-110 transition-transform">close</span>
                  Reject
                </button>
                <button 
                  type="button" 
                  onClick={() => handleAction('changes')}
                  className="w-full sm:w-auto px-8 py-3 font-label-sm text-label-sm uppercase tracking-widest text-on-surface bg-surface-variant rounded shadow-sm hover:opacity-90 transition-opacity duration-200 flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">edit_note</span>
                  Request Changes
                </button>
                <button 
                  type="button" 
                  onClick={() => handleAction('approve')}
                  className="w-full sm:w-auto px-8 py-3 font-label-sm text-label-sm uppercase tracking-widest text-on-primary bg-primary-container rounded shadow-sm hover:opacity-90 transition-opacity duration-200 flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  Approve Manuscript
                </button>
              </div>
              
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
