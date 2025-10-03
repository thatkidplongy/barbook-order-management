const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../config.env") });

const {
  initDatabase,
  getOrders,
  insertOrder,
  getAllOrders,
} = require("./database");
const { summarizeOrders } = require("./utils.js");
const {
  validateCreateOrderRequest,
  validateOrderFilters,
  sanitizeString,
} = require("./utils/validation.js");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the React app build
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));
}

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Initialize database on startup
initDatabase().catch(console.error);

// Routes

// GET /api/summary - Get order summary statistics
app.get("/api/summary", async (req, res) => {
  try {
    const orders = await getAllOrders();
    const summary = summarizeOrders(orders);
    res.json(summary);
  } catch (error) {
    console.error("Error fetching summary:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET /api/orders - Get orders with optional filtering and pagination
app.get("/api/orders", async (req, res) => {
  try {
    const { product, limit, offset } = req.query;

    // Validate query parameters
    const validation = validateOrderFilters({ limit, offset });
    if (!validation.isValid) {
      return res.status(400).json({ error: validation.errors.join(", ") });
    }

    const filters = {};
    if (product) filters.product = sanitizeString(product);
    if (limit) filters.limit = parseInt(limit);
    if (offset) filters.offset = parseInt(offset);

    const orders = await getOrders(filters);
    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST /api/orders - Create a new order
app.post("/api/orders", async (req, res) => {
  try {
    const { product, qty, price } = req.body;

    // Validate request data
    const validation = validateCreateOrderRequest({ product, qty, price });
    if (!validation.isValid) {
      return res.status(400).json({ error: validation.errors.join(", ") });
    }

    const newOrder = await insertOrder({
      product: sanitizeString(product),
      qty,
      price,
    });
    res.status(201).json(newOrder);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Internal server error" });
});

// Serve React app for all non-API routes in production
if (process.env.NODE_ENV === "production") {
  app.get("*", (req, res) => {
    const indexPath = path.join(__dirname, "../client/dist/index.html");
    // Check if the file exists
    if (require("fs").existsSync(indexPath)) {
      res.sendFile(indexPath);
    } else {
      res.status(200).json({
        message: "BarBook Order Management API",
        status: "Backend running successfully",
        frontend: "Building...",
        endpoints: {
          health: "/api/health",
          orders: "/api/orders",
          summary: "/api/summary",
        },
      });
    }
  });
} else {
  // 404 handler for development
  app.use("*", (req, res) => {
    res.status(404).json({ error: "Route not found" });
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});
