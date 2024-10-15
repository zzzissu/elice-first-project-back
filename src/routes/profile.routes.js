import { Router } from 'express';
import { profileController } from '../controller/profile.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/', authMiddleware.verifyToken, profileController.getProfile); //유저 정보 가져오기
router.put('/', authMiddleware.verifyToken, profileController.updateProfile); //유저 정보 업데이트

export const profilerouter = router;