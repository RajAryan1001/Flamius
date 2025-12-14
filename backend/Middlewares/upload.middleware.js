const multer = require("multer");

// Use memory storage for ImageKit upload
const storage = multer.memoryStorage();

// Limit file size to 5MB per image
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true); // accept file
    } else {
      cb(new Error("Only image files are allowed!"), false);
    }
  },
});

module.exports = upload;