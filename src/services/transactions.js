import { TransactionsCollection } from '../models/transaction.js';
import { SORT_ORDER } from '../constants/index.js';
// userId,
export const getAllTransactions = async ({
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
}) => {
  const query = {};

  if (filter.date) {
    query.date = filter.date.trim();
  }

  const transactions = await TransactionsCollection.find(query)
    .sort({ [sortBy]: sortOrder })
    .exec();
  return {
    data: transactions,
  };
};

export const getTransactionById = async (transactionId) => {
  console.log(transactionId);

  const transaction = await TransactionsCollection.findById(transactionId);
  return transaction;
};

export const createTransaction = async (payload) => {
  const transaction = await TransactionsCollection.create(payload);
  return transaction;
};

export const deleteTransaction = async (transactionId) => {
  const transaction = await TransactionsCollection.findOneAndDelete({
    _id: transactionId,
  });
  return transaction;
};

export const patchTransaction = async (transactionId, payload) => {
  const rawResult = await TransactionsCollection.findOneAndUpdate(
    { _id: transactionId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
    },
  );

  if (!rawResult || !rawResult.value) return null;

  return {
    transaction: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};
