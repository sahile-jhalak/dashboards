
import axios from "axios";

const base = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const instance = axios.create({
  baseURL: base,
  timeout: 30000,
});

export const fetchAllData = () => instance.get("/data").then(r => r.data);
export const insertData = (payload) => instance.post("/insert", payload).then(r => r.data);

export default instance;
