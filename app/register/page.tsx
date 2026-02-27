"use client";

import React, { useState, useRef, useCallback } from 'react';
import { supabase } from '../../utils/supabase';
import Cropper from 'react-easy-crop';

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); 
  const [submitted, setSubmitted] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(false);
  const [errors, setErrors] = useState<string[]>([]); // New state for validation
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  
  const countryList = [
    "Romania", "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", 
    "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", 
    "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", 
    "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", 
    "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", 
    "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", 
    "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", 
    "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", 
    "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", 
    "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", 
    "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", 
    "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, North", "Korea, South", 
    "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", 
    "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", 
    "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", 
    "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", 
    "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", 
    "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", 
    "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Russia", "Rwanda", "Saint Kitts and Nevis", 
    "Saint Lucia", "Saint Vincent", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", 
    "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", 
    "Solomon Islands", "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", 
    "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", 
    "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", 
    "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", 
    "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
  ];

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    country: "Romania",
    city: "",
    birthdate: "",
    role: "Lead",
    yearsDancing: 2,
    instagram: "",
    phone: "",
    profileImage: null as File | null,
    imagePreview: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const titleFont = "font-mortend tracking-tighter italic uppercase"; 
  const bodyFont = "font-sans";
  const inputBase = `w-full p-4 rounded-2xl bg-white/5 border text-white outline-none transition-all placeholder:text-gray-400 text-sm md:text-base ${bodyFont}`;
  const goldWhiteGold = "bg-gradient-to-r from-[#D1A546] via-white to-[#D1A546]";

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // VALIDATION HELPER
  const handleNext = () => {
    const currentErrors: string[] = [];
    
    if (step === 1) {
      if (!validateEmail(formData.email)) currentErrors.push("email");
      if (formData.password.length < 6) currentErrors.push("password");
    } else if (step === 2) {
      if (!formData.firstName.trim()) currentErrors.push("firstName");
      if (!formData.lastName.trim()) currentErrors.push("lastName");
      if (!formData.birthdate) currentErrors.push("birthdate");
      if (!formData.city.trim()) currentErrors.push("city");
    } else if (step === 4) {
      if (!formData.instagram.trim()) currentErrors.push("instagram");
    } else if (step === 5) {
      if (!formData.imagePreview) currentErrors.push("imagePreview");
    }

    if (currentErrors.length > 0) {
      setErrors(currentErrors);
    } else {
      setErrors([]);
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setErrors([]); // Clear errors when going back
    setStep((prev) => prev - 1);
  };

  const onCropComplete = useCallback((croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleImageChange = (file: File | undefined) => {
    if (file) {
      setFormData({ 
        ...formData, 
        profileImage: file, 
        imagePreview: URL.createObjectURL(file) 
      });
      setZoom(1);
      setErrors(errors.filter(e => e !== "imagePreview"));
    }
  };

  const handleSignUpInit = async (e: React.FormEvent) => {
    e.preventDefault();
    handleNext(); // Use the new logic
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      alert(error.message);
      setLoading(false);
    } else {
      window.location.href = "/dashboard";
    }
  };

  const handleFinalSubmit = async () => {
    setLoading(true);
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (authError) throw authError;
      const userId = authData.user?.id;
      if (!userId) throw new Error("Auth failed");

      let publicImageUrl = null;

      // STORAGE UPLOAD LOGIC
      if (formData.profileImage) {
        const file = formData.profileImage;
        const fileExt = file.name.split('.').pop();
        const fileName = `${userId}-avatar.${fileExt}`;
        const filePath = `avatars/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(filePath, file);

        if (!uploadError) {
          const { data: { publicUrl } } = supabase.storage
            .from('avatars')
            .getPublicUrl(filePath);
          publicImageUrl = publicUrl;
        }
      }

      const { error: dbError } = await supabase
        .from('registrations')
        .insert([{
          id: userId,
          full_name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          country: formData.country,
          city: formData.city,
          birthdate: formData.birthdate || null,
          role: formData.role,
          years_dancing: formData.yearsDancing,
          instagram: formData.instagram,
          phone: formData.phone,
          profile_image_url: publicImageUrl
        }]);

      if (dbError) throw dbError;
      else setSubmitted(true);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ERROR MESSAGE COMPONENT
  const RequiredMessage = () => (
    <p className="text-red-500 text-[12px] uppercase tracking-tighter mt-1 ml-2 animate-pulse">
      you must fill this field in order to continue
    </p>
  );

  const GoldenButton = ({ label, onClick, type = "button", disabled = false }: any) => (
    <div className="flex justify-center mt-6">
      <button 
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`flex items-center justify-center p-[1.5px] rounded-full ${goldWhiteGold} transition-all duration-500 hover:shadow-[0_0_25px_rgba(209,165,70,0.4)] active:scale-95 group`}
      >
        <div className="bg-[#3A0353] py-3 px-10 rounded-full transition-colors duration-300 group-hover:bg-[#4a056a]">
          <span className={`relative z-10 text-center text-[12px] md:text-[11px] font-bold uppercase tracking-[0.2em] text-[#D1A546] ${bodyFont}`}>
            {disabled ? "Processing..." : label}
          </span>
        </div>
      </button>
    </div>
  );

  if (submitted) {
    return (
      <main className="min-h-screen bg-black/50 flex items-center justify-center px-6 text-center">
        <div className="animate-in zoom-in duration-700 max-w-sm">
           <div className="w-24 h-24 bg-linear-to-b from-[#3A0353] to-black border border-[#D1A546]/50 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(209,165,70,0.2)]">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#D1A546" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" /><path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" /><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" /><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
              </svg>
           </div>
           <h1 className={`${titleFont} text-2xl md:text-4xl mb-4 leading-tight`}>
             <span className="text-white">Welcome to the</span> <br/><span className="text-gray-400">Main Stage</span>
           </h1>
           <div className="flex justify-center">
             <button onClick={() => window.location.href = '/dashboard'} className="group relative flex items-center gap-3 px-8 py-3 bg-white/5 border border-white/10 rounded-full hover:border-[#D1A546]/50 transition-all duration-300">
               <span className="text-[10px] uppercase tracking-[0.2em] text-white font-bold">Access to your dashboard</span>
             </button>
           </div>
        </div>
      </main>
    );
  }

  return (
    <main className={`min-h-screen pt-20 pb-12 px-4 bg-black flex items-center justify-center opacity-90 ${bodyFont}`}>
      <div className="w-full max-w-md bg-linear-to-b from-[#3A0353] to-black border border-[#D1A546] p-6 md:p-10 rounded-[2.5rem] backdrop-blur-3xl shadow-2xl relative overflow-hidden">
        <div className="w-full h-1 bg-white/10 rounded-full mb-8 overflow-hidden">
          <div className="h-full bg-[#D1A546] transition-all duration-500" style={{ width: `${(step / 6) * 100}%` }} />
        </div>

        {/* STEP 1 */}
        {step === 1 && (
          <form onSubmit={isLoginMode ? handleSignIn : handleSignUpInit} className="animate-in fade-in duration-500 flex flex-col gap-5">
            <h1 className={`${titleFont} text-2xl md:text-3xl text-white`}>{isLoginMode ? 'Welcome' : 'Create'} <span className="text-[#D1A546]">{isLoginMode ? 'Back' : 'Account'}</span></h1>
            
            <div>
              <input 
                type="text" placeholder="Email Address" value={formData.email} 
                onChange={(e) => {setFormData({...formData, email: e.target.value}); setErrors(errors.filter(err => err !== "email"));}}
                className={`${inputBase} ${errors.includes("email") ? 'border-red-500 bg-red-500/10' : 'border-white/10 focus:border-[#D1A546]'} pr-12`} 
              />
              {errors.includes("email") && <RequiredMessage />}
            </div>

            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} placeholder="Password"
                value={formData.password} onChange={(e) => {setFormData({...formData, password: e.target.value}); setErrors(errors.filter(err => err !== "password"));}}
                className={`${inputBase} ${errors.includes("password") ? 'border-red-500 bg-red-500/10' : 'border-white/10 focus:border-[#D1A546]'} pr-12`}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#D1A546] transition-colors">
                {showPassword ? "Hide" : "Show"}
              </button>
              {errors.includes("password") && <RequiredMessage />}
            </div>
            
            <GoldenButton label={isLoginMode ? "Sign In" : "Continue"} type="submit" />
            <p className="text-center text-[12px] text-gray-400 uppercase tracking-widest mt-2">
                {isLoginMode ? "New to the circuit?" : "Already have an account?"}
                <button type="button" onClick={() => setIsLoginMode(!isLoginMode)} className="ml-2 text-[#D1A546] font-bold hover:underline">{isLoginMode ? "Register Here" : "Sign In Here"}</button>
            </p>
          </form>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className="animate-in slide-in-from-right duration-500 flex flex-col gap-5">
            <h1 className={`${titleFont} text-2xl md:text-3xl text-white`}>Personal <span className="text-[#D1A546]">Basics</span></h1>
            <div>
                <input placeholder="First Name" value={formData.firstName} onChange={(e) => {setFormData({...formData, firstName: e.target.value}); setErrors(errors.filter(err => err !== "firstName"));}} className={`${inputBase} ${errors.includes("firstName") ? 'border-red-500 bg-red-500/10' : 'border-white/10 focus:border-[#D1A546]'}`} />
                {errors.includes("firstName") && <RequiredMessage />}
            </div>
            <div>
                <input placeholder="Last Name" value={formData.lastName} onChange={(e) => {setFormData({...formData, lastName: e.target.value}); setErrors(errors.filter(err => err !== "lastName"));}} className={`${inputBase} ${errors.includes("lastName") ? 'border-red-500 bg-red-500/10' : 'border-white/10 focus:border-[#D1A546]'}`} />
                {errors.includes("lastName") && <RequiredMessage />}
            </div>
            <div className="space-y-1">
              <label className="text-[10px] text-gray-400 uppercase tracking-widest ml-2">Date of Birth</label>
              <input type="date" value={formData.birthdate} onChange={(e) => {setFormData({...formData, birthdate: e.target.value}); setErrors(errors.filter(err => err !== "birthdate"));}} className={`${inputBase} .\[color-scheme\:dark\] cursor-pointer ${errors.includes("birthdate") ? 'border-red-500 bg-red-500/10' : 'border-white/10 focus:border-[#D1A546]'}`} />
              {errors.includes("birthdate") && <RequiredMessage />}
            </div>
            <div className="relative">
              <select value={formData.country} onChange={(e) => setFormData({...formData, country: e.target.value})} className={inputBase + " border-white/10 appearance-none bg-black focus:border-[#D1A546] pr-12 cursor-pointer"}>
                {countryList.map((country) => (<option key={country} value={country}>{country}</option>))}
              </select>
            </div>
            <div>
              <input placeholder="City" value={formData.city} onChange={(e) => {setFormData({...formData, city: e.target.value}); setErrors(errors.filter(err => err !== "city"));}} className={`${inputBase} ${errors.includes("city") ? 'border-red-500 bg-red-500/10' : 'border-white/10 focus:border-[#D1A546]'}`} />
              {errors.includes("city") && <RequiredMessage />}
            </div>
            <GoldenButton label="Continue" onClick={handleNext} />
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div className="animate-in slide-in-from-right duration-500 flex flex-col gap-5">
            <h1 className={`${titleFont} text-2xl md:text-3xl text-white`}>Dance <span className="text-[#D1A546]">Journey</span></h1>
            <div className="flex gap-4 mt-2">
              {["Lead", "Follow", "Both"].map((r) => (
                <button key={r} onClick={() => setFormData({...formData, role: r})} className={`flex-1 py-3 rounded-xl border transition-all ${formData.role === r ? 'border-[#D1A546] bg-[#D1A546]/10 text-[#D1A546]' : 'border-white/10 text-gray-400'}`}>{r}</button>
              ))}
            </div>
            <div className="mt-6">
              <div className="flex justify-between text-[13px] uppercase tracking-widest text-gray-300 mb-4">
                <span>Years Dancing</span>
                <span className="text-[#ffffff] shadow-[0_0_10px_#3a0353]">{formData.yearsDancing} Years</span>
              </div>
              <input type="range" min="0" max="20" value={formData.yearsDancing} onChange={(e) => setFormData({...formData, yearsDancing: parseInt(e.target.value)})} className="w-full accent-[#8c00ff] cursor-pointer" />
            </div>
            <GoldenButton label="Continue" onClick={handleNext} />
          </div>
        )}

        {/* STEP 4 */}
        {step === 4 && (
          <div className="animate-in slide-in-from-right duration-500 flex flex-col gap-5">
            <h1 className={`${titleFont} text-2xl md:text-3xl text-white`}>Stay <span className="text-[#D1A546]">Connected</span></h1>
            <div>
                <input placeholder="@instagram_handle" value={formData.instagram} onChange={(e) => {setFormData({...formData, instagram: e.target.value}); setErrors(errors.filter(err => err !== "instagram"));}} className={`${inputBase} ${errors.includes("instagram") ? 'border-red-500 bg-red-500/10' : 'border-white/10 focus:border-[#D1A546]'}`} />
                {errors.includes("instagram") && <RequiredMessage />}
            </div>
            <input placeholder="Phone Number (optional)" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className={inputBase + " border-white/10 focus:border-[#D1A546]"} />
            <GoldenButton label="Continue" onClick={handleNext} />
          </div>
        )}

        {/* STEP 5 */}
        {step === 5 && (
          <div className="animate-in slide-in-from-right duration-500 flex flex-col gap-5">
            <h1 className={`${titleFont} text-2xl md:text-3xl text-white`}>Participant's <span className="text-[#D1A546]">Photo</span></h1>
            <div onClick={() => !formData.imagePreview && fileInputRef.current?.click()} className={`relative mt-2 w-full aspect-square rounded-3xl border-2 border-dashed transition-all overflow-hidden flex flex-col items-center justify-center cursor-pointer ${errors.includes("imagePreview") ? 'border-red-500 bg-red-500/10' : 'border-[#D1A546]/30 bg-white/5 hover:border-[#D1A546]'}`}>
              {formData.imagePreview ? (
                <div className="absolute inset-0"><Cropper image={formData.imagePreview} crop={crop} zoom={zoom} aspect={1} onCropChange={setCrop} onCropComplete={onCropComplete} onZoomChange={setZoom} /></div>
              ) : (
                <div className="flex flex-col items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#D1A546" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="opacity-60">
                    <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/>
                  </svg>
                  <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold px-6 text-center">
                    Take a Photo or <br/> Choose from Library
                  </span>
                </div>
              )}
            </div>
            {errors.includes("imagePreview") && <RequiredMessage />}
            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={(e) => handleImageChange(e.target.files?.[0])} />
            {formData.imagePreview && (
              <div className="flex flex-col gap-4 animate-in fade-in zoom-in duration-300">
                <input type="range" min="1" max="3" step="0.1" value={zoom} onChange={(e) => setZoom(parseFloat(e.target.value))} className="w-full accent-[#D1A546] cursor-pointer" />
                <GoldenButton label="Looks Great" onClick={handleNext} />
                <button onClick={() => fileInputRef.current?.click()} className="text-[10px] text-gray-400 uppercase tracking-[0.2em] hover:text-[#D1A546] transition-colors py-2">Change Photo</button>
              </div>
            )}
          </div>
        )}

        {/* STEP 6 */}
        {step === 6 && (
        <div className="animate-in slide-in-from-right duration-500 flex flex-col items-center gap-5 text-center">
            <h1 className={`${titleFont} text-2xl md:text-3xl text-white`}>Final <span className="text-[#D1A546]">Check</span></h1>
            
            {/* PROFILE CIRCLE */}
            {formData.imagePreview && (
                <div className="relative mb-2">
                    <div className="w-24 h-24 rounded-full border-2 border-[#D1A546] p-1 shadow-[0_0_20px_rgba(209,165,70,0.3)]">
                        <div className="w-full h-full rounded-full overflow-hidden bg-white/10">
                          <img src={formData.imagePreview} className="w-full h-full object-cover" alt="Profile" />
                        </div>
                    </div>
                </div>
            )}

            {/* FULL DETAILS CARD */}
            <div className="w-full bg-white/5 rounded-2xl p-5 text-left border border-white/10 space-y-4 backdrop-blur-md max-h-75 overflow-y-auto custom-scrollbar">
                
                {/* IDENTITY */}
                <div>
                  <p className="text-[#D1A546] text-[15px] uppercase tracking-widest font-bold mb-1">Identity</p>
                  <p className="text-white text-[15px] font-bold uppercase">{formData.firstName} {formData.lastName}</p>
                  <p className="text-gray-400 text-[15px] uppercase">{formData.city}, {formData.country}</p>
                  <p className="text-gray-400 text-[15px] mt-1 italic">{formData.email}</p>
                </div>

                <div className="h-1px bg-white/10 w-full" />

                {/* DANCE INFO */}
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-[#D1A546] text-[15px] uppercase tracking-widest font-bold mb-1">Dance Journey</p>
                    <p className="text-white text-[15px] uppercase">{formData.role} <span className="text-gray-400 mx-2">|</span> {formData.yearsDancing} Years</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[#D1A546] text-[15px] uppercase tracking-widest font-bold mb-1">Birthdate</p>
                    <p className="text-white text-[15px]">{formData.birthdate}</p>
                  </div>
                </div>

                <div className="h-1px bg-white/10 w-full" />

                {/* SOCIALS */}
                <div>
                  <p className="text-[#D1A546] text-[15px] uppercase tracking-widest font-bold mb-1">Social & Contact</p>
                  <div className="flex flex-col gap-1">
                    <p className="text-white text-[15px] flex items-center gap-2">
                      <span className="text-gray-400 font-bold">IG:</span> {formData.instagram}
                    </p>
                    {formData.phone && (
                      <p className="text-white text-[15px] flex items-center gap-2">
                        <span className="text-gray-400 font-bold">TEL:</span> {formData.phone}
                      </p>
                    )}
                  </div>
                </div>
            </div>

            <GoldenButton label={loading ? "Registering..." : "Confirm & Register"} onClick={handleFinalSubmit} disabled={loading} />
        </div>
        )}

        <button onClick={handleBack} className={`mt-6 text-[12px] text-gray-400 uppercase tracking-widest hover:text-white transition-all ${step === 1 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>← Back</button>
      </div>
    </main>
  );
}