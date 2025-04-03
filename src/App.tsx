import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer/Footer';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './store';
import { auth } from './firebase/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { clearUser, setUser } from './redux/users/userSlice';
import { getJwtToken } from './services/authService';

import { MainRoutes } from './routes';

export default function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    function userState() {
      onAuthStateChanged(auth, async (user: User | null) => {
        if (user) {
          const uid = user.uid;
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
      <Navbar />
      <MainRoutes />
      <Footer />
    </BrowserRouter>
  );
}
