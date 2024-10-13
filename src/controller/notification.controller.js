import { notificationService } from '../service/notification.service.js';
import { profileService } from '../service/profile.service.js';

export const notificationController = {
  sendNotification: async (req, res, next) => {
    try {
      const { id: userId } = req.params;

      // 사용자의 상태 조회
      const userState = await profileService.getUserState(userId);

      // 사용자의 상태가 '업무중'일 때만 알림 전송
      if (userState === '업무중') {
        await notificationService.sendNotification(userId);
        res.status(200).json({ message: "알림이 성공적으로 전송되었습니다." });
      } else {
        res.status(403).json({ message: "사용자가 업무중이 아닙니다. 알림을 전송할 수 없습니다." });
      }
    } catch (error) {
      next(error);
    }
  }
};