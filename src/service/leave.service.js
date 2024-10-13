import { leaveModel } from '../models/leave.model.js';

export const leaveService = {
    
    getUserLeave: async (userId) => {
        return await leaveModel.getUserLeave(userId);
    },

    updateUserLeave: async (userId, remainingLeave) => {
        return await leaveModel.updateUserLeave(userId, remainingLeave);
    }
};