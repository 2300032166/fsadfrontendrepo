import React, { useState } from "react";
import "./QuizPage.css";
import { useNavigate } from "react-router-dom";

const QuizPage = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const questions = [
    {
      question: "What is the purpose of Node.js in full-stack development?",
      options: [
        "Database management",
        "Building web APIs and servers",
        "Styling web pages",
        "Managing HTTP requests on the frontend",
      ],
      answer: 1,
    },
    {
      question: "Which of the following is a NoSQL database commonly used in full-stack development?",
      options: ["MySQL", "MongoDB", "PostgreSQL", "Oracle"],
      answer: 1,
    },
    {
      question: "What does REST stand for in RESTful APIs?",
      options: ["Remote Server Templating", "Representational State Transfer", "Readable System Transmission", "Reversible Standard Encoding"],
      answer: 1,
    },
    {
      question: "Which of the following tools is used for managing frontend state in React?",
      options: ["Redux", "Express", "Django", "Spring Boot"],
      answer: 0,
    },
    {
      question: "What is the primary use of CSS in full-stack development?",
      options: ["Database management", "API routing", "Frontend styling", "Backend routing"],
      answer: 2,
    },
    {
      question: "Which of the following is an example of a JavaScript framework for backend development?",
      options: ["Angular", "React", "Vue.js", "Express"],
      answer: 3,
    },
    {
      question: "Which protocol is commonly used for communication between a web browser and a server?",
      options: ["FTP", "HTTP", "SMTP", "SSH"],
      answer: 1,
    },
    {
      question: "What is used to style React components directly in the code?",
      options: ["CSS", "Styled-components", "Sass", "HTML"],
      answer: 1,
    },
    {
      question: "Which of the following is a version control system used in full-stack development?",
      options: ["Git", "MongoDB", "MySQL", "React"],
      answer: 0,
    },
    {
      question: "What is the purpose of Express.js in a full-stack application?",
      options: [
        "Manage the state of the application",
        "Handle HTTP requests and routing",
        "Render the frontend components",
        "Perform calculations on the client-side",
      ],
      answer: 1,
    },
  ];

  const handleAnswer = (index) => {
    if (index === questions[currentQuestion].answer) {
      setScore(score + 1);
    }
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const handleNavigateToQuestion = (index) => {
    setCurrentQuestion(index);
  };

  return (
    <div className="quiz-container">
      <div className="quiz-left">
        <h2>FSAD Quiz: Full Stack Application Development</h2>
        {showScore ? (
          <div className="score-section">
            <h3>Your Score: {score} / {questions.length}</h3>
            <button onClick={() => navigate("/course/fsad")} className="back-btn">
              Back to Course
            </button>
          </div>
        ) : (
          <div className="question-section">
            <h3>{questions[currentQuestion].question}</h3>
            <div className="options">
              {questions[currentQuestion].options.map((option, index) => (
                <button key={index} onClick={() => handleAnswer(index)} className="option-btn">
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="quiz-right">
        <h3>Question Navigation</h3>
        <div className="question-list">
          {questions.map((_, index) => (
            <button
              key={index}
              className={`question-btn ${index === currentQuestion ? "active" : ""}`}
              onClick={() => handleNavigateToQuestion(index)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
