import mysql from "mysql2/promise";
import dotenv from 'dotenv';

dotenv.config();

const dbConfig = {
  host: process.env.DB_HOST,     // MySQL 서버의 호스트 (로컬에서는 localhost)
  user: process.env.DB_USER,  // MySQL 사용자 이름
  password: process.env.DB_PASSWORD, // MySQL 비밀번호
  database: process.env.DB_NAME,   // 연결할 데이터베이스 이름
};

export const dbConnect = async () => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    console.log('데이터베이스 연결 성공');
    
    return connection;
  } catch(err) {
    console.error("데이터베이스 연결 실패: ", err);
    throw err;
  }
}