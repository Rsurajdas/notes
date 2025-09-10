import { Notes } from "../models/note.js";
import AppError from "../utils/appError.js";
import { catchAsync } from "../utils/catchAsync.js";

export const createNote = catchAsync(async (req, res, next) => {
  const { title, description, tags } = req.body;
  const userId = req.user.id;

  const newNote = await Notes.create({
    title,
    description,
    tags,
    user: userId,
  });

  res.status(201).json({
    status: "success",
    data: {
      note: newNote,
    },
  });
});

export const getAllNotes = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const notes = await Notes.find({ user: userId, isTrashed: false }).sort({
    createdAt: -1,
  });
  res.status(200).json({
    status: "success",
    results: notes.length,
    data: {
      notes,
    },
  });
});

export const getNote = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const userId = req.user.id;

  const note = await Notes.findOne({ _id: id, user: userId, isTrashed: false });

  if (!note) {
    return next(new AppError("No note found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      note,
    },
  });
});
