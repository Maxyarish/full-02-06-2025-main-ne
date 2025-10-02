const express = require("express");
const { isAdmin } = require('../middlewares/auth.mw');
const { getAllStats } = require("../controllers/stats.controller");
const statsRouter = express.Router();

statsRouter.get("/admin-stats", getAllStats);

module.exports = statsRouter;
