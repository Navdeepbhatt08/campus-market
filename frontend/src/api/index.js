import axios from 'axios';
import { mockUsers, mockCategories, mockProducts, mockReports } from '../../../backend/data/mockData.js';

const API_BASE = '/api';

const api = axios.create({
  baseURL: API_BASE,
  timeout: 4000,
});

// Client side in-memory state fallback
let clientProducts = [...mockProducts];
let clientReports = [...mockReports];
let clientUsers = [...mockUsers];

export const fetchProducts = async (filters = {}) => {
  try {
    const res = await api.get('/products', { params: filters });
    return res.data;
  } catch (err) {
    console.log('Backend API offline or slow, using client in-memory dataset fallback.');
    
    let result = clientProducts;

    const { search, category, condition, minPrice, maxPrice, status = 'approved', sort = 'newest', sellerId } = filters;

    if (status && status !== 'all') {
      result = result.filter(p => p.status === status);
    }

    if (sellerId) {
      result = result.filter(p => p.sellerId === sellerId);
    }

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.sellerDept.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q)
      );
    }

    if (category && category !== 'All') {
      result = result.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }

    if (condition && condition !== 'All') {
      result = result.filter(p => p.condition.toLowerCase() === condition.toLowerCase());
    }

    if (minPrice) {
      result = result.filter(p => p.price >= Number(minPrice));
    }

    if (maxPrice) {
      result = result.filter(p => p.price <= Number(maxPrice));
    }

    result = [...result].sort((a, b) => {
      if (sort === 'price-asc') return a.price - b.price;
      if (sort === 'price-desc') return b.price - a.price;
      if (sort === 'views') return b.views - a.views;
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    return { success: true, count: result.length, products: result };
  }
};

export const fetchCategories = async () => {
  try {
    const res = await api.get('/products/categories');
    return res.data;
  } catch (err) {
    return { success: true, categories: mockCategories };
  }
};

export const createProduct = async (productData, sellerRole = 'student') => {
  try {
    const res = await api.post('/products', productData);
    return res.data;
  } catch (err) {
    const currentUser = sellerRole === 'admin' ? clientUsers[3] : clientUsers[0];
    const newProduct = {
      id: `prod-${Date.now()}`,
      title: productData.title,
      description: productData.description || '',
      price: Number(productData.price) || 0,
      originalPrice: Number(productData.originalPrice) || Number(productData.price) || 0,
      category: productData.category || 'Textbooks & Notes',
      condition: productData.condition || 'Good',
      location: productData.location || 'Main Campus Quad',
      images: productData.images && productData.images.length > 0
        ? productData.images
        : ["https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=800"],
      sellerId: currentUser.id,
      sellerName: currentUser.name,
      sellerDept: currentUser.department || 'Computer Science',
      sellerAvatar: currentUser.avatar,
      sellerPhone: productData.sellerPhone || currentUser.phone,
      status: 'pending', // Requires admin approval
      createdAt: new Date().toISOString(),
      views: 1,
      favorites: 0
    };

    clientProducts.unshift(newProduct);
    return {
      success: true,
      message: 'Listing submitted! It is currently pending Admin approval.',
      product: newProduct
    };
  }
};

export const updateProductStatus = async (productId, status) => {
  try {
    const res = await api.patch(`/products/${productId}/status`, { status });
    return res.data;
  } catch (err) {
    const prod = clientProducts.find(p => p.id === productId);
    if (prod) {
      prod.status = status;
      return { success: true, product: prod };
    }
    return { success: false, message: 'Product not found' };
  }
};

export const deleteProduct = async (productId) => {
  try {
    const res = await api.delete(`/products/${productId}`);
    return res.data;
  } catch (err) {
    clientProducts = clientProducts.filter(p => p.id !== productId);
    return { success: true, message: 'Deleted successfully' };
  }
};

export const fetchAdminStats = async () => {
  try {
    const res = await api.get('/admin/stats', { headers: { 'x-demo-role': 'admin' } });
    return res.data;
  } catch (err) {
    const pendingCount = clientProducts.filter(p => p.status === 'pending').length;
    const activeCount = clientProducts.filter(p => p.status === 'approved').length;
    const soldCount = clientProducts.filter(p => p.status === 'sold').length;
    const reportsCount = clientReports.filter(r => r.status === 'pending').length;

    return {
      success: true,
      stats: {
        pendingApprovals: pendingCount,
        activeListings: activeCount,
        soldListings: soldCount,
        flaggedContent: reportsCount,
        verifiedStudents: 4
      }
    };
  }
};

export const fetchPendingListings = async () => {
  try {
    const res = await api.get('/admin/pending', { headers: { 'x-demo-role': 'admin' } });
    return res.data;
  } catch (err) {
    const pendingListings = clientProducts.filter(p => p.status === 'pending');
    return { success: true, count: pendingListings.length, pendingListings };
  }
};

export const approveListing = async (productId) => {
  try {
    const res = await api.post(`/admin/approve/${productId}`, {}, { headers: { 'x-demo-role': 'admin' } });
    return res.data;
  } catch (err) {
    return updateProductStatus(productId, 'approved');
  }
};

export const rejectListing = async (productId) => {
  try {
    const res = await api.post(`/admin/reject/${productId}`, {}, { headers: { 'x-demo-role': 'admin' } });
    return res.data;
  } catch (err) {
    return updateProductStatus(productId, 'rejected');
  }
};

export const fetchReports = async () => {
  try {
    const res = await api.get('/reports', { headers: { 'x-demo-role': 'admin' } });
    return res.data;
  } catch (err) {
    return { success: true, reports: clientReports };
  }
};

export const createReport = async (productId, reason) => {
  try {
    const res = await api.post('/reports', { productId, reason });
    return res.data;
  } catch (err) {
    const prod = clientProducts.find(p => p.id === productId);
    const newReport = {
      id: `rep-${Date.now()}`,
      productId,
      productTitle: prod ? prod.title : 'Listing Item',
      reportedBy: 'Alex Rivera',
      reporterEmail: 'alex.rivera@campus.edu',
      reason,
      createdAt: new Date().toISOString(),
      status: 'pending'
    };
    clientReports.unshift(newReport);
    return {
      success: true,
      message: 'Report submitted for admin review.',
      report: newReport
    };
  }
};

export const actionReport = async (reportId, action) => {
  try {
    const res = await api.post(`/reports/${reportId}/action`, { action }, { headers: { 'x-demo-role': 'admin' } });
    return res.data;
  } catch (err) {
    const rep = clientReports.find(r => r.id === reportId);
    if (rep) {
      rep.status = action;
      if (action === 'actioned') {
        clientProducts = clientProducts.filter(p => p.id !== rep.productId);
      }
      return { success: true, report: rep };
    }
    return { success: false, message: 'Report not found' };
  }
};
