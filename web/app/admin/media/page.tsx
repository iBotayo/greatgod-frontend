'use client';

import React from 'react';
import { useDb } from '../../../components/provider/db-provider';

export default function AdminMediaPage() {
  const { db } = useDb();

  return (
    <div className="flex-1 w-full">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-stack-md gap-4">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface">Media Library</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-2 max-w-2xl">
            Manage images and visual assets used across articles, devotionals, and public pages.
          </p>
        </div>
        <div className="flex-shrink-0">
          <button className="bg-primary-container text-on-error font-label-sm text-label-sm py-2 px-6 rounded-lg flex items-center gap-2 hover:bg-primary transition-colors shadow-sm border border-transparent">
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>upload</span>
            Upload Media
          </button>
        </div>
      </div>

      {/* Toolbar / Filters */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-4 mb-6 flex flex-col sm:flex-row gap-4 items-center justify-between shadow-sm">
        <div className="relative w-full sm:w-96">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary" style={{ fontSize: '20px' }}>search</span>
          <input 
            className="w-full pl-10 pr-4 py-2 bg-surface rounded border border-outline-variant focus:border-primary-container focus:ring-1 focus:ring-primary-container font-body-md text-body-md text-on-surface placeholder-secondary focus:outline-none transition-shadow" 
            placeholder="Search by alt text..." 
            type="text"
          />
        </div>
        <div className="flex gap-3 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0 hide-scrollbar">
          <select className="bg-surface border border-outline-variant rounded py-2 px-3 font-label-sm text-label-sm text-on-surface focus:border-primary-container focus:ring-1 focus:ring-primary-container focus:outline-none">
            <option>All Types</option>
            <option>Images</option>
            <option>Documents</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {db.media.length === 0 ? (
          <div className="col-span-full py-12 text-center border border-dashed border-outline-variant rounded-xl bg-surface-container-low">
            <span className="material-symbols-outlined text-secondary" style={{ fontSize: '48px' }}>image_not_supported</span>
            <p className="font-body-md text-secondary mt-2">No media files found.</p>
          </div>
        ) : (
          db.media.map(item => {
            const uploader = db.users.find(u => u.id === item.uploaderId);
            return (
              <div key={item.id} className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm group">
                <div className="aspect-[4/3] bg-surface-variant relative overflow-hidden">
                  <img 
                    src={item.url} 
                    alt={item.altText} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button className="w-10 h-10 rounded-full bg-surface text-on-surface flex items-center justify-center hover:bg-surface-bright transition-colors">
                      <span className="material-symbols-outlined">edit</span>
                    </button>
                    <button className="w-10 h-10 rounded-full bg-error text-on-error flex items-center justify-center hover:bg-error/90 transition-colors">
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                  </div>
                </div>
                <div className="p-3">
                  <p className="font-label-sm text-label-sm text-on-surface truncate" title={item.altText}>{item.altText || 'Untitled Image'}</p>
                  <p className="font-label-sm text-[11px] text-secondary mt-1">
                    Added {new Date(item.uploadedAt).toLocaleDateString()} by {uploader?.name.split(' ')[0] || 'Unknown'}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
