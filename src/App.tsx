import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer/Footer';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './store';
import { auth } from './firebase/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { clearUser, setUser } from './redux/users/userSlice';
import { getJwtToken } from './services/authService'; // Import this

import { MainRoutes } from './routes';
import AuthRedirect from './components/AuthRedirect/AuthRedirect';
import { ToastContainer } from 'react-toastify';

export default function App() {

  const [email,setEmail] = useState<string | null>(null);
  const [name,setName] = useState<string | null>(null);
  const [uid,setUid] = useState<string | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  
  
  useEffect(() => {
    function userState () {
        onAuthStateChanged(auth, async (user: User | null) => {
            if (user) {
              const uid = user.uid;
              setUid(uid);
              setEmail(user.email);
              setName(user.displayName);
              dispatch(setUser({ uid, email: user.email, name: user.displayName }));
              
              // Get JWT token on login or page refresh
              const token = localStorage.getItem('jwtToken');
              if (!token) {
                try {
                  await getJwtToken();
                } catch (error) {
                  console.error('Failed to get JWT token:', error);
                }
              }
            } else {
              setUid(null);
              setEmail(null);
              setName(null);
              dispatch(clearUser());
              // Clear JWT token when logged out
              localStorage.removeItem('jwtToken');
            }
        });
    }
    userState();
  }, [dispatch]); 

  return (
    <BrowserRouter>
      <AuthRedirect />
      <Navbar />
      <MainRoutes />
      <Footer />
      <ToastContainer />
    </BrowserRouter>
  );
}