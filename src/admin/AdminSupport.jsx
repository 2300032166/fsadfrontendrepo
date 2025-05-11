import React, { useState, useEffect } from "react";
import './CssFile.css';
export default function AdminSupport() {
  const [tickets, setTickets] = useState([]);
  const [responseText, setResponseText] = useState("");
  const [selectedTicketIndex, setSelectedTicketIndex] = useState(null);
  const [notification, setNotification] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Simulated ticket data
  useEffect(() => {
    const dummyTickets = [
      
    ];
    setTickets(dummyTickets);
  }, []);

  const handleRespond = () => {
    if (selectedTicketIndex === null || responseText.trim() === "") return;
    const updated = [...tickets];
    updated[selectedTicketIndex].response = responseText;
    updated[selectedTicketIndex].status = "Resolved";
    setTickets(updated);
    setNotification("Response sent and ticket marked as resolved!");
    setResponseText("");
    setSelectedTicketIndex(null);
    setTimeout(() => setNotification(""), 3000);
  };

  const handleEscalate = (index) => {
    const updated = [...tickets];
    updated[index].status = "Escalated to Tech Team";
    setTickets(updated);
    setNotification("Ticket escalated to technical team.");
    setTimeout(() => setNotification(""), 3000);
  };

  const filteredTickets = tickets
    .filter((ticket) =>
      statusFilter === "All" ? true : ticket.status === statusFilter
    )
    .filter(
      (ticket) =>
        ticket.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.email.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const getCount = (status) =>
    tickets.filter((t) => (status === "All" ? true : t.status === status))
      .length;

  return (
    <div className="support-page" style={{ padding: "20px" }}>
      {notification && <div className="notification">{notification}</div>}

      {/* Search and Filter */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Open">Open</option>
          <option value="Resolved">Resolved</option>
          <option value="Escalated to Tech Team">Escalated</option>
        </select>
      </div>

      {/* Summary Stats */}
      <div style={{ marginBottom: "10px" }}>
        <strong>Total Tickets:</strong> {getCount("All")} |{" "}
        <strong>Open:</strong> {getCount("Open")} |{" "}
        <strong>Resolved:</strong> {getCount("Resolved")} |{" "}
        <strong>Escalated:</strong> {getCount("Escalated to Tech Team")}
      </div>

      {/* Scrollable Table Wrapper */}
      <div className="support-table-wrapper">
        <table className="support-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Email</th>
              <th>Issue</th>
              <th>Date</th>
              <th>Status</th>
              <th>Response</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTickets.length > 0 ? (
              filteredTickets.map((ticket, index) => (
                <tr key={index}>
                  <td>{ticket.user}</td>
                  <td>{ticket.email}</td>
                  <td>{ticket.message}</td>
                  <td>{ticket.createdAt}</td>
                  <td>{ticket.status}</td>
                  <td>{ticket.response || "—"}</td>
                  <td>
                    {ticket.status === "Open" && (
                      <>
                        <button
                          onClick={() => setSelectedTicketIndex(index)}
                          style={{ marginRight: "5px" }}
                        >
                          Respond
                        </button>
                        <button onClick={() => handleEscalate(index)}>
                          Escalate
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">No tickets found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Response Box */}
      {selectedTicketIndex !== null && (
        <div className="response-form" style={{ marginTop: "20px" }}>
          <h3>Respond to: {tickets[selectedTicketIndex].user}</h3>
          <textarea
            rows="4"
            placeholder="Write your response here..."
            value={responseText}
            onChange={(e) => setResponseText(e.target.value)}
          ></textarea>
          <br />
          <button onClick={handleRespond}>Send Response</button>
        </div>
      )}
    </div>
  );
}
