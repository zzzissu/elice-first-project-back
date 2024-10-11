import { Router } from 'express';
import { scheduleController } from '../controller/schedule.controller.js';

const router = Router();

// 개인 일정 추가
router.post('/:id/personal', scheduleController.addPersonalSchedule);

// 업무 일정 추가
router.post('/:id/work', scheduleController.addWorkSchedule);

export const schedulerouter = router;