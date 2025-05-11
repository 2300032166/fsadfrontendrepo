import React, { useState, useEffect } from "react";
import './CssFile.css';
export default function ManageStudents() {
    const [students, setStudents] = useState([]);
    const [form, setForm] = useState({
        name: "",
        email: "",
        registrationNumber: "",
        username: "",
        password: "",
        gender: "",
        dob: "",
        mobile: "",
    });
    const [editingId, setEditingId] = useState(null);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "password") {
            const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            if (!passwordPattern.test(value)) {
                setPasswordError("Password must be at least 8 characters with uppercase, lowercase, number, and special character.");
            } else {
                setPasswordError("");
            }
        }

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleAddOrUpdate = () => {
        const { name, email, password } = form;

        if (!name.trim() || !email.trim()) {
            setSuccessMessage("Name and Email are required");
            return;
        }

        if (passwordError || password.trim() === "") {
            setSuccessMessage("Please enter a valid password.");
            return;
        }

        const newStudent = {
            id: editingId || Date.now(),
            ...form,
            role: "Student",
        };

        if (editingId) {
            setStudents((prev) =>
                prev.map((student) =>
                    student.id === editingId ? newStudent : student
                )
            );
            setSuccessMessage("✅ Student updated successfully!");
        } else {
            setStudents((prev) => [...prev, newStudent]);
            setSuccessMessage("✅ Student added successfully!");
        }

        setEditingId(null);
        setForm({
            name: "",
            email: "",
            registrationNumber: "",
            username: "",
            password: "",
            gender: "",
            dob: "",
            mobile: "",
        });

        setTimeout(() => setSuccessMessage(""), 3000);
    };

    const handleEdit = (student) => {
        setForm({
            name: student.name,
            email: student.email,
            registrationNumber: student.registrationNumber || "",
            username: student.username || "",
            password: student.password || "",
            gender: student.gender || "",
            dob: student.dob || "",
            mobile: student.mobile || "",
        });
        setEditingId(student.id);
        setSuccessMessage("");
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this student?")) {
            setStudents((prev) => prev.filter((student) => student.id !== id));
            if (selectedStudent?.id === id) {
                setSelectedStudent(null);
            }
            setSuccessMessage("❌ Student deleted successfully!");
            setTimeout(() => setSuccessMessage(""), 3000);
        }
    };

    const handleView = (student) => {
        setSelectedStudent(student);
    };

    useEffect(() => {
        // Load initial data if needed
    }, []);

    return (
        <div className="admin-student-container" style={{ padding: "20px" }}>
            <h2>Manage Students</h2>
            <br />

            <div className="admin-student-form">
                <input
                    name="name"
                    value={form.name}
                    placeholder="Enter Full Name"
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="registrationNumber"
                    value={form.registrationNumber}
                    placeholder="Enter Registration Number"
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="username"
                    value={form.username}
                    placeholder="Enter Username"
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="password"
                    value={form.password}
                    placeholder="Enter Password"
                    onChange={handleChange}
                />
                {passwordError && (
                    <p style={{ color: "red", marginTop: "5px" }}>{passwordError}</p>
                )}

                <select name="gender" value={form.gender} onChange={handleChange}>
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>
                <input
                    type="date"
                    name="dob"
                    value={form.dob}
                    onChange={handleChange}
                />
              <input
  name="email"
  type="email"
  value={form.email}
  placeholder="Enter Email"
  onChange={handleChange}
/>

                <input
                    type="tel"
                    name="mobile"
                    value={form.mobile}
                    placeholder="Enter Mobile Number"
                    pattern="[0-9]{10}"
                    maxLength="10"
                    onChange={handleChange}
                />

                <button onClick={handleAddOrUpdate}>
                    {editingId ? "Update Student" : "Add Student"}
                </button>

                {successMessage && (
                    <p style={{ color: "green", marginTop: "10px" }}>{successMessage}</p>
                )}
            </div>

            <table
                className="admin-student-table"
                style={{ marginTop: "20px", width: "100%", borderCollapse: "collapse" }}
            >
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student) => (
                        <tr key={student.id}>
                            <td>{student.name}</td>
                            <td>{student.email}</td>
                            <td>
                                <button onClick={() => handleView(student)}>View</button>
                                <button onClick={() => handleEdit(student)}>Edit</button>
                                <button onClick={() => handleDelete(student.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {selectedStudent && (
                <div
                    style={{
                        marginTop: "30px",
                        padding: "20px",
                        border: "1px solid #ccc",
                        borderRadius: "8px",
                        backgroundColor: "#f9f9f9",
                    }}
                >
                    <h3>Student Details</h3>
                    <p><strong>Name:</strong> {selectedStudent.name}</p>
                    <p><strong>Email:</strong> {selectedStudent.email}</p>
                    <p><strong>Registration Number:</strong> {selectedStudent.registrationNumber}</p>
                    <p><strong>Username:</strong> {selectedStudent.username}</p>
                    <p><strong>Gender:</strong> {selectedStudent.gender}</p>
                    <p><strong>Date of Birth:</strong> {selectedStudent.dob}</p>
                    <p><strong>Mobile:</strong> {selectedStudent.mobile}</p>
                    <p><strong>Role:</strong> {selectedStudent.role}</p>
                </div>
            )}
        </div>
    );
}
