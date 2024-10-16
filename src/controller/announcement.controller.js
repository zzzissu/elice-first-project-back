import { announcementService } from "../service/announcement.service.js";

export const announcementController = {
  postAnnounce: async (req, res, next) => {
    try {
      const { title, content } = req.body;
      const user_name = req.user.name;
      const user_id = req.user.id;
      const authority = req.user.authority;

      if (!user_id) throw new Error ('Bad Request+유저 정보를 찾을 수 없음');

      if (authority === 0) throw new Error('Unauthorized+권한 없음');

      const result = await announcementService.postAnnounce({ title, content }, user_name, user_id);
      res.status(201).json(result);
    } catch(e) {
      next(e);
    }
  },

  getAllAnnounce: async (req,res,next) => {
    try {
      const result = await announcementService.getAllAnnounce();
      res.status(200).json(result);
    } catch(e) {
      next(e);
    }
  },

  deleteAnnounce: async (req,res,next) => {
    try {
      const user_id = req.user.id;
      const { schedule_id } = req.params;

      if (!user_id) throw new Error ('Bad Request+유저 정보를 찾을 수 없음');

      const announcement = await announcementService.findAnnounceById(schedule_id);
      if (!announcement) throw new Error('Not Found+공지사항을 찾을 수 없습니다.');
      if (announcement.user_id !== user_id) throw new Error('Unauthorized+삭제 권한이 없습니다.');

      const result = await announcementService.deleteAnnounce(schedule_id);
      res.status(200).json({ message: '공지사항이 삭제되었습니다.' });
    } catch(e) {
      next(e);
    }
  },
};