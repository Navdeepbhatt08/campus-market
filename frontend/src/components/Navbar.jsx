import React from 'react';
import { ShoppingBag, Search, PlusCircle, ShieldCheck, UserCheck, LayoutDashboard, Bookmark, Sparkles } from 'lucide-react';

export default function Navbar({
  activeTab,
  setActiveTab,
  userRole,
  setUserRole,
  onOpenCreateModal,
  searchQuery,
  setSearchQuery,
  pendingCount = 0,
  currentUser
}) {
  return (
    <header className="sticky top-0 z-40 glass-panel border-b border-white/60 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          
          {/* Logo & College Badge */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('browse')}>
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-campus-600 via-campus-500 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-campus-500/25 ring-2 ring-white/80">
              <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900">
                  Campus<span className="text-campus-600">Market</span>
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100/80 text-emerald-800 border border-emerald-300/60 backdrop-blur-sm">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" /> <span className="italic font-serif">Verified</span>
                </span>
              </div>
              <p className="text-[11px] font-medium text-slate-500 hidden md:block italic italic-subtitle">
                Exclusive Second-Hand Hub for College Students
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-2 hidden md:block">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search textbooks, iPads, bicycles, dorm mini fridge..."
                className="w-full pl-10 pr-4 py-2 sm:py-2.5 text-sm bg-white/70 backdrop-blur-md border border-slate-200/80 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-campus-500/30 focus:border-campus-500 transition-all text-slate-800 placeholder-slate-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-bold bg-slate-200 rounded-full w-4 h-4 flex items-center justify-center"
                >
                  ×
                </button>
              )}
            </div>
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Quick Demo Role Toggle Switch */}
            <div className="flex items-center bg-slate-200/60 p-1 rounded-xl border border-white/80 text-xs font-semibold backdrop-blur-md">
              <button
                onClick={() => setUserRole('student')}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg transition-all ${
                  userRole === 'student'
                    ? 'bg-white text-campus-700 shadow-sm font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Switch to Student view"
              >
                <UserCheck className="w-3.5 h-3.5 text-campus-500" />
                <span className="italic font-serif">Student</span>
              </button>
              <button
                onClick={() => {
                  setUserRole('admin');
                  setActiveTab('admin');
                }}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg transition-all relative ${
                  userRole === 'admin'
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-sm font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Switch to Admin Moderation view"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span className="italic font-serif">Admin</span>
                {pendingCount > 0 && (
                  <span className="w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-extrabold flex items-center justify-center animate-pulse">
                    {pendingCount}
                  </span>
                )}
              </button>
            </div>

            {/* Navigation Tabs */}
            <button
              onClick={() => setActiveTab('browse')}
              className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'browse'
                  ? 'bg-campus-50 text-campus-700 font-bold border border-campus-200/60'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              Browse
            </button>

            {userRole === 'student' && (
              <button
                onClick={() => setActiveTab('my-listings')}
                className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                  activeTab === 'my-listings'
                    ? 'bg-campus-50 text-campus-700 font-bold border border-campus-200/60'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span className="hidden sm:inline">My Posts</span>
              </button>
            )}

            {userRole === 'admin' && (
              <button
                onClick={() => setActiveTab('admin')}
                className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 relative ${
                  activeTab === 'admin'
                    ? 'bg-amber-50 text-amber-900 border border-amber-200 font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-amber-600" />
                <span>Mod Hub</span>
                {pendingCount > 0 && (
                  <span className="px-1.5 py-0.5 rounded-full bg-rose-600 text-white text-[10px] font-bold">
                    {pendingCount}
                  </span>
                )}
              </button>
            )}

            {/* Sell Button */}
            <button
              onClick={onOpenCreateModal}
              className="flex items-center gap-1.5 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-gradient-to-r from-campus-600 to-indigo-600 hover:from-campus-700 hover:to-indigo-700 text-white font-semibold text-xs sm:text-sm shadow-md shadow-campus-500/20 hover:shadow-lg hover:shadow-campus-500/30 transition-all active:scale-95"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Sell Item</span>
            </button>

          </div>
        </div>

      </div>
    </header>
  );
}
