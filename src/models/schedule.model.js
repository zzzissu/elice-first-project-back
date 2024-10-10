import { dbConnect } from '../db/db.js';

export const scheduleModel = {
  // 상태 업데이트 모델
  updateStatus: async (userId, status) => {
    const connection = await dbConnect();
    const query = `UPDATE user SET state = ? WHERE uuid = ?`;  
    return await connection.execute(query, [status, userId]);
  }
};