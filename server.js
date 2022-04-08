import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import { DatabaseConnect } from "./db/index.js";
import { generateUrl, accessUrl } from "./controllers/index.js";

const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/public", express.static(`${process.cwd()}/public`));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

// Your first API endpoint
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.post("/api/shorturl", generateUrl);
app.get("/api/shorturl/:id", accessUrl);

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
  DatabaseConnect();
});
