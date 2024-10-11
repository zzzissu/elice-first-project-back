import { dbConnect } from '../db/db.js';

export const scheduleModel = {
  // 개인 일정 추가
  addPersonalSchedule: async (userId, { title, content, startDate, endDate }) => {
    const connection = await dbConnect();
    const query = `INSERT INTO schedule (user_id, title, content, start_date, end_date, type) VALUES (?, ?, ?, ?, ?, 'personal')`;
    const [result] = await connection.execute(query, [userId, title, content, startDate, endDate]);
    return result;
  },

  // 업무 일정 추가
  addWorkSchedule: async (userId, { title, content, startDate, endDate }) => {
    const connection = await dbConnect();
    const query = `INSERT INTO schedule (user_id, title, content, start_date, end_date, type) VALUES (?, ?, ?, ?, ?, 'work')`;
    const [result] = await connection.execute(query, [userId, title, content, startDate, endDate]);
    return result;
  }
};