import React, { Fragment } from "react";
import newPasswordImg from "../../assets/images/new-password.png";
import "./login-signup.css";

export default function NewPassword() {

    return(
        <Fragment>
            <div className="md:grid md:grid-cols-2 ">
                <div className="">
                    <img src={newPasswordImg} className="h-screen w-full" alt="clothes"/>
                </div>

                <div className="mx-14 pt-10 md:mx-auto md:px-4">
                    <div className="">
                    <h2 className="font-bold text-3xl text-darkText md:text-left  text-center ">Create New Password</h2>
                    <h3 className="text-grayText">Your new password must be different from previous used passwords.</h3>

                    

                    <form>
                    <div className="mt-11">
                    <label className="font-medium text-lg text-darkText ">Password</label>
                    <input className="rounded-lg border-2 w-full border-borderLight border-opacity-80 py-4 px-4 mt-2 mb-2" type="text"/>
                    <span className="font-medium text-grayText text-base"><h5>Must be at least 8 characters.</h5></span>
                    </div>

                    <div className="mt-11">
                    <label className="font-medium text-lg text-darkText ">Confirm Password</label>
                    <input className="rounded-lg border-2 w-full border-borderLight border-opacity-80 py-4 px-4 mt-2 mb-2" type="text"/>
                    <span className="font-medium text-red text-base"><h5>New password and confirm new password do not match</h5></span>
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