// src/components/CoursesList/FSADDetails.jsx
import React, { useState } from 'react';
import './CourseList.css';

const FSAD = () => {
  const [dropdown, setDropdown] = useState({
    participants: false,
    grades: false,
    youtube: false,
    materials: {},
    assignments: {},
    quizzes: {}
  });

  const [file, setFile] = useState(null);

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

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = () => {
    if (file) {
      console.log('Uploading file:', file.name);
    } else {
      console.log('No file selected');
    }
  };

  return (
    <div className="course-details">
      <h2>ENG - ENGLISH</h2>

      <div className="left-content">
        {/* Course Overview Section */}
        <section className="course-overview">
          <h3>Course Overview</h3>
          <ul>
            <li>Introduction to Software Architecture</li>
            <li>Design Patterns and Principles</li>
            <li>Architectural Styles</li>
            <li>Case Studies</li>
          </ul>
        </section>

        {/* Video Tutorial Section */}
        <section className="video-tutorial">
          <h3>Video Tutorial</h3>
          <iframe width="560" height="315" src="https://www.youtube.com/embed/your-video-id" title="Video"></iframe>
        </section>

        {/* Course Materials Section */}
        <section className="course-materials">
          <h3 onClick={() => toggleDropdown('materials')}>Course Materials <span>{dropdown.materials ? '▼' : '▶'}</span></h3>
          {dropdown.materials && (
            <div className="module-section">
              <h4 onClick={() => toggleDropdown('materials', 'module1')}>Module 1 <span>{dropdown.materials.module1 ? '▼' : '▶'}</span></h4>
              {dropdown.materials.module1 && (
                <div className="download-options">
                  <a href="/path/to/module1.pdf" download><button className="download-btn">📄 Download PDF</button></a>
                  <a href="/path/to/module1.ppt" download><button className="download-btn">📊 Download PPT</button></a>
                </div>
              )}
            </div>
          )}
        </section>

        {/* Assignments Section */}
        <section className="assignments">
          <h3 onClick={() => toggleDropdown('assignments')}>Assignments <span>{dropdown.assignments ? '▼' : '▶'}</span></h3>
          {dropdown.assignments && (
            <div className="module-section">
              <h4 onClick={() => toggleDropdown('assignments', 'assignment1')}>Assignment 1 <span>{dropdown.assignments.assignment1 ? '▼' : '▶'}</span></h4>
              {dropdown.assignments.assignment1 && (
                <div className="upload-options">
                  <input type="file" onChange={handleFileChange} />
                  <button onClick={handleFileUpload} className="upload-btn">Upload File</button>
                </div>
              )}
            </div>
          )}
        </section>

        {/* Quiz Section */}
        <section className="quizzes">
          <h3 onClick={() => toggleDropdown('quizzes')}>Quizzes <span>{dropdown.quizzes ? '▼' : '▶'}</span></h3>
          {dropdown.quizzes && (
            <div className="module-section">
              <h4 onClick={() => toggleDropdown('quizzes', 'quiz1')}>Quiz 1 <span>{dropdown.quizzes.quiz1 ? '▼' : '▶'}</span></h4>
              {dropdown.quizzes.quiz1 && (
                <button className="quiz-btn">Start Quiz</button>
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
              <li><a href="https://youtube.com" target="_blank" rel="noopener noreferrer">Lecture 1</a></li>
              <li><a href="https://youtube.com" target="_blank" rel="noopener noreferrer">Lecture 2</a></li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default FSAD;