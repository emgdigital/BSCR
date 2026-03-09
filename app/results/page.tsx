"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase';
import Link from 'next/link';
import Image from 'next/image';

interface ResultRow {
  rank: number;
  bib_number: string;
  name: string;
  category: string;
  total_score: number;
  yes_count: number;
  total_judges: number;
  avatar_url?: string;
  avatar?: string; 
  country_code?: string;
  judge_details: any[]; 
  status: 'Qualified' | 'Finalist' | 'Podium';
}

export default function ResultsPage() {
  const [results, setResults] = useState<ResultRow[]>([]);
  const [activeTab, setActiveTab] = useState('Preliminary');
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  // Helper to force 2-letter codes for FlagCDN
  const getFlagCode = (code: string | undefined) => {
    if (!code) return null;
    const clean = code.trim().toLowerCase();
    
    // Manual mapping for common 3-letter codes or variations
    const mapping: Record<string, string> = {
      'rou': 'ro',
      'rom': 'ro',
      'usa': 'us',
      'gbr': 'gb',
      'uk': 'gb',
      'esp': 'es',
      'ita': 'it',
      'fra': 'fr',
      'deu': 'de',
      'ger': 'de'
    };

    if (mapping[clean]) return mapping[clean];
    // If it's already 2 letters, return it. If not, slice it as a fallback.
    return clean.length === 2 ? clean : clean.slice(0, 2);
  };

  const getAvatarUrl = (path: string | undefined | null, name: string = "User") => {
    if (!path || path === 'null' || path === '') {
      return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0D0D0D&color=D1A546`;
    }
    if (path.startsWith('http')) return path;
    const fileName = path.split('/').pop();
    return `https://xtzkhxklkydewfzpqvbc.supabase.co/storage/v1/object/public/avatars/avatars/${fileName}`;
  }; 

  useEffect(() => {
    const checkUserAndFetch = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      setLoading(false);

      if (currentUser) {
        const { data } = await supabase
          .from('leaderboards') 
          .select('*')
          .eq('category', activeTab)
          .order(activeTab === 'Preliminary' ? 'yes_count' : 'total_score', { ascending: false })
          .order('total_score', { ascending: false });
        
        if (data) setResults(data as any);
      }
    };

    checkUserAndFetch();

    const channel = supabase
      .channel('live-results')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'scores' 
      }, () => {
        checkUserAndFetch();
      })
      .subscribe();

    return () => { 
      supabase.removeChannel(channel); 
    };
  }, [activeTab]);

  const goldGradient = "from-[#D1A546] via-white to-[#D1A546]";

  if (loading) return <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>;

  return (
    <main className="min-h-screen pt-24 md:pt-32 pb-20 px-4 md:px-6 overflow-x-hidden bg-[#050505]">
      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-10 md:mb-12 px-2">
          <h1 className="font-mortend text-[24px] xs:text-[28px] sm:text-4xl md:text-6xl text-white italic uppercase leading-[1.1] tracking-tight md:tracking-tighter mb-4 flex flex-col items-center overflow-visible">
            <span className="block">Official</span>
            <span className="relative inline-block text-transparent bg-clip-text bg-linear-to-r from-[#D1A546] via-white to-[#D1A546] px-6 -mx-6 pb-1 overflow-visible">
              Results
            </span>
          </h1>
          <p className="text-gray-500 uppercase tracking-[0.2em] md:tracking-[0.4em] text-[8px] md:text-[10px] italic text-center">
            Live Competition Standings — 2026 Season
          </p>
        </div>

        {!user ? (
          <div className="bg-[#0A0A0A]/80 border border-white/10 rounded-3xl p-12 text-center backdrop-blur-xl">
            <div className="mb-6 flex justify-center">
              <div className="w-16 h-16 bg-[#D1A546]/10 rounded-full flex items-center justify-center border border-[#D1A546]/30">
                <svg className="w-8 h-8 text-[#D1A546]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
            </div>
            <h2 className="font-mortend text-xl text-white mb-4 italic uppercase">Member Access Only</h2>
            <Link href="/register" className={`inline-block px-10 py-4 rounded-full text-[10px] font-black uppercase tracking-widest bg-linear-to-r ${goldGradient} text-black hover:scale-105 transition-transform`}>
              Log in to View Results
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-[#111111] border border-white/5 p-6 rounded-2xl">
                <p className="text-[10px] uppercase tracking-widest text-gray-300 mb-2 font-bold">Scoring Method</p>
                <h3 className="text-white text-lg font-bold">Numeric</h3>
              </div>
              <div className="bg-[#111111] border border-white/5 p-6 rounded-2xl">
                <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-2 font-bold">Scoring Algorithm</p>
                <h3 className="text-white text-lg font-bold">Yes Count</h3>
              </div>
              <div className="bg-[#111111] border border-white/5 p-6 rounded-2xl">
                <p className="text-[10px] uppercase tracking-widest text-gray-300 mb-2 font-bold">Published</p>
                <h3 className="text-white text-lg font-bold">{new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase()}</h3>
              </div>
            </div>

            <div className="flex overflow-x-auto no-scrollbar justify-start md:justify-center gap-3 mb-8 pb-4">
              {['Preliminary', 'Semi-finals', 'Finals'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  className={`whitespace-nowrap px-6 md:px-8 py-3 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all ${
                    activeTab === cat 
                    ? `bg-linear-to-r ${goldGradient} text-black` 
                    : "bg-white/5 text-gray-300 hover:text-white border border-white/10"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="bg-[#0A0A0A] border border-white/10 rounded-3xl overflow-hidden shadow-2xl mb-12">
              <div className="p-6 border-b border-white/5 flex justify-between items-center">
                <h2 className="font-mortend text-xl text-white italic uppercase tracking-tighter">Leader Results</h2>
                <span className="text-[9px] text-gray-300 uppercase tracking-widest font-bold bg-white/5 px-3 py-1 rounded-full">{results.length} Competitors</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-200">
                  <thead>
                    <tr className="border-b border-white/5 bg-white/2 text-[10px] uppercase tracking-widest text-[#D1A546] font-bold">
                      <th className="p-4 md:p-6">Rank</th>
                      <th className="p-4 md:p-6">Participant</th>
                      <th className="p-4 md:p-6 text-center">Advances</th>
                      <th className="p-4 md:p-6 text-center">Yes Count</th>
                      <th className="p-4 md:p-6 text-right">Raw Avg <br/><span className="lowercase font-normal italic text-[8px]">tie breaker</span></th>
                      {results[0]?.judge_details?.map((judge: any, i: number) => (
                        <th key={i} className="p-4 text-center min-w-15">
                          <div className="flex flex-col items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 relative overflow-hidden">
                              <Image 
                                src={getAvatarUrl(judge.avatar || judge.avatar_url, judge.initials)} 
                                alt="" 
                                fill 
                                sizes="32px"
                                className="object-cover"
                              />
                            </div>
                            <span className="text-[9px]">{judge.initials}</span>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {results.map((row, index) => {
                      const flagCode = getFlagCode(row.country_code);
                      return (
                        <tr key={`${row.bib_number}-${index}`} className="group hover:bg-white/2 transition-colors">
                          <td className="p-4 md:p-6 font-bold text-white text-base">{index + 1}</td>
                          <td className="p-4 md:p-6">
                            <div className="flex items-center gap-4">
                              <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white/5 shrink-0">
                                <Image 
                                  src={getAvatarUrl(row.avatar_url || row.avatar, row.name)} 
                                  alt="" 
                                  fill 
                                  sizes="48px"
                                  unoptimized={true} 
                                  className="object-cover"
                                  />
                              </div>
                              <div className="flex flex-col">
                                <span className="text-sm font-bold text-white uppercase tracking-tight">{row.name}</span>
                                <div className="flex items-center gap-2">
                                  {flagCode && (
                                    <div className="relative w-5 h-3.5 rounded-xs overflow-hidden border border-white/10 bg-white/5">
                                      {/* Fixed: Forced lowercase 2-letter code with PNG fallback */}
                                      <img 
                                        src={`https://flagcdn.com/w40/${flagCode}.png`} 
                                        alt=""
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                          (e.currentTarget.style.display = 'none');
                                        }}
                                      />
                                    </div>
                                  )}
                                  <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">
                                    {row.country_code === 'RO' || row.country_code === 'ROU' ? 'ROMANIA' : row.country_code}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="p-4 md:p-6 text-center">
                             {index < 16 && (
                              <div className="inline-flex items-center justify-center w-6 h-6 rounded-full border border-emerald-500/50 bg-emerald-500/10">
                                  <svg className="w-3 h-3 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                  </svg>
                              </div>
                             )}
                          </td>
                          <td className="p-4 md:p-6 text-center text-white font-medium">
                            {row.yes_count}/{row.total_judges}
                          </td>
                          <td className="p-4 md:p-6 text-right text-gray-400 font-mono text-xs">
                            {row.total_score.toFixed(2)}
                          </td>
                          {row.judge_details?.map((vote: any, i: number) => (
                            <td key={i} className="p-4 text-center">
                              <span className={`text-[10px] font-bold uppercase tracking-widest ${vote.vote ? 'text-[#50C878]' : 'text-[#FF4D4D]'}`}>
                                {vote.vote ? 'Yes' : 'No'}
                              </span>
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              {results.length === 0 && (
                <div className="p-16 md:p-20 text-center">
                  <p className="text-gray-300 uppercase tracking-widest text-[10px] md:text-xs italic">Waiting for official scores...</p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </main>
  );
}