import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { getQuestionnaire } from './api'; // Update the import path as necessary
import { SkinTypeContext } from '../SkinTypeContext';
import './Questionnaire.scss';

function Questionnaire() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [followUp, setFollowUp] = useState(false);
  const [answers, setAnswers] = useState([]);
  const { setSkinType } = useContext(SkinTypeContext);
  const history = useHistory();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await getQuestionnaire();
        setQuestions(response.data.questions);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, []);

  const handleOptionClick = (option) => {
    const currentQuestion = questions[currentQuestionIndex];
    
    if (currentQuestion.id === 3 && option === "I don't know") {
      setFollowUp(true);
    } else if (followUp) {
      determineSkinType(option);
      setFollowUp(false);
      setCurrentQuestionIndex(3); // Update index to point to next main question
    } else {
      if (currentQuestion.id === 3) {
        setSkinType(option);
      }
      setAnswers([...answers, { questionId: currentQuestion.id, answer: option }]);
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        history.push('/here-you-go'); // Navigate to the HereYouGo component
      }
    }
  };

  const determineSkinType = (option) => {
    let determinedSkinType = '';
    switch (option) {
      case 'Oily':
      case 'Frequently':
        determinedSkinType = 'Oily';
        break;
      case 'Dry':
      case 'Yes':
        determinedSkinType = 'Dry';
        break;
      case 'Balanced':
      case 'Rarely':
        determinedSkinType = 'Normal';
        break;
      default:
        determinedSkinType = 'Combination';
    }
    setSkinType(determinedSkinType);
  };

  return (
    <div className="questionnaire">
      {questions.length > 0 && (
        <>
          {followUp ? (
            <>
              <h2 className="questionnaire__title">{questions[currentQuestionIndex + 1].followup_question}</h2>
              <div className="questionnaire__options">
                {questions[currentQuestionIndex + 1].options.map((option, index) => (
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
          ) : (
            <>
              <h2 className="questionnaire__title">{questions[currentQuestionIndex].question}</h2>
              <div className="questionnaire__options">
                {questions[currentQuestionIndex].options.map((option, index) => (
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
        </>
      )}
    </div>
  );
}

export default Questionnaire;
