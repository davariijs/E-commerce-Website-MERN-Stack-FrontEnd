import React, { Fragment, useState } from "react";
import {useNavigate } from "react-router-dom";
import newPasswordImg from "../../assets/images/new-password.png";
import "./login-signup.css";
import { auth} from "../../firebase/firebase"; 
import { updatePassword  } from "firebase/auth";
import { Img } from "react-image";

export default function NewPassword() {

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const user = auth.currentUser; 

    const newPasswordFunc = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (newPassword === confirmPassword){
            if (user) { 
        updatePassword(user, newPassword).then(() => {
            // Update successful.
            console.log("Update successful.");
            setErrorMessage("")
            setTimeout(()=>navigate("/login"), 3000);
          }).catch((error) => {
            // An error ocurred
            // ...
            console.log(error);
            const errorMessagePassword = error.message;
            setErrorMessage(errorMessagePassword)
          });
        } else {
            setErrorMessage("User is not authenticated.");
          }
    
        } else {
            setErrorMessage("New password and confirm new password do not match")
        }
    }

    return(
        <Fragment>
            <div className="md:grid md:grid-cols-2 flex flex-col-reverse ">
                <div className="">
                    <Img
                    src={newPasswordImg}
                    loader={<span></span>}
                    unloader={<span>...</span>}
                    className="h-screen w-full   md:relative  absolute top-0 -z-10" 
                    alt="clothes"
                    />
                </div>

                <div className="mx-0 pt-10 md:pb-0 pb-10 md:mx-auto md:px-4 px-6 bg-white bg-opacity-75">
                    <div className="">
                    <h2 className="font-bold text-3xl text-darkText md:text-left  text-center ">Create New Password</h2>
                    <h3 className="text-grayText">Your new password must be different from previous used passwords.</h3>

                    

                    <form onSubmit={newPasswordFunc}>
                    <div className="mt-11">
                    <label className="font-medium text-lg text-darkText ">Password</label>
                    <input onChange={(e)=> setNewPassword(e.target.value)} value={newPassword} className="rounded-lg border-2 w-full border-borderLight border-opacity-80 py-4 px-4 mt-2 mb-2" type="text"/>
                    <span className="font-medium text-grayText text-base"><h5>Must be at least 8 characters.</h5></span>
                    </div>

                    <div className="mt-11">
                    <label className="font-medium text-lg text-darkText ">Confirm Password</label>
                    <input onChange={(e)=> setConfirmPassword(e.target.value)} value={confirmPassword} className="rounded-lg border-2 w-full border-borderLight border-opacity-80 py-4 px-4 mt-2 mb-2" type="text"/>
                    <span className="font-medium text-red text-base"><h5>{errorMessage}</h5></span>
                    </div>

                    <div className="mt-11">
                        <button className="bg-primary rounded-lg text-white px-5 py-4 text-center items-center md:w-40 w-full mb-2">Reset Password</button>
                    </div>
                    </form>
                    
                    </div>
                    
                </div>
            </div>
        </Fragment>
    )
}