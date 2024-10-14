import { Router } from "express";
import { userController } from "../controller/user.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

// 회원 가입
router.post('/api/signup', userController.signUp);

// 로그인
router.post('/api/signin', userController.signIn);

// 회원 정보 출력
router.get('/api', authMiddleware.verifyToken, userController.getFindUser);

// 비밀번호 재설정 코드 요청
router.post('/api/password/request', userController.requestResetPassword);

// 비밀번호 재설정
router.post('/api/password/reset', userController.resetPassword);

// 회원 탈퇴
router.delete('/api/delete', authMiddleware.verifyToken, userController.deleteUser);

export const userRouter = router;