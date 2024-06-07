const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello, Beauty Buddy!");
});

app.use('/questionnaire', require('./routes/questionnaire'));
// app.use('/routines', require('./routes/routines'));
// app.use('/product-tracking', require('./routes/productTracking'));
// app.use('/journal', require('./routes/journal'));
// app.use('/skin-types', require('./routes/skinTypes'));

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
