import { TransactionsCollection } from '../models/transaction.js';
import UserCollection from '../models/userSchema.js';

export const recalculateUserBalance = async (userId) => {
  const transactions = await TransactionsCollection.find({ userId });
  const newBalance = transactions.reduce((acc, tx) => {
    if (tx.type === 'Income') return acc + tx.sum;
    if (tx.type === 'Expense') return acc - tx.sum;
    return acc;
  }, 0);

  await UserCollection.findByIdAndUpdate(userId, { balance: newBalance });

  return newBalance;
};
