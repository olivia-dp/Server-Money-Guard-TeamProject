// src/controllers/transactions.js

import createHttpError from 'http-errors';

import { deleteTransaction } from '../services/transactions.js';
import { patchTransaction } from '../services/transactions.js';

import {
  getAllTransactions,
  getTransactionById,
  createTransaction,
} from '../services/transactions.js';

export const getTransactionsController = async (req, res, next) => {
  try {
    const transactions = await getAllTransactions({
      userId: req.user._id,
    });

    res.json({
      status: 200,
      message: 'Successfully found transactions!',
      data: transactions,
    });
  } catch (error) {
    next(error);
  }
};

export const getTransactionByIdController = async (req, res, next) => {
  try {
    const { transactionId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(contactId)) {
      throw createHttpError(400, 'Invalid transaction ID format');
    }
    const transaction = await getTransactionById(transactionId);
    if (!transaction) {
      throw createHttpError(404, 'Transaction not found');
    }
    res.json({
      status: 200,
      message: `Successfully found transaction with id ${transactionId}!`,
      data: transaction,
    });
  } catch (error) {
    next(error);
  }
};

export const createTransactionController = async (req, res, next) => {
  try {
    const transaction = await createTransaction({
      ...req.body,
      userId: req.user._id,
    });
    res.status(201).json({
      status: 201,
      message: `Successfully created a transaction!`,
      data: transaction,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTransactionController = async (req, res, next) => {
  try {
    const { transactionId } = req.params;

    const transaction = await deleteTransaction(transactionId);

    if (!transaction) {
      next(createHttpError(404, 'Transaction not found'));
      return;
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const patchTransactionController = async (req, res) => {
  try {
    const { transactionId } = req.params;
    const result = await patchTransaction(
      transactionId,
      req.user._id,
      req.body,
    );
    if (!result) {
      next(createHttpError(404, 'Transaction not found'));
      return;
    }
    res.json({
      status: 200,
      message: `Successfully patched a transaction!`,
      data: result.transaction,
    });
  } catch (error) {
    next(error);
  }
};
