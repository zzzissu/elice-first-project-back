import express from 'express';
import { notificationController } from '../controller/notification.controller.js';

const router = express.Router();

// 알림 전송 API (사용자의 상태에 따라 알림 전송)
router.post('/:id/sendNotification', notificationController.sendNotification);

export const notificationRouter = router;