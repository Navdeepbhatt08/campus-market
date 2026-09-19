import React, { useState } from 'react';
import { X, Upload, ShieldCheck, DollarSign, Tag, Image, MapPin, CheckCircle } from 'lucide-react';

export default function CreateListingModal({ isOpen, onClose, onSubmit, categories }) {
  const [formData, setFormData] = useState({
    title: '',
    category: 'Textbooks & Notes',
    price: '',
    originalPrice: '',
    condition: 'Like New',
    location: 'Engineering Library / Main Quad',
    description: '',
    imageUrl: '',
    sellerPhone: '+1 (555) 234-5678'
  });

  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const imagesPayload = formData.imageUrl.trim()
      ? [formData.imageUrl.trim()]
      : ["https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=800"];

    await onSubmit({
      ...formData,
      price: Number(formData.price),
      originalPrice: Number(formData.originalPrice || formData.price),
      images: imagesPayload
    });

    setLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div
        className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative my-8"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Publish Second-Hand Listing
            </h2>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Offer your item to fellow college students on Campus Market
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Title */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Listing Title *
            </label>
            <input
              type="text"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Introduction to Algorithms (4th Ed) or Apple iPad M1"
              className="w-full text-sm p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-campus-500 text-slate-900"
            />
          </div>

          {/* Category & Condition Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full text-sm p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-campus-500 font-medium text-slate-900"
              >
                {categories.map((cat) => (
                  <option key={cat.id || cat.name} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Condition *
              </label>
              <select
                name="condition"
                value={formData.condition}
                onChange={handleChange}
                className="w-full text-sm p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-campus-500 font-medium text-slate-900"
              >
                <option value="New">New (Unopened / Tagged)</option>
                <option value="Like New">Like New (Mint Condition)</option>
                <option value="Good">Good (Minor Wear / Functional)</option>
                <option value="Fair">Fair (Noticeable Wear)</option>
              </select>
            </div>
          </div>

          {/* Price & Original Price Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Selling Price ($) *
              </label>
              <div className="relative">
                <DollarSign className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="number"
                  name="price"
                  required
                  min="1"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="e.g. 45"
                  className="w-full pl-9 pr-3 text-sm p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-campus-500 text-slate-900 font-bold"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Original Retail Price ($)
              </label>
              <div className="relative">
                <DollarSign className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="number"
                  name="originalPrice"
                  value={formData.originalPrice}
                  onChange={handleChange}
                  placeholder="e.g. 95 (Optional)"
                  className="w-full pl-9 pr-3 text-sm p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-campus-500 text-slate-900"
                />
              </div>
            </div>
          </div>

          {/* Campus Location */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Campus Pickup Location *
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                name="location"
                required
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. Student Center Lobby, Engineering Library, Hostels Quad"
                className="w-full pl-9 pr-3 text-sm p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-campus-500 text-slate-900"
              />
            </div>
          </div>

          {/* Image URL & Preview */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Item Image URL (Unsplash or direct image link)
            </label>
            <input
              type="url"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="https://images.unsplash.com/photo-..."
              className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-campus-500 text-slate-900"
            />
            {formData.imageUrl && (
              <div className="mt-2 relative w-32 h-24 rounded-xl overflow-hidden border border-slate-200 shadow-sm">
                <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                <span className="absolute bottom-1 right-1 bg-slate-900/80 text-white text-[10px] px-1.5 py-0.5 rounded font-bold">
                  Preview
                </span>
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Description & Details *
            </label>
            <textarea
              name="description"
              required
              rows={3}
              value={formData.description}
              onChange={handleChange}
              placeholder="State item condition, course relevance, included accessories, or reasons for selling..."
              className="w-full text-sm p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-campus-500 text-slate-900"
            />
          </div>

          {/* Moderation Notice */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 text-xs text-amber-900 flex items-start gap-2.5">
            <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block">Campus Moderation Policy</span>
              <span>All student listings undergo quick Admin Approval before appearing live on the main marketplace.</span>
            </div>
          </div>

          {/* Submit Actions */}
          <div className="flex justify-end gap-3 border-t border-slate-100 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 bg-gradient-to-r from-campus-600 to-indigo-600 hover:from-campus-700 hover:to-indigo-700 text-white font-extrabold text-sm rounded-xl shadow-md shadow-campus-500/25 transition-all flex items-center gap-2"
            >
              {loading ? 'Submitting...' : 'Publish Listing'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
