import { dbConnect } from '../db/db.js';

export const approvalService = {
  // 연차 신청서
  postAnnual: async (annual, user_name, user_id) => {
    const connection = await dbConnect();
    const { start_date, finish_date, content } = annual;
    const query = `INSERT INTO approval (start_date, finish_date, type, content, user_name, user_id)
                   VALUES (?, ?, 'annual', ?, ?, ?)`;
    const [result] = await connection.execute(query, [start_date, finish_date, content, user_name, user_id]);
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