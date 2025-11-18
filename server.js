/* eslint-disable no-console */
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config({ path: "./.env", override: true });

import app from "./app.js";

const port = process.env.PORT || 3000;

main()
  .then(() => console.log("DB connected successfully..."))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGODB_URI);
}

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
