import crypto from 'crypto';
import { dbConnect } from '../db/db.js';
import { sendEmail } from './mail.utils.js';

export const createResetCode = async (email) => {
  const connection = await dbConnect();

  // 6자리 랜덤 코드 생성
  const resetCode = crypto.randomBytes(3).toString('hex');

  // 유효기간을 3분으로 설정
  const expiresAt = new Date(Date.now() + 3 * 60 * 1000); // 현재 시간으로부터 3분 후

  // 비밀번호 재설정 코드 및 유효기간을 DB에 저장
  const query = `INSERT INTO password_reset (email, reset_code, expires_at) VALUES (?, ?, ?)`;
  await connection.execute(query, [email, resetCode, expiresAt]);

  // 이메일로 인증 코드 전송
  const subject = '비밀번호 재설정 요청';
  const message = `비밀번호 재설정을 위한 인증 코드는: ${resetCode} 입니다. 3분 안에 입력해주세요.`;
  await sendEmail(email, subject, message);

  return resetCode;
};