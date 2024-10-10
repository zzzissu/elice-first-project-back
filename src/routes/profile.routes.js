import { Router } from 'express';
import { profilecontroller } from '../controller/profile.controller.js';

const router = Router();

router.get('/:id', profilecontroller.getProfile); //프로필 조회 라우트
router.put('/:id', profilecontroller.updateProfile); //프로필 업데이트 라우트

export const profilerouter = router;