import { dbConnect } from '../db/db.js';

export const stateModel = {
  // 상태 업데이트
  updateState: async (userId, state) => {
    const db = await dbConnect();
    const query = 'UPDATE user SET state = ? WHERE id = ?';
    await db.execute(query, [state, userId]);
  },

  // 유저 상태 조회
  getState: async (userId) => {
    const db = await dbConnect();
    const query = 'SELECT state FROM user WHERE id = ?';
    const [rows] = await db.execute(query, [userId]);
    return rows[0]?.state;
  },

  // 상태 메시지 저장
  storeStatusMessage: async (userId, statusMessage) => {
    const db = await dbConnect();
    const query = 'UPDATE user SET status_message = ? WHERE id = ?';
    await db.execute(query, [statusMessage, userId]);
  },

  // 상태 메시지 조회
  getStatusMessage: async (userId) => {
    const db = await dbConnect();
    const query = 'SELECT status_message FROM user WHERE id = ?';
    const [rows] = await db.execute(query, [userId]);
    return rows[0]?.status_message;
  }
};