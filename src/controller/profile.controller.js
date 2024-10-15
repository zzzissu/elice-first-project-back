import { profileService } from '../service/profile.service.js';
import path from 'path';

// 프로필 조회
export const getProfile = async (req, res, next) => {
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
};

// 전화번호만 업데이트
export const updatePhoneNumber = async (req, res, next) => {
    try {
        const userId = req.user.id;  
        const { phone } = req.body;  

        if (!phone) {
            return res.status(400).json({ message: "전화번호가 필요합니다." });
        }

        await profileService.updatePhoneNumber(userId, phone);
        res.status(200).json({ message: "전화번호가 성공적으로 업데이트되었습니다." });
    } catch (e) {
        next(e);
    }
};

// 프로필 사진 업데이트
export const updateProfileImage = async (req, res, next) => {
    try {
        const userId = req.user.id;  

        if (!req.file) {
            return res.status(400).json({ message: "프로필 사진이 필요합니다." });
        }

        const profileImage = path.join('uploads', req.file.filename);  // 업로드된 파일 경로 설정

        await profileService.updateProfileImage(userId, profileImage);
        res.status(200).json({ message: "프로필 사진이 성공적으로 업데이트되었습니다." });
    } catch (e) {
        next(e);
    }
};