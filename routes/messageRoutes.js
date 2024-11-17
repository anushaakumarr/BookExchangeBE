const express = require('express');
const router = express.Router();

// Define your routes here
router.get('/', (req, res) => {
  res.send('Exchange route is working!');
});

// Export the router
module.exports = router;
