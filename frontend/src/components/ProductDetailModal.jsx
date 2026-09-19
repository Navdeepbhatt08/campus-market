import React, { useState } from 'react';
import { X, ShieldCheck, MapPin, Phone, MessageSquare, AlertTriangle, Eye, Heart, Calendar, CheckCircle2, User, ExternalLink } from 'lucide-react';

export default function ProductDetailModal({
  product,
  onClose,
  onReport,
  onToggleFavorite,
  isFavorite = false,
  userRole = 'student'
}) {
  const [selectedImgIndex, setSelectedImgIndex] = useState(0);
  const [showReportForm, setShowReportForm] = useState(false);
  const [reportReason, setReportReason] = useState('');

  if (!product) return null;

  const images = product.images && product.images.length > 0
    ? product.images
    : ['https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=800'];

  const handleReportSubmit = (e) => {
    e.preventDefault();
    if (!reportReason.trim()) return;
    onReport(product.id, reportReason);
    setShowReportForm(false);
    setReportReason('');
  };

  const whatsappMessage = encodeURIComponent(`Hi ${product.sellerName}, I saw your listing for "${product.title}" on Campus Market ($${product.price}). Is it still available for campus pickup?`);
  const whatsappUrl = `https://wa.me/${(product.sellerPhone || '').replace(/[^0-9]/g, '')}?text=${whatsappMessage}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xl overflow-y-auto animate-fadeIn">
      <div
        className="glass-panel bg-white/95 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-white/80 my-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-slate-100/80 hover:bg-slate-200 text-slate-600 transition-colors shadow-sm backdrop-blur-md"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 sm:p-8">
          
          {/* Left Gallery Column */}
          <div className="space-y-4">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100/80 border border-slate-200">
              <img
                src={images[selectedImgIndex]}
                alt={product.title}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold bg-slate-900/85 text-white backdrop-blur-md italic font-serif">
                {product.condition}
              </span>
            </div>

            {/* Thumbnail Navigation */}
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImgIndex(idx)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                      selectedImgIndex === idx ? 'border-campus-600 ring-2 ring-campus-300' : 'border-slate-200 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Safety & Community Note */}
            <div className="bg-campus-50 border border-campus-100 rounded-2xl p-4 text-xs text-campus-900 space-y-2">
              <div className="flex items-center gap-2 font-bold text-campus-800">
                <ShieldCheck className="w-4 h-4 text-campus-600" />
                <span>Campus Safety Checklist</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-campus-800 font-medium">
                <li>Meet in public campus areas (Student Center, Library).</li>
                <li>Inspect item condition in person before payment.</li>
                <li>Report suspicious or off-campus listings.</li>
              </ul>
            </div>

          </div>

          {/* Right Details Column */}
          <div className="flex flex-col justify-between space-y-6">
            
            <div>
              {/* Category & Status */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-campus-600 bg-campus-50 px-2.5 py-1 rounded-lg">
                  {product.category}
                </span>
                <button
                  onClick={() => onToggleFavorite(product.id)}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold border transition-all ${
                    isFavorite
                      ? 'bg-rose-50 text-rose-600 border-rose-200'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-current text-rose-500' : ''}`} />
                  <span>{isFavorite ? 'Saved' : 'Save'}</span>
                </button>
              </div>

              {/* Title */}
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug">
                {product.title}
              </h2>

              {/* Price Row */}
              <div className="flex items-baseline gap-3 my-4">
                <span className="text-3xl font-extrabold text-slate-900">${product.price}</span>
                {product.originalPrice > product.price && (
                  <span className="text-sm font-semibold text-slate-400 line-through">
                    ${product.originalPrice}
                  </span>
                )}
                <span className="ml-auto text-xs font-medium text-slate-400 flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" /> {product.views || 1} views
                </span>
              </div>

              {/* Description */}
              <div className="border-t border-slate-100 pt-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Item Description
                </h4>
                <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-line font-normal">
                  {product.description}
                </p>
              </div>

              {/* Campus Location */}
              <div className="mt-4 flex items-center gap-2 bg-slate-50 border border-slate-200 p-3 rounded-xl text-xs text-slate-700 font-medium">
                <MapPin className="w-4 h-4 text-campus-600 shrink-0" />
                <span>Pickup Location: <strong>{product.location}</strong></span>
              </div>

              {/* Verified Seller Card */}
              <div className="mt-6 border border-slate-200 rounded-2xl p-4 bg-gradient-to-r from-slate-50 to-indigo-50/30">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Seller Profile
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-200">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" /> College Verified
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <img
                    src={product.sellerAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300'}
                    alt={product.sellerName}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-campus-500/30"
                  />
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-sm">{product.sellerName}</h4>
                    <p className="text-xs text-slate-600 font-medium">{product.sellerDept}</p>
                    <p className="text-[11px] text-slate-400">Campus ID: CS-2023-VERIFIED</p>
                  </div>
                </div>

                {/* Direct Contact Actions */}
                <div className="grid grid-cols-2 gap-2 mt-4">
                  <a
                    href={`tel:${product.sellerPhone}`}
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-800 hover:bg-slate-50 transition-colors shadow-sm"
                  >
                    <Phone className="w-3.5 h-3.5 text-campus-600" />
                    <span>Call Seller</span>
                  </a>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-emerald-600/20"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp Chat</span>
                  </a>
                </div>
              </div>

            </div>

            {/* Bottom Actions & Moderation Report */}
            <div className="border-t border-slate-100 pt-4 space-y-3">
              {!showReportForm ? (
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => setShowReportForm(true)}
                    className="text-xs text-rose-600 hover:text-rose-800 font-semibold flex items-center gap-1 transition-colors"
                  >
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Report Inappropriate Content</span>
                  </button>

                  <span className="text-[11px] text-slate-400 font-medium">
                    Posted on {new Date(product.createdAt).toLocaleDateString()}
                  </span>
                </div>
              ) : (
                <form onSubmit={handleReportSubmit} className="bg-rose-50 border border-rose-200 p-3 rounded-xl space-y-2">
                  <label className="block text-xs font-bold text-rose-900">
                    Reason for Reporting to Admin:
                  </label>
                  <textarea
                    rows={2}
                    value={reportReason}
                    onChange={(e) => setReportReason(e.target.value)}
                    placeholder="e.g. Prohibited item, false details, or inappropriate imagery..."
                    className="w-full text-xs p-2 bg-white border border-rose-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                    required
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowReportForm(false)}
                      className="px-2.5 py-1 text-xs text-slate-600 hover:bg-slate-200 rounded-lg"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-3 py-1 bg-rose-600 text-white font-bold text-xs rounded-lg hover:bg-rose-700"
                    >
                      Submit Report
                    </button>
                  </div>
                </form>
              )}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
