const express = require('express');
const router = express.Router();

// Mock in-memory database store
let marketplaceItems = [
  { id: 1, sellerName: "Sarah Chen", title: "1-on-1 Frontend System Design", price: 35 },
  { id: 2, sellerName: "Marcus Vance", title: "Faang-Style Behavioral Mock Interview", price: 50 }
];

// @route GET /api/marketplace
router.get('/', (req, res) => {
  res.json({ success: true, data: marketplaceItems });
});

// @route POST /api/marketplace/book
router.post('/book', (req, res) => {
  const { serviceId, userTokens } = req.body;
  const service = marketplaceItems.find(s => s.id === serviceId);

  if (!service) return res.status(404).json({ message: "Service not found." });
  if (userTokens < service.price) {
    return res.status(400).json({ message: "Insufficient token balance." });
  }

  res.json({
    success: true,
    message: `Session booked with ${service.sellerName}!`,
    remainingTokens: userTokens - service.price
  });
});

module.exports = router;