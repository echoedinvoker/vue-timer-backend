const mongoose = require("mongoose")


mongoose.connect(process.env.DATABASE_LOCAL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}).then(con => {
    console.log(con.connection)
    console.log('DB connection successful!')
  })

const lectureSchema = new mongoose.Schema({
  subject: {
    type: String,
    lowercase: true,
    required: true
  },
  course: {
    type: String,
    required: true
  },
  chapter: {
    type: String,
    required: true
  },
  chapterPath: {
    type: String,
    lowercase: true,
    required: true
  },
  lecture: {
    type: String,
    required: true
  },
  lecturePath: {
    type: String,
    lowercase: true,
    required: true
  },
  length: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['new','done','skipped','process'],
    default: 'new'
  },
  type: {
    type: String,
    enum: ['video', 'paper', 'others'],
    default: 'video'
  },
  teacher: String,
  timeStart: Date,
  timeEnd: Date,
  timeSpend: Number,
  linkGit: String,
  linkUdemy: String,
  tags: [{
    type: String,
    lowercase: true,
    trim: true
  }],
  summary: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  createAt: {
    type: Date,
    default: Date.now()
  },
  target: {
    type: Boolean,
    default: false
  },
  reviews: [{
    timeStart: Date,
    timeEnd: Date,
    timeSpend: Number,
    modified: {
      type: Boolean,
      default: false
    }
  }]
})

const Lecture = mongoose.model("lecture", lectureSchema)

module.exports = Lecture
