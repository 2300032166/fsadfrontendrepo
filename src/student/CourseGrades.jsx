import React from "react";
import { useParams } from "react-router-dom";
import "./CourseGrades.css"; // Assuming you have some basic CSS for styling

const CourseGrades = () => {
  const { courseId } = useParams();
  
  // Example data for assignments (you can replace it with actual data)
  const courseAssignments = {
    1: [
      { id: 1, title: "Assignment 1", marks: 90 },
      { id: 2, title: "Assignment 2", marks: 85 },
      { id: 3, title: "Quiz 1", marks: 80 },
    ],
    2: [
      { id: 1, title: "Assignment 1", marks: 92 },
      { id: 2, title: "Assignment 2", marks: 88 },
      { id: 3, title: "Quiz 1", marks: 87 },
    ],
    3: [
      { id: 1, title: "Assignment 1", marks: 85 },
      { id: 2, title: "Assignment 2", marks: 89 },
      { id: 3, title: "Quiz 1", marks: 91 },
    ],
  };

  const assignments = courseAssignments[courseId] || [];

  return (
    <div className="course-grades-container">
      <h2>Course Grades</h2>
      <div className="course-info">
        <h3>Course ID: {courseId}</h3>
        <p>Details of your assignments and quizzes will appear here.</p>
      </div>
      <div className="grades-list">
        {assignments.map((assignment) => (
          <div key={assignment.id} className="grade-card">
            <h4>{assignment.title}</h4>
            <p><strong>Marks:</strong> {assignment.marks}</p>
            <p><strong>Grade:</strong> {assignment.marks >= 85 ? "A" : assignment.marks >= 70 ? "B" : "C"}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseGrades;
