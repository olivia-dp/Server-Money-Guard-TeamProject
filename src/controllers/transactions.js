// src/controllers/transactions.js

import createHttpError from 'http-errors';

import { deleteTransaction } from "../services/transactions.js";
import { patchTransaction } from '../services/transactions.js';

import {
  getAllTransactions,
  getTransactionById,
  createTransaction,
} from '../services/transactions.js';

export const getTransactionsController = async (req, res) => {
  const transactions = await getAllTransactions();

  res.json({
    status: 200,
    message: 'Successfully found transactions!',
    data: transactions,
  });
};

export const getTransactionByIdController = async (req, res, next) => {
  const { transactionId } = req.params;
  const transaction = await getTransactionById(transactionId);

  if (!transaction) {
    next(new Error('Transaction not found'));
    return;
  }

  res.json({
    status: 200,
    message: `Successfully found transaction with id ${transactionId}!`,
    data: transaction,
  });
};

export const createTransactionController = async (req, res) => {
  const transaction = await createTransaction(req.body);

  res.status(201).json({
    status: 201,
    message: `Successfully created a transaction!`,
    data: transaction,
  });
};

export const deleteTransactionController = async (req, res) => {
	const { transactionId } = req.params;
	
	const transaction = await deleteTransaction(transactionId);

  if (!transaction) {
    next(createHttpError(404, 'Transaction not found'));
    return;
  }

  res.status(204).send();
};

export const patchTransactionController = async (req, res) => {
	const { transactionId } = req.params;
	const result = await patchTransaction(transactionId, req.body);

	if (!result) {
    next(createHttpError(404, 'Transaction not found'));
    return;
	}
	
	res.json({
    status: 200,
    message: `Successfully patched a transaction!`,
    data: result.transaction,
  });
};
