import { profileService } from '../service/profile.service.js';
import path from 'path';

export const profileController = {
  // 프로필 조회
  getProfile: async (req, res, next) => {
    try {
      const userId = req.user.id; 
      const profile = await profileService.getUserProfile(userId);

      if (!profile) {
        return res.status(404).json({ message: "프로필을 찾을 수 없습니다." });
      }

      res.status(200).json(profile);
    } catch (e) {
      next(e);
    }
  },

  // 프로필 수정
  updateProfile: async (req, res, next) => {
    try {
      const userId = req.user.id;  
      const { phone } = req.body;
      
      let profileImage = null;
      if (req.file) {
        profileImage = path.join('uploads', req.file.filename);
      }

      if (!phone && !req.file) {
        return res.status(400).json({ message: "전화번호 또는 이미지는 필수입니다." });
      }

      await profileService.updateUserProfile(userId, { phone, profileImage });
      res.status(200).json({ message: '프로필이 성공적으로 수정되었습니다.' });
    } catch (e) {
      next(e);
    }
  }

};