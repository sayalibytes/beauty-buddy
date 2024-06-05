const express = require("express");
const cors = require("cors");
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello, Beauty Buddy!");
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
