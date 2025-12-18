import dotenv from "dotenv";
import pgPool from "./config/db.js";
import { app } from "./app.js";

dotenv.config({ path: "./.env" });

console.log("🚀 SERVER ENTRY FILE LOADED");

// Test PostgreSQL connection first
pgPool
  .query("SELECT NOW()")
  .then(() => {
    console.log("Database connected successfully");

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on PORT ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err.message);
  });
