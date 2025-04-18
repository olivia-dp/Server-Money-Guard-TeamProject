// src/routers/transactions.js

import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js'
import { isValidId } from '../middlewares/isValidId.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createTransactionSchema } from '../validation/transaction.js';
import { updateTransactionSchema } from '../validation/transaction.js';

import {
  getTransactionsController,
  getTransactionByIdController,
  createTransactionController,
  deleteTransactionController,
  patchTransactionController,
} from '../controllers/transactions.js';

const router = Router();

router.get('/home', getTransactionsController);

router.get('/home/:transactionId', isValidId, getTransactionByIdController);

router.post('/home', ctrlWrapper(createTransactionController));

router.delete(
  '/home/:transactionId',
  validateBody(createTransactionSchema),
  ctrlWrapper(deleteTransactionController),
);

router.patch(
  '/home/:transactionId',
  isValidId,
  validateBody(updateTransactionSchema),
  ctrlWrapper(patchTransactionController),
);

export default router;
