import React from "react";
import { useNavigate } from "react-router-dom";
import "./Courses.css";

const courses = [
  { name: "FSAD", progress: 10, id: "fsad" },
  { name: "OS", progress: 30, id: "os" },
  { name: "DBMS", progress: 0, id: "dbms" },
  { name: "TOC", progress: 20, id: "toc" },
  { name: "DAA", progress: 0, id: "daa" },
  { name: "MP", progress: 40, id: "mp" },
  { name: "ENG", progress: 50, id: "eng" },
  { name: "AIML", progress: 0, id: "aiml" },
  { name: "NPS", progress: 60, id: "nps" },
  { name: "JAVA", progress: 40, id: "java" },
];

const Courses = () => {
  const navigate = useNavigate();

  return (
    <div className="courses-page">
      {/* Header with no search bar */}
      <div className="courses-header">
        <h2>Courses</h2>
      </div>

      {/* Course List */}
      <div className="courses-container">
        {courses.map((course) => (
          <div key={course.id} className="course-cards">
            <h3>{course.name}</h3>
            <div className="progress-circle">
              <svg width="60" height="60">
                <circle cx="30" cy="30" r="25" stroke="#ddd" strokeWidth="5" fill="none" />
                <circle
                  cx="30"
                  cy="30"
                  r="25"
                  stroke="#3498db"
                  strokeWidth="5"
                  fill="none"
                  strokeDasharray="157"
                  strokeDashoffset={(157 * (100 - course.progress)) / 100}
                />
              </svg>
              <span className="progress-text">{course.progress}%</span>
            </div>
            <button
              className={`course-btn ${course.progress === 0 ? "start" : "continue"}`}
              onClick={() => navigate(`/student/course/${course.id}`)}
            >
              {course.progress === 0 ? "Start" : "Continue"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
