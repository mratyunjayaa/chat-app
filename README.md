# 💬 Real-Time Chat Application

A full-stack real-time chat application built using **React**, **Node.js**, **Express**, **Socket.IO**, and **MongoDB**.

The application enables multiple users to communicate instantly through WebSockets while persisting chat history in MongoDB. It follows a clean separation between frontend and backend with a scalable project structure.

---

# Live 

https://chat-bros.netlify.app

# 🚀 Features

- ⚡ Real-time messaging using Socket.IO
- 👥 Online user list
- 💾 Persistent chat history (MongoDB)
- 📱 Responsive UI
- 🔄 Automatic message updates without refresh
- 🌐 REST API for fetching previous messages
- 🔌 WebSocket communication
- 🎨 Clean modern interface

---

# 🛠 Tech Stack

## Frontend

- React.js
- Axios
- Socket.IO Client
- CSS3

## Backend

- Node.js
- Express.js
- Socket.IO
- MongoDB
- Mongoose
- Dotenv
- CORS

---

# 📁 Project Structure

```
CHATAPP
│
├── backend
│   ├── config
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── server.js
│   ├── package.json
│   └── .env
│
└── frontend
    ├── public
    ├── src
    │   ├── components
    │   │   ├── Header.js
    │   │   ├── Sidebar.js
    │   │   ├── Login.js
    │   │   ├── MessagesStream.js
    │   │   └── InputBar.jsx
    │   │
    │   ├── App.js
    │   ├── App.css
    │   └── index.js
    │
    └── package.json
```

---

# ⚙️ Project Setup

## 1. Clone Repository

```bash
git clone https://github.com/mratyunjayaa/chat-app.git
cd chat-app
```

---

# 🔧 Backend Setup

Navigate to backend folder

```bash
cd backend
```

Install dependencies

```bash
npm install
```

Create a `.env` file

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string
```

Run development server

```bash
npm run dev
```

Backend starts on

```
http://localhost:5000
```

---

# 💻 Frontend Setup

Open another terminal

```bash
cd frontend
```

Install dependencies

```bash
npm install
```

Run React application

```bash
npm start
```

Frontend starts on

```
http://localhost:3000
```

---

# 🌍 Environment Variables

Backend requires a `.env` file.

Example:

```env
PORT=5000

MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/chatdb
```

| Variable | Description |
|----------|-------------|
| PORT | Backend server port |
| MONGO_URI | MongoDB Connection String |

---

# 🔗 API Endpoints

## Get All Messages

```
GET /api/messages
```

Returns previous chat messages.

---

# Socket Events

## Client → Server

| Event | Description |
|--------|-------------|
| join | User joins chat |
| sendMessage | Send new message |

---

## Server → Client

| Event | Description |
|--------|-------------|
| receiveMessage | Receive new message |
| onlineUsers | Current online users |

---

# 🏗 Design Decisions

### Frontend

- React functional components
- Component-based architecture
- Axios used for REST API communication
- Socket.IO Client used for real-time events
- Separate reusable UI components

### Backend

- MVC-inspired folder structure
- Controllers handle business logic
- Routes manage API endpoints
- Models define MongoDB schemas
- Socket.IO handles live communication
- MongoDB stores persistent messages

### Database

MongoDB was chosen because:

- Easy integration with Node.js
- Flexible schema
- Suitable for chat applications
- Fast document-based storage

---

# ✅ Assumptions Made

- Username is entered manually (no authentication).
- All connected users join the same global chat room.
- Messages are visible to every connected user.
- MongoDB is running and accessible.
- Internet connection is available for Socket.IO communication.

---

# Features

| Feature | Status |
|----------|--------|
| Username Login | ✅ |
| MongoDB Storage | ✅ |
| Real-Time Messaging | ✅ |
| Online Users | ✅ |
| Socket.IO Integration | ✅ |
| Responsive UI | ✅ |
| Typing Indicator | ✅|
| Read/Delivered Status | ✅ |
| Online/Offline Status | ✅ |
| Deployment | ✅ |

---

# 🚀 Deployment

## Backend

- Render

---

## Frontend

- Netlify

---

# 📦 Dependencies

## Frontend

```
React
Axios
Socket.IO Client
```

## Backend

```
Express
Socket.IO
MongoDB
Mongoose
CORS
Dotenv
Nodemon
```

---

## 📸 Screenshots

### 🔐 Login Screen

<p align="center">
  <img src="https://github.com/user-attachments/assets/5987c548-6b7a-49bb-8d85-2984d0e13afa" alt="Login Screen" width="900">
</p>

---

### 💬 Chat Interface

<p align="center">
  <img src="https://github.com/user-attachments/assets/3ac16b8b-af18-4554-8dad-7dfc02b245cf" alt="Chat Interface 1" width="900">
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/bdf162a2-3161-446b-8e42-e1216986e997" alt="Chat Interface 2" width="900">
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/e0fd720f-aa4b-4aca-8573-6892bb193ff9" alt="Chat Interface 3" width="900">
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/f605a412-ebd5-4b3f-8a5f-a73336d7958d" alt="Chat Interface 4" width="900">
</p>



```

---

# 🔮 Future Improvements

- JWT Authentication
- Private Chat
- Group Chat
- Image Sharing
- Emoji Picker
- File Upload
- Voice Messages
- Read Receipts
- Typing Indicator
- Message Reactions
- User Profile
- Search Messages
- Notifications
- Dark / Light Theme

---

# 👨‍💻 Author

**Vishal Tomar**

Backend Developer | Full Stack Developer

---

If you found this project useful, don't forget to ⭐ the repository.
