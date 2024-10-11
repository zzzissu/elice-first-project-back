import { scheduleModel } from '../models/schedule.model.js';

export const scheduleService = {
  // 개인 일정 추가
  addPersonalSchedule: async (userId, scheduleData) => {
    return await scheduleModel.addPersonalSchedule(userId, scheduleData);
  },

  // 업무 일정 추가
  addWorkSchedule: async (userId, scheduleData) => {
    return await scheduleModel.addWorkSchedule(userId, scheduleData);
  }
};