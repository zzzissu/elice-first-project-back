import { profileModel } from '../models/profile.model.js';

export const profileService = {
    // 사용자 프로필 조회
    getUserProfile: async (userId) => {
        return await profileModel.getUserProfile(userId);
    },

    // 전화번호 업데이트
    updatePhoneNumber: async (userId, phone) => {
        return await profileModel.updatePhoneNumber(userId, phone);
    },

    // 프로필 사진 업데이트
    updateProfileImage: async (userId, profileImage) => {
        return await profileModel.updateProfileImage(userId, profileImage);
    }
};