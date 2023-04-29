const express = require("express");
const { createLecture, getLectures, getLecture, patchLecture, deleteLecture } = require("../controllers/lectureControllers")



const router = express.Router() 

router.route("/").post(createLecture).get(getLectures)
router.route("/:id").get(getLecture).patch(patchLecture).delete(deleteLecture)

module.exports = router
