import { useEffect, useState } from 'react';
import axios from 'axios';
// import config from "../../config";
import './ViewAllFaculty.css';

export default function ViewAllFaculty() {
  const [faculty, setFaculty] = useState([]);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  // Fetch all faculty members
  const fetchFaculty = async () => {
    try {
      const response = await axios.get(`${config.url}/faculty/viewall`);
      setFaculty(response.data);
    } catch (err) {
      setError("Failed to fetch faculty.");
    }
  };

  useEffect(() => {
    fetchFaculty();
  }, []);

  // Handle delete faculty action
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${config.url}/faculty/delete/${id}`);
      setMessage(response.data);
      setError('');
      fetchFaculty(); // Re-fetch the faculty list after deleting one
    } catch (err) {
      setMessage('');
      setError("Failed to delete faculty.");
    }
  };

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>View All Faculty</h2>
      {message && <p style={{ color: 'green', textAlign: 'center' }}>{message}</p>}
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {faculty.map(member => (
            <tr key={member.id}>
              <td>{member.id}</td>
              <td>{member.name}</td>
              <td>{member.email}</td>
              <td>{member.department}</td>
              <td>
                <button onClick={() => handleDelete(member.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
