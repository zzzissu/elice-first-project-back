import { Router } from 'express';
import { leaveController } from '../controller/leave.controller.js';

const router = Router();

router.put('/:id/useleave', leaveController.useLeave);  //연차 사용 라우터

router.get('/:id', leaveController.getUserLeave);  //연차 정보 조회 라우터

export const leaverouter = router;