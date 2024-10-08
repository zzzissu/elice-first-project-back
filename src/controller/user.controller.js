import { user_service } from '../service/user.service.js';

export const user_controller = {
  sign_up: async (req, res, next) => {
    try {
      // 이메일 중복 체크
      const { email } = req.body;
      const user = await user_service.find_email(email);
      if (user) throw new Error('Bad Request+해당 이메일은 이미 사용중입니다');

      // 중복 없으면 서비스로 데이터 보내기
      const result = await user_service.sign_up(req.body);
      console.log(result);

      res.status(201).json(result);
    } catch(e) {
      next(e);
    }
  },
  sign_in: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await user_service.sign_in(email, password);
      res.status(200).json(user);
    } catch(e) {
      next(e);
    }
  }
};