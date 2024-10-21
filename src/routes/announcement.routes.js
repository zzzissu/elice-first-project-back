import { Router } from "express";
import { announcementController } from "../controller/announcement.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.get('/', announcementController.getAllAnnounce);
router.post('/post', authMiddleware.verifyToken, announcementController.postAnnounce);
router.delete('/:schedule_id', authMiddleware.verifyToken, announcementController.deleteAnnounce);

export const announcementRouter = router;