import React, { useState } from "react";
import './CssFile.css';
const AdminAnnouncements = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [announcements, setAnnouncements] = useState([]);

  // Handle adding an announcement
  const addAnnouncement = () => {
    if (title.trim() && description.trim()) {
      setAnnouncements([...announcements, { id: Date.now(), title, description }]);
      setTitle("");
      setDescription("");
    }
  };

  // Handle deleting an announcement
  const deleteAnnouncement = (id) => {
    setAnnouncements(announcements.filter((ann) => ann.id !== id));
  };

  return (
    <div className="announcement-container">
      <h2>Manage Announcements</h2>

      {/* Add Announcement Form */}
      <div className="announcement-form">
        <input
          type="text"
          placeholder="Announcement Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Announcement Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <button onClick={addAnnouncement}>Add Announcement</button>
      </div>

      {/* Announcement List */}
      <h3>Announcements</h3>
      <ul className="announcement-list">
        {announcements.map((ann) => (
          <li key={ann.id} className="announcement-item">
            <div>
              <strong>{ann.title}</strong>
              <p>{ann.description}</p>
            </div>
            <button onClick={() => deleteAnnouncement(ann.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminAnnouncements;
