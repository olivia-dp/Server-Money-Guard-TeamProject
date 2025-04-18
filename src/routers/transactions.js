// src/routers/transactions.js

import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js'

import {
  getTransactionsController,
  getTransactionByIdController,
  createTransactionController,
  deleteTransactionController,
  patchTransactionController,
} from '../controllers/transactions.js';


const router = Router();

router.get('/home', getTransactionsController);

router.get('/home/:transactionId', getTransactionByIdController);

router.post('/home', ctrlWrapper(createTransactionController));

router.delete('/home/:transactionId', ctrlWrapper(deleteTransactionController));

router.patch('/home/:transactionId', ctrlWrapper(patchTransactionController));

export default router;
