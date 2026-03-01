import React from 'react';

export default function Waiver() {
  const titleFont = "font-mortend tracking-tighter italic uppercase";

  return (
    <main className="min-h-screen bg-black text-gray-300 py-20 px-6 font-sans">
      <div className="max-w-3xl mx-auto border border-red-900/50 bg-[#1A0225] p-8 md:p-12 rounded-[2.5rem] shadow-2xl">
        <h1 className={`${titleFont} text-red-500 text-3xl mb-8`}>Liability <span className="text-white">Waiver</span></h1>
        
        <div className="space-y-6 text-sm leading-relaxed uppercase tracking-tighter">
          <p className="font-bold text-white border-b border-white/10 pb-4 italic">
            PLEASE READ CAREFULLY. THIS LIMITS YOUR LEGAL RIGHTS.
          </p>
          
          <section>
            <h2 className="text-white font-bold mb-2">1. Assumption of Risk</h2>
            <p>Dance is a physical activity. By participating, you acknowledge the risk of injury, including but not limited to sprains, muscle strains, or falls.</p>
          </section>

          <section>
            <h2 className="text-white font-bold mb-2">2. Medical Fitness</h2>
            <p>You certify that you are physically fit to compete and have no medical conditions that would prevent your safe participation.</p>
          </section>

          <section>
            <h2 className="text-white font-bold mb-2">3. Release of Liability</h2>
            <p>You hereby release the organizers, venue owners, and staff from any and all claims, costs, or liabilities for personal injury or property loss occurring during the event.</p>
          </section>
        </div>
      </div>
    </main>
  );
}