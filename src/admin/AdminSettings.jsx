import React, { useState } from "react";
import './CssFile.css';
const AdminSettings = () => {
  const [theme, setTheme] = useState("light");
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState("English");

  const handleThemeChange = (event) => {
    setTheme(event.target.value);
  };

  const handleNotificationToggle = () => {
    setNotifications(!notifications);
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  return (
    <div className={`settings-container ${theme}`}>
      <h1>Settings</h1>

      {/* Theme Selection */}
      <div className="setting-item">
        <label>Theme:</label>
        <select value={theme} onChange={handleThemeChange}>
          <option value="light">🌞 Light</option>
          <option value="dark">🌙 Dark</option>
        </select>
      </div>

      {/* Notifications */}
      <div className="setting-item">
        <label>Notifications:</label>
        <button onClick={handleNotificationToggle} className="toggle-btn">
          {notifications ? "🔔 Enabled" : "🔕 Disabled"}
        </button>
      </div>

      {/* Language Selection */}
      <div className="setting-item">
        <label>Language:</label>
        <select value={language} onChange={handleLanguageChange}>
          <option value="English">🇺🇸 English</option>
          <option value="Spanish">🇪🇸 Spanish</option>
          <option value="French">🇫🇷 French</option>
          <option value="German">🇩🇪 German</option>
        </select>
      </div>

      {/* System Settings Section */}
      <div className="system-settings">
        <h2>System Settings</h2>
        <p>🔹 Change password policies</p>
        <p>🔹 Set maintenance mode</p>
        <p>🔹 Manage integrations (e.g., Zoom, Google Drive)</p>
      </div>
    </div>
  );
};

export default AdminSettings;
