import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./CourseDetails.css";

const courseFeatures = {
  CS301: {
    title: "Computer Networks",
    materials: {
      slides: "Here are the slides for Computer Networks...",
      lectureNotes: "These are the lecture notes for Computer Networks...",
      referenceLinks: [
        "https://www.example.com/cn-reference1",
        "https://www.example.com/cn-reference2",
      ],
    },
    assignments: [
      { 
        title: "Assignment 1", 
        description: "Network Configuration Task", 
        dueDate: "2025-05-15", 
        submissionDetails: null 
      },
      { 
        title: "Assignment 2", 
        description: "TCP/IP Protocol Analysis", 
        dueDate: "2025-05-20", 
        submissionDetails: null 
      },
    ],
    quizzes: ["Quiz 1", "Quiz 2"],
  },
  CS302: {
    title: "Data Structures & Algorithms",
    materials: {
      slides: "Slides for Data Structures & Algorithms...",
      lectureNotes: "Lecture notes related to Data Structures...",
      referenceLinks: [
        "https://www.example.com/dsa-reference1",
        "https://www.example.com/dsa-reference2",
      ],
    },
    assignments: [
      { 
        title: "Assignment 1", 
        description: "Implementing Linked List", 
        dueDate: "2025-05-18", 
        submissionDetails: null 
      },
      { 
        title: "Assignment 2", 
        description: "Implementing Binary Tree", 
        dueDate: "2025-05-22", 
        submissionDetails: null 
      },
    ],
    quizzes: ["Complexity Quiz"],
  },
  // More courses...
};

const CourseDetails = () => {
  const { id } = useParams();
  const course = courseFeatures[id];

  const [activeAssignment, setActiveAssignment] = useState(null);
  const [showSubmissionForm, setShowSubmissionForm] = useState(false);
  const [message, setMessage] = useState(""); // State for displaying messages

  const handleAssignmentClick = (assignment) => {
    setActiveAssignment(assignment === activeAssignment ? null : assignment);
  };

  const handleSubmissionClick = () => {
    setShowSubmissionForm(!showSubmissionForm);
  };

  const handleMaterialClick = (materialType) => {
    const message = course.materials[materialType] || "No materials available.";
    setMessage(message);
  };

  const handleReferenceLinksClick = () => {
    const links = course.materials.referenceLinks.join("\n");
    setMessage(`Here are the reference links:\n${links}`);
  };

  if (!course) return <p>Course not found.</p>;

  return (
    <div className="course-details-container">
      <h2>{course.title}</h2>

      {/* Message Display Area */}
      {message && <div className="message-display">{message}</div>}

      {/* Course Materials Section */}
      <section className="course-section">
        <h3>📘 Course Materials</h3>
        <ul>
          <li onClick={() => handleMaterialClick("slides")}>Slides</li>
          <li onClick={() => handleMaterialClick("lectureNotes")}>Lecture Notes</li>
          <li onClick={handleReferenceLinksClick}>Reference Links</li>
        </ul>
      </section>

      {/* Assignments Section */}
      <section className="course-section">
        <h3>📝 Assignments</h3>
        <ul>
          {course.assignments.map((assignment, index) => (
            <li key={index} onClick={() => handleAssignmentClick(assignment)}>
              {assignment.title}
            </li>
          ))}
        </ul>

        {activeAssignment && (
          <div className="assignment-details">
            <h4>{activeAssignment.title}</h4>
            <p><strong>Description:</strong> {activeAssignment.description}</p>
            <p><strong>Due Date:</strong> {activeAssignment.dueDate}</p>

            {/* View Details Button */}
            <button onClick={() => setMessage("View assignment details (e.g., grading rubric, instructions) here.")}>View Details</button>

            {/* Add/Edit Submission Button */}
            <button onClick={handleSubmissionClick}>
              {activeAssignment.submissionDetails ? "Edit Submission" : "Add Submission"}
            </button>

            {/* Display Submission Form if needed */}
            {showSubmissionForm && (
              <div className="submission-form">
                <h5>{activeAssignment.submissionDetails ? "Edit Your Submission" : "Add Your Submission"}</h5>
                <textarea placeholder="Type your submission here..." defaultValue={activeAssignment.submissionDetails || ""}></textarea>
                <button onClick={() => setMessage("Your submission has been received.")}>Submit</button>
              </div>
            )}
          </div>
        )}
      </section>

      {/* Quizzes Section */}
      <section className="course-section">
        <h3>📊 Quizzes</h3>
        <ul>
          {course.quizzes.map((item, index) => <li key={index}>{item}</li>)}
        </ul>
      </section>

      {/* Tools & Actions Section */}
      <section className="course-section">
        <h3>🛠️ Tools & Actions</h3>
        <button onClick={() => setMessage("Upload Material section is under development.")}>Upload Material</button>
        <button onClick={() => setMessage("Assign Quiz section is under development.")}>Assign Quiz</button>
        <button onClick={() => setMessage("Review Submissions section is under development.")}>Review Submissions</button>
        <button onClick={() => setMessage("View Gradebook section is under development.")}>View Gradebook</button>
      </section>
    </div>
  );
};

export default CourseDetails;
