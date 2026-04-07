"use client";

import React, { useState } from 'react';
import { Lock, Eye, ShieldCheck, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const CreateNewPassword = () => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccessModal(true);
    
    // Redirect to login after 3 seconds
    setTimeout(() => {
      router.push('/login');
    }, 3000);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[radial-gradient(circle_at_top,var(--tw-gradient-stops))] from-blue-50 via-blue-400 to-blue-500 p-4">
      {/* Logo & Header */}
      <div className="flex flex-col items-center mb-8">
        <Link href="/">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center shadow-lg">
              {/* Simple Message Icon Shape */}
              <div className="w-5 h-4 bg-white rounded-sm relative">
                <div className="absolute -bottom-1 left-1 w-2 h-2 bg-white rotate-45"></div>
              </div>
            </div>
            <span className="text-2xl font-bold text-gray-900">Svario.is</span>
          </div>
        </Link>
        
        <h1 className="text-5xl font-medium text-gray-900 mb-2">Set New Password</h1>
        <p className="text-gray-800 font-manrope font-medium text-center max-w-lg">Your email has been verified! Now you can set a brand new password for your account.</p>
      </div>

      {/* Password Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-10 relative font-manrope">
        <form onSubmit={handleSave} className="space-y-6">
          {/* Password Field */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                required
                className="block w-full pl-10 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:bg-white outline-none transition-all placeholder:text-gray-400 text-sm"
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer group"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-blue-500" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-400 group-hover:text-gray-600" />
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password Field */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">
              Confirm Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Enter your Confirm Password"
                required
                className="block w-full pl-10 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:bg-white outline-none transition-all placeholder:text-gray-400 text-sm"
              />
              <button 
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer group"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4 text-blue-500" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-400 group-hover:text-gray-600" />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-400 hover:bg-blue-500 text-white font-medium py-3 rounded-md shadow-md shadow-blue-100 transition-all active:scale-[0.98] text-sm mt-4 uppercase tracking-widest"
          >
            Save Password
          </button>
        </form>
      </div>

      {/* Success Modal Overlay */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-xl shadow-xl p-10 w-full max-w-[400px] flex flex-col items-center text-center animate-in zoom-in-95 duration-300">
            
            {/* Success Icon with decorative elements */}
            <div className="relative mb-6">
              <div className="w-24 h-24 bg-blue-400 rounded-full flex items-center justify-center relative z-10 shadow-lg shadow-blue-200">
                <ShieldCheck className="w-12 h-12 text-white" />
              </div>
              {/* Decorative dots around icon */}
              <div className="absolute top-0 right-0 w-3 h-3 bg-blue-400 rounded-full -translate-y-2 translate-x-4 animate-pulse" />
              <div className="absolute top-1/2 left-0 w-2 h-2 bg-blue-300 rounded-full -translate-x-6 animate-pulse" />
              <div className="absolute bottom-4 right-0 w-2 h-2 bg-blue-200 rounded-full translate-x-6 animate-pulse" />
              <div className="absolute -top-4 left-4 w-2 h-2 bg-blue-100 rounded-full animate-pulse" />
            </div>

            <h2 className="text-3xl font-medium text-gray-900 mb-2 font-big-shoulders tracking-wide">Congratulations!</h2>
            <p className="text-gray-500 mb-8 font-medium font-manrope">Your password has been successfully reset.</p>

            {/* Loading Spinner */}
            <div className="w-10 h-10 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateNewPassword;