import { leaveService } from '../service/leave.service.js';

export const leaveController = {

    useLeave: async (req, res, next) => {
        try {
            const userId = req.params.id;
            const { usedLeave } = req.body;

            const userLeave = await leaveService.getUserLeave(userId);

            if (userLeave < usedLeave) {
                return res.status(400).json({ message: "사용 가능한 연차가 부족합니다." });
            }

            const remainingLeave = userLeave - usedLeave;
            const result = await leaveService.updateUserLeave(userId, remainingLeave);

            res.status(200).json({ message: "연차가 성공적으로 사용되었습니다.", remainingLeave });
        } catch (e) {
            next(e);
        }
    },

    getUserLeave: async (req, res, next) => {
        try{
            const userId = req.params.id;
            const annualLeave = await leaveService.getUserLeave(userId);

            if(annualLeave = null) {
                return res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
            }

            res.status(200).json({ annualLeave });
        } catch (e){
            next(e);
        }
    }
};