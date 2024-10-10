import { scheduleService } from '../service/schedule.service.js';

export const scheduleController = {
  // 상태 변경 처리 
  changeStatus: async (req, res, next) => {
    try {
      const { userId } = req.params;
      const { status } = req.body;

      // 사용자 정보 가져오기
      const user = await userModel.getUserById(userId);
      if (!user) {
        return res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
      }

      // 상태 업데이트 서비스 호출
      const result = await scheduleService.updateStatus(userId, status);

      res.status(200).json({ message: '상태가 성공적으로 변경되었습니다.' });
    } catch (e) {
      next(e);
    }
  },

  // 개인 일정 생성
  createPersonalSchedule: async (req, res, next) => {
    try {
      const { userId } = req.params;
      const { title, date } = req.body;

      // 스케줄 생성 서비스 호출
      const result = await scheduleService.createSchedule({
        user_id: userId,
        title,
        start_date: date,
        type: 'personal',
        make_public: false,
      });

      res.status(201).json({ message: '개인 일정이 성공적으로 추가되었습니다.', scheduleId: result.insertId });
    } catch (e) {
      next(e);
    }
  }
};