"use client";

import "./globals.css";
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { supabase } from '@/utils/supabase'; // Ensure this path is correct

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [showCookies, setShowCookies] = useState(false);
  const [cookieView, setCookieView] = useState<'main' | 'prefs'>('main');
  const [isMenuOpen, setIsMenuOpen] = useState(false); // New state for mobile menu
  const [user, setUser] = useState<any>(null); // Track auth state

  const goldWhiteGold = "bg-gradient-to-r from-[#D1A546] via-white to-[#D1A546]";
  const goldTextClass = `text-transparent bg-clip-text ${goldWhiteGold}`;

  useEffect(() => {
    // Check initial session
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };
    getInitialSession();

    // Listen for auth changes (Login/Logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    const consent = localStorage.getItem('bswc_cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => setShowCookies(true), 2000);
      return () => clearTimeout(timer);
    }

    return () => subscription.unsubscribe();
  }, []);

  const handleConsent = (type: 'all' | 'essential') => {
    localStorage.setItem('bswc_cookie_consent', type);
    setShowCookies(false);
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Format', href: '/format' },
    { name: 'Qualifiers', href: '/qualifiers' },
    { name: 'Winners', href: '/winners' },
    { name: 'Guidelines', href: '/guidelines' },
  ];

  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-black text-white font-sans selection:bg-[#D1A546]/30 overflow-x-hidden antialiased">
        
        {/* --- GLOBAL BACKGROUND LAYER --- */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <Image src="/weblogo2.png" alt="Bachata Background" fill className="object-cover opacity-50 blur-[2px]" priority />
          <div className="absolute inset-0 bg-linear-to-b from-black via-black/50 to-black" />
        </div>

        {/* --- GLOBAL NAVBAR --- */}
        <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-xl border-b border-white/5">
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <a href="/" className="relative h-10 w-32 md:w-44 flex items-center z-50">
              <Image src="/logowebsmall.png" alt="BSWC Logo" fill className="object-contain object-left" />
            </a>

            {/* Desktop Links */}
            <div className="hidden lg:flex gap-8 text-[11px] uppercase tracking-[0.25em] font-semibold text-gray-300">
              {navLinks.map((link) => (
                <a key={link.name} href={link.href} className="hover:text-[#D1A546] transition-all italic underline-offset-8 hover:underline">
                  {link.name}
                </a>
              ))}
              {/* Show Dashboard tab only if user is logged in */}
              {user && (
                <a href="/dashboard" className="text-[#D1A546] hover:text-white transition-all italic underline-offset-8 hover:underline">
                  Dashboard
                </a>
              )}
            </div>

            {/* Desktop Button - Condition applied here */}
            <a 
              href={user ? "/dashboard" : "/register"} 
              className={`hidden lg:flex items-center gap-2 p-px rounded-full ${goldWhiteGold} transition-all hover:shadow-[0_0_20px_rgba(209,165,70,0.4)]`}
            >
              <div className="bg-[#3A0353] px-6 py-2.5 rounded-full flex items-center gap-2">
                {user ? (
                   // Icon for Dashboard (Grid)
                   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D1A546" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                     <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
                   </svg>
                ) : (
                  // FIXED LOCK SVG
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D1A546" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="5" y="11" width="14" height="10" rx="2" ry="2"></rect>
                    <path d="M8 11V7a4 4 0 0 1 8 0v4"></path>
                  </svg>
                )}
                <span className={`text-[10px] font-bold tracking-widest ${goldTextClass}`}>
                  {user ? "DASHBOARD" : "PARTICIPANT LOGIN"}
                </span>
              </div>
            </a>

            {/* Mobile Menu Toggle Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden z-50 p-2 text-gray-300 hover:text-[#D1A546] transition-colors"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {isMenuOpen ? (
                  <path d="M18 6L6 18M6 6l12 12" /> // X icon
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" /> // Hamburger icon
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu Dropdown */}
          <div className={`lg:hidden absolute top-20 left-0 w-full bg-black/95 backdrop-blur-2xl border-b border-white/10 transition-all duration-300 ease-in-out ${isMenuOpen ? 'opacity-100 visible h-auto pb-10' : 'opacity-0 invisible h-0 overflow-hidden'}`}>
            <div className="flex flex-col items-center gap-6 pt-10">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-[12px] uppercase tracking-[0.3em] font-bold text-gray-300 hover:text-[#D1A546]"
                >
                  {link.name}
                </a>
              ))}
              
              {/* Dynamic Mobile Button */}
              <a 
                href={user ? "/dashboard" : "/register"} 
                onClick={() => setIsMenuOpen(false)}
                className={`mt-4 flex items-center gap-2 p-px rounded-full ${goldWhiteGold}`}
              >
                <div className="bg-[#3A0353] px-8 py-3 rounded-full flex items-center gap-2">
                  {user ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D1A546" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    </svg>
                  ) : (
                    // FIXED LOCK SVG FOR MOBILE
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D1A546" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="5" y="11" width="14" height="10" rx="2" ry="2"></rect>
                      <path d="M8 11V7a4 4 0 0 1 8 0v4"></path>
                    </svg>
                  )}
                  <span className={`text-[10px] font-bold tracking-widest ${goldTextClass}`}>
                    {user ? "Dashboard" : "Participants area"}
                  </span>
                </div>
              </a>
            </div>
          </div>
        </nav>

        {/* --- PAGE CONTENT --- */}
        <div className="relative z-10">
          {children}
        </div>

        {/* --- GLOBAL FOOTER --- */}
        <footer className="relative z-10 border-t border-white/5 bg-black/50 backdrop-blur-sm py-12 mt-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-start gap-8 text-left">
              <div>
                <div className="mb-2">
                  <span className="text-white font-light tracking-[0.4em] uppercase text-xs">
                    Bachata <span className="text-[#D1A546] italic">Social Cup Romania</span>
                  </span>
                </div>
                <p className="text-[9px] tracking-[0.2em] uppercase text-gray-500">&copy; 2026 All rights reserved.</p>
              </div>

              <nav className="flex flex-row mt-7 gap-10">
                <a href="#" className="text-[9px] uppercase tracking-[0.2em] text-gray-500 hover:text-[#D1A546]">Privacy Policy</a>
                <a href="#" className="text-[9px] uppercase tracking-[0.2em] text-gray-500 hover:text-[#D1A546]">Terms & Conditions</a>
              </nav>

              <div className="flex gap-6 mt-7">
                <a href="https://instagram.com/bachatasocialcup.ro" target="_blank" className="text-gray-500 hover:text-white">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                  </svg>
                </a>
              </div>
            </div>
            
            <div className="mt-10 pt-8 border-t border-white/5 flex flex-col items-start gap-8">
              <div className="flex flex-col md:flex-row justify-start gap-4 w-full md:w-auto">
                <a href="https://anpc.ro/ce-este-sal/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-start justify-center px-8 py-3 border border-white/5 rounded-xl hover:border-[#D1A546]/30 transition-all min-w-60">
                  <span className="text-[7px] tracking-[0.2em] text-gray-600 uppercase mb-1">Protecția Consumatorului</span>
                  <span className="text-[10px] tracking-[0.3em] text-gray-400 font-light uppercase">A.N.P.C. — SAL</span>
                </a>
                <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-start justify-center px-8 py-3 border border-white/5 rounded-xl hover:border-[#D1A546]/30 transition-all min-w-60">
                  <span className="text-[7px] tracking-[0.2em] text-gray-600 uppercase mb-1">Soluționarea Online</span>
                  <span className="text-[10px] tracking-[0.3em] text-gray-400 font-light uppercase">A.N.P.C. — SOL</span>
                </a>
              </div>
              <p className="text-[8px] tracking-[0.5em] uppercase text-gray-700 italic text-left">Evolution through movement and art</p>
            </div>
          </div>
        </footer>

        {/* --- GLOBAL GDPR COOKIE BANNER --- */}
        {showCookies && (
          <div className="fixed bottom-6 left-6 right-6 md:right-auto md:w-95 z-9999 animate-in fade-in slide-in-from-bottom-10 duration-700">
            <div className="relative bg-[#0a0a0a]/95 border border-white/10 p-6 md:p-8 rounded-4xl shadow-[0_20px_50px_rgba(0,0,0,0.7)] backdrop-blur-2xl">
              
              {cookieView === 'main' ? (
                <>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#D1A546] animate-pulse" />
                    <h4 className="font-mortend text-[9px] uppercase tracking-[0.3em] text-white italic">Privacy Preference</h4>
                  </div>
                  
                  <p className="text-gray-400 text-[11px] leading-relaxed mb-8 italic">
                    We use cookies to optimize your experience and analyze our traffic. You can choose to accept all or manage your settings.
                  </p>

                  <div className="flex flex-col gap-3">
                    <button 
                      onClick={() => handleConsent('all')}
                      className={`group/btn relative p-px rounded-xl ${goldWhiteGold} transition-transform active:scale-95`}
                    >
                      <div className="bg-[#3A0353] group-hover/btn:bg-transparent py-3.5 rounded-xl flex justify-center transition-colors">
                        <span className="text-white text-[10px] font-black uppercase tracking-widest">Accept All</span>
                      </div>
                    </button>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <button 
                        onClick={() => handleConsent('essential')}
                        className="bg-white/5 hover:bg-white/10 text-gray-400 py-3 rounded-xl text-[9px] font-bold uppercase tracking-widest transition-colors border border-white/5"
                      >
                        Reject All
                      </button>
                      <button 
                        onClick={() => setCookieView('prefs')}
                        className="bg-white/5 hover:bg-white/10 text-gray-400 py-3 rounded-xl text-[9px] font-bold uppercase tracking-widest transition-colors border border-white/5"
                      >
                        Settings
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <h4 className="font-mortend text-[9px] uppercase tracking-[0.3em] text-white italic mb-6">Preference Center</h4>
                  
                  <div className="space-y-5 mb-10">
                    <div className="flex justify-between items-center opacity-60">
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase text-white font-bold tracking-tight">Essential</span>
                        <span className="text-[8px] text-gray-500 uppercase">Always active</span>
                      </div>
                      <div className="w-8 h-4 bg-[#D1A546]/40 rounded-full relative">
                        <div className="absolute right-1 top-1 w-2 h-2 bg-white rounded-full" />
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase text-white font-bold tracking-tight">Analytics</span>
                        <span className="text-[8px] text-gray-500 uppercase">Performance tracking</span>
                      </div>
                      <div className="w-8 h-4 bg-white/10 rounded-full relative border border-white/10">
                        <div className="absolute left-1 top-1 w-2 h-2 bg-gray-600 rounded-full" />
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => setCookieView('main')}
                    className="w-full text-[9px] uppercase text-[#D1A546] font-black tracking-[0.2em] hover:text-white transition-colors"
                  >
                    ← Back to selection
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </body>
    </html>
  );
}
