import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import axios from "axios";

import Login from "./components/Login";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import MessageStream from "./components/MessageStream";
import InputBar from "./components/InputBar";

import "./App.css";

// ====================== CONFIG ======================
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

// Create socket only once
const socket = io(API_URL, {
  transports: ["websocket"],
  withCredentials: true,
});

function App() {
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const [typingUser, setTypingUser] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);

  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  // ====================== INITIAL LOAD ======================
  useEffect(() => {
    if (!isLoggedIn) return;

    const fetchMessages = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/messages`);
        setMessages(res.data);
      } catch (err) {
        console.error("Unable to fetch messages", err);
      }
    };

    fetchMessages();

    socket.emit("join_room", username);

    socket.on("receive_message", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    socket.on("display_typing", ({ username: user, typing }) => {
      if (user !== username) {
        setTypingUser(typing ? user : "");
      }
    });

    socket.on("user_status", (users) => {
      setOnlineUsers(users);
    });

    return () => {
      socket.off("receive_message");
      socket.off("display_typing");
      socket.off("user_status");
    };
  }, [isLoggedIn, username]);

  // ====================== AUTO SCROLL ======================
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, typingUser]);

  // ====================== LOGIN ======================
  const handleLogin = (e) => {
    e.preventDefault();

    if (!username.trim()) return;

    setIsLoggedIn(true);
  };

  // ====================== SEND ======================
  const handleSend = (e) => {
    e.preventDefault();

    if (!message.trim()) return;

    socket.emit("send_message", {
      username,
      text: message,
    });

    socket.emit("typing", {
      username,
      typing: false,
    });

    setMessage("");
  };

  // ====================== TYPING ======================
  const handleTyping = () => {
    socket.emit("typing", {
      username,
      typing: true,
    });

    clearTimeout(typingTimeoutRef.current);

    typingTimeoutRef.current = setTimeout(() => {
      socket.emit("typing", {
        username,
        typing: false,
      });
    }, 2000);
  };

  if (!isLoggedIn) {
    return (
      <Login
        username={username}
        setUsername={setUsername}
        onLogin={handleLogin}
      />
    );
  }

  return (
    <div className="app-layout">
      {/* FIXED: Passing down onlineCount so it can render on mobile devices */}
      <Header username={username} onlineCount={onlineUsers.length} />

      <div className="main-content">
        <Sidebar
          onlineUsers={onlineUsers}
          currentUsername={username}
        />

        <main className="chat-window-container">
          <MessageStream
            messages={messages}
            currentUsername={username}
            typingUser={typingUser}
            messagesEndRef={messagesEndRef}
          />

          <InputBar
            message={message}
            setMessage={setMessage}
            onSend={handleSend}
            onTyping={handleTyping}
          />
        </main>
      </div>
    </div>
  );
}

export default App;