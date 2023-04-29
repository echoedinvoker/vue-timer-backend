const Lecture = require("../models/lectureModel")


exports.createLecture = async (req, res) => {
  try {
    const newLecture = await Lecture.create(req.body)

    res.status(201).json({
      status: "success",
      data: {
        lecture: newLecture
      }
    })
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error
    })
  }
}

exports.getLectures = async (req, res) => {
  try {
    const lectures = await Lecture.find()

    res.status(200).json({
      status: "success",
      data: {
        lectures: lectures
      }
    })
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error
    })
  }
}

exports.getLecture = async (req, res) => {
  try {
    const lecture = await Lecture.findById(req.params.id)

    res.status(200).json({
      status: "success",
      data: {
        lecture: lecture
      }
    })
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error
    })
  }
}

exports.patchLecture = async (req, res) => {
  try {
    const lecture = await Lecture.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    )
    res.status(200).json({
      status: "success",
      data: {
        lecture: lecture
      }
    })
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error
    })
  }
}

exports.deleteLecture = async (req, res) => {
  try {
    await Lecture.findByIdAndDelete(req.params.id)
    res.status(200).json({
      status: "success",
      data: null    
    })
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error
    })
  }
}
