import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import './CssFile.css';
const allCourses = [
    { id: 1, title: "Java Basics" },
    { id: 2, title: "Python 101" },
    { id: 3, title: "Data Structures" },
];

const allUsers = [
    { id: 1, name: "John" },
    { id: 2, name: "Jane" },
    { id: 3, name: "Alice" },
];

export default function AdminHomePage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [recentItems, setRecentItems] = useState([]);
    const [searchResults, setSearchResults] = useState({ courses: [], users: [] });
    const [searchPerformed, setSearchPerformed] = useState(false);
    const [showSummary, setShowSummary] = useState(false);


    const handleSearch = () => {
        const courseResults = allCourses.filter((course) =>
            course.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        const userResults = allUsers.filter((user) =>
            user.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    
        setSearchResults({ courses: courseResults, users: userResults });
        setSearchPerformed(true);
        setShowSummary(true); 
    };
    useEffect(() => {
        if (showSummary) {
            const timer = setTimeout(() => {
                setShowSummary(false);
            }, 3000); // hide after 3 seconds
    
            return () => clearTimeout(timer); // cleanup
        }
    }, [showSummary]);

    const handleAccess = (item, type) => {
        const accessedItem = { ...item, type };
        setRecentItems((prev) => {
            const existing = prev.find((i) => i.id === item.id && i.type === type);
            if (existing) return prev;
            return [accessedItem, ...prev.slice(0, 4)];
        });
    };

    return (
        <div className="home-container">
            <h1><b>Welcome to the LMS !</b></h1><br />

            {/* 🔔 Search Result Summary (Above the Search Input) */}
            {showSummary && (
                <div className="search-summary">
                    <p>
                        Found {searchResults.courses.length} course(s) and {searchResults.users.length} user(s) for "<b>{searchQuery}</b>"
                    </p>
                </div>
            )}

            {/* 🔍 Search Section */}
            <div className="search-section">
                <input
                    type="text"
                    placeholder="Search courses or users..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
            </div>

            {/* 📚 View All Section */}
            <div className="view-all-section">
                <h3>Explore</h3>
                <ul>
                    <button><li><Link to="/users">View All Students</Link></li></button>
                    <button><li><Link to="/faculty">View All Faculty</Link></li></button>
                    <button><li><Link to="/courses">View All Courses</Link></li></button>
                </ul>
            </div>

            {/* 🔁 Recently Accessed Items */}
            {recentItems.length > 0 && (
                <div className="recent-items">
                    <h3>Recently Accessed</h3>
                    <ul>
                        {recentItems.map((item, index) => (
                            <li key={index}>
                                <Link
                                    to={
                                        item.type === "course"
                                            ? `/courses/${item.id}`
                                            : `/users/${item.id}`
                                    }
                                >
                                    {item.type === "course" ? item.title : item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* 🔎 Results as Clickable Links (still accessible) */}
            {searchPerformed && (searchResults.courses.length > 0 || searchResults.users.length > 0) && (
                <div className="search-results">
                    {searchResults.courses.length > 0 && (
                        <>
                            <strong>Courses:</strong>
                            <ul>
                                {searchResults.courses.map((course) => (
                                    <li key={course.id}>
                                        <Link
                                            to={`/courses/${course.id}`}
                                            onClick={() => handleAccess(course, "course")}
                                        >
                                            {course.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}

                    {searchResults.users.length > 0 && (
                        <>
                            <strong>Users:</strong>
                            <ul>
                                {searchResults.users.map((user) => (
                                    <li key={user.id}>
                                        <Link
                                            to={`/users/${user.id}`}
                                            onClick={() => handleAccess(user, "user")}
                                        >
                                            {user.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}
