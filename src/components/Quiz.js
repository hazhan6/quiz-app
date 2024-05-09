import React, { memo, useEffect, useState } from "react";

const Quiz = ({ isLoggedIn }) => {
  const [showResult, setShowResult] = useState(false);
  const [timer, setTimer] = useState(0);

  const [questions, setQuestions] = useState([]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    if (isLoggedIn) {
      getQuestions();
    }

    return () => {
      setTimer(0);
      setShowResult(false);
    };
  }, [isLoggedIn]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (timer === 30) {
      moveToNextQuestion();
    }
  }, [timer]);

  const getQuestions = () => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => {
        let tempData = data.slice(0, 10);
        tempData = tempData.map((obj) => {
          return {
            id: obj.id,
            question: obj.title + "?",
            options: obj.body.split("\n"),
          };
        });
        setQuestions(tempData);
        setSelectedOptions(Array(tempData.length).fill(null));
      })
      .catch(() => {});
  };

  const handleOptionSelect = (option) => {
    const updatedSelectedOptions = [...selectedOptions];
    updatedSelectedOptions[currentQuestionIndex] = option;
    setSelectedOptions(updatedSelectedOptions);
  };

  const moveToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimer(0);
    } else {
      setShowResult(true);
    }
  };

  const renderQuestions = () => {
    return (
      <div>
        {questions.length > 0 ? (
          <div>
            <div className="question-header">
              <h2>
                Question {currentQuestionIndex + 1} of {questions.length}
              </h2>

              <h3>Remaining Time: {30 - timer} seconds</h3>
            </div>

            <h3>Q. {questions[currentQuestionIndex].question}</h3>

            <ul className="options-container">
              {questions[currentQuestionIndex].options.map((option, index) => (
                <li
                  key={index}
                  onClick={() => handleOptionSelect(option)}
                  className={
                    selectedOptions[currentQuestionIndex] === option
                      ? "selected"
                      : ""
                  }
                  style={{ pointerEvents: timer < 10 ? "none" : "auto" }}
                >
                  {String.fromCharCode(65 + index)}. {option}{" "}
                </li>
              ))}
            </ul>

            <div className="w-full justify-content-flex-end">
              <button
                onClick={moveToNextQuestion}
                disabled={
                  selectedOptions[currentQuestionIndex] === null || timer < 10
                }
                className="button next-question-button"
              >
                Next Question
              </button>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    );
  };

  const renderResult = () => {
    return (
      <div>
        <h2>Results</h2>
        <table>
          <thead>
            <tr>
              <th>No.</th>
              <th>Question</th>
              <th>Selected Option</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((question, index) => (
              <tr key={question.id}>
                <td>{index + 1}</td>
                <td>{question.question}</td>
                <td>{selectedOptions[index]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return <div>{showResult ? renderResult() : renderQuestions()}</div>;
};

export default memo(Quiz);
