"use client";

import React, { useState } from 'react';
import Link from 'next/link'; // Added Link import

export default function HostingRequest() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const formData = new FormData(e.currentTarget);
    formData.append("access_key", "93da8b2b-576a-40f4-b623-9beeb32cf0b5"); 

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
      const data = await response.json();
      if (data.success) setStatus("success");
      else setStatus("error");
    } catch (err) {
      setStatus("error");
    }
  }

  // Mobile-first styles
  const inputStyle = "w-full bg-white/5 border border-white/50 rounded-2xl px-5 py-4 text-[16px] md:text-sm text-white placeholder:text-gray-100 focus:outline-none focus:border-[#D1A546]/50 focus:ring-1 focus:ring-[#D1A546]/20 transition-all focus:bg-white/10 appearance-none";
  const labelStyle = "text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-[#D1A546] font-bold mb-2 block ml-1";

  return (
    <main className="relative z-10 pt-32 pb-20 px-4 md:px-6 min-h-screen">
      <div className="max-w-3xl mx-auto">
        
        {/* --- ADDED BACK BUTTON --- */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-gray-200 hover:text-[#D1A546] transition-colors mb-12 group"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="group-hover:-translate-x-1 transition-transform">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold italic">Back to Home</span>
        </Link>

        {/* Header - Scaled for Mobile */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-[#D1A546] font-bold tracking-[0.3em] md:tracking-[0.4em] uppercase text-[9px] md:text-[13px] mb-8 italic">Partnership Application form</h2>
          <h1 className="font-mortend text-2xl md:text-5xl uppercase italic mb-8 md:mb-8">
            Host a <span className="text-gray-500">Qualifier</span>
          </h1>
          <p className="text-gray-300 text-[10px] md:text-xs tracking-[0.15em] uppercase italic max-w-xl mx-auto leading-relaxed px-4">
            exclusivity • prestige • community
          </p>
        </div>

        {/* Form Container - Optimized Padding for Mobile */}
        <div className="bg-[#3A0353]/30 backdrop-blur-2xl border border-white/20 rounded-4xl md:rounded-[2.5rem] p-6 md:p-12 shadow-2xl relative">
          
          {status === "success" ? (
            <div className="py-16 text-center animate-in fade-in zoom-in duration-500">
              <div className="w-16 h-16 bg-[#D1A546]/40 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#D1A546" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <h3 className="font-mortend text-lg md:text-xl uppercase italic mb-2 text-white">Application Sent</h3>
              <p className="text-gray-300 text-[18px] italic">We will review your request and reach out within 48 hours with all the necessary information.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
              
              {/* SECTION 1 */}
              <div className="space-y-5">
                <div className="border-b border-white/20 pb-2 mb-4">
                  <span className="text-[13px] font-mortend italic text-white/80 uppercase tracking-[0.2em]">01. Personal Info</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className={labelStyle}>Full Name</label>
                    <input type="text" name="name" required placeholder="Name" className={inputStyle} />
                  </div>
                  <div>
                    <label className={labelStyle}>Email Address</label>
                    <input type="email" name="email" required placeholder="email@example.com" className={inputStyle} />
                  </div>
                </div>
              </div>

              {/* SECTION 2 */}
              <div className="space-y-5 pt-4">
                <div className="border-b border-white/20 pb-2 mb-4">
                  <span className="text-[13px] font-mortend italic text-white/80 uppercase tracking-[0.2em]">02. Event Profile</span>
                </div>
                <div>
                  <label className={labelStyle}>Festival/Event Name</label>
                  <input type="text" name="festival" required placeholder="e.g. Bachata Gala" className={inputStyle} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className={labelStyle}>City</label>
                    <input type="text" name="city" required placeholder="e.g. Timișoara" className={inputStyle} />
                  </div>
                  <div>
                    <label className={labelStyle}>Proposed Month</label>
                    <select name="month" className={inputStyle}>
                      <option className="bg-black" value="any">Select Month</option>
                      <option className="bg-black" value="jan-mar">Jan - Mar</option>
                      <option className="bg-black" value="apr-jun">Apr - Jun</option>
                      <option className="bg-black" value="jul-sep">Jul - Sep</option>
                      <option className="bg-black" value="oct-dec">Oct - Dec</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* SECTION 3 */}
              <div className="space-y-5 pt-4">
                <div className="border-b border-white/20 pb-2 mb-4">
                  <span className="text-[13px] font-mortend italic text-white/80 uppercase tracking-[0.2em]">03. Socials & Message</span>
                </div>
                <div>
                  <label className={labelStyle}>Instagram / Website</label>
                  <input type="url" name="link" required placeholder="https://..." className={inputStyle} />
                </div>
                <div>
                  <label className={labelStyle}>Vision</label>
                  <textarea name="vision" rows={3} required placeholder="Why your city?" className={`${inputStyle} resize-none`} />
                </div>
              </div>

              {/* Submit Button - Large and Tappable */}
              <div className="pt-6">
                <button 
                  disabled={status === "sending"}
                  type="submit" 
                  className="w-full relative p-[1.5px] rounded-2xl bg-linear-to-r from-[#D1A546] via-white to-[#D1A546] active:scale-[0.96] transition-transform duration-200"
                >
                  <div className="bg-[#3A0353] py-5 rounded-[calc(1rem+2px)] flex items-center justify-center">
                    <span className="text-white text-[11px] font-black uppercase tracking-[0.25em] italic">
                      {status === "sending" ? "Sending Application..." : "Submit Application"}
                    </span>
                  </div>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}