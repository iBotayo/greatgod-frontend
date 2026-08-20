'use client';

import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useDb } from '../../../components/provider/db-provider';
import { Role, User } from '../../../types';

export default function AdminUsersPage() {
  const { db, setDb } = useDb();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('All Roles');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState<Role>('READER');
  const [newPassword, setNewPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  
  const handleInviteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    
    if (!newName || !newEmail || !newPassword) {
      setErrorMsg('All fields are required.');
      return;
    }
    
    const existing = db.users.find(u => u.email.toLowerCase() === newEmail.toLowerCase());
    if (existing) {
      setErrorMsg('A user with this email already exists.');
      return;
    }
    
    const userId = `user_${Date.now()}`;
    const ts = new Date().toISOString();
    
    // Admin uses existing role + READER
    const roles: Role[] = newRole === 'READER' ? ['READER'] : [newRole, 'READER'];
    
    setDb(prev => ({
      ...prev,
      users: [
        {
          id: userId,
          name: newName,
          email: newEmail,
          roles: roles,
          password: newPassword, // Password stored for prototype mock auth
          createdAt: ts
        },
        ...prev.users
      ],
      auditLogs: [
        {
          id: `audit_${Date.now()}`,
          actorId: 'user_admin',
          action: 'USER_CREATED',
          targetType: 'USER',
          targetId: userId,
          timestamp: ts,
          description: `Created new user ${newEmail} with role ${newRole}`
        },
        ...prev.auditLogs
      ]
    }));
    
    setSuccessMsg('User created successfully.');
    setTimeout(() => {
      setIsModalOpen(false);
      setNewName('');
      setNewEmail('');
      setNewPassword('');
      setNewRole('READER');
      setSuccessMsg('');
    }, 1500);
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsModalOpen(false);
    };
    if (isModalOpen) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isModalOpen]);

  // Derive highest role for display
  const getDisplayRole = (roles: Role[]) => {
    if (roles.includes('ADMIN')) return 'Administrator';
    if (roles.includes('EDITOR')) return 'Editor';
    if (roles.includes('MODERATOR')) return 'Moderator';
    if (roles.includes('AUTHOR')) return 'Author';
    return 'Reader';
  };

  const getRoleIcon = (displayRole: string) => {
    switch(displayRole) {
      case 'Administrator': return 'admin_panel_settings';
      case 'Editor': return 'edit_document';
      case 'Moderator': return 'forum';
      case 'Author': return 'ink_pen';
      default: return 'person';
    }
  };

  const filteredUsers = useMemo(() => {
    return db.users.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            user.email.toLowerCase().includes(searchQuery.toLowerCase());
      const displayRole = getDisplayRole(user.roles);
      const matchesRole = roleFilter === 'All Roles' || displayRole === roleFilter;
      return matchesSearch && matchesRole;
    });
  }, [db.users, searchQuery, roleFilter]);

  const handleRoleChange = useCallback((userId: string, newRole: Role) => {
    const user = db.users.find(u => u.id === userId);
    if (!user) return;

    // We keep READER and append the new role (if it's not READER)
    const newRoles: Role[] = newRole === 'READER' ? ['READER'] : [newRole, 'READER'];
    
    const uid = Math.random().toString(36).substring(2, 9);
    const ts = new Date().toISOString();

    setDb(prev => ({
      ...prev,
      users: prev.users.map(u => u.id === userId ? { ...u, roles: newRoles } : u),
      auditLogs: [
        {
          id: `audit_${uid}`,
          actorId: 'user_admin', // Assuming current user is admin
          action: 'ROLE_UPDATED',
          targetType: 'USER',
          targetId: userId,
          timestamp: ts,
          description: `Updated role to ${newRole}`
        },
        ...prev.auditLogs
      ]
    }));
  }, [db.users, setDb]);

  return (
    <div className="flex-1 w-full">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-stack-md gap-4">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface">User Management</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-2 max-w-2xl">
            Oversee editorial access, manage scholarly contributor roles, and monitor authentication statuses across the GreatGod platform.
          </p>
        </div>
        <div className="flex-shrink-0">
          <button onClick={() => setIsModalOpen(true)} className="bg-primary-container text-on-error font-label-sm text-label-sm py-2 px-6 rounded-lg flex items-center gap-2 hover:bg-primary transition-colors shadow-sm border border-transparent">
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>person_add</span>
            Invite New User
          </button>
        </div>
      </div>

      {/* Toolbar / Filters */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-4 mb-6 flex flex-col sm:flex-row gap-4 items-center justify-between shadow-sm">
        <div className="relative w-full sm:w-96">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary" style={{ fontSize: '20px' }}>search</span>
          <input 
            className="w-full pl-10 pr-4 py-2 bg-surface rounded border border-outline-variant focus:border-primary-container focus:ring-1 focus:ring-primary-container font-body-md text-body-md text-on-surface placeholder-secondary focus:outline-none transition-shadow" 
            placeholder="Search by name or email..." 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-3 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0 hide-scrollbar">
          <select 
            className="bg-surface border border-outline-variant rounded py-2 px-3 font-label-sm text-label-sm text-on-surface focus:border-primary-container focus:ring-1 focus:ring-primary-container focus:outline-none"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option>All Roles</option>
            <option>Administrator</option>
            <option>Editor</option>
            <option>Moderator</option>
            <option>Author</option>
            <option>Reader</option>
          </select>
          <select className="bg-surface border border-outline-variant rounded py-2 px-3 font-label-sm text-label-sm text-on-surface focus:border-primary-container focus:ring-1 focus:ring-primary-container focus:outline-none">
            <option>All Statuses</option>
            <option>Active</option>
            <option>Suspended</option>
          </select>
        </div>
      </div>

      {/* Data Table Container */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left whitespace-nowrap">
            <thead className="bg-surface-container-low border-b border-outline-variant">
              <tr>
                <th className="w-12 pl-6 py-4 font-label-sm text-label-sm text-secondary uppercase tracking-wider font-semibold"></th>
                <th className="py-4 font-label-sm text-label-sm text-secondary uppercase tracking-wider font-semibold">Name</th>
                <th className="py-4 font-label-sm text-label-sm text-secondary uppercase tracking-wider font-semibold">Email Address</th>
                <th className="py-4 font-label-sm text-label-sm text-secondary uppercase tracking-wider font-semibold">Assigned Role</th>
                <th className="py-4 font-label-sm text-label-sm text-secondary uppercase tracking-wider font-semibold">Verification</th>
                <th className="py-4 font-label-sm text-label-sm text-secondary uppercase tracking-wider font-semibold">Status</th>
                <th className="py-4 pr-6 text-right font-label-sm text-label-sm text-secondary uppercase tracking-wider font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant bg-surface-container-lowest font-body-md text-body-md text-on-surface">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-secondary">
                    No users found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredUsers.map(user => {
                  const displayRole = getDisplayRole(user.roles);
                  const icon = getRoleIcon(displayRole);
                  const initials = user.name.split(' ').map(n => n[0]).join('').substring(0,2).toUpperCase();
                  
                  return (
                    <tr key={user.id} className="hover:bg-surface-bright transition-colors group">
                      <td className="pl-6 py-4">
                        <div className="w-10 h-10 rounded-full bg-surface-variant border border-outline-variant overflow-hidden flex items-center justify-center text-secondary font-headline-md text-[18px]">
                          {user.avatarUrl ? (
                            <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
                          ) : (
                            initials
                          )}
                        </div>
                      </td>
                      <td className="py-4 font-medium">{user.name}</td>
                      <td className="py-4 text-on-surface-variant text-[15px]">{user.email}</td>
                      <td className="py-4">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-surface-container-high text-on-surface font-label-sm text-label-sm border border-outline-variant">
                          <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>{icon}</span>
                          {displayRole}
                        </span>
                      </td>
                      <td className="py-4">
                        <span className="font-label-sm text-[11px] uppercase tracking-wider px-2 py-1 rounded-full bg-tertiary-container/20 text-tertiary border border-tertiary-container/30 font-semibold">
                          Verified
                        </span>
                      </td>
                      <td className="py-4">
                        <span className="font-label-sm text-[11px] uppercase tracking-wider px-2 py-1 rounded-full bg-[#E8F5E9] text-[#2E7D32] border border-[#C8E6C9] font-semibold">
                          Active
                        </span>
                      </td>
                      <td className="py-4 pr-6 text-right relative">
                        <select 
                          className="opacity-0 group-hover:opacity-100 focus:opacity-100 bg-surface border border-outline-variant rounded py-1 px-2 font-label-sm text-label-sm text-on-surface focus:outline-none absolute right-6 top-1/2 -translate-y-1/2 w-32"
                          value={user.roles.includes('ADMIN') ? 'ADMIN' : user.roles.includes('EDITOR') ? 'EDITOR' : user.roles.includes('MODERATOR') ? 'MODERATOR' : user.roles.includes('AUTHOR') ? 'AUTHOR' : 'READER'}
                          onChange={(e) => handleRoleChange(user.id, e.target.value as Role)}
                        >
                          <option value="ADMIN">Make Admin</option>
                          <option value="EDITOR">Make Editor</option>
                          <option value="MODERATOR">Make Moderator</option>
                          <option value="AUTHOR">Make Author</option>
                          <option value="READER">Make Reader</option>
                        </select>
                        {/* Placeholder icon that gets hidden by the select in a real advanced UI, but here we just use the select directly for simplicity */}
                        <div className="opacity-100 group-hover:opacity-0 pointer-events-none transition-opacity text-secondary flex justify-end items-center h-full">
                           <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>more_vert</span>
                        </div>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Footer */}
        <div className="border-t border-outline-variant bg-surface-container-low px-6 py-3 flex items-center justify-between">
          <span className="font-label-sm text-label-sm text-secondary">
            Showing {filteredUsers.length} users
          </span>
        </div>
      </div>

      {/* Invite User Modal */}
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
              <h3 className="font-headline-md text-primary">Invite New User</h3>
              <button 
                type="button" 
                onClick={() => setIsModalOpen(false)}
                className="text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low p-2 rounded-full transition-colors flex items-center justify-center"
                aria-label="Close modal"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            {errorMsg && <div className="mb-4 p-3 bg-error-container text-on-error-container rounded text-sm">{errorMsg}</div>}
            {successMsg && <div className="mb-4 p-3 bg-tertiary-container text-on-tertiary-container rounded text-sm">{successMsg}</div>}
            <form onSubmit={handleInviteSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block font-label-sm text-outline mb-1">Full Name</label>
                <input 
                  type="text" 
                  value={newName} 
                  onChange={e => setNewName(e.target.value)}
                  className="w-full p-2 bg-surface-bright border border-outline rounded"
                  required
                />
              </div>
              <div>
                <label className="block font-label-sm text-outline mb-1">Email Address</label>
                <input 
                  type="email" 
                  value={newEmail} 
                  onChange={e => setNewEmail(e.target.value)}
                  className="w-full p-2 bg-surface-bright border border-outline rounded"
                  required
                />
              </div>
              <div>
                <label className="block font-label-sm text-outline mb-1">Initial Password</label>
                <input 
                  type="password" 
                  value={newPassword} 
                  onChange={e => setNewPassword(e.target.value)}
                  className="w-full p-2 bg-surface-bright border border-outline rounded"
                  required
                />
              </div>
              <div>
                <label className="block font-label-sm text-outline mb-1">Primary Role</label>
                <select 
                  value={newRole} 
                  onChange={e => setNewRole(e.target.value as Role)}
                  className="w-full p-2 bg-surface-bright border border-outline rounded"
                  required
                >
                  <option value="READER">Reader</option>
                  <option value="AUTHOR">Author</option>
                  <option value="MODERATOR">Moderator</option>
                  <option value="EDITOR">Editor</option>
                  <option value="ADMIN">Administrator</option>
                </select>
              </div>
              <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-outline-variant">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2 font-label-sm text-secondary border border-outline hover:bg-surface-container rounded-lg transition-colors">Cancel</button>
                <button type="submit" className="px-6 py-2 font-label-sm bg-primary text-on-primary rounded-lg hover:bg-primary-fixed-variant transition-colors shadow-sm">Invite</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
