import { fn, col, literal } from "sequelize";
import User from "../models/user.model.js";
import Expense from "../models/expense.model.js";

export const getLeaderboard = async (req, res, next) => {
  try {
    const leaderboard = await User.findAll({
      attributes: [
        "id",
        "name",
        [
          fn("COALESCE", fn("SUM", col("expenses.amount")), 0),
          "totalExpense",
        ],
      ],
      include: [
        {
          model: Expense,
          attributes: [],
        },
      ],
      group: ["User.id"],
      order: [[literal('"totalExpense"'), "DESC"]],
    });

    return res.status(200).json(leaderboard);
  } catch (error) {
    next(error);
  }
};
