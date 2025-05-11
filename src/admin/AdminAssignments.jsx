import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './CssFile.css';

export default function AdminAssignments() {
  const navigate = useNavigate();

  // Simulated role: replace this with actual role from context/session
  const userRole = "admin"; // change to "teacher" to allow assignment creation

  const [assignments, setAssignments] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    course: "",
    description: "",
    dueDate: "",
    file: null,
  });
  const [editingIndex, setEditingIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [notification, setNotification] = useState("");
  const [submissions, setSubmissions] = useState([]);

  // Dummy data
  useEffect(() => {
    const dummyAssignments = [
      {
        title: "Assignment 1",
        course: "Math",
        description: "Solve all problems",
        dueDate: "2025-04-15",
        createdDate: "2025-04-01",
        submissions: 12,
      },
      {
        title: "Assignment 2",
        course: "Science",
        description: "Research report",
        dueDate: "2025-04-20",
        createdDate: "2025-04-05",
        submissions: 8,
      },
    ];
    setAssignments(dummyAssignments);
  }, []);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: name === "file" ? files[0] : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newAssignment = {
      ...formData,
      createdDate: new Date().toISOString().split("T")[0],
      submissions: 0,
    };

    if (editingIndex !== null) {
      const updated = [...assignments];
      updated[editingIndex] = newAssignment;
      setAssignments(updated);
      setNotification("Assignment updated successfully!");
    } else {
      setAssignments([...assignments, newAssignment]);
      setNotification("Assignment created successfully!");
    }

    setFormData({ title: "", course: "", description: "", dueDate: "", file: null });
    setEditingIndex(null);
    setTimeout(() => setNotification(""), 3000);
  };

  const handleEdit = (index) => {
    setFormData(assignments[index]);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    if (window.confirm("Are you sure to delete this assignment?")) {
      const updated = assignments.filter((_, i) => i !== index);
      setAssignments(updated);
      setNotification("Assignment deleted successfully!");
      setTimeout(() => setNotification(""), 3000);
    }
  };

  const handleViewSubmissions = () => {
    setSubmissions([
      { name: "Student A", file: "submission1.pdf", status: "Submitted" },
      { name: "Student B", file: "submission2.docx", status: "Late" },
    ]);
  };

  const filteredAssignments = assignments.filter((a) =>
    a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.course.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="manage-assignments">
      {/* Navigation */}
      <nav className="admin-nav">
        <button onClick={() => navigate("/admin/courses")}>Courses</button> {/* Updated for Course Navigation */}
        <button onClick={() => navigate("/admin/reports")}>Reports</button>
      </nav>

      {/* Notification */}
      {notification && <div className="notification">{notification}</div>}

      {/* Assignment Form - Only for Teachers */}
      {userRole === "teacher" && (
        <form className="assignment-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Assignment Title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="course"
            placeholder="Course"
            value={formData.course}
            onChange={handleInputChange}
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleInputChange}
          ></textarea>
          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleInputChange}
            required
          />
          <input type="file" name="file" onChange={handleInputChange} />
          <button type="submit">
            {editingIndex !== null ? "Update" : "Create"} Assignment
          </button>
        </form>
      )}

      {/* Search */}
      <input
        type="text"
        placeholder="Search by title or course..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      {/* Assignment Table */}
      <table className="assignment-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Course</th>
            <th>Created</th>
            <th>Due Date</th>
            <th>Submissions</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredAssignments.map((a, index) => (
            <tr key={index}>
              <td>{a.title}</td>
              <td>{a.course}</td>
              <td>{a.createdDate}</td>
              <td>{a.dueDate}</td>
              <td>{a.submissions}</td>
              <td>
                {userRole === "teacher" && (
                  <>
                    <button onClick={() => handleEdit(index)}>Edit</button>
                    <button onClick={() => handleDelete(index)}>Delete</button>
                  </>
                )}
                <button onClick={() => handleViewSubmissions(index)}>
                  View Submissions
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Submissions Modal */}
      {submissions.length > 0 && (
        <div className="submissions-modal">
          <h3>Student Submissions</h3>
          <ul>
            {submissions.map((s, i) => (
              <li key={i}>
                {s.name} - <a href="#">{s.file}</a> - <span>{s.status}</span>
              </li>
            ))}
          </ul>
          <button onClick={() => setSubmissions([])}>Close</button>
        </div>
      )}
    </div>
  );
}
