import { initializeApp } from 'firebase/app';
import { browserPopupRedirectResolver, browserSessionPersistence, getAuth, GoogleAuthProvider, initializeAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDavbN_OB-27i9yQrO-enuSzScpZbKsuME",
    authDomain: "shoply-0.firebaseapp.com",
    projectId: "shoply-0",
    storageBucket: "shoply-0.firebasestorage.app",
    messagingSenderId: "50857483784",
    appId: "1:50857483784:web:ae6892d427f4b23bd83bbd"
  };

const firebaseApp = initializeApp(firebaseConfig);

export const googleProvider = new GoogleAuthProvider(firebaseApp);
export const auth = getAuth(firebaseApp);
// export const auth = () => initializeAuth(firebaseApp, {
//     persistence: browserSessionPersistence,
//     popupRedirectResolver: browserPopupRedirectResolver,
//   });
export default firebaseApp;