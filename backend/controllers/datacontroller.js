
import Data from "../models/DataModel.js";

export const getData = async (req, res) => {
  try {
    const data = await Data.find().lean();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const insertData = async (req, res) => {
  try {
    // Accepts array of objects in body
    const payload = req.body;
    if (!Array.isArray(payload)) {
      return res.status(400).json({ error: "Expected an array of objects" });
    }
    await Data.deleteMany(); // clear previous
    await Data.insertMany(payload);
    res.json({ status: "Inserted", count: payload.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
