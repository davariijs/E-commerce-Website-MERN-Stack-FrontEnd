import React, { Fragment, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import loginImage from '../../assets/images/login-image.webp';
import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye';
import { auth, googleProvider } from '../../firebase/firebase';
import { ToastContainer, toast } from 'react-toastify';
import { signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import './login-signup.css';
import { Img } from 'react-image';
import { verifyJwtToken } from 'src/services/authService';

export default function Login() {
  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [type, setType] = useState<string>('password');
  const [icon, setIcon] = useState(eyeOff);
  const navigate = useNavigate();

  const handleToggle = () => {
    if (type === 'password') {
      setIcon(eye);
      setType('text');
    } else {
      setIcon(eyeOff);
      setType('password');
    }
  };

  const notifySuccess = (message: string) => toast.success(message, { position: 'bottom-right' });
  const notifyError = (message: string) => toast.error(message, { position: 'bottom-right' });

  const handleLoginGoogle = async () => {
    signInWithPopup(auth, googleProvider)
      .then(async result => {
        try {
          // Get Firebase token
          const firebaseToken = await result.user.getIdToken();

          // Exchange for JWT
          const response = await fetch(`${process.env.REACT_APP_URL_API}/api/auth/token`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ firebaseToken }),
          });

          if (response.ok) {
            const data = await response.json();
            localStorage.setItem('jwtToken', data.token);

            // Verify JWT
            await verifyJwtToken();

            notifySuccess('You have successfully logged in!');
            setTimeout(() => navigate('/account'), 3000);
          } else {
            throw new Error('Failed to get JWT token');
          }
        } catch (error) {
          console.error('Error getting JWT token:', error);
          notifyError('Authentication error occurred');
        }
      })
      .catch(error => {
        notifyError(error.message);
      });
  };

  const signinEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then(async userCredential => {
        try {
          // Get Firebase token
          const firebaseToken = await userCredential.user.getIdToken();
          console.log('Firebase token obtained');

          // Exchange for JWT
          const response = await fetch(`${process.env.REACT_APP_URL_API}/api/auth/token`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ firebaseToken }),
          });

          if (response.ok) {
            const data = await response.json();
            localStorage.setItem('jwtToken', data.token);

            // Verify JWT
            await verifyJwtToken();

            notifySuccess('You have successfully logged in!');
            setTimeout(() => navigate('/account'), 3000);
          } else {
            throw new Error(`Failed to get JWT token: ${response.status}`);
          }
        } catch {
          notifyError('Authentication error occurred');
        }
      })
      .catch(error => {
        notifyError(error.message);
        setErrorMessage(error.message);
      });
  };

  return (
    <Fragment>
      <div className="relative">
        <div className="md:grid md:grid-cols-2 flex flex-col-reverse ">
          <div className="">
            <Img
              src={loginImage}
              loader={<span></span>}
              unloader={<span>...</span>}
              className="h-screen w-full md:relative  absolute top-0 -z-10"
              alt="clothes"
            />
          </div>

          <div className="mx-0 pt-10 md:pb-0 pb-10 md:mx-auto md:px-0 px-6 bg-white bg-opacity-75">
            <div className="">
              <h2 className="font-bold text-3xl text-darkText md:text-left  text-center ">LogIn</h2>
              <button
                onClick={handleLoginGoogle}
                className="rounded-lg border-2 w-full text-primary font-medium text-xl border-darkText flex justify-center items-center py-4 px-5 mt-11 mb-5"
              >
                <FcGoogle className="w-5 h-5 mr-2" />
                Continue With Google
              </button>

              <div className="flex text-grayText justify-center text-center items-center">
                <div className="w-full divPart rounded-lg bg-grayText mr-4"></div>
                <h5>OR</h5>
                <div className="w-full divPart rounded-lg bg-grayText ml-4"></div>
              </div>

              <form onSubmit={e => signinEmail(e)}>
                <div className="mt-8">
                  <label className="font-medium text-lg text-darkText ">Email address</label>
                  <input
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    className="rounded-lg border-2 w-full border-darkText py-4 px-4 mt-2"
                    type="text"
                    name=""
                    id=""
                  />
                  <span className="font-medium text-red text-sm">
                    <h5>{errorMessage}</h5>
                  </span>
                </div>

                <div>
                  <div className="font-medium text-lg text-darkText flex justify-between items-center mt-8">
                    <label>Password</label>{' '}
                    <span
                      onClick={handleToggle}
                      className="flex justify-center items-center text-grayText"
                    >
                      <Icon className="absolute mr-8" icon={icon} size={20} />
                    </span>
                  </div>
                  <input
                    autoComplete="current-password"
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    className="rounded-lg border-2 w-full border-darkText py-4 px-4 mt-2 mb-2"
                    type={type}
                    name=""
                    id=""
                  />
                  <Link
                    to="/reset-password"
                    className="font-medium text-base text-darkText text-right underline"
                  >
                    <h5>Forget your password</h5>
                  </Link>
                </div>

                <div className="mt-11">
                  <button className="bg-primary rounded-lg text-white px-5 py-4 text-center items-center md:w-40 w-full mb-2">
                    Sign In
                  </button>
                  <h4 className="font-medium text-base text-darkText">
                    Don’t have an account?
                    <Link to="/sign-up" className="underline">
                      Sign up
                    </Link>
                  </h4>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </Fragment>
  );
}
