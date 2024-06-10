import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getQuestionnaire } from "../../utilities/api";
import "./Questionnaire.scss";
import bbLogo from '../../assets/images/bb_logo.png';

function Questionnaire({ setSkinType }) {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [followUpQuestions, setFollowUpQuestions] = useState([]);
  const [currentFollowUpIndex, setCurrentFollowUpIndex] = useState(-1);
  //   const [answers, setAnswers] = useState([]);
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
      if (
        currentQuestion.followup_questions &&
        currentQuestion.followup_questions.length > 0
      ) {
        setFollowUpQuestions(currentQuestion.followup_questions);
        setCurrentFollowUpIndex(0);
      } else {
        console.error("Follow-up questions are not defined for question id 3");
      }
    } else if (currentFollowUpIndex >= 0) {
      determineSkinType(option);
      if (currentFollowUpIndex < followUpQuestions.length - 1) {
        setCurrentFollowUpIndex(currentFollowUpIndex + 1);
      } else {
        setFollowUpQuestions([]);
        setCurrentFollowUpIndex(-1);
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      }
    } else {
      if (currentQuestion.id === 3) {
        setSkinType(option);
      }
      moveToNextQuestion();
    }
  };

  const moveToNextQuestion = () => {
    if (currentFollowUpIndex === -1) {
      // setAnswers((prevAnswers) => [...prevAnswers, { questionId: currentQuestion.id, answer: option }]);
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        Navigate("/get-started");
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
    if (currentFollowUpIndex >= 0 && followUpQuestions.length > 0) {
      return followUpQuestions[currentFollowUpIndex];
    }
    return questions[currentQuestionIndex];
  };

  const currentQuestion = getCurrentQuestion();

  return (
    <div className="questionnaire">
      <img className="logo" src={bbLogo} alt="logo" />

      {questions.length > 0 && currentQuestion && (
        <>
          <h2 className="questionnaire__title">
            {currentQuestion.question || currentQuestion.followup_question}
          </h2>
          <p className="questionnaire__description">{currentQuestion.description}</p>
          <div className="questionnaire__options">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                className="questionnaire__button"
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
