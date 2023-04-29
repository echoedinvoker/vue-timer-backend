const Lecture = require("../models/lectureModel")


// NORMAL MIDDLEWARE

exports.aliasTopLong = async (req, res, next) => {
  console.log('test')
  req.query.limit = '3'
  req.query.sort = '-length'

  next()
}


// ROUTER MIDDLEWARE - AGGREGATIONS

exports.getLecturesOrderByLectureNum = async (req, res) => {
  try {
    const lectures = await Lecture.aggregate([
      {
        $addFields: {
          lectureNum: {
            $toInt: {
              $arrayElemAt: [{ $split: ['$lecture', '.'] }, 0]
            }
          }
        }
      },
      {
        $sort: {
          lectureNum: 1
        }
      }
    ])

    res.status(200).json({
      status: "success",
      data: {
        lectures: lectures
      }
    })
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message
    })
  }
}

exports.getLecturesStates = async (_, res) => {
  try {
    const stats = await Lecture.aggregate([
      {
        $group: {
          _id: {
            $toUpper: '$status'
          },
          count: {
            $sum: 1
          },
          totalLength: {
            $sum: '$length'
          },
          totalSpend: {
            $sum: '$timeSpend'
          }
        }
      },
    ])

    res.status(200).json({
      status: "success",
      data: {
        stats
      }
    })
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message
    })
  }
}

exports.targetSubject = async (req, res) => {
  const sub = req.params.subject

  try {
    await Lecture.updateMany({target: false})
    const result = await Lecture.find({subject: sub}).sort('_id').findOne().updateOne({target: true})

    res.status(200).json({
      status: "success",
      result
    })
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message
    })
  }
}

exports.firstPerSubject = async (_, res) => {
  try {
    const result = await Lecture.aggregate([
      {
        $group: {
          _id: '$subject',
          firstID: {
            $first: '$_id'
          },
          firstLecture: {
            $first: '$lecture'
          },
        }
      }
    ])

    res.status(200).json({
      status: "success",
      result
    })
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message
    })
  }

}


// ROUTER MIDDLEWARE

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
    const queryObj = { ...req.query }
    const excludedFields = ['page', 'sort', 'limit', 'fields']
    excludedFields.forEach(el => delete queryObj[el])
    console.log(queryObj)

    // Filter

    let queryStr = JSON.stringify(queryObj)
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)

    let query = Lecture.find(JSON.parse(queryStr))


    // Sorting

    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ')
      query = query.sort(sortBy)
    } else {
      // default sort
      query = query.sort('_id')
    }


    // Projecting

    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ')
      query = query.select(fields)
    } else {
      query = query.select('-__v')
    }


    // Pagination

    const page = req.query.page * 1 || 1
    const limit = req.query.limit * 1 || 100

    const skip = (page - 1) * limit

    query = query.skip(skip).limit(limit)

    // non-exist page handler
    if (req.query.page) {
      const numLectures = await Lecture.countDocuments()
      if (skip >= numLectures) throw new Error('This page does not exist!')
    }


    // Excuting Query

    const lectures = await query

    res.status(200).json({
      status: "success",
      data: {
        lectures: lectures
      }
    })
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message
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
