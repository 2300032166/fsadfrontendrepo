import React from "react";
import { Link } from "react-router-dom";
import "./AcademicRecords.css";

const AcademicRecords = () => {
  const courses = [
    { id: 1, name: "Data Structures", marks: "85%" },
    { id: 2, name: "Algorithms", marks: "90%" },
    { id: 3, name: "Operating Systems", marks: "88%" },
    // Add more courses as required
  ];

  return (
    <div className="academic-records-page"> {/* Scoped wrapper class */}
      <div className="records-container">
        <h2 className="records-heading">Academic Records</h2>
        <div className="records-list">
          {courses.map((course) => (
            <Link to={`/coursegrades/${course.id}`} key={course.id}>
              <div className="course-card">
                <span className="course-name">{course.name}</span>
                <span className="course-marks">{course.marks}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AcademicRecords;
