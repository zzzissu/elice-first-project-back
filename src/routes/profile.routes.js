import { Router } from 'express';
import { profileController } from '../controller/profile.controller.js';

const router = Router();

router.get('/:id', profileController.getProfile); //프로필 조회 라우트
router.put('/:id', profileController.updateProfile); //프로필 업데이트 라우트

export const profilerouter = router;