const express = require("express");

const upload = require(
    "../middleware/uploadMiddleware"
);

const {
    protect
} = require(
    "../middleware/authMiddleware"
);

const {
    uploadResume
} = require(
    "../controllers/resumeController"
);

const router = express.Router();

router.post(
    "/upload",
    protect,
    upload.single("resume"),
    uploadResume
);

module.exports = router;