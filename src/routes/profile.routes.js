import { Router } from 'express';
import { profileController } from '../controller/profile.controller.js';
import { upload } from '../middleware/upload.middleware.js';

const router = Router();

router.get('/:id', profileController.getProfile); //프로필 조회 라우트

router.put('/:id', upload.single('profileImage'), profileController.updateProfile); //프로필 업데이트 라우트

router.put('/:id/status', profileController.updateProfileStatus);//상태업데이트

export const profilerouter = router;