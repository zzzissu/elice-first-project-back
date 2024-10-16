import { stateService } from '../service/state.service.js';

// 상태 업데이트
export const updateState = async (req, res, next) => {
  try {
    const userId = req.user.id; 
    const { state } = req.body;

    if (!userId) throw new Error ('Bad Request+유저 정보를 찾을 수 없음');

    if (!state) {
      return res.status(400).json({ message: '상태 값이 필요합니다.' });
    }

    // 상태 업데이트
    await stateService.updateState(userId, state);

    res.status(200).json({ message: '상태가 성공적으로 업데이트되었습니다.' });
  } catch (e) {
    next(e);
  }
};

// 상태 메시지 저장
export const postStatusMessage = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { statusMessage } = req.body;

    if (!userId) throw new Error ('Bad Request+유저 정보를 찾을 수 없음');

    // 유저 상태가 '출장중'인지 확인
    const userState = await stateService.getStateByUserId(userId);

    if (userState !== '출장중') {
      return res.status(400).json({ message: '상태가 출장중일 때만 메시지를 저장할 수 있습니다.' });
    }

    // 상태 메시지 저장
    await stateService.storeStatusMessage(userId, statusMessage);

    res.status(201).json({ message: '상태 메시지가 성공적으로 저장되었습니다.' });
  } catch (e) {
    next(e);
  }
};

// 상태 메시지 조회
export const getStatusMessage = async (req, res, next) => {
  try {
    const userId = req.user.id;

    if (!userId) throw new Error ('Bad Request+유저 정보를 찾을 수 없음');

    // 상태 메시지 조회
    const statusMessage = await stateService.getStatusMessage(userId);

    if (!statusMessage) {
      return res.status(404).json({ message: '저장된 상태 메시지가 없습니다.' });
    }

    res.status(200).json({ statusMessage });
  } catch (e) {
    next(e);
  }
};