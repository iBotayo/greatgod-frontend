'use client';

import React, { useState, useCallback } from 'react';
import { useDb } from '../../../components/provider/db-provider';

export default function AdminTaxonomyPage() {
  const { db, setDb } = useDb();
  
  const [newTerm, setNewTerm] = useState('');
  const [newType, setNewType] = useState<'category'|'tag'>('category');

  const categories = db.taxonomy.filter(t => t.type === 'category');
  const tags = db.taxonomy.filter(t => t.type === 'tag');

  const handleAdd = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!newTerm.trim()) return;
    
    const uid = Math.random().toString(36).substring(2, 9);

    setDb(prev => ({
      ...prev,
      taxonomy: [
        ...prev.taxonomy,
        {
          id: `tax_${uid}`,
          name: newTerm.trim(),
          type: newType
        }
      ]
    }));
    setNewTerm('');
  }, [newTerm, newType, setDb]);

  const handleDelete = useCallback((id: string) => {
    if (window.confirm('Are you sure you want to delete this taxonomy term?')) {
      setDb(prev => ({
        ...prev,
        taxonomy: prev.taxonomy.filter(t => t.id !== id)
      }));
    }
  }, [setDb]);

  return (
    <div className="flex-1 w-full">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-stack-md gap-4">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface">Taxonomy Management</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-2 max-w-2xl">
            Organize content using a structured hierarchy of categories and flexible tags.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Form */}
        <div className="lg:col-span-1">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm sticky top-24">
            <h3 className="font-headline-md text-headline-md text-on-surface mb-4">Add New Term</h3>
            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="block font-label-sm text-label-sm text-secondary uppercase tracking-wider mb-2">Term Name</label>
                <input 
                  type="text"
                  required
                  value={newTerm}
                  onChange={e => setNewTerm(e.target.value)}
                  className="w-full bg-surface border border-outline-variant rounded py-2 px-3 font-body-md text-body-md text-on-surface focus:border-primary-container focus:ring-1 focus:ring-primary-container focus:outline-none"
                  placeholder="e.g. Apologetics"
                />
              </div>
              <div>
                <label className="block font-label-sm text-label-sm text-secondary uppercase tracking-wider mb-2">Type</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="tax_type" 
                      value="category" 
                      checked={newType === 'category'}
                      onChange={() => setNewType('category')}
                      className="text-primary-container focus:ring-primary-container" 
                    />
                    <span className="font-body-md text-on-surface">Category</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="tax_type" 
                      value="tag" 
                      checked={newType === 'tag'}
                      onChange={() => setNewType('tag')}
                      className="text-primary-container focus:ring-primary-container" 
                    />
                    <span className="font-body-md text-on-surface">Tag</span>
                  </label>
                </div>
              </div>
              <button 
                type="submit"
                className="w-full bg-primary-container text-on-primary font-label-sm text-label-sm py-2 px-4 rounded-lg hover:bg-primary transition-colors mt-2"
              >
                Add Term
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Lists */}
        <div className="lg:col-span-2 space-y-8">
          {/* Categories */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm">
            <div className="p-4 border-b border-outline-variant bg-surface-container-low flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">category</span>
                <h3 className="font-headline-md text-headline-md text-on-surface">Categories</h3>
              </div>
              <span className="bg-surface-variant text-on-surface font-label-sm text-label-sm px-2 py-0.5 rounded-full">{categories.length}</span>
            </div>
            {categories.length === 0 ? (
              <div className="p-8 text-center text-secondary font-body-md">No categories defined.</div>
            ) : (
              <ul className="divide-y divide-outline-variant">
                {categories.map(cat => (
                  <li key={cat.id} className="p-4 flex justify-between items-center hover:bg-surface-bright transition-colors group">
                    <span className="font-medium text-on-surface">{cat.name}</span>
                    <button 
                      onClick={() => handleDelete(cat.id)}
                      className="text-secondary hover:text-error opacity-0 group-hover:opacity-100 focus:opacity-100 transition-all p-1"
                      aria-label="Delete Category"
                    >
                      <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>delete</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Tags */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm">
            <div className="p-4 border-b border-outline-variant bg-surface-container-low flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">sell</span>
                <h3 className="font-headline-md text-headline-md text-on-surface">Tags</h3>
              </div>
              <span className="bg-surface-variant text-on-surface font-label-sm text-label-sm px-2 py-0.5 rounded-full">{tags.length}</span>
            </div>
            {tags.length === 0 ? (
              <div className="p-8 text-center text-secondary font-body-md">No tags defined.</div>
            ) : (
              <div className="p-6 flex flex-wrap gap-2">
                {tags.map(tag => (
                  <span key={tag.id} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface border border-outline-variant text-on-surface font-body-md text-[15px] group">
                    {tag.name}
                    <button 
                      onClick={() => handleDelete(tag.id)}
                      className="text-secondary hover:text-error flex items-center justify-center opacity-0 group-hover:opacity-100 focus:opacity-100 transition-all"
                      aria-label="Delete Tag"
                    >
                      <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>close</span>
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
