import { dbConnect} from '../db/db.js';

export const profileModel = {
    // 사용자 프로필 조회 
    getUserProfile: async (userId) => {
        const db = await dbConnect();
        const query = 'SELECT * FROM user WHERE id = ?';
        const [rows] = await db.execute(query, [userId]);
        
        
        return rows[0];
    },

    // 전화번호 업데이트 
    updatePhoneNumber: async (userId, phone) => {
        const db = await dbConnect();
        const query = 'UPDATE user SET phone = ? WHERE id = ?';
        await db.execute(query, [phone, userId]);

        
    },

    // 프로필 사진 업데이트 
    updateProfileImage: async (userId, profileImage) => {
        const db = await dbConnect();
        const query = 'UPDATE user SET profile_image = ? WHERE id = ?';
        await db.execute(query, [profileImage, userId]);

        
    }
};