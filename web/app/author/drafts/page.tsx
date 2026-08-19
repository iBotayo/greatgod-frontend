'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../../../components/provider/auth-provider';
import { useDb } from '../../../components/provider/db-provider';

export default function DraftsPage() {
  const { currentUser } = useAuth();
  const { db } = useDb();
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch only drafts for the current author
  const drafts = db.articles.filter(a => a.authorId === currentUser?.id && a.status === 'DRAFT');

  const filteredDrafts = drafts.filter(d => 
    d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="flex-grow pt-8 pb-32 px-margin-mobile md:px-stack-lg max-w-container-max mx-auto w-full mt-16 min-h-[calc(100vh-200px)]">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-stack-md gap-4">
        <div>
          <h2 className="font-headline-lg-mobile md:font-headline-lg text-primary mb-2">My Drafts</h2>
          <p className="text-on-surface-variant text-body-md font-body-md">Unpublished works in progress.</p>
        </div>
        <Link href="/author/editor" className="bg-primary-container text-on-primary font-label-sm text-label-sm px-6 py-3 rounded hover:opacity-90 transition-opacity flex items-center gap-2 uppercase tracking-wider">
          <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>edit</span>
          New Draft
        </Link>
      </div>

      {/* Search & Filter Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-stack-lg border-b border-outline-variant pb-6">
        <div className="relative flex-grow max-w-md">
          <span className="material-symbols-outlined absolute left-3 top-1/2 transform -translate-y-1/2 text-outline">search</span>
          <input 
            className="w-full pl-10 pr-4 py-3 bg-surface-container-lowest border border-outline-variant rounded focus:ring-2 focus:ring-primary-container focus:border-transparent font-body-md text-on-surface outline-none transition-shadow" 
            placeholder="Search drafts..." 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <select className="bg-surface-container-lowest border border-outline-variant rounded px-4 py-3 font-label-sm text-label-sm text-on-surface-variant outline-none focus:ring-2 focus:ring-primary-container">
            <option>All Types</option>
            <option>Article</option>
            <option>Devotional</option>
            <option>Essay</option>
          </select>
          <select className="bg-surface-container-lowest border border-outline-variant rounded px-4 py-3 font-label-sm text-label-sm text-on-surface-variant outline-none focus:ring-2 focus:ring-primary-container">
            <option>Last Modified</option>
            <option>Created Date</option>
            <option>A-Z</option>
          </select>
        </div>
      </div>

      {/* Drafts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDrafts.length > 0 ? (
          filteredDrafts.map(draft => (
            <Link key={draft.id} href={`/author/editor?id=${draft.id}`} className="block bg-surface-container-low border border-outline-variant rounded p-6 hover:bg-surface-container transition-colors group relative overflow-hidden h-full flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <span className="font-label-sm text-label-sm text-primary uppercase tracking-wider">{draft.tags[0] || 'Draft'}</span>
                <button className="text-on-surface-variant hover:text-primary transition-colors focus:outline-none" onClick={(e) => e.preventDefault()}>
                  <span className="material-symbols-outlined">more_vert</span>
                </button>
              </div>
              <h3 className={`font-headline-md text-headline-md text-on-surface mb-3 group-hover:text-primary transition-colors line-clamp-2 ${!draft.title && 'italic text-on-surface-variant'}`}>
                {draft.title || 'Untitled Draft'}
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-6 line-clamp-3 flex-grow">
                {draft.excerpt || 'No content yet...'}
              </p>
              <div className="flex items-center text-on-surface-variant opacity-70 font-label-sm text-label-sm mt-auto pt-4 border-t border-outline-variant/30">
                <span>{new Date(draft.updatedAt || draft.createdAt).toLocaleDateString()}</span>
                <span className="mx-2">·</span>
                <span>{draft.content.split(/\s+/).length} words</span>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full py-12 text-center text-on-surface-variant font-body-md border border-dashed border-outline-variant rounded">
            {searchQuery ? 'No drafts found matching your search.' : 'You have no drafts. Click "New Draft" to get started.'}
          </div>
        )}
      </div>
    </main>
  );
}
