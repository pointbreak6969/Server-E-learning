import mongoose, {Schema} from "mongoose";

const enrollmentSchema = new Schema({
    course: {
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

export const Enrollment = mongoose.model("enrollment", enrollmentSchema);