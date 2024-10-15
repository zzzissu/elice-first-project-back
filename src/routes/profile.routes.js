import { Router } from 'express';
import { updatePhoneNumber, updateProfileImage, getProfile } from '../controller/profile.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { upload } from '../middleware/upload.middleware.js';  

const router = Router();

// 프로필 조회
router.get('/', authMiddleware.verifyToken, getProfile);

// 전화번호 업데이트
router.put('/phone', authMiddleware.verifyToken, updatePhoneNumber);

// 프로필 사진 업데이트
router.put('/image', authMiddleware.verifyToken, upload.single('profileImage'), updateProfileImage);

export const profilerouter = router;