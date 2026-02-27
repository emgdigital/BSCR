"use client";

import React, { useEffect, useState, useCallback, useRef } from 'react';
import { supabase } from '../../utils/supabase';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [backupUser, setBackupUser] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const titleFont = "font-mortend tracking-tighter italic uppercase";
  const bodyFont = "font-sans";
  const labelStyle = "text-[12px] text-gray-400 uppercase tracking-widest mb-2";
  const valueStyle = "text-sm text-gray-300 capitalize";
  const inputStyle = "w-full bg-white/5 border border-white/10 rounded-lg p-2 text-sm text-white focus:border-[#D1A546] outline-none transition-all";

  const handleLogout = useCallback(async () => {
    await supabase.auth.signOut();
    router.push('/register');
  }, [router]);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!event.target.files || event.target.files.length === 0) return;
      const file = event.target.files[0];

      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        alert("Please upload a JPG, PNG, or WebP image.");
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        alert("Image too large. Please keep it under 2MB.");
        return;
      }

      setUploading(true);
      
      const { data: { session } } = await supabase.auth.getSession();
      const userId = session?.user?.id;

      if (!userId) {
        alert("Session expired. Please log in again.");
        return;
      }
      
      const fileExt = file.name.split('.').pop();
      const fileName = `${userId}-${Date.now()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      const { error: updateError } = await supabase
        .from('registrations')
        .update({ profile_image_url: publicUrl })
        .eq('id', userId);

      if (updateError) throw updateError;

      setUser((prev: any) => ({ ...prev, profile_image_url: publicUrl }));
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      
    } catch (error: any) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteAccount = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    const userId = user?.id || session?.user?.id;

    if (!userId) {
      alert("User ID not found. Please try logging in again.");
      return;
    }

    const confirmed = window.confirm("Are you sure? This will permanently delete your profile.");
    if (!confirmed) return;

    setLoading(true);
    const { error } = await supabase
      .from('registrations')
      .delete()
      .eq('id', userId);

    if (error) {
      alert(error.message);
      setLoading(false);
    } else {
      await supabase.auth.signOut();
      router.push('/register');
    }
  };

  const handleEdit = () => {
    setBackupUser({ ...user });
    setIsEditing(true);
  };

  const handleCancel = () => {
    setUser(backupUser);
    setIsEditing(false);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const userId = session?.user?.id;

      if (!userId) throw new Error("Could not identify user ID.");

      const { error } = await supabase
        .from('registrations')
        .update({
          full_name: user.full_name,
          city: user.city,
          country: user.country,
          phone: user.phone,
          birthdate: user.birthdate,
          role: user.role,
          years_dancing: user.years_dancing,
          instagram: user.instagram
        })
        .eq('id', userId);

      if (error) throw error;

      setIsEditing(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          router.push('/register');
          return;
        }

        const { data, error } = await supabase
          .from('registrations')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (error) {
          console.error("Fetch error:", error.message);
        } else {
          setUser(data);
        }
      } catch (err) {
        console.error("Unexpected error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  if (loading) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="w-6 h-6 border border-[#D1A546] border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <main className={`min-h-screen bg-[#0D0D0D]/50 text-white pb-20 ${bodyFont}`}>
      
      {showSuccess && (
        <div className="fixed top-10 left-1/2 -translate-x-1/2 z-100 bg-[#D1A546] text-black px-6 py-3 rounded-full font-bold uppercase tracking-widest text-xs shadow-[0_0_20px_rgba(209,165,70,0.4)] animate-bounce">
          Profile Updated Successfully
        </div>
      )}

      <div className="relative h-48 md:h-64 w-full bg-linear-to-b from-[#3A0353] to-[#0D0D0D] overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent" />
      </div>

      <div className="max-w-5xl mx-auto px-6 -mt-16 md:-mt-20 relative z-10">
        <div className="flex flex-col md:flex-row items-center md:items-end gap-6">
          <div className="relative group">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-[#D1A546] overflow-hidden bg-[#222] shadow-[0_0_30px_rgba(58,3,83,0.5)] relative">
              <img 
                src={user?.profile_image_url || "https://res.cloudinary.com/placeholder-athlete-image.jpg"} 
                className={`w-full h-full object-cover ${uploading ? 'opacity-30' : 'opacity-100'} transition-opacity`} 
                alt="Athlete Profile" 
              />
              {uploading && (
                <div className="absolute inset-0 flex items-center justify-center">
                   <div className="w-5 h-5 border-2 border-[#D1A546] border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </div>
            
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleImageUpload} 
              accept=".jpg,.jpeg,.png,.webp" 
              className="hidden" 
            />
            
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="absolute -bottom-2 right-2 bg-[#D1A546] p-2.5 rounded-full text-black shadow-lg hover:scale-110 transition-transform active:scale-95 z-20"
              title="Change Photo"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
            </button>
          </div>

          <div className="text-center md:text-left pb-2">
            {isEditing ? (
              <input 
                className={`${titleFont} text-2xl bg-transparent border-b border-[#D1A546] outline-none mb-2 text-center md:text-left w-full max-w-md`}
                value={user?.full_name || ''}
                onChange={(e) => setUser({...user, full_name: e.target.value})}
              />
            ) : (
              <h1 className={`${titleFont} text-2xl md:text-4xl text-white mb-2`}>
                {user?.full_name || 'Participant'}
              </h1>
            )}
            <div className="inline-flex items-center gap-2 bg-black/40 backdrop-blur-md border border-[#D1A546]/30 px-3 py-1.5 rounded-xl">
              <span className="text-[10px] uppercase tracking-widest font-bold text-[#D1A546]">
                {user?.city ? `${user.city}, ` : ''}{user?.country || 'Location TBD'}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-12">
          <div className="lg:col-span-2 space-y-6">
            <section className="bg-[#3a0353]/50 border border-white/5 p-8 rounded-4xl">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D1A546" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  <h3 className="uppercase tracking-[0.2em] text-xs font-bold text-gray-400">Personal Information</h3>
                </div>
                <div className="flex gap-2">
                  {!isEditing ? (
                    <button 
                      onClick={handleEdit}
                      className="text-[10px] border border-white/10 px-4 py-2 rounded-full uppercase tracking-widest text-[#D1A546] font-bold hover:bg-white/5 transition-all"
                    >
                      Edit Profile
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <button 
                        onClick={handleCancel}
                        className="text-[10px] border border-white/10 px-4 py-2 rounded-full uppercase tracking-widest text-gray-400 font-bold hover:bg-white/5 transition-all"
                      >
                        Cancel
                      </button>
                      <button 
                        onClick={handleSave}
                        className="text-[10px] bg-[#D1A546] px-4 py-2 rounded-full uppercase tracking-widest text-black font-bold hover:opacity-90 transition-all"
                      >
                        Save Changes
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
                <div>
                  <p className={labelStyle}>Location</p>
                  {isEditing ? (
                    <div className="flex gap-2">
                      <input className={inputStyle} value={user?.city || ''} onChange={(e) => setUser({...user, city: e.target.value})} placeholder="City" />
                      <input className={inputStyle} value={user?.country || ''} onChange={(e) => setUser({...user, country: e.target.value})} placeholder="Country" />
                    </div>
                  ) : (
                    <p className={valueStyle}>{user?.city ? `${user.city}, ` : ''}{user?.country}</p>
                  )}
                </div>

                <div>
                  <p className={labelStyle}>Email Address</p>
                  <p className="text-sm text-gray-300">{user?.email}</p>
                </div>

                <div>
                  <p className={labelStyle}>Date of Birth</p>
                  {isEditing ? (
                    <input type="date" className={inputStyle} value={user?.birthdate || ''} onChange={(e) => setUser({...user, birthdate: e.target.value})} />
                  ) : (
                    <p className={valueStyle}>{user?.birthdate || 'Not provided'}</p>
                  )}
                </div>

                <div>
                  <p className={labelStyle}>Phone</p>
                  {isEditing ? (
                    <input className={inputStyle} value={user?.phone || ''} onChange={(e) => setUser({...user, phone: e.target.value})} />
                  ) : (
                    <p className={valueStyle}>{user?.phone || 'Not provided'}</p>
                  )}
                </div>
              </div>

              <div className="pt-8 mt-8 border-t border-white/5">
                <p className="text-[12px] text-gray-400 uppercase tracking-widest mb-6">Dance & Socials</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-y-8 gap-x-12">
                  <div>
                    <p className={labelStyle}>Dance Role</p>
                    {isEditing ? (
                      <select className={inputStyle} value={user?.role || ''} onChange={(e) => setUser({...user, role: e.target.value})}>
                        <option value="Lead">Lead</option>
                        <option value="Follow">Follow</option>
                        <option value="Both">Both</option>
                      </select>
                    ) : (
                      <p className="text-xs font-bold text-[#D1A546] uppercase tracking-wider">{user?.role || 'N/A'}</p>
                    )}
                  </div>
                  <div>
                    <p className={labelStyle}>Experience (Years)</p>
                    {isEditing ? (
                      <input type="number" className={inputStyle} value={user?.years_dancing || ''} onChange={(e) => setUser({...user, years_dancing: e.target.value})} />
                    ) : (
                      <p className="text-xs font-bold text-white uppercase tracking-wider">{user?.years_dancing} {user?.years_dancing === 1 ? 'Year' : 'Years'}</p>
                    )}
                  </div>
                  <div>
                    <p className={labelStyle}>Instagram</p>
                    {isEditing ? (
                      <input className={inputStyle} value={user?.instagram || ''} onChange={(e) => setUser({...user, instagram: e.target.value})} />
                    ) : (
                      <p className="text-xs font-bold text-[#D1A546] uppercase tracking-wider">{user?.instagram || 'N/A'}</p>
                    )}
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-red-950/20 border border-red-500/20 p-8 rounded-4xl">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-red-500/10 rounded-2xl">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="1.5"><path d="M3 6h18m-2 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m-6 5v6m4-6v6"/></svg>
                  </div>
                  <div>
                    <h3 className="text-red-500 font-bold uppercase tracking-wider text-sm mb-1">Delete Account</h3>
                    <p className="text-xs text-gray-500 max-w-sm leading-relaxed">
                      This action is permanent. Once deleted, your profile data will be removed.
                    </p>
                  </div>
                </div>
                <button 
                  onClick={handleDeleteAccount}
                  className="px-6 py-3 rounded-xl border border-red-500/30 text-red-500 text-[10px] uppercase tracking-widest font-bold hover:bg-red-500 hover:text-white transition-all whitespace-nowrap"
                >
                  Confirm Deletion
                </button>
              </div>
            </section>
          </div>

          <div className="space-y-6">
            <section className="bg-[#3a0353]/50 border border-white/5 p-8 rounded-4xl">
               <h3 className="uppercase tracking-[0.2em] text-[12px] font-bold text-gray-400 mb-6 flex items-center gap-2">
                 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D1A546" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                 Security
               </h3>
               <p className={labelStyle}>Status</p>
               <p className="text-sm font-bold text-[#D1A546]">Verified Dancer</p>
            </section>

            <button 
              onClick={handleLogout}
              className="w-full py-4 rounded-2xl bg-white/5 border border-white/5 text-gray-400 text-[13px] uppercase tracking-[0.2em] font-bold hover:bg-red-500/10 hover:text-red-500 transition-all active:scale-95"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}