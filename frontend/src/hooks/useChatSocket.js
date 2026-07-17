import { useState, useEffect, useRef } from "react";
import { useChatSocket } from "../context/SocketContext";
import { escapeHTML } from "../utils/validations";
import toast from "react-hot-toast";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

export function useChat({ username, isLoggedIn }) {
  const { socket, isConnected } = useChatSocket();
  const [messages, setMessages] = useState([]);
  const [typingUser, setTypingUser] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = (behavior = "smooth") => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior });
    }
  };

  useEffect(() => {
    scrollToBottom(messages.length <= 20 ? "auto" : "smooth");
  }, [messages.length, typingUser]);

  useEffect(() => {
    if (!isLoggedIn) return;
    const fetchHistory = async () => {
      try {
        const response = await fetch(`${API_URL}/api/messages`);
        if (!response.ok) throw new Error("Failed historical validation check");
        const data = await response.json();
        setMessages(data);
      } catch (err) {
        console.error("Context fetch error:", err);
        toast.error("Could not load channel history.");
      }
    };
    fetchHistory();
  }, [isLoggedIn]);

  useEffect(() => {
    if (!isLoggedIn || !isConnected) return;

    socket.emit("join_room", username);

    const handleMessage = (msg) => setMessages((prev) => [...prev, msg]);
    const handleTyping = ({ username: user, typing }) => {
      if (user !== username) setTypingUser(typing ? user : "");
    };
    const handleStatus = (users) => setOnlineUsers(users);

    socket.on("receive_message", handleMessage);
    socket.on("display_typing", handleTyping);
    socket.on("user_status", handleStatus);

    return () => {
      socket.off("receive_message", handleMessage);
      socket.off("display_typing", handleTyping);
      socket.off("user_status", handleStatus);
    };
  }, [isLoggedIn, isConnected, username, socket]);

  const sendNewMessage = (textString) => {
    if (!textString?.trim()) return;
    const cleanText = escapeHTML(textString);
    socket.emit("send_message", { username, text: cleanText });
    socket.emit("typing", { username, typing: false });
  };

  const emitTypingState = (isTyping) => {
    socket.emit("typing", { username, typing: isTyping });
  };

  return { messages, typingUser, onlineUsers, messagesEndRef, sendNewMessage, emitTypingState };
}