import { userService } from '../service/user.service.js';

export const userController = {
  signUp: async (req, res, next) => {
    try {
      // 이메일 중복 체크
      const { email } = req.body;
      const user = await userService.findEmail(email);
      if (user) throw new Error('Bad Request+해당 이메일은 이미 사용중입니다');

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
  }
};