import React, { useState } from "react";
import { FaQuestionCircle, FaEnvelope, FaPhone, FaHeadset, FaBook } from "react-icons/fa";
import "./Help.css";

const Help = () => {
  const [faqVisible, setFaqVisible] = useState({});

  const toggleFAQ = (index) => {
    setFaqVisible({ ...faqVisible, [index]: !faqVisible[index] });
  };

  const faqs = [
    {
      question: "How do I reset my password?",
      answer: "Go to the login page and click on 'Forgot Password'. Follow the instructions to reset your password.",
    },
    {
      question: "How can I submit an assignment?",
      answer: "Navigate to the 'Assignments' section, select your course, and upload your file before the deadline.",
    },
    {
      question: "Where can I check my grades?",
      answer: "You can view your grades under the 'Student Reports' section in the dashboard.",
    },
    {
      question: "How do I contact my instructor?",
      answer: "Use the 'Discussion Forum' to communicate with your instructor or check the contact details in the course syllabus.",
    },
  ];

  return (
    <div className="help-container">
      {/* Header */}
      <header className="help-header">
        <h1>🆘 Help & Support</h1>
        <p>Find answers to your questions and get assistance when you need it.</p>
      </header>

      {/* FAQ Section */}
      <section className="faq-section">
        <h2>📖 Frequently Asked Questions</h2>
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <button className="faq-question" onClick={() => toggleFAQ(index)}>
              {faq.question} {faqVisible[index] ? "▲" : "▼"}
            </button>
            {faqVisible[index] && <p className="faq-answer">{faq.answer}</p>}
          </div>
        ))}
      </section>

      {/* Support Options */}
      <section className="support-options">
        <h2>📞 Need More Help?</h2>
        <div className="support-cards">
          {/* Live Chat */}
          <div className="support-card">
            <FaHeadset className="support-icon" />
            <h3>Live Chat</h3>
            <p>Chat with a support representative for real-time assistance.</p>
            <button className="support-button">Start Chat</button>
          </div>

          {/* Email Support */}
          <div className="support-card">
            <FaEnvelope className="support-icon" />
            <h3>Email Us</h3>
            <p>Send your queries to our support team.</p>
            <p><strong>support@lms.com</strong></p>
          </div>

          {/* Call Support */}
          <div className="support-card">
            <FaPhone className="support-icon" />
            <h3>Call Support</h3>
            <p>Reach us at <strong>+91 98765 43210</strong> for urgent help.</p>
          </div>

          {/* User Guide */}
          <div className="support-card">
            <FaBook className="support-icon" />
            <h3>User Guide</h3>
            <p>Download our step-by-step guide to navigate the LMS easily.</p>
            <button className="support-button">Download PDF</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Help;

