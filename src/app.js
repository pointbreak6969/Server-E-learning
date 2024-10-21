import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();

app.use(express.urlencoded({ extended: true, limit: "32kb" }));
app.use(express.json());
app.use(express.static("public"));
app.use(cookieParser());
app.use(
  cors({
    
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

//import routes
import userRoutes from "./routes/user.route.js";
import videoRoutes from "./routes/video.route.js"
app.use("/api/user", userRoutes);
app.use("/api/video", videoRoutes)
export { app };
