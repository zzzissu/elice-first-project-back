import { profileModel } from '../models/profile.model.js';

export const profileService = {
  // 사용자 프로필 조회
  getUserProfile: async (userId) => {
    return await profileModel.getUserProfile(userId);
  },

  // 프로필 수정
  updateUserProfile: async (userId, { phone, profileImage }) => {
    return await profileModel.updateUserProfile(userId, { phone, profileImage });
  },
};