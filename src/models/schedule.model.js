import { dbConnect } from '../db/db.js';

export const scheduleModel = {
  // 일정 추가
  addSchedule: async ({ userId, title, content, makePublic, createdAt, finishedAt }) => {
    const db = await dbConnect(); 
    const query = `
      INSERT INTO schedule (user_id, title, content, make_public, created_at, finished_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    await db.execute(query, [userId, title, content, makePublic, createdAt, finishedAt]);
  },

  // 개인 일정 조회 (make_public = false)
  getSchedulesByUser: async (userId) => {
    const db = await dbConnect();
    const query = `
      SELECT * FROM schedule
      WHERE user_id = ? AND deleted_at IS NULL AND make_public = false
    `;
    const [rows] = await db.execute(query, [userId]);
    return rows;
  },

  // 팀별 일정 조회 (make_public = true)
  getSchedulesByTeam: async () => {
    const db = await dbConnect();
    const query = `
      SELECT * FROM schedule
      WHERE make_public = true AND deleted_at IS NULL
    `;
    const [rows] = await db.execute(query);
    return rows;
  },

  // 개인 일정 삭제 (make_public = false)
  deleteScheduleByUser: async (scheduleId) => {
    const db = await dbConnect();
    const query = `
      UPDATE schedule
      SET deleted_at = NOW()
      WHERE id = ? AND make_public = false
    `;
    const [result] = await db.execute(query, [scheduleId]);

    if (result.affectedRows === 0) {
        throw new Error('삭제할 일정이 없습니다.');
    }
  },

  // 팀별 일정 삭제 (make_public = true)
  deleteScheduleByTeam: async (scheduleId) => {
    const db = await dbConnect();
    const query = `
      UPDATE schedule
      SET deleted_at = NOW()
      WHERE id = ? AND make_public = true
    `;
    await db.execute(query, [scheduleId]);
  }
};