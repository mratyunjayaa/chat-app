import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import Login from './components/Login';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MessageStream from './components/MessageStream';
import InputBar from './components/InputBar';
import './App.css';

const socket = io(process.env.REACT_APP_API_URL || 'http://localhost:5000');

function App() {
    const [username, setUsername] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [typingUser, setTypingUser] = useState('');
    const [onlineUsers, setOnlineUsers] = useState([]);
    const messagesEndRef = useRef(null);
    const typingTimeoutRef = useRef(null);

    useEffect(() => {
        if (!isLoggedIn) return;

        // Fetch message history from REST API
        axios.get(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/messages`)
            .then(res => setMessages(res.data))
            .catch(err => console.error("Could not fetch history", err));

        // Real-Time Socket Connection Orchestration
        socket.emit('join_room', username);

        socket.on('receive_message', (newMessage) => {
            setMessages((prev) => [...prev, newMessage]);
        });

        socket.on('display_typing', (data) => {
            if (data.username !== username) {
                setTypingUser(data.typing ? data.username : '');
            }
        });

        socket.on('user_status', (usersList) => {
            setOnlineUsers(usersList);
        });

        return () => {
            socket.off('receive_message');
            socket.off('display_typing');
            socket.off('user_status');
        };
    }, [isLoggedIn, username]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, typingUser]);

    const handleLogin = (e) => {
        e.preventDefault();
        if (username.trim()) setIsLoggedIn(true);
    };

    const handleSend = (e) => {
        e.preventDefault();
        if (message.trim()) {
            socket.emit('send_message', { username, text: message });
            socket.emit('typing', { username, typing: false });
            setMessage('');
        }
    };

    const handleTyping = () => {
        socket.emit('typing', { username, typing: true });

        if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

        typingTimeoutRef.current = setTimeout(() => {
            socket.emit('typing', { username, typing: false });
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
            <Header username={username} />

            <div className="main-content">
                <Sidebar onlineUsers={onlineUsers} currentUsername={username} />

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