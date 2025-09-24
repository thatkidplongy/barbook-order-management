const sqlite3 = require("sqlite3").verbose();
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../config.env") });

const dbPath = process.env.DB_PATH || "./data.db";

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
  } else {
    console.log("Connected to SQLite database");
  }
});

// Initialize database schema
const initDatabase = () => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.run(
        `
        CREATE TABLE IF NOT EXISTS orders (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          product TEXT NOT NULL,
          qty INTEGER NOT NULL,
          price REAL NOT NULL
        )
      `,
        (err) => {
          if (err) {
            console.error("Error creating table:", err.message);
            reject(err);
          } else {
            console.log("Orders table created or already exists");
            resolve();
          }
        }
      );
    });
  });
};

// Get all orders with optional filtering and pagination
const getOrders = (filters = {}) => {
  return new Promise((resolve, reject) => {
    let query = "SELECT * FROM orders";
    let countQuery = "SELECT COUNT(*) as total FROM orders";
    const params = [];
    const countParams = [];
    const conditions = [];

    if (filters.product) {
      conditions.push("product LIKE ?");
      params.push(`%${filters.product}%`);
      countParams.push(`%${filters.product}%`);
    }

    if (conditions.length > 0) {
      const whereClause = " WHERE " + conditions.join(" AND ");
      query += whereClause;
      countQuery += whereClause;
    }

    query += " ORDER BY id DESC";

    if (filters.limit) {
      query += " LIMIT ?";
      params.push(filters.limit);

      if (filters.offset) {
        query += " OFFSET ?";
        params.push(filters.offset);
      }
    }

    // Get total count first
    db.get(countQuery, countParams, (err, countRow) => {
      if (err) {
        reject(err);
        return;
      }

      const total = countRow.total;

      // Then get the paginated results
      db.all(query, params, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve({
            orders: rows,
            total: total,
            limit: filters.limit || null,
            offset: filters.offset || 0,
          });
        }
      });
    });
  });
};

// Insert a new order
const insertOrder = (order) => {
  return new Promise((resolve, reject) => {
    const { product, qty, price } = order;
    db.run(
      "INSERT INTO orders (product, qty, price) VALUES (?, ?, ?)",
      [product, qty, price],
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({
            id: this.lastID,
            product,
            qty,
            price,
          });
        }
      }
    );
  });
};

// Get all orders for summary calculation
const getAllOrders = () => {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM orders", (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

module.exports = {
  db,
  initDatabase,
  getOrders,
  insertOrder,
  getAllOrders,
};
