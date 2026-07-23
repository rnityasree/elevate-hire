const express = require("express");

const {
    registerEmployer,
    loginEmployer
} = require("../controllers/employerAuthController");

const router = express.Router();

// Employer Authentication
router.post("/register", registerEmployer);

router.post("/login", loginEmployer);

module.exports = router;