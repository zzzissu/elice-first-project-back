import { scheduleService } from '../service/schedule.service.js';

export const scheduleController = {
  // 일정 추가
  addSchedule: async (req, res, next) => {
    try {
      const { userId = null, teamId = null, title, content, startDate, endDate, type } = req.body;

      if (!title || !content || !startDate || !type) {
        return res.status(400).json({ message: "필수 정보가 부족합니다." });
      }

      // 일정 추가 서비스 호출
      await scheduleService.addSchedule({ userId, teamId, title, content, startDate, endDate, type });
      res.status(201).json({ message: "일정이 성공적으로 추가되었습니다." });
    } catch (e) {
      next(e);
    }
  },

  // 팀별 일정 조회
  getSchedulesByTeam: async (req, res, next) => {
    try {
      const teamId = req.params.teamId;
      const schedules = await scheduleService.getSchedulesByTeam(teamId);

      if (!schedules.length) {
        return res.status(404).json({ message: "해당 팀의 일정이 없습니다." });
      }

      res.status(200).json(schedules);
    } catch (e) {
      next(e);
    }
  },

  // 개인 일정 조회
  getSchedulesByUser: async (req, res, next) => {
    try {
      const userId = req.params.userId;
      const schedules = await scheduleService.getSchedulesByUser(userId);

      if (!schedules.length) {
        return res.status(404).json({ message: "해당 사용자의 일정이 없습니다." });
      }

      res.status(200).json(schedules);
    } catch (e) {
      next(e);
    }
  },
  // 전체 팀 일정 조회
  getAllTeamSchedules: async (req, res, next) => {
    try {
      const teamSchedules = await scheduleService.getAllTeamSchedules();
      res.status(200).json(teamSchedules);
    } catch (e) {
      next(e);
    }
  },

  // 전체 유저 일정 조회
  getAllUserSchedules: async (req, res, next) => {
    try {
      const userSchedules = await scheduleService.getAllUserSchedules();
      res.status(200).json(userSchedules);
    } catch (e) {
      next(e);
    }
  },
  //개인 일정 삭제
  deleteScheduleByUser: async (req, res, next) => {
    try {
      const userId = req.params.userId; 
      const scheduleId = req.params.scheduleId; 
  
      const result = await scheduleService.deleteScheduleByUser(userId, scheduleId);
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "해당 사용자의 일정이 없거나 삭제할 수 없습니다." });
      }
  
      res.status(200).json({ message: "개인일정이 성공적으로 삭제되었습니다." });
    } catch (e) {
      next(e);
    }
  },
  // 팀별 일정 삭제
  deleteScheduleByTeam: async (req, res, next) => {
    try {
      const teamId = req.params.teamId; 
      const scheduleId = req.params.scheduleId; 
  
      const result = await scheduleService.deleteScheduleByTeam(teamId, scheduleId);
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "해당 팀의 일정이 없거나 삭제할 수 없습니다." });
      }
  
      res.status(200).json({ message: "팀별일정이 성공적으로 삭제되었습니다." });
    } catch (e) {
      next(e);
    }
  }
};