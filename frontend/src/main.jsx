import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import Login from './Pages/Login.jsx';
import LandingPage from './Pages/LandingPage.jsx';
import About from './Pages/About.jsx';
import Features from './Pages/Features.jsx';
import ContactUs from './Pages/ContactUs.jsx';
import Register from './Pages/Register.jsx';
import Chat from './Pages/Chat.jsx';
import SetAvatar from './Components/SetAvatar.jsx';
import ChatContainer from './components/ChatContainer.jsx';
// import NotFound from './Pages/NotFound.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/* <Route path="/reset-password" element={<PasswordReset />} /> */}
      <Route path="/about" element={<About />} />
      <Route path="/features" element={<Features />} />
      <Route path="/contact" element={<ContactUs />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/set-avatar" element={<SetAvatar />} />
      <Route path="/chat-container" element={<ChatContainer />} />
      {/* <Route path="*" element={<NotFound />} /> */}
    </Route>
  )
);

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
