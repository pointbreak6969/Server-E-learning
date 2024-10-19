import mongoose, {Schema} from "mongoose";

const enrollmentSchema = new Schema({
    courseId: {
        type: Schema.Types.ObjectId,  //to which course user is enrolled
        ref: "courses",
        required: true
    },
    user: {
        type: Schema.Types.ObjectId, //user who is enrolled
        ref: "users",
        required: true
    },
    enrolledAt: {
        type: Date,
        default: Date.now
    }
}, 
{
    timestamps: true
})

const Enrollment = mongoose.model("enrollment", enrollmentSchema);
export default Enrollment;