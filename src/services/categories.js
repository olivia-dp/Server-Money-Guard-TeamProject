import { TransactionsCollection } from '../models/transaction.js';

// export const getTransactionsByCategories = async (userId, year, month) => {
export const getTransactionsByCategories = async (userId) => {
  // const incomesSum = await getIncomesTransactionsSumm(userId, year, month);
  // const expenseSum = await getExpenseTransactionsSumm(userId, year, month);

  const incomesSum = await getIncomesTransactionsSumm(userId);
  const expenseSum = await getExpenseTransactionsSumm(userId);

  expenseSum.push(incomesSum);
  const data = expenseSum;

  return data;
};

// const getIncomesTransactionsSumm = async (userId, year, month) => {
const getIncomesTransactionsSumm = async (userId) => {
  const incomesTransactions = await TransactionsCollection.find({
    type: 'incomes',
    userId,
  });

  // const filtredTransactions = [];

  // incomesTransactions.forEach((item) => {
  //   const itemYear = item.date.slice(6);
  //   const itemMonth = item.date.slice(3, 5);
  //   if (itemYear === year && itemMonth === month) {
  //     filtredTransactions.push(item);
  //   }
  // });

  const incomesSum = calcTransactionsAmount(incomesTransactions);

  const incomesData = { name: 'incomes', total: incomesSum };
  return incomesData;
};

// const getExpenseCategories = async (userId, year, month) => {
const getExpenseCategories = async (userId) => {
  const allTransactions = await TransactionsCollection.find({
    userId,
  });

  const expensesList = [
    'Main expenses',
    'Products',
    'Car',
    'Self care',
    'Child care',
    'Household products',
    'Education',
    'Leisure',
    'Other expenses',
    'Entertainment',
  ];

  const result = {
    'Main expenses': [],
    Products: [],
    Car: [],
    'Self care': [],
    'Child care': [],
    'Household products': [],
    Education: [],
    Leisure: [],
    'Other expenses': [],
    Entertainment: [],
  };

  allTransactions.forEach((item) => {
    if (item.category !== undefined && expensesList.includes(item.category)) {
      // const itemYear = item.date.slice(6);
      // const itemMonth = item.date.slice(3, 5);
      // if (itemYear === year && itemMonth === month) {
      item.category === expensesList[item.category];
      result[item.category].push(item);
      // }
    }
  });

  return result;
};

// const getExpenseTransactionsSumm = async (userId, year, month) => {
const getExpenseTransactionsSumm = async (userId) => {
  const transactionByCategories = await getExpenseCategories(
    userId,
    // year,
    // month,
  );
  const expensesList = [
    'Main expenses',
    'Products',
    'Car',
    'Self care',
    'Child care',
    'Household products',
    'Education',
    'Leisure',
    'Other expenses',
    'Entertainment',
  ];
  const result = [];

  for (let i = 0; i < expensesList.length; i++) {
    const transaction = transactionByCategories[expensesList[i]];

    const sum = calcTransactionsAmount(transaction);
    if (sum > 0) {
      result.push({ name: `${expensesList[i]}`, total: sum });
    }
  }

  return result;
};

const calcTransactionsAmount = (transactions) => {
  const sum = transactions.reduce((acc, item) => acc + item.sum, 0);
  return sum;
};
