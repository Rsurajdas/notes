import express from "express";

import { protectRoute } from "../controller/authController.js";
import {
  createNote,
  deleteNote,
  getAllNotes,
  getNote,
  updateArchiveStatus,
} from "../controller/noteController.js";
const router = express.Router();

router.route("/").post(protectRoute, createNote).get(protectRoute, getAllNotes);
router
  .route("/:id")
  .get(protectRoute, getNote)
  .patch(protectRoute, updateArchiveStatus)
  .delete(protectRoute, deleteNote);

export { router };
