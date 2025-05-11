import React, { useState, useEffect } from "react";
import './CssFile.css';
export default function ManageFaculty() {
    
        const [faculty, setFaculty] = useState([]);
        const [form, setForm] = useState({
            name: "",
            email: "",
            registrationId: "",
            username: "",
            password: "",
            gender: "",
            dob: "",
            mobile: "",
        });
        const [editingId, setEditingId] = useState(null);
        const [selectedFaculty, setSelectedFaculty] = useState(null);
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
    
            const newFaculty = {
                id: editingId || Date.now(),
                ...form,
                role: "Faculty",
            };
    
            if (editingId) {
                setStudents((prev) =>
                    prev.map((f) =>
                        f.id === editingId ? newFaculty : f
                    )
                );
                setSuccessMessage("✅ Faculty updated successfully!");
            } else {
                setStudents((prev) => [...prev, newFaculty]);
                setSuccessMessage("✅ Faculty added successfully!");
            }
    
            setEditingId(null);
            setForm({
                name: "",
                email: "",
                registrationId: "",
                username: "",
                password: "",
                gender: "",
                dob: "",
                mobile: "",
            });
    
            setTimeout(() => setSuccessMessage(""), 3000);
        };
    
        const handleEdit = (f) => {
            setForm({
                name: f.name,
                email: f.email,
                registrationId: f.registrationId || "",
                username: f.username || "",
                password: f.password || "",
                gender: f.gender || "",
                dob: f.dob || "",
                mobile: f.mobile || "",
            });
            setEditingId(f.id);
            setSuccessMessage("");
        };
    
        const handleDelete = (id) => {
            if (window.confirm("Are you sure you want to delete this student?")) {
                setFaculty((prev) => prev.filter((f) => f.id !== id));
                if (selectedFaculty?.id === id) {
                    setSelectedFaculty(null);
                }
                setSuccessMessage("❌ Faculty deleted successfully!");
                setTimeout(() => setSuccessMessage(""), 3000);
            }
        };
    
        const handleView = (f) => {
            setSelectedStudent(f);
        };
    
        useEffect(() => {
            // Load initial data if needed
        }, []);
    
        return (
            <div className="admin-student-container" style={{ padding: "20px" }}>
                <h2>Manage Faculty</h2>
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
                        name="registrationId"
                        value={form.registrationId}
                        placeholder="Enter Registration Id"
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
                        {editingId ? "Update Faculty" : "Add Faculty"}
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
                        {faculty.map((f) => (
                            <tr key={f.id}>
                                <td>{f.name}</td>
                                <td>{f.email}</td>
                                <td>
                                    <button onClick={() => handleView(f)}>View</button>
                                    <button onClick={() => handleEdit(f)}>Edit</button>
                                    <button onClick={() => handleDelete(f.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
    
                {selectedFaculty && (
                    <div
                        style={{
                            marginTop: "30px",
                            padding: "20px",
                            border: "1px solid #ccc",
                            borderRadius: "8px",
                            backgroundColor: "#f9f9f9",
                        }}
                    >
                        <h3>Faculty Details</h3>
                        <p><strong>Name:</strong> {selectedFaculty.name}</p>
                        <p><strong>Email:</strong> {selectedFaculty.email}</p>
                        <p><strong>Registration Number:</strong> {selectedFaculty.registrationId}</p>
                        <p><strong>Username:</strong> {selectedFaculty.username}</p>
                        <p><strong>Gender:</strong> {selectedFaculty.gender}</p>
                        <p><strong>Date of Birth:</strong> {selectedFaculty.dob}</p>
                        <p><strong>Mobile:</strong> {selectedFaculty.mobile}</p>
                        <p><strong>Role:</strong> {selectedFaculty.role}</p>
                    </div>
                )}
            </div>
        );
    }
    