import { userService } from '../service/user.service.js';

export const userController = {
  signUp: async (req, res, next) => {
    try {
      const { email } = req.body;
      // 이메일 형식 검증
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error('Bad Request+유효하지 않은 이메일 형식입니다.');
      }

      // 사원번호 중복 체크
      const user = await userService.findEmail(email);
      if (user) throw new Error('Bad Request+해당 이메일은 이미 존재합니다!');

      // 중복 없으면 서비스로 데이터 보내기
      const result = await userService.signUp(req.body);
      console.log(result);

      res.status(201).json(result);
    } catch(e) {
      next(e);
    }
  },

  signIn: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await userService.signIn(email, password);
      res.status(200).json(user);
    } catch(e) {
      next(e);
    }
  },

  deleteUser: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await userService.deleteUser(email, password);
      res.status(200).json(user);
    } catch(e) {
      next(e);
    }
  }
};