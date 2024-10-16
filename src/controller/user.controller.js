import { userService } from '../service/user.service.js';
import { tokenUtil } from '../utils/auth.utils.js';
import { createResetCode } from '../utils/password.utils.js';

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

      res.status(201).json({ message: '회원가입 성공'});
    } catch(e) {
      next(e);
    }
  },

  signIn: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await userService.signIn(email, password);

      // 토큰 발급
      const token = tokenUtil.createToken(user);

      // 쿠키에 토큰 저장
      res.cookie('auth_token', token, { httpOnly: true });
      res.status(200).json({ message: '토큰 발급 : ', token });
    } catch(e) {
      next(e);
    }
  },

  getFindUser: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const user = await userService.getFindUser(userId);

      if (!userId) throw new Error ('Bad Request+유저 정보를 찾을 수 없음');

      res.status(200).json(user);
    } catch(e) {
      next(e);
    }
  },

  requestResetPassword: async (req, res, next) => {
    try {
      const { email } = req.body;
      const user = await userService.findEmail(email);
      if (!user) throw new Error('Bad Request+존재하지 않는 이메일입니다.');

      const resetCode = await createResetCode(email);

      res.status(200).json({ message: '인증 코드가 이메일로 발송되었습니다.' });
    } catch (e) {
      next(e);
    }
  },

  requestRestCode: async (req, res, next) => {
    try {
      const { resetCode } = req.body;

      const email = await userService.requestRestCode(resetCode);

      req.session.email = email;

      res.status(200).json({ message: '코드 인증 완료' });
    } catch (e) {
      next(e);
    }
  },

  resetPassword: async (req, res, next) => {
    try {
      const { newPassword } = req.body;
      const email = req.session.email;

      if (!email) throw new Error('Bad Request+세션이 없거나 만료됨')

      const user = await userService.resetPassword(newPassword, email);

      req.session.destroy();

      res.status(200).json(user);
    } catch (e) {
      next(e);
    }
  },

  deleteUser: async (req, res, next) => {
    try {
      const email = req.user.email;

      if (!email) throw new Error ('Bad Request+유저 정보를 찾을 수 없음');

      const user = await userService.deleteUser(email);
      res.status(200).json(user);
    } catch(e) {
      next(e);
    }
  }
};