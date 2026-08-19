'use client';

import React from 'react';
import { useDb } from '../../../components/provider/db-provider';

export default function AdminRolesPage() {
  const { db } = useDb();

  const roleDefinitions = [
    {
      id: 'ADMIN',
      name: 'Administrator',
      description: 'Full access to all platform settings, user management, and content workflows.',
      icon: 'admin_panel_settings',
    },
    {
      id: 'EDITOR',
      name: 'Editor',
      description: 'Can review, approve, and publish content submitted by authors. Manages editorial calendar.',
      icon: 'edit_document',
    },
    {
      id: 'MODERATOR',
      name: 'Moderator',
      description: 'Reviews comments and community reports to maintain a healthy environment.',
      icon: 'forum',
    },
    {
      id: 'AUTHOR',
      name: 'Author',
      description: 'Can write, save drafts, and submit articles or devotional content for editorial review.',
      icon: 'ink_pen',
    },
    {
      id: 'READER',
      name: 'Reader',
      description: 'Standard access to read published content, leave comments, and track reading progress.',
      icon: 'menu_book',
    },
  ];

  return (
    <div className="flex-1 w-full">
      {/* Page Header */}
      <div className="flex justify-between items-end mb-stack-md gap-4">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface">Role Management</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-2 max-w-2xl">
            Review platform roles and their associated permissions. Active assignments are managed in the Users section.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {roleDefinitions.map((role) => {
          const assignedUsers = db.users.filter(u => u.roles.includes(role.id as import('../../../types').Role));
          return (
            <div key={role.id} className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-surface-container-high flex items-center justify-center text-primary border border-outline-variant">
                  <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>{role.icon}</span>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-headline-md text-headline-md text-on-surface">{role.name}</h3>
                    <span className="bg-secondary-container text-on-secondary-container font-label-sm text-label-sm px-3 py-1 rounded-full">
                      {assignedUsers.length} Users
                    </span>
                  </div>
                  <p className="font-body-md text-body-md text-on-surface-variant mb-4">
                    {role.description}
                  </p>
                  
                  {assignedUsers.length > 0 ? (
                    <div className="bg-surface-container-low rounded-lg p-4 border border-outline-variant">
                      <h4 className="font-label-sm text-label-sm text-secondary uppercase tracking-wider mb-3">Assigned To</h4>
                      <div className="flex flex-wrap gap-2">
                        {assignedUsers.map(u => (
                          <div key={u.id} className="bg-surface border border-outline-variant px-3 py-1.5 rounded-full flex items-center gap-2">
                            <div className="w-5 h-5 rounded-full bg-surface-variant text-on-surface text-[10px] flex items-center justify-center font-bold">
                              {u.name.split(' ').map(n=>n[0]).join('').substring(0,2).toUpperCase()}
                            </div>
                            <span className="font-label-sm text-label-sm">{u.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <p className="font-label-sm text-label-sm text-secondary italic">No users currently hold this role.</p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
