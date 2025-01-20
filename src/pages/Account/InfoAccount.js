import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import "./Account.css"

export default function InfoAccount () {

    return(
        <Fragment>
            <div className="container mx-auto w-full h-full accountPage">
            <div className="lg:flex pb-8 ">

                <div className="pb-8 w-full">
                    <div className="w-full">
                    <h3 className='text-darkText flex lg:text-2xl text-md font-bold pb-3'>My Info</h3>
                    <h4 className='text-darkText flex lg:text-xl text-md font-bold pb-8'>Add Address</h4>

                    <div className="pb-4 w-full">
                    <form action="" method="GET">

                        <div className="grid md:grid-cols-2 grid-cols-1 md:gap-8 gap-4">
                            <div className="w-full">
                            <label for="fname" className="lg:text-lg text-md font-semibold text-darkText">First Name*</label>
                                <div className="bg-secondary rounded-lg mt-2">
                                    <input className="bg-secondary text-xs rounded-lg  w-full font-normal text-grayText py-4 px-5" type="text" id="fname" name="fname" placeholder="First Name"/>
                                </div>
                            </div>
                            <div className="w-full">
                            <label for="lname" className="lg:text-lg text-md font-semibold text-darkText">Last Name*</label>
                                <div className="bg-secondary rounded-lg mt-2">
                                    <input className="bg-secondary text-xs rounded-lg  w-full font-normal text-grayText py-4 px-5" type="text" id="lname" name="lname" placeholder="Last Name"/>
                                </div>
                            </div>
                            <div className="w-full">
                            <label for="country" className="lg:text-lg text-md font-semibold text-darkText">Country / Region*</label>
                                <div className="bg-secondary rounded-lg mt-2">
                                    <input className="bg-secondary text-xs rounded-lg  w-full font-normal text-grayText py-4 px-5" type="text" id="country" name="country" placeholder="Country / Region"/>
                                </div>
                            </div>
                            <div className="w-full">
                            <label for="company" className="lg:text-lg text-md font-semibold text-darkText">Company Name</label>
                                <div className="bg-secondary rounded-lg mt-2">
                                    <input className="bg-secondary text-xs rounded-lg  w-full font-normal text-grayText py-4 px-5" type="text" id="company" name="company" placeholder="Company (optional)"/>
                                </div>
                            </div>
                            <div className="w-full">
                            <label for="street" className="lg:text-lg text-md font-semibold text-darkText">Street Address*</label>
                                <div className="bg-secondary rounded-lg mt-2">
                                    <input className="bg-secondary text-xs rounded-lg  w-full font-normal text-grayText py-4 px-5" type="text" id="street" name="street" placeholder="House number and street name"/>
                                </div>
                            </div>
                            <div className="w-full">
                            <label for="apt" className="lg:text-lg text-md font-semibold text-darkText">Apt, suite, unit</label>
                                <div className="bg-secondary rounded-lg mt-2">
                                    <input className="bg-secondary text-xs rounded-lg  w-full font-normal text-grayText py-4 px-5" type="text" id="apt" name="apt" placeholder="apartment, suite, unit, etc. (optional)"/>
                                </div>
                            </div>
                            <div className="w-full">
                            <label for="city" className="lg:text-lg text-md font-semibold text-darkText">City*</label>
                                <div className="bg-secondary rounded-lg mt-2">
                                    <input className="bg-secondary text-xs rounded-lg  w-full font-normal text-grayText py-4 px-5" type="text" id="city" name="city" placeholder="Town / City"/>
                                </div>
                            </div>
                            <div className="w-full">
                            <label for="state" className="lg:text-lg text-md font-semibold text-darkText">State*</label>
                                <div className="bg-secondary rounded-lg mt-2">
                                    <input className="bg-secondary text-xs rounded-lg  w-full font-normal text-grayText py-4 px-5" type="text" id="state" name="state" placeholder="State"/>
                                </div>
                            </div>
                            <div className="w-full">
                            <label for="phone" className="lg:text-lg text-md font-semibold text-darkText">Phone*</label>
                                <div className="bg-secondary rounded-lg mt-2">
                                    <input className="bg-secondary text-xs rounded-lg  w-full font-normal text-grayText py-4 px-5" type="text" id="phone" name="phone" placeholder="Phone"/>
                                </div>
                            </div>
                            <div className="w-full">
                            <label for="postalCode" className="lg:text-lg text-md font-semibold text-darkText">Postal Code*</label>
                                <div className="bg-secondary rounded-lg mt-2">
                                    <input className="bg-secondary text-xs rounded-lg  w-full font-normal text-grayText py-4 px-5" type="text" id="postalCode" name="postalCode" placeholder="Postal Code"/>
                                </div>
                            </div>
                        </div>
                        <div className="w-full mt-8">
                            <label for="delivery" className="lg:text-lg text-md font-semibold text-darkText">Delivery Instruction</label>
                                <div className="bg-secondary rounded-lg mt-2">
                                    <textarea className="bg-secondary text-xs rounded-lg  w-full font-normal text-grayText pt-4 h-36 px-5" type="text" id="delivery" name="delivery" placeholder="Delivery Instruction"/>
                                </div>
                        </div>

                        <div className="w-full mt-8 flex">
                        <div className=" rounded-lg ">
                        <input className=" rounded-lg  w-full  font-normal text-grayText" type="checkbox" id="shipping" name="shipping" placeholder="Delivery Instruction"/>
                        </div>
                            <label for="shipping" className="pl-2 text-sm font-normal text-darkText">Set as default shipping address</label>
                        </div>

                        <div className="w-full mt-2 flex">
                        <div className=" rounded-lg ">
                        <input className=" rounded-lg  w-full  font-normal text-grayText" type="checkbox" id="billing" name="billing" placeholder="Delivery Instruction"/>
                        </div>
                            <label for="billing" className="pl-2 text-sm font-normal text-darkText">Set as default billing address</label>
                        
                        </div>

                        <div className="md:flex grid grid-cols-2 md:gap-6 gap-4 mt-9 md:font-bold md:text-xl">
                        <button className="rounded-lg  text-white md:w-32 w-full h-12 bg-primary">Save</button>
                        <button className="rounded-lg text-grayText  md:w-32 w-full h-12 bg-secondary">Cancel</button>
                        </div>
                    </form>
                        
                        
                    </div>

                    </div>
                </div>
            </div>
            </div>
        </Fragment>
    )
}