import { Router } from "express";
import { emailController } from "../controller/email.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.get('/api/received', authMiddleware.verifyToken, emailController.getReceivedEmail);
router.get('/api/sent', authMiddleware.verifyToken, emailController.getSentEmail);
router.patch('/api/check/:email_id', authMiddleware.verifyToken, emailController.checkedEmail)
router.post('/api/post', authMiddleware.verifyToken, emailController.postEmail);
router.delete('/api/:email_id', authMiddleware.verifyToken, emailController.deleteEmail);

router.get('/api/check', authMiddleware.verifyToken, emailController.checkNewEmail);

export const emailRouter = router;