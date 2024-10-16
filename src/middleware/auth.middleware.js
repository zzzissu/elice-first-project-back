import jwt from 'jsonwebtoken';

export const authMiddleware = {
  verifyToken: (req, res, next) => {
    try {
      // 요청 헤더나 쿠키에서 토큰 추출
      const token = req.headers.authorization?.split(' ')[1] || req.cookies.auth_token;

      if (!token) {
        const error = new Error("Unauthorized+토큰이 없습니다.");
        error.status = 401;
        throw error;
      }

      // 토큰 검증
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // 검증된 사용자 정보를 요청 객체에 추가
      next(); // 다음 미들웨어나 라우터로 이동
    } catch (e) {
      if (e.name === 'TokenExpiredError') {
        e.status = 401;
        e.message = 'Unauthorized+토큰이 만료되었습니다.';
      } else if (e.name === 'JsonWebTokenError') {
        e.status = 401;
        e.message = 'Unauthorized+잘못된 토큰입니다.';
      }
      next(e);
    }
  }
};