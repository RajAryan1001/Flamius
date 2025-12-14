const mongoose = require("mongoose");
const productModel = require("../Models/product.model");
const sendFilesToStorage = require("../services/storage.services");

// 🟩 Get All Products
const getAllProductController = async (req, res) => {
  try {
    const allProducts = await productModel
      .find({})
      .populate("user_id", "name email");

    return res.status(200).json({
      success: true,
      message:
        allProducts.length === 0
          ? "No products found"
          : "Products fetched successfully",
      data: allProducts,
    });
  } catch (error) {
    console.error("❌ Error fetching products:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// 🟩 Create Product
const createProductController = async (req, res) => {
  try {
    let { title, description, price } = req.body;

    // 🧠 Handle price (string, number, or object)
    let amount = 0;
    if (typeof price === "object" && price.amount) {
      amount = parseFloat(price.amount);
    } else {
      amount = parseFloat(price);
    }

    // Validate required fields
    if (!title || !description || !amount || !req.files?.length) {
      return res.status(400).json({
        success: false,
        message:
          "Title, description, price, and at least one image are required",
      });
    }

    // Validate price
    if (isNaN(amount) || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Price must be a valid positive number",
      });
    }

    // Temporary user fallback for testing
    const userId = req.user?._id || "507f1f77bcf86cd799439012";

    // Upload images to ImageKit
    const uploadedImages = await Promise.all(
      req.files.map((file) =>
        sendFilesToStorage(file.buffer, file.originalname)
      )
    );

    // Format images for database
    const formattedImages = uploadedImages.map((img) => ({
      fileId: img.fileId,
      url: img.url,
      thumbnailUrl: img.thumbnailUrl,
      name: img.name,
    }));

    // Create product
    const product = await productModel.create({
      title,
      description,
      price: {
        amount,
        currency: "INR",
      },
      images: formattedImages,
      user_id: userId,
    });

    // Populate user data
    await product.populate("user_id", "name email");

    return res.status(201).json({
      success: true,
      message: "Product created successfully 🚀",
      data: product,
    });
  } catch (error) {
    console.error("❌ Product creation failed:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};


// 🟩 Update Product
const updateProductController = async (req, res) => {
  try {
    const product_id = req.params.id;
    const { title, description, amount, currency } = req.body;

    if (!product_id || !mongoose.isValidObjectId(product_id)) {
      return res.status(400).json({
        success: false,
        message: "Valid Product ID is required",
      });
    }

    // Temporary user fallback for testing
    const userId = req.user?._id || "507f1f77bcf86cd799439012";

    const updateFields = {};

    if (title) updateFields.title = title;
    if (description) updateFields.description = description;

    if (amount) {
      if (isNaN(amount) || amount <= 0) {
        return res.status(400).json({
          success: false,
          message: "Price amount must be a valid positive number",
        });
      }
      updateFields.price = {
        amount: parseFloat(amount),
        currency: currency || "INR",
      };
    }

    if (currency && !["INR", "DOLLAR"].includes(currency)) {
      return res.status(400).json({
        success: false,
        message: "Currency must be INR or DOLLAR",
      });
    }

    // Handle new image uploads
    if (req.files?.length > 0) {
      const uploadedImages = await Promise.all(
        req.files.map((file) =>
          sendFilesToStorage(file.buffer, file.originalname)
        )
      );
      
      const formattedImages = uploadedImages.map(img => ({
        fileId: img.fileId,
        url: img.url,
        thumbnailUrl: img.thumbnailUrl,
        name: img.name
      }));
      
      updateFields.images = formattedImages;
    }

    // Update product
    const updatedProduct = await productModel.findByIdAndUpdate(
      product_id,
      { $set: updateFields },
      { new: true, runValidators: true }
    ).populate("user_id", "name email");

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    console.error("❌ Error updating product:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// 🟩 Delete Product
const deleteProductController = async (req, res) => {
  try {
    const product_id = req.params.id;

    if (!product_id || !mongoose.isValidObjectId(product_id)) {
      return res.status(400).json({
        success: false,
        message: "Valid Product ID is required",
      });
    }

    const deletedProduct = await productModel.findByIdAndDelete(product_id);

    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      data: deletedProduct,
    });
  } catch (error) {
    console.error("❌ Error deleting product:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = {
  getAllProductController,
  createProductController,
  updateProductController,
  deleteProductController,
};