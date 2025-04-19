// src/db/models/transaction.js

import { model, Schema } from 'mongoose';

const TransactionsSchema = new Schema(
  {
    date: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    category: {
      type: String,
    },
    comment: {
      type: String,
    },
    sum: {
      type: Number,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const TransactionsCollection = model('transactions', TransactionsSchema);
