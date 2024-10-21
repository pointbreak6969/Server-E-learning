import { Schema } from "mongoose";

const UnitSchema = new  Schema({
    courseId: {
        type: Schema.Types.ObjectId,
        ref : "courses",
        required: true
    },
    name: {
        type: String,
        required: true
    },
    order: {
        type: Number,
        required: true
    },
})

const Unit = mongoose.model("units", UnitSchema);
export default Unit;    