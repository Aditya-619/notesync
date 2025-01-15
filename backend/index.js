import { config } from "dotenv";
config();
import express from "express";
import morgan from "morgan";
import cors from 'cors';
import { dbConnect } from "./dbConnect.js";
import rateLimit from "express-rate-limit";
import bodyParser from "body-parser";
import userRouter from "./routes/auth.js";
import noteRouter from "./routes/notes.js";

dbConnect();
const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(morgan("dev"));

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, 
  max: 100,
});
app.use(limiter);

app.use("/api/auth", userRouter);
app.use("/api", noteRouter);

app.listen(PORT, () => {
  console.log(`server is running`);
});
