import { leaveService } from '../service/leave.service.js';

export const leaveController = {

    useLeave: async (req, res, next) => {
        try {
            const userId = req.params.id;
            const { usedLeave } = req.body;

            // 사용된 연차가 유효한 숫자인지 검증 (예: 음수 값 방지)
            if (!usedLeave || isNaN(usedLeave) || usedLeave <= 0) {
                return res.status(400).json({ message: "유효한 연차 사용량을 입력해주세요." });
            }

            const userLeave = await leaveService.getUserLeave(userId);

            // 연차 정보가 없는 경우 처리
            if (userLeave === null || userLeave === undefined) {
                return res.status(404).json({ message: "사용자의 연차 정보를 찾을 수 없습니다." });
            }

            // 사용 가능한 연차가 부족한 경우
            if (userLeave < usedLeave) {
                return res.status(400).json({ message: "사용 가능한 연차가 부족합니다." });
            }

            const remainingLeave = userLeave - usedLeave;

            // 남은 연차가 음수가 되지 않는지 재확인
            if (remainingLeave < 0) {
                return res.status(400).json({ message: "연차 계산 오류가 발생했습니다." });
            }

            await leaveService.updateUserLeave(userId, remainingLeave);

            res.status(200).json({ message: "연차가 성공적으로 사용되었습니다.", remainingLeave });
        } catch (e) {
            next(e);
        }
    },


    // 사용자의 연차 정보 조회
    getUserLeave: async (req, res, next) => {
        try {
            const { id: userId } = req.params; 
            const annualLeave = await leaveService.getUserLeave(userId);

            // 사용자가 없을 경우 처리
            if (annualLeave === null) {
                return res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
            }

            res.status(200).json({ annualLeave });
        } catch (e) {
            next(e); // 에러 처리
        }
    }
};