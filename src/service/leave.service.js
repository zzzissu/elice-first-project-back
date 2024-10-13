import { leaveModel } from '../models/leave.model.js';

export const leaveService = {
    //남은 연차 정보 가져옴
    getUserLeave: async (userId) => {
        return await leaveModel.getUserLeave(userId);
    },
    //남은 연차 업데이트
    updateUserLeave: async (userId, remainingLeave) => {
        return await leaveModel.updateUserLeave(userId, remainingLeave);
    }
};