'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../components/provider/auth-provider';
import { useDb } from '../../components/provider/db-provider';

export default function ProfilePage() {
  const router = useRouter();
  const { currentUser, isAuthReady } = useAuth();
  const { setDb } = useDb();

  const [isEditing, setIsEditing] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  
  // Profile form state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [bio, setBio] = useState('');

  useEffect(() => {
    if (isAuthReady && !currentUser) {
      router.replace('/sign-in');
    }
  }, [currentUser, isAuthReady, router]);

  if (!isAuthReady || !currentUser) return null;

  const handleEditClick = () => {
    setFirstName(currentUser.firstName || '');
    setLastName(currentUser.lastName || '');
    setDisplayName(currentUser.displayName || currentUser.name || '');
    setEmail(currentUser.email || '');
    setDateOfBirth(currentUser.dateOfBirth || '');
    setGender(currentUser.gender || '');
    setCountry(currentUser.country || '');
    setCity(currentUser.city || '');
    setBio(currentUser.bio || '');
    setIsEditing(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg('');
    
    // Update db
    setDb(prev => ({
      ...prev,
      users: prev.users.map(u => u.id === currentUser.id ? {
        ...u,
        firstName,
        lastName,
        displayName,
        name: displayName || `${firstName} ${lastName}`.trim() || u.name,
        email,
        dateOfBirth,
        gender,
        country,
        city,
        bio
      } : u)
    }));
    
    setSuccessMsg('Profile updated successfully.');
    setIsEditing(false);
    
    // Auto-hide success message
    setTimeout(() => {
      setSuccessMsg('');
    }, 3000);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setSuccessMsg('');
  };

  return (
    <div className="flex-grow w-full max-w-3xl mx-auto px-margin-mobile py-stack-lg">
      <div className="mb-6 flex items-center justify-between">
        <h1 id="profile-heading" className="font-headline-lg text-primary">Account & Profile</h1>
        {!isEditing && (
          <button 
            onClick={handleEditClick}
            className="px-4 py-2 font-label-sm text-label-sm uppercase tracking-wider bg-primary-container text-on-primary rounded-lg hover:bg-primary transition-colors flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">edit</span>
            Edit Profile
          </button>
        )}
      </div>
      
      {successMsg && (
        <div className="mb-6 p-4 bg-[#E8F5E9] text-[#2E7D32] border border-[#C8E6C9] rounded-lg text-sm flex items-center gap-2">
          <span className="material-symbols-outlined">check_circle</span>
          {successMsg}
        </div>
      )}

      <div className="bg-surface border border-outline-variant rounded-xl p-6 md:p-8 shadow-sm flex flex-col gap-8">
        
        {/* Avatar Section */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-5 pb-6 border-b border-outline-variant">
          {currentUser.avatarUrl ? (
            <img src={currentUser.avatarUrl} alt="" className="h-20 w-20 rounded-full object-cover border border-outline-variant shrink-0" />
          ) : (
            <div className="h-20 w-20 rounded-full bg-surface-container-highest text-secondary flex items-center justify-center font-headline-md shrink-0" aria-hidden="true">
              {currentUser.name.charAt(0).toUpperCase()}
            </div>
          )}
          <div>
            <h2 className="font-headline-md text-on-surface">{currentUser.name}</h2>
            <p className="font-body-md text-on-surface-variant mb-2">{currentUser.email}</p>
            <div className="flex flex-wrap gap-2">
              {currentUser.roles.map(role => (
                <span key={role} className="rounded-full bg-surface-container-low border border-outline-variant px-2 py-0.5 text-xs font-label-sm text-on-surface uppercase">
                  {role}
                </span>
              ))}
            </div>
          </div>
        </div>

        {isEditing ? (
          <form onSubmit={handleSave} className="flex flex-col gap-6">
            <section>
              <h3 className="font-headline-sm text-primary mb-4 border-b border-outline-variant pb-2">Basic Info</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-label-sm text-outline mb-1">First Name</label>
                  <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} className="w-full p-2 bg-surface-bright border border-outline rounded" />
                </div>
                <div>
                  <label className="block font-label-sm text-outline mb-1">Last Name</label>
                  <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} className="w-full p-2 bg-surface-bright border border-outline rounded" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block font-label-sm text-outline mb-1">Display Name</label>
                  <input type="text" value={displayName} onChange={e => setDisplayName(e.target.value)} className="w-full p-2 bg-surface-bright border border-outline rounded" required />
                </div>
                <div className="sm:col-span-2">
                  <label className="block font-label-sm text-outline mb-1">Email Address</label>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full p-2 bg-surface-bright border border-outline rounded" required disabled />
                  <p className="text-xs text-secondary mt-1">Email address cannot be changed in this prototype.</p>
                </div>
              </div>
            </section>

            <section>
              <h3 className="font-headline-sm text-primary mb-4 border-b border-outline-variant pb-2">Personal Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-label-sm text-outline mb-1">Date of Birth</label>
                  <input type="date" value={dateOfBirth} onChange={e => setDateOfBirth(e.target.value)} className="w-full p-2 bg-surface-bright border border-outline rounded" />
                </div>
                <div>
                  <label className="block font-label-sm text-outline mb-1">Gender</label>
                  <select value={gender} onChange={e => setGender(e.target.value)} className="w-full p-2 bg-surface-bright border border-outline rounded">
                    <option value="">Prefer not to say</option>
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block font-label-sm text-outline mb-1">Country</label>
                  <input type="text" value={country} onChange={e => setCountry(e.target.value)} className="w-full p-2 bg-surface-bright border border-outline rounded" />
                </div>
                <div>
                  <label className="block font-label-sm text-outline mb-1">City</label>
                  <input type="text" value={city} onChange={e => setCity(e.target.value)} className="w-full p-2 bg-surface-bright border border-outline rounded" />
                </div>
              </div>
            </section>

            <section>
              <h3 className="font-headline-sm text-primary mb-4 border-b border-outline-variant pb-2">About Me</h3>
              <div>
                <label className="block font-label-sm text-outline mb-1">Bio</label>
                <textarea rows={4} value={bio} onChange={e => setBio(e.target.value)} placeholder="Write a short biography..." className="w-full p-2 bg-surface-bright border border-outline rounded resize-y" />
              </div>
            </section>

            <div className="flex justify-end gap-4 mt-4 pt-6 border-t border-outline-variant">
              <button type="button" onClick={handleCancel} className="px-6 py-2 font-label-sm text-secondary border border-outline rounded-lg hover:bg-surface-container transition-colors">
                Cancel
              </button>
              <button type="submit" className="px-6 py-2 font-label-sm bg-primary text-on-primary rounded-lg hover:bg-primary-fixed-variant transition-colors shadow-sm">
                Save Changes
              </button>
            </div>
          </form>
        ) : (
          <div className="flex flex-col gap-8">
            <section>
              <h3 className="font-headline-sm text-primary mb-4 border-b border-outline-variant pb-2">Basic Info</h3>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                <div>
                  <dt className="font-label-sm text-outline uppercase tracking-wider text-[11px] mb-1">First Name</dt>
                  <dd className="font-body-md text-on-surface">{currentUser.firstName || <span className="text-secondary italic">Not provided</span>}</dd>
                </div>
                <div>
                  <dt className="font-label-sm text-outline uppercase tracking-wider text-[11px] mb-1">Last Name</dt>
                  <dd className="font-body-md text-on-surface">{currentUser.lastName || <span className="text-secondary italic">Not provided</span>}</dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="font-label-sm text-outline uppercase tracking-wider text-[11px] mb-1">Display Name</dt>
                  <dd className="font-body-md text-on-surface">{currentUser.displayName || currentUser.name}</dd>
                </div>
              </dl>
            </section>
            
            <section>
              <h3 className="font-headline-sm text-primary mb-4 border-b border-outline-variant pb-2">Personal Details</h3>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                <div>
                  <dt className="font-label-sm text-outline uppercase tracking-wider text-[11px] mb-1">Date of Birth</dt>
                  <dd className="font-body-md text-on-surface">{currentUser.dateOfBirth ? new Date(currentUser.dateOfBirth).toLocaleDateString() : <span className="text-secondary italic">Not provided</span>}</dd>
                </div>
                <div>
                  <dt className="font-label-sm text-outline uppercase tracking-wider text-[11px] mb-1">Gender</dt>
                  <dd className="font-body-md text-on-surface capitalize">{currentUser.gender?.toLowerCase() || <span className="text-secondary italic">Not provided</span>}</dd>
                </div>
                <div>
                  <dt className="font-label-sm text-outline uppercase tracking-wider text-[11px] mb-1">Location</dt>
                  <dd className="font-body-md text-on-surface">
                    {[currentUser.city, currentUser.country].filter(Boolean).join(', ') || <span className="text-secondary italic">Not provided</span>}
                  </dd>
                </div>
              </dl>
            </section>

            <section>
              <h3 className="font-headline-sm text-primary mb-4 border-b border-outline-variant pb-2">About Me</h3>
              <div className="font-body-md text-on-surface">
                {currentUser.bio ? (
                  <p className="whitespace-pre-line">{currentUser.bio}</p>
                ) : (
                  <span className="text-secondary italic">No biography provided.</span>
                )}
              </div>
            </section>
          </div>
        )}

      </div>
    </div>
  );
}