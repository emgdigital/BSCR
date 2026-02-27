"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '../../../utils/supabase'; // Ensure this path is correct

const QUALIFIER_DATA: Record<string, any> = {
  "bucharest": {
    city: "Bucharest",
    subTitle: "National Kick-off",
    date: "April 3-5th, 2026",
    location: "Bucharest, Romania",
    registrationFee: "100 RON",
    status: "Registration Open",
    totalSpots: 80,
    occupiedLeaders: 4,
    occupiedFollowers: 1,
    maxLeaders: 40,
    maxFollowers: 40,
    registrationLink: "https://bachatasocialworldcup.com/qualifiers?category=standalone", 
    participantsLink: "",
    organizers: [
      {
        name: "BtoB Bachata",
        logo: "/logobtob.png", 
        insta: "https://www.instagram.com/btobbachatadancefestival/",
        web: "https://dekadanceacademy.ro"
      },
      {
        name: "Social Cup Romania",
        logo: "/PROFILE IG.png", 
        insta: "https://www.instagram.com/bachatasocialcup.ro/",
        web: ""
      }
    ],
    festivalPassLink: "https://www.goandance.com/en/event/8804/btob-dance-festival-3-6-april-2026-bucharest-romania"
  }
};

export default function QualifierTemplate() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const event = QUALIFIER_DATA[slug];
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsLoggedIn(!!session);
    };
    checkUser();
  }, []);

  if (!event) return <div className="min-h-screen bg-black flex items-center justify-center text-white italic font-mortend">Event Not Found</div>;

  const goldWhiteGold = "bg-gradient-to-r from-[#D1A546] via-white to-[#D1A546]";
  const goldTextClass = `text-transparent bg-clip-text ${goldWhiteGold}`;

  const handleRegisterClick = (e: React.MouseEvent) => {
    if (!isLoggedIn) {
      e.preventDefault();
      router.push('/register');
    }
  };

  return (
    <div className="min-h-screen bg-black/80 text-white selection:bg-[#D1A546]/30">
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20">
        <Image src="/weblogo2.png" alt="" fill className="object-contain scale-150 blur-[120px]" />
      </div>

      <main className="relative z-10 pt-24 pb-20 px-4 md:px-6 lg:px-8 max-w-6xl mx-auto">
        
        {/* Navigation */}
        <Link href="/qualifiers" className="inline-flex items-center gap-2 text-gray-200 hover:text-white transition-colors mb-10 text-[10px] uppercase tracking-[0.3em] font-bold italic">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          Back to Qualifiers
        </Link>

        {/* --- HEADER --- */}
        <div className="mb-12">
          <span className="bg-[#D1A546] text-black text-[13px] font-black px-3 py-1 rounded-sm uppercase tracking-tighter mb-6 inline-block">
            {event.status}
          </span>
          <h1 className="font-mortend text-2xl md:text-4xl uppercase italic leading-tight mb-2">
            Jack&Jill - <span className="text-gray-400">{event.city}</span>
          </h1>
          <h2 className="text-[10px] md:text-[15px] text-gray-300 font-light italic mb-8">{event.subTitle}</h2>
          
          <div className="flex flex-wrap gap-y-6 gap-x-12 py-8 border-y border-white/20">
            <div>
              <p className="text-[13px] text-gray-400 uppercase tracking-widest mb-1 font-bold">Date</p>
              <p className="text-base font-bold uppercase italic">{event.date}</p>
            </div>
            <div>
              <p className="text-[13px] text-gray-400 uppercase tracking-widest mb-1 font-bold">Location</p>
              <p className="text-base font-bold uppercase italic">{event.location}</p>
            </div>
            <div>
              <p className="text-[13px] text-gray-400 uppercase tracking-widest mb-1 font-bold">Registration</p>
              <p className={`text-[17px] font-bold uppercase italic ${goldTextClass}`}>{event.registrationFee}</p>
            </div>
          </div>
        </div>

        {/* --- MAIN CONTENT GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          
          <div className="lg:col-span-2 space-y-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                <p className="text-[#D1A546] text-[13px] font-black uppercase tracking-widest mb-4">Registration Type</p>
                <p className="text-[16px] font-bold mb-1 italic">Open Registration</p>
                <p className="text-sm text-gray-400 leading-relaxed italic">Direct registration available.</p>
              </div>
              <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                <p className="text-[#D1A546] text-[13px] font-black uppercase tracking-widest mb-4">Event Type</p>
                <p className="text-[16px] font-bold mb-1 italic">League Qualifier</p>
                <p className="text-sm text-gray-400 leading-relaxed italic">Top 3 advance to Grand Finals.</p>
              </div>
            </div>

            <div className="bg-white/5 border border-white/20 p-10 rounded-4xl">
              <h4 className="text-lg font-bold italic uppercase mb-8">{event.occupiedLeaders + event.occupiedFollowers} / {event.totalSpots} spots occupied</h4>
              
              <div className="space-y-8 mb-10">
                <div>
                  <div className="flex justify-between text-[13px] uppercase tracking-[0.2em] mb-2 font-bold">
                    <span>Leaders: {event.occupiedLeaders} / {event.maxLeaders}</span>
                  </div>
                  <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-[#D1A546]" style={{ width: `${(event.occupiedLeaders/event.maxLeaders)*100}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[13px] uppercase tracking-[0.2em] mb-2 font-bold">
                    <span>Followers: {event.occupiedFollowers} / {event.maxFollowers}</span>
                    <span className="text-red-500 animate-pulse italic">Limited spots!</span>
                  </div>
                  <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-[#D1A546]" style={{ width: `${(event.occupiedFollowers/event.maxFollowers)*100}%` }} />
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href={isLoggedIn ? event.registrationLink : "#"} 
                  onClick={handleRegisterClick}
                  target={isLoggedIn ? "_blank" : "_self"}
                  rel="noopener noreferrer"
                  className={`flex-1 relative p-px rounded-xl ${goldWhiteGold} transition-all hover:scale-[1.02] active:scale-95 shadow-2xl block`}
                >
                  <div className="bg-[#3A0353] py-4 rounded-[11px] flex items-center justify-center">
                    <span className="text-white text-[11px] font-black uppercase tracking-widest italic">
                      {isLoggedIn ? "Register Now" : "Login to Register"}
                    </span>
                  </div>
                </a>
                <a 
                  href={event.participantsLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 bg-white/5 border border-white/10 py-4 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-colors italic flex items-center justify-center"
                >
                  View Participants (soon)
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT: Organizer Profile Card */}
          <div className="bg-white/2 border border-white/20 rounded-[2.5rem] p-8 sticky top-28 shadow-2xl">
            <p className="text-[11px] text-gray-400 uppercase tracking-widest mb-8 font-bold italic text-center">Official Organisers</p>
            
            <div className="space-y-10">
              {event.organizers.map((org: any, idx: number) => (
                <div key={idx} className="flex flex-col items-center text-center">
                  <div className="relative w-28 h-28 mb-4 p-1 rounded-2xl border border-white/10 bg-black overflow-hidden">
                    <Image src={org.logo} alt={org.name} fill className="object-contain p-2" />
                  </div>
                  
                  <h3 className="font-mortend text-[12px] uppercase italic mb-1 tracking-tighter leading-tight">{org.name}</h3>
                  
                  <div className="grid grid-cols-2 gap-3 w-full mt-4">
                    <a 
                      href={org.web} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="py-2 bg-white/5 border border-white/10 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-colors italic flex items-center justify-center"
                    >
                      Website
                    </a>
                    <a 
                      href={org.insta} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="py-2 bg-white/5 border border-white/10 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-colors italic flex items-center justify-center"
                    >
                      Instagram
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Unified Festival Pass Button */}
            <div className="mt-10 pt-8 border-t border-white/10">
              <a 
                href={event.festivalPassLink} 
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-4 bg-white text-black rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-gray-200 transition-colors italic text-center"
              >
                Get Festival Pass
              </a>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}