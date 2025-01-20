import React, { Fragment, useState } from "react";
import {Icon} from 'react-icons-kit';
import {eyeOff} from 'react-icons-kit/feather/eyeOff';
import {eye} from 'react-icons-kit/feather/eye'
import { Link,useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import loginImage from "../../assets/images/signup-image.webp"
import "./login-signup.css";
import { auth,googleProvider } from "../../firebase/firebase"; 
import { signInWithPopup, GoogleAuthProvider,createUserWithEmailAndPassword } from "firebase/auth";
import { handleAddUserToMongo } from "../../utils/wishlistFunc";


export default function Signup() {

    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [type, setType] = useState('password');
    const [privacy, setPrivacy] = useState(false);
    const [subscribe, setSubscribe] = useState(false);
    const [errorPrivacy, setErrorPrivacy] = useState("");
    const [icon, setIcon] = useState(eyeOff);
    console.log(email,password);
    const navigate = useNavigate();  

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
            setTimeout(navigate("/account"), 3000);
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
     

    const signupEmail = (e) => {
        e.preventDefault();
        if (privacy === true){
            createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                console.log(user.uid);
                console.log(user);
                const userMongo = {
                    uid: user.uid,
                    email: user.email,
                    name: user.displayName
                  };
                handleAddUserToMongo(userMongo);
                setErrorMessage("");
                setEmail("");
                setPassword("");
                setSubscribe(false);
                setPrivacy(false);
                setErrorPrivacy("");
                setTimeout(navigate("/account"), 3000);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessagePassword = error.message;
                setErrorMessage(errorMessagePassword)
                if (privacy === false){
                    setErrorPrivacy("Agree Privacy Policy")
                }
                // ..
            });
        } else {
            setErrorPrivacy("Agree Privacy Policy")
        }
        
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
            <div className="relative">
            <div className="md:grid md:grid-cols-2 flex flex-col-reverse ">
                <div className="">
                    <img src={loginImage} className="h-screen w-full  md:relative  absolute top-0 -z-10" alt="clothes"/>
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
                    <div className="font-medium text-lg text-darkText flex justify-between items-center mt-3"><label>Password</label> <span onClick={handleToggle} className="flex justify-center items-center text-grayText"><Icon class="absolute mr-8" icon={icon} size={20}/></span></div>
                    <input autoComplete="current-password" onChange={(e)=> setPassword(e.target.value)} value={password} className="rounded-lg border-2 w-full border-borderLight border-opacity-80 py-4 px-4 mt-2 mb-2"   type={type} name="" id=""/>
                    <span className="font-medium text-xs text-grayText"><h5>Use 8 or more characters with a mix of letters, numbers & symbols</h5></span>
                    </div>
                    
                    <div className="mt-8"><span className="font-medium text-red text-sm"><h5>{errorPrivacy}</h5></span></div>
                    <div className="w-full flex items-center">
                        <div className=" rounded-lg ">
                        <input onChange={(e)=> setPrivacy(!privacy)} value={privacy}  className=" rounded-lg  w-full  font-normal text-grayText" type="checkbox" id="privacy" name="privacy" />
                        </div>
                            <label for="privacy" className="pl-2 text-lg font-normal text-grayText">Agree to our Terms of use and Privacy Policy </label>
                    </div>
                    
                            <div className="w-full mt-2 flex items-center">
                            <div className=" rounded-lg ">
                            <input onChange={(e)=> setSubscribe(!subscribe)} value={subscribe} className=" rounded-lg  w-full  font-normal text-grayText" type="checkbox" id="subscribe" name="subscribe" />
                            </div>
                                <label for="subscribe" className="pl-2 text-lg font-normal text-grayText">Subscribe to our monthly newsletter</label>
                            
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
        </Fragment>
    )
}