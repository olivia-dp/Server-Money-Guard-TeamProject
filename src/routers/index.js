import { Router } from 'express';
import authRouter from './auth.js';
import userRouter from "./user.js";
import transactionsRouter from './transactions.js'

const router = Router();

router.use ('/auth', authRouter);
router.use ('/users', userRouter);
router.use ('/home', transactionsRouter);

export default router;