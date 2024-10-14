import { emailService } from "../service/email.service.js";

export const emailController = {
  // 받은 이메일 조회
  getReceivedEmail: async (req, res, next) => {
    try {
      const userEmail = req.user.email;
      const email = await emailService.getReceivedEmail(userEmail);

      res.status(200).json(email);
    } catch(e) {
      next(e);
    }
  },

  // 보낸 이메일 조회
  getSentEmail: async (req, res, next) => {
    try {
      const userEmail = req.user.email;
      const email = await emailService.getSentEmail(userEmail);

      res.status(200).json(email);
    } catch(e) {
      next(e);
    }
  },

  // 이메일 작성
  postEmail: async (req, res, next) => {
    try {
      const { title, content, target_email } = req.body;
      const userEmail = req.user.email;

      if (!title || !content) throw new Error('Bad Request+제목이나 내용이 없습니다.');

      const targetUser = await emailService.findByEmail(target_email);
      if (!targetUser) throw new Error('Bad Request+해당 유저가 존재하지 않습니다.')

      const email = await emailService.postEmail(title, content, target_email, userEmail);

      res.status(201).json(email);
    } catch(e) {
      next(e);
    }
  },

}