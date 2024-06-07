const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Function to read a JSON file and parse its contents
const readJsonFile = (filePath) => {
  const data = fs.readFileSync(path.join(__dirname, '..', filePath), 'utf-8');
  return JSON.parse(data);
};

// Handle the API endpoint to get the questionnaire data
router.get('/', (req, res) => {
  const data = readJsonFile('data/questions.json');
  res.json(data);
});

module.exports = router;
