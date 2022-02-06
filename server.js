import express from "express";
import mongoose from "mongoose";
import Cors from "cors";

import { readdirSync } from "fs";

const morgan = require("morgan");
require("dotenv").config();

const app = express();

//db
mongoose
  .connect(process.env.DATABASE_URI)
  .then(() => console.log("db connected"))
  .catch((err) => console.log(err));

//middlewares
app.use(express.json());
app.use(
  Cors({
    origin: process.env.CLIENT_URL,
  })
);

//routes

readdirSync("./routes").map((r) => app.use("/api", require(`./routes/${r}`)));

app.get("/success", (req, res) => {
  res.json({
    message: "payment success",
  });
});
app.get("/cancel", (req, res) => {
  res.json({
    message: "payment cancelled",
  });
});

app.listen(8000);
