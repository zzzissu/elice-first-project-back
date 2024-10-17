import { scheduleModel } from '../models/schedule.model.js';

export const scheduleService = {
  // 개인 일정 조회
  getSchedulesByUser: async (userId) => {
    return await scheduleModel.getSchedulesByUser(userId);
  },
  // 팀별 일정 조회
  getSchedulesByTeam: async () => {
    return await scheduleModel.getSchedulesByTeam();
  },
  //일정 추가 (개인/팀 일정)
  addSchedule: async (scheduleData) => {
    return await scheduleModel.addSchedule(scheduleData);
  },
  //개인 일정 -> 팀별 일정
  changeToPublic: async (scheduleId) => {
    return await scheduleModel.changeToPublic(scheduleId);
  },
  //개인 일정 삭제
  deleteScheduleByUser: async (scheduleId) => {
    return await scheduleModel.deleteScheduleByUser(scheduleId);
  },
  //팀 일정 삭제
  deleteScheduleByTeam: async (scheduleId) => {
    return await scheduleModel.deleteScheduleByTeam(scheduleId);
  }
};