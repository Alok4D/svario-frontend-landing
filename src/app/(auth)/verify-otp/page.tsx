"use client";

import { useState } from 'react';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const OTPVerification = () => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const router = useRouter();

  const handleVerify = () => {
    setShowSuccessModal(true);
    
    // Auto redirect after 3 seconds
    setTimeout(() => {
      router.push('/set-new-password');
    }, 3000);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-linear-to-b from-blue-50 via-blue-300 to-blue-500 p-4 font-sans relative">
      
      {/* Logo & Brand */}
      <div className="flex flex-col items-center mb-6">
       <Link href="/">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center shadow-lg">
            <div className="w-5 h-4 bg-white rounded-sm relative">
                <div className="absolute -bottom-1 left-1 w-2 h-2 bg-white rotate-45"></div>
            </div>
          </div>
          <span className="text-2xl font-bold text-gray-900">Svario.is</span>
        </div>
       </Link>
      
        <div className="text-center mb-2">
          <h1 className="text-5xl font-medium text-gray-800">
            Confirm <span className="text-blue-400">Email Address</span>
          </h1>
          <p className="text-gray-800 text-sm mt-3 px-2 leading-relaxed font-manrope">
            We have sent OTP to your email <span className="font-semibold text-gray-700">willia*******l.com</span>
          </p>
        </div>
      </div>

      {/* OTP Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 relative font-manrope">
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
          className="w-full bg-blue-400 hover:bg-blue-500 text-white font-bold py-3.5 rounded-md shadow-lg shadow-blue-100 transition-all active:scale-[0.98] text-sm group"
        >
          Verify OTP
        </button>
      </div>

      {/* Back to Home */}
      <Link href="/forgot-password" title="Back to home" className="mt-8 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors text-sm font-manrope">
        <ArrowRight className="h-4 w-4 rotate-180" />
        Back to forgot password
      </Link>
    </div>
  );
};

export default OTPVerification;