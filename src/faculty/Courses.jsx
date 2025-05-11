import React from "react";
import { Link } from "react-router-dom";
import "./Courses.css";

const courses = [
  { name: "Computer Networks", id: "CS301", students: 45 },
  { name: "Data Structures & Algorithms", id: "CS302", students: 50 },
  { name: "Operating Systems", id: "CS303", students: 48 },
  { name: "Machine Learning", id: "CS304", students: 42 },
  { name: "Full Stack Development", id: "CS305", students: 55 },
  { name: "Database Management Systems", id: "CS306", students: 52 },
];

const Courses = () => {
  return (
    <div className="courses-container">
      <h2>📚 My Courses</h2>
      <ul className="course-list">
        {courses.map((course, index) => (
          <li key={index} className="course-item">
            <span className="course-title">{course.name}</span>
            <p className="course-id">{course.id}</p>
            <p className="student-count">👨‍🎓 Enrolled Students: {course.students}</p>
            <Link to={`/faculty/course/${course.id}`} className="view-details-btn">View Details</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Courses;
