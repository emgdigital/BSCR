"use client";

import { useState, useEffect } from 'react';
import { supabase } from '@/utils/supabase';
import { useRouter } from 'next/navigation';

export default function JudgePad() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  // Stage State (We can eventually fetch this from a 'settings' table)
  const [competitionStage, setCompetitionStage] = useState<'Preliminary' | 'Semi-Final' | 'Final'>('Preliminary');

  // Scoring State
  const [targetRole, setTargetRole] = useState<'leader' | 'follower'>('leader');
  const [bibNumber, setBibNumber] = useState('');
  const [passVote, setPassVote] = useState<boolean | null>(null);
  const [scores, setScores] = useState({
    technique: 5,
    musicality: 5,
    connection: 5,
    style: 5,
    attitude: 5
  });

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/login');
        return;
      }

      const { data: profile, error } = await supabase
        .from('profiles')
        .select('role, full_name, gender')
        .eq('id', session.user.id)
        .single();

      const userRole = profile?.role?.toLowerCase();
      if (userRole !== 'judge' && userRole !== 'admin') {
        alert("Access Denied: You are not registered as a judge.");
        router.push('/');
        return;
      }

      // --- NEW LOGIC: Role Assignment based on Stage & Gender ---
      if (competitionStage === 'Preliminary') {
        // In Prelims: Male judges usually score Leaders, Female score Followers
        if (profile?.gender === 'female') {
          setTargetRole('follower');
        } else {
          setTargetRole('leader');
        }
      } 
      // Note: In Semi/Final, we leave the default as 'leader' but the judge can toggle.

      const displayName = profile?.full_name || session.user.email;
      setUser({ ...session.user, ...profile, full_name: displayName });
      setLoading(false);
    };
    checkAuth();
  }, [router, competitionStage]);

  const handleSubmit = async () => {
    if (!bibNumber || (competitionStage === 'Preliminary' && passVote === null)) {
      alert("Please enter a Bib/Letter and your vote.");
      return;
    }

    // Capture values before reset to ensure alert has data
    const lastBib = bibNumber;
    const lastRole = targetRole;

    const { error } = await supabase.from('scores').insert([{
      bib_number: bibNumber,
      judge_name: user.full_name || user.email, 
      stage: competitionStage, 
      competition_id: '298521e9-9f67-4a95-adc1-94f92e11fdda', 
      pass_vote: passVote,
      technique: scores.technique,
      musicality: scores.musicality,
      connection: scores.connection,
      style: scores.style,
      attitude: scores.attitude
    }]);

    if (error) {
      alert("Error submitting score: " + error.message);
    } else {
      // 1. Reset everything
      setBibNumber('');
      setPassVote(null);
      setScores({ technique: 5, musicality: 5, connection: 5, style: 5, attitude: 5 });
      
      // 2. Show the alert using the captured constants
      alert(`Score Submitted for ${lastRole} ${lastBib}!`);
    }
  };

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-white font-mortend italic">Authenticating Judge...</div>;

  return (
    <main className="min-h-screen bg-[#050505] text-white p-4 pt-20">
      <div className="max-w-md mx-auto space-y-8">
        
        <header className="text-center">
          <div className="flex justify-between items-center mb-2 px-2">
            <span className="text-[11px] text-[#D1A546] border border-[#D1A546]/30 px-2 py-1 rounded-full uppercase font-bold tracking-tighter">
              {competitionStage}
            </span>
            <button onClick={() => window.location.reload()} className="text-[9px] text-gray-400 uppercase font-bold">Refresh</button>
          </div>
          <h1 className="font-mortend italic text-2xl uppercase text-[#D1A546]">Judge Pad</h1>
          <p className="text-[13px] text-gray-400 uppercase tracking-widest mt-1">Judge: {user.full_name}</p>
        </header>

        {/* ROLE SELECTOR - Always visible so judges can pivot if needed */}
        <div className="flex justify-center gap-4 bg-[#111111] p-1 rounded-full border border-white/5 shadow-inner">
          {['leader', 'follower'].map((role) => (
            <button
              key={role}
              onClick={() => {
                setTargetRole(role as any);
                setBibNumber('');
              }}
              className={`flex-1 py-3 rounded-full text-[11px] font-black uppercase tracking-widest transition-all duration-300 ${
                targetRole === role ? 'bg-[#D1A546] text-black shadow-[0_0_15px_rgba(209,165,70,0.3)]' : 'text-gray-500'
              }`}
            >
              {role}s
            </button>
          ))}
        </div>

        {/* BIB/LETTER INPUT */}
        <div className="space-y-2">
          <label className="text-[10px] uppercase font-bold text-gray-400 tracking-widest block text-center">
            {targetRole === 'leader' ? 'Leader Number' : 'Follower Letter'}
          </label>
          <input 
            type={targetRole === 'leader' ? 'number' : 'text'} 
            inputMode={targetRole === 'leader' ? 'numeric' : 'text'}
            value={bibNumber}
            autoFocus
            autoComplete="off"
            autoCorrect="off"
            data-lpignore="true"
            onChange={(e) => setBibNumber(e.target.value.toUpperCase())}
            className="w-full bg-[#111111] border border-white/10 rounded-2xl p-6 text-6xl text-center font-mortend focus:border-[#D1A546] outline-none transition-all uppercase placeholder:opacity-10 text-[#D1A546]"
            placeholder={targetRole === 'leader' ? '01' : 'A'}
          />
        </div>

        {/* YES / NO TOGGLE - Only critical for Preliminaries */}
        {competitionStage === 'Preliminary' && (
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => setPassVote(true)}
              className={`p-6 rounded-2xl font-black uppercase tracking-widest transition-all border ${passVote === true ? 'bg-emerald-500 text-black border-emerald-400 scale-95 shadow-[0_0_20px_rgba(16,185,129,0.3)]' : 'bg-[#111111] border-white/5 text-emerald-500'}`}
            >
              Yes
            </button>
            <button 
              onClick={() => setPassVote(false)}
              className={`p-6 rounded-2xl font-black uppercase tracking-widest transition-all border ${passVote === false ? 'bg-red-500 text-black border-red-400 scale-95 shadow-[0_0_20px_rgba(239,68,68,0.3)]' : 'bg-[#111111] border-white/5 text-red-500'}`}
            >
              No
            </button>
          </div>
        )}

        {/* NUMERIC CRITERIA */}
        <div className="space-y-6 bg-[#111111] p-6 rounded-3xl border border-white/5">
          {Object.entries(scores).map(([key, value]) => (
            <div key={key} className="space-y-3">
              <div className="flex justify-between text-[11px] uppercase font-bold tracking-widest">
                <span className="text-gray-400 italic">{key}</span>
                <span className="text-white text-base">{value}</span>
              </div>
              <input 
                type="range" min="1" max="10" step="0.5"
                value={value}
                onChange={(e) => setScores({...scores, [key]: parseFloat(e.target.value)})}
                className="w-full accent-[#D1A546] h-2 bg-white/5 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          ))}
        </div>

        {/* SUBMIT */}
        <div className="pb-10">
            <button 
              onClick={handleSubmit}
              className="w-full bg-linear-to-r from-[#D1A546] via-white to-[#D1A546] text-black font-black uppercase italic tracking-[0.2em] py-6 rounded-2xl shadow-[0_10px_30px_rgba(209,165,70,0.2)] hover:scale-[1.02] active:scale-95 transition-all"
            >
              Confirm Score
            </button>
        </div>

      </div>
    </main>
  );
}