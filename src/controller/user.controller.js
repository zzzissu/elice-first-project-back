import { userService } from '../service/user.service.js';

export const userController = {
  signUp: async (req, res, next) => {
    try {
      // 사원번호 중복 체크
      const { employeenum } = req.body;
      const user = await userService.findEmail(employeenum);
      if (user) throw new Error('Bad Request+해당 사원은 이미 존재합니다!');

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
      const { employeenum, password } = req.body;
      const user = await userService.signIn(employeenum, password);
      res.status(200).json(user);
    } catch(e) {
      next(e);
    }
  },

  deleteUser: async (req, res, next) => {
    try {
      const { employeenum, password } = req.body;
      const user = await userService.deleteUser(employeenum, password);
      res.status(200).json(user);
    } catch(e) {
      next(e);
    }
  }
};