const express = require('express');
const { createChangelog, getAllChangelogs, deleteChangelog } = require('../controllers/changelog.controller');
const { auth, isAdmin } = require('../middlewares/auth.mw');

const router = express.Router();

router.post('/', auth, isAdmin, createChangelog);
router.get('/', getAllChangelogs);
router.delete('/:idChangelog', auth, isAdmin, deleteChangelog);

module.exports = router;
