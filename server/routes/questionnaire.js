const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

// Function to read a JSON file and parse its contents
function loadQuestionsData() {
    const questionsPath = path.join(__dirname, "..", "data", "questions.json");
    console.log(`Loading questions from: ${questionsPath}`);
  
  if (!fs.existsSync(questionsPath)) {
    console.log("Questions file not found");
    throw new Error("Questions file not found");
  }
  const questionsContent = fs.readFileSync(questionsPath, "utf8");
  try {
    const questions = JSON.parse(questionsContent);
    return questions;
} catch (error) {
    console.log("Error parsing JSON:", error);
    throw new Error("Error parsing questions JSON");
  }
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
