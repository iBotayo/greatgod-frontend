'use client';

import React, { useState, useMemo } from 'react';
import { useDb } from '../../../components/provider/db-provider';

export default function AdminAuditPage() {
  const { db } = useDb();

  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('All Types');

  const resolveActor = (actorId: string) => {
    return db.users.find(u => u.id === actorId) || { name: 'Unknown User', id: actorId };
  };

  const resolveTargetName = (targetType: string, targetId: string) => {
    if (targetType === 'ARTICLE') {
      const article = db.articles.find(a => a.id === targetId);
      return article ? `"${article.title}"` : `Deleted Article (${targetId})`;
    }
    if (targetType === 'USER') {
      const user = db.users.find(u => u.id === targetId);
      return user ? user.name : `Deleted User (${targetId})`;
    }
    return targetId;
  };

  const getActorInitials = (name: string) => {
    const parts = name.split(' ');
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return name.slice(0, 2).toUpperCase();
  };

  const filteredLogs = useMemo(() => {
    return db.auditLogs
      .filter(log => {
        const actor = db.users.find(u => u.id === log.actorId) || { name: 'Unknown User', id: log.actorId };
        const matchesSearch = 
          actor.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
          log.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          log.action.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType = typeFilter === 'All Types' || log.targetType === typeFilter.toUpperCase();
        return matchesSearch && matchesType;
      })
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }, [db.auditLogs, db.users, searchQuery, typeFilter]);

  return (
    <div className="flex-1 w-full">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-stack-md gap-4">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface">Audit Log</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-2 max-w-2xl">
            A comprehensive record of administrative actions, role assignments, and critical content updates.
          </p>
        </div>
      </div>

      {/* Toolbar / Filters */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-4 mb-6 flex flex-col sm:flex-row gap-4 items-center justify-between shadow-sm">
        <div className="relative w-full sm:w-96">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary" style={{ fontSize: '20px' }}>search</span>
          <input 
            className="w-full pl-10 pr-4 py-2 bg-surface rounded border border-outline-variant focus:border-primary-container focus:ring-1 focus:ring-primary-container font-body-md text-body-md text-on-surface placeholder-secondary focus:outline-none transition-shadow" 
            placeholder="Search logs by actor, action, or description..." 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-3 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0 hide-scrollbar">
          <select 
            className="bg-surface border border-outline-variant rounded py-2 px-3 font-label-sm text-label-sm text-on-surface focus:border-primary-container focus:ring-1 focus:ring-primary-container focus:outline-none"
            value={typeFilter}
            onChange={e => setTypeFilter(e.target.value)}
          >
            <option>All Types</option>
            <option>Article</option>
            <option>User</option>
            <option>Taxonomy</option>
            <option>Media</option>
          </select>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left whitespace-nowrap">
            <thead className="bg-surface-container-low border-b border-outline-variant">
              <tr>
                <th className="pl-6 py-4 font-label-sm text-label-sm text-secondary uppercase tracking-wider font-semibold">Actor</th>
                <th className="py-4 font-label-sm text-label-sm text-secondary uppercase tracking-wider font-semibold">Action</th>
                <th className="py-4 font-label-sm text-label-sm text-secondary uppercase tracking-wider font-semibold">Target Entity</th>
                <th className="py-4 pr-6 text-right font-label-sm text-label-sm text-secondary uppercase tracking-wider font-semibold">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant bg-surface-container-lowest font-body-md text-body-md text-on-surface">
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-secondary">
                    No audit records found.
                  </td>
                </tr>
              ) : (
                filteredLogs.map(log => {
                  const actor = resolveActor(log.actorId);
                  return (
                    <tr key={log.id} className="hover:bg-surface-bright transition-colors">
                      <td className="pl-6 py-4 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-surface-variant text-on-surface flex items-center justify-center font-label-sm font-bold border border-outline-variant">
                          {getActorInitials(actor.name)}
                        </div>
                        <span className="font-medium text-on-surface">{actor.name}</span>
                      </td>
                      <td className="py-4">
                        <span className="font-label-sm text-[12px] uppercase tracking-widest text-on-surface-variant">
                          {log.action.replace(/_/g, ' ')}
                        </span>
                        <p className="text-sm text-secondary mt-1 max-w-sm truncate" title={log.description}>{log.description}</p>
                      </td>
                      <td className="py-4">
                        <span className="text-primary italic">
                          {resolveTargetName(log.targetType, log.targetId)}
                        </span>
                      </td>
                      <td className="py-4 pr-6 text-right text-secondary text-sm">
                        {new Date(log.timestamp).toLocaleString(undefined, { 
                          year: 'numeric', month: 'short', day: 'numeric', 
                          hour: '2-digit', minute: '2-digit' 
                        })}
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
