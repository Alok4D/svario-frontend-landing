import React from 'react';
import { Lock, Eye, X } from 'lucide-react';

const CreateNewPassword = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[radial-gradient(circle_at_top,var(--tw-gradient-stops))] from-blue-50 via-blue-400 to-blue-500 p-4">
      
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
        <h2 className="text-3xl font-bold text-blue-400 opacity-90">Welcome</h2>
      </div>

      {/* Password Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-10 relative">
        
        {/* Close Button */}
        <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors">
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-10">
          <h1 className="text-2xl font-bold text-gray-800">
            Create New Password
          </h1>
        </div>

        <form className="space-y-6">
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
                type="password"
                placeholder="Enter your password"
                className="block w-full pl-10 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:bg-white outline-none transition-all placeholder:text-gray-400 text-sm"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer group">
                <Eye className="h-4 w-4 text-gray-400 group-hover:text-gray-600" />
              </div>
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
                type="password"
                placeholder="Enter your Confirm Password"
                className="block w-full pl-10 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:bg-white outline-none transition-all placeholder:text-gray-400 text-sm"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer group">
                <Eye className="h-4 w-4 text-gray-400 group-hover:text-gray-600" />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-400 hover:bg-blue-500 text-white font-medium py-3 rounded-lg shadow-md shadow-blue-100 transition-all active:scale-[0.98] text-sm mt-4"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateNewPassword;