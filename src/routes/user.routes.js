import { Router } from "express";
import { user_controller } from "../controller/user.controller.js";

const router = Router();

router.post('/api/signup', user_controller.sign_up);
router.post('/api/signin', user_controller.sign_in);


export const user_router = router;