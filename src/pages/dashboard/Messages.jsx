import React from "react";
import "../../styles/DashboardPages.css";

const Messages = () => {
  const messages = [
    { from: "Dr. Nadia", content: "Comment allez-vous avec le nouveau fauteuil ?" },
    { from: "Patient Ahmed", content: "J’aimerais changer l’option du repose-pied." },
  ];

  return (
    <div className="dashboard-page">
      <h1>Messages</h1>
      <ul className="message-list">
        {messages.map((msg, index) => (
          <li key={index} className="message-item">
            <strong>{msg.from}:</strong> {msg.content}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Messages;
