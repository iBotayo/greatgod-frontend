'use client';

import React, { useState } from 'react';
import { useAuth } from './provider/auth-provider';
import { useDb } from './provider/db-provider';

export function PersonaSwitcher() {
  const { currentUser, switchUser } = useAuth();
  const { db } = useDb();
  const [isOpen, setIsOpen] = useState(false);

  // Quick switch widget for prototype
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className={`bg-white shadow-lg border border-outline-variant rounded-lg mb-2 overflow-hidden transition-all duration-200 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
        <div className="p-3 bg-surface-container-low border-b border-outline-variant">
          <h3 className="font-label-sm text-sm font-bold text-primary">Switch Persona</h3>
        </div>
        <div className="p-2 flex flex-col gap-1 max-h-60 overflow-y-auto">
          <button 
            onClick={() => { switchUser(null); setIsOpen(false); }}
            className={`text-left px-3 py-2 text-sm rounded ${!currentUser ? 'bg-primary text-white' : 'hover:bg-surface-container'}`}
          >
            Guest (Unauthenticated)
          </button>
          {db.users.map(user => (
            <button
              key={user.id}
              onClick={() => { switchUser(user.id); setIsOpen(false); }}
              className={`text-left px-3 py-2 text-sm rounded flex flex-col ${currentUser?.id === user.id ? 'bg-primary text-white' : 'hover:bg-surface-container'}`}
            >
              <span className="font-bold">{user.name}</span>
              <span className={`text-xs ${currentUser?.id === user.id ? 'text-primary-fixed' : 'text-secondary'}`}>
                {user.roles.join(', ')} {user.isDonor && '(Donor)'}
              </span>
            </button>
          ))}
        </div>
      </div>
      
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="bg-primary text-white p-3 rounded-full shadow-lg flex items-center justify-center hover:bg-on-primary-fixed transition-colors ml-auto"
        aria-label="Toggle Persona Switcher"
      >
        <span className="material-symbols-outlined">person_swap</span>
      </button>
    </div>
  );
}
