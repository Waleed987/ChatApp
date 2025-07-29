# ChatApp

A simple real-time chat application built with React (frontend) and Node.js/Express with Socket.io (backend).

## Features
- Real-time messaging in chat rooms
- Join rooms with a username and room ID
- Responsive, modern UI (React + Tailwind CSS)
- Message history per session
- Room-based message broadcasting

## Project Structure
```
ChatApp/
  client/   # React frontend (Vite)
  server/   # Express + Socket.io backend
```

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm (comes with Node.js)

### 1. Install Dependencies

Open two terminals, one for each part:

#### Client (Frontend)
```
cd client
npm install
```

#### Server (Backend)
```
cd server
npm install
```

### 2. Run the App Locally

#### Start the Backend
```
cd server
node server.js
```
By default, the backend runs on [http://localhost:3000](http://localhost:3000).

#### Start the Frontend
```
cd client
npm run dev
```
By default, the frontend runs on [http://localhost:5173](http://localhost:5173).

### 3. Usage
- Open the frontend in your browser.
- Enter a username and a room ID to join a chat room.
- Start sending and receiving messages in real time with others in the same room.
