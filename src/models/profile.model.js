import { dbConnect } from '../db/db.js';

export const profileModel = {
  // 프로필 조회 모델
  getUserProfile: async (userId) => {
    const connection = await dbConnect();
    const query = `SELECT * FROM user WHERE uuid = ?`;
    const [rows] = await connection.execute(query, [userId]);
    return rows[0];
  },

  updateUserPhone: async (userId, updatedData) => {
    // 프로필 업데이트 모델
    const connection = await dbConnect();
    const query = `UPDATE user SET phone = ? WHERE uuid = ?`;  // 전화번호만 업데이트
    const [result] = await connection.execute(query, [phone, userId]);
    return result;
  }
};