import React, { useState } from 'react';
import { LayoutDashboard, PlusCircle, CheckCircle, Clock, CheckCircle2, Trash2, Eye, ShoppingBag } from 'lucide-react';

export default function StudentDashboard({
  myListings = [],
  onOpenCreateModal,
  onMarkAsSold,
  onDeleteListing,
  onViewProduct,
  currentUser
}) {
  const [filterTab, setFilterTab] = useState('all');

  const filtered = myListings.filter(p => {
    if (filterTab === 'approved') return p.status === 'approved';
    if (filterTab === 'pending') return p.status === 'pending';
    if (filterTab === 'sold') return p.status === 'sold';
    return true;
  });

  return (
    <div className="space-y-8 animate-fadeIn max-w-7xl mx-auto py-6">
      
      {/* Student Profile & Quick Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300'}
            alt={currentUser?.name}
            className="w-16 h-16 rounded-full object-cover ring-4 ring-campus-500/20"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                {currentUser?.name || 'Alex Rivera'}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                Student Verified
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              {currentUser?.department || 'Computer Science'} • {currentUser?.studentId || 'CS-2023-8841'}
            </p>
          </div>
        </div>

        <button
          onClick={onOpenCreateModal}
          className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-campus-600 to-indigo-600 text-white font-extrabold text-sm shadow-md shadow-campus-500/25 hover:shadow-lg transition-all"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Post New Item</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between border-b border-slate-200">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setFilterTab('all')}
            className={`pb-3 px-1 text-sm font-extrabold transition-all border-b-2 ${
              filterTab === 'all'
                ? 'border-campus-600 text-campus-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            All My Listings ({myListings.length})
          </button>
          <button
            onClick={() => setFilterTab('approved')}
            className={`pb-3 px-1 text-sm font-extrabold transition-all border-b-2 ${
              filterTab === 'approved'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Active Approved
          </button>
          <button
            onClick={() => setFilterTab('pending')}
            className={`pb-3 px-1 text-sm font-extrabold transition-all border-b-2 ${
              filterTab === 'pending'
                ? 'border-amber-500 text-amber-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Pending Admin
          </button>
          <button
            onClick={() => setFilterTab('sold')}
            className={`pb-3 px-1 text-sm font-extrabold transition-all border-b-2 ${
              filterTab === 'sold'
                ? 'border-slate-800 text-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Sold Items
          </button>
        </div>
      </div>

      {/* Listings Grid */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500 space-y-3">
          <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="font-extrabold text-slate-800 text-base">No Listings Found</h3>
          <p className="text-xs max-w-sm mx-auto">
            You don't have any items in this status tab. Click "Post New Item" to publish a second-hand listing.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow"
            >
              <div>
                {/* Top status */}
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    item.status === 'approved' ? 'bg-emerald-100 text-emerald-800' :
                    item.status === 'pending' ? 'bg-amber-100 text-amber-800' :
                    item.status === 'sold' ? 'bg-slate-800 text-white' : 'bg-rose-100 text-rose-800'
                  }`}>
                    {item.status}
                  </span>
                  <span className="text-xs font-bold text-slate-900">${item.price}</span>
                </div>

                <div className="flex gap-3">
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="w-20 h-20 rounded-xl object-cover border border-slate-200 shrink-0"
                  />
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm line-clamp-2">{item.title}</h3>
                    <p className="text-xs text-slate-500 mt-1">{item.category}</p>
                    <span className="text-[10px] text-slate-400 font-medium block mt-1">
                      Posted: {new Date(item.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => onViewProduct(item)}
                  className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg text-xs font-semibold flex items-center gap-1"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Preview</span>
                </button>

                <div className="flex items-center gap-2">
                  {item.status === 'approved' && (
                    <button
                      onClick={() => onMarkAsSold(item.id)}
                      className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Mark Sold</span>
                    </button>
                  )}
                  <button
                    onClick={() => onDeleteListing(item.id)}
                    className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    title="Delete listing"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
}
