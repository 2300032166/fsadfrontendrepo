import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Reminders.css';

const ReminderPage = () => {
  const [reminders, setReminders] = useState([
    {
      course: 'FSAD',
      task: 'Quiz1',
      dueDate: '2025-03-06',
      id: 1,
      completed: false
    },
    {
      course: 'DSS',
      task: 'Assignment Submission',
      dueDate: '2025-03-08',
      id: 2,
      completed: false
    },
    {
      course: 'ML',
      task: 'Project Due',
      dueDate: '2025-03-10',
      id: 3,
      completed: false
    }
  ]);

  const navigate = useNavigate();

  // Handle the checkbox change and remove the completed reminder
  const handleCheckboxChange = (id) => {
    // Mark the task as completed and remove the reminder from the list
    const updatedReminders = reminders.filter((reminder) => reminder.id !== id);
    setReminders(updatedReminders);

    const selectedReminder = reminders.find((reminder) => reminder.id === id);

    // Navigate based on the task
    if (selectedReminder.completed) {
      if (selectedReminder.course === 'FSAD' && selectedReminder.task === 'Quiz1') {
        navigate('/fsad-quiz1');
      } else if (selectedReminder.course === 'DSS' && selectedReminder.task === 'Assignment Submission') {
        navigate('/dss-assignment');
      } else if (selectedReminder.course === 'ML' && selectedReminder.task === 'Project Due') {
        navigate('/ml-project');
      }
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="reminder-page">
      <h1>Upcoming Reminders</h1>
      {reminders.length === 0 ? (
        <div className="no-reminders-message">No more reminders</div>
      ) : (
        <div className="reminder-list">
          {reminders.map((reminder) => (
            <div key={reminder.id} className={`reminder-item ${reminder.completed ? 'completed' : ''}`}>
              <div className="reminder-info">
                <span className="reminder-course">{reminder.course}</span>
                <span className="reminder-task">{reminder.task}</span>
              </div>
              <div className="reminder-due">
                <span className="due-date">{`Due: ${formatDate(reminder.dueDate)}`}</span>
              </div>
              <div className="checkbox-container">
                <input
                  type="checkbox"
                  checked={reminder.completed}
                  onChange={() => handleCheckboxChange(reminder.id)}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReminderPage;
