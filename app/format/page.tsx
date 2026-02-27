"use client";

import React from 'react';

export default function FormatPage() {
  const goldWhiteGold = "bg-gradient-to-r from-[#D1A546] via-white to-[#D1A546]";

  const phases = [
    {
      number: "01",
      title: "Preliminaries",
      subtitle: "The Sorting Phase",
      desc: "All registered participants enter the floor. Dancers are randomly paired and rotate frequently to ensure a fair assessment across different partners and musical styles.",
      leaders: "40",
      followers: "40",
      songs: "7",
      switches: "3",
    },
    {
      number: "02",
      title: "Semi-Finals",
      subtitle: "The Pressure Phase",
      desc: "The field is narrowed based on scoring. In this phase, heat sizes are smaller, allowing judges to focus intensely on connection, musicality, and technique.",
      leaders: "16",
      followers: "16",
      songs: "5",
      switches: "2",
    },
    {
      number: "03",
      title: "Grand Finals",
      subtitle: "The Championship Round",
      desc: "The elite finalists are paired for full songs. This is the ultimate showcase of social dance prowess, timing, and that 'X-Factor' that defines a champion.",
      leaders: "TBA",
      followers: "TBA",
      songs: "TBA",
      switches: "0",
    }
  ];

  return (
    <main className="relative pt-32 md:pt-48 pb-20 md:pb-32 px-4 md:px-6 flex flex-col items-center">
      
      {/* Header Section */}
      <div className="text-center mb-16 md:mb-32">
        <h2 className="text-[#D1A546] font-bold tracking-[0.3em] md:tracking-[0.5em] uppercase text-[10px] md:text-xs mb-10">Official League Structure</h2>
        <h1 className="font-mortend text-3xl md:text-7xl uppercase tracking-tighter italic">
          Competition <span className="text-gray-500 text-2xl md:text-6xl">Format</span>
        </h1>
        <div className={`h-px md:h-0.5 w-32 md:w-64 mx-auto mt-6 md:mt-8 ${goldWhiteGold} opacity-50`} />
      </div>

      {/* --- CHRONOLOGICAL TIMELINE & CARDS --- */}
      <div className="relative max-w-6xl w-full">
        
        {/* Timeline Line: 2px thick, Brighter, and ends before trophy */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-30 md:bottom-45 w-0.5 bg-linear-to-b from-[#D1A546] via-[#D1A546] to-[#d1a546] opacity-60 z-0" />

        <div className="flex flex-col gap-16 md:gap-32">
          {phases.map((phase, index) => (
            <div key={index} className="relative w-full flex flex-col items-center">
              
              {/* Timeline Dot: Centered */}
              <div className="relative mb-8 md:mb-0 md:absolute md:left-1/2 md:-top-2 md:-translate-x-1/2 w-6 h-6 md:w-8 md:h-8 rounded-full bg-black border-2 border-[#D1A546] z-20 flex items-center justify-center shadow-[0_0_15px_#D1A546]">
                 <div className="w-1.5 md:w-2 h-1.5 md:h-2 rounded-full bg-white" />
              </div>

              {/* THE CARD */}
              <div className="w-full bg-black/80 backdrop-blur-md border border-[#3A0353] md:border-2 rounded-3xl md:rounded-[2.5rem] overflow-hidden shadow-2xl hover:border-[#D1A546]/50 transition-all duration-700 z-10">
                <div className="p-6 md:p-12">
                  <div className="flex flex-col lg:flex-row gap-8 md:gap-16">
                    
                    {/* Left: Phase Description */}
                    <div className="lg:w-1/2 flex flex-col justify-center text-left">
                      <div className="flex items-center gap-4 mb-4">
                         <span className="font-mortend text-2xl md:text-4xl text-[#D1A546]">{phase.number}</span>
                         <div className="h-px flex-1 bg-white/10" />
                      </div>
                      <h3 className="font-mortend text-2xl md:text-5xl uppercase italic mb-2 tracking-tight">
                         {phase.title}
                      </h3>
                      <p className="text-[#D1A546] uppercase text-[8px] md:text-[10px] font-black tracking-[0.3em] md:tracking-[0.4em] mb-4 md:mb-8 italic text-left">
                         {phase.subtitle}
                      </p>
                      <p className="text-gray-400 text-xs md:text-base leading-relaxed italic border-l-2 border-[#3A0353] pl-4 md:pl-6 py-1 md:py-2 text-left">
                         "{phase.desc}"
                      </p>
                    </div>

                    {/* Right: The Data Grid */}
                    <div className="lg:w-1/2 bg-white/5 rounded-2xl md:rounded-3xl p-5 md:p-8 border border-white/5 relative overflow-hidden">
                      <div className="relative z-10">
                        <h4 className="text-[8px] md:text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500 mb-4 flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-[#D1A546]" /> 
                          Groups Distribution
                        </h4>

                        <div className="grid grid-cols-2 gap-3 md:gap-4 mb-6 md:mb-10 text-left">
                          <div className="bg-black/60 p-4 md:p-5 rounded-xl md:rounded-2xl border border-[#D1A546]/20">
                             <p className="text-[#D1A546] font-black text-xl md:text-2xl">{phase.leaders}</p>
                             <p className="text-[10px] md:text-[9px] uppercase tracking-widest text-gray-500">Leaders Max</p>
                          </div>
                          <div className="bg-black/60 p-4 md:p-5 rounded-xl md:rounded-2xl border border-[#D1A546]/20">
                             <p className="text-[#D1A546] font-black text-xl md:text-2xl">{phase.followers}</p>
                             <p className="text-[10px] md:text-[9px] uppercase tracking-widest text-gray-500">Followers Max</p>
                          </div>
                        </div>

                        <h4 className="text-[8px] md:text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500 mb-4 flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-[#3A0353]" /> 
                          Songs & Switches
                        </h4>

                        <div className="grid grid-cols-2 gap-3 md:gap-4 text-center">
                          <div className="bg-[#3A0353]/20 p-4 md:p-6 rounded-xl md:rounded-2xl border border-[#3A0353]/40">
                            <p className="font-mortend text-xl md:text-3xl mb-1">{phase.songs}</p>
                            <p className="text-[10px] md:text-[8px] uppercase tracking-widest text-gray-400">Songs</p>
                          </div>
                          <div className="bg-[#3A0353]/20 p-4 md:p-6 rounded-xl md:rounded-2xl border border-[#3A0353]/40">
                            <p className="font-mortend text-xl md:text-3xl mb-1">{phase.switches}</p>
                            <p className="text-[10px] md:text-[8px] uppercase tracking-widest text-gray-400">Switches</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FINAL TROPHY */}
        <div className="mt-20 md:mt-32 flex flex-col items-center relative z-20">
          <div className={`p-px rounded-full ${goldWhiteGold} mb-6`}>
             <div className="bg-black rounded-full p-6 md:p-8 shadow-[0_0_50px_rgba(209,165,70,0.4)]">
                <svg width="40" height="40" className="md:w-15 md:h-15" viewBox="0 0 24 24" fill="none" stroke="#D1A546" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                  <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                  <path d="M4 22h16" />
                  <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                  <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                  <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
                </svg>
             </div>
          </div>
          <h5 className="font-mortend text-[#D1A546] text-xl md:text-2xl tracking-widest italic uppercase">Champion Crowned</h5>
          <p className="text-gray-600 text-[8px] md:text-[10px] tracking-[0.3em] md:tracking-[0.5em] uppercase mt-2 md:mt-4 text-center text-balance">Bachata Social Cup Romania 2026</p>
        </div>

      </div>
    </main>
  );
}