
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
  origin: "https://flamius.vercel.app",
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