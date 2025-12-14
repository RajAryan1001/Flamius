// // require("dotenv").config();
// // const express = require("express");
// // const connectDB = require("./Config/db/db");
// // const userRoutes = require("./routes/user.routes");
// // const productRoutes = require("./routes/product.routes");
// // const cookieParser = require("cookie-parser");
// // const cors = require("cors");
// // const path = require("path");

// // const app = express();

// // /* -------------------- 🌍 CORS CONFIG -------------------- */
// // app.use(
// //   cors({
// //     origin: "http://localhost:5173", // frontend URL
// //     credentials: true, // allow cookies (important!)
// //   })
// // );

// // /* -------------------- ⚙️ ENVIRONMENT VALIDATION -------------------- */
// // const envCheck = {
// //   NODE_ENV: process.env.NODE_ENV,
// //   PORT: process.env.PORT,
// //   MONGODB_URI: process.env.MONGODB_URI ? "✓ Set" : "✗ Missing",
// //   JWT_SECRET: process.env.JWT_SECRET ? "✓ Set" : "✗ Missing",
// //   EMAIL_USER: process.env.EMAIL_USER ? "✓ Set" : "✗ Missing",
// //   EMAIL_PASS: process.env.EMAIL_PASS ? "✓ Set" : "✗ Missing",
// //   APP_URL: process.env.APP_URL ? "✓ Set" : "✗ Missing",
// //   IMAGEKIT_URL: process.env.IMAGEKIT_URL ? "✓ Set" : "✗ Missing",
// //   IMAGEKIT_PUBLICKEY: process.env.IMAGEKIT_PUBLICKEY ? "✓ Set" : "✗ Missing",
// //   IMAGEKIT_PRIVATEKEY: process.env.IMAGEKIT_PRIVATEKEY ? "✓ Set" : "✗ Missing",
// // };
// // console.log("Environment Variables Check:", envCheck);

// // // Validate critical environment variables
// // const missingCriticalVars = [];
// // if (!process.env.MONGODB_URI) missingCriticalVars.push("MONGODB_URI");
// // if (!process.env.JWT_SECRET) missingCriticalVars.push("JWT_SECRET");
// // if (!process.env.EMAIL_USER) missingCriticalVars.push("EMAIL_USER");
// // if (!process.env.EMAIL_PASS) missingCriticalVars.push("EMAIL_PASS");
// // if (!process.env.APP_URL) missingCriticalVars.push("APP_URL");

// // if (missingCriticalVars.length > 0) {
// //   console.error(`❌ Missing critical environment variables: ${missingCriticalVars.join(", ")}`);
// //   process.exit(1);
// // }

// // // Warn about missing ImageKit variables (non-critical)
// // if (
// //   !process.env.IMAGEKIT_URL ||
// //   !process.env.IMAGEKIT_PUBLICKEY ||
// //   !process.env.IMAGEKIT_PRIVATEKEY
// // ) {
// //   console.warn("⚠️ Missing ImageKit environment variables. ImageKit features may not work.");
// // }

// // /* -------------------- 🔧 MIDDLEWARE -------------------- */
// // app.use(express.json({ limit: "10mb" }));
// // app.use(express.urlencoded({ extended: true, limit: "10mb" }));
// // app.use(cookieParser());
// // app.use(express.static("public"));

// // /* -------------------- 🎨 VIEW ENGINE -------------------- */
// // app.set("view engine", "ejs");
// // app.set("views", path.join(__dirname, "views"));

// // /* -------------------- 🚏 ROUTES -------------------- */
// // app.use("/api/user", userRoutes);
// // app.use("/api/product", productRoutes);

// // /* -------------------- 🏠 TEST HOME ROUTE -------------------- */
// // app.get("/api/auth/home", (req, res) => {
// //   res.status(200).json({
// //     success: true,
// //     message: "✅ Public home route working successfully!",
// //   });
// // });

// // /* -------------------- ❤️ HEALTH CHECK -------------------- */
// // app.get("/health", (req, res) => {
// //   res.status(200).json({
// //     success: true,
// //     message: "Server is running healthy!",
// //     timestamp: new Date().toISOString(),
// //   });
// // });

// // /* -------------------- ❌ 404 HANDLER -------------------- */
// // app.use("*", (req, res) => {
// //   console.log(`404 Route Hit: ${req.originalUrl}`);
// //   res.status(404).json({
// //     success: false,
// //     message: "Route not found",
// //   });
// // });

// // /* -------------------- 🧩 GLOBAL ERROR HANDLER -------------------- */
// // app.use((error, req, res, next) => {
// //   console.error("🚨 Global Error Handler:", error);
// //   res.status(500).json({
// //     success: false,
// //     message: "Internal server error",
// //     error: process.env.NODE_ENV === "development" ? error.message : undefined,
// //   });
// // });

// // /* -------------------- 🚀 CONNECT DB & START SERVER -------------------- */
// // const PORT = process.env.PORT || 4000;

// // connectDB()
// //   .then(() => {
// //     app.listen(PORT, () => {
// //       console.log(`✅ Server is running on port ${PORT}`);
// //       console.log(`📍 Visit: http://localhost:${PORT}`);
// //       console.log(`🛍️ Products page: http://localhost:${PORT}/api/product/view-products`);
// //     });
// //   })
// //   .catch((err) => {
// //     console.error("❌ Failed to connect to MongoDB:", err);
// //     process.exit(1);
// //   });

// // module.exports = app;


// require("dotenv").config();
// const express = require("express");
// const connectDB = require("./Config/db/db");
// const userRoutes = require("./routes/user.routes");
// const productRoutes = require("./routes/product.routes");
// const cors = require("cors");
// const cookieParser = require("cookie-parser");
// const path = require("path");

// const app = express();

// /* -------------------- 🌍 CORS CONFIG -------------------- */
// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//   })
// );

// /* -------------------- 🔧 MIDDLEWARE -------------------- */
// app.use(express.json({ limit: "10mb" }));
// app.use(express.urlencoded({ extended: true, limit: "10mb" }));
// app.use(cookieParser());
// app.use(express.static("public"));

// /* -------------------- 🧩 ROUTES -------------------- */
// app.use("/api/user", userRoutes);
// app.use("/api/product", productRoutes);

// /* -------------------- 🏠 ROOT ROUTE -------------------- */
// app.get("/", (req, res) => {
//   res.json({ success: true, message: "Server running successfully!" });
// });

// /* -------------------- 🚑 HEALTH CHECK -------------------- */
// app.get("/health", (req, res) => {
//   res.status(200).json({
//     success: true,
//     message: "Server is healthy!",
//     timestamp: new Date().toISOString(),
//   });
// });

// /* -------------------- ❌ 404 HANDLER -------------------- */
// app.use("*", (req, res) => {
//   res.status(404).json({
//     success: false,
//     message: "Route not found",
//   });
// });

// /* -------------------- 🚨 GLOBAL ERROR HANDLER -------------------- */
// app.use((error, req, res, next) => {
//   console.error("Error:", error.message);
//   res.status(500).json({
//     success: false,
//     message: "Internal server error",
//   });
// });

// /* -------------------- 🚀 START SERVER -------------------- */
// const PORT = process.env.PORT || 4000;

// connectDB()
//   .then(() => {
//     app.listen(PORT, () => {
//       console.log(`✅ Server running on port ${PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.error("❌ Database connection failed:", err.message);
//     process.exit(1);
//   });


require("dotenv").config();
const express = require("express");
const connectDB = require("./Config/db/db");
const userRoutes = require("./routes/user.routes");
const productRoutes = require("./routes/product.routes");
const orderRoutes = require("./routes/order.routes");
const adminRoutes = require('./routes/admin.routes');
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");

const app = express();

// EJS SETUP (ADD THIS!)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));

/* CORS */
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

/* MIDDLEWARE */
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());

/* ROUTES */
app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);
app.use("/api/orders", orderRoutes);
app.use('/api/admin', adminRoutes);

app.get("/", (req, res) => {
  res.send(`
    <h1>FlipCart Backend LIVE</h1>
    <ul>
      <li><a href="/api/product/add-product">Add Product</a></li>
      <li><a href="/api/product/view-products">View All Products</a></li>
    </ul>
  `);
});

/* START SERVER */
const PORT = process.env.PORT || 4000;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Add Product → http://localhost:${PORT}/api/product/add-product`);
  });
});