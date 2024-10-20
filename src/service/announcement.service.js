import { dbConnect } from '../db/db.js';

export const announcementService = {
  findAnnounceById: async (schedule_id) => {
    const connection = await dbConnect();
    const query = `SELECT * FROM schedule WHERE id = ? AND type = 'announcement' AND deleted_at IS NULL`;
    const [rows] = await connection.execute(query, [schedule_id]);
    return rows[0];
  }, 

  checkAuthority: async (user_id) => {
    const connection = await dbConnect();
    const query = `SELECT authority FROM user WHERE id = ? AND deleted_at IS NULL`;
    const [rows] = await connection.execute(query, [user_id]);
    return rows[0];
  }, 


  postAnnounce: async (announcement, user_name, user_id) => {
    const connection = await dbConnect();
    const { title, content } = announcement;

    const query = `INSERT INTO schedule (title, content, type, user_name, user_id)
                   VALUES (?, ?, 'announcement', ?, ?)`;
    const [result] = await connection.execute(query, [title, content, user_name, user_id]);
    return result;
  },

  getAllAnnounce: async () => {
    const connection = await dbConnect();

    const query = `SELECT id, title, content, user_name, created_at
                   FROM schedule
                   WHERE type = 'announcement' AND deleted_at IS NULL
                   ORDER BY created_at DESC`;
    const [rows] = await connection.execute(query);

    return rows;
  },

  deleteAnnounce: async (schedule_id) => {
    const connection = await dbConnect();

    const deleteQuery = `UPDATE schedule SET deleted_at = CURRENT_TIMESTAMP WHERE id = ?`;
    const [result] = await connection.execute(deleteQuery, [schedule_id]);

    return result;
  }
};