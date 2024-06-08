const express = require("express");
const router = express.Router();
const path = require("path");
const { readJsonFile } = require("../utility/utils");

const QUESTIONS_FILE_PATH = path.join(__dirname, "..", "data", "questions.json");

router.get("/", (req, res) => {
    console.log("Received GET request at /questionnaire");
  console.log(`QUESTIONS_FILE_PATH: ${QUESTIONS_FILE_PATH}`);
    try {
      const questions = readJsonFile(QUESTIONS_FILE_PATH);
      if (!questions) {
        return res.status(500).send("Internal Server Error");
      }
      res.json(questions);
    } catch (error) {
      console.error("Error loading questions data:", error);
      res.status(500).send("Internal Server Error");
    }
  });
  
  module.exports = router;
