import express from "express";

import {
  createStudent,
  getAllStudents,
  deleteStudent,
} from "../controller/userController.js";

const router = express.Router();

router.route("/").get(getAllStudents).post(createStudent);
router.route("/:id").delete(deleteStudent);

export { router };
