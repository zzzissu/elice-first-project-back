import express from "express";
import { errorHandler } from "./src/middleware/error-handler.middleware.js";
import { dbConnect } from "./src/db/db.js";
import cors from "cors";
import { userRouter } from "./src/routes/user.routes.js";

const app = express();
const connection = await dbConnect();

app.use(cors({ origin: "*" }),);

// Content-Type: application/x-www-form-urlencoded 형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(express.urlencoded({ extended: true }));
// Content-Type: application/json 형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(express.json());

app.use('/users', userRouter);

app.use(errorHandler);
app.listen(3000, () => {
  console.log("서버 실행");
});

