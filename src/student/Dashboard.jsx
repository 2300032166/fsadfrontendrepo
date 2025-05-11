import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './Dashboard.css';
import { FaFilter, FaClock } from 'react-icons/fa';

const Timeline = () => {
  const [filterTerm, setFilterTerm] = useState(''); // State to manage the filter term
  const navigate = useNavigate(); // Hook to navigate between routes

  // Courses data with specific details
  const timelineData = [
    { course: 'FSAD', date: 'Feb 15, 2025', task: 'QUIZ-1', id: 'fsad' },
    { course: 'ENGLISH', date: 'Feb 17, 2025', task: 'ALM-5', id: 'eng' },
    { course: 'JAVA', date: 'Feb 20, 2025', task: 'Project Submission', id: 'java' },
    { course: 'AIML', date: 'Feb 25, 2025', task: 'Assignment', id: 'aiml' },
  ];

  // Filter logic to filter timeline items based on search term
  const filteredTimeline = timelineData.filter(item => 
    item.course.toLowerCase().includes(filterTerm.toLowerCase())
  );

  return (
    <div className="timeline-container">
      <div className="timeline-header">
        <span>Timeline</span>
        <div>
          <input
            type="text"
            placeholder="Search Courses..."
            className="search-input"
            value={filterTerm}
            onChange={(e) => setFilterTerm(e.target.value)} // Update filter term
          />
          <FaFilter className="filter-icon" />
        </div>
      </div>
      <div className="timeline-content">
        {filteredTimeline.length > 0 ? (
          filteredTimeline.map((item) => (
            <div
              key={item.id}
              className="timeline-item"
              onClick={() => navigate(`/student/course/${item.id}`)} // Updated to navigate to the correct course route
            >
              <h3>{item.course}</h3>
              <div className="item-details">
                <FaClock className="clock-icon" />
                <span>{item.date}</span>
                <p>{item.task}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No courses found!</p>
        )}
      </div>
    </div>
  );
};

export default Timeline;
