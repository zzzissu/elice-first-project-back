import { Router } from "express";
import { emailController } from "../controller/email.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.get('/api/received', authMiddleware.verifyToken, emailController.getReceivedEmail);
router.get('/api/sent', authMiddleware.verifyToken, emailController.getSentEmail);
router.post('/api/post', authMiddleware.verifyToken, emailController.postEmail);

export const emailRouter = router;