import React, { Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import resetImage from "../../assets/images/reset-password.webp"
import "./login-signup.css";
import { auth} from "../../firebase/firebase"; 
import { sendPasswordResetEmail } from "firebase/auth";
import { Img } from "react-image";

export default function ResetPassword() {

    const [email, setEmail] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const navigate = useNavigate(); 

    const resetPassword = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        sendPasswordResetEmail(auth, email)
        .then(() => {
            // Password reset email sent!
            // ..
            setEmail("");
            setErrorMessage("")
            setTimeout(() => navigate("/check-email"), 3000);
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
            <div className="md:grid md:grid-cols-2 flex flex-col-reverse ">
                <div className="">
                    <Img
                    src={resetImage}
                    loader={<span></span>}
                    unloader={<span>...</span>}
                    className="h-screen w-full  md:relative  absolute top-0 -z-10" 
                    alt="clothes"
                    />
                </div>

                <div className="mx-0 pt-10 md:pb-0 pb-10 md:mx-auto md:px-6 px-6 bg-white bg-opacity-75">
                    <div className="">
                    <h2 className="font-bold text-3xl text-darkText md:text-left  text-center ">Reset Your Password</h2>
                    <h3 className="md:text-start text-center">Enter your email and we'll send you a link to reset your password.</h3>

                    

                    <form onSubmit={resetPassword}>
                    <div className="mt-11">
                    <label className="font-medium text-lg text-darkText ">Email</label>
                    <input onChange={(e)=> setEmail(e.target.value)} value={email} className="rounded-lg border-2 w-full border-borderLight border-opacity-80 py-4 px-4 mt-2 mb-2" type="text" name="" id="" placeholder="example@gmail.com"/>
                    <span className="font-medium text-red text-base"><h5>{errorMessage}</h5></span>
                    </div>

                    <div className="mt-11">
                        <button className="bg-primary rounded-lg text-white px-5 py-4 text-center items-center md:w-40 w-full mb-2">Send</button>
                        <h4 className="font-medium text-base text-grayText md:text-start text-center">Back to <Link to="/login" className="underline">Login</Link></h4>
                    </div>
                    </form>
                    
                    </div>
                    
                </div>
            </div>
        </Fragment>
    )
}