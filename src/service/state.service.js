import { stateModel } from '../models/state.model.js';

// 상태 업데이트
export const stateService = {
  updateState: async (userId, state) => {
    return await stateModel.updateState(userId, state);
  },

  // 유저 상태 조회
  getStateByUserId: async (userId) => {
    return await stateModel.getState(userId);
  },

  // 상태 메시지 저장
  storeStatusMessage: async (userId, statusMessage) => {
    return await stateModel.storeStatusMessage(userId, statusMessage);
  },

  // 상태 메시지 조회
  getStatusMessage: async (userId) => {
    return await stateModel.getStatusMessage(userId);
  }
};