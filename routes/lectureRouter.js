const express = require("express");
const { createLecture, getLectures, getLecture, patchLecture, deleteLecture, aliasTopLong, getLecturesOrderByLectureNum, getLecturesStates, targetSubject, firstPerSubject } = require("../controllers/lectureControllers")



const router = express.Router()

router.route("/top-long").get(aliasTopLong, getLectures)
router.route("/order-by-lec-num").get(getLecturesOrderByLectureNum)
router.route("/stats-by-status").get(getLecturesStates)
router.route("/target-subject/:subject").get(targetSubject)
router.route("/first-per-subject").get(firstPerSubject)

router.route("/").post(createLecture).get(getLectures)
router.route("/:id").get(getLecture).patch(patchLecture).delete(deleteLecture)


module.exports = router
