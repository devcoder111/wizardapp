const express = require("express");
const router = express.Router();

const { getPrivateData } = require('../controllers/private');
const { protect } = require('../middleware/auth');

router.route("/").get((req, res, next) => protect(req, res, next, ["1","2"]),getPrivateData);

module.exports = router;