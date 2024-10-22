import mongoose, { Schema } from "mongoose"; 

const UnitSchema = new  Schema({
    courseId: {
        type: Schema.Types.ObjectId,
        ref : "courses"
    },
    unitName: {
        type: String,
        required: true
    },
    unitNumber: {
        type: Number,
        required: true
    },
})

const Unit = mongoose.model("units", UnitSchema);
export default Unit;    