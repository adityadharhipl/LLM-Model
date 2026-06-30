# ChatBot AI - Frontend

This is the frontend application for the ChatBot AI project. It provides a sleek, modern, and highly responsive user interface designed to interact seamlessly with multiple AI models through the backend service.

## 🚀 Features

- **Modern UI/UX:** Built with React 19 and Tailwind CSS v4 for a premium, dark-themed user experience.
- **Responsive Design:** Fully responsive layout that works flawlessly on mobile, tablet, and desktop devices.
- **Markdown & Code Highlighting:** Renders rich markdown formatting and syntax-highlighted code blocks perfectly.
- **Emoji Support:** Built-in emoji picker for expressive chat messages.
- **Real-time Interaction:** Smooth and fast interactions with active typing indicators and auto-scrolling.
- **Multiple AI Providers:** Choose between various AI providers (OpenAI, Gemini, Groq, HuggingFace, XAI) directly from the UI.
- **Chat Management:** Create, rename, delete, and search through your past conversations.
- **Authentication:** Secure user login and signup flows.

## 🛠️ Tech Stack

- **Framework:** [React 19](https://react.dev/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Routing:** [React Router DOM](https://reactrouter.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Markdown Parsing:** [React Markdown](https://github.com/remarkjs/react-markdown) & [React Syntax Highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter)
- **HTTP Client:** [Axios](https://axios-http.com/)
- **Notifications:** [React Hot Toast](https://react-hot-toast.com/)

## 📦 Prerequisites

Make sure you have the following installed on your machine:
- Node.js (v18 or higher recommended)
- npm or yarn

## 💻 Installation & Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd Frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root of the `Frontend` directory and add your backend API URL (if different from default):
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`.

## 📜 Available Scripts

- `npm run dev` - Starts the development server with Vite.
- `npm run build` - Builds the app for production to the `dist` folder.
- `npm run preview` - Locally preview the production build.
- `npm run lint` - Runs Oxlint to check for code issues.

## 📁 Project Structure

```
Frontend/
├── public/             # Static assets (favicon, etc.)
├── src/
│   ├── components/     # Reusable UI components (Sidebar, Navbar, ChatWindow, etc.)
│   ├── context/        # React Context providers (AuthContext, ChatContext)
│   ├── hooks/          # Custom React hooks
│   ├── pages/          # Application pages (Home, Login, Signup)
│   ├── utils/          # Utility functions and helpers
│   ├── App.jsx         # Main application component & routing
│   ├── index.css       # Global styles and Tailwind configuration
│   └── main.jsx        # Application entry point
├── index.html          # HTML template
├── package.json        # Dependencies and scripts
└── vite.config.js      # Vite configuration
```
