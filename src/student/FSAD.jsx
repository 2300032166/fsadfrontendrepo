import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CourseList.css';

const FSAD = () => {
  const navigate = useNavigate();
  const [dropdown, setDropdown] = useState({
    participants: false,
    grades: false,
    youtube: false,
    materials: {},
    assignments: false,
    quizzes: {}
  });

  const assignments = [
    { title: "Assignment 1", dueDate: "2025-03-10", description: "Introduction to Full Stack Development" },
    { title: "Assignment 2", dueDate: "2025-03-17", description: "Building a Simple React App" },
    { title: "Assignment 3", dueDate: "2025-03-24", description: "Backend Setup with Spring Boot" },
  ];

  const toggleDropdown = (section, subSection = null) => {
    setDropdown(prev => {
      if (subSection) {
        return {
          ...prev,
          [section]: {
            ...prev[section],
            [subSection]: !prev[section][subSection]
          }
        };
      }
      return { ...prev, [section]: !prev[section] };
    });
  };

  const handleAssignmentClick = (assignmentId) => {
    navigate(`/student/assignment-upload/${assignmentId}`);
  };

  const handleQuizNavigation = () => {
    console.log("Navigating to quiz...");
    navigate("/student/quiz");
  };

  return (
    <div className="course-details">
      <h2>FSAD - Fundamentals of Software Architecture and Design</h2>

      <div className="left-content">
        <section className="course-overview">
          <h3>Course Overview</h3>
          <ul>
            <li>Introduction to Software Architecture</li>
            <li>Design Patterns and Principles</li>
            <li>Architectural Styles</li>
            <li>Case Studies</li>
          </ul>
        </section>

        <section className="video-tutorial">
          <h3>Video Tutorial</h3>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/your-video-id"
            title="Video"
          ></iframe>
        </section>

        <section className="course-materials">
          <h3 onClick={() => toggleDropdown('materials')}>
            Course Materials <span>{dropdown.materials ? '▼' : '▶'}</span>
          </h3>
          {dropdown.materials && (
            <div className="module-section">
              <h4 onClick={() => toggleDropdown('materials', 'module1')}>
                Module 1 <span>{dropdown.materials.module1 ? '▼' : '▶'}</span>
              </h4>
              {dropdown.materials.module1 && (
                <div className="download-options">
                  <a href="/path/to/module1.pdf" download>
                    <button className="download-btn">📄 Download PDF</button>
                  </a>
                  <a href="/path/to/module1.ppt" download>
                    <button className="download-btn">📊 Download PPT</button>
                  </a>
                </div>
              )}
            </div>
          )}
        </section>

        <section className="assignments">
          <h3 onClick={() => toggleDropdown('assignments')}>
            Assignments <span>{dropdown.assignments ? '▼' : '▶'}</span>
          </h3>
          {dropdown.assignments && (
            <div className="module-section">
              {assignments.map((assignment, index) => (
                <div key={index} className="assignment-item">
                  <h4 onClick={() => handleAssignmentClick(index)}>
                    {assignment.title}
                  </h4>
                  <p className="assignment-due-date">Due: {assignment.dueDate}</p>
                  <p>{assignment.description}</p>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="quizzes">
          <h3 onClick={() => toggleDropdown("quizzes")}>
            Quizzes <span>{dropdown.quizzes ? "▼" : "▶"}</span>
          </h3>
          {dropdown.quizzes && (
            <div className="module-section">
              <h4 onClick={() => toggleDropdown("quizzes", "quiz1")}>
                Quiz 1 <span>{dropdown.quizzes.quiz1 ? "▼" : "▶"}</span>
              </h4>
              {dropdown.quizzes.quiz1 && (
                <button className="quiz-btn" onClick={handleQuizNavigation}>
                  Start Quiz
                </button>
              )}
            </div>
          )}
        </section>
      </div>

      <div className="right-side-panel">
        <h3>Section 9</h3>
        <div className="dropdown-title" onClick={() => toggleDropdown('participants')}>
          Participants <span>{dropdown.participants ? '▼' : '▶'}</span>
        </div>
        {dropdown.participants && (
          <div className="dropdown-content show">
            <ul>
              <li>Sai kala - 2300032166</li>
              <li>Sirisha - 2300032617</li>
              <li>Rakshitha - 2300031821</li>
            </ul>
          </div>
        )}

        <div className="dropdown-title" onClick={() => toggleDropdown('grades')}>
          Grades <span>{dropdown.grades ? '▼' : '▶'}</span>
        </div>
        {dropdown.grades && (
          <div className="dropdown-content show">
            <ul>
              <li>Sai kala - A+</li>
              <li>Sirisha - A</li>
              <li>Rakshitha - B+</li>
            </ul>
          </div>
        )}

        <div className="dropdown-title" onClick={() => toggleDropdown('youtube')}>
          Youtube Links <span>{dropdown.youtube ? '▼' : '▶'}</span>
        </div>
        {dropdown.youtube && (
          <div className="dropdown-content show">
            <ul>
              <li>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                  Lecture 1
                </a>
              </li>
              <li>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                  Lecture 2
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default FSAD;
