import { scheduleModel } from '../models/schedule.model.js';

export const scheduleService = {
  // 상태 업데이트 서비스
  updateStatus: async (userId, status) => {
    return await scheduleModel.updateStatus(userId, status);
  }
};