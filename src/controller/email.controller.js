import { emailService } from "../service/email.service.js";

export const emailController = {
  // 받은 이메일 조회
  getReceivedEmail: async (req, res, next) => {
    try {
      const userEmail = req.user.email;
      const email = await emailService.getReceivedEmail(userEmail);

      if (!userEmail) throw new Error ('Bad Request+유저 정보를 찾을 수 없음');

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

      if (!userEmail) throw new Error ('Bad Request+유저 정보를 찾을 수 없음');

      res.status(200).json(email);
    } catch(e) {
      next(e);
    }
  },

  // 새로운 이메일 확인 (알림)
  checkNewEmail: async (req, res, next) => {
    try {
      const userEmail = req.user.email;
      const newEmailCount = await emailService.checkNewEmail(userEmail);

      if (!userEmail) throw new Error ('Unauthorized+유저 정보를 찾을 수 없음');

      res.status(200).json({
        newEmailCount, // 새로운 이메일 개수 반환
        message: newEmailCount > 0 ? '새로운 이메일이 있습니다.' : '새로운 이메일이 없습니다.'
      });
    } catch (e) {
      next(e);
    }
  },

  // 이메일 읽음 처리
  checkedEmail: async (req, res, next) => {
    try {
      const { email_id } = req.params;
      const userEmail = req.user.email;
      const email = await emailService.checkedEmail(email_id, userEmail);

      if (!userEmail) throw new Error ('Unauthorized+유저 정보를 찾을 수 없음');

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

      if (!userEmail) throw new Error ('Unauthorized+유저 정보를 찾을 수 없음');

      if (!title || !content) throw new Error('Bad Request+제목이나 내용이 없습니다.');

      const targetUser = await emailService.findByEmail(target_email);
      if (!targetUser) throw new Error('Bad Request+해당 유저가 존재하지 않습니다.')

      const email = await emailService.postEmail(title, content, target_email, userEmail);

      res.status(201).json(email);
    } catch(e) {
      next(e);
    }
  },

  // 이메일 삭제
  deleteEmail: async (req, res, next) => {
    try {
      const { email_id } = req.params;
      const userEmail = req.user.email;

      if (!userEmail) throw new Error ('Unauthorized+유저 정보를 찾을 수 없음');

      const result = await emailService.deleteEmail(email_id, userEmail);

      res.status(200).json(result);
    } catch(e) {
      next(e);
    }
  },
}