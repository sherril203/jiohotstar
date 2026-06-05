const path = require('path');

require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') });

const mongoose = require('mongoose');
const server = require('./app');

const mongodb_uri = process.env.MONGODB_URI;
const PORT = process.env.PORT;


if (!mongodb_uri) {
  console.error("MONGODB_URI is not defined ");
  process.exit(1);
}

mongoose.connect(mongodb_uri)
  .then(() => {
    console.log(" MongoDB connected successfully!");
    server.listen(PORT, () => {
      console.log(` Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });