import React, { useState, useEffect } from "react";
import './CssFile.css';
export default function ManageUsers() {
    const [users, setUsers] = useState([]);
    const [form, setForm] = useState({
        name: "",
        email: "",
        role: "Student",
        permissions: ["View Courses"],
    });
    const [editingId, setEditingId] = useState(null);

    

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "role") {
            setForm((prev) => ({
                ...prev,
                role: value,
                
            }));
        } else {
            setForm((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleAddOrUpdate = () => {
        const { name, email, role } = form;

        if (!name.trim() || !email.trim()) {
            alert("Name and Email are required");
            return;
        }

        const newUser = {
            id: editingId || Date.now(),
            name,
            email,
            role,
        };

        if (editingId) {
            // Update user
            setUsers((prev) =>
                prev.map((user) => (user.id === editingId ? newUser : user))
            );
            setEditingId(null);
        } else {
            // Add new user
            setUsers([...users, newUser]);
        }

        setForm({
            name: "",
            email: "",
            role: "Student",
        });
    };

    const handleEdit = (user) => {
        setForm({
            name: user.name,
            email: user.email,
            role: user.role,
        });
        setEditingId(user.id);
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            setUsers(users.filter((user) => user.id !== id));
        }
    };

    useEffect(() => {
        // Optional: Load initial users here
    }, []);

    return (
        <div className="admin-user-container">
            <h2>User Management</h2>
            <br />

            <div className="admin-user-form">
                <input
                    name="name"
                    value={form.name}
                    placeholder="Enter Full Name"
                    onChange={handleChange}
                />
                <input
                    name="email"
                    type="email"
                    value={form.email}
                    placeholder="Enter Email"
                    onChange={handleChange}
                />
                <select name="role" value={form.role} onChange={handleChange}>
                    <option value="Student">Student</option>
                    <option value="Instructor">Instructor</option>
                    <option value="Admin">Admin</option>
                </select>

                <button onClick={handleAddOrUpdate}>
                    {editingId ? "Update User" : "Add User"}
                </button>
            </div>

            

            <table className="admin-user-table" style={{ marginTop: "20px" }}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            
                            <td>
                                <button onClick={() => handleEdit(user)}>
                                    Edit
                                </button>
                                <button onClick={() => handleDelete(user.id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
