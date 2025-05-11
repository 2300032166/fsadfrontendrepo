import React, { useState } from "react";
import './CssFile.css';
const AdminRemainders = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [remainders, setRemainders] = useState([]);

  // Handle adding a remainder
  const addRemainder = () => {
    if (title.trim() && description.trim()) {
      setRemainders([...remainders, { id: Date.now(), title, description }]);
      setTitle("");
      setDescription("");
    }
  };

  // Handle deleting a remainder
  const deleteRemainder = (id) => {
    setRemainders(remainders.filter((rem) => rem.id !== id));
  };

  return (
    <div className="remainder-container">
      <h2>Manage Remainders</h2>
      
      {/* Add Remainder Form */}
      <div className="remainder-form">
        <input
          type="text"
          placeholder="Remainder Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Remainder Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <button onClick={addRemainder}>Add Remainder</button>
      </div>

      {/* Remainder List */}
      <h3>Remainders</h3>
      <ul className="remainder-list">
        {remainders.map((rem) => (
          <li key={rem.id} className="remainder-item">
            <div>
              <strong>{rem.title}</strong>
              <p>{rem.description}</p>
            </div>
            <button onClick={() => deleteRemainder(rem.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminRemainders;
