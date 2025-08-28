import compression from "compression";
import express from "express";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

import globalErrorHandler from "./controller/errorController.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/assets", express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(compression());
app.use(morgan("dev"));

app.use(globalErrorHandler);

export default app;
