import mongoose, {Schema} from "mongoose";


const videoSchema = new Schema({
    videoFile:{
        publicId: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    title: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
    },
    views: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true,
})
 const Video = mongoose.model("videos", videoSchema);
 export default Video;