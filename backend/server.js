import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: "10mb" }));

// Logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString().split("T")[1].slice(0, 8)}] ${req.method} ${req.originalUrl}`);
  next();
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/reports", reportRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "online",
    app: "Campus Market API",
    mode: "In-Memory Dummy Data Store",
    timestamp: new Date().toISOString()
  });
});

// Root route
app.get("/", (req, res) => {
  res.send(`
    <div style="font-family: sans-serif; padding: 40px; text-align: center;">
      <h1 style="color: #4F46E5;">🎓 Campus Market - API Server</h1>
      <p style="color: #4B5563; font-size: 1.1rem;">Trusted Second-Hand Marketplace for College Community</p>
      <div style="margin-top: 20px; background: #F3F4F6; display: inline-block; padding: 15px 30px; border-radius: 12px;">
        ✅ Server Running on Port <strong>${PORT}</strong> | Mode: <strong>Zero-Config Mock Store</strong>
      </div>
    </div>
  `);
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err.stack);
  res.status(500).json({ success: false, message: "Internal Server Error", error: err.message });
});

app.listen(PORT, () => {
  console.log(`\n==================================================`);
  console.log(`🚀 Campus Market Backend API Server is running!`);
  console.log(`📡 URL: http://localhost:${PORT}`);
  console.log(`💡 Mode: In-Memory Pre-Loaded Campus Dataset`);
  console.log(`==================================================\n`);
});
