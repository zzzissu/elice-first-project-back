import { dbConnect } from '../db/db.js';

export const emailService = {
  // 이메일로 유저 찾기
  findByEmail: async (target_email) => {
    const connection = await dbConnect();
    const query = `SELECT * FROM user
                    WHERE email = ? AND deleted_at IS NULL`;
    const [rows] = await connection.execute(query, [target_email]);
    
    return rows[0];
  },

  // 받은 이메일 조회
  getReceivedEmail: async (userEmail) => {
    const connection = await dbConnect();
    const query = `SELECT title, content, user_email, target_email, created_at FROM email
                    WHERE target_email = ? AND deleted_at IS NULL`;
    const [rows] = await connection.execute(query, [userEmail]);
    
    return rows;
  },

  // 보낸 이메일 조회
  getSentEmail: async (userEmail) => {
    const connection = await dbConnect();
    const query = `SELECT title, content, user_email, target_email, created_at FROM email
                    WHERE user_email = ? AND deleted_at IS NULL`;
    const [rows] = await connection.execute(query, [userEmail]);
    
    return rows;
  },

  // 이메일 작성
  postEmail: async (title, content, target_email, userEmail) => {
    const connection = await dbConnect();

    const query = `INSERT INTO email (title, content, user_email, target_email)
                   VALUES (?, ?, ?, ?)`;
    const [result] = await connection.execute(query, [title, content, userEmail, target_email]);
    
    return result;
  },
};