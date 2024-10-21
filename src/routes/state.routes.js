import { Router } from 'express';
import { updateState, postStatusMessage, getAllStatusMessages, getAllUserStates } from '../controller/state.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = Router();
// 상태 업데이트
router.put('/', authMiddleware.verifyToken, updateState);

// 상태 메시지 저장
router.post('/message', authMiddleware.verifyToken, postStatusMessage);

// 상태 메시지 조회
router.get('/all/messages', authMiddleware.verifyToken, getAllStatusMessages);

// 모든 사용자 상태 조회 
router.get('/all', authMiddleware.verifyToken, getAllUserStates);


export const stateRouter = router;