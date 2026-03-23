"use client";

import React, { useState } from 'react';
import { supabase } from '../../utils/supabase'; // Adjust path if necessary
import { useRouter } from 'next/navigation';

export default function UpdatePasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // New state for visibility
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const titleFont = "font-mortend tracking-tighter italic uppercase";
  const inputStyle = "w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-white focus:border-[#D1A546] outline-none transition-all placeholder:text-gray-600 pr-12";

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({ password });

      if (error) throw error;

      alert("Password updated successfully!");
      router.push('/dashboard'); // Send them to the dashboard once done
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black flex items-center justify-center p-6 font-sans">
      <div className="w-full max-w-md bg-[#0D0D0D] border border-white/5 p-10 rounded-[40px] shadow-2xl">
        
        <div className="mb-10 text-center">
          <h1 className={`${titleFont} text-2xl text-white mb-2`}>
            Reset <span className="text-[#D1A546]">Password</span>
          </h1>
          <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-bold">
            Enter your new security credentials
          </p>
        </div>

        <form onSubmit={handleUpdate} className="space-y-6">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] uppercase tracking-widest font-bold p-3 rounded-lg text-center">
              {error}
            </div>
          )}

          <div className="space-y-2 relative">
            <label className="text-[10px] text-gray-400 uppercase tracking-widest ml-1">New Password</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="••••••••"
                className={inputStyle}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)} 
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-[#D1A546] transition-colors"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div className="space-y-2 relative">
            <label className="text-[10px] text-gray-400 uppercase tracking-widest ml-1">Confirm New Password</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="••••••••"
                className={inputStyle}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-[#D1A546] text-black rounded-2xl font-bold text-[11px] uppercase tracking-[0.2em] hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:hover:scale-100 mt-4 shadow-[0_0_20px_rgba(209,165,70,0.2)]"
          >
            {loading ? "Updating..." : "Secure Account"}
          </button>
        </form>
      </div>
    </main>
  );
}