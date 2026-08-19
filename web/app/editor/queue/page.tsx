'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useDb } from '../../../components/provider/db-provider';

export default function ReviewQueuePage() {
  const { db } = useDb();
  const [searchQuery, setSearchQuery] = useState('');

  // Get articles in editorial states
  const queueArticles = db.articles.filter(a => 
    a.status === 'IN_REVIEW' || 
    a.status === 'CHANGES_REQUESTED' || 
    a.status === 'APPROVED'
  );

  const filteredArticles = queueArticles.filter(a => 
    a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    db.users.find(u => u.id === a.authorId)?.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* Header & Top Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-outline-variant pb-4 mb-stack-sm">
        <div>
          <h1 className="text-headline-lg font-headline-lg text-on-background">Review Queue</h1>
          <p className="text-body-md font-body-md text-secondary mt-1">Manage and prioritize editorial submissions.</p>
        </div>
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="flex items-center gap-2">
            <label className="text-label-sm font-label-sm text-secondary uppercase tracking-widest whitespace-nowrap" htmlFor="sort">Sort by:</label>
            <select 
              id="sort"
              className="bg-surface-container-lowest border border-outline-variant rounded py-1 pl-3 pr-8 text-label-sm font-label-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary-container focus:border-transparent transition-shadow cursor-pointer" 
            >
              <option>Oldest (Priority)</option>
              <option>Newest</option>
              <option>SLA Risk</option>
            </select>
          </div>
        </div>
      </div>

      {/* Filters Section (Dense) */}
      <div className="bg-surface-container-low border border-outline-variant p-4 rounded flex flex-wrap gap-4 items-center mb-stack-sm">
        <div className="flex-grow min-w-[200px]">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary text-sm pointer-events-none">search</span>
            <input 
              className="w-full bg-surface-container-lowest border border-outline-variant rounded py-2 pl-9 pr-3 text-body-md font-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary-container focus:border-transparent transition-shadow" 
              placeholder="Search titles or authors..." 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <select className="bg-surface-container-lowest border border-outline-variant rounded py-2 pl-3 pr-8 text-label-sm font-label-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary-container transition-shadow">
          <option value="">Content Type</option>
          <option>Article</option>
          <option>Sermon</option>
          <option>Devotional</option>
        </select>
        <select className="bg-surface-container-lowest border border-outline-variant rounded py-2 pl-3 pr-8 text-label-sm font-label-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary-container transition-shadow">
          <option value="">Topic</option>
          <option>Theology</option>
          <option>Culture</option>
          <option>Practice</option>
        </select>
        <select className="bg-surface-container-lowest border border-outline-variant rounded py-2 pl-3 pr-8 text-label-sm font-label-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary-container transition-shadow">
          <option value="">State</option>
          <option>Pending</option>
          <option>In Review</option>
          <option>Changes Requested</option>
        </select>
        <button className="text-label-sm font-label-sm text-secondary hover:text-primary underline flex items-center gap-1 transition-colors">
          Clear Filters
        </button>
      </div>

      {/* Data Table (Dense & Scannable) */}
      <div className="w-full overflow-x-auto border border-outline-variant rounded bg-surface-container-lowest">
        <table className="w-full text-left border-collapse whitespace-nowrap">
          <thead>
            <tr className="bg-surface-container-low border-b border-outline-variant">
              <th className="py-3 px-4 text-label-sm font-label-sm text-secondary uppercase tracking-widest font-semibold">Title</th>
              <th className="py-3 px-4 text-label-sm font-label-sm text-secondary uppercase tracking-widest font-semibold">Author</th>
              <th className="py-3 px-4 text-label-sm font-label-sm text-secondary uppercase tracking-widest font-semibold">Type / Topic</th>
              <th className="py-3 px-4 text-label-sm font-label-sm text-secondary uppercase tracking-widest font-semibold">Submitted</th>
              <th className="py-3 px-4 text-label-sm font-label-sm text-secondary uppercase tracking-widest font-semibold">SLA</th>
              <th className="py-3 px-4 text-label-sm font-label-sm text-secondary uppercase tracking-widest font-semibold">State</th>
              <th className="py-3 px-4 text-label-sm font-label-sm text-secondary uppercase tracking-widest font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="text-body-md font-body-md divide-y divide-outline-variant">
            {filteredArticles.length > 0 ? (
              filteredArticles.map(article => (
                <tr key={article.id} className="hover:bg-surface-container transition-colors group">
                  <td className="py-3 px-4 text-on-background font-medium truncate max-w-[250px]">{article.title}</td>
                  <td className="py-3 px-4 text-secondary">{db.users.find(u => u.id === article.authorId)?.name}</td>
                  <td className="py-3 px-4 text-secondary text-sm">
                    <span className="bg-surface-variant px-2 py-0.5 rounded text-on-surface-variant font-label-sm">Article</span> 
                    <span className="text-outline mx-1">•</span> 
                    {article.tags[0] || 'General'}
                  </td>
                  <td className="py-3 px-4 text-secondary text-sm">
                    {new Date(article.updatedAt || article.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1.5">
                      <div className={`w-2 h-2 rounded-full ${article.status === 'IN_REVIEW' ? 'bg-error' : 'bg-[#4a7c59]'}`}></div>
                      <span className={`${article.status === 'IN_REVIEW' ? 'text-error' : 'text-[#4a7c59]'} font-label-sm text-label-sm`}>
                        {article.status === 'IN_REVIEW' ? 'Overdue' : 'On Track'}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 rounded text-label-sm font-label-sm bg-surface-variant text-on-surface-variant">
                      {article.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right flex justify-end items-center gap-2">
                    <button className="text-secondary hover:text-primary transition-colors p-1" title="Message Author">
                      <span className="material-symbols-outlined text-[20px]">mail</span>
                    </button>
                    <Link href={`/editor/review/${article.id}`} className="bg-primary-container text-on-primary-container text-label-sm font-label-sm px-4 py-1.5 rounded hover:bg-on-primary-fixed-variant hover:text-white transition-colors ml-2 text-white inline-block">
                      Review
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="py-8 text-center text-on-surface-variant italic">No articles found in the queue.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Placeholder */}
      <div className="flex justify-between items-center py-2 text-label-sm font-label-sm text-secondary mt-2">
        <span>Showing 1-{filteredArticles.length} of {filteredArticles.length} submissions</span>
        <div className="flex gap-2">
          <button className="px-3 py-1 border border-outline-variant rounded hover:bg-surface-container transition-colors disabled:opacity-50" disabled>Prev</button>
          <button className="px-3 py-1 border border-outline-variant rounded hover:bg-surface-container transition-colors disabled:opacity-50" disabled>Next</button>
        </div>
      </div>
    </>
  );
}
