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

// Import MainRoutes
import { MainRoutes } from './routes';

export default function App() {

  const [email,setEmail] = useState<string | null>(null);
  const [name,setName] = useState<string | null>(null);
  const [uid,setUid] = useState<string | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  
  
  useEffect(() => {
    function userState () {
        onAuthStateChanged(auth, (user: User | null) => {
            if (user) {
            const uid = user.uid;
            setUid(uid);
            setEmail(user.email);
            setName(user.displayName);
            dispatch(setUser({ uid, email: user.email, name: user.displayName }));
            // ...
            } else {
            setUid(null);
            setEmail(null);
            setName(null);
            dispatch(clearUser());
            }
        });
    }
    userState();
  }, [dispatch,uid,email,name]);

  return (
    <BrowserRouter>
      <Navbar />
      <MainRoutes />
      <Footer />
    </BrowserRouter>
  );
}