import { store } from "../store/inMemoryStore.js";

// GET /api/products
export const getProducts = (req, res) => {
  try {
    const { search, category, minPrice, maxPrice, condition, status, sort, sellerId } = req.query;

    const products = store.getProducts({
      search,
      category,
      minPrice,
      maxPrice,
      condition,
      status: status || "approved", // Default public view shows approved items only
      sort: sort || "newest",
      sellerId
    });

    return res.json({
      success: true,
      count: products.length,
      products
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/products/categories
export const getCategories = (req, res) => {
  const categories = store.getCategories();
  return res.json({ success: true, categories });
};

// GET /api/products/:id
export const getProductById = (req, res) => {
  try {
    const { id } = req.params;
    const product = store.getProductById(id);

    if (!product) {
      return res.status(404).json({ success: false, message: "Product listing not found" });
    }

    return res.json({ success: true, product });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/products
export const createProduct = (req, res) => {
  try {
    const { title, description, price, originalPrice, category, condition, location, images, sellerPhone } = req.body;

    if (!title || !price || !category) {
      return res.status(400).json({ success: false, message: "Title, price, and category are required." });
    }

    // Determine current user / seller
    const sellerId = req.user ? req.user.id : "u-101";
    const seller = store.getUserById(sellerId) || store.getUserById("u-101");

    const newProduct = store.createProduct(
      {
        title,
        description,
        price,
        originalPrice,
        category,
        condition,
        location,
        images,
        sellerPhone
      },
      seller
    );

    return res.status(201).json({
      success: true,
      message: "Listing created successfully! It is currently pending Admin approval.",
      product: newProduct
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// PATCH /api/products/:id/status
export const updateProductStatus = (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ success: false, message: "Status is required (approved, rejected, sold)." });
    }

    const updated = store.updateProductStatus(id, status);
    if (!updated) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    return res.json({
      success: true,
      message: `Product status updated to ${status}`,
      product: updated
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/products/:id/favorite
export const toggleFavorite = (req, res) => {
  try {
    const { id } = req.params;
    const updated = store.toggleFavorite(id);
    return res.json({ success: true, product: updated });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// DELETE /api/products/:id
export const deleteProduct = (req, res) => {
  try {
    const { id } = req.params;
    const success = store.deleteProduct(id);

    if (!success) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    return res.json({ success: true, message: "Listing deleted successfully" });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/products/my-listings
export const getMyListings = (req, res) => {
  try {
    const sellerId = req.user ? req.user.id : "u-101";
    const products = store.getProducts({ sellerId, status: "all" });

    return res.json({ success: true, products });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
