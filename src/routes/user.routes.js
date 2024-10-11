import { Router } from "express";
import { userController } from "../controller/user.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.post('/api/signup', userController.signUp);
router.post('/api/signin', userController.signIn);
router.post('/api/findpassword', userController.findPassword);
router.delete('/api/delete', authMiddleware.verifyToken, userController.deleteUser);

export const userRouter = router;