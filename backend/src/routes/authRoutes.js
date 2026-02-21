const router = require('express').Router();
const authMiddleware = require('../middleware/authMiddleware');

// GET /api/auth/me — verify token and return user info
router.get('/me', authMiddleware, (req, res) => {
    res.json({ user: req.user });
});

module.exports = router;
