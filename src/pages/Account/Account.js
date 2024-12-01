import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import orderIcon from "../../assets/icons/my-orders.svg";
import likeIcon from "../../assets/icons/like.svg";
import userIcon from "../../assets/icons/user.svg";
import signOutIcon from "../../assets/icons/sign-out.svg";
import leftArrowIcon from "../../assets/icons/left-arrow.svg";


export default function Account () {

    return(
        <Fragment>
            <div className="container mx-auto w-full h-full ">
                <div className="pb-12 pt-3 flex"><Link to="/" className="text-grayText font-normal text-lg pr-3">Home</Link><img src={leftArrowIcon} width="5px" height="10.14px" alt="arrow"/>
                <Link to="/account" className="pl-3 pr-3 text-grayText font-normal text-lg">My Account</Link><img src={leftArrowIcon} width="5px" height="10.14px" alt="arrow"/>
                <Link className="text-darkText font-normal text-lg pl-3">Personal Info</Link>
                </div>
            

            <div className="flex pb-8 ">
                <div className="pr-14">
                <div className='text-darkText flex lg:text-2xl text-lg font-bold pb-3'><div className='title-part '></div><h3 className='pl-5 pt-2'>Hello </h3></div>
                <h4 className="font-light text-sm text-grayText pb-8">Welcome to your Account</h4>
                
                <div className="">
                    <div className="flex  pl-8 pr-14 py-2 w-full hover:bg-secondary border-l-2 border-transparent hover:border-darkText"><img src={orderIcon} alt="orders"/><h4 className="font-semibold text-lg text-grayText pl-4">My Orders</h4></div>
                    <div className="flex  pl-8 pr-14 py-2 w-full hover:bg-secondary border-l-2 border-transparent hover:border-darkText"><img src={likeIcon} alt="orders"/><h4 className="font-semibold text-lg text-grayText pl-4">Wishlist</h4></div>
                    <div className="flex  pl-8 pr-14 py-2 w-full hover:bg-secondary border-l-2 border-transparent hover:border-darkText"><img src={userIcon} alt="orders"/><h4 className="font-semibold text-lg text-grayText pl-4">My info</h4></div>
                    <div className="flex  pl-8 pr-14 py-2 w-full hover:bg-secondary border-l-2 border-transparent hover:border-darkText"><img src={signOutIcon} alt="orders"/><h4 className="font-semibold text-lg text-grayText pl-4">Sign out</h4></div>
                </div>
                </div>

                <div className="pb-8">
                    <h3 className='text-darkText flex lg:text-2xl text-lg font-bold'>My Info</h3>
                </div>
            </div>
            </div>
        </Fragment>
    )
}