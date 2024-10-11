import { scheduleService } from '../service/schedule.service.js';

export const scheduleController = {
  // 개인 일정 추가
  addPersonalSchedule: async (req, res, next) => {
    try {
      const userId = req.params.id;
      const { title, content, startDate, endDate } = req.body;

      if (!title || !content || !startDate) {
        return res.status(400).json({ message: "필수 정보가 부족합니다." });
      }

      // 개인 일정 추가 서비스 호출
      const result = await scheduleService.addPersonalSchedule(userId, { title, content, startDate, endDate });

      res.status(201).json({ message: "개인 일정이 성공적으로 추가되었습니다.", result });
    } catch (e) {
      next(e);
    }
  },

  // 업무 일정 추가
  addWorkSchedule: async (req, res, next) => {
    try {
      const userId = req.params.id;
      const { title, content, startDate, endDate } = req.body;

      if (!title || !content || !startDate) {
        return res.status(400).json({ message: "필수 정보가 부족합니다." });
      }

      // 업무 일정 추가 서비스 호출
      const result = await scheduleService.addWorkSchedule(userId, { title, content, startDate, endDate });

      res.status(201).json({ message: "업무 일정이 성공적으로 추가되었습니다.", result });
    } catch (e) {
      next(e);
    }
  }
};