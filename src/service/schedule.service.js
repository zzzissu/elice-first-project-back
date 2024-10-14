import { scheduleModel } from '../models/schedule.model.js';

export const scheduleService = {
  // 일정 추가 (개인/팀별 구분)
  addSchedule: async (scheduleData) => {
    return await scheduleModel.addSchedule(scheduleData);
  },

  // 팀별 일정 조회
  getSchedulesByTeam: async (teamId) => {
    return await scheduleModel.getSchedulesByTeam(teamId);
  },

  // 개인 일정 조회
  getSchedulesByUser: async (userId) => {
    return await scheduleModel.getSchedulesByUser(userId);
  },
  // 전체 팀 일정 조회
  getAllTeamSchedules: async () => {
    return await scheduleModel.getAllTeamSchedules();
  },

  // 전체 유저 일정 조회
  getAllUserSchedules: async () => {
    return await scheduleModel.getAllUserSchedules();
  },
  // 개인 일정 삭제
  deleteScheduleByUser: async (userId, scheduleId) => {
    const query = 'DELETE FROM schedule WHERE id = ? AND user_id = ? AND type = "personal"';
    const [result] = await db.execute(query, [scheduleId, userId]);
    return result;
  },
  //팀별 일정 삭제
  deleteScheduleByTeam: async (teamId, scheduleId) => {
    const query = 'DELETE FROM schedule WHERE id = ? AND team_id = ? AND type = "team"';
    const [result] = await db.execute(query, [scheduleId, teamId]);
    return result;
  }
};