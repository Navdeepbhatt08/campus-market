import React from 'react';
import { Sparkles, ShieldCheck, RefreshCw, CheckCircle, Tag } from 'lucide-react';

export default function HeroHeader({ activeCategory, setSelectedCategory, categories }) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 my-6 shadow-2xl border border-slate-800/80">
      
      {/* Glassmorphic decorative ambient background glows */}
      <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-campus-500/25 rounded-full blur-3xl pointer-events-none animate-subtle-pulse"></div>
      <div className="absolute bottom-0 left-1/3 -mb-16 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-xs font-semibold text-campus-200 mb-4 shadow-glass">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span className="italic font-serif">Trusted Campus Second-Hand Marketplace</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight mb-3">
          Buy & Sell Pre-Loved Student Gear <br />
          <span className="font-serif italic font-normal bg-clip-text text-transparent bg-gradient-to-r from-campus-200 via-indigo-200 to-emerald-300">
            Exclusive to College Community
          </span>
        </h1>

        <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 font-normal">
          Second-hand textbooks, electronics, dorm furniture, and bicycles. <em className="not-italic text-white font-semibold">Verified student sellers</em>, campus pickup locations, and admin-moderated listings.
        </p>

        {/* Key Campus Safety Pills with Glassmorphism */}
        <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-300 mb-8 border-t border-white/10 pt-4">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 backdrop-blur-md border border-white/10">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="italic font-serif text-emerald-300">Admin Approved</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 backdrop-blur-md border border-white/10">
            <CheckCircle className="w-4 h-4 text-campus-400" />
            <span className="italic font-serif text-campus-200">Verified Student ID</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 backdrop-blur-md border border-white/10">
            <Tag className="w-4 h-4 text-amber-400" />
            <span className="italic font-serif text-amber-200">Student Budget Friendly</span>
          </div>
        </div>

        {/* Category Quick Pill Filters */}
        <div className="space-y-2">
          <span className="text-xs uppercase font-bold text-slate-400 tracking-wider block italic font-serif">
            Browse Popular Categories:
          </span>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setSelectedCategory('All')}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all backdrop-blur-md ${
                activeCategory === 'All'
                  ? 'bg-campus-500 text-white shadow-lg shadow-campus-500/40 ring-2 ring-campus-300 font-bold'
                  : 'bg-white/10 hover:bg-white/20 text-slate-200 border border-white/15'
              }`}
            >
              All Categories
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id || cat.name}
                onClick={() => setSelectedCategory(cat.name)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all backdrop-blur-md ${
                  activeCategory === cat.name
                    ? 'bg-campus-500 text-white shadow-lg shadow-campus-500/40 ring-2 ring-campus-300 font-bold'
                    : 'bg-white/10 hover:bg-white/20 text-slate-200 border border-white/15'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
