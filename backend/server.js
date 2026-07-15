const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js');
const messageRoutes = require('./routes/messageRoutes.js');
const Message = require('./models/message.js'); 
dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);

// Safe fallback for cross-origin mappings if environment vars aren't immediately processed
const ALLOWED_ORIGIN = process.env.FRONTEND_URL || "http://localhost:3000";

// Enable CORS for Express REST routes
app.use(cors({ origin: ALLOWED_ORIGIN }));
app.use(express.json());

// REST API Middleware
app.use('/api/messages', messageRoutes);

// Socket.io Setup with CORS configuration
const io = new Server(server, {
    cors: {
        origin: ALLOWED_ORIGIN,
        methods: ["GET", "POST"]
    }
});

// Active online users tracking map
const activeUsers = new Map();

io.on('connection', (socket) => {
    // ANSI styled logging: Cyan indicates real-time connection events
    console.log('\x1b[36m%s\x1b[0m', `[SOCKET CONNECTED] Client handshake initialized: ${socket.id}`);

    // Join Chat Room / Set Dummy Auth Username
    socket.on('join_room', (username) => {
        if (username && typeof username === 'string') {
            activeUsers.set(socket.id, username.trim());
            
            // Defend against user array amplification by filtering out duplicates using a Set
            const uniqueUsersList = Array.from(new Set(activeUsers.values()));
            io.emit('user_status', uniqueUsersList);
            
            console.log(`[USER SYNCED] User "${username.trim()}" mapped successfully.`);
        }
    });

    // Handle incoming real-time message events
    socket.on('send_message', async (data) => {
        try {
            const { username, text } = data;
            
            // Fail-safe protection inside connection stream pipeline
            if (!username || !text || typeof text !== 'string' || !text.trim()) return;

            const savedMessage = new Message({ 
                username: username.trim(), 
                text: text.trim(),
                timestamp: new Date()
            });
            await savedMessage.save();
            
            // Broadcast the message universally to all connected instances
            io.emit('receive_message', savedMessage);
        } catch (error) {
            // ANSI styled logging: Red signifies backend pipeline errors
            console.error('\x1b[31m%s\x1b[0m', `[SOCKET DATABASE ERROR] Failed to parse stream: ${error.message}`);
        }
    });

    // Typing Indicators
    socket.on('typing', (data) => {
        // broadcast.emit sends the event to everyone EXCEPT the origin socket sender
        socket.broadcast.emit('display_typing', {
            username: data.username,
            typing: data.typing
        });
    });

    // Disconnect handling
    socket.on('disconnect', () => {
        const disconnectedUser = activeUsers.get(socket.id);
        if (disconnectedUser) {
            activeUsers.delete(socket.id);
            
            const uniqueUsersList = Array.from(new Set(activeUsers.values()));
            io.emit('user_status', uniqueUsersList);
            
            // ANSI styled logging: Yellow alerts you to client logouts
            console.log('\x1b[33m%s\x1b[0m', `[SOCKET DISCONNECTED] Client left session: ${disconnectedUser}`);
        }
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log('\x1b[35m%s\x1b[0m', `=====================================================`);
    console.log('\x1b[35m%s\x1b[0m', `  SERVER ENGINE ACTIVE AND RUNNING SAFELY ON PORT ${PORT}`);
    console.log('\x1b[35m%s\x1b[0m', `=====================================================`);
});