import React, { useState } from 'react';
import { ShieldCheck, Check, X, AlertTriangle, Package, Users, Eye, Trash2, Clock, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function AdminDashboard({
  stats,
  pendingListings = [],
  reports = [],
  onApprove,
  onReject,
  onActionReport,
  onViewProduct
}) {
  const [adminTab, setAdminTab] = useState('pending'); // 'pending' | 'reports'

  return (
    <div className="space-y-8 animate-fadeIn max-w-7xl mx-auto py-6">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-xs font-bold text-amber-300 mb-2 backdrop-blur-md">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span className="italic font-serif">Campus Moderation Officer Access</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Admin Control & Moderation Hub
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 italic font-normal">
            Approve student second-hand listings, resolve inappropriate content flags, and enforce campus safety rules.
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-2 bg-white/10 backdrop-blur-xl px-4 py-2.5 rounded-2xl border border-white/15 text-xs font-semibold">
          <ShieldAlert className="w-4 h-4 text-emerald-400" />
          <span className="italic font-serif text-emerald-300">Campus Rules Enforced</span>
        </div>
      </div>

      {/* Glassmorphic Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        {/* Pending Approvals */}
        <div className="glass-card bg-amber-50/90 border border-amber-200/80 rounded-2xl p-4 sm:p-5 shadow-glass">
          <div className="flex items-center justify-between text-amber-800 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider italic font-serif">Pending Approvals</span>
            <Clock className="w-5 h-5 text-amber-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-amber-950">
            {stats.pendingApprovals || pendingListings.length}
          </div>
          <span className="text-[11px] font-medium text-amber-700 mt-1 block italic">
            Requires moderation review
          </span>
        </div>

        {/* Active Listings */}
        <div className="glass-card bg-emerald-50/90 border border-emerald-200/80 rounded-2xl p-4 sm:p-5 shadow-glass">
          <div className="flex items-center justify-between text-emerald-800 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider italic font-serif">Active Marketplace</span>
            <Package className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-950">
            {stats.activeListings || 0}
          </div>
          <span className="text-[11px] font-medium text-emerald-700 mt-1 block italic">
            Live approved listings
          </span>
        </div>

        {/* Flagged Content */}
        <div className="glass-card bg-rose-50/90 border border-rose-200/80 rounded-2xl p-4 sm:p-5 shadow-glass">
          <div className="flex items-center justify-between text-rose-800 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider italic font-serif">Flagged Content</span>
            <AlertTriangle className="w-5 h-5 text-rose-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-rose-950">
            {stats.flaggedContent || reports.filter(r => r.status === 'pending').length}
          </div>
          <span className="text-[11px] font-medium text-rose-700 mt-1 block italic">
            Student policy flags
          </span>
        </div>

        {/* Verified Students */}
        <div className="glass-card bg-indigo-50/90 border border-indigo-200/80 rounded-2xl p-4 sm:p-5 shadow-glass">
          <div className="flex items-center justify-between text-indigo-800 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider italic font-serif">Verified Students</span>
            <Users className="w-5 h-5 text-indigo-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-indigo-950">
            {stats.verifiedStudents || 4}
          </div>
          <span className="text-[11px] font-medium text-indigo-700 mt-1 block italic">
            Registered campus sellers
          </span>
        </div>

      </div>

      {/* Admin Tab Controls */}
      <div className="flex items-center border-b border-slate-200 gap-4">
        <button
          onClick={() => setAdminTab('pending')}
          className={`pb-3 px-2 text-sm font-extrabold transition-all border-b-2 flex items-center gap-2 ${
            adminTab === 'pending'
              ? 'border-amber-500 text-amber-900'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Clock className="w-4 h-4 text-amber-500" />
          <span className="italic font-serif">Pending Listing Approvals</span>
          {pendingListings.length > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-amber-500 text-white text-xs font-bold">
              {pendingListings.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setAdminTab('reports')}
          className={`pb-3 px-2 text-sm font-extrabold transition-all border-b-2 flex items-center gap-2 ${
            adminTab === 'reports'
              ? 'border-rose-500 text-rose-900'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <AlertTriangle className="w-4 h-4 text-rose-500" />
          <span className="italic font-serif">Reported & Flagged Content</span>
          {reports.filter(r => r.status === 'pending').length > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-rose-500 text-white text-xs font-bold">
              {reports.filter(r => r.status === 'pending').length}
            </span>
          )}
        </button>
      </div>

      {/* Pending Approvals Table */}
      {adminTab === 'pending' && (
        <div className="glass-panel bg-white/90 rounded-2xl border border-white/80 overflow-hidden shadow-glass">
          {pendingListings.length === 0 ? (
            <div className="p-12 text-center text-slate-500 space-y-2">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
              <h3 className="font-extrabold text-slate-800 text-base">All Queue Clear!</h3>
              <p className="text-xs italic font-serif">There are no pending listings awaiting approval right now.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50/90 text-slate-700 font-bold uppercase tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="p-4">Item Details</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Seller Student</th>
                    <th className="p-4">Submitted At</th>
                    <th className="p-4 text-right">Moderation Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                  {pendingListings.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={item.images[0]}
                            alt={item.title}
                            className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0"
                          />
                          <div>
                            <span className="font-bold text-slate-900 block text-sm line-clamp-1">
                              {item.title}
                            </span>
                            <span className="text-[11px] text-slate-500 line-clamp-1 italic">
                              "{item.description}"
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 font-semibold text-slate-700">{item.category}</td>
                      <td className="p-4 font-extrabold text-slate-900 text-sm">${item.price}</td>
                      <td className="p-4">
                        <div className="font-bold text-slate-900">{item.sellerName}</div>
                        <div className="text-[11px] text-slate-500 italic font-serif">{item.sellerDept}</div>
                      </td>
                      <td className="p-4 text-slate-500">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => onViewProduct(item)}
                            className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                            title="Preview Listing"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => onReject(item.id)}
                            className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold rounded-lg transition-all flex items-center gap-1 border border-rose-200"
                          >
                            <X className="w-3.5 h-3.5" />
                            <span>Reject</span>
                          </button>
                          <button
                            onClick={() => onApprove(item.id)}
                            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg transition-all flex items-center gap-1 shadow-sm"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Approve</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Reported Content Table */}
      {adminTab === 'reports' && (
        <div className="glass-panel bg-white/90 rounded-2xl border border-white/80 overflow-hidden shadow-glass">
          {reports.length === 0 ? (
            <div className="p-12 text-center text-slate-500 space-y-2">
              <ShieldCheck className="w-12 h-12 text-emerald-500 mx-auto" />
              <h3 className="font-extrabold text-slate-800 text-base">No Flagged Posts</h3>
              <p className="text-xs italic font-serif">No user reports have been filed.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50/90 text-slate-700 font-bold uppercase tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="p-4">Reported Item</th>
                    <th className="p-4">Flag Reason</th>
                    <th className="p-4">Reported By</th>
                    <th className="p-4">Date</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Moderation Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                  {reports.map((rep) => (
                    <tr key={rep.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-4 font-extrabold text-slate-900">{rep.productTitle}</td>
                      <td className="p-4 text-rose-700 font-semibold italic">"{rep.reason}"</td>
                      <td className="p-4">
                        <div className="font-bold text-slate-900">{rep.reportedBy}</div>
                        <div className="text-[11px] text-slate-500">{rep.reporterEmail}</div>
                      </td>
                      <td className="p-4 text-slate-500">
                        {new Date(rep.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-4">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          rep.status === 'pending' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {rep.status}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        {rep.status === 'pending' ? (
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => onActionReport(rep.id, 'dismissed')}
                              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg transition-colors"
                            >
                              Dismiss Report
                            </button>
                            <button
                              onClick={() => onActionReport(rep.id, 'actioned')}
                              className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-lg transition-all flex items-center gap-1 shadow-sm"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Remove Listing</span>
                            </button>
                          </div>
                        ) : (
                          <span className="text-xs text-slate-400 font-semibold italic">Resolved</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
