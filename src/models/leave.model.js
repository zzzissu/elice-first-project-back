import { dbConnect } from '../db/db.js';

export const leaveModel = {
  // 사용자 연차 조회
  getUserLeave: async (userId) => {
    const connection = await dbConnect();
    const query = `SELECT annual_leave FROM user WHERE uuid = ?`;
    const [rows] = await connection.execute(query, [userId]);

    if (rows.length === 0) {
      return null;
    }

    return rows[0].annual_leave;
  },

  // 연차 사용 후 업데이트
  updateUserLeave: async (userId, remainingLeave) => {
    const connection = await dbConnect();
    const query = `UPDATE user SET annual_leave = ? WHERE uuid = ?`;
    const [result] = await connection.execute(query, [remainingLeave, userId]);
    return result;
  }
};