// backend/routes/dataRoutes.js
import express from "express";
import { getData,insertData } from "../controllers/datacontroller.js";

const router = express.Router();

router.get("/data", getData);
router.post("/insert", insertData);

export default router;
