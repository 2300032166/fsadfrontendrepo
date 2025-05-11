import React, { useState } from "react";
import "./DiscussionForum.css";

const DiscussionForum = () => {
  // Sample discussions
  const [discussions, setDiscussions] = useState([
    {
      id: 1,m,
      topic: "Understanding Recursion",  
      author: "Rakshitha Priya",
      date: "March 5, 2025",
      replies: [{ user: "Sai Kala", text: "Recursion is tricky but useful!" }]
    },
    {
      id: 2,
      topic: "Best Practices for SQL Queries",
      author: "Sirisha",
      date: "March 7, 2025",
      replies: [
        { user: "Rakshitha Priya", text: "Indexing improves performance!" },
        { user: "Sai Kala", text: "Use JOINS instead of nested queries." }
      ]
    }
  ]);

  // New discussion state
  const [newTopic, setNewTopic] = useState("");

  // Add new discussion
  const handleAddDiscussion = () => {
    if (newTopic.trim() === "") return;

    const newDiscussion = {
      id: discussions.length + 1,
      topic: newTopic,
      author: "Faculty",
      date: new Date().toLocaleDateString(),
      replies: []
    };

    setDiscussions([...discussions, newDiscussion]);
    setNewTopic(" "); // Clear input after adding
  };

  // Add reply to discussion
  const handleAddReply = (id, replyText) => {
    if (replyText.trim() === "") return;

    const updatedDiscussions = discussions.map((discussion) =>
      discussion.id === id
        ? {
            ...discussion,
            replies: [...discussion.replies, { user: "You", text: replyText }]
          }
        : discussion
    );

    setDiscussions(updatedDiscussions);
  };

  return (
    <div className="discussion-container">
      {/* Header */}
      <header className="discussion-header">
        <h1>💬 Discussion Forum</h1>
        <p>Engage with students, ask questions, and share knowledge.</p>
      </header>

      {/* New Discussion Form */}
      <div className="new-discussion">
        <input
          type="text"
          value={newTopic}
          onChange={(e) => setNewTopic(e.target.value)}
          placeholder="Start a new discussion..."
        />
        <button onClick={handleAddDiscussion}>Post</button>
      </div>

      {/* Discussion List */}
      <div className="discussion-list">
        {discussions.map((discussion) => (
          <div key={discussion.id} className="discussion-card">
            <h3>{discussion.topic}</h3>
            <p>By {discussion.author} | {discussion.date}</p>
            <div className="replies">
              {discussion.replies.map((reply, index) => (
                <p key={index}><strong>{reply.user}:</strong> {reply.text}</p>
              ))}
            </div>
            {/* Reply Input */}
            <div className="reply-section">
              <input
                type="text"
                placeholder="Write a reply..."
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleAddReply(discussion.id, e.target.value);
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiscussionForum;
