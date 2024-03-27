import express from "express";
import dotenv from "dotenv";
import { MainRouter } from "./routes/index.js";
import { connectDB } from "./components/connectDB.js";

import cors from "cors";
import cron from "./jobs/cron.js";

const app = express();

app.use(express.json());
app.use(cors());
dotenv.config();

app.get("/", (req, res) => {
  res.json("Vira - Backend");
});

app.use("/api", MainRouter);

app.get("/devices/generate", async (req, res) => {
  const str = "3013000876616C6574726F6E68656C6C6F72617669";
  const buf = Buffer.from(str, "hex").toString("utf8");
  res.json({ buf });
});

connectDB();

app.listen(process.env.PORT || 5001, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
