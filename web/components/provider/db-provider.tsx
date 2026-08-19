'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { DatabaseState, Role, User } from '../../types';
import { initialDbState } from '../../lib/initial-data';

interface DbContextType {
  db: DatabaseState;
  setDb: React.Dispatch<React.SetStateAction<DatabaseState>>;
}

const DbContext = createContext<DbContextType | undefined>(undefined);

export function DbProvider({ children }: { children: React.ReactNode }) {
  const [db, setDb] = useState<DatabaseState>(initialDbState);

  const [mounted, setMounted] = useState(false);

  if (!mounted && typeof window !== 'undefined') {
    setMounted(true);
    const saved = localStorage.getItem('greatgod_mock_db');
    if (saved) {
      try {
        setDb(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse saved db');
      }
    }
  }

  useEffect(() => {
    localStorage.setItem('greatgod_mock_db', JSON.stringify(db));
  }, [db]);

  return (
    <DbContext.Provider value={{ db, setDb }}>
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
