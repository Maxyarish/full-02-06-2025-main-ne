const express = require('express');
const { createChangelog, getAllChangelogs } = require('../controllers/changelog.controller');
const { isAdmin, auth } = require('../middlewares/auth.mw');

const router = express.Router();

router.post('/', auth, isAdmin, createChangelog);
router.get('/', getAllChangelogs);

module.exports = router;
