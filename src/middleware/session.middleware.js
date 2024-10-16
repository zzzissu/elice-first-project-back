import session from 'express-session'

export const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET,   // 세션 암호화에 사용할 키
  resave: false,               // 세션을 변경하지 않아도 항상 저장할지 설정
  saveUninitialized: true,     // 초기화되지 않은 세션도 저장할지 여부
  cookie: { maxAge: 1000 * 60 * 10 }    // 쿠키 만료 시간 (1분 = 60000)
});