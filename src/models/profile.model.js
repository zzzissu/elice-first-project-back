import { dbConnect }  from '../db/db.js';



export const profileModel = {
  getUserProfile: async (userId) => {
    const db = await dbConnect();
    const query = 'SELECT * FROM user WHERE id = ?';
    const [rows] = await db.execute(query, [userId]);  // db 객체에서 execute() 호출
    return rows[0];
  },

  // 프로필 수정
  updateUserProfile: async (userId, { phone, profileImage }) => {
    const db = await dbConnect();
    let query = 'UPDATE user SET ';
    const queryParams = [];

    if (phone) {
      query += 'phone = ?, ';
      queryParams.push(phone);
    }

    if (profileImage) {
      query += 'profile_image = ?, ';
      queryParams.push(profileImage);
    }

    query = query.slice(0, -2); // 마지막 쉼표 제거
    query += ' WHERE id = ?';
    queryParams.push(userId);

    const [result] = await db.execute(query, queryParams);  // db 객체에서 execute() 호출
    return result;
  },
};