import { dbConnect } from '../db/db.js';

export const userService = {
  findEmail: async (employeenum) => {
    const connection = await dbConnect();
    const query = `SELECT * FROM user WHERE employeenum = ?`;
    const [rows] = await connection.execute(query, [employeenum]);
    return rows[0]; // 사원이 이미 있는지 확인하여 사용자 정보 반환
  },

  signUp: async (user) => {
    const connection = await dbConnect();
    const { name, email, password, phone, birth, employeenum } = user;

    // 사용자 생성
    const query = `INSERT INTO user (name, email, password, phone, birth, employeenum) VALUES (?, ?, ?, ?, ?, ?)`;
    const [result] = await connection.execute(query, [name, email, password, phone, birth, employeenum]);
    return result; // 새로 생성된 사용자 정보 반환
  },

  signIn: async (employeenum, password) => {
    const connection = await dbConnect();
    const query = `SELECT * FROM user WHERE employeenum = ? AND password = ?`;
    const [rows] = await connection.execute(query, [employeenum, password]);

    if (rows.length === 0) {
      throw new Error('Bad Request+사원번호 또는 비밀번호가 잘못되었습니다.');
    }

    return rows[0]; // 로그인 성공 시 사용자 정보 반환
  },

  deleteUser: async (employeenum, password) => {
    const connection = await dbConnect();
    const query = `SELECT * FROM user WHERE employeenum = ? AND password = ?`;
    const [rows] = await connection.execute(query, [employeenum, password]);

    if (rows.length === 0) {
      throw new Error('Bad Request+사원번호 또는 비밀번호가 잘못되었습니다.');
    }

    const deleteQuery = `DELETE FROM user WHERE employeenum = ? AND password = ?`;
    const [result] = await connection.execute(deleteQuery, [employeenum, password]);

    return result;
  }
};