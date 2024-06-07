const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Function to read a JSON file and parse its contents
const readJsonFile = (filePath) => {
    console.log(`Reading file from path: ${filePath}`);
  const data = fs.readFileSync(path.join(__dirname, '..', filePath), 'utf-8');
  return JSON.parse(data);
};

// Handle the API endpoint to get the questionnaire data
router.get('/', (req, res) => {
    console.log('Received GET request at /questionnaire');
    try {
        const data = readJsonFile('data/questions.json');
        res.json(data);
      } catch (error) {
        console.error('Error reading questionnaire data:', error);
        res.status(500).send('Internal Server Error');
      }
    });
    
module.exports = router;
