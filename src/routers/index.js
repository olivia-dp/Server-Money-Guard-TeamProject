import { Router } from 'express';
import authRouter from './auth.js';
import userRouter from "./user.js";
import transactionsRouter from './transactions.js'
import summaryRouter from './summary.js'

const router = Router();

router.use ('/auth', authRouter);
router.use ('/users', userRouter);
router.use('/home', transactionsRouter);
router.use('/summary', summaryRouter);

export default router;