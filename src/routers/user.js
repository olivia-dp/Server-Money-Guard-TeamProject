import { Router } from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import {getCurrentUserController} from "../controllers/user.js";
import { authenticate } from "../middlewares/authenticate.js";

const router = Router();

router.use(authenticate);
router.get('/current', ctrlWrapper(getCurrentUserController));


export default router;