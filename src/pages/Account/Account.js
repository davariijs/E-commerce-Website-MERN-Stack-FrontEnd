import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import orderIcon from "../../assets/icons/my-orders.svg";
import likeIcon from "../../assets/icons/like.svg";
import userIcon from "../../assets/icons/user.svg";
import signOutIcon from "../../assets/icons/sign-out.svg";
import leftArrowIcon from "../../assets/icons/left-arrow.svg";
import "./Account.css"

export default function Account () {

    return(
        <Fragment>
            <div className="container mx-auto w-full h-full accountPage">
                <div className="pb-12 pt-3 flex lg:text-lg"><Link to="/" className="text-grayText font-normal  pr-3">Home</Link><img src={leftArrowIcon} width="5px" height="10.14px" alt="arrow"/>
                <Link to="/account" className="pl-3 pr-3 text-grayText font-normal ">My Account</Link><img src={leftArrowIcon} width="5px" height="10.14px" alt="arrow"/>
                <Link className="text-darkText font-normal  pl-3">Personal Info</Link>
                </div>
            

            <div className="lg:flex pb-8 ">
                <div className="lg:pr-14 pr-0 lg:w-1/4 w-full">
                <div className='text-darkText flex lg:text-2xl text-lg font-bold pb-3'><div className='title-part '></div><h3 className='pl-5 pt-2'>Hello </h3></div>
                <h4 className="font-light text-sm text-grayText  pb-8">Welcome to your Account</h4>
                
                <div className="lg:block hidden">
                    <div className="flex text-nowrap  pl-8 pr-14 py-2 lg:w-full w-fit hover:bg-secondary border-l-2 border-transparent hover:border-darkText"><img src={orderIcon} className="w-5" alt="orders"/><h4 className="font-semibold text-lg text-grayText pl-4">My Orders</h4></div>
                    <div className="flex  pl-8 pr-14 py-2 lg:w-full w-fit hover:bg-secondary border-l-2 border-transparent hover:border-darkText"><img src={likeIcon} className="w-5" alt="orders"/><h4 className="font-semibold text-lg text-grayText pl-4">Wishlist</h4></div>
                    <div className="flex  pl-8 pr-14 py-2 lg:w-full w-fit hover:bg-secondary border-l-2 border-transparent hover:border-darkText"><img src={userIcon} className="w-5" alt="orders"/><h4 className="font-semibold text-lg text-grayText pl-4">My info</h4></div>
                    <div className="flex  pl-8 pr-14 py-2 lg:w-full w-fit hover:bg-secondary border-l-2 border-transparent hover:border-darkText"><img src={signOutIcon} className="w-5" alt="orders"/><h4 className="font-semibold text-lg text-grayText pl-4">Sign out</h4></div>
                </div>

                <div className="flex lg:hidden justify-center topPanel">
                    <div className="flex text-nowrap  px-8 py-2 lg:w-full  hover:bg-secondary border-b-2 border-transparent hover:border-darkText"><img src={orderIcon} className="w-5 h-5 mt-1" alt="orders"/><h4 className="font-semibold text-lg text-grayText pl-2">My Orders</h4></div>
                    <div className="flex text-nowrap  px-8 py-2 lg:w-full  hover:bg-secondary border-b-2 border-transparent hover:border-darkText"><img src={likeIcon} className="w-5 h-5 mt-1" alt="orders"/><h4 className="font-semibold text-lg text-grayText pl-2">Wishlist</h4></div>
                    <div className="flex text-nowrap  px-8 py-2 lg:w-full  hover:bg-secondary border-b-2 border-transparent hover:border-darkText"><img src={userIcon} className="w-5 h-5 mt-1" alt="orders"/><h4 className="font-semibold text-lg text-grayText pl-2">My info</h4></div>
                    <div className="flex text-nowrap px-8 py-2 lg:w-full  hover:bg-secondary border-b-2 border-transparent hover:border-darkText"><img src={signOutIcon} className="w-5 h-5 mt-1" alt="orders"/><h4 className="font-semibold text-lg text-grayText pl-2">Sign out</h4></div>
                </div>
                </div>

                <div className="pb-8 lg:pt-0 pt-8 lg:w-3/4 w-full">
                    <div className="w-full">
                    <h3 className='text-darkText flex lg:text-2xl text-md font-bold pb-3'>My Info</h3>
                    <h4 className='text-darkText flex lg:text-xl text-md font-bold pb-8'>Contact Details</h4>

                    <div className="pb-4 border-b-2 border-borderGreyLight w-full">
                        <h4 className="lg:text-lg text-md font-semibold text-grayText">Your Name</h4>
                        <div className="flex justify-between">
                            <h5 className="lg:text-lg text-md font-semibold text-darkText">Jhanvi Shah</h5>
                            <button className="lg:text-lg text-md font-semibold text-darkText">Change</button>
                        </div>
                    </div>

                    <div className="py-4 border-b-2 border-borderGreyLight w-full">
                        <h4 className="lg:text-lg text-md font-semibold text-grayText">Email Address</h4>
                        <div className="flex justify-between">
                            <h5 className="lg:text-lg text-md font-semibold text-darkText">Jhanvi@gmail.com</h5>
                            <button className="lg:text-lg text-md font-semibold text-darkText">Change</button>
                        </div>
                    </div>

                    <div className="py-4 border-b-2 border-borderGreyLight w-full">
                        <h4 className="lg:text-lg text-md font-semibold text-grayText">Phone Number</h4>
                        <div className="flex justify-between">
                            <h5 className="lg:text-lg text-md font-semibold text-darkText">8980252445</h5>
                            <button className="lg:text-lg text-md font-semibold text-darkText">Change</button>
                        </div>
                    </div>

                    <div className="py-4 border-b-2 border-borderGreyLight w-full">
                        <h4 className="lg:text-lg text-md font-semibold text-grayText">Password</h4>
                        <div className="flex justify-between">
                            <h5 className="lg:text-lg text-md font-semibold text-darkText">.....</h5>
                            <button className="lg:text-lg text-md font-semibold text-darkText">Change</button>
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-between py-8">
                        <h4 className='text-darkText flex lg:text-xl text-md font-bold '>Address</h4>
                        <button className="lg:text-lg text-md font-semibold text-darkText">Add New</button>
                        </div>

                        <div className=" grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="rounded-xl p-5 bg-secondary">
                                <h3 className="lg:text-xl text-md  font-semibold text-darkText pb-4">Jhanvi shah</h3>
                                <h4 className="text-base font-normal text-grayText pb-4">8980252445</h4>
                                <p className="text-base font-normal text-grayText pb-4">1/4 Pragatinagar Flats, opp. jain derasar , near Jain
                                derasar, Vijaynagar road </p>
                                <div className="flex pb-4">
                                    <div className="mr-3 rounded-lg py-2 px-5 border-2 border-grayText lg:text-base text-sm font-normal text-grayText">Home</div>
                                    <div className="mr-3 rounded-lg py-2 px-5 border-2 border-grayText lg:text-base text-sm font-normal text-grayText">Default billing address</div>
                                </div>

                                <div className="flex">
                                <button className="text-base font-semibold text-darkText border-r-2 border-light pr-3">Remove</button>
                                <button className="text-base font-semibold text-darkText pl-3">Edit</button>
                                </div>
                            </div>

                            <div className="rounded-xl p-5 bg-secondary">
                                <h3 className="lg:text-xl text-md  font-semibold text-darkText pb-4">Jhanvi shah</h3>
                                <h4 className="text-base font-normal text-grayText pb-4">8980252445</h4>
                                <p className="text-base font-normal text-grayText pb-4">1/4 Pragatinagar Flats, opp. jain derasar , near Jain
                                derasar, Vijaynagar road </p>
                                <div className="flex pb-4">
                                    <div className="mr-3 rounded-lg py-2 px-5 border-2 border-grayText lg:text-base text-sm font-normal text-grayText">Home</div>
                                    <div className="mr-3 rounded-lg py-2 px-5 border-2 border-grayText lg:text-base text-sm font-normal text-grayText">Default billing address</div>
                                </div>

                                <div className="flex">
                                <button className="text-base font-semibold text-darkText border-r-2 border-light pr-3">Remove</button>
                                <button className="text-base font-semibold text-darkText pl-3">Edit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            </div>
        </Fragment>
    )
}