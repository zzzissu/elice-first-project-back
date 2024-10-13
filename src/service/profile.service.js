import { profileModel } from '../models/profile.model.js';

export const profileService = {
  // 사용자 프로필 조회
  getUserProfile: async (userId) => {
    const query = 'SELECT * FROM user WHERE id = ?';
    const [rows] = await db.execute(query, [userId]);
    return rows[0];
  },

  // 프로필 수정
  updateUserProfile: async (userId, { phone, profileImage }) => {
    let query = 'UPDATE user SET ';
    const queryParams = [];

    if (phone) {
      query += 'phone = ?, ';
      queryParams.push(phone);
    }

    if (profileImage) {
      query += 'profile_image = ?, ';
      queryParams.push(profileImage);
    }

    query = query.slice(0, -2); // 마지막 쉼표 제거
    query += ' WHERE id = ?';
    queryParams.push(userId);

    const [result] = await db.execute(query, queryParams);
    return result;
  },

  // 상태 업데이트
  updateUserStatus: async (userId, status) => {
    const query = 'UPDATE user SET state = ? WHERE id = ?';
    const [result] = await db.execute(query, [status, userId]);
    return result;
  }
};
