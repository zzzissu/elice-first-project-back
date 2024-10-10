import { profileModel } from '../models/profile.model.js';

export const profileService = {
  // 사용자 프로필 조회 서비스
  getUserProfile: async (userId) => {
    return await profileModel.getUserProfile(userId);  // uuid를 사용해 모델에서 프로필 조회
  },

  // 사용자 프로필 업데이트 서비스
  updateUserProfile: async (userId, updatedData) => {
    // undefined 값을 null로 처리하여 모델로 전달
    const sanitizedData = {
      name: updatedData.name || null,
      email: updatedData.email || null,
      phone: updatedData.phone || null,
    };

    return await profileModel.updateUserProfile(userId, sanitizedData);  // uuid를 사용해 모델에서 프로필 업데이트
  }
};
