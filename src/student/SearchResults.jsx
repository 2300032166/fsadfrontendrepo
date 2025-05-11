import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './SearchResults.css'; // Import CSS

const SearchResults = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [filteredCourses, setFilteredCourses] = useState([]);

  // Sample course data
  const courses = [
    { id: 1, name: 'Full Stack Application Development', alias: ['FSAD'] },
    { id: 2, name: 'Artificial Intelligence & Machine Learning', alias: ['AIML'] },
    { id: 3, name: 'Database Management Systems', alias: ['DBMS'] },
    { id: 4, name: 'Design & Analysis of Algorithms', alias: ['DAA'] },
    { id: 5, name: 'Operating Systems', alias: ['OS'] },
    { id: 6, name: 'Theory Of Computation', alias: ['TOC'] },
    { id: 7, name: 'Mathematical Programming', alias: ['MP'] },
  ];

  // Get search query from URL parameters
  const query = new URLSearchParams(location.search).get('q');

  useEffect(() => {
    if (query) {
      setFilteredCourses(
        courses.filter(course =>
          course.name.toLowerCase().includes(query.toLowerCase()) || // Check name for search
          course.alias.some(alias => alias.toLowerCase().includes(query.toLowerCase())) // Check alias for search
        )
      );
    }
  }, [query]);

  const handleCourseClick = (courseAlias) => {
    // Ensure navigation to the alias course, using lowercase version of the alias name
    navigate(`/student/course/${courseAlias.toLowerCase()}`);
  };

  return (
    <div className="search-results-container">
      <h1 className="search-results-title">Search Results</h1>
      {filteredCourses.length > 0 ? (
        <ul className="search-results-list">
          {filteredCourses.map(course => (
            <li
              key={course.id}
              className="search-result-item"
              onClick={() => handleCourseClick(course.alias[0])} // Use alias (FSAD, AIML, etc.) for navigation
            >
              <span className="course-name">{course.name}</span> {/* Only show course name */}
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-results">No courses found.</p>
      )}
    </div>
  );
};

export default SearchResults;
