
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { connectDB } from "./config/db.js";
import Data from "./models/DataModel.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const run = async () => {
  await connectDB();
  const file = path.join(__dirname, "jsondata.json");
  if (!fs.existsSync(file)) {
    console.error("jsondata.json not found in backend/");
    process.exit(1);
  }
  const text = fs.readFileSync(file, "utf8");
  const json = JSON.parse(text);
  await Data.deleteMany();
  await Data.insertMany(json);
  console.log("Imported JSON into MongoDB:", json.length, "records");
  process.exit(0);
};

run().catch(err => {
  console.error(err);
  process.exit(1);
});
