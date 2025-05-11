import React, { useState } from 'react';
import './Help.css';

const Help = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000); // Reset after 3 seconds
  };

  return (
    <div className="help-page-wrapper">
      <div className="help-container">
        <h1 className="help-title">Help & Support</h1>
        <p className="help-subtitle">Find answers to common questions or reach out to our support team.</p>
        <div className="help-content">
          <div className="faq-section">
            <h2>Frequently Asked Questions</h2>
            <div className="faq-item">
              <h3>How do I enroll in a course?</h3>
              <p>Navigate to the Courses section, select your desired course, and click on the enroll button.</p>
            </div>
            <div className="faq-item">
              <h3>How can I reset my password?</h3>
              <p>Go to the login page and click on 'Forgot Password' to reset it.</p>
            </div>
            <div className="faq-item">
              <h3>Who do I contact for technical support?</h3>
              <p>You can reach out to our support team via email at support@example.com.</p>
            </div>
          </div>

          <div className="contact-section">
            <h2>Contact Support</h2>
            <p>If you need further assistance, feel free to contact our support team.</p>
            <form className="contact-form" onSubmit={handleSubmit}>
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" placeholder="Your Name" required />

              <label htmlFor="email">Email:</label>
              <input type="email" id="email" placeholder="Your Email" required />

              <label htmlFor="message">Message:</label>
              <textarea id="message" placeholder="Describe your issue..." required></textarea>

              <button type="submit">Submit</button>
              {submitted && <p className="success-message">Submitted successfully!</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
