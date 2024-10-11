import { profileModel } from '../models/profile.model.js';

export const profileService = {
  // 사용자 프로필 조회 서비스
  getUserProfile: async (userId) => {
    return await profileModel.getUserProfile(userId);  // uuid를 사용해 모델에서 프로필 조회
  },

  // 사용자 프로필 업데이트 서비스 전화번호만
  updateUserPhone: async (userId, phone) => {
    return await profileModel.updateUserPhone(userId, phone);
  }
};
