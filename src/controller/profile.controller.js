import { profileService } from '../service/profile.service.js';

export const profilecontroller = {
  // 프로필 조회
  getProfile: async (req, res, next) => {
    try {
      const userId = req.params.id;
      const profile = await profileService.getUserProfile(userId);
      res.status(200).json(profile);
    } catch (e) {
      next(e);
    }
  },

  updateProfile: async (req, res, next) => {
    // 프로필 업데이트
    try {
      const userId = req.params.id;
      const updatedData = req.body;
      const result = await profileService.updateUserProfile(userId, updatedData);
      res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }
};