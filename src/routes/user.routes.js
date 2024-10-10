import { Router } from "express";
import { userController } from "../controller/user.controller.js";

const router = Router();

router.post('/api/signup', userController.signUp);
router.post('/api/signin', userController.signIn);
router.delete('/api/delete', userController.deleteUser);

export const userRouter = router;