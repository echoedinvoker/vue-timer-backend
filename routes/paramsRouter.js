const express = require("express");
const { getParams, addParam, getParam, updateParam, checkID } = require("../controllers/paramsControllers");



const router = express.Router() 

router.param("id", checkID)

router.route("/").get(getParams).post(addParam)
router.route("/:id").get(getParam).patch(updateParam)

module.exports = router
