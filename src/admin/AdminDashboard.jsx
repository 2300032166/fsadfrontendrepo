import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ManageStudents from "./ManageStudents";
import ManageFaculty from "./ManageFaculty";
import ManageCourses from "./ManageCourses";
import AdminSettings from "./AdminSettings"; // Import the AdminSettings component
import './CssFile.css';

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState("Dashboard");
    const navigate = useNavigate(); // Hook for navigation

    const renderContent = () => {
        switch (activeTab) {
            case "Dashboard":
                return (
                    <div className="content">
                        <h2>Dashboard Overview</h2>
                        <div className="stats-container">
                            <div className="stat-card">Total Users: 150</div>
                            <div className="stat-card">Total Courses: 50</div>
                            <div className="stat-card">Pending Reports: 8</div>
                        </div>
                    </div>
                );
            case "Students":
                return <ManageStudents />;
            case "Faculties":
                return <ManageFaculty />;
            case "Courses":
                return <ManageCourses />;
            case "Settings":
                return <AdminSettings />; // Display AdminSettings content
            default:
                return <h2>Dashboard Overview</h2>;
        }
    };

    const handleSettingsClick = () => {
        // Navigate to the AdminSettings component
        navigate("/admin/settings");
    };

    return (
        <div className="dashboard-container">
            {/* Sidebar */}
            <div className="sidebar">
                <nav className="nav-linkage">
                    <button onClick={() => setActiveTab("Dashboard")}>Dashboard</button>
                    <button onClick={() => setActiveTab("Students")}>Manage Students</button>
                    <button onClick={() => setActiveTab("Faculties")}>Manage Faculty</button>
                    <button onClick={() => setActiveTab("Courses")}>Manage Courses</button>
                    <button onClick={handleSettingsClick}>Settings</button> {/* Use navigate function here */}
                </nav>
            </div>

            {/* Main Content */}
            <div className="main-content">
                {renderContent()}
            </div>
        </div>
    );
}
