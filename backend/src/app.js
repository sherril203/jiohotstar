const express = require('express');
const cors = require('cors');
const path = require("path");
const router = require('./routes/routes');
const fs =require('fs')
const app = express();

app.use(cors());
app.use(express.json());
app.use(router);
app.use(
  "/check",
  express.static(path.join(__dirname, "src", "popular"))
);

app.get("/test-image", (req, res) => {
  const files = fs.readdirSync("src/popular");
  res.json(files);
});
app.get('/', (req, res) => {
  res.json({ message: "API is working!" });
});


module.exports = app;  