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
    const query = `SELECT e.id, e.title, e.content, e.user_email, e.target_email, e.created_at, m.is_checked
                    FROM email e
                    JOIN email_map m ON e.id = m.email_id
                    WHERE m.user_email = ? AND e.target_email = ? AND m.is_deleted = 0`;
    const [rows] = await connection.execute(query, [userEmail, userEmail]);
    
    
    return rows;
  },

  // 보낸 이메일 조회
  getSentEmail: async (userEmail) => {
    const connection = await dbConnect();
    const query = `SELECT e.id, e.title, e.content, e.user_email, e.target_email, e.created_at, m.is_checked
                    FROM email e
                    JOIN email_map m ON e.id = m.email_id
                    WHERE e.user_email = ? AND m.user_email = ? AND m.is_deleted = 0`;
    const [rows] = await connection.execute(query, [userEmail, userEmail]);
    
    
    return rows;
  },

  // 새로운 이메일 확인 (알림)
  checkNewEmail: async (userEmail) => {
    const connection = await dbConnect();
    const query = `SELECT COUNT(*) as newEmailsCount 
                    FROM email_map m 
                    JOIN email e ON m.email_id = e.id 
                    WHERE m.user_email = ? AND e.user_email !=?
                    AND m.is_checked = 0 AND m.is_deleted = 0`;
    const [rows] = await connection.execute(query, [userEmail, userEmail]);
    
    
    return rows[0].newEmailsCount; // 읽지 않은 이메일 개수 반환
  },

  // 이메일 읽음 처리
  checkedEmail: async (email_id, userEmail) => {
    const connection = await dbConnect();
    const query = `UPDATE email_map SET is_checked = 1 WHERE email_id = ? AND user_email = ?`;
    const [result] = await connection.execute(query, [email_id, userEmail]);
    
    
    return result;
  },

  // 이메일 작성
  postEmail: async (title, content, target_email, userEmail) => {
    const connection = await dbConnect();

    const query = `INSERT INTO email (title, content, user_email, target_email)
                   VALUES (?, ?, ?, ?)`;
    const [result] = await connection.execute(query, [title, content, userEmail, target_email]);
    
    const emailId = result.insertId;

    // email_map도 추가
    const mapQuery = `INSERT INTO email_map (email_id, user_email, is_checked, is_deleted) VALUES (?, ?, 0, 0)`;

    // 발신자 추가 (userEmail)
    await connection.execute(mapQuery, [emailId, userEmail]);

    // 수신자 추가 (targetEmail)
    const targetUser = await emailService.findByEmail(target_email);
    await connection.execute(mapQuery, [emailId, targetUser.email]);

    
    return result;
  },

  // 이메일 삭제
  deleteEmail: async (email_id, userEmail) => {
    const connection = await dbConnect();

    const query = `UPDATE email_map SET is_deleted = 1
                    WHERE email_id = ? AND user_email = ?`;
    const [result] = await connection.execute(query, [email_id, userEmail]);
    
    
    return result;
  },
};