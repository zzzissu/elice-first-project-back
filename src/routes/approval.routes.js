import { Router } from "express";
import { approvalController } from "../controller/approval.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

// API
router.post('/api/annual', authMiddleware.verifyToken, approvalController.postAnnual); // 연차 신청서
router.post('/api/outside', authMiddleware.verifyToken, approvalController.postOutside); // 외근 신청서
router.post('/api/businessreport', authMiddleware.verifyToken, approvalController.postBusinessReport); // 업무 보고서

router.get('/api/wait',approvalController.getAllWaitApproval); // 결재 대기중
router.get('/api/confirm',approvalController.getAllConfirmedApproval); // 결재 완료

export const approvalRouter = router;