"use client";

import React, { useState, useCallback, useMemo } from 'react';
import { parse, unparse } from 'papaparse'; 

export default function AdminChecklist() {
  const [competitors, setCompetitors] = useState<any[]>([]);
  const [compFilename, setCompFilename] = useState<string | null>(null);
  const [passHolders, setPassHolders] = useState<any[]>([]);
  const [passFilename, setPassFilename] = useState<string | null>(null);
  const [results, setResults] = useState<{ confirmed: any[], missing: any[] } | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  
  // NEW: State for check-in tracking and Desk Search
  const [checkedInIds, setCheckedInIds] = useState<Set<string>>(new Set());
  const [deskSearchTerm, setDeskSearchTerm] = useState("");

  const titleFont = "font-mortend tracking-tighter italic uppercase";
  const bodyFont = "font-sans";
  const goldWhiteGold = "bg-gradient-to-r from-[#D1A546] via-white to-[#D1A546]";

  const normalize = (name: string) => name?.toLowerCase().replace(/\s+/g, ' ').trim() || "";

  const getInsensitive = (obj: any, targetKey: string) => {
    const key = Object.keys(obj).find(k => k.toLowerCase() === targetKey.toLowerCase());
    return key ? obj[key] : undefined;
  };

  const handleReset = () => {
    setCompetitors([]);
    setCompFilename(null);
    setPassHolders([]);
    setPassFilename(null);
    setResults(null);
    setSearchTerm("");
    setDeskSearchTerm(""); // Reset desk search
    setCheckedInIds(new Set());
  };

  const toggleCheckIn = (id: string) => {
    setCheckedInIds(prev => {
      const newChecked = new Set(prev);
      if (newChecked.has(id)) newChecked.delete(id);
      else newChecked.add(id);
      return newChecked;
    });
  };

  const manuallyVerify = (user: any) => {
    setResults(prev => {
      if (!prev) return prev;
      const updatedUser = { ...user, ticket_type: "MANUAL VERIFIED" };
      return {
        confirmed: [...prev.confirmed, updatedUser],
        missing: prev.missing.filter(u => u.id !== user.id)
      };
    });
  };

  const filteredResults = useMemo(() => {
    if (!results) return null;
    if (!searchTerm) return results;

    const term = searchTerm.toLowerCase();
    return {
      confirmed: results.confirmed.filter(u => 
        u.display_name.toLowerCase().includes(term) || u.display_email.toLowerCase().includes(term)
      ),
      missing: results.missing.filter(u => 
        u.display_name.toLowerCase().includes(term) || u.display_email.toLowerCase().includes(term)
      )
    };
  }, [results, searchTerm]);

  // NEW: Memoized filter for the Desk section
  const filteredDeskResults = useMemo(() => {
    if (!results) return [];
    if (!deskSearchTerm) return results.confirmed;
    const term = deskSearchTerm.toLowerCase();
    return results.confirmed.filter(u => 
      u.display_name.toLowerCase().includes(term)
    );
  }, [results, deskSearchTerm]);

  const copyAllEmails = (list: any[]) => {
    const emails = list
      .map(u => u.display_email)
      .filter(email => email && email !== 'N/A')
      .join(', ');
    
    navigator.clipboard.writeText(emails);
    alert(`Copied ${list.length} emails to clipboard for BCC!`);
  };

  const downloadCSV = (data: any[], filename: string) => {
    const exportData = data.map(item => ({
      Name: item.display_name,
      Role: item.display_role,
      Email: item.display_email,
      Status: item.ticket_type || "Pending",
      CheckedIn: checkedInIds.has(item.id) ? "YES" : "NO"
    }));
    
    const csv = unparse(exportData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `${filename}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFileDrop = useCallback((e: React.DragEvent<HTMLDivElement>, type: 'comp' | 'pass') => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    if (file && file.type === 'text/csv') {
      processFile(file, type);
    } else {
      alert("Please upload a valid CSV file.");
    }
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>, type: 'comp' | 'pass') => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file, type);
    }
  }, []);

  const processFile = (file: File, type: 'comp' | 'pass') => {
    parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        if (type === 'comp') {
          setCompetitors(result.data);
          setCompFilename(file.name);
        } else {
          setPassHolders(result.data);
          setPassFilename(file.name);
        }
      }
    });
  };

  const preventDefaults = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const runCrossCheck = () => {
    const confirmed: any[] = [];
    const missing: any[] = [];

    const passMap = new Map();
    passHolders.forEach(p => {
      const rawName = getInsensitive(p, 'full_name') || getInsensitive(p, 'name') || "";
      const ticketType = getInsensitive(p, 'ticket') || getInsensitive(p, 'type') || "Valid Pass";
      passMap.set(normalize(String(rawName)), ticketType);
    });

    competitors.forEach((comp, idx) => {
      const rawCompName = getInsensitive(comp, 'full_name') || getInsensitive(comp, 'name') || "";
      const normalizedCompName = normalize(String(rawCompName));
      
      const ticketFound = passMap.get(normalizedCompName);

      const processedComp = {
        ...comp,
        id: `reg-${idx}`, 
        display_name: rawCompName,
        display_role: getInsensitive(comp, 'role') || 'N/A',
        display_email: getInsensitive(comp, 'email') || 'N/A',
        ticket_type: ticketFound || null
      };

      if (ticketFound) {
        confirmed.push(processedComp);
      } else {
        missing.push(processedComp);
      }
    });

    setResults({ confirmed, missing });
  };

  const RoleBadge = ({ role }: { role: string }) => {
    const isLead = role?.toLowerCase().includes('lead');
    return (
      <span className={`text-[9px] px-2 py-0.5 rounded-full border font-bold uppercase tracking-widest ${
        isLead 
          ? 'border-[#D1A546] text-[#D1A546] bg-[#D1A546]/10' 
          : 'border-purple-400 text-purple-400 bg-purple-400/10'
      }`}>
        {role}
      </span>
    );
  };

  const UploadCard = ({ title, filename, onDrop, onSelect, description }: any) => (
    <div 
      className="bg-white/5 border-2 border-dashed border-[#D1A546]/30 hover:border-[#D1A546] p-8 rounded-4xl backdrop-blur-3xl aspect-square flex flex-col items-center justify-center cursor-pointer transition-all duration-300 group shadow-2xl"
      onDragOver={preventDefaults}
      onDragEnter={preventDefaults}
      onDrop={onDrop}
      onClick={() => document.getElementById(`${title.replace(/\s+/g, '')}-input`)?.click()}
    >
      <input id={`${title.replace(/\s+/g, '')}-input`} type="file" accept=".csv" onChange={onSelect} className="hidden" />
      {filename ? (
        <div className="flex flex-col items-center gap-4 text-center animate-in fade-in zoom-in duration-300">
           <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#D1A546" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
          </svg>
          <span className={`${titleFont} text-white text-xs tracking-wider`}>CSV Loaded</span>
          <span className="text-[11px] text-[#D1A546] font-bold uppercase tracking-widest bg-[#D1A546]/10 px-3 py-1 rounded-full">{filename}</span>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-5 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#D1A546" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="opacity-60 group-hover:opacity-100 transition-opacity">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
          </svg>
          <div className="space-y-2">
            <h2 className={`${titleFont} text-lg text-white`}>{title}</h2>
            <p className="text-[11px] text-gray-400 font-bold uppercase tracking-[0.2em]">Drag & Drop CSV File</p>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest">{description}</p>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <main className={`min-h-screen pt-20 pb-24 px-6 bg-black text-white ${bodyFont}`}>
      <div className="max-w-6xl mx-auto">
        <h1 className={`${titleFont} text-4xl mb-12 mt-10 text-center`}>
          Registration <span className="text-[#D1A546]">Cross-Check</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16 max-w-4xl mx-auto">
          <UploadCard title="Competitor List" filename={compFilename} description='Needs: "full_name" and "role"' onDrop={(e: any) => handleFileDrop(e, 'comp')} onSelect={(e: any) => handleFileSelect(e, 'comp')} />
          <UploadCard title="Festival Pass List" filename={passFilename} description='Needs: "full_name"' onDrop={(e: any) => handleFileDrop(e, 'pass')} onSelect={(e: any) => handleFileSelect(e, 'pass')} />
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
          <button onClick={runCrossCheck} disabled={!competitors.length || !passHolders.length} className={`p-[1.5px] rounded-full ${goldWhiteGold} transition-all duration-500 hover:shadow-[0_0_25px_rgba(209,165,70,0.3)] active:scale-95 disabled:opacity-30 disabled:pointer-events-none group`}>
            <div className="bg-[#3A0353] py-4 px-16 rounded-full group-hover:bg-[#4a056a] transition-colors">
              <span className="text-sm font-bold italic uppercase tracking-[0.3em] text-[#D1A546]">Create list</span>
            </div>
          </button>
          {(compFilename || passFilename || results) && (
            <button onClick={handleReset} className="text-[10px] text-gray-500 hover:text-white uppercase font-bold tracking-[0.2em] transition-colors border-b border-transparent hover:border-white pb-1">
              Clear Data & Reset
            </button>
          )}
        </div>

        {results && (
          <div className="max-w-md mx-auto mb-10">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="h-4 w-4 text-[#D1A546] opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </div>
              <input type="text" placeholder="Search by name or email..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="block w-full bg-white/5 border border-white/10 rounded-full py-3 pl-11 pr-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#D1A546] focus:border-[#D1A546] transition-all" />
            </div>
          </div>
        )}

        {filteredResults && results && (
          <div className="space-y-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 animate-in fade-in slide-in-from-bottom duration-700">
              <div className="space-y-4">
                <div className="flex justify-between items-center px-4">
                  <h3 className={`${titleFont} text-green-500 text-xl`}>Confirmed</h3>
                  <div className="flex items-center gap-3">
                    <span className="bg-green-500/20 text-green-500 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">READY ({filteredResults.confirmed.length})</span>
                    <button onClick={() => downloadCSV(filteredResults.confirmed, 'confirmed_competitors')} className="p-2 bg-white/5 hover:bg-green-500/20 rounded-full border border-white/10"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg></button>
                  </div>
                </div>
                <div className="bg-green-500/5 border border-green-500/20 rounded-4xl overflow-hidden max-h-100 overflow-y-auto custom-scrollbar">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-green-500/10 text-green-500 uppercase text-[10px] tracking-[0.2em] font-bold">
                      <tr><th className="p-5">Name / Pass Type</th><th className="p-5">Role</th></tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {filteredResults.confirmed.map((user, i) => (
                        <tr key={i} className="hover:bg-white/5 transition-colors">
                          <td className="p-5">
                            <p className="text-white font-medium capitalize">{user.display_name}</p>
                            <p className="text-[9px] text-green-400/60 uppercase tracking-tighter font-bold">{user.ticket_type}</p>
                          </td>
                          <td className="p-5"><RoleBadge role={user.display_role} /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center px-4">
                  <h3 className={`${titleFont} text-red-500 text-xl`}>Red List</h3>
                  <div className="flex items-center gap-3">
                    <span className="bg-red-500/20 text-red-500 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">ACTION REQUIRED ({filteredResults.missing.length})</span>
                    <button 
                      onClick={() => copyAllEmails(filteredResults.missing)} 
                      className="p-2 bg-white/5 hover:bg-[#D1A546]/20 rounded-full border border-white/10"
                      title="Copy All Emails for BCC"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D1A546" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                    </button>
                    <button onClick={() => downloadCSV(filteredResults.missing, 'red_list_reminder')} className="p-2 bg-white/5 hover:bg-red-500/20 rounded-full border border-white/10"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg></button>
                  </div>
                </div>
                <div className="bg-red-500/5 border border-red-500/20 rounded-4xl overflow-hidden max-h-100 overflow-y-auto custom-scrollbar">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-red-500/10 text-red-500 uppercase text-[10px] tracking-[0.2em] font-bold">
                      <tr><th className="p-5">Name / Email</th><th className="p-5 text-right">Actions</th></tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {filteredResults.missing.map((user, i) => (
                        <tr key={i} className="hover:bg-white/5 transition-colors">
                          <td className="p-5">
                            <p className="text-white font-medium capitalize">{user.display_name}</p>
                            <p className="text-[10px] text-gray-500 lowercase">{user.display_email}</p>
                          </td>
                          <td className="p-5 text-right space-y-2">
                             <RoleBadge role={user.display_role} />
                             <div className="pt-1">
                               <button onClick={() => manuallyVerify(user)} className="text-[8px] font-bold uppercase tracking-widest text-[#D1A546] border border-[#D1A546]/40 px-2 py-1 rounded-full hover:bg-[#D1A546] hover:text-black transition-all">Migrate to Desk</button>
                             </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* REGISTRATION DAY SECTION (WITH NEW SEARCH & UNDO) */}
            <div className="pt-20 border-t border-white/10 animate-in fade-in slide-in-from-bottom duration-1000">
              <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
                <div className="space-y-1 text-center md:text-left">
                  <h2 className={`${titleFont} text-2xl`}>Registration <span className="text-[#D1A546]">Desk</span></h2>
                  <p className="text-[10px] text-gray-500 uppercase tracking-[0.3em] font-bold">Hand over bags & track pick-ups</p>
                </div>
                
                <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
                  {/* NEW: Desk-Specific Search Bar */}
                  <div className="relative w-full sm:w-64">
                    <input 
                      type="text" 
                      placeholder="Fast Search Desk..." 
                      value={deskSearchTerm} 
                      onChange={(e) => setDeskSearchTerm(e.target.value)} 
                      className="w-full bg-white/5 border border-white/10 rounded-full py-2 px-4 text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#D1A546]" 
                    />
                  </div>
                  <div className="bg-white/5 border border-[#D1A546]/30 rounded-full px-6 py-2 whitespace-nowrap">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#D1A546] italic">
                      Live: {checkedInIds.size} / {results.confirmed.length}
                    </span>
                  </div>
                  <button onClick={() => downloadCSV(results.confirmed, 'final_checkin_report')} className="bg-white text-black text-[10px] font-bold uppercase tracking-widest px-6 py-2.5 rounded-full hover:bg-[#D1A546] transition-colors">Download Report</button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDeskResults.map((user) => {
                  const isChecked = checkedInIds.has(user.id);
                  return (
                    <div 
                      key={user.id} 
                      className={`p-6 rounded-3xl border transition-all duration-300 flex flex-col justify-between gap-6 ${
                        isChecked 
                        ? 'bg-[#D1A546]/10 border-[#D1A546] shadow-[0_0_20px_rgba(209,165,70,0.1)]' 
                        : 'bg-white/5 border-white/10'
                      }`}
                    >
                      <div className={isChecked ? 'opacity-40' : ''}>
                        <div className="flex justify-between items-start mb-2">
                          <p className={`capitalize font-bold text-lg leading-tight ${isChecked ? 'line-through' : ''}`}>{user.display_name}</p>
                          <RoleBadge role={user.display_role} />
                        </div>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-[#D1A546] font-bold">{user.ticket_type}</p>
                      </div>

                      <div className="space-y-3">
                        <button 
                          onClick={() => toggleCheckIn(user.id)}
                          className={`w-full py-3 rounded-xl text-[10px] font-bold uppercase tracking-[0.3em] transition-all ${
                            isChecked 
                            ? 'bg-green-500 text-black border-transparent pointer-events-none' 
                            : 'bg-transparent border border-[#D1A546] text-[#D1A546] hover:bg-[#D1A546] hover:text-black'
                          }`}
                        >
                          {isChecked ? '✓ Handed Over' : 'Give Bag & Number'}
                        </button>
                        
                        {/* NEW: Undo Button for mistakes */}
                        {isChecked && (
                          <button 
                            onClick={() => toggleCheckIn(user.id)}
                            className="w-full text-[9px] font-bold uppercase tracking-widest text-gray-500 hover:text-white transition-colors"
                          >
                            Mistake? Undo
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}