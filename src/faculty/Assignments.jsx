import React, { useState } from "react";
import "./Assignments.css";

const Assignments = () => {
  // Sample data for assignments
  const assignments = [
    { id: 1, title: "Data Structures Homework", dueDate: "March 10, 2025" },
    { id: 2, title: "Operating Systems Project", dueDate: "March 15, 2025" },
    { id: 3, title: "Database Management Assignment", dueDate: "March 18, 2025" }
  ];

  // Sample student submissions data
  const [studentGrades, setStudentGrades] = useState([
    { id: 1, name: "Rakshitha Priya", status: "Submitted", grade: "", feedback: "" },
    { id: 2, name: "Sai Kala", status: "Not Submitted", grade: "", feedback: "" },
    { id: 3, name: "Sirisha", status: "Submitted", grade: "", feedback: "" }
  ]);

  // Function to update grade
  const handleGradeChange = (id, value) => {
    setStudentGrades((prevGrades) =>
      prevGrades.map((student) =>
        student.id === id ? { ...student, grade: value } : student
      )
    );
  };

  // Function to update feedback
  const handleFeedbackChange = (id, value) => {
    setStudentGrades((prevGrades) =>
      prevGrades.map((student) =>
        student.id === id ? { ...student, feedback: value } : student
      )
    );
  };

  return (
    <div className="assignments-container">
      {/* Header Section */}
      <header className="assignments-header">
        <h1>📚 Assignments</h1>
        <p>Manage student submissions, grade assignments, and provide feedback.</p>
      </header>

      {/* Assignment List */}
      <div className="assignments-list">
        <h2>📋 Current Assignments</h2>
        <ul>
          {assignments.map((assignment) => (
            <li key={assignment.id}>
              <strong>{assignment.title}</strong> - Due: {assignment.dueDate}
            </li>
          ))}
        </ul>
      </div>

      {/* Submissions Table */}
      <div className="submissions-section">
        <h2>📑 Student Submissions</h2>
        <table className="submissions-table">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Status</th>
              <th>Grade</th>
              <th>Feedback</th>
            </tr>
          </thead>
          <tbody>
            {studentGrades.map((student) => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.status}</td>
                <td>
                  <input
                    type="text"
                    value={student.grade}
                    onChange={(e) => handleGradeChange(student.id, e.target.value)}
                    placeholder="Enter Grade"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={student.feedback}
                    onChange={(e) => handleFeedbackChange(student.id, e.target.value)}
                    placeholder="Provide Feedback"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Assignments;
