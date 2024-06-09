import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getQuestionnaire } from "../../utilities/api";
import "./Questionnaire.scss";

function Questionnaire({ setSkinType }) {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [followUpIndex, setFollowUpIndex] = useState(-1);
  const [answers, setAnswers] = useState([]);
  const Navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await getQuestionnaire();
        setQuestions(response.data.questions);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  const handleOptionClick = (option) => {
    const currentQuestion = questions[currentQuestionIndex];

    if (currentQuestion.id === 3 && option === "I don't know") {
      setFollowUpIndex(0);
    } else {
      if (followUpIndex >= 0 && currentQuestion.followup_questions) {
        determineSkinType(option);
        if (followUpIndex < currentQuestion.followup_questions.length - 1) {
          setFollowUpIndex(followUpIndex + 1);
        } else {
          setFollowUpIndex(-1);
          setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
      } else {
        if (currentQuestion.id === 3) {
          setSkinType(option);
        }
        setAnswers([
          ...answers,
          { questionId: currentQuestion.id, answer: option },
        ]);
        if (currentQuestionIndex < questions.length - 1) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
          Navigate("/get-started");
        }
      }
    }
  };

  const determineSkinType = (option) => {
    let determinedSkinType = "";
    switch (option) {
      case "Oily":
      case "Frequently":
        determinedSkinType = "Oily";
        break;
      case "Dry":
      case "Yes":
        determinedSkinType = "Dry";
        break;
      case "Balanced":
      case "Rarely":
        determinedSkinType = "Normal";
        break;
      default:
        determinedSkinType = "Combination";
    }
    setSkinType(determinedSkinType);
  };
  const getCurrentQuestion = () => {
    const currentQuestion = questions[currentQuestionIndex];
    if (followUpIndex >= 0 && currentQuestion.followup_questions) {
      return currentQuestion.followup_questions[followUpIndex];
    }
    return currentQuestion;
  };

  const currentQuestion = getCurrentQuestion();

  return (
    <div className="questionnaire">
      {questions.length > 0 && currentQuestion && (
        <>
          <h2 className="questionnaire__title">{currentQuestion.question}</h2>
          <div className="questionnaire__options">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                className="questionnaire__option"
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Questionnaire;
