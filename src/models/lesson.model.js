import mongoose, { Schema } from "mongoose";

const LessonSchema = new Schema({
    unitId: {
        type: Schema.Types.ObjectId,
        ref: "units",
        required: true
    },
    videoId: {
        type: Schema.Types.ObjectId,
        ref: "videos",
        required: true
    },
    name : {
        type: String,
        required: true,
    },
    order: {
        type: Number,
        required: true
    }

})

const Lesson = mongoose.model("lessons", LessonSchema); 
export default Lesson;