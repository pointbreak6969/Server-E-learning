import mongoose, {Schema} from "mongoose";

const CourseSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
        required: true
    },
    level: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        default: 0,
        min: 0,
        max: 5
    },
    currentPrice: {
        type: Number,
        required: true,
        min: 0
    },
    previousPrice: {
        type: Number,
        min: 0
    },
    students: {
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    videoContents : [
        { 
            unit: {
                type: String,
                required: true
            },
            lessons: [
                {
                    lessonName: {
                        type: String,
                        required: true
                    },
                    videoUrl: {
                        type: Schema.Types.ObjectId,
                        ref: "videos",
                    },
                    _id: false
                }
            ],
            _id: false
        }
    ]
    
}, 
{
    timeseries: true
})

export const Course = mongoose.model("course", CourseSchema);