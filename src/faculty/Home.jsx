import React from "react";
import { Link } from "react-router-dom";
import {
  FaBook,
  FaClipboardList,
  FaBullhorn,
  FaChalkboardTeacher,
  FaCalendarAlt,
  FaEnvelope,
  FaQuestionCircle,
} from "react-icons/fa";
import "./Home.css";

const Home = () => {
  return (
    <div className="faculty-home">
      {/* Welcome & Profile Section */}
      <div className="welcome-section">
        <h2>Welcome, Professor [Faculty Name] 👋</h2>
        <p>Manage your courses, assignments, and student interactions efficiently.</p>
      </div>

      {/* Dashboard Cards */}
      <div className="dashboard-cards">
        <Link to="/faculty/courses" className="card">
          <FaBook className="icon" />
          <h3>Courses</h3>
          <p>Manage and update your courses.</p>
        </Link>

        <Link to="/faculty/assignments" className="card">
          <FaClipboardList className="icon" />
          <h3>Assignments</h3>
          <p>View and grade student submissions.</p>
        </Link>

        <Link to="/faculty/announcements" className="card">
          <FaBullhorn className="icon" />
          <h3>Announcements</h3>
          <p>Post important updates for students.</p>
        </Link>

        <Link to="/faculty/forum" className="card">
          <FaChalkboardTeacher className="icon" />
          <h3>Discussion Forum</h3>
          <p>Engage with students in discussions.</p>
        </Link>

        <Link to="/faculty/schedule" className="card">
          <FaCalendarAlt className="icon" />
          <h3>Upcoming Schedule</h3>
          <p>View your upcoming lectures and meetings.</p>
        </Link>

        <Link to="/faculty/messages" className="card">
          <FaEnvelope className="icon" />
          <h3>Messages</h3>
          <p>Check student queries and messages.</p>
        </Link>
      </div>

      {/* Notifications Section */}
      <div className="notifications">
        <h3>📢 Recent Notifications</h3>
        <ul>
          <li>✔ Assignment submissions due for "Full Stack Development Course".</li>
          <li>✔ Upcoming meeting with the department head at 3 PM.</li>
          <li>✔ New message from a student regarding project submission.</li>
        </ul>
      </div>

      {/* Help & Support */}
      <div className="help-support">
        <Link to="/faculty/help">
          <FaQuestionCircle className="help-icon" />
          <h3>Need Help?</h3>
          <p>Visit the support center for FAQs and assistance.</p>
        </Link>
      </div>
    </div>
  );
};

export default Home;
