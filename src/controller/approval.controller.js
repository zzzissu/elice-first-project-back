import { approvalService } from "../service/approval.service.js";

export const approvalController = {
  // 결재 현황 조회
  getApproval: async (req, res, next) => {
    try {
      const userId = req.user.id;
      if (!userId) throw new Error ('Unauthorized+유저 정보를 찾을 수 없음');

      const result = await approvalService.getApproval(userId);
      res.status(200).json(result);
    } catch(e) {
      next(e);
    }
  },
  
  // 연차 신청서
  postAnnual: async (req, res, next) => {
    try {
      const { start_date, finish_date, content } = req.body;
      const user_name = req.user.name;
      const user_id = req.user.id;
      const annual_leave = req.user.annual_leave;

      if (!user_id) throw new Error ('Unauthorized+유저 정보를 찾을 수 없음');

      // 날짜 차이를 구하기 위한 계산
      const startDate = new Date(start_date);
      const finishDate = new Date(finish_date);
      const diffInTime = finishDate.getTime() - startDate.getTime();
      const daysDiff = diffInTime / (1000 * 3600 * 24); // 일 수 계산

      if (annual_leave < daysDiff) {
        throw new Error('Bad Request+충분하지않은 연차');
      }

      const result = await approvalService
      .postAnnual({ start_date, finish_date, content }, user_name, user_id, daysDiff);
      res.status(201).json(result);
    } catch(e) {
      next(e);
    }
  },

  // 외근 신청서
  postOutside: async (req, res, next) => {
    try {
      const { start_date, finish_date, content } = req.body;
      const user_name = req.user.name;
      const user_id = req.user.id;

      if (!user_id) throw new Error ('Unauthorized+유저 정보를 찾을 수 없음');

      const result = await approvalService
      .postOutside({ start_date, finish_date, content }, user_name, user_id);
      res.status(201).json(result);
    } catch(e) {
      next(e);
    }
  },

  // 업무 보고서
  postBusinessReport: async (req, res, next) => {
    try {
      const { title, start_date, finish_date, content, request, significant } = req.body;
      const user_name = req.user.name;
      const user_id = req.user.id;

      if (!user_id) throw new Error ('Unauthorized+유저 정보를 찾을 수 없음');

      const result = await approvalService
      .postBusinessReport({ title, start_date, finish_date, content, request, significant }, user_name, user_id);
      res.status(201).json(result);
    } catch(e) {
      next(e);
    }
  },

  // 결재 대기중 내역 호출 컨트롤
  getAllWaitApproval: async (req,res,next) => {
    try {
      const result = await approvalService.getAllWaitApproval();
      res.status(200).json(result);
    } catch(e) {
      next(e);
    }
  },

  // 결재 완료 내역 호출 컨트롤
  getAllConfirmedApproval: async (req,res,next) => {
    try {
      const result = await approvalService.getAllConfirmedApproval();
      res.status(200).json(result);
    } catch(e) {
      next(e);
    }
  },
};