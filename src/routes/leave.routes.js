import { Router } from 'express';
import { leaveController } from '../controller/leave.controller.js';

const router = Router();

router.put('/:id/useleave', leaveController.useLeave);

router.get('/:id', leaveController.getUserLeave);

export const leaverouter = router;