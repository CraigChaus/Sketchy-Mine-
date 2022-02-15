const express = require('express');

const router = express.Router();

/* GET status page. */
router.get('/', (req, res) => {
  res.json({
    status: 'ok',
  });
});

module.exports = router;
