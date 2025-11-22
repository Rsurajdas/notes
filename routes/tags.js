import express from "express";

import { protectRoute } from "../controller/authController.js";
import { getAllTags } from "../controller/tagController.js";

const router = express.Router();

router.route("/").get(protectRoute, getAllTags);

export { router };
