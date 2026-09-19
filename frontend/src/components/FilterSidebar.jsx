import React from 'react';
import { Filter, RotateCcw, DollarSign, Tag, SlidersHorizontal, ArrowUpDown } from 'lucide-react';

export default function FilterSidebar({
  categories,
  selectedCategory,
  setSelectedCategory,
  selectedCondition,
  setSelectedCondition,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  sortOrder,
  setSortOrder,
  onReset
}) {
  const conditions = ['All', 'New', 'Like New', 'Good', 'Fair'];

  return (
    <aside className="w-full lg:w-64 glass-panel rounded-2xl p-5 shadow-glass space-y-6 h-fit sticky top-24 border border-white/80">
      
      {/* Title & Reset */}
      <div className="flex items-center justify-between border-b border-slate-200/60 pb-4">
        <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
          <Filter className="w-4 h-4 text-campus-600" />
          <span>Filters & Refine</span>
        </div>
        <button
          onClick={onReset}
          className="text-xs font-semibold text-slate-500 hover:text-campus-600 flex items-center gap-1 transition-colors italic font-serif"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Filters</span>
        </button>
      </div>

      {/* Sort Order */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
          <ArrowUpDown className="w-3.5 h-3.5 text-campus-500" />
          <span className="italic font-serif">Sort Listings</span>
        </label>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="w-full text-xs bg-white/70 backdrop-blur-md border border-slate-200/80 rounded-xl p-2.5 font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-campus-500/30"
        >
          <option value="newest">Latest Posted</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="views">Most Viewed</option>
        </select>
      </div>

      {/* Categories */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
          <Tag className="w-3.5 h-3.5 text-campus-500" />
          <span className="italic font-serif">Categories</span>
        </label>
        <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-all flex items-center justify-between ${
              selectedCategory === 'All'
                ? 'bg-campus-50/90 text-campus-700 font-bold border border-campus-200/60'
                : 'text-slate-600 hover:bg-white/60'
            }`}
          >
            <span>All Categories</span>
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id || cat.name}
              onClick={() => setSelectedCategory(cat.name)}
              className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-all flex items-center justify-between ${
                selectedCategory === cat.name
                  ? 'bg-campus-50/90 text-campus-700 font-bold border border-campus-200/60'
                  : 'text-slate-600 hover:bg-white/60'
              }`}
            >
              <span>{cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Condition */}
      <div className="space-y-2 border-t border-slate-200/60 pt-4">
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
          <SlidersHorizontal className="w-3.5 h-3.5 text-campus-500" />
          <span className="italic font-serif">Condition</span>
        </label>
        <div className="grid grid-cols-2 gap-1.5">
          {conditions.map((cond) => (
            <button
              key={cond}
              onClick={() => setSelectedCondition(cond)}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all text-center border ${
                selectedCondition === cond
                  ? 'bg-campus-600 text-white border-campus-600 font-bold shadow-sm'
                  : 'bg-white/60 text-slate-700 border-slate-200/80 hover:bg-white'
              }`}
            >
              <span className="italic font-serif">{cond}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="space-y-2 border-t border-slate-200/60 pt-4">
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
          <DollarSign className="w-3.5 h-3.5 text-campus-500" />
          <span className="italic font-serif">Price Range ($)</span>
        </label>
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-full text-xs p-2 bg-white/70 border border-slate-200/80 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-campus-500/30"
          />
          <span className="text-slate-400 font-bold text-xs">-</span>
          <input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full text-xs p-2 bg-white/70 border border-slate-200/80 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-campus-500/30"
          />
        </div>
      </div>

    </aside>
  );
}
