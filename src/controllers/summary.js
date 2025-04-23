// src/controllers/summary.js
import { getSummary } from '../services/summary.js'

export const getSummaryController = async (req, res) => {
	try {
		const userId = req.user?._id; // Перевіряємо, чи є userId в req.user
    console.log('User ID:', userId); // Лог для перевірки значення

    if (!userId) {
      return res.status(400).json({
        status: 400,
        message: 'User ID not provided!',
      });
    }
    const summary = await getSummary({userId: req.user._id});
    res.status(200).json({
      status: 200,
      message: 'Successfully found transactions!',
      data: summary,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: 'Something went wrong!',
      error: error.message,
    });
  }
};
