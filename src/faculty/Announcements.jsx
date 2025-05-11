import React, { useState } from "react";
import "./Announcements.css";

const Announcements = () => {
  // Sample announcements
  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: "Midterm Exam Schedule Released!",
      content: "The midterm exams will be conducted from March 20 - March 25. Check the portal for the detailed timetable.",
      category: "Exams",
      date: "March 10, 2025",
      pinned: true,
    },
    {
      id: 2,
      title: "Assignment Deadline Extended",
      content: "The deadline for the Data Structures assignment has been extended to March 15 due to student requests.",
      category: "Assignments",
      date: "March 8, 2025",
      pinned: false,
    },
    {
      id: 3,
      title: "Guest Lecture on AI & ML",
      content: "A special session on Artificial Intelligence and Machine Learning will be conducted on March 18 by Dr. Rajeev Kumar.",
      category: "Events",
      date: "March 7, 2025",
      pinned: false,
    }
  ]);

  // New Announcement States
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newCategory, setNewCategory] = useState("General");

  // Add a new announcement
  const handleAddAnnouncement = () => {
    if (newTitle.trim() === "" || newContent.trim() === "") return;

    const newAnnouncement = {
      id: announcements.length + 1,
      title: newTitle,
      content: newContent,
      category: newCategory,
      date: new Date().toLocaleDateString(),
      pinned: false
    };

    setAnnouncements([...announcements, newAnnouncement]);
    setNewTitle("");
    setNewContent("");
    setNewCategory("General");
  };

  return (
    <div className="announcements-container">
      {/* Header */}
      <header className="announcements-header">
        <h1>📢 Announcements</h1>
        <p>Stay updated with important notices, events, and deadlines.</p>
      </header>

      {/* New Announcement Form */}
      <div className="new-announcement">
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Announcement Title"
        />
        <textarea
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
          placeholder="Enter announcement details..."
        ></textarea>
        <select value={newCategory} onChange={(e) => setNewCategory(e.target.value)}>
          <option value="General">General</option>
          <option value="Exams">Exams</option>
          <option value="Assignments">Assignments</option>
          <option value="Events">Events</option>
        </select>
        <button onClick={handleAddAnnouncement}>Post Announcement</button>
      </div>

      {/* Announcements List */}
      <div className="announcements-list">
        {announcements
          .sort((a, b) => (b.pinned ? 1 : -1)) // Show pinned first
          .map((announcement) => (
            <div key={announcement.id} className="announcement-card">
              <h3>{announcement.title}</h3>
              <p>{announcement.content}</p>
              <span className="announcement-category">{announcement.category}</span>
              <p className="announcement-date">📅 {announcement.date}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Announcements;
