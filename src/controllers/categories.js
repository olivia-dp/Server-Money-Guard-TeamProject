import { getTransactionsByCategories } from '../services/categories.js';
// import { parseFilterParams } from '../utils/parseFilterParams.js';

export const getCategoriesController = async (req, res) => {
  const userId = req.user._id;
  // const filter = parseFilterParams(req.query);

  // const filterDate = filter.date;

  // const year = filterDate.slice(6);
  // const month = filterDate.slice(3, 5);

  // const data = await getTransactionsByCategories(userId, year, month);
  const data = await getTransactionsByCategories(userId);

  res.status(200).json({
    status: 200,
    message: 'Successfully found transactions ',
    data: data,
  });
};
