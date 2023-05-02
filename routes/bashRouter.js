const express = require("express");
const { corner, cornerForm, fullscreen, start } = require('../controllers/bashControllers')


const router = express.Router()

router.route("/start").post(start)
router.route("/corner").get(corner)
router.route("/corner-form").get(cornerForm)
router.route("/fullscreen").get(fullscreen)

module.exports = router



