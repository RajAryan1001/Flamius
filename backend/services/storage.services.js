require("dotenv").config();

const ImageKit = require("imagekit");

// Check if all keys exist
const { IMAGEKIT_PUBLIC_KEY, IMAGEKIT_PRIVATE_KEY, IMAGEKIT_URL } = process.env;

if (!IMAGEKIT_PUBLIC_KEY || !IMAGEKIT_PRIVATE_KEY || !IMAGEKIT_URL) {
  console.error(
    "❌ Missing ImageKit environment variables. Please check your .env file."
  );
  process.exit(1);
}

// Initialize ImageKit
const storageInstance = new ImageKit({
  publicKey: IMAGEKIT_PUBLIC_KEY,
  privateKey: IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: IMAGEKIT_URL,
});

const sendFilesToStorage = async (fileBuffer, fileName) => {
  try {
    // Convert buffer to Base64
    const base64File = fileBuffer.toString("base64");

    const response = await storageInstance.upload({
      file: base64File,
      fileName: `product_${Date.now()}_${fileName}`,
      folder: "FlipCart",
    });

    return response;
  } catch (error) {
    console.error("❌ Error uploading file to ImageKit:", error);
    throw new Error(`Image upload failed: ${error.message}`);
  }
};

module.exports = sendFilesToStorage;