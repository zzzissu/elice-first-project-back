import nodemailer from 'nodemailer';

// 이메일 발송 함수
export const sendEmail = async (email, subject, message) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Gmail 사용 시
    auth: {
      user: process.env.EMAIL_USER, // 발신자 이메일 주소
      pass: process.env.EMAIL_PASSWORD, // 발신자 이메일 비밀번호
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: subject,
    text: message,
  };

  return await transporter.sendMail(mailOptions);
};