import { useEffect, useState } from 'react';
import axios from 'axios';
// import config from "../../config";
import './ViewAllStudents.css';

export default function ViewAllStudents() {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  // Fetch all students
  const fetchStudents = async () => {
    try {
      const response = await axios.get(`${config.url}/students/viewall`);
      setStudents(response.data);
    } catch (err) {
      setError("Failed to fetch students.");
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Handle delete student action
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${config.url}/students/delete/${id}`);
      setMessage(response.data);
      setError('');
      fetchStudents(); // Re-fetch the students after deleting one
    } catch (err) {
      setMessage('');
      setError("Failed to delete student.");
    }
  };

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>View All Students</h2>
      {message && <p style={{ color: 'green', textAlign: 'center' }}>{message}</p>}
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Course</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.course}</td>
              <td>
                <button onClick={() => handleDelete(student.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
