import React, { Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import resetImage from "../../assets/images/reset-password.webp"
import "./login-signup.css";
import { auth} from "../../firebase/firebase"; 
import { sendPasswordResetEmail } from "firebase/auth";

export default function ResetPassword() {

    const [email, setEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate(); 

    const resetPassword = (e) => {
        e.preventDefault();
        sendPasswordResetEmail(auth, email)
        .then(() => {
            // Password reset email sent!
            // ..
            setEmail("");
            setTimeout(navigate("/"), 3000);
            console.log("ok");
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setErrorMessage(errorMessage)
            // ..
        });
    }

    return(
        <Fragment>
            <div className="md:grid md:grid-cols-2 ">
                <div className="">
                    <img src={resetImage} className="h-screen w-full" alt="clothes"/>
                </div>

                <div className="mx-14 pt-10 md:mx-auto md:px-4">
                    <div className="">
                    <h2 className="font-bold text-3xl text-darkText md:text-left  text-center ">Reset Your Password</h2>
                    <h3>Enter your email and we'll send you a link to reset your password.<br/>Please  check it.</h3>

                    

                    <form onSubmit={resetPassword}>
                    <div className="mt-11">
                    <label className="font-medium text-lg text-darkText ">Email</label>
                    <input onChange={(e)=> setEmail(e.target.value)} value={email} className="rounded-lg border-2 w-full border-borderLight border-opacity-80 py-4 px-4 mt-2 mb-2" type="text" name="" id="" placeholder="example@gmail.com"/>
                    <span className="font-medium text-red text-base"><h5>{errorMessage}</h5></span>
                    </div>

                    <div className="mt-11">
                        <button className="bg-primary rounded-lg text-white px-5 py-4 text-center items-center md:w-40 w-full mb-2">Send</button>
                        <h4 className="font-medium text-base text-grayText">Back to <Link to="/login" className="underline">Login</Link></h4>
                    </div>
                    </form>
                    
                    </div>
                    
                </div>
            </div>
        </Fragment>
    )
}