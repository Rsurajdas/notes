/* eslint-disable no-console */
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config({ path: "./.env" });

import app from "./app.js";

const port = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("DB connected successfully..."));

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
