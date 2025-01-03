import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import imageCard from "../../assets/images/men-jacket.png";
import leftArrowIcon from "../../assets/icons/left-arrow.svg";
import googlePay from "../../assets/icons/googlePay.png";
import visa from "../../assets/icons/visa.png";
import payPal from "../../assets/icons/paypal.png";
import payPass from "../../assets/icons/paypass.png";
import { IoMdEyeOff } from "react-icons/io";
import { IoMdEye } from "react-icons/io";
export default function CheckOut () {

    return(
        <Fragment>
            <div className="container mx-auto w-full h-full accountPage">
                <div className="pb-12 pt-3 flex lg:text-lg"><Link to="/" className="text-grayText font-normal  pr-3">Home</Link><img src={leftArrowIcon} width="5px" height="10.14px" alt="arrow"/>
                <Link to="/account" className="pl-3 pr-3 text-grayText font-normal ">My Account</Link><img src={leftArrowIcon} width="5px" height="10.14px" alt="arrow"/>
                <Link className="text-darkText font-normal  pl-3">Check Out</Link>
                </div>

                <div className='text-darkText flex md:text-2xl text-lg font-bold '><div className='title-part '></div><h3 className='pl-3 pt-1'>Check Out</h3></div>
                
                <div className="flex justify-between">

                    <div className="pb-8 lg:pt-0 pt-4 lg:w-3/4 w-full">
                    <h3 className="text-darkText md:text-xl text-md font-bold pb-8">Billing Details</h3>
                    <form action="" method="GET">

                        <div className="grid md:grid-cols-2 grid-cols-1 md:gap-8 gap-4 ">
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
                            <label for="postalCode" className="lg:text-lg text-md font-semibold text-darkText">Postal Code*</label>
                                <div className="bg-secondary rounded-lg mt-2">
                                    <input className="bg-secondary text-xs rounded-lg  w-full font-normal text-grayText py-4 px-5" type="text" id="postalCode" name="postalCode" placeholder="Postal Code"/>
                                </div>
                            </div>
                            
                            <div className="w-full">
                            <label for="phone" className="lg:text-lg text-md font-semibold text-darkText">Phone*</label>
                                <div className="bg-secondary rounded-lg mt-2">
                                    <input className="bg-secondary text-xs rounded-lg  w-full font-normal text-grayText py-4 px-5" type="text" id="phone" name="phone" placeholder="Phone"/>
                                </div>
                            </div>
                            
                        </div>
                        
                        <div className="mt-9 font-medium md:text-lg text-base flex md:justify-start justify-center">
                        <button className="rounded-lg  text-white py-4 px-5 bg-primary">Continue to delivery</button>
                        </div>

                        <div className="w-full mt-6 flex pb-6 border-b-2 border-secondary">
                        <div className=" rounded-lg ">
                        <input className=" rounded-lg  w-4 h-4  font-normal text-grayText" type="checkbox" id="shipping" name="shipping" placeholder="Delivery Instruction"/>
                        </div>
                            <label for="shipping" className="pl-2 md:-mt-1   md:text-lg text-sm font-normal text-darkText">Save my information for a faster checkout</label>
                        </div>

                        
                        </form>

                        <div className="pt-6 pb-6 border-b-2 border-secondary">
                            <h3 className="text-darkText md:text-xl text-base font-bold pb-3">Shipping Address</h3>
                            <p className="text-darkText font-medium text-sm">Select the address that matches your card or payment method.</p>
                            <div className="rounded-xl bg-secondary py-9 px-7 mt-7 ">
                                <div className="w-full  flex pb-6 border-b-2 border-borderGrey">
                                <div className=" rounded-lg ">
                                <input className=" rounded-lg  w-4 h-4 md:mt-0 mt-1 font-normal text-grayText" type="radio" id="billingAddress" name="billingAddress" placeholder="Delivery Instruction"/>
                                </div>
                                    <label for="billingAddress" className="pl-2 md:-mt-1  font-bold md:text-lg text-base text-darkText">Same as Billing address</label>
                                </div>

                                <div className="w-full mt-6 flex">
                                <div className=" rounded-lg ">
                                <input className=" rounded-lg  w-4 h-4 md:mt-0 mt-1 font-normal text-grayText" type="radio" id="diffAddress" name="diffAddress" placeholder="Delivery Instruction"/>
                                </div>
                                    <label for="diffAddress" className="pl-2 md:-mt-1  font-bold md:text-lg text-base text-darkText">Use a different shipping address</label>
                                </div>
                            </div>
                        </div>

                        <div className="pt-6 pb-6 border-b-2 border-secondary">
                            <h3 className="text-darkText md:text-xl text-base font-bold pb-3">Shipping Method</h3>
                            <div className="rounded-xl bg-secondary py-9 px-7 mt-7 ">
                                <div className="w-full pb-6 border-b-2 border-borderGrey">
                                
                                    <h4 className="font-bold md:text-lg text-base text-darkText">Arrives by Monday, June 7</h4>
                                </div>

                                <div className="w-full mt-6">
                                
                                    <div className="flex justify-between font-bold md:text-lg text-base text-darkText">
                                    <h4 className="">Delivery Charges</h4>
                                    <h4>$5.00</h4>
                                    </div>

                                    <h5 className="text-grayText font-light md:text-base text-sm pt-2">Additional fess may apply</h5>
                                </div>
                            </div>
                        </div>

                        <div className="pt-6 pb-6">
                            <h3 className="text-darkText md:text-xl text-base font-bold pb-3">Payment Method</h3>
                            <p className="text-darkText font-medium text-sm">All transactions are secure and encrypted.</p>
                            <div className="rounded-xl bg-secondary py-9 px-7 mt-7 ">
                                <div className="w-full  pb-6 border-b-2 border-borderGrey">
                                <div className="flex ">
                                <div className=" rounded-lg ">
                                <input className=" rounded-lg  w-4 h-4 md:mt-3 mt-1 font-normal text-grayText" type="radio" id="billingAddress" name="billingAddress" placeholder="Delivery Instruction"/>
                                </div>
                                <div>
                                    <label for="billingAddress" className="pl-4 md:-mt-4  font-bold md:text-lg text-base text-darkText">Credit Card</label>
                                    <p className="text-darkText font-medium text-sm pl-4">We accept all major credit cards.</p>
                                </div>
                                </div>

                                    <div className="grid md:grid-cols-6 grid-cols-4 gap-3 mt-6 ml-8">
                                        <div className="bg-white rounded-md py-3 px-2 flex justify-center items-center"><img src={googlePay} className="" alt=""/></div>
                                        <div className="bg-white rounded-md py-3 px-2 flex justify-center items-center"><img src={visa} alt=""/></div>
                                        <div className="bg-white rounded-md py-3 px-2 flex justify-center items-center"><img src={payPal} alt=""/></div>
                                        <div className="bg-white rounded-md py-3 px-2 flex justify-center items-center"><img src={payPass} alt=""/></div>
                                    </div>

                                    <div className="grid md:grid-cols-2 grid-cols-1 md:gap-8 gap-4 mt-6 ml-8">
                                        <div className="w-full">
                                            <div className="bg-secondary rounded-lg mt-2 border-2 border-grayText">
                                                <input className="bg-secondary text-xs rounded-lg  w-full font-normal text-grayText py-4 px-5" type="text" id="cardNumber" name="cardNumber" placeholder="Card Number"/>
                                            </div>
                                        </div>

                                        <div className="w-full">
                                            <div className="bg-secondary rounded-lg mt-2 border-2 border-grayText">
                                                <input className="bg-secondary text-xs rounded-lg  w-full font-normal text-grayText py-4 px-5" type="text" id="nameCard" name="nameCard" placeholder="Name of Card"/>
                                            </div>
                                        </div>

                                        <div className="w-full">
                                            <div className="bg-secondary rounded-lg mt-2 border-2 border-grayText">
                                                <input className="bg-secondary text-xs rounded-lg  w-full font-normal text-grayText py-4 px-5" type="text" id="expirationDate" name="expirationDate" placeholder="Expiration date (MM/YY)"/>
                                            </div>
                                        </div>

                                        <div className="w-full">
                                            <div className="bg-secondary rounded-lg mt-2 border-2 border-grayText flex justify-between">
                                                <input className="bg-secondary text-xs rounded-lg  w-full font-normal text-grayText py-4 px-5" type="text" id="securityCode" name="securityCode" placeholder="Security Code"/>
                                                <button className="flex justify-center items-center text-grayText"><IoMdEye className="mr-4"/><IoMdEyeOff className="mr-4"/></button>
                                            </div>
                                        </div>


                                    </div>
                                </div>

                                <div className="w-full mt-6 flex pb-6 border-b-2 border-borderGrey">
                                <div className=" rounded-lg ">
                                <input className=" rounded-lg  w-4 h-4 md:mt-3 mt-1 font-normal text-grayText" type="radio" id="billingAddress" name="billingAddress" placeholder="Delivery Instruction"/>
                                </div>
                                    <div>
                                    <label for="billingAddress" className="pl-4 md:-mt-1  font-bold md:text-lg text-base text-darkText">Cash on delivery</label>
                                    <p className="text-darkText font-medium text-sm pl-4">Pay with cash upon delivery.</p>
                                    </div>
                                </div>

                                <div className="w-full mt-6 flex">
                                <div className=" rounded-lg ">
                                <input className=" rounded-lg  w-4 h-4 md:mt-0 mt-1 font-normal text-grayText" type="radio" id="diffAddress" name="diffAddress" placeholder="Delivery Instruction"/>
                                </div>
                                    <label for="diffAddress" className="pl-4 md:-mt-1  font-bold md:text-lg text-base text-darkText">Paypal</label>
                                    
                                </div>
                            </div>
                        </div>

                        <div className="mt-9 font-medium md:text-lg text-base flex md:justify-start justify-center">
                        <button className="rounded-lg  text-white py-4 px-5 bg-primary">Pay Now</button>
                        </div>

                    </div>

                    <div></div>

                </div>

            
            </div>
        </Fragment>
    )
}