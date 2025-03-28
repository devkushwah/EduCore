const mongoose = require("mongoose");

const courseProgressSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  completedVideos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubSection",
    },
  ],
  lastWatched: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SubSection",
  },
}, { timestamps: true });

// Compound index to ensure a user can have only one progress document per course
courseProgressSchema.index({ courseId: 1, userId: 1 }, { unique: true });

module.exports = mongoose.model("CourseProgress", courseProgressSchema);