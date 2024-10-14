import { dbConnect } from '../db/db.js';

export const scheduleModel = {
  // 일정 추가 (개인 또는 팀별 일정)
  addSchedule: async ({ userId = null, teamId = null, title, content, startDate, endDate, type }) => {
    const connection = await dbConnect();
    const query = `INSERT INTO schedule (user_id, team_id, title, content, start_date, end_date, type) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const [result] = await connection.execute(query, [userId, teamId, title, content, startDate, endDate, type]);
    return result;
  },
  // 팀별 일정 조회
  getSchedulesByTeam: async (teamId) => {
    const connection = await dbConnect();
    const query = `SELECT * FROM schedule WHERE team_id = ? AND type = 'work'`;
    const [rows] = await connection.execute(query, [teamId]);
    return rows;
  },

  // 개인 일정 조회
  getSchedulesByUser: async (userId) => {
    const connection = await dbConnect();
    const query = `SELECT * FROM schedule WHERE user_id = ? AND type = 'personal'`;
    const [rows] = await connection.execute(query, [userId]);
    return rows;
  },
   // 전체 팀 일정 조회
   getAllTeamSchedules: async () => {
    const connection = await dbConnect();
    const query = `SELECT * FROM schedule WHERE type = 'work'`;
    const [rows] = await connection.execute(query);
    return rows;
  },

  // 전체 개인 일정 조회
  getAllUserSchedules: async () => {
    const connection = await dbConnect();
    const query = `SELECT * FROM schedule WHERE type = 'personal'`;
    const [rows] = await connection.execute(query);
    return rows;
  }
};