/* eslint-disable no-console */
import mongoose from "mongoose";

import app from "./app.js";

const port = 3000;

mongoose
  .connect(
    "mongodb+srv://surajkumar:D2DVpV9hInzOYKj1@cluster0.quh8a8i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("DB connected successfully..."));

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
