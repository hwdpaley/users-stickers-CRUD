const express = require('express');

const router = express().router();

router.get('/', (req, res) => {
  res.json({
    message: 'auth'
  });
});
module.export = router;