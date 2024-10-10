import { Router } from 'express';
import { scheduleController } from '../controller/schedule.controller.js';

const router = Router();

// 상태 변경 라우트
router.put('/status/:userId', scheduleController.changeStatus);

export const schedulerouter = router;