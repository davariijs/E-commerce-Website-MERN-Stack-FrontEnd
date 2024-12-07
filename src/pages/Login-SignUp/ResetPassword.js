import React, { Fragment } from "react";
import { IoMdEyeOff } from "react-icons/io";
import { IoMdEye } from "react-icons/io";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FcPhone } from "react-icons/fc";
import loginImage from "../../assets/images/signup-image.webp"
import "./login-signup.css";

export default function ResetPassword() {

    return(
        <Fragment>
            <div className="md:grid md:grid-cols-2 ">
                <div className="">
                    <img src={loginImage} className="h-screen w-full" alt="clothes"/>
                </div>

                <div className="mx-14 pt-10 md:mx-auto md:px-4">
                    <div className="">
                    <h2 className="font-bold text-3xl text-darkText md:text-left  text-center ">Reset Your Password</h2>
                    <h3>Enter your email and we'll send you a link to reset your password.<br/>Please  check it.</h3>

                    

                    <form>
                    <div className="mt-11">
                    <label className="font-medium text-lg text-darkText ">Email</label>
                    <input className="rounded-lg border-2 w-full border-darkText py-4 px-4 mt-2 mb-2" type="text" name="" id="" placeholder="example@gmail.com"/>
                    <span className="font-medium text-red text-base"><h5>We can not find your email.</h5></span>
                    </div>

                    <div className="mt-11">
                        <button className="bg-primary rounded-lg text-white px-5 py-4 text-center items-center md:w-40 w-full mb-2">Send</button>
                        <h4 className="font-medium text-base text-grayText">Back to<Link className="underline">Login</Link></h4>
                    </div>
                    </form>
                    
                    </div>
                    
                </div>
            </div>
        </Fragment>
    )
}