"use client"

import { useState } from "react"
import Navigation from "../components/Navigation"
import "../styles/pages.css"

export default function Messages({ currentUser, onLogout }) {
  const [conversations, setConversations] = useState([
    {
      id: 1,
      name: "Alice Martin",
      lastMessage: "Intéressé par votre profil...",
      unread: 2,
      timestamp: "10:30",
    },
    {
      id: 2,
      name: "TechCorp RH",
      lastMessage: "Merci pour votre candidature",
      unread: 0,
      timestamp: "hier",
    },
  ])

  const [selectedConversation, setSelectedConversation] = useState(1)
  const [messages, setMessages] = useState([
    { id: 1, sender: "Alice Martin", text: "Bonjour!", timestamp: "10:00" },
    { id: 2, sender: "Me", text: "Salut, ça va?", timestamp: "10:05" },
    { id: 3, sender: "Alice Martin", text: "Oui très bien, toi?", timestamp: "10:10" },
  ])
  const [newMessage, setNewMessage] = useState("")

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          sender: "Me",
          text: newMessage,
          timestamp: new Date().toLocaleTimeString("fr-FR", {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ])
      setNewMessage("")
    }
  }

  return (
    <div className="page-container">
      <Navigation userType={currentUser?.type} onLogout={onLogout} />

      <main className="messages-container">
        <div className="conversations-list">
          <h2>Conversations</h2>
          {conversations.map((conv) => (
            <div
              key={conv.id}
              className={`conversation-item ${selectedConversation === conv.id ? "active" : ""}`}
              onClick={() => setSelectedConversation(conv.id)}
            >
              <div className="conversation-info">
                <h3>{conv.name}</h3>
                <p>{conv.lastMessage}</p>
              </div>
              <div className="conversation-meta">
                <span className="timestamp">{conv.timestamp}</span>
                {conv.unread > 0 && <span className="unread-badge">{conv.unread}</span>}
              </div>
            </div>
          ))}
        </div>

        <div className="messages-view">
          <div className="messages-header">
            <h2>{conversations.find((c) => c.id === selectedConversation)?.name || "Sélectionnez une conversation"}</h2>
          </div>

          <div className="messages-list">
            {messages.map((msg) => (
              <div key={msg.id} className={`message-bubble ${msg.sender === "Me" ? "mine" : "theirs"}`}>
                <p>{msg.text}</p>
                <span className="message-time">{msg.timestamp}</span>
              </div>
            ))}
          </div>

          <form className="message-input-form" onSubmit={handleSendMessage}>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Écrivez votre message..."
              className="message-input"
            />
            <button type="submit" className="btn-primary">
              Envoyer
            </button>
          </form>
        </div>
      </main>
    </div>
  )
}
