'use client';

import React, { useState, useEffect } from 'react';
import { useDb } from '../../../components/provider/db-provider';

export default function AdminMediaPage() {
  const { db, setDb } = useDb();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [altText, setAltText] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;
    
    // Mock upload by creating an object URL
    const objectUrl = URL.createObjectURL(selectedFile);
    const mediaId = `media_${Date.now()}`;
    const ts = new Date().toISOString();
    
    setDb(prev => ({
      ...prev,
      media: [
        {
          id: mediaId,
          url: objectUrl,
          altText: altText || selectedFile.name,
          uploaderId: 'user_admin',
          uploadedAt: ts
        },
        ...prev.media
      ],
      auditLogs: [
        {
          id: `audit_${Date.now()}`,
          actorId: 'user_admin',
          action: 'MEDIA_UPLOADED',
          targetType: 'MEDIA',
          targetId: mediaId,
          timestamp: ts,
          description: `Uploaded media ${selectedFile.name}`
        },
        ...prev.auditLogs
      ]
    }));
    
    setIsModalOpen(false);
    setAltText('');
    setSelectedFile(null);
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsModalOpen(false);
    };
    if (isModalOpen) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isModalOpen]);

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
          <button onClick={() => setIsModalOpen(true)} className="bg-primary-container text-on-error font-label-sm text-label-sm py-2 px-6 rounded-lg flex items-center gap-2 hover:bg-primary transition-colors shadow-sm border border-transparent">
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

      {/* Upload Media Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            className="bg-surface rounded-xl p-6 w-full max-w-md shadow-xl border border-outline-variant relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6 border-b border-outline-variant pb-4">
              <h3 className="font-headline-md text-primary">Upload Media</h3>
              <button 
                type="button" 
                onClick={() => setIsModalOpen(false)}
                className="text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low p-2 rounded-full transition-colors flex items-center justify-center"
                aria-label="Close modal"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <form onSubmit={handleUploadSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block font-label-sm text-outline mb-1">Select File</label>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={e => setSelectedFile(e.target.files?.[0] || null)}
                  className="w-full p-2 bg-surface-bright border border-outline rounded text-sm"
                  required
                />
              </div>
              <div>
                <label className="block font-label-sm text-outline mb-1">Alt Text (Optional)</label>
                <input 
                  type="text" 
                  value={altText} 
                  onChange={e => setAltText(e.target.value)}
                  placeholder="Describe the image for accessibility"
                  className="w-full p-2 bg-surface-bright border border-outline rounded"
                />
              </div>
              <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-outline-variant">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2 font-label-sm text-secondary border border-outline hover:bg-surface-container rounded-lg transition-colors">Cancel</button>
                <button type="submit" className="px-6 py-2 font-label-sm bg-primary text-on-primary rounded-lg hover:bg-primary-fixed-variant transition-colors shadow-sm" disabled={!selectedFile}>Upload</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
