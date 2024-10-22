import mongoose, { Schema } from "mongoose";

const LessonSchema = new Schema(
  {
    unitId: {
      type: Schema.Types.ObjectId,
      ref: "units",
    },
    lessonName: {
      type: String,
      required: true,
    },
    lessonNumber: {
      type: Number,
      required: true,
    },
    videoFile: {
      publicId: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
      duration: {
        type: Number,
      },
    },
    owner: {
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Lesson = mongoose.model("lessons", LessonSchema);
export default Lesson;
