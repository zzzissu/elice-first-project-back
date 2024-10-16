import { scheduleService } from '../service/schedule.service.js';


export const scheduleController = {
  // 일정 추가 (개인/팀 일정)
  addSchedule: async (req, res, next) => {
    try {
      const { title, content, makePublic, createdAt, finishedAt } = req.body;
      const userId = req.user.id;

      if (!userId) throw new Error ('Bad Request+유저 정보를 찾을 수 없음');

      if (!title || !content || !createdAt) {
        return res.status(400).json({ message: "필수 정보가 부족합니다." });
      }

      await scheduleService.addSchedule({ userId, title, content, makePublic, createdAt, finishedAt });
      res.status(201).json({ message: "일정이 성공적으로 추가되었습니다." });
    } catch (e) {
      next(e);
    }
  },

  // 개인 일정 조회 (make_public = false)
  getSchedulesByUser: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const schedules = await scheduleService.getSchedulesByUser(userId);

      if (!userId) throw new Error ('Bad Request+유저 정보를 찾을 수 없음');

      if (!schedules.length) {
        return res.status(404).json({ message: "해당 사용자의 일정이 없습니다." });
      }

      res.status(200).json(schedules);
    } catch (e) {
      next(e);
    }
  },

  // 팀별 일정 조회 (make_public = true)
  getSchedulesByTeam: async (req, res, next) => {
    try {
      const schedules = await scheduleService.getSchedulesByTeam();

      if (!schedules.length) {
        return res.status(404).json({ message: "해당 팀의 일정이 없습니다." });
      }

      res.status(200).json(schedules);
    } catch (e) {
      next(e);
    }
  },

  // 개인 일정 삭제 (make_public = false)
  deleteScheduleByUser: async (req, res, next) => {
    try {
      const scheduleId = req.params;
      await scheduleService.deleteScheduleByUser(scheduleId);
      res.status(200).json({ message: "일정이 성공적으로 삭제되었습니다." });
    } catch (e) {
      next(e);
    }
  },

  // 팀별 일정 삭제 (make_public = true)
  deleteScheduleByTeam: async (req, res, next) => {
    try {
      const scheduleId = req.params;
      await scheduleService.deleteScheduleByTeam(scheduleId);
      res.status(200).json({ message: "팀별 일정이 성공적으로 삭제되었습니다." });
    } catch (e) {
      next(e);
    }
  }
};