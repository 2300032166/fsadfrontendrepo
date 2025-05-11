import { useEffect, useState } from 'react';
import axios from 'axios';
// import config from "../../config";
import './ViewAllCourses.css';

export default function ViewAllCourses() {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  // Fetch all courses
  const fetchCourses = async () => {
    try {
      const response = await axios.get(`${config.url}/courses/viewall`);
      setCourses(response.data);
    } catch (err) {
      setError("Failed to fetch courses.");
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // Handle delete course action
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${config.url}/courses/delete/${id}`);
      setMessage(response.data);
      setError('');
      fetchCourses(); // Re-fetch the courses after deleting one
    } catch (err) {
      setMessage('');
      setError("Failed to delete course.");
    }
  };

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>View All Courses</h2>
      {message && <p style={{ color: 'green', textAlign: 'center' }}>{message}</p>}
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Department</th>
            <th>Credits</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map(course => (
            <tr key={course.id}>
              <td>{course.id}</td>
              <td>{course.name}</td>
              <td>{course.department}</td>
              <td>{course.credits}</td>
              <td>
                <button onClick={() => handleDelete(course.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
