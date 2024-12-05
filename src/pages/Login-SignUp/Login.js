import React, { Fragment } from "react";
import { IoMdEyeOff } from "react-icons/io";
import { IoMdEye } from "react-icons/io";
import { Link } from "react-router-dom";

export default function Login() {

    return(
        <Fragment>
            <div className="md:flex">
                <div>
                    <img src="" alt="clothes"/>
                </div>

                <div>
                    <h2>LogIn</h2>
                    <button>Continue With Google</button>
                    <button>Continue With Number</button>


                    <div>
                    <label>User name or email address</label>
                    <input type="text" name="" id=""/>
                    </div>

                    <div>
                    <div><label>Password</label> <button><IoMdEye /><IoMdEyeOff />Hide</button></div>
                    <input type="text" name="" id=""/>
                    <Link>Forget your password</Link>
                    </div>

                    <div>
                        <button>Sign In</button>
                        <h4>Don’t have an account?<Link>Sign up</Link></h4>
                    </div>
                    

                    <label></label>
                    <input/>
                </div>
            </div>
        </Fragment>
    )
}