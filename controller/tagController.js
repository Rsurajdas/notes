import { Notes } from "../models/note.js";
import AppError from "../utils/appError.js";
import { catchAsync } from "../utils/catchAsync.js";

export const getAllTags = catchAsync(async (req, res, next) => {
  const userId = req.user.id;

  const tags = await Notes.distinct("tags", { user: userId, isTrashed: false });

  res.status(200).json({
    status: "success",
    tags,
  });
});
