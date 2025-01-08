import React, { Fragment, useState } from "react";
import {Icon} from 'react-icons-kit';
import {eyeOff} from 'react-icons-kit/feather/eyeOff';
import {eye} from 'react-icons-kit/feather/eye'
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FcPhone } from "react-icons/fc";
import loginImage from "../../assets/images/signup-image.webp"
import "./login-signup.css";
import { auth,googleProvider } from "../../firebase/firebase"; 
import { signInWithPopup, GoogleAuthProvider,RecaptchaVerifier, signInWithPhoneNumber, fetchSignInMethodsForEmail, createUserWithEmailAndPassword } from "firebase/auth";


export default function Signup() {

    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [type, setType] = useState('password');
    const [icon, setIcon] = useState(eyeOff);
    console.log(email,password);

    

    const handleRegisterGoogle = async (e) => {
        signInWithPopup(auth, googleProvider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // IdP data available using getAdditionalUserInfo(result)
            // ...
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
    } 

    const requestOTP = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessagePassword = error.message;
            setErrorMessage(errorMessagePassword)
            // ..
        });
    }

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
            <div className="md:grid md:grid-cols-2 ">
                <div className="">
                    <img src={loginImage} className="h-screen w-full" alt="clothes"/>
                </div>

                <div className="mx-14 pt-10 md:mx-auto md:px-4">
                    <div className="">
                    <h2 className="font-bold text-3xl text-darkText md:text-left  text-center ">Sign Up</h2>
                    <button onClick={handleRegisterGoogle} className="rounded-lg border-2 w-full text-primary font-medium text-xl border-darkText flex justify-center items-center py-4 px-5 mt-11 mb-5"><FcGoogle className="w-5 h-5 mr-2"/>Continue With Google</button>
                    <button onClick={requestOTP} className="rounded-lg border-2 w-full text-primary font-medium text-xl border-darkText flex justify-center items-center py-4 px-5 mb-16"><FcPhone className="w-5 h-5 mr-2"/>Continue With Number</button>


                    <form onSubmit={requestOTP}>
                    <div className="mt-11">
                    <label className="font-medium text-lg text-darkText ">Email Address</label>
                    <input onChange={(e)=> setEmail(e.target.value)} value={email}  className="rounded-lg border-2 w-full border-borderLight border-opacity-80 py-4 px-4 mt-2 mb-2" type="text" name="" id="" placeholder="example@gmail.com"/>
                    <span className="font-medium text-red text-base"><h5>{errorMessage}</h5></span>
                    </div>

                    <div>
                    <div className="font-medium text-lg text-darkText flex justify-between items-center mt-8"><label>Password</label> <span onClick={handleToggle} className="flex justify-center items-center text-grayText"><Icon class="absolute mr-10" icon={icon} size={25}/>Hide</span></div>
                    <input autoComplete="current-password" onChange={(e)=> setPassword(e.target.value)} value={password} className="rounded-lg border-2 w-full border-borderLight border-opacity-80 py-4 px-4 mt-2 mb-2"   type={type} name="" id=""/>
                    <span className="font-medium text-base text-grayText"><h5>Use 8 or more characters with a mix of letters, numbers & symbols</h5></span>
                    </div>

                    <div className="w-full mt-8 flex items-center">
                        <div className=" rounded-lg ">
                        <input className=" rounded-lg  w-full  font-normal text-grayText" type="checkbox" id="privacy" name="privacy" />
                        </div>
                            <label for="privacy" className="pl-2 text-lg font-normal text-grayText">Agree to our Terms of use and Privacy Policy </label>
                    </div>

                            <div className="w-full mt-2 flex items-center">
                            <div className=" rounded-lg ">
                            <input className=" rounded-lg  w-full  font-normal text-grayText" type="checkbox" id="subscribe" name="subscribe" />
                            </div>
                                <label for="subscribe" className="pl-2 text-lg font-normal text-grayText">Subscribe to our monthly newsletter</label>
                            
                            </div>

                    <div className="mt-11">
                        <button className="bg-primary rounded-lg text-white px-5 py-4 text-center items-center md:w-40 w-full mb-2">Sign Up</button>
                        <h4 className="font-medium text-base text-grayText">Already have an  account?<Link className="underline">Log in</Link></h4>
                    </div>
                    </form>
                    
                    </div>
                    
                </div>
            </div>
        </Fragment>
    )
}