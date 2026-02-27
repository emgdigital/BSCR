"use client";

import React from 'react';
import Image from 'next/image';

export default function WinnersPage() {
  const goldWhiteGold = "bg-gradient-to-r from-[#D1A546] via-white to-[#D1A546]";
  const goldTextClass = "text-transparent bg-clip-text bg-gradient-to-r from-[#D1A546] via-white to-[#D1A546]";

  return (
    <main className="relative pt-32 md:pt-48 pb-20 px-4 flex flex-col items-center">
      
      {/* Header */}
      <div className="text-center mb-16 md:mb-24">
        <h2 className="text-[#D1A546] font-bold tracking-[0.4em] uppercase text-[10px] md:text-xs mb-8">Hall of Fame</h2>
        <h1 className="font-mortend text-3xl md:text-6xl uppercase tracking-tighter italic">
          Season <span className="text-gray-500 text-2xl md:text-5xl">Winners</span>
        </h1>
        <div className={`h-px md:h-0.5 w-32 md:w-64 mx-auto mt-6 ${goldWhiteGold} opacity-50`} />
      </div>

      {/* --- WINNERS CONTENT --- */}
      <div className="max-w-5xl w-full flex flex-col items-center">
        
        {/* THE PODIUM */}
        <div className="relative w-full aspect-video md:aspect-21/9 flex items-end justify-center mb-16 px-4">
          
          {/* 2nd Place (Left) */}
          <div className="w-1/3 h-[50%] bg-white/5 border-t border-x border-[#3A0353] rounded-t-3xl flex flex-col items-center justify-center relative overflow-visible">
             <div className="absolute inset-0 bg-linear-to-b from-[#3A0353]/10 to-transparent rounded-t-3xl" />
             
             {/* Winner Image Holder */}
             <div className="absolute -top-10 md:-top-14 w-20 h-20 md:w-28 md:h-28 rounded-full border-2 border-gray-500 bg-black overflow-hidden shadow-xl">
                <div className="w-full h-full flex items-center justify-center text-gray-800 italic text-[10px] uppercase font-bold">Coming Soon</div>
                {/* <Image src="/path-to-winner2.jpg" alt="Runner Up" fill className="object-cover" /> */}
             </div>

             <span className="font-mortend text-3xl md:text-6xl text-gray-700 mt-8">02</span>
             <p className="text-[8px] md:text-[10px] uppercase tracking-widest text-gray-600 mt-2 font-bold">Runner Up</p>
          </div>

          {/* 1st Place (Center) */}
          <div className="w-1/3 h-[75%] bg-[#3A0353]/20 border-t-2 border-x-2 border-[#D1A546] rounded-t-[2.5rem] flex flex-col items-center justify-center relative z-10 shadow-[0_-20px_50px_rgba(209,165,70,0.2)] overflow-visible">
             
             {/* Champion Image Holder & Trophy */}
             <div className="absolute -top-16 md:-top-24 flex flex-col items-center">
                <span className="text-4xl md:text-6xl mb-2 filter drop-shadow-[0_0_15px_rgba(209,165,70,0.8)]">🏆</span>
                <div className="w-24 h-24 md:w-36 md:h-36 rounded-full border-4 border-[#D1A546] bg-black overflow-hidden shadow-[0_0_30px_rgba(209,165,70,0.4)]">
                   <div className="w-full h-full flex items-center justify-center text-[#D1A546] italic text-xs uppercase font-black text-center px-4">Champion Reveal</div>
                   {/* <Image src="/path-to-winner1.jpg" alt="Champion" fill className="object-cover" /> */}
                </div>
             </div>

             <span className="font-mortend text-4xl md:text-8xl text-[#D1A546] drop-shadow-lg mt-16 md:mt-24">01</span>
             <p className="text-[10px] md:text-xs uppercase tracking-[0.5em] text-[#D1A546] mt-4 font-black italic">Champion</p>
          </div>

          {/* 3rd Place (Right) */}
          <div className="w-1/3 h-[40%] bg-white/5 border-t border-x border-[#3A0353] rounded-t-3xl flex flex-col items-center justify-center relative overflow-visible">
             <div className="absolute inset-0 bg-linear-to-b from-[#3A0353]/10 to-transparent rounded-t-3xl" />
             
             {/* Winner Image Holder */}
             <div className="absolute -top-8 md:-top-12 w-16 h-16 md:w-24 md:h-24 rounded-full border-2 border-[#3A0353] bg-black overflow-hidden shadow-xl">
                <div className="w-full h-full flex items-center justify-center text-gray-800 italic text-[10px] uppercase font-bold">Soon</div>
                {/* <Image src="/path-to-winner3.jpg" alt="3rd Place" fill className="object-cover" /> */}
             </div>

             <span className="font-mortend text-2xl md:text-5xl text-gray-700 mt-6">03</span>
             <p className="text-[8px] md:text-[10px] uppercase tracking-widest text-gray-600 mt-2 font-bold">3rd Place</p>
          </div>
        </div>

        {/* Reveal Text Section */}
        <div className="bg-black/40 backdrop-blur-md border border-[#3A0353] rounded-[2.5rem] p-8 md:p-12 text-center max-w-3xl w-full shadow-2xl">
           <h3 className={`font-mortend text-2xl md:text-4xl mb-4 ${goldTextClass}`}>
             Legend In The Making
           </h3>
           <p className="text-gray-400 text-sm md:text-lg leading-relaxed italic mb-8">
             "This page is reserved for the elite dancers of our first edition. The champions of the Bachata Social Cup Romania will be revealed at the end of the season grand finale."
           </p>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl border border-white/5 bg-white/5">
                 <p className="text-[8px] uppercase tracking-widest text-gray-500 mb-1">Coming In</p>
                 <p className="font-bold text-white uppercase italic text-sm">TBA SOON</p>
              </div>
              <div className="p-4 rounded-xl border border-white/5 bg-white/5">
                 <p className="text-[8px] uppercase tracking-widest text-gray-500 mb-1">Edition</p>
                 <p className="font-bold text-white uppercase italic text-sm">First / Official</p>
              </div>
              <div className="p-4 rounded-xl border border-white/5 bg-white/5">
                 <p className="text-[8px] uppercase tracking-widest text-gray-500 mb-1">Status</p>
                 <p className="font-bold text-[#D1A546] uppercase italic text-sm animate-pulse">In Progress</p>
              </div>
           </div>
        </div>

      </div>
    </main>
  );
}