import { dbConnect } from '../db/db.js';

export const profileModel = {
  // 프로필 조회 모델
  getUserProfile: async (userId) => {
    const connection = await dbConnect();
    const query = `SELECT * FROM user WHERE uuid = ?`;
    const [rows] = await connection.execute(query, [userId]);
    return rows[0];
  },
  // 프로필 업데이트 모델
  updateUserProfile: async ({ userId, profileImage }) => {
    const connection = await dbConnect();
    let query = `UPDATE user SET `;
    const queryParams = [];

    if (phone) {
      query += `phone = ? `;
      queryParams.push(phone);
    }

    if (profileImage) {
      if (phone) query += `, `;
      query += `profile_image = ? `;
      queryParams.push(profileImage);
    }

    query += `WHERE uuid = ?`;
    queryParams.push(userId);

    const [result] = await connection.execute(query, queryParams);
    return result;
  },
  //상태창 업데이트 모델
  updateUserStatus: async (userId, status) => {
    const connection = await dbConnect();
    const query = `UPDATE user SET state = ? WHERE uuid = ?`;
    const [result] = await connection.execute(query, [status, userId]);
    return result;
  },
};