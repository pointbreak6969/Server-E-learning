import "dotenv/config"
import { connectDB } from "./db/db.js"
import { app } from "./app.js"

const PORT = process.env.PORT;

connectDB().then(()=>{
    app.listen(PORT, ()=>{
        console.log("server is running on port", PORT)
    })
}).catch((error)=>{
    console.log("MongoDb connection error", error)
})
