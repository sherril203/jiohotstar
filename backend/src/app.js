const express = require('express');
const cors = require('cors');
const path = require("path");
const router = require('./routes/routes');
const fs = require('fs');
const app = express();

app.use(cors());
app.use(express.json());


app.use(
  "/files",
  express.static(path.join(__dirname, "popular")) 
);

app.use(router);

app.get('/', (req, res) => {
  res.json({ message: "API is working properly!" });
});

module.exports = app;