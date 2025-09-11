import compression from "compression";
import express from "express";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

import globalErrorHandler from "./controller/errorController.js";
import { router as noteRouter } from "./routes/notes.js";
import { router as userRouter } from "./routes/users.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/assets", express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(compression());
app.use(morgan("dev"));

app.use("/api/v1/users", userRouter);
app.use("/api/v1/notes", noteRouter);
app.use(globalErrorHandler);

export default app;
