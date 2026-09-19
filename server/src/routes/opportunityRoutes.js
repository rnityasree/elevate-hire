const express = require('express');
const router = express.Router();
const opportunityController = require('../controllers/opportunityController');

// Check if you have an auth middleware file. If protect is not available or named differently, 
// import it correctly or use a fallback middleware:
let protect;
try {
  protect = require('../middleware/authMiddleware');
  if (typeof protect !== 'function' && protect.protect) {
    protect = protect.protect; // Handles exports like { protect: authMiddleware }
  }
} catch (e) {
  // Fallback pass-through middleware if authMiddleware isn't set up yet
  protect = (req, res, next) => next(); 
}

router.get('/', opportunityController.getOpportunities);
router.post('/sync-gov', protect, opportunityController.syncGovOpportunities);

module.exports = router;