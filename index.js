import express from "express";
import dotenv from 'dotenv';
import { errorHandler } from "./src/middleware/error-handler.middleware.js";
import { dbConnect } from "./src/db/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { userRouter } from "./src/routes/user.routes.js";
import { profilerouter } from './src/routes/profile.routes.js';
import { schedulerouter } from './src/routes/schedule.routes.js';
import { announcementRouter } from "./src/routes/announcement.routes.js";
import { approvalRouter } from "./src/routes/approval.routes.js";
import path from 'path';
import { fileURLToPath } from 'url';
import { authMiddleware } from './src/middleware/auth.middleware.js';
import { stateRouter } from './src/routes/state.routes.js'; 

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const connection = await dbConnect();

app.use(cors({ origin: "*" }),);

app.use(cookieParser());

// Content-Type: application/x-www-form-urlencoded 형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(express.urlencoded({ extended: true }));
// Content-Type: application/json 형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(express.json());


app.use('/users', userRouter);           
app.use('/profile', authMiddleware.verifyToken, profilerouter);      //프로필 관련 라우터
app.use('/schedule', authMiddleware.verifyToken, schedulerouter);    // 스케줄 관련 라우터
app.use('/state', authMiddleware.verifyToken, stateRouter); // 상태관련 라우터
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); //프로필 사진파일 업로드


app.use('/announcement', announcementRouter);
app.use('/approval', approvalRouter);


app.use(errorHandler);
app.listen(3000, () => {
  console.log("서버 실행");
});

