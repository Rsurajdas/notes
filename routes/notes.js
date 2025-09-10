import express from "express";

import { protectRoute } from "../controller/authController.js";
import {
  createNote,
  getAllNotes,
  getNote,
} from "../controller/noteController.js";
const router = express.Router();

router.route("/").post(protectRoute, createNote).get(protectRoute, getAllNotes);
router.route("/:id").get(protectRoute, getNote);

export { router };
