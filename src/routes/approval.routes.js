import { Router } from "express";
import { approvalController } from "../controller/approval.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

// API
router.post('/annual', authMiddleware.verifyToken, approvalController.postAnnual); // 연차 신청서
router.post('/outside', authMiddleware.verifyToken, approvalController.postOutside); // 외근 신청서
router.post('/businessreport', authMiddleware.verifyToken, approvalController.postBusinessReport); // 업무 보고서

router.get('/count', authMiddleware.verifyToken, approvalController.getApproval); // 결재 현황 조회
router.get('/wait',approvalController.getAllWaitApproval); // 결재 대기중
router.get('/confirm',approvalController.getAllConfirmedApproval); // 결재 완료

export const approvalRouter = router;