import UserCollection from "../models/userSchema.js";



export const updateUserBalance = async ({userId, transaction, reverse=false }) => {
    const baseSum = transaction.type === '+'
  ? Math.abs(transaction.sum)
  : -Math.abs(transaction.sum);

  const signedSum = reverse ? -baseSum : baseSum;

    await UserCollection.findByIdAndUpdate(
      userId,
      { $inc: { balance: signedSum} }, 
      { new: true }
    );
}