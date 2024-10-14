import { Router } from 'express';
import { scheduleController } from '../controller/schedule.controller.js';

const router = Router();

// 일정 추가 (개인 또는 팀별 일정)
router.post('/', scheduleController.addSchedule);

// 팀별 일정 조회
router.get('/team/:teamId', scheduleController.getSchedulesByTeam);

// 개인 일정 조회
router.get('/user/:userId', scheduleController.getSchedulesByUser);

// 전체 팀 일정 조회
router.get('/teamSchedule', scheduleController.getAllTeamSchedules);

// 전체 개인 일정 조회
router.get('/userSchedule', scheduleController.getAllUserSchedules);

// 개인 일정 삭제
router.delete('/user/:userId/schedule/:scheduleId', scheduleController.deleteScheduleByUser);

// 팀별 일정 삭제
router.delete('/team/:teamId/schedule/:scheduleId', scheduleController.deleteScheduleByTeam);

export const schedulerouter = router;