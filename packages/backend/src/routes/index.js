const express = require('express');

const router = express.Router();

/* GET status page. */
router.get('/', (req, res) => {
  res.json({
    status: 'ok',
    description: 'SketchyMine API Server',
  });
});

module.exports = router;
