import React, { createContext, useContext, useEffect, useState } from 'react';
import { socket } from '../config/socket';
import toast from 'react-hot-toast';

const SocketContext = createContext(null);

export const SocketProvider = ({ children, username }) => {
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    const onConnect = () => setIsConnected(true);
    const onDisconnect = () => setIsConnected(false);
    const onConnectError = (err) => {
      setIsConnected(false);
      toast.error(`Connection lost: ${err.message || 'Server Unreachable'}`);
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("connect_error", onConnectError);

    // Setup handshake details and trigger connection
    if (username && !socket.connected) {
      socket.auth = { username: username.trim() };
      socket.connect();
    }

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("connect_error", onConnectError);
      socket.disconnect();
    };
  }, [username]);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useChatSocket = () => {
  const context = useContext(SocketContext);
  if (!context) throw new Error("useChatSocket must be wrapped inside a <SocketProvider />");
  return context;
};