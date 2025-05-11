import React from "react";
import { useParams } from "react-router-dom";
import "./CourseDetails.css";

// Example course data with ID as key
const courseData = {
  fsad: {
    name: "FULL STACK APPLICATION DEVELOPMENT",
    description: "Learn front-end, back-end, and database integration.",
    duration: "6 months",
    instructor: "Dr. John Doe",
  },
  os: {
    name: "OPERATING SYSTEMS",
    description: "Understand the fundamentals of operating systems.",
    duration: "4 months",
    instructor: "Prof. Richard Roe",
  },
  dbms: {
    name: "DATABASE MANAGEMENT SYSTEM",
    description: "Learn the principles of managing databases.",
    duration: "5 months",
    instructor: "Dr. Alan Smith",
  },
  toc: {
    name: "THEORY OF COMPUTATION",
    description: "Explore the theoretical foundations of computing.",
    duration: "4 months",
    instructor: "Prof. Alan Turing",
  },
  daa: {
    name: "DESIGN AND ANALYSIS OF ALGORITHMS",
    description: "Understand algorithm design and analysis techniques.",
    duration: "5 months",
    instructor: "Dr. Barbara Liskov",
  },
  eng: {
    name: "ENGLISH",
    description: "Language",
    duration: "5 months",
    instructor: "Dr. Barbara Liskov",
  },
  aiml: {
    name: "ARTIFICIAL INTELLIGENCE AND MACHINE LEARNING",
    description: "Explore machine learning algorithms and AI techniques.",
    duration: "4 months",
    instructor: "Prof. Jane Smith",
  },
  java: {
    name: "JAVA PROGRAMMING",
    description: "Master the Java programming language.",
    duration: "6 months",
    instructor: "Dr. James Gosling",
  },
  mp: {
    name: "MATHEMATICAL PROGRAMMING",
    description: "Learn to develop mobile applications.",
    duration: "5 months",
    instructor: "Dr. Mark Zuckerberg",
  },
};

// CourseDetails component
const CourseDetails = () => {
  const { courseId } = useParams(); // Extract courseId from URL params
  const course = courseData[courseId]; // Get course details from the courseData object

  // If course is not found, show an error message
  if (!course) {
    return <h2>Course not found</h2>;
  }

  return (
    <div className="course-details-container">
      <h2>{course.name}</h2>
      <p><strong>Description:</strong> {course.description}</p>
      <p><strong>Duration:</strong> {course.duration}</p>
      <p><strong>Instructor:</strong> {course.instructor}</p>
    </div>
  );
};

export default CourseDetails;