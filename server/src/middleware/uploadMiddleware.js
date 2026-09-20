const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Resolve absolute path to the uploads directory in the project root
const uploadDir = path.join(process.cwd(), "uploads");

// Auto-create directory on server startup if missing
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Double-check existence dynamically before writing
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },

    filename: function (req, file, cb) {
        // Sanitize file name to prevent illegal characters or path issues
        const cleanName = file.originalname.replace(/[^a-zA-Z0-9.-]/g, "_");
        const uniqueName = `${Date.now()}-${cleanName}`;
        cb(null, uniqueName);
    }
});

// Only allow PDF files
const fileFilter = (req, file, cb) => {
    const fileExtension = path.extname(file.originalname).toLowerCase();

    if (fileExtension === ".pdf" || file.mimetype === "application/pdf") {
        cb(null, true);
    } else {
        cb(new Error("Only PDF files are allowed"), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB limit
    }
});

module.exports = upload;