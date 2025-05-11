import React from "react";
import { useParams } from "react-router-dom";
import './CssFile.css';
const AdminCoursePage = () => {
  const { courseId } = useParams(); // Get course ID from URL

  return (
    <div className="course-page">
      <h2>Welcome to {courseId.replace("-", " ").toUpperCase()} Course</h2>
      <p>This is the course page for {courseId.replace("-", " ")}.</p>
    </div>
  );
};

export default AdminCoursePage;

