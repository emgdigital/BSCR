"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link'; // Added Link import

export default function QualifiersPage() {
  const goldWhiteGold = "bg-gradient-to-r from-[#D1A546] via-white to-[#D1A546]";
  
  const qualifiers = [
    {
      city: "Bucharest",
      event: "National Kick-off",
      date: "April 3-5th",
      year: "2026",
      venue: "Grand Ballroom Center",
      status: "Registration Opens Soon",
      isOpen: true,
      banner: "/finalBanner.png", // 1080x1350 vertical banner
      slug: "bucharest" // Added slug to match your [slug] folder data
    },
    {
      city: "To be announced",
      event: "To be announced",
      date: "",
      year: "2026",
      venue: "To be announced",
      status: "Coming Soon",
      isOpen: false,
      banner: "/comingsoonweb.png",
      slug: "#"
    },
    {
      city: "To be announced",
      event: "To be announced",
      date: "",
      year: "2026",
      venue: "To be announced",
      status: "Coming Soon",
      isOpen: false,
      banner: "/comingsoonweb.png",
      slug: "#"
    },
    {
      city: "To be announced",
      event: "To be announced",
      date: "",
      year: "2026",
      venue: "To be announced",
      status: "Coming Soon",
      isOpen: false,
      banner: "/comingsoonweb.png",
      slug: "#"
    },
    {
      city: "To be announced",
      event: "To be announced",
      date: "",
      year: "2026",
      venue: "To be announced",
      status: "Coming Soon",
      isOpen: false,
      banner: "/comingsoonweb.png",
      slug: "#"
    },
    {
      city: "To be announced",
      event: "To be announced",
      date: "",
      year: "2026",
      venue: "To be announced",
      status: "Coming Soon",
      isOpen: false,
      banner: "/comingsoonweb.png",
      slug: "#"
    }
  ];

  return (
    <main className="relative pt-24 md:pt-40 pb-20 px-4 md:px-6 lg:px-8 flex flex-col items-center">
      
      {/* Header */}
      <div className="text-center mb-12 md:mb-20">
        <h2 className="text-[#D1A546] font-bold tracking-[0.3em] uppercase text-[9px] md:text-xs mb-8">Official Road to Finals</h2>
        <h1 className="font-mortend text-2xl md:text-5xl uppercase tracking-tighter italic mb-6">
          Event <span className="text-gray-500">Qualifiers</span>
        </h1>
        <div className={`h-px w-20 md:w-48 mx-auto mt-6 ${goldWhiteGold} opacity-50`} />
      </div>

      {/* --- QUALIFIERS GRID --- */}
      <div className="max-w-6xl w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
        {qualifiers.map((item, index) => (
          <div 
            key={index} 
            className="group relative bg-[#3a0353] border border-white/5 rounded-2xl overflow-hidden hover:border-[#D1A546]/30 transition-all duration-500 shadow-2xl flex flex-col"
          >
            {/* Image Section */}
            <div className="relative aspect-4/5 w-full overflow-hidden bg-neutral-900">
               {/* Status Badge */}
               <div className="absolute top-4 left-4 z-20">
                  <span className={`text-[8px] font-black px-3 py-1.5 rounded-md uppercase tracking-widest border shadow-lg ${
                    item.isOpen 
                    ? "bg-[#D1A546] text-black border-[#D1A546]" 
                    : "bg-black/80 text-gray-500 border-white/10 backdrop-blur-md"
                  }`}>
                    {item.status}
                  </span>
               </div>

               {/* Banner Image */}
               <Image 
                src={item.banner} 
                alt={`${item.city} Qualifier`}
                fill
                className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
               />
               
               <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a] via-transparent to-transparent opacity-60" />
            </div>

            {/* Content Area */}
            <div className="p-6 flex flex-col flex-1 border-t border-white/5">
               <div className="flex justify-between items-start mb-6">
                  <div className="flex-1">
                    <h3 className="font-mortend text-[14px] uppercase italic leading-none truncate">{item.city}</h3>
                    <p className="text-[#D1A546] text-[11px] uppercase font-bold tracking-[0.2em] mt-2 opacity-80">{item.event}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-mortend text-[14px] text-white">{item.date}</p>
                    <p className="text-[12px] uppercase text-white tracking-tighter">ROMANIA 2026</p>
                  </div>
               </div>

               <div className="mt-auto space-y-6">
                 {/* Venue Info */}
                 <div className="flex items-center gap-2 text-white border-l border-[#3A0353] pl-3 py-1">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    <span className="text-[12px] uppercase tracking-wide truncate font-medium">{item.venue}</span>
                 </div>

                 {/* Premium Button - WRAPPED WITH LINK */}
                 <Link href={`/qualifiers/${item.slug}`}>
                    <button className="w-full group/btn relative p-px rounded-xl overflow-hidden shadow-lg hover:shadow-[#D1A546]/10 transition-all duration-300">
                        <div className={`absolute inset-0 ${goldWhiteGold} opacity-20 group-hover/btn:opacity-100 transition-opacity`} />
                        <div className="relative bg-[#0d0d0d] group-hover/btn:bg-transparent py-4 rounded-xl transition-colors">
                        <span className="font-mortend text-[10px] uppercase tracking-widest text-white italic">View Details</span>
                        </div>
                    </button>
                 </Link>
               </div>
            </div>
          </div>
        ))}
      </div>

      {/* Optimized Bottom Section */}
      <div className="mt-20 text-center px-4">
        <div className="h-px w-12 bg-[#3A0353] mx-auto mb-6" />
        <p className="text-[12px] md:text-[14px] text-white uppercase tracking-[0.4em] font-medium italic">
          Exclusive entry for Season 01
        </p>
      </div>

    </main>
  );
}