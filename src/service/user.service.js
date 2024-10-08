import { db_connect } from '../db/db.js';

export const user_service = {
  find_email: async (email) => {
    const connection = await db_connect();
    const query = `SELECT * FROM user WHERE email = ?`;
    const [rows] = await connection.execute(query, [email]);
    return rows[0]; // 이메일이 있는지 확인하여 사용자 정보 반환
  },

  sign_up: async (user) => {
    const connection = await db_connect();
    const { name, email, password, phone, birth, employeenum } = user;

    // 사용자 생성
    const query = `INSERT INTO user (name, email, password, phone, birth, employeenum) VALUES (?, ?, ?, ?, ?, ?)`;
    const [result] = await connection.execute(query, [name, email, password, phone, birth, employeenum]);
    return result; // 새로 생성된 사용자 정보 반환
  },

  sign_in: async (email, password) => {
    const connection = await db_connect();
    const query = `SELECT * FROM user WHERE email = ? AND password = ?`;
    const [rows] = await connection.execute(query, [email, password]);

    if (rows.length === 0) {
      throw new Error('Bad Request+이메일 또는 비밀번호가 잘못되었습니다.');
    }

    return rows[0]; // 로그인 성공 시 사용자 정보 반환
  }
};