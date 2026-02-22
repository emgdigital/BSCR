"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link'; // Added Link import

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showCookies, setShowCookies] = useState(false);
  
  const [timeLeft, setTimeLeft] = useState({
    days: 0, hours: 0, minutes: 0, seconds: 0
  });

  useEffect(() => {
    const targetDate = new Date("April 3, 2026 00:00:00").getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      setTimeLeft({
        days: Math.max(0, Math.floor(distance / (1000 * 60 * 60 * 24))),
        hours: Math.max(0, Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))),
        minutes: Math.max(0, Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))),
        seconds: Math.max(0, Math.floor((distance % (1000 * 60)) / 1000)),
      });

      if (distance < 0) clearInterval(interval);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShowCookies(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/home' },
    { name: 'Format', href: '/format' },
    { name: 'Qualifiers', href: '/qualifiers' },
    { name: 'Winners', href: '/winners' },
    { name: 'Guidelines', href: '/guidelines' },
    { name: 'Contact us', href: '#' },
  ];

  const goldWhiteGold = "bg-gradient-to-r from-[#D1A546] via-white to-[#D1A546]";
  const goldTextClass = `text-transparent bg-clip-text ${goldWhiteGold}`;

  const competitorSteps = [
    { 
      title: "Choose Event", 
      desc: "Pick your city", 
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
    },
    { 
      title: "Compete", 
      desc: "Dance your heart out", 
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
    },
    { 
      title: "Qualify", 
      desc: "Top 3 per qualifier", 
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>
    },
    { 
      title: "Finals Romania", 
      desc: "Victory awaits", 
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-[#D1A546]/30 overflow-x-hidden relative scroll-smooth">
      
      {/* --- BACKGROUND LAYER --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Image src="/weblogo2.png" alt="Bachata Background" fill className="object-cover opacity-50 blur-[2px]" priority />
        <div className="absolute inset-0 bg-linear-to-b from-black via-black/50 to-black" />
      </div>

      {/* --- NAVBAR --- */}
      <nav className="fixed top-0 w-full z-50 bg-black/60 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="relative h-10 w-32 md:w-44 flex items-center">
            <Image src="/logowebsmall.png" alt="BSWC Logo" fill className="object-contain object-left" />
          </div>

          <div className="hidden lg:flex gap-8 text-[11px] uppercase tracking-[0.25em] font-semibold text-gray-300">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="hover:text-[#D1A546] transition-all italic underline-offset-8 hover:underline">{link.name}</a>
            ))}
          </div>

          <button className={`hidden lg:flex items-center gap-2 p-px rounded-full ${goldWhiteGold} transition-all hover:shadow-[0_0_20px_rgba(97,7,170,0.8)]`}>
            <div className="bg-[#3A0353] px-6 py-2.5 rounded-full flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D1A546" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              <span className={`text-[10px] font-bold tracking-widest ${goldTextClass}`}>PARTICIPANT LOGIN</span>
            </div>
          </button>

          <button className="lg:hidden text-[#D1A546] text-2xl" onClick={() => setIsMenuOpen(true)}>☰</button>
        </div>
      </nav>

      {/* --- HERO CONTENT --- */}
      <main className="relative z-10 pt-48 pb-20 flex flex-col items-center justify-center px-6 text-center min-h-screen">
        
        <div className="inline-block px-6 py-2 border-2 border-[#3A0353] rounded-sm mb-10 bg-[#6107AA]/5 shadow-[0_0_15px_rgba(97,7,170,0.6)]">
          <h2 className="text-white tracking-[0.5em] font-bold uppercase text-[10px] md:text-xs">
            Bachata Romanian Internal League 2026
          </h2>
        </div>

        <h1 className="font-mortend text-2xl md:text-[5rem] font-black mb-12 italic uppercase leading-[0.9] tracking-tighter pt-8 overflow-visible select-none">
          <span className="text-transparent bg-clip-text bg-linear-to-b from-white to-[#3A0353] block px-4 py-2">
            Bachata Social Cup
          </span>
          <span className="font-mortend bg-clip-text text-white block px-4 py-2">
            Romania
          </span>
        </h1>

        {/* COUNTDOWN */}
        <div className="flex gap-4 md:gap-10 justify-center mb-16 flex-wrap">
          {[
            { label: 'Days', value: timeLeft.days },
            { label: 'Hours', value: timeLeft.hours },
            { label: 'Min', value: timeLeft.minutes },
            { label: 'Sec', value: timeLeft.seconds }
          ].map((unit) => (
            <div key={unit.label} className="flex flex-col items-center min-w-17.5">
              <span className="text-2xl md:text-4xl font-black text-white">{unit.value}</span>
              <span className="text-[11px] uppercase tracking-widest text-[#D1A546] font-bold">{unit.label}</span>
            </div>
          ))}
        </div>

        <button className={`relative p-[1.5px] rounded-full ${goldWhiteGold} transition-all hover:scale-105 hover:shadow-[0_0_25px_rgba(97,7,170,0.9)] active:scale-95`}>
          <div className="bg-[#3A0353] py-4 px-12 rounded-full">
            <span className={`text-[12px] font-black uppercase italic tracking-widest ${goldTextClass}`}>
              Register for Qualifiers
            </span>
          </div>
        </button>

        {/* EXPLORE CONCEPT SECTION */}
        <div className="flex flex-col items-center mt-20">
          <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-white mb-4 italic font-bold">
            Explore more our concept
          </p>
          <a href="#league-info" className="animate-bounce text-[#D1A546] transition-colors">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 13l5 5 5-5M7 6l5 5 5-5"/>
            </svg>
          </a>
        </div>
      </main>

      {/* --- LEAGUE INFO --- */}
      <section id="league-info" className="relative z-10 py-32 px-6 bg-black/40 backdrop-blur-sm scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h3 className="text-[#D1A546] text-[13px] font-bold uppercase tracking-[.5em] mb-4">The National League</h3>
              <h4 className="text-4xl md:text-6xl font-black uppercase italic leading-none mb-8 text-left">
                Evolution Through <br/> 
                <span className="text-gray-500 font-light">Movement.</span>
              </h4>
              <p className="text-gray-100 text-[16px] leading-relaxed mb-8 text-left">
                The Bachata Social Cup Romania is designed and created to celebrate the heart of social dance: **Social Connection**. No rehearsed routines. No choreographed shows. 
              </p>
              <p className="text-gray-100 text-[16px] leading-relaxed mb-10 text-left text-balance">
                Following the Jack&Jill competition format, as a participant, you will be paired with random partners, wether you ara a follower or a leader, and dance to music selected and played live by our DJs. We are looking for the most versatile, connected, and musical social dancers in the country.
              </p>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              <div className="p-8 border border-white/5 bg-white/2 rounded-2xl text-left transition-all duration-500 hover:scale-[1.02] hover:border-[#6e258f]/50 hover:shadow-[0_0_30px_rgba(58,3,83,0.3)] group">
                <span className="text-4xl font-black text-[#6e258f] mb-4 block group-hover:scale-110 transition-transform">01</span>
                <p className="text-lg font-bold uppercase tracking-tighter italic">Regional Qualifiers</p>
                <p className="text-xs text-gray-200 mt-2">Compete in the events hosted in our official calendar to earn your spot in the national rankings.</p>
              </div>
              <div className="p-8 border border-white/5 bg-white/2 rounded-2xl border-l-[#D1A546] text-left transition-all duration-500 hover:scale-[1.02] hover:border-[#D1A546]/50 hover:shadow-[0_0_30px_rgba(209,165,70,0.2)] group">
                <span className="text-4xl font-black text-[#D1A546] mb-4 block group-hover:scale-110 transition-transform">02</span>
                <p className="text-lg font-bold uppercase tracking-tighter italic">The Grand Final</p>
                <p className="text-xs text-gray-200 mt-2">The highest-ranked dancers face off in the final in Bucharest for the Romanian Title.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- ORGANIZER REQUEST --- */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="relative group overflow-hidden rounded-4xl md:rounded-[3rem] border border-[#3A0353] bg-black/60 backdrop-blur-md p-8 md:p-16 shadow-2xl transition-all duration-700 hover:shadow-[0_0_50px_rgba(97,7,170,0.3)] hover:border-[#D1A546]/30">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#3A0353]/20 blur-[100px] pointer-events-none group-hover:bg-[#3A0353]/40 transition-colors" />
            
            <div className="flex flex-col lg:flex-row items-center gap-12 text-center lg:text-left">
              <div className="flex-1">
                <h2 className="text-[#D1A546] font-bold tracking-[0.3em] uppercase text-[13px] mb-8 italic">Official Partnership</h2>
                <h1 className="font-mortend text-3xl md:text-5xl uppercase italic mb-6">
                  Host a <span className="text-gray-500">Qualifier</span>
                </h1>
                <p className="text-gray-100 text-sm md:text-lg leading-relaxed italic mb-10 max-w-xl mx-auto lg:mx-0">
                  Elevate your local event by joining the official circuit of Bachata Social Cup Romania. We provide the judging framework, marketing support, and the direct path for your dancers to reach the national finals. You don't need to worry about a thing. Our team will deal with all the logistics, while you get to host an unforgettable event in your city.
                </p>
                <p className="text-gray-100 text-[13px] md:text-lg leading-relaxed italic mb-10 max-w-xl mx-auto lg:mx-0">
                  If you are interested in hosting a qualifier or want to learn more about the partnership benefits, please reach out to us. We are excited to collaborate with passionate organizers across Romania to make this league a nationwide celebration of bachata culture.
                </p>
                {/* --- ADDED LINK WRAPPER --- */}
                <Link href="/requesthost" className="inline-block">
                  <button className={`relative p-px rounded-full ${goldWhiteGold} transition-all hover:scale-105 active:scale-95`}>
                    <div className="bg-[#3A0353] px-10 py-4 rounded-full flex items-center justify-center">
                      <span className={`text-[11px] font-black uppercase tracking-widest ${goldTextClass}`}>
                        Request Hosting Form
                      </span>
                    </div>
                  </button>
                </Link>
              </div>
              <div className="hidden lg:block w-1/3 relative aspect-square opacity-20 group-hover:opacity-40 transition-opacity duration-700 group-hover:scale-110">
                <Image src="/weblogo2.png" alt="BSWC Shield" fill className="object-contain" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- COMPETITOR JOURNEY --- */}
      <section className="relative z-10 py-32 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-[#D1A546] font-bold tracking-[0.3em] uppercase text-[13px] mb-8">Competitor Path</h2>
          <h1 className="font-mortend text-3xl md:text-5xl uppercase italic mb-20">
            How to <span className="text-gray-500 font-light">Qualify</span>
          </h1>

          <div className="relative">
            {/* Horizontal Line - Using absolute centering with a gradient */}
            <div className="hidden md:block absolute top-10 left-[12.5%] w-[75%] h-px bg-linear-to-r from-transparent via-[#D1A546]/50 to-transparent z-0" />
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-4 relative z-10">
              {competitorSteps.map((step, index) => (
                <div key={index} className="flex flex-col items-center group">
                  <div className="w-20 h-20 rounded-2xl bg-black border border-[#D1A546]/30 flex items-center justify-center text-[#D1A546] mb-6 shadow-[0_0_30px_rgba(209,165,70,0.1)] bg-linear-to-b from-black to-[#3A0353]/20 relative transition-all duration-500 group-hover:scale-110 group-hover:border-[#D1A546] group-hover:shadow-[0_0_40px_rgba(209,165,70,0.4)]">
                    {step.icon}
                  </div>
                  <h3 className="font-mortend text-[15px] uppercase italic mb-2 tracking-tight transition-colors group-hover:text-[#D1A546]">{step.title}</h3>
                  <p className="text-gray-300 text-[10px] uppercase tracking-[0.2em] font-medium max-w-37.5">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}