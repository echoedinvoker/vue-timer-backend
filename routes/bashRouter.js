const express = require("express");
const { corner, fullscreen } = require('../controllers/bashControllers')


const router = express.Router()

router.route("/corner").get(corner)
router.route("/fullscreen").get(fullscreen)

module.exports = router



