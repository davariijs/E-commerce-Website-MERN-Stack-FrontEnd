import React, { Fragment, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { Outlet, useLocation, useParams } from "react-router-dom";
import leftArrowIcon from "../../assets/icons/left-arrow.svg";
import SidebarAccount from "./SidebarAccount";
import "./Account.css";

export default function Account ({email,uid,name}) {
      


    const [path, setPath] = useState();
  const location = useLocation();

  const {id} = useParams();
  
  useEffect(() => {
    function locationPath () {
    switch(location.pathname) {
        case '/account/wishlist':
        setPath("Wishlist");
        break;
        case '/account/my-info':
        setPath("My Info");
        break;
        case '/account/order-details':
        setPath("Order Details");
        break;
      default:
        setPath("Orders");
    }
  }

  locationPath();
  }, [location.pathname, id]);

    return(
        <Fragment>
            <div className="container mx-auto w-full h-full accountPage">
                <div className="pb-12 pt-3 flex lg:text-lg"><Link to="/" className="text-grayText font-normal  pr-3">Home</Link><img src={leftArrowIcon} width="5px" height="10.14px" alt="arrow"/>
                <Link to="/account" className="pl-3 pr-3 text-grayText font-normal ">My Account</Link><img src={leftArrowIcon} width="5px" height="10.14px" alt="arrow"/>
                <Link className="text-darkText font-normal  pl-3">{path}</Link>
                </div>
            

            {uid? 
                <div className="lg:flex pb-8 ">
                <div className="lg:pr-14 pr-0 lg:w-1/4 w-full">
                <SidebarAccount email={email} name={name} path={path}/>
                </div>

                <div className="pb-8 lg:pt-0 pt-8 lg:w-3/4 w-full">
                <h3 className='text-darkText flex lg:text-2xl text-md font-bold md:pb-14 pb-3'>{path}</h3>
                    <Outlet/>
                </div>
            </div>
            :
            <div className='flex flex-col justify-center items-center text-center p-20'>
                <h2 className='text-darkText font-bold md:text-3xl text-lg '>User doesn't exist!!!</h2>
                <Link to="/sign-up" className="bg-primary rounded-lg text-white px-5 py-4 text-center items-center w-full mb-2 mt-10">Sign Up</Link>
                <h4 className="font-medium text-base text-grayText">Already have an  account?<Link to="/login" className="underline">Log in</Link></h4>
            </div>
            }
            </div>
        </Fragment>
    )
}