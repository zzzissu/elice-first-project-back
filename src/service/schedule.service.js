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
  }
};