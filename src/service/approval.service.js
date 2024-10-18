import { dbConnect } from '../db/db.js';

export const approvalService = {
  // 결재 현황 조회
  getApproval: async (userName) => {
    const connection = await dbConnect();
    const query = `SELECT
                   SUM(CASE WHEN status = '결재대기중' THEN 1 ELSE 0 END) AS pending_count,
                   SUM(CASE WHEN status = '결재완료' THEN 1 ELSE 0 END) AS approved_count,
                   SUM(CASE WHEN status = '반려됨' THEN 1 ELSE 0 END) AS rejected_count
                   FROM approval
                   WHERE user_name = ?`;
    const [rows] = await connection.execute(query, [userName]);
    return rows[0];
  },

  // 연차 신청서
  postAnnual: async (annual, user_name, user_id) => {
    const connection = await dbConnect();
    const { start_date, finish_date, content } = annual;
    const query = `INSERT INTO approval (start_date, finish_date, type, content, user_name, user_id)
                   VALUES (?, ?, 'annual', ?, ?, ?)`;
    const [result] = await connection.execute(query, [start_date, finish_date, content, user_name, user_id]);
    return result;
  },

  // 외근 신청서
  postOutside: async (outside, user_name, user_id) => {
    const connection = await dbConnect();
    const { start_date, finish_date, content } = outside;
    const query = `INSERT INTO approval (start_date, finish_date, type, content, user_name, user_id)
                   VALUES (?, ?, 'outside', ?, ?, ?)`;
    const [result] = await connection.execute(query, [start_date, finish_date, content, user_name, user_id]);
    return result;
  },
  
  // 업무 보고서
  postBusinessReport: async (business, user_name, user_id) => {
    const connection = await dbConnect();
    const { title, start_date, finish_date, content, request, significant } = business;
    const query = `INSERT INTO approval (title, start_date, finish_date, type, content, user_name, user_id, request, significant)
                   VALUES (?, ?, ?, 'business', ?, ?, ?, ?, ?)`;
    const [result] = await connection.execute(query, [title, start_date, finish_date, content, user_name, user_id, request, significant]);
    return result;
  },

  // 결재 대기중 내역 호출 서비스
  getAllWaitApproval: async () => {
    const connection = await dbConnect();
    const query = `SELECT content, user_name, start_date, finish_date
                   FROM approval
                   WHERE status = '결재대기중'
                   ORDER BY created_at DESC`;
    const [rows] = await connection.execute(query);

    return rows;
  },

  // 결재 완료 내역 호출 서비스
  getAllConfirmedApproval: async () => {
    const connection = await dbConnect();
    const query = `SELECT content, user_name, start_date, finish_date
                   FROM approval
                   WHERE status = '결재완료'
                   ORDER BY created_at DESC`;
    const [rows] = await connection.execute(query);

    return rows;
  }
};