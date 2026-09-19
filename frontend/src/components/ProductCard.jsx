import React from 'react';
import { Heart, MapPin, Eye, CheckCircle2, ShieldAlert, Sparkles, User, Tag } from 'lucide-react';

export default function ProductCard({ product, onClick, onToggleFavorite, isFavorite = false }) {
  const conditionColors = {
    'New': 'bg-emerald-100/90 text-emerald-800 border-emerald-300/80',
    'Like New': 'bg-blue-100/90 text-blue-800 border-blue-300/80',
    'Good': 'bg-amber-100/90 text-amber-800 border-amber-300/80',
    'Fair': 'bg-slate-100/90 text-slate-800 border-slate-300/80'
  };

  const statusBadges = {
    'pending': { text: 'Pending Approval', style: 'bg-amber-500 text-white' },
    'approved': { text: 'Approved', style: 'bg-emerald-600 text-white' },
    'sold': { text: 'Sold Out', style: 'bg-slate-800 text-white' },
    'rejected': { text: 'Rejected', style: 'bg-rose-600 text-white' }
  };

  return (
    <div
      onClick={() => onClick(product)}
      className="group glass-card rounded-2xl overflow-hidden cursor-pointer flex flex-col justify-between h-full relative border border-white/70 shadow-glass"
    >
      
      {/* Top Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100/80">
        <img
          src={product.images && product.images[0] ? product.images[0] : 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=800'}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Condition Badge */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border backdrop-blur-md shadow-sm italic font-serif ${conditionColors[product.condition] || 'bg-slate-100 text-slate-700'}`}>
            {product.condition}
          </span>
          {product.status !== 'approved' && (
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide shadow-sm ${statusBadges[product.status]?.style}`}>
              {statusBadges[product.status]?.text}
            </span>
          )}
        </div>

        {/* Favorite Bookmark Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(product.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all z-10 border ${
            isFavorite
              ? 'bg-rose-500 text-white border-rose-400 shadow-md'
              : 'bg-white/70 text-slate-600 hover:bg-white hover:text-rose-500 border-white/60'
          }`}
          title="Save to favorites"
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
        </button>

        {/* Price Tag Overlay */}
        <div className="absolute bottom-3 left-3 bg-slate-900/85 backdrop-blur-md text-white px-3 py-1 rounded-xl flex items-baseline gap-1.5 shadow-lg border border-white/10">
          <span className="text-base font-extrabold">${product.price}</span>
          {product.originalPrice > product.price && (
            <span className="text-[11px] text-slate-400 line-through">${product.originalPrice}</span>
          )}
        </div>
      </div>

      {/* Content Details */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-center gap-1 text-[11px] font-bold text-campus-600 uppercase tracking-wider mb-1">
            <Tag className="w-3 h-3 text-campus-500" />
            <span className="italic font-serif">{product.category}</span>
          </div>

          <h3 className="font-bold text-slate-900 text-sm line-clamp-2 group-hover:text-campus-600 transition-colors leading-snug">
            {product.title}
          </h3>
          
          <p className="text-slate-500 text-xs line-clamp-2 mt-1.5 leading-relaxed italic font-normal">
            "{product.description}"
          </p>
        </div>

        {/* Footer Seller Info & Location */}
        <div className="pt-3 border-t border-slate-100/80 flex items-center justify-between gap-2 text-xs">
          
          {/* Seller Avatar & Dept */}
          <div className="flex items-center gap-2 overflow-hidden">
            <img
              src={product.sellerAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300'}
              alt={product.sellerName}
              className="w-6 h-6 rounded-full object-cover ring-2 ring-campus-500/20 shrink-0"
            />
            <div className="truncate">
              <span className="font-semibold text-slate-800 block truncate leading-tight">
                {product.sellerName}
              </span>
              <span className="text-[10px] text-slate-500 truncate block italic font-serif">
                {product.sellerDept}
              </span>
            </div>
          </div>

          {/* Location Badge */}
          <div className="flex items-center gap-1 text-[11px] text-slate-500 shrink-0 font-medium italic">
            <MapPin className="w-3.5 h-3.5 text-campus-500" />
            <span className="truncate max-w-[90px]">{product.location.split('/')[0]}</span>
          </div>

        </div>

      </div>

    </div>
  );
}
