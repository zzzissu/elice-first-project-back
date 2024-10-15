import { Router } from "express";
import { emailController } from "../controller/email.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.get('/received', authMiddleware.verifyToken, emailController.getReceivedEmail);
router.get('/sent', authMiddleware.verifyToken, emailController.getSentEmail);
router.patch('/check/:email_id', authMiddleware.verifyToken, emailController.checkedEmail)
router.post('/post', authMiddleware.verifyToken, emailController.postEmail);
router.delete('/:email_id', authMiddleware.verifyToken, emailController.deleteEmail);

router.get('/check', authMiddleware.verifyToken, emailController.checkNewEmail);

export const emailRouter = router;