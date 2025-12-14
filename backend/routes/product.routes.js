const express = require('express');
const router = express.Router();
const multer = require('multer');
const { 
  getAllProductController, 
  createProductController, 
  updateProductController, 
  deleteProductController 
} = require('../Controller/product.controller');
const productModel = require('../Models/product.model'); // Add this import

// Multer setup
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only images are allowed'));
    }
  },
}).array('images', 5); // Max 5 images

// Error handling middleware for multer
const handleMulterError = (error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'File too large. Maximum size is 5MB.'
      });
    }
  } else if (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
  next();
};

router.get("/add-product", (req, res) => {
  res.render("addProduct.ejs"); // FIXED!
});

// 🟩 Render All Products Page
router.get("/view-products", async (req, res) => {
  try {
    const allProducts = await productModel.find().populate("user_id", "name email");
    res.render("productList", { products: allProducts });
  } catch (error) {
    res.status(500).send("Error loading products: " + error.message);
  }
});

// API Routes
router.get('/get-products', getAllProductController);
router.post('/create-product', upload, handleMulterError, createProductController);
router.put('/update-product/:id', upload, handleMulterError, updateProductController);
router.delete('/delete-product/:id', deleteProductController);

module.exports = router;