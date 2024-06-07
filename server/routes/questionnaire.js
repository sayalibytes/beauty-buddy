const express = require("express");
const router = express.Router();
const fs = require("fs");

// Function to read a JSON file and parse its contents
function loadQuestionsData() {
  const questions = JSON.parse(
    fs.readFileSync("./data/questions.json", "utf8")
  );
  return questions;
}

// Handle the API endpoint to get the questionnaire data
router.get("/", (req, res) => {
  const questions = loadQuestionsData();
  console.log("Received GET request at /questionnaire");
  res.json(questions);
});

module.exports = router;
