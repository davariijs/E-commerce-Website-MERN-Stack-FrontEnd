import React, { Fragment } from "react";
import { IoMdEyeOff } from "react-icons/io";
import { IoMdEye } from "react-icons/io";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FcPhone } from "react-icons/fc";
import loginImage from "../../assets/images/login-image.webp"
import "./login-signup.css";

export default function Login() {

    return(
        <Fragment>
            <div className="md:grid md:grid-cols-2 ">
                <div className="">
                    <img src={loginImage} className="h-screen w-full" alt="clothes"/>
                </div>

                <div className="mx-14 pt-10 md:mx-auto login-part">
                    <div className="">
                    <h2 className="font-bold text-3xl text-darkText md:text-left  text-center ">LogIn</h2>
                    <button className="rounded-lg border-2 w-full text-primary font-medium text-xl border-darkText flex justify-center items-center py-4 px-5 mt-11 mb-5"><FcGoogle className="w-5 h-5 mr-2"/>Continue With Google</button>
                    <button className="rounded-lg border-2 w-full text-primary font-medium text-xl border-darkText flex justify-center items-center py-4 px-5 mb-11"><FcPhone className="w-5 h-5 mr-2"/>Continue With Number</button>


                    <form>
                    <div className="mt-8">
                    <label className="font-medium text-lg text-darkText ">User name or email address</label>
                    <input className="rounded-lg border-2 w-full border-darkText py-4 px-4 mt-2" type="text" name="" id=""/>
                    </div>

                    <div>
                    <div className="font-medium text-lg text-darkText flex justify-between items-center mt-8"><label>Password</label> <button className="flex justify-center items-center text-grayText"><IoMdEye className="mr-2"/><IoMdEyeOff className="mr-2"/>Hide</button></div>
                    <input className="rounded-lg border-2 w-full border-darkText py-4 px-4 mt-2 mb-2"  type="text" name="" id=""/>
                    <Link className="font-medium text-base text-darkText text-right underline"><h5>Forget your password</h5></Link>
                    </div>

                    <div className="mt-11">
                        <button className="bg-primary rounded-lg text-white px-5 py-4 text-center items-center md:w-40 w-full mb-2">Sign In</button>
                        <h4 className="font-medium text-base text-darkText">Don’t have an account?<Link className="underline">Sign up</Link></h4>
                    </div>
                    </form>
                    
                    </div>
                    
                </div>
            </div>
        </Fragment>
    )
}