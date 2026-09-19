import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroHeader from './components/HeroHeader';
import FilterSidebar from './components/FilterSidebar';
import ProductCard from './components/ProductCard';
import ProductDetailModal from './components/ProductDetailModal';
import CreateListingModal from './components/CreateListingModal';
import AdminDashboard from './components/AdminDashboard';
import StudentDashboard from './components/StudentDashboard';
import Toast from './components/Toast';
import {
  fetchProducts,
  fetchCategories,
  createProduct,
  updateProductStatus,
  deleteProduct,
  fetchAdminStats,
  fetchPendingListings,
  approveListing,
  rejectListing,
  fetchReports,
  createReport,
  actionReport
} from './api';
import { Sparkles, PackageX, Search, SlidersHorizontal } from 'lucide-react';

export default function App() {
  // Navigation & Role State
  const [userRole, setUserRole] = useState('student'); // 'student' | 'admin'
  const [activeTab, setActiveTab] = useState('browse'); // 'browse' | 'my-listings' | 'admin'
  
  // Data State
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [myListings, setMyListings] = useState([]);
  const [adminStats, setAdminStats] = useState({});
  const [pendingListings, setPendingListings] = useState([]);
  const [reports, setReports] = useState([]);
  
  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCondition, setSelectedCondition] = useState('All');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');

  // Favorites state
  const [favorites, setFavorites] = useState([]);

  // Modals & Toast
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(true);

  // Users preset
  const studentUser = {
    id: 'u-101',
    name: 'Alex Rivera',
    email: 'alex.rivera@campus.edu',
    role: 'student',
    studentId: 'CS-2023-8841',
    department: 'Computer Science',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300'
  };

  const adminUser = {
    id: 'u-admin',
    name: 'Prof. Sarah Jenkins',
    email: 'admin.moderator@campus.edu',
    role: 'admin',
    department: 'Student Moderation Affairs',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300'
  };

  const currentUser = userRole === 'admin' ? adminUser : studentUser;

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // Fetch Categories on Mount
  useEffect(() => {
    const loadCategories = async () => {
      const res = await fetchCategories();
      if (res.categories) {
        setCategories(res.categories);
      }
    };
    loadCategories();
  }, []);

  // Fetch Public Products whenever filters change
  const loadProducts = async () => {
    setLoading(true);
    const res = await fetchProducts({
      search: searchQuery,
      category: selectedCategory,
      condition: selectedCondition,
      minPrice,
      maxPrice,
      sort: sortOrder,
      status: 'approved'
    });

    if (res.products) {
      setProducts(res.products);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadProducts();
  }, [searchQuery, selectedCategory, selectedCondition, minPrice, maxPrice, sortOrder]);

  // Fetch My Listings when student tab active
  const loadMyListings = async () => {
    const res = await fetchProducts({ sellerId: 'u-101', status: 'all' });
    if (res.products) {
      setMyListings(res.products);
    }
  };

  useEffect(() => {
    if (activeTab === 'my-listings' || userRole === 'student') {
      loadMyListings();
    }
  }, [activeTab, userRole]);

  // Fetch Admin Data when Admin view active
  const loadAdminData = async () => {
    const statsRes = await fetchAdminStats();
    if (statsRes.stats) setAdminStats(statsRes.stats);

    const pendingRes = await fetchPendingListings();
    if (pendingRes.pendingListings) setPendingListings(pendingRes.pendingListings);

    const reportsRes = await fetchReports();
    if (reportsRes.reports) setReports(reportsRes.reports);
  };

  useEffect(() => {
    loadAdminData();
  }, [userRole, activeTab]);

  // Reset Filters Handler
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedCondition('All');
    setMinPrice('');
    setMaxPrice('');
    setSortOrder('newest');
    showToast('Filters reset to default', 'info');
  };

  // Toggle Favorite Bookmark
  const handleToggleFavorite = (productId) => {
    if (favorites.includes(productId)) {
      setFavorites(favorites.filter((id) => id !== productId));
      showToast('Removed from saved favorites', 'info');
    } else {
      setFavorites([...favorites, productId]);
      showToast('Saved to your favorites!', 'success');
    }
  };

  // Submit New Student Listing
  const handleCreateListing = async (newListingData) => {
    const res = await createProduct(newListingData, userRole);
    if (res.success) {
      showToast(res.message || 'Listing submitted for Admin approval!', 'success');
      loadMyListings();
      loadAdminData();
      loadProducts();
    } else {
      showToast(res.message || 'Failed to submit listing', 'error');
    }
  };

  // Admin Approves Listing
  const handleApproveListing = async (productId) => {
    const res = await approveListing(productId);
    if (res.success) {
      showToast('Listing approved and published to Campus Market!', 'success');
      loadAdminData();
      loadProducts();
    } else {
      showToast(res.message || 'Failed to approve listing', 'error');
    }
  };

  // Admin Rejects Listing
  const handleRejectListing = async (productId) => {
    const res = await rejectListing(productId);
    if (res.success) {
      showToast('Listing rejected.', 'info');
      loadAdminData();
      loadProducts();
    }
  };

  // Mark Product as Sold
  const handleMarkAsSold = async (productId) => {
    const res = await updateProductStatus(productId, 'sold');
    if (res.success) {
      showToast('Listing marked as Sold!', 'success');
      loadMyListings();
      loadProducts();
    }
  };

  // Delete Listing
  const handleDeleteListing = async (productId) => {
    const res = await deleteProduct(productId);
    if (res.success) {
      showToast('Listing deleted', 'info');
      loadMyListings();
      loadProducts();
      loadAdminData();
    }
  };

  // Report Listing
  const handleReportListing = async (productId, reason) => {
    const res = await createReport(productId, reason);
    if (res.success) {
      showToast(res.message || 'Report submitted to campus moderators.', 'success');
      loadAdminData();
    }
  };

  // Action Report (Dismiss or Remove Listing)
  const handleActionReport = async (reportId, action) => {
    const res = await actionReport(reportId, action);
    if (res.success) {
      showToast(action === 'actioned' ? 'Listing removed and report resolved.' : 'Report dismissed.', 'info');
      loadAdminData();
      loadProducts();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userRole={userRole}
        setUserRole={setUserRole}
        onOpenCreateModal={() => setIsCreateModalOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        pendingCount={pendingListings.length}
        currentUser={currentUser}
      />

      {/* Main Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 w-full pb-16">
        
        {/* VIEW 1: BROWSE MARKETPLACE */}
        {activeTab === 'browse' && (
          <div>
            {/* Hero Header */}
            <HeroHeader
              activeCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              categories={categories}
            />

            {/* Layout Grid: Filters (Left) + Marketplace Cards (Right) */}
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              
              {/* Sidebar */}
              <FilterSidebar
                categories={categories}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                selectedCondition={selectedCondition}
                setSelectedCondition={setSelectedCondition}
                minPrice={minPrice}
                setMinPrice={setMinPrice}
                maxPrice={maxPrice}
                setMaxPrice={setMaxPrice}
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
                onReset={handleResetFilters}
              />

              {/* Products Area */}
              <div className="flex-1 w-full space-y-6">
                
                {/* Result count bar */}
                <div className="flex items-center justify-between bg-white px-5 py-3.5 rounded-2xl border border-slate-200 shadow-sm text-xs font-semibold">
                  <div className="flex items-center gap-2 text-slate-700">
                    <span className="font-extrabold text-slate-900 text-sm">{products.length}</span>
                    <span>Second-Hand Listings Available</span>
                    {selectedCategory !== 'All' && (
                      <span className="bg-campus-100 text-campus-800 px-2 py-0.5 rounded-full font-bold">
                        {selectedCategory}
                      </span>
                    )}
                  </div>
                  
                  {(selectedCategory !== 'All' || selectedCondition !== 'All' || searchQuery || minPrice || maxPrice) && (
                    <button
                      onClick={handleResetFilters}
                      className="text-campus-600 hover:underline font-bold"
                    >
                      Clear Active Filters
                    </button>
                  )}
                </div>

                {/* Loading Skeleton */}
                {loading ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                      <div key={n} className="bg-white rounded-2xl border border-slate-200 h-80 animate-pulse p-4 space-y-4">
                        <div className="bg-slate-200 h-44 rounded-xl w-full"></div>
                        <div className="bg-slate-200 h-4 rounded w-3/4"></div>
                        <div className="bg-slate-200 h-3 rounded w-1/2"></div>
                      </div>
                    ))}
                  </div>
                ) : products.length === 0 ? (
                  /* Empty state */
                  <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center text-slate-500 space-y-4 shadow-sm">
                    <PackageX className="w-16 h-16 text-slate-300 mx-auto" />
                    <h3 className="font-extrabold text-slate-800 text-lg">No Listings Match Your Search</h3>
                    <p className="text-xs max-w-md mx-auto">
                      Try adjusting your category filter, price range, or keyword search. You can also be the first to post an item in this category!
                    </p>
                    <button
                      onClick={() => setIsCreateModalOpen(true)}
                      className="px-5 py-2.5 bg-campus-600 hover:bg-campus-700 text-white font-bold text-xs rounded-xl shadow-md"
                    >
                      Post an Item Now
                    </button>
                  </div>
                ) : (
                  /* Products Grid */
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onClick={(p) => setSelectedProduct(p)}
                        onToggleFavorite={handleToggleFavorite}
                        isFavorite={favorites.includes(product.id)}
                      />
                    ))}
                  </div>
                )}

              </div>

            </div>
          </div>
        )}

        {/* VIEW 2: STUDENT DASHBOARD ("MY POSTS") */}
        {activeTab === 'my-listings' && (
          <StudentDashboard
            myListings={myListings}
            onOpenCreateModal={() => setIsCreateModalOpen(true)}
            onMarkAsSold={handleMarkAsSold}
            onDeleteListing={handleDeleteListing}
            onViewProduct={(p) => setSelectedProduct(p)}
            currentUser={currentUser}
          />
        )}

        {/* VIEW 3: ADMIN CONTROL & MODERATION HUB */}
        {activeTab === 'admin' && (
          <AdminDashboard
            stats={adminStats}
            pendingListings={pendingListings}
            reports={reports}
            onApprove={handleApproveListing}
            onReject={handleRejectListing}
            onActionReport={handleActionReport}
            onViewProduct={(p) => setSelectedProduct(p)}
          />
        )}

      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-8 text-center text-xs text-slate-500 font-medium">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-slate-800 text-sm">🎓 Campus Market</span>
            <span>• Trusted College Second-Hand Marketplace</span>
          </div>
          <p>© 2026 Campus Community. Safe, verified, student-to-student buying & selling.</p>
        </div>
      </footer>

      {/* Product Detail View Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onReport={handleReportListing}
        onToggleFavorite={handleToggleFavorite}
        isFavorite={selectedProduct ? favorites.includes(selectedProduct.id) : false}
        userRole={userRole}
      />

      {/* Create New Listing Modal */}
      <CreateListingModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateListing}
        categories={categories}
      />

      {/* Toast Overlay */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

    </div>
  );
}
