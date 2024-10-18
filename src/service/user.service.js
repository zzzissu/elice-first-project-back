import { dbConnect } from '../db/db.js';
import { secretPassword } from '../utils/auth.utils.js';
import { v4 as uuidv4 } from 'uuid';

export const userService = {
  findEmail: async (email) => {
    const connection = await dbConnect();
    const query = `SELECT * FROM user WHERE email = ? AND deleted_at IS NULL`;
    const [rows] = await connection.execute(query, [email]);
    return rows[0]; // 사원이 이미 있는지 확인하여 사용자 정보 반환
  },

  signUp: async (user) => {
    const connection = await dbConnect();
    const { name, email, password, phone, birth } = user;

    const hashedPassword = await secretPassword.hashPassword(password);
    const uuid = uuidv4();

    // 사용자 생성
    const query = `INSERT INTO user (id, name, email, password, phone, birth) VALUES (?, ?, ?, ?, ?, ?)`;
    const [result] = await connection.execute(query, [uuid, name, email, hashedPassword, phone, birth]);
    return result; // 새로 생성된 사용자 정보 반환
  },

  signIn: async (email, password) => {
    const connection = await dbConnect();
    // 이메일 검증
    const query = `SELECT * FROM user WHERE email = ? AND deleted_at IS NULL`;
    const [rows] = await connection.execute(query, [email]);

    if (rows.length === 0) {
      throw new Error('Bad Request+이메일 또는 비밀번호가 잘못되었습니다.');
    }

    const user = rows[0];

    // 비밀번호 검증
    const isPasswordValid = await secretPassword.verifyPassword(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Bad Request+이메일 또는 비밀번호가 잘못되었습니다.');
    }
    
    // 로그인 성공 시 호출
    return user;
  },

  getFindUser: async (userId) => {
    const connection = await dbConnect();
    const query = `SELECT name, email, phone, birth, state, status_message, annual_leave, profile_image, position, department, business_trip FROM user
                    WHERE id = ? AND deleted_at IS NULL`;
    const [rows] = await connection.execute(query, [userId]);
    
    return rows[0];
  },

  deleteUser: async (email) => {
    const connection = await dbConnect();
    const query = `SELECT * FROM user WHERE email = ? AND deleted_at IS NULL`;
    const [rows] = await connection.execute(query, [email]);

    if (rows.length === 0) {
      throw new Error('Bad Request+존재하지 않는 사용자');
    }

    const deleteQuery = `UPDATE user SET deleted_at = CURRENT_TIMESTAMP WHERE email = ?`;
    const [result] = await connection.execute(deleteQuery, [email]);

    return result;
  },

  requestRestCode: async (resetCode) => {
    const connection = await dbConnect();

    // 비밀번호 재설정 코드 및 유효기간 확인
    const query = `SELECT * FROM password_reset
                    WHERE reset_code = ? AND expires_at > NOW()`;
    const [rows] = await connection.execute(query, [resetCode]);

    if (rows.length === 0) {
      throw new Error('Bad Request+유효하지 않은 인증 코드이거나 코드가 만료되었습니다.');
    }

    return rows[0];
  },

  resetPassword: async (email, newPassword) => {
    const connection = await dbConnect();
    
    // 비밀번호 해시화
    const hashedPassword = await secretPassword.hashPassword(newPassword);

    const updateQuery = `UPDATE user SET password = ?
                          WHERE email = ? AND deleted_at IS NULL`;
    const [result] = await connection.execute(updateQuery, [hashedPassword, email]);

    const deleteQuery = `DELETE FROM password_reset WHERE email = ?`;
      await connection.execute(deleteQuery, [email]);

    return result;
  }
};