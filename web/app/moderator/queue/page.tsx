'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useDb } from '../../../components/provider/db-provider';
import { useAuth } from '../../../components/provider/auth-provider';

export default function ModerationQueuePage() {
  const { db, setDb } = useDb();
  const { currentUser } = useAuth();
  const [filter, setFilter] = useState<'PENDING' | 'RESOLVED'>('PENDING');

  const pendingComments = db.comments.filter(c => c.status === 'PENDING' || c.status === 'REPORTED');
  const resolvedComments = db.comments.filter(c => c.status === 'APPROVED' || c.status === 'REJECTED');

  const displayedComments = filter === 'PENDING' ? pendingComments : resolvedComments;

  const handleAction = (commentId: string, action: 'APPROVE' | 'REJECT' | 'HIDE') => {
    setDb(prev => {
      const newStatus = action === 'APPROVE' ? 'APPROVED' : 'REJECTED';
      
      const newAuditLog = {
        id: `audit_${Date.now()}`,
        actorId: currentUser?.id || 'system',
        action: `COMMENT_${action}D`,
        targetType: 'COMMENT',
        targetId: commentId,
        timestamp: new Date().toISOString(),
        description: `Moderator ${currentUser?.name} ${action.toLowerCase()}d a comment.`
      };

      return {
        ...prev,
        comments: prev.comments.map(c => c.id === commentId ? { ...c, status: newStatus } : c),
        auditLogs: [newAuditLog, ...prev.auditLogs]
      };
    });
  };

  return (
    <div className="flex-grow w-full max-w-container-max mx-auto py-4 px-margin-mobile md:px-0">
      {/* Page Header */}
      <div className="mb-stack-md flex flex-col md:flex-row md:items-end justify-between gap-4 mt-8">
        <div>
          <h1 className="text-headline-lg-mobile md:text-headline-lg font-headline-lg-mobile md:font-headline-lg text-on-background mb-2">Moderation Queue</h1>
          <p className="text-body-md font-body-md text-secondary">Review flagged reflections and maintain editorial standards.</p>
        </div>
        
        {/* Mobile Search (Visible only on mobile) */}
        <div className="md:hidden flex items-center bg-surface-container-low rounded px-3 py-2 border border-outline-variant w-full focus-within:ring-2 focus-within:ring-primary-container transition-all">
          <span className="material-symbols-outlined text-secondary text-[20px] mr-2">search</span>
          <input className="bg-transparent border-none focus:outline-none text-label-sm font-label-sm w-full placeholder:text-secondary/70 text-on-surface" placeholder="Search..." type="text" />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-6 border-b border-outline-variant mb-stack-md overflow-x-auto scrollbar-hide">
        <button 
          onClick={() => setFilter('PENDING')}
          className={`${filter === 'PENDING' ? 'text-primary border-b-2 border-primary font-bold' : 'text-secondary hover:text-primary transition-colors'} pb-2 text-label-sm font-label-sm whitespace-nowrap`}
        >
          Pending ({pendingComments.length})
        </button>
        <button 
          onClick={() => setFilter('RESOLVED')}
          className={`${filter === 'RESOLVED' ? 'text-primary border-b-2 border-primary font-bold' : 'text-secondary hover:text-primary transition-colors'} pb-2 text-label-sm font-label-sm whitespace-nowrap`}
        >
          Resolved ({resolvedComments.length})
        </button>
      </div>

      {/* Queue List */}
      <div className="flex flex-col gap-4">
        {displayedComments.length > 0 ? displayedComments.map(comment => {
          const author = db.users.find(u => u.id === comment.userId);
          const article = db.articles.find(a => a.id === comment.articleId);
          return (
            <article key={comment.id} className="bg-surface-container-low border border-outline-variant rounded-lg p-6 flex flex-col md:flex-row gap-6 hover:bg-surface-container transition-colors duration-200">
              <div className="flex-grow flex flex-col gap-2">
                <div className="flex items-center gap-2 mb-1">
                  {comment.status === 'REPORTED' ? (
                    <span className="bg-error-container text-on-error-container px-2 py-0.5 rounded text-[11px] font-label-sm uppercase tracking-wider flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">warning</span>
                      Reported
                    </span>
                  ) : comment.status === 'PENDING' ? (
                    <span className="bg-tertiary-container text-on-tertiary-container px-2 py-0.5 rounded text-[11px] font-label-sm uppercase tracking-wider flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">forum</span>
                      Pending Review
                    </span>
                  ) : (
                    <span className={`px-2 py-0.5 rounded text-[11px] font-label-sm uppercase tracking-wider flex items-center gap-1 ${comment.status === 'APPROVED' ? 'bg-[#4a7c59]/20 text-[#4a7c59]' : 'bg-error-container text-on-error-container'}`}>
                      <span className="material-symbols-outlined text-[14px]">{comment.status === 'APPROVED' ? 'check_circle' : 'block'}</span>
                      {comment.status}
                    </span>
                  )}
                  <span className="text-label-sm font-label-sm text-secondary opacity-70">· {new Date(comment.createdAt).toLocaleString()}</span>
                </div>
                
                <h3 className="text-headline-md font-headline-md text-on-background">
                  Comment on &apos;{article?.title || 'Unknown Article'}&apos;
                </h3>
                <div className="text-body-md font-body-md text-on-surface-variant my-2 border-l-2 border-outline-variant pl-4 italic">
                  &quot;{comment.content}&quot;
                </div>
                
                <div className="flex items-center gap-3 mt-auto pt-2">
                  <div className="w-6 h-6 rounded-full bg-surface-variant flex items-center justify-center border border-outline-variant overflow-hidden">
                    {author?.avatarUrl ? (
                      <img src={author.avatarUrl} alt={author.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-[10px] font-bold">{author?.name.charAt(0) || 'U'}</span>
                    )}
                  </div>
                  <span className="text-label-sm font-label-sm text-secondary">By {author?.name || 'Unknown'}</span>
                </div>
              </div>
              
              <div className="flex flex-row md:flex-col justify-end md:justify-start gap-3 border-t md:border-t-0 md:border-l border-outline-variant pt-4 md:pt-0 md:pl-6 shrink-0">
                <Link href={`/article/${article?.id}`} className="bg-primary-container text-on-primary text-label-sm font-label-sm px-4 py-2 rounded hover:bg-on-primary-fixed-variant transition-colors w-full text-center inline-block">
                  View Article
                </Link>
                {filter === 'PENDING' && (
                  <>
                    <button 
                      onClick={() => handleAction(comment.id, 'APPROVE')}
                      className="border border-outline text-secondary text-label-sm font-label-sm px-4 py-2 rounded hover:bg-surface-container-highest transition-colors w-full text-center"
                    >
                      Approve
                    </button>
                    <button 
                      onClick={() => handleAction(comment.id, 'REJECT')}
                      className="text-error hover:text-on-error-container text-label-sm font-label-sm px-4 py-2 rounded hover:bg-error-container/20 transition-colors w-full text-center flex items-center justify-center gap-1"
                    >
                      <span className="material-symbols-outlined text-[18px]">block</span> Reject
                    </button>
                  </>
                )}
              </div>
            </article>
          );
        }) : (
          <div className="text-center py-12 bg-surface-container-lowest border border-outline-variant rounded-lg">
            <span className="material-symbols-outlined text-[48px] text-secondary opacity-50 mb-4 block">done_all</span>
            <p className="text-body-md font-body-md text-on-surface-variant">No items in the {filter.toLowerCase()} queue.</p>
          </div>
        )}
      </div>

      {/* Pagination / Load More */}
      <div className="mt-stack-md flex justify-center pb-stack-lg">
        <button className="text-primary text-label-sm font-label-sm border-b border-primary hover:border-transparent transition-colors">
          Load More Items
        </button>
      </div>
    </div>
  );
}
