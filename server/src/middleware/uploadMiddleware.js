const multer = require("multer");
const path = require("path");

// Storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },

    filename: function (req, file, cb) {
        const uniqueName =
            Date.now() +
            "-" +
            file.originalname;

        cb(null, uniqueName);
    }
});

// Only allow PDF files
const fileFilter = (req, file, cb) => {
    const fileExtension =
        path.extname(file.originalname).toLowerCase();

    if (fileExtension === ".pdf") {
        cb(null, true);
    } else {
        cb(
            new Error("Only PDF files are allowed"),
            false
        );
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024
    }
});

module.exports = upload;