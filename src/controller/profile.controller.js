import { profileService } from '../service/profile.service.js';
import path from 'path';



export const profileController = {
  // 프로필 조회
  getProfile: async (req, res, next) => {
    try {
      const userId = req.params.id;
      const profile = await profileService.getUserProfile(userId);

      if (!profile) {
        return res.status(404).json({ message: "프로필을 찾을 수 없습니다." });
      }

      res.status(200).json(profile);
    } catch (e) {
      next(e);
    }
  },

   updateProfile: async (req, res, next) => {
    try {
      const userId = req.params.id;  // URL에서 사용자 UUID 가져오기
      const { phone } = req.body;    // 전화번호 받아오기
      
      let profileImage = null;
      if(req.file){
        profileImage = path.join('uploads', req.file.filename); //파일경로 설정
      }

      if (!phone && !req.file) {
        return res.status(400).json({ message: "전화번호 또는 이미지는 필수입니다." });
      }

      // 서비스 호출로 전화번호, 프로필 이미지 업데이트
      const result = await profileService.updateUserProfile(userId, { phone, profileImage });

      res.status(200).json({ message: '프로필이 성공적으로 수정되었습니다.' });
    } catch (e) {
      next(e);  
    }
  },
  
  updateProfileStatus: async (req, res, next) => {
    try {
      const userId = req.params.id;
      const { status } = req.body;

      if (!status) {
        return res.status(400).json({ message: "상태는 필수입니다." });
      }

      // 상태 업데이트 서비스 호출
      const result = await profileService.updateUserStatus(userId, status);

      // 알림 정보 전송
      res.status(200).json({
        message: "사용자 상태가 성공적으로 업데이트되었습니다.",
        notification: {
          title: "상태 변경 알림",
          content: `사용자의 상태가 ${status}로 변경되었습니다.`,
          type: "info"
        }
      });
    } catch (e) {
      next(e);
    }
  }
};