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
        type: Schema.Types.ObjectId,
        ref: "users",
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
}, 
{
    timeseries: true
})

export const Course = mongoose.model("courses", CourseSchema);