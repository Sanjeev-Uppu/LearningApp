const express = require('express');
const auth = require('../middleware/auth');

const router = express.Router();

// Get user progress
router.get('/', auth, async (req, res) => {
  try {
    // TODO: Implement progress tracking
    res.json({ message: 'Progress tracking coming soon' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
