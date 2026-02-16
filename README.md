# Real-Time Chat Application

A full-stack real-time chat application built with the **MERN** stack (MongoDB, Express, React, Node.js) and **Socket.io**. This application features real-time messaging, user authentication, profile management, and a modern responsive UI.

## 🚀 Features

-   **Real-time Messaging**: Instant message delivery using Socket.io.
-   **User Authentication**: Secure Sign Up, Login, and Logout functionality using JWT and HTTP-only cookies.
-   **Profile Management**: Update user profiles, including profile picture uploads via Cloudinary.
-   **Online Status**: Real-time online/offline user status updates.
-   **Responsive UI**: Modern and responsive design using Tailwind CSS and DaisyUI.
-   **State Management**: Efficient global state management using Zustand.
-   **Toast Notifications**: Interactive notifications for user actions.

## 🛠️ Tech Stack

### Frontend
-   **React**: UI Library
-   **Vite**: Build tool
-   **Tailwind CSS**: Utility-first CSS framework
-   **DaisyUI**: Component library for Tailwind
-   **Zustand**: State management
-   **Axios**: HTTP client
-   **React Router DOM**: Client-side routing
-   **React Hot Toast**: Notifications
-   **Lucide React**: Icons

### Backend
-   **Node.js**: JavaScript runtime
-   **Express.js**: Web framework
-   **MongoDB**: NoSQL Database
-   **Mongoose**: ODM for MongoDB
-   **Socket.io**: Real-time bidirectional event-based communication
-   **JWT (JSON Web Tokens)**: Authentication
-   **Bcryptjs**: Password hashing
-   **Cloudinary**: Cloud storage for images
-   **Cookie Parser**: Parse HTTP cookies

## 📂 Project Structure

```
root/
├── backend/          # Backend server code
│   ├── src/
│   │   ├── controllers/
│   │   ├── lib/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── index.js
│   └── package.json
└── frontend/         # Frontend React application
    ├── public/
    ├── src/
    │   ├── components/
    │   ├── constants/
    │   ├── lib/
    │   ├── pages/
    │   ├── store/
    │   ├── App.jsx
    │   └── main.jsx
    └── package.json
```

## ⚙️ Installation & Setup

### Prerequisites
-   Node.js (v14+ recommended)
-   MongoDB (Local or AtlasURI)
-   Cloudinary Account (for image uploads)

### 1. Clone the repository
```bash
git clone <repository-url>
cd <repository-directory>
```

### 2. Backend Setup
Navigate to the backend directory and install dependencies:
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory and add the following variables:
```env
PORT=5001
MONGO_URL=mongodb+srv://<your_mongo_url>
MY_SECRET=your_jwt_secret_key
NODE_ENV=development
CLOUDINAR_NAME=your_cloudinary_name
CLOUDINAR_API=your_cloudinary_api_key
CLOUDINAR_SECRET=your_cloudinary_secret
```

Start the backend server:
```bash
npm run dev
```

### 3. Frontend Setup
Open a new terminal, navigate to the frontend directory and install dependencies:
```bash
cd frontend
npm install
```

Start the frontend development server:
```bash
npm run dev
```

<!-- ## 📸 Screenshots

*(Add screenshots of your application here)* -->

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
