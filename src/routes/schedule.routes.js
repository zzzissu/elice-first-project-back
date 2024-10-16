import { Router } from 'express';
import { scheduleController } from '../controller/schedule.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = Router();

// 일정 추가 (개인 또는 팀별 일정)
router.post('/',authMiddleware.verifyToken,scheduleController.addSchedule);

// 팀별 일정 조회
router.get('/team',authMiddleware.verifyToken, scheduleController.getSchedulesByTeam);

// 개인 일정 조회
router.get('/user',authMiddleware.verifyToken, scheduleController.getSchedulesByUser);

// 개인 일정 삭제 (make_public = false)
router.delete('/user/:Id',authMiddleware.verifyToken, scheduleController.deleteScheduleByUser);

// 팀별 일정 삭제 (make_public = true)
router.delete('/team/:Id', authMiddleware.verifyToken,scheduleController.deleteScheduleByTeam);

export const schedulerouter = router;