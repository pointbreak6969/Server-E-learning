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
    category: {
        type: String,
        required: true
    },
    thumbnail: {
      url: {
        type: String, 
        required: true,
      },
      publicId: {
        type: String,
        required : true
      }
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
}, 
{
   timestamps: true
})

 const Course = mongoose.model("courses", CourseSchema);
 export default Course;