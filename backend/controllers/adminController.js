import { store } from "../store/inMemoryStore.js";

// GET /api/admin/stats
export const getAdminStats = (req, res) => {
  try {
    const stats = store.getAdminStats();
    return res.json({ success: true, stats });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/admin/pending
export const getPendingListings = (req, res) => {
  try {
    const pendingListings = store.getPendingProducts();
    return res.json({ success: true, count: pendingListings.length, pendingListings });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/admin/approve/:id
export const approveListing = (req, res) => {
  try {
    const { id } = req.params;
    const updated = store.updateProductStatus(id, "approved");
    if (!updated) {
      return res.status(404).json({ success: false, message: "Listing not found" });
    }
    return res.json({
      success: true,
      message: "Listing approved and is now live on Campus Market!",
      product: updated
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/admin/reject/:id
export const rejectListing = (req, res) => {
  try {
    const { id } = req.params;
    const updated = store.updateProductStatus(id, "rejected");
    if (!updated) {
      return res.status(404).json({ success: false, message: "Listing not found" });
    }
    return res.json({
      success: true,
      message: "Listing rejected.",
      product: updated
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
