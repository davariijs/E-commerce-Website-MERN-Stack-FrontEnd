import React, { Fragment, useState } from "react";
import {Icon} from 'react-icons-kit';
import {eyeOff} from 'react-icons-kit/feather/eyeOff';
import {eye} from 'react-icons-kit/feather/eye'
import { Link,useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import loginImage from "../../assets/images/signup-image.webp"
import "./login-signup.css";
import { auth,googleProvider } from "../../firebase/firebase"; 
import { signInWithPopup,createUserWithEmailAndPassword } from "firebase/auth";
import { Img } from "react-image";
import { ToastContainer, toast } from 'react-toastify';
import { verifyJwtToken } from "src/services/authService";

export default function Signup() {

    const [password, setPassword] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [type, setType] = useState<string>('password');
    const [privacy, setPrivacy] = useState<boolean>(false);
    const [subscribe, setSubscribe] = useState<boolean>(false);
    const [errorPrivacy, setErrorPrivacy] = useState<string>("");
    const [icon, setIcon] = useState(eyeOff);
    const navigate = useNavigate();  

    const notifySuccess = (message:string) => toast.success(message, { position: "bottom-right" });
    const notifyError = (message:string) => toast.error(message, { position: "bottom-right" });


    const handleRegisterGoogle = async (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    signInWithPopup(auth, googleProvider)
    .then(async (result) => {
        try {
            // Get Firebase token
            const firebaseToken = await result.user.getIdToken();
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
                // Verify JWT immediately
                await verifyJwtToken();
                notifySuccess("You have successfully signed up!");
                setTimeout(() => navigate("/account"), 3000);
            } else {
                throw new Error('Failed to get JWT token');
            }
        } catch (error) {
            console.error("Error getting JWT token:", error);
            notifyError("Authentication error occurred");
        }
    }).catch((error) => {
        notifyError(error.message);
    });
}


    const signupEmail = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        if (!privacy) {
        setErrorPrivacy("You must agree to the Privacy Policy");
        return;
        }
    
        try {
        // Create a new user with Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        // Get Firebase token and exchange for JWT
        try {
            const firebaseToken = await user.getIdToken();
            
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
                // Verify JWT immediately
                await verifyJwtToken();
            } else {
                console.error("Failed to get JWT token");
            }
        } catch (tokenError) {
            console.error("Error exchanging token:", tokenError);
        }
        
        // Reset form states after successful signup
        setErrorMessage("");
        setEmail("");
        setPassword("");
        setSubscribe(false);
        setPrivacy(false);
        setErrorPrivacy("");
        
        notifySuccess("You have successfully signed up!")
        setTimeout(() => navigate("/account"), 3000);
        } catch (error:any) {
        console.error("Error during signup:", error);
        const errorMessagePassword = error.message;
        setErrorMessage(errorMessagePassword);
        notifyError(error.message);
        if (!privacy) {
            setErrorPrivacy("You must agree to the Privacy Policy");
        }
        }
    };

    

    const handleToggle = () => {
        if (type==='password'){
           setIcon(eye);
           setType('text')
        } else {
           setIcon(eyeOff)
           setType('password')
        }
     }

    return(
        <Fragment>
            <div className="relative">
            <div className="md:grid md:grid-cols-2 flex flex-col-reverse ">
                <div className="">
                    <Img
                    src={loginImage}
                    loader={<span></span>}
                    unloader={<span>...</span>}
                    className="h-screen w-full  md:relative  absolute top-0 -z-10" 
                    alt="clothes"
                    />
                </div>

                <div className="mx-0 pt-10 md:pb-0 pb-10 md:mx-auto md:px-4 px-6 bg-white bg-opacity-75">
                    <div className="">
                    <h2 className="font-bold text-3xl text-darkText md:text-left  text-center ">Sign Up</h2>
                    <button onClick={handleRegisterGoogle} className="rounded-lg border-2 w-full text-primary font-medium text-xl border-darkText flex justify-center items-center py-4 px-5 mt-11 mb-5"><FcGoogle className="w-5 h-5 mr-2"/>Continue With Google</button>


                    <form onSubmit={signupEmail}>
                    <div className="mt-11">
                    <label className="font-medium text-lg text-darkText ">Email Address</label>
                    <input onChange={(e)=> setEmail(e.target.value)} value={email}  className="rounded-lg border-2 w-full border-borderLight border-opacity-80 py-4 px-4 mt-2 mb-2" type="text" name="" id="" placeholder="example@gmail.com"/>
                    <span className="font-medium text-red text-sm"><h5>{errorMessage}</h5></span>
                    </div>

                    <div>
                    <div className="font-medium text-lg text-darkText flex justify-between items-center mt-3"><label>Password</label> <span onClick={handleToggle} className="flex justify-center items-center text-grayText"><Icon className="absolute mr-8" icon={icon} size={20}/></span></div>
                    <input autoComplete="current-password" onChange={(e)=> setPassword(e.target.value)} value={password} className="rounded-lg border-2 w-full border-borderLight border-opacity-80 py-4 px-4 mt-2 mb-2"   type={type} name="" id=""/>
                    <span className="font-medium text-xs text-grayText"><h5>Use 8 or more characters with a mix of letters, numbers & symbols</h5></span>
                    </div>
                    
                    <div className="mt-8"><span className="font-medium text-red text-sm"><h5>{errorPrivacy}</h5></span></div>
                    <div className="w-full flex items-center">
                        <div className=" rounded-lg ">
                        <input onChange={(e)=> setPrivacy(!privacy)} checked={privacy}  className=" rounded-lg  w-full  font-normal text-grayText" type="checkbox" id="privacy" name="privacy" />
                        </div>
                            <label htmlFor="privacy" className="pl-2 text-lg font-normal text-grayText">Agree to our Terms of use and Privacy Policy </label>
                    </div>
                    
                            <div className="w-full mt-2 flex items-center">
                            <div className=" rounded-lg ">
                            <input onChange={(e)=> setSubscribe(!subscribe)} checked={subscribe} className=" rounded-lg  w-full  font-normal text-grayText" type="checkbox" id="subscribe" name="subscribe" />
                            </div>
                                <label htmlFor="subscribe" className="pl-2 text-lg font-normal text-grayText">Subscribe to our monthly newsletter</label>
                            
                            </div>

                    <div className="mt-11">
                        <button className="bg-primary rounded-lg text-white px-5 py-4 text-center items-center md:w-40 w-full mb-2">Sign Up</button>
                        <h4 className="font-medium text-base text-grayText">Already have an  account?<Link to="/login" className="underline">Log in</Link></h4>
                    </div>
                    </form>
                    
                    </div>
                    
                </div>
            </div>
            </div>
            <ToastContainer/> 
        </Fragment>
    )
}