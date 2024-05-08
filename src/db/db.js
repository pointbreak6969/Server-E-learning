import mongoose from "mongoose"
const connectDB = async ()=>{
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGODB_URL)
        console.log("database connected")
    } catch (error) {
        console.log("Error while connecting with database", error)
    }
}

export {connectDB};