"use client";

import { useState } from 'react';
import { Mail, Lock, ArrowRight, ShieldCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const LoginPage = () => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const router = useRouter();

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccessModal(true);
    
    setTimeout(() => {
      router.push('/');
    }, 3000);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center">
      
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
        
        <h1 className="text-5xl font-medium text-gray-900 mb-2">Welcome back</h1>
        <p className="text-gray-800 font-manrope font-medium">Sign in to your account to continue</p>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 font-manrope">
        <form onSubmit={handleSignIn} className="space-y-6">
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                placeholder="you@example.com"
                required
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                placeholder="••••••••"
                required
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
            </div>
          </div>

          {/* Remember & Forgot */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500" />
              <span className="text-sm text-gray-600">Remember me</span>
            </label>
            <Link href="/forgot-password" title="Forgot password?" className="text-sm font-medium text-blue-500 hover:text-blue-600 transition-colors">
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 rounded-md flex items-center justify-center gap-2 shadow-lg shadow-blue-200 transition-all active:scale-[0.98]"
          >
            Sign In
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        {/* Footer Link */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link href="/signup" title="Sign up for free" className="text-blue-500 font-semibold hover:underline">
              Sign up for free
            </Link>
          </p>
        </div>
      </div>

      {/* Back to Home */}
      <Link href="/" title="Back to home" className="mt-8 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors text-sm font-manrope">
        <ArrowRight className="h-4 w-4 rotate-180" />
        Back to home
      </Link>

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

            <h2 className="text-3xl font-medium text-gray-900 mb-2 font-big-shoulders">Congratulations!</h2>
            <p className="text-gray-500 mb-8 font-medium font-manrope">You have successfully Sign In.</p>

            {/* Loading Spinner */}
            <div className="w-10 h-10 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;