"use client";

import React, { useState } from 'react';
import { X, Check, ShieldCheck, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const OTPVerification = () => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const router = useRouter();

  const handleVerify = () => {
    setShowSuccessModal(true);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-linear-to-b from-blue-50 via-blue-300 to-blue-500 p-4 font-sans relative">
      
      {/* Logo & Brand */}
      <div className="flex flex-col items-center mb-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center shadow-lg">
            <div className="w-5 h-4 bg-white rounded-sm relative">
                <div className="absolute -bottom-1 left-1 w-2 h-2 bg-white rotate-45"></div>
            </div>
          </div>
          <span className="text-2xl font-bold text-gray-900">Svario.is</span>
        </div>
        <h2 className="text-3xl font-bold text-blue-500 opacity-90">Welcome</h2>
      </div>

      {/* OTP Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 relative">
        
        {/* Close Button */}
        <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors">
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Confirm <span className="text-blue-400">Email Address</span>
          </h1>
          <p className="text-gray-500 text-sm mt-3 px-2 leading-relaxed">
            We have sent OTP to your email <span className="font-semibold text-gray-700">willia*******l.com</span>
          </p>
        </div>

        {/* OTP Inputs */}
        <div className="flex justify-center gap-3 mb-6">
          {[1, 8, 5, ""].map((val, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              defaultValue={val}
              className={`w-12 h-14 text-center text-lg font-bold rounded-xl border-2 outline-none transition-all
                ${val !== "" 
                  ? "border-blue-400 text-blue-500 bg-white shadow-sm" 
                  : "border-gray-100 text-gray-400 bg-gray-50 focus:border-blue-400 focus:bg-white"
                }`}
            />
          ))}
        </div>

        {/* Timer */}
        <div className="text-center mb-8">
          <p className="text-xs font-bold text-gray-800 tracking-wider uppercase">
            Resend Code <span className="text-blue-500 ml-1">(00:59)</span>
          </p>
        </div>

        {/* Verify Button */}
        <button
          onClick={handleVerify}
          type="button"
          className="w-full bg-blue-400 hover:bg-blue-500 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-100 transition-all active:scale-[0.98] text-sm group"
        >
          Verify OTP
        </button>
      </div>

      {/* SUCCESS MODAL OVERLAY */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay Background */}
          <div className="absolute inset-0 bg-blue-900/40 backdrop-blur-sm animate-in fade-in duration-300"></div>
          
          {/* Modal Container */}
          <div className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl p-10 flex flex-col items-center text-center animate-in zoom-in-95 duration-300">
             
             {/* Success Icon Section */}
             <div className="relative mb-8">
                {/* Decorative Dots/Bubbles */}
                <div className="absolute -top-4 -left-4 w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                <div className="absolute top-0 -right-6 w-2 h-2 bg-blue-300 rounded-full"></div>
                <div className="absolute -bottom-2 -left-8 w-2 h-2 bg-blue-200 rounded-full animate-bounce"></div>
                <div className="absolute bottom-4 -right-10 w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                
                {/* Main Icon */}
                <div className="w-24 h-24 bg-blue-400 rounded-full flex items-center justify-center shadow-2xl shadow-blue-200 ring-8 ring-blue-50">
                   <ShieldCheck className="w-12 h-12 text-white stroke-[2.5]" />
                </div>
                
                {/* Secondary Bubble Overlay */}
                <div className="absolute -top-2 -right-2 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-white p-1 shadow-md border-2 border-white">
                   <Check className="w-3 h-3 stroke-[4]" />
                </div>
             </div>

             <h2 className="text-2xl font-bold text-gray-900 mb-2">Congratulations!</h2>
             <p className="text-gray-500 font-medium text-sm mb-8 px-4 leading-relaxed">
               You have successfully Create Password
             </p>

             <button
               onClick={() => router.push('/')}
               className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-xl shadow-lg shadow-blue-100 transition-all hover:scale-105 active:scale-95 text-xs uppercase tracking-widest"
             >
               Go to Home
             </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OTPVerification;