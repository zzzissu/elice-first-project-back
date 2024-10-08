import mysql from "mysql2/promise";

const db_config = {
  host: "localhost",     // MySQL 서버의 호스트 (로컬에서는 localhost)
  user: "root",  // MySQL 사용자 이름
  password: "4052", // MySQL 비밀번호
  database: "project",   // 연결할 데이터베이스 이름
};

export const db_connect = async () => {
  try {
    const connection = await mysql.createConnection(db_config);
    console.log('데이터베이스 연결 성공');
    
    return connection;
  } catch(err) {
    console.error("데이터베이스 연결 실패: ", err);
    throw err;
  }
}