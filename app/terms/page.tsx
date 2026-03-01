import React from 'react';

export default function TermsAndConditions() {
  const titleFont = "font-mortend tracking-tighter italic uppercase";

  return (
    <main className="min-h-screen bg-black text-gray-300 py-20 px-6 font-sans">
      <div className="max-w-3xl mx-auto border border-[#D1A546]/30 bg-[#1A0225] p-8 md:p-12 rounded-[2.5rem] shadow-2xl">
        <h1 className={`${titleFont} text-[#D1A546] text-3xl mb-8`}>Terms of <span className="text-white">Service</span></h1>
        
        <div className="space-y-6 text-sm leading-relaxed uppercase tracking-tighter">
          <section>
            <h2 className="text-white font-bold mb-2">1. Eligibility</h2>
            <p>By registering, you confirm you are at least 18 years of age. Minors must have registration completed by a legal guardian.</p>
          </section>

          <section>
            <h2 className="text-white font-bold mb-2">2. Intellectual property & content</h2>
            <p>The participant retains ownership for any information uploaded to the platform but grants the organiser a non-exclusive license to use the entry for promotional purposes.</p>
          </section>

          <section>
            <h2 className="text-white font-bold mb-2">3. Acceptance of terms -third party services-</h2>
            <p>Transactions are subject to the terms and conditions and privacy policies of third-party services such as Stripe. We encourage you to review these policies before proceeding with any payment.</p>
          </section>

          <section>
            <h2 className="text-white font-bold mb-2">4. Registration confirmation</h2>
            <p>Condition of validity: Creating an account on our platform does not guarantee entry into the competition. Registration is only considered valid and complete once we receive successful payment confirmation from the processor.</p>
          </section>

          <section>
            <h2 className="text-white font-bold mb-2">5. Data synchronisation</h2>
            <p>Upon successful payment, your account status will be updated. Please allow up to 24 hours for the system to fully synchronise your data.</p>
          </section>

          <section>
            <h2 className="text-white font-bold mb-2">6. Payments & Refunds</h2>
            <p>All registration fees for the competition are refundable unless you cancel your registration less than 24h before the event. No-shows will not be reimbursed.</p>
          </section>

          <section>
            <h2 className="text-white font-bold mb-2">7. Processing fees</h2>
            <p>Please note that third party payment processors may charge additional processing fees. These fees are not controlled by us and are subject to the policies of the respective payment processor. This may result into a non-refundable charge if the cancellation is initiated by the participant.</p>
          </section>

          <section>
            <h2 className="text-white font-bold mb-2">8. Account Security</h2>
            <p>You are responsible for maintaining the confidentiality of your login credentials in the Participant Area.</p>
          </section>

          <section>
            <h2 className="text-white font-bold mb-2">9. Account Accuracy</h2>
            <p>Providing false information during the process of registration it voids the entry even if the fee is paid. All information must be accurate and truthful.</p>
          </section>

          <section>
            <h2 className="text-white font-bold mb-2">10. Accountability</h2>
            <p>You are responsible for the correct usage of the platform. You must not misuse your account or attempt to access unauthorized areas of the system. Any misuse of the platform may result in account suspension or termination.</p>
          </section>

          <section>
            <h2 className="text-white font-bold mb-2">11. Terms Update</h2>
            <p>The organisation reserves the right to modify these terms and conditions at any time. Participants will be notified of significant changes via email or a pop-up notification on the home page.</p>
          </section>

          <section>
            <h2 className="text-white font-bold mb-2">11. Event Conduct</h2>
            <p>Organizers reserve the right to disqualify any participant who engages in harassment, unsportsmanlike conduct, or violates the rules of the dance floor.</p>
            <p>Any participant that intentionally harms the image of the event or any of its members, including participants and orginization, will be disqualified and removed fully from the platform not allowing to re-join at any stage of the circuit under any circumstances.</p>
          </section>
        </div>
      </div>
    </main>
  );
}