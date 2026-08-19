'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { useDb } from '../../../components/provider/db-provider';
import { useAuth } from '../../../components/provider/auth-provider';
import { ArticleStatus, Role, Notification } from '../../../types';

export default function AdminContentPage() {
  const { db, setDb } = useDb();
  const { currentUser } = useAuth();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All Statuses');

  const filteredArticles = useMemo(() => {
    return db.articles.filter(article => {
      const author = db.users.find(u => u.id === article.authorId);
      const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            (author && author.name.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesStatus = statusFilter === 'All Statuses' || article.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [db.articles, db.users, searchQuery, statusFilter]);

  const handleAction = useCallback((articleId: string, actionName: string, newStatus: ArticleStatus, notifMsg: string) => {
    if (!currentUser) return;
    
    const article = db.articles.find(a => a.id === articleId);
    if (!article) return;

    const ts = new Date().toISOString();
    const uid = Math.random().toString(36).substring(2, 9);

    // Create Notification for the author
    const newNotif: Notification = {
      id: `notif_${uid}`,
      userId: article.authorId,
      type: 'system',
      message: notifMsg,
      read: false,
      createdAt: ts,
      link: `/article/${articleId}` // Mock link
    };

    setDb(prev => ({
      ...prev,
      articles: prev.articles.map(a => 
        a.id === articleId ? { 
          ...a, 
          status: newStatus,
          updatedAt: ts,
          ...(newStatus === 'PUBLISHED' ? { publishedAt: ts } : {})
        } : a
      ),
      auditLogs: [
        {
          id: `audit_${uid}`,
          actorId: currentUser.id,
          action: actionName,
          targetType: 'ARTICLE',
          targetId: articleId,
          timestamp: ts,
          description: `${actionName.replace(/_/g, ' ')} article "${article.title}"`
        },
        ...prev.auditLogs
      ],
      notifications: [newNotif, ...prev.notifications]
    }));
  }, [currentUser, db.articles, setDb]);

  const getStatusStyle = (status: ArticleStatus) => {
    switch (status) {
      case 'PUBLISHED':
        return 'bg-[#E8F5E9] text-[#2E7D32] border-[#C8E6C9]';
      case 'APPROVED':
        return 'bg-tertiary-container/20 text-tertiary border-tertiary-container/30';
      case 'IN_REVIEW':
        return 'bg-primary-container/10 text-primary-container border-primary-container/20';
      case 'CHANGES_REQUESTED':
        return 'bg-error-container text-on-error-container border-error-container';
      default:
        return 'bg-surface-variant text-on-surface-variant border-outline-variant';
    }
  };

  return (
    <div className="flex-1 w-full">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-stack-md gap-4">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface">Content Manager</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-2 max-w-2xl">
            Review submissions, manage the editorial pipeline, and publish content to the platform.
          </p>
        </div>
      </div>

      {/* Toolbar / Filters */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-4 mb-6 flex flex-col sm:flex-row gap-4 items-center justify-between shadow-sm">
        <div className="relative w-full sm:w-96">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary" style={{ fontSize: '20px' }}>search</span>
          <input 
            className="w-full pl-10 pr-4 py-2 bg-surface rounded border border-outline-variant focus:border-primary-container focus:ring-1 focus:ring-primary-container font-body-md text-body-md text-on-surface placeholder-secondary focus:outline-none transition-shadow" 
            placeholder="Search titles or authors..." 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-3 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0 hide-scrollbar">
          <select 
            className="bg-surface border border-outline-variant rounded py-2 px-3 font-label-sm text-label-sm text-on-surface focus:border-primary-container focus:ring-1 focus:ring-primary-container focus:outline-none"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option>All Statuses</option>
            <option>DRAFT</option>
            <option>IN_REVIEW</option>
            <option>CHANGES_REQUESTED</option>
            <option>APPROVED</option>
            <option>PUBLISHED</option>
          </select>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left whitespace-nowrap">
            <thead className="bg-surface-container-low border-b border-outline-variant">
              <tr>
                <th className="pl-6 py-4 font-label-sm text-label-sm text-secondary uppercase tracking-wider font-semibold">Title</th>
                <th className="py-4 font-label-sm text-label-sm text-secondary uppercase tracking-wider font-semibold">Author</th>
                <th className="py-4 font-label-sm text-label-sm text-secondary uppercase tracking-wider font-semibold">Last Updated</th>
                <th className="py-4 font-label-sm text-label-sm text-secondary uppercase tracking-wider font-semibold">Status</th>
                <th className="py-4 pr-6 text-right font-label-sm text-label-sm text-secondary uppercase tracking-wider font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant bg-surface-container-lowest font-body-md text-body-md text-on-surface">
              {filteredArticles.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-secondary">
                    No content found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredArticles.map(article => {
                  const author = db.users.find(u => u.id === article.authorId);
                  
                  return (
                    <tr key={article.id} className="hover:bg-surface-bright transition-colors group">
                      <td className="pl-6 py-4">
                        <span className="font-medium">{article.title}</span>
                      </td>
                      <td className="py-4 text-secondary">{author?.name || 'Unknown'}</td>
                      <td className="py-4 text-secondary text-sm">{new Date(article.updatedAt).toLocaleDateString()}</td>
                      <td className="py-4">
                        <span className={`font-label-sm text-[11px] uppercase tracking-wider px-2 py-1 rounded-full border font-semibold ${getStatusStyle(article.status)}`}>
                          {article.status.replace(/_/g, ' ')}
                        </span>
                      </td>
                      <td className="py-4 pr-6 text-right relative">
                        {/* Only show actions if applicable */}
                        {article.status !== 'PUBLISHED' && (
                          <div className="flex justify-end gap-2">
                            {article.status === 'IN_REVIEW' && (
                              <>
                                <button 
                                  onClick={() => handleAction(article.id, 'ARTICLE_APPROVED', 'APPROVED', `Your article "${article.title}" has been approved.`)}
                                  className="px-3 py-1 bg-tertiary-container/20 hover:bg-tertiary-container/30 text-tertiary rounded text-sm font-medium transition-colors border border-tertiary-container/30"
                                >
                                  Approve
                                </button>
                                <button 
                                  onClick={() => handleAction(article.id, 'ARTICLE_REJECTED', 'CHANGES_REQUESTED', `Changes requested for "${article.title}".`)}
                                  className="px-3 py-1 bg-surface-variant hover:bg-outline-variant text-on-surface rounded text-sm font-medium transition-colors border border-outline-variant"
                                >
                                  Reject
                                </button>
                              </>
                            )}
                            {article.status === 'APPROVED' && (
                              <button 
                                onClick={() => handleAction(article.id, 'ARTICLE_PUBLISHED', 'PUBLISHED', `Your article "${article.title}" is now live!`)}
                                className="px-3 py-1 bg-primary-container hover:bg-primary-container/90 text-on-primary rounded text-sm font-medium transition-colors"
                              >
                                Publish
                              </button>
                            )}
                          </div>
                        )}
                        {article.status === 'PUBLISHED' && (
                          <span className="text-secondary italic text-sm">Published</span>
                        )}
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
