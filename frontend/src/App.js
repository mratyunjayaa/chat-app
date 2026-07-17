import React, { useState } from "react";
import { Toaster, toast } from "react-hot-toast";

// Context Architecture & Custom Stream Hooks
import { SocketProvider } from "./context/SocketContext";
import { useChat } from "./hooks/useChatSocket";
import { validateUsername } from "./utils/validations";

// Modular Presentation Layout Components
import Login from "./components/Login";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import MessageStream from "./components/MessageStream";
import InputBar from "./components/InputBar";

import './index.css';


function ChatDashboard({ username }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Consume our unified data stream hooks layer
  const { 
    messages, 
    typingUser, 
    onlineUsers, 
    messagesEndRef, 
    sendNewMessage, 
    emitTypingState 
  } = useChat({ username, isLoggedIn: true });

  return (
    <div className="flex flex-col h-screen w-screen bg-slate-100 overflow-hidden font-sans antialiased">
      {/* Global Top Navigation Header */}
      <Header 
        username={username} 
        onlineCount={onlineUsers.length} 
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
      />
      
      {/* Primary Workspace Viewport Layout */}
      <div className="flex flex-1 h-[calc(100vh-64px)] overflow-hidden relative">
        {/* Dynamic Responsive Sidebar Drawer Panel */}
        <Sidebar 
          onlineUsers={onlineUsers} 
          currentUsername={username} 
          isMobileOpen={isSidebarOpen} 
          onCloseSidebar={() => setIsSidebarOpen(false)} 
        />
        
        {/* Central Chat Stream Message Window Layout */}
        <main className="flex flex-col flex-1 bg-slate-50 overflow-hidden w-full h-full relative">
          <MessageStream 
            messages={messages} 
            currentUsername={username} 
            typingUser={typingUser} 
            messagesEndRef={messagesEndRef} 
          />
          
          {/* Input control block handles internal state buffers natively */}
          <InputBar 
            onSend={sendNewMessage} 
            onTyping={emitTypingState} 
          />
        </main>
      </div>
    </div>
  );
}

/**
 * Main Application Shell Container
 * Manages authorization states, connection trees, and hot toast notification contexts.
 */
function App() {
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    
    // Process input text strings through our regex sanitation pipeline
    if (!validateUsername(username)) {
      toast.error("Invalid handle! Use 2-25 alphanumeric characters (no spaces).");
      return;
    }
    
    setIsLoading(true);
    
    // Simulate connection lag to provide smooth UI transition states
    setTimeout(() => {
      setIsLoggedIn(true);
      setIsLoading(false);
      toast.success(`Welcome back, ${username}!`);
    }, 600);
  };

  return (
    <>
      {/* Global Toast Provider Layout Portal */}
      <Toaster position="top-center" />
      
      {!isLoggedIn ? (
        <Login 
          username={username} 
          setUsername={setUsername} 
          onLogin={handleLoginSubmit} 
          isLoading={isLoading} 
        />
      ) : (
        // Wrap the dashboard securely inside the WebSocket provider node tree
        <SocketProvider username={username}>
          <ChatDashboard username={username} />
        </SocketProvider>
      )}
    </>
  );
}

export default App;