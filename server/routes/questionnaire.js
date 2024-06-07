const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Function to read a JSON file and parse its contents
function loadQuestionsData() {
    const questionsPath = path.join(__dirname, "..", "data", "questions.json");
    const questions = JSON.parse(fs.readFileSync(questionsPath, "utf8"));
    return questions;
}

router.get("/", (req, res) => {
    console.log("Received GET request at /questionnaire");
    try {
      const questions = loadQuestionsData();
      res.json(questions);
    } catch (error) {
      console.error("Error loading questions data:", error);
      res.status(500).send("Internal Server Error");
    }
  });
  
  module.exports = router;
