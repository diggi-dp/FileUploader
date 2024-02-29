const express = require('express');
const router = express.Router();
const authRoutes = require('./authRoute');
const fileRoutes = require('./fileRoute');

router.use('/auth', authRoutes);
router.use('/file', fileRoutes);

module.exports = router;
