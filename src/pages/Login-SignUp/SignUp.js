import React, { Fragment } from "react";
import { IoMdEyeOff } from "react-icons/io";
import { IoMdEye } from "react-icons/io";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FcPhone } from "react-icons/fc";
import loginImage from "../../assets/images/signup-image.webp"
import "./login-signup.css";

export default function Signup() {

    return(
        <Fragment>
            <div className="md:grid md:grid-cols-2 ">
                <div className="">
                    <img src={loginImage} className="h-screen w-full" alt="clothes"/>
                </div>

                <div className="mx-14 pt-10 md:mx-auto md:px-4">
                    <div className="">
                    <h2 className="font-bold text-3xl text-darkText md:text-left  text-center ">Sign Up</h2>
                    <button className="rounded-lg border-2 w-full text-primary font-medium text-xl border-darkText flex justify-center items-center py-4 px-5 mt-11 mb-5"><FcGoogle className="w-5 h-5 mr-2"/>Continue With Google</button>
                    <button className="rounded-lg border-2 w-full text-primary font-medium text-xl border-darkText flex justify-center items-center py-4 px-5 mb-16"><FcPhone className="w-5 h-5 mr-2"/>Continue With Number</button>

                    

                    <form>
                    <div className="mt-11">
                    <label className="font-medium text-lg text-darkText ">Email Address</label>
                    <input className="rounded-lg border-2 w-full border-borderLight border-opacity-80 py-4 px-4 mt-2 mb-2" type="text" name="" id="" placeholder="example@gmail.com"/>
                    <span className="font-medium text-red text-base"><h5>Error Message</h5></span>
                    </div>

                    <div>
                    <div className="font-medium text-lg text-darkText flex justify-between items-center mt-8"><label>Password</label> <button className="flex justify-center items-center text-grayText"><IoMdEye className="mr-2"/><IoMdEyeOff className="mr-2"/>Hide</button></div>
                    <input className="rounded-lg border-2 w-full border-borderLight border-opacity-80 py-4 px-4 mt-2 mb-2"  type="text" name="" id=""/>
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