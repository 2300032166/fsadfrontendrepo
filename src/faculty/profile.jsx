import React from "react";
import { useNavigate } from "react-router-dom";
import "./profile.css";
import profilePic from "../assets/profile.jpeg";

const Profile = () => {
  const navigate = useNavigate();

  const faculty = {
    id: "2300032166",
    name: "Sai Kala Modepalli",
    email: "2300032166@kluniversity.in",
    branch: "Computer Science & Engineering",
    semester: "4th Semester",
    contact: "7093119102",
    dob: "20th Aug 2006",
    address: "Gayathri Apartments, Gollapudi, AP",
    admissionYear: "2023",
    graduationYear: "2027",
    enrollmentNo: "KL-2396558",
    university: "Koneru Lakshmaiah University",
  };

  // ✅ Logout Function
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    window.dispatchEvent(new Event("storage")); // 🔄 Notify app about logout
    navigate("/"); // Navigate to login page
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <img src={profilePic} alt="Profile" className="profile-pic" />
          <h2>{faculty.name}</h2>
          <p className="university">{faculty.university}</p>
        </div>

        <div className="profile-details">
          <h3>faculty Information</h3>
          <div className="detail"><strong>Student ID:</strong> {faculty.id}</div>
          <div className="detail"><strong>Email:</strong> {faculty.email}</div>
          <div className="detail"><strong>Branch:</strong> {faculty.branch}</div>
          <div className="detail"><strong>Semester:</strong> {faculty.semester}</div>
          <div className="detail"><strong>Admission Year:</strong> {faculty.admissionYear}</div>
          <div className="detail"><strong>Graduation Year:</strong> {faculty.graduationYear}</div>
          <div className="detail"><strong>Date of Birth:</strong> {faculty.dob}</div>
          <div className="detail"><strong>Contact:</strong> {faculty.contact}</div>
          <div className="detail"><strong>Address:</strong> {faculty.address}</div>
        </div>

        <div className="profile-footer">
          <button className="btn" onClick={() => navigate("/faculty/courses")}>View Courses</button>
          {/* <button className="btn" onClick={() => navigate("/student/academic-records")}>Academic Records</button> */}
          <button className="btn logout" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
