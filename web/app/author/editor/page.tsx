'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '../../../components/provider/auth-provider';
import { useDb } from '../../../components/provider/db-provider';

export default function EditorPage() {
  const { currentUser } = useAuth();
  const { db, setDb } = useDb();
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const draftId = searchParams.get('id');

  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('Theology');
  const [wordCount, setWordCount] = useState(0);

  const [prevDraftId, setPrevDraftId] = useState<string | null>(null);

  if (draftId !== prevDraftId) {
    setPrevDraftId(draftId);
    if (draftId) {
      const draft = db.articles.find(a => a.id === draftId);
      if (draft) {
        setTitle(draft.title);
        setExcerpt(draft.excerpt);
        setContent(draft.content);
        setTags(draft.tags[0] || 'Theology');
        setWordCount(draft.content.split(/\s+/).length);
      }
    } else {
      setTitle('');
      setExcerpt('');
      setContent('');
      setTags('Theology');
      setWordCount(0);
    }
  }

  const handleContentChange = (e: React.FormEvent<HTMLDivElement>) => {
    const text = e.currentTarget.innerText || '';
    setContent(text);
    setWordCount(text.split(/\s+/).filter(w => w.length > 0).length);
  };

  const handleSave = () => {
    if (!currentUser) return;
    const isNew = !draftId;
    const newId = isNew ? `art_${Date.now()}` : draftId;
    
    setDb(prev => {
      const existing = isNew ? null : prev.articles.find(a => a.id === draftId);
      const updatedArticle = {
        id: newId,
        title: title || 'Untitled Draft',
        excerpt,
        content,
        tags: [tags],
        authorId: currentUser.id,
        status: 'DRAFT' as const,
        readTime: Math.max(1, Math.ceil(wordCount / 200)),
        createdAt: existing?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      return {
        ...prev,
        articles: isNew 
          ? [updatedArticle, ...prev.articles]
          : prev.articles.map(a => a.id === draftId ? updatedArticle : a)
      };
    });
    
    if (isNew) {
      router.replace(`/author/editor?id=${newId}`);
    }
  };

  const handleSubmit = () => {
    if (!currentUser) return;
    const isNew = !draftId;
    const targetId = isNew ? `art_${Date.now()}` : draftId;
    
    setDb(prev => {
      const existing = isNew ? null : prev.articles.find(a => a.id === targetId);
      const updatedArticle = {
        id: targetId,
        title: title || 'Untitled Draft',
        excerpt,
        content,
        tags: [tags],
        authorId: currentUser.id,
        status: 'IN_REVIEW' as const,
        readTime: Math.max(1, Math.ceil(wordCount / 200)),
        createdAt: existing?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      const newAuditLog = {
        id: `audit_${Date.now()}`,
        actorId: currentUser.id,
        action: 'ARTICLE_SUBMITTED',
        targetType: 'ARTICLE',
        targetId,
        timestamp: new Date().toISOString(),
        description: `Author ${currentUser.name} submitted an article for review.`
      };

      return {
        ...prev,
        articles: isNew 
          ? [updatedArticle, ...prev.articles]
          : prev.articles.map(a => a.id === targetId ? updatedArticle : a),
        auditLogs: [newAuditLog, ...prev.auditLogs]
      };
    });

    router.push('/author');
  };

  return (
    <div className="flex-grow flex flex-col min-h-screen bg-surface">
      {/* Editor Top Nav */}
      <nav className="fixed top-16 w-full z-40 flex justify-between items-center px-margin-mobile md:px-stack-lg h-16 bg-surface border-b border-outline-variant">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.push('/author/drafts')}
            className="flex items-center justify-center p-2 rounded-full hover:bg-surface-container-low transition-colors text-on-surface-variant"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest hidden md:inline">
            {draftId ? 'Editing Draft' : 'New Draft'}
          </span>
        </div>
        
        <div className="flex items-center gap-4 md:gap-6">
          <span className="font-label-sm text-label-sm text-secondary hidden md:inline">
            Autosave: Saved just now
          </span>
          <span className="text-outline hidden md:inline">|</span>
          <span className="font-label-sm text-label-sm text-secondary">
            {wordCount} words
          </span>
          <button 
            onClick={handleSave}
            className="font-label-sm text-label-sm text-primary hover:text-primary-container transition-colors hidden md:inline"
          >
            Save Draft
          </button>
          <button 
            onClick={handleSubmit}
            className="bg-primary-container text-on-primary font-label-sm text-label-sm px-4 py-2 rounded hover:opacity-90 transition-opacity"
          >
            Submit for Review
          </button>
        </div>
      </nav>

      {/* Main Editor Canvas */}
      <main className="flex-grow flex flex-col md:flex-row max-w-container-max mx-auto w-full px-margin-mobile md:px-gutter py-stack-md gap-gutter mt-32">
        
        {/* Editor Area */}
        <article className="flex-grow w-full md:w-8/12 lg:w-9/12 relative pb-32">
          <div className="flex flex-col gap-4 mb-stack-md border-b border-outline-variant pb-8">
            <input 
              className="w-full bg-transparent font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface placeholder:text-outline placeholder:opacity-50 focus:outline-none" 
              placeholder="Article Title..." 
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea 
              className="w-full bg-transparent font-body-lg text-body-lg text-secondary resize-none placeholder:text-outline placeholder:opacity-50 focus:outline-none" 
              placeholder="Write a brief excerpt or subtitle (optional)..." 
              rows={3}
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
            />
          </div>
          
          <div 
            className="font-body-md text-body-md text-on-surface leading-relaxed focus:outline-none min-h-[50vh]" 
            contentEditable 
            suppressContentEditableWarning
            onInput={handleContentChange}
            data-placeholder="Start writing your reflection here..."
          >
            {content || ''}
          </div>

          {/* Floating Toolbar */}
          <div className="fixed bottom-24 md:bottom-8 left-1/2 transform -translate-x-1/2 bg-surface-container-high border border-outline-variant rounded-full px-6 py-3 flex gap-4 shadow-sm items-center z-40">
            <button className="text-on-surface hover:text-primary transition-colors flex items-center justify-center">
              <span className="material-symbols-outlined">format_bold</span>
            </button>
            <button className="text-on-surface hover:text-primary transition-colors flex items-center justify-center">
              <span className="material-symbols-outlined">format_italic</span>
            </button>
            <button className="text-on-surface hover:text-primary transition-colors flex items-center justify-center">
              <span className="material-symbols-outlined">format_quote</span>
            </button>
            <div className="w-px h-6 bg-outline-variant"></div>
            <button className="text-on-surface hover:text-primary transition-colors flex items-center gap-1 font-label-sm text-label-sm">
              <span className="material-symbols-outlined text-[18px]">menu_book</span> Scripture
            </button>
            <button className="text-on-surface hover:text-primary transition-colors flex items-center gap-1 font-label-sm text-label-sm">
              <span className="material-symbols-outlined text-[18px]">image</span> Media
            </button>
          </div>
        </article>

        {/* Sidebar / Metadata Panel */}
        <aside className="w-full md:w-4/12 lg:w-3/12 flex flex-col gap-stack-md border-t md:border-t-0 md:border-l border-outline-variant pt-8 md:pt-0 md:pl-8">
          
          {/* Featured Image */}
          <div className="flex flex-col gap-2">
            <span className="font-label-sm text-secondary uppercase tracking-widest">Featured Image</span>
            <div className="w-full aspect-[4/3] bg-surface-container border border-outline-variant rounded flex items-center justify-center relative overflow-hidden group cursor-pointer hover:bg-surface-container-high transition-colors">
              <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors text-[32px]">add_photo_alternate</span>
            </div>
          </div>

          {/* Author & Topic */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="font-label-sm text-secondary uppercase tracking-widest">Author</label>
              <select className="bg-surface-container-lowest border border-outline-variant text-on-surface font-body-md rounded p-2 focus:ring-2 focus:ring-primary-container focus:border-transparent w-full" disabled>
                <option>{currentUser?.name}</option>
              </select>
            </div>
            
            <div className="flex flex-col gap-1">
              <label className="font-label-sm text-secondary uppercase tracking-widest">Primary Topic</label>
              <select 
                className="bg-surface-container-lowest border border-outline-variant text-on-surface font-body-md rounded p-2 focus:ring-2 focus:ring-primary-container focus:border-transparent w-full"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              >
                <option value="Theology">Theology</option>
                <option value="Christian Living">Christian Living</option>
                <option value="Culture">Culture</option>
                <option value="Church History">Church History</option>
                <option value="Reflection">Reflection</option>
              </select>
            </div>
          </div>

          {/* Scripture References List */}
          <div className="flex flex-col gap-2">
            <span className="font-label-sm text-secondary uppercase tracking-widest flex items-center justify-between">
              References
              <button className="text-primary hover:text-primary-container">
                <span className="material-symbols-outlined text-[18px]">add</span>
              </button>
            </span>
            <ul className="flex flex-col gap-2 font-body-md text-on-surface-variant">
              <li className="flex justify-between items-center bg-surface-container-low p-2 rounded border border-outline-variant">
                <span className="text-sm">No references added</span>
              </li>
            </ul>
          </div>
        </aside>

      </main>
    </div>
  );
}
