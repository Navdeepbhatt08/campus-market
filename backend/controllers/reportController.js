import { store } from "../store/inMemoryStore.js";

// GET /api/reports
export const getReports = (req, res) => {
  try {
    const reports = store.getReports();
    return res.json({ success: true, count: reports.length, reports });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/reports
export const createReport = (req, res) => {
  try {
    const { productId, reason } = req.body;
    const reportedBy = req.user ? req.user : store.getUserById("u-101");

    if (!productId) {
      return res.status(400).json({ success: false, message: "Product ID is required" });
    }

    const report = store.createReport(productId, reportedBy, reason);
    return res.status(201).json({
      success: true,
      message: "Listing reported to campus moderation. Thank you for keeping our community safe!",
      report
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/reports/:id/action
export const actionReport = (req, res) => {
  try {
    const { id } = req.params;
    const { action } = req.body; // 'dismissed' or 'actioned'

    if (!action || !["dismissed", "actioned"].includes(action)) {
      return res.status(400).json({ success: false, message: "Valid action is required (dismissed or actioned)." });
    }

    const report = store.actionReport(id, action);
    if (!report) {
      return res.status(404).json({ success: false, message: "Report not found" });
    }

    return res.json({
      success: true,
      message: action === "actioned" ? "Listing removed and report resolved." : "Report dismissed.",
      report
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
