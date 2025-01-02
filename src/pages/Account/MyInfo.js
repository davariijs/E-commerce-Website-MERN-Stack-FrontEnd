import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import "./Account.css"

export default function MyInfo () {

    return(
        <Fragment>
                <div className="w-full">
                    
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
        </Fragment>
    )
}