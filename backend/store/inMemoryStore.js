import { mockUsers, mockCategories, mockProducts, mockReports } from "../data/mockData.js";

// Deep clone initial state so mutations during testing stay clean in memory
let users = [...mockUsers];
let categories = [...mockCategories];
let products = [...mockProducts];
let reports = [...mockReports];

export const store = {
  // --- USERS ---
  getUsers: () => users,
  getUserById: (id) => users.find((u) => u.id === id),
  getUserByEmail: (email) => users.find((u) => u.email.toLowerCase() === email.toLowerCase()),
  
  // --- CATEGORIES ---
  getCategories: () => categories,

  // --- PRODUCTS ---
  getProducts: ({ search, category, minPrice, maxPrice, condition, status = "approved", sort = "newest", sellerId }) => {
    let result = products;

    // Filter by status (approved for public, pending for admin review, or all for seller dashboard)
    if (status && status !== "all") {
      result = result.filter((p) => p.status === status);
    }

    // Filter by seller ID if requested
    if (sellerId) {
      result = result.filter((p) => p.sellerId === sellerId);
    }

    // Filter by search query (title, description, location, department)
    if (search && search.trim() !== "") {
      const q = search.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q) ||
          p.sellerName.toLowerCase().includes(q) ||
          p.sellerDept.toLowerCase().includes(q)
      );
    }

    // Filter by category
    if (category && category !== "All") {
      result = result.filter((p) => p.category.toLowerCase() === category.toLowerCase());
    }

    // Filter by condition
    if (condition && condition !== "All") {
      result = result.filter((p) => p.condition.toLowerCase() === condition.toLowerCase());
    }

    // Filter by price range
    if (minPrice !== undefined && minPrice !== null && minPrice !== "") {
      const min = Number(minPrice);
      if (!isNaN(min)) {
        result = result.filter((p) => p.price >= min);
      }
    }

    if (maxPrice !== undefined && maxPrice !== null && maxPrice !== "") {
      const max = Number(maxPrice);
      if (!isNaN(max)) {
        result = result.filter((p) => p.price <= max);
      }
    }

    // Sorting
    result = [...result].sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "views") return b.views - a.views;
      // Default: newest
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    return result;
  },

  getProductById: (id) => {
    const product = products.find((p) => p.id === id);
    if (product) {
      // Increment view count on get
      product.views += 1;
    }
    return product;
  },

  createProduct: (productData, seller) => {
    const newProduct = {
      id: `prod-${Date.now()}`,
      title: productData.title,
      description: productData.description || "",
      price: Number(productData.price) || 0,
      originalPrice: Number(productData.originalPrice) || Number(productData.price) || 0,
      category: productData.category || "Textbooks & Notes",
      condition: productData.condition || "Good",
      location: productData.location || "Main Campus Quad",
      images: productData.images && productData.images.length > 0
        ? productData.images
        : ["https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=800"],
      sellerId: seller.id,
      sellerName: seller.name,
      sellerDept: seller.department || "Student",
      sellerAvatar: seller.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300",
      sellerPhone: productData.sellerPhone || seller.phone || "+1 (555) 000-0000",
      status: "pending", // All new student submissions require admin approval
      createdAt: new Date().toISOString(),
      views: 1,
      favorites: 0
    };

    products.unshift(newProduct);
    return newProduct;
  },

  updateProductStatus: (id, status) => {
    const product = products.find((p) => p.id === id);
    if (product) {
      product.status = status;
      return product;
    }
    return null;
  },

  toggleFavorite: (id) => {
    const product = products.find((p) => p.id === id);
    if (product) {
      product.favorites = (product.favorites || 0) + 1;
      return product;
    }
    return null;
  },

  deleteProduct: (id) => {
    const initialLen = products.length;
    products = products.filter((p) => p.id !== id);
    return products.length < initialLen;
  },

  // --- ADMIN & MODERATION ---
  getPendingProducts: () => {
    return products.filter((p) => p.status === "pending");
  },

  getAdminStats: () => {
    const pendingCount = products.filter((p) => p.status === "pending").length;
    const activeCount = products.filter((p) => p.status === "approved").length;
    const soldCount = products.filter((p) => p.status === "sold").length;
    const reportsCount = reports.filter((r) => r.status === "pending").length;
    const totalUsers = users.filter((u) => u.role === "student").length;

    return {
      pendingApprovals: pendingCount,
      activeListings: activeCount,
      soldListings: soldCount,
      flaggedContent: reportsCount,
      verifiedStudents: totalUsers
    };
  },

  // --- REPORTS ---
  getReports: () => reports,

  createReport: (productId, reportedBy, reason) => {
    const product = products.find((p) => p.id === productId);
    const newReport = {
      id: `rep-${Date.now()}`,
      productId,
      productTitle: product ? product.title : "Unknown Product",
      reportedBy: reportedBy ? reportedBy.name : "Anonymous Student",
      reporterEmail: reportedBy ? reportedBy.email : "anonymous@campus.edu",
      reason: reason || "Inappropriate content or misleading description",
      createdAt: new Date().toISOString(),
      status: "pending"
    };

    reports.unshift(newReport);
    return newReport;
  },

  actionReport: (reportId, action) => {
    const report = reports.find((r) => r.id === reportId);
    if (report) {
      report.status = action; // 'dismissed' or 'actioned'
      if (action === "actioned") {
        // Automatically delete or reject product if actioned
        store.deleteProduct(report.productId);
      }
      return report;
    }
    return null;
  }
};
