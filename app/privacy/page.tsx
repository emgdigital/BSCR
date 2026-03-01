import React from 'react';

export default function PrivacyPolicy() {
  const titleFont = "font-mortend tracking-tighter italic uppercase";
  
  return (
    <main className="min-h-screen bg-black text-gray-300 py-20 px-6 font-sans">
      <div className="max-w-3xl mx-auto border border-[#D1A546]/30 bg-[#1A0225] p-8 md:p-12 rounded-[2.5rem] shadow-2xl">
        <h1 className={`${titleFont} text-[#D1A546] text-3xl mb-8`}>Privacy <span className="text-white">Policy</span></h1>
        
        <div className="space-y-6 text-sm leading-relaxed uppercase tracking-tighter">
          <section>
            <h2 className="text-white font-bold mb-2">1. Data Collection</h2>
            <p>We collect your name, email, birthdate, and dance role to manage competition brackets. Your profile image is stored securely via Supabase and used for participant identification only. We do not collect or store any card details or bank account information.</p>
          </section>

          <section>
            <h2 className="text-white font-bold mb-2">2. Media & Photos</h2>
            <p>As a dance platform, we process visual data. Photos uploaded to your profile are public to other registered participants and organizers. We do not sell your photos to third parties.</p>
          </section>

          <section>
            <h2 className="text-white font-bold mb-2">3. Third Party Services & payment mechanisms</h2>
            <p>Third party payment are processed by Stripe. We do not store or process any payment information on our servers. By proceeding to payment you acknowledge you will be redirected to Stripe's secure payment page.</p>
          </section>

          <section>
            <h2 className="text-white font-bold mb-2">4. Limitation of Liability</h2>
            <p>We are not responsible for any errors, technical issues or security breaches that may occur in connection with the use of our platform or third-party services.</p>
          </section>

          <section>
            <h2 className="text-white font-bold mb-2">5. Storage & Security</h2>
            <p>Your data is encrypted and stored using Supabase (EU-based servers). We implement industry-standard security to prevent unauthorized access.</p>
          </section>

          <section>
            <h2 className="text-white font-bold mb-2">6. Your Rights (GDPR)</h2>
            <p>Under Romanian and EU law, you have the right to access, correct, or delete your data. To exercise these rights, press "Delete Account" in your dashboard and your data will be deleted automatically from our database in Supabase. If you need further assistance, contact us via the support email.</p>
          </section>

          <div className="pt-8 border-t border-white/10 text-[10px] text-gray-500">
            LAST UPDATED: MARCH 2026 | JURISDICTION: ROMANIA
          </div>
        </div>
      </div>
    </main>
  );
}