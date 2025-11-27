
import mongoose from "mongoose";

const DataSchema = new mongoose.Schema({}, { strict: false });
export default mongoose.model("Data", DataSchema);
