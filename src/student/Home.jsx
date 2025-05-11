import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import profileImage from "../assets/profile.jpeg";

const Home = () => {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");

  // Load stored notes from localStorage on initial render
  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem("notes"));
    if (storedNotes) {
      setNotes(storedNotes);
    }
  }, []);

  // Save notes to localStorage whenever they are updated
  useEffect(() => {
    if (notes.length > 0) {
      localStorage.setItem("notes", JSON.stringify(notes));
    }
  }, [notes]);

  // Courses Data
  const courses = [
    { name: "FULL STACK APPLICATION DEVELOPMENT", id: "fsad" },
    { name: "ARTIFICIAL INTELLIGENCE AND MACHINE LEARNING", id: "aiml" },
    { name: "DESIGN AND ANALYSIS OF ALGORITHMS", id: "daa" },
  ];

  // Add new note to the notes array
  const addNote = () => {
    if (newNote.trim()) {
      const currentDate = new Date().toLocaleString();
      const newNotes = [...notes, { text: newNote, date: currentDate }];
      setNotes(newNotes);
      setNewNote(""); // Clear the input field
    }
  };

  // Delete a note from the notes array
  const deleteNote = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
  };

  return (
    <div className="home-container">
      <div className="welcome-section">
        <img src={profileImage} alt="Profile" className="profile-image" />
        <h2 className="welcome-text">Welcome Back!</h2>
      </div>

      <div className="content-wrapper">
        <div className="left-section">
          <h3 className="course-header">Enrolled Courses</h3>
          {courses.map((course) => (
            <div key={course.id} className="course-card">
              <p className="course-title">{course.name}</p>
              <button
                className="course-link"
                onClick={() => navigate(`/student/course/${course.id}`)}  // Updated navigation path
              >
                Enter Course
              </button>
            </div>
          ))}
        </div>

        <div className="right-section">
          <h3 className="notes-header">Personal Notes</h3>
          <div className="note-input-container">
            <textarea
              className="note-input"
              placeholder="Write a new note..."
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
            />
            <button className="add-note-button" onClick={addNote}>
              Add Note
            </button>
          </div>
          <div className="notes-list">
            {notes.map((note, index) => (
              <div key={index} className="note-card">
                <p className="note-text">{note.text}</p>
                <p className="note-date">{note.date}</p>
                <button
                  className="delete-note-button"
                  onClick={() => deleteNote(index)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
