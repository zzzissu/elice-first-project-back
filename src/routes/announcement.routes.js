import { Router } from "express";
import { announcementController } from "../controller/announcement.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.get('/api', announcementController.getAllAnnounce);
router.post('/api/post', authMiddleware.verifyToken, announcementController.postAnnounce);
router.delete('/api/:schedule_id', authMiddleware.verifyToken, announcementController.deleteAnnounce);

export const announcementRouter = router;