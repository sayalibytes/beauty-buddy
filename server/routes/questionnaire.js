const express = require("express");
const router = express.Router();
const path = require("path");
const { readJsonFile } = require("../utils");

const QUESTIONS_FILE_PATH = path.join(__dirname, "..", "data", "questions.json");

router.get("/", (req, res) => {
    try {
      const questions = readJsonFile(QUESTIONS_FILE_PATH);
      res.json(questions);
    } catch (error) {
      console.error("Error loading questions data:", error);
      res.status(500).send("Internal Server Error");
    }
  });
  
  module.exports = router;
