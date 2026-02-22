"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function GuidelinesPage() {
  const goldWhiteGold = "bg-gradient-to-r from-[#D1A546] via-white to-[#D1A546]";
  const goldTextClass = `text-transparent bg-clip-text ${goldWhiteGold}`;

  return (
    <div className="min-h-screen bg-black/90 text-white selection:bg-[#D1A546]/30">
      {/* Background Ambient Effect */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20">
        <Image src="/weblogo2.png" alt="" fill className="object-contain scale-150 blur-[120px]" />
      </div>

      <main className="relative z-10 pt-24 pb-20 px-4 md:px-6 lg:px-8 max-w-5xl mx-auto">
        
        {/* Header Section */}
        <div className="mt-12 mb-16 border-b border-white/10 pb-12">
          <h1 className="font-mortend text-3xl md:text-5xl uppercase italic mb-8">
            Official <span className={goldTextClass}>Guidelines</span>
          </h1>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-3xl italic">
            Social Dance Competitions are a unique fusion of mastery and the unexpected. 
            Success is found in the balance between your technical skills and your ability 
            to adapt to the randomness of the social floor—pairing, timing, and music.
          </p>
        </div>

        {/* Section: The Essentials */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div className="bg-[#3a0353]/20 border border-white/20 p-8 rounded-4xl space-y-4">
            <h2 className="font-mortend text-lg uppercase text-white italic">Logistics & Dorsals</h2>
            <ul className="space-y-4 text-sm text-gray-300">
              <li>
                <strong className="text-[#D1A546] block uppercase text-[13px] tracking-widest mb-5">Pickup Window</strong>
                Dorsals must be collected on the day of the competition within the 1 hour window provided by the organisation. Late collection results in immediate disqualification. The organising team will provide instructions and locations a few days prior to the event.
              </li>
              <li>
                <strong className="text-[#D1A546] block uppercase text-[13px] tracking-widest mb-5">Registration cancellation policy</strong>
                Cancellations must be notified at least 24 hours before the event. No refunds are issued for late cancellations less than 24 hours.
              </li>
              <li>
                <strong className="text-[#D1A546] block uppercase text-[13px] tracking-widest mb-5">Waitlist Policy</strong>
                In case of vacancies participants from the waitlist will be notified 24 hours in advance.
              </li>
              <li>
                <strong className="text-[#D1A546] block uppercase text-[13px] tracking-widest mb-5">Visibility</strong>
                Your dorsal number must be visible throughout all stages of the competition.
              </li>
            </ul>
          </div>

          <div className="bg-[#3a0353]/20 border border-white/20 p-8 rounded-4xl space-y-4 shadow-[0_20px_50px_rgba(58,3,83,0.3)]">
            <h2 className="font-mortend text-lg uppercase text-white italic">Execution & Style</h2>
            <ul className="space-y-4 text-sm text-gray-300">
              <li>
                <strong className="text-[#D1A546] block uppercase text-[13px] tracking-widest mb-5">Acrobatics</strong>
                Dips are permitted under the judges criteria. If a dip is too dangerous with potential for injury, it is not allowed and it can result in points penalties. <span className="text-red-400 font-bold">Lifts are strictly prohibited.</span>
              </li>
              <li>
                <strong className="text-[#D1A546] block uppercase text-[13px] tracking-widest mb-5">Dress Code</strong>
                Stylish, expressive, and social-dance friendly. We value personal flair that respects the social spirit.
              </li>
              <li>
                <strong className="text-[#D1A546] block uppercase text-[13px] tracking-widest mb-5">Conduct</strong>
                Zero tolerance for harassment of any kind. Treat all participants, judges, and staff with kindness and respect, on and off the dance floor. Any form of harassment, discrimination, or intimidation will not be tolerated. Celebrate other's dancing and contribute to a positive, inclusive atmosphere.
              </li>
            </ul>
          </div>
        </section>

        {/* Section: Judging Criteria (Visual Grid) */}
        <section className="mb-20">
          <h2 className="font-mortend text-2xl uppercase italic mb-8 text-center">Judging <span className={goldTextClass}>Criteria</span></h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {[
              { title: "Technique", desc: "Precision and movement mastery." },
              { title: "Musicality", desc: "Sync and interpretation." },
              { title: "Connection", desc: "Communication and lead/follow." },
              { title: "Style", desc: "Unique personal flair." },
              { title: "Attitude", desc: "Confidence and joy." },
            ].map((item, idx) => (
              <div key={idx} className="bg-white/5 border border-white/5 p-6 rounded-3xl text-center hover:border-[#D1A546]/50 transition-colors">
                <p className="text-[#D1A546] font-mortend text-[13px] uppercase mb-5">{item.title}</p>
                <p className="text-[13px] text-gray-200 italic">{item.desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-16 text-center text-base text-gray-200 italic max-w-2xl mx-auto">
            Note: Unlike standard J&J, we prioritize **Connection**. In the Finals, judges may dance with you to evaluate your lead/follow adaptability in real-time.
          </p>
        </section>

        {/* Section: Scoring & Music */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          <div className="lg:col-span-2 bg-[#3A0353]/20 border border-[#D1A546]/20 p-8 rounded-[2.5rem]">
            <h2 className="font-mortend text-[#D1A546] text-lg uppercase italic mb-6">The Scoring System</h2>
            <p className="text-[17px] text-gray-200 mb-6 italic">Powered by <span className="text-white font-bold">The Bachata Council</span> for real-time transparency.</p>
            <div className="space-y-4">
               <div className="flex gap-4 items-start">
                  <span className="text-[#D1A546] font-bold">01</span>
                  <p className="text-[14px] italic"><span className="text-white font-bold uppercase tracking-tighter mr-2">Prelims:</span> Leaders judge leaders, followers judge followers separately.</p>
               </div>
               <div className="flex gap-4 items-start">
                  <span className="text-[#D1A546] font-bold">02</span>
                  <p className="text-[14px] italic"><span className="text-white font-bold uppercase tracking-tighter mr-2">Semi-Finals:</span> Judges evaluate both roles, often observing from outside the circle.</p>
               </div>
               <div className="flex gap-4 items-start">
                  <span className="text-[#D1A546] font-bold">03</span>
                  <p className="text-[14px] italic"><span className="text-white font-bold uppercase tracking-tighter mr-2">Grand Finals:</span> Judges evaluate via external observation and direct dance interaction.</p>
               </div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem]">
            <h2 className="font-mortend text-lg uppercase italic mb-6">Music Mix</h2>
            <div className="space-y-3">
              {[
                { label: "Bachata 2025-26 (Recent)", value: "40%" },
                { label: "Bachata Moderna (2015-25)", value: "25%" },
                { label: "Bachata Classics", value: "25%" },
                { label: "Dominican traditional", value: "10%" },
              ].map((m, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-[13px] uppercase font-bold mb-3">
                    <span>{m.label}</span>
                    <span className="text-[#D1A546]">{m.value}</span>
                  </div>
                  <div className="h-1 bg-white/5 rounded-full">
                    <div className="h-full bg-[#D1A546]" style={{ width: m.value }} />
                  </div>
                </div>
              ))}
            </div>
            <p className="text-[12px] text-gray-200 italic mt-6 text-center">Spontaneity is key. No songs are shared in advance.</p>
          </div>
        </section>

        {/* Final CTA / Schedule Link */}
        <div className="text-center space-y-6">
            <h2 className="font-mortend text-sm uppercase italic tracking-widest text-gray-400">Ready to make history?</h2>
            <Link href="/qualifiers" className={`inline-block relative p-px rounded-xl ${goldWhiteGold} transition-all hover:scale-105 active:scale-95 shadow-2xl`}>
              <div className="bg-[#3A0353] px-10 py-4 rounded-[11px] flex items-center justify-center">
                <span className="text-white text-[11px] font-black uppercase tracking-widest italic font-mortend">View Qualifiers</span>
              </div>
            </Link>
        </div>

      </main>
    </div>
  );
}