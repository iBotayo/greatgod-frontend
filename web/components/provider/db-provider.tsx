'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { DatabaseState } from '../../types';
import { initialDbState } from '../../lib/initial-data';

interface DbContextType {
  db: DatabaseState;
  setDb: React.Dispatch<React.SetStateAction<DatabaseState>>;
  isDbReady: boolean;
}

const DbContext = createContext<DbContextType | undefined>(undefined);

export function DbProvider({ children }: { children: React.ReactNode }) {
  const [db, setDb] = useState<DatabaseState>(initialDbState);
  const [isDbReady, setIsDbReady] = useState(false);

  useEffect(() => {
    const initDb = () => {
      const saved = localStorage.getItem('greatgod_mock_db');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setDb({
            ...initialDbState,
            ...parsed,
            users: Array.isArray(parsed.users) ? parsed.users : initialDbState.users,
            articles: Array.isArray(parsed.articles) ? parsed.articles : initialDbState.articles,
            comments: Array.isArray(parsed.comments) ? parsed.comments : initialDbState.comments,
            donations: Array.isArray(parsed.donations) ? parsed.donations : initialDbState.donations,
            notifications: Array.isArray(parsed.notifications) ? parsed.notifications : initialDbState.notifications,
            bookmarks: Array.isArray(parsed.bookmarks) ? parsed.bookmarks : initialDbState.bookmarks,
            readingHistory: Array.isArray(parsed.readingHistory) ? parsed.readingHistory : initialDbState.readingHistory,
            subscribers: Array.isArray(parsed.subscribers) ? parsed.subscribers : initialDbState.subscribers,
            auditLogs: Array.isArray(parsed.auditLogs) ? parsed.auditLogs : initialDbState.auditLogs,
            media: Array.isArray(parsed.media) ? parsed.media : initialDbState.media,
            taxonomy: Array.isArray(parsed.taxonomy) ? parsed.taxonomy : initialDbState.taxonomy,
          });
        } catch (e) {
          console.error('Failed to parse saved db', e);
        }
      }
      setIsDbReady(true);
    };
    initDb();
  }, []);

  useEffect(() => {
    if (isDbReady) {
      localStorage.setItem('greatgod_mock_db', JSON.stringify(db));
    }
  }, [db, isDbReady]);

  return (
    <DbContext.Provider value={{ db, setDb, isDbReady }}>
      {children}
    </DbContext.Provider>
  );
}

export function useDb() {
  const context = useContext(DbContext);
  if (context === undefined) {
    throw new Error('useDb must be used within a DbProvider');
  }
  return context;
}
