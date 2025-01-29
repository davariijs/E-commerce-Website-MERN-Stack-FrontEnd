import { initializeApp } from 'firebase/app';
import {  getAuth, GoogleAuthProvider} from "firebase/auth";


const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY_FIREBASE,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN_FIREBASE,
    projectId: process.env.REACT_APP_PROJECT_ID_FIREBASE,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET_FIREBASE,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID_FIREBASE,
    appId: process.env.REACT_APP_APP_ID_FIREBASE
  };

const firebaseApp = initializeApp(firebaseConfig);

export const googleProvider = new GoogleAuthProvider(firebaseApp);
export const auth = getAuth(firebaseApp);
export default firebaseApp;