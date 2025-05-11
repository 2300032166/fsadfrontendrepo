import React from "react";
import { useParams } from "react-router-dom";
import './CssFile.css';
// Sample teacher data — replace or fetch from API as needed
const teacherData = [
 
];

const TeacherDetails = () => {
  const { id } = useParams();
  const teacher = teacherData[id];

  if (!teacher) {
    return (
      <div className="teachernotfound">
        <h3>Teacher not found.....</h3>
      </div>
    );
  }

  return (
    <div className="teacher-container">
      <h2>{teacher.name}</h2>
      <p><strong>Email:</strong> {teacher.email}</p>
      <p><strong>Dealing Courses:</strong> {teacher.courses}</p>
      <p><strong>Login ID:</strong> {teacher.login}</p>
    </div>
  );
};

export default TeacherDetails;
