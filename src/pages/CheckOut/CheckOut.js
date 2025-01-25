import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import leftArrowIcon from "../../assets/icons/left-arrow.svg";
import googlePay from "../../assets/icons/googlePay.png";
import visa from "../../assets/icons/visa.png";
import payPal from "../../assets/icons/paypal.png";
import payPass from "../../assets/icons/paypass.png";
import { IoMdEyeOff } from "react-icons/io";
import { IoMdEye } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/users/userSlice";
import InfoAccount from "../Account/InfoAccount";

export default function CheckOut () {

    const cartItems = useSelector((state) => state.cart.cart); // Updated to match slice state
    const totalQuantity = useSelector((state) => state.cart.totalQuantity); // Get total quantity
    const dispatch = useDispatch();
    const [showNewAddress,setShowNewAddress] = useState(false);
    const [editingAddress, setEditingAddress] = useState(null);
    
    const { uid } = useSelector(selectUser);


    const today = new Date();

    // Arrays for day names and month names
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
    ];

    // Function to get the formatted date
    function getFormattedDate(date) {
    const dayName = days[date.getDay()];
    const monthName = months[date.getMonth()];
    const dayNumber = date.getDate();
    return `${dayName}, ${monthName} ${dayNumber}`;
    }

    // Get the next 5 days (including today)
    const nextFiveDays = [];
    for (let i = 0; i < 6; i++) {
    const nextDate = new Date(today); // Create a copy of today's date
    nextDate.setDate(today.getDate() + i); // Increment the day by `i`
    nextFiveDays.push(getFormattedDate(nextDate)); // Add the formatted date to the array
    }



      const calculateTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity , 0);
      };

      const calculateTotalPriceShipping = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity + 5 , 0);
      };

      const handleSaveAndClose = () => {
        setShowNewAddress(false);
        setEditingAddress(null);
      };

    return(
        <Fragment>
            <div className="container mx-auto w-full h-full accountPage">
                <div className="pb-12 pt-3 flex lg:text-lg"><Link to="/" className="text-grayText font-normal  pr-3">Home</Link><img src={leftArrowIcon} width="5px" height="10.14px" alt="arrow"/>
                <Link to="/account" className="pl-3 pr-3 text-grayText font-normal ">My Account</Link><img src={leftArrowIcon} width="5px" height="10.14px" alt="arrow"/>
                <Link className="text-darkText font-normal  pl-3">Check Out</Link>
                </div>

                <div className='text-darkText flex md:text-2xl text-lg font-bold '><div className='title-part '></div><h3 className='pl-3 pt-1'>Check Out</h3></div>
                
                <div className="flex md:flex-row flex-col-reverse">

                    <div className="pb-8 lg:pt-0 pt-4 lg:w-3/4 w-full md:mr-10">
                    <h3 className="text-darkText md:text-xl text-md font-bold pb-8">Billing Details</h3>
                    <InfoAccount uid={uid} onSave={handleSaveAndClose} existingData={editingAddress}/>
                    <form>

                        <div className="pt-6 pb-6 border-b-2 border-secondary">
                            <h3 className="text-darkText md:text-xl text-base font-bold pb-3">Shipping Method</h3>
                            <div className="rounded-xl bg-secondary py-9 px-7 mt-7 ">
                                <div className="w-full pb-6 border-b-2 border-borderGrey">
                                
                                    <h4 className="font-bold md:text-lg text-base text-darkText">Arrives by {nextFiveDays[5]}</h4>
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
                    </form>

                    </div>

                    <div className="pb-8 py-6 px-6 lg:w-1/4 w-full h-fit border-2 rounded-lg border-secondary md:my-0 my-6">
                        <h3 className="font-bold md:text-2xl text-base pb-3 border-b-2 border-borderGrey">Order Summary</h3>

                        {cartItems.map((item) => (
                        <div key={item._id} className="flex justify-between items-center font-bold text-sm  py-5 border-b-2 border-borderGrey">
                        <div className="flex">
                        <img className="rounded-md w-16 h-16 md:mr-4 mr-3" src={item.image} alt={item.title}/>
                        <div className="text-darkText ">
                        <h4 className="">{item.title}<span className="text-grayText font-light"> x {item.quantity}</span></h4>
                        <h4 className="mt-2">Color : <span className="text-grayText font-light">{item.color}</span></h4>
                        </div>
                        </div>
                        <h4 className="text-grayText font-bold">${item.price}</h4>
                        </div>
                        ))}

                        

                        <div className="py-4 border-b-2 border-borderGrey text-darkText font-bold md:text-lg text-sm">
                            <div className="flex justify-between">
                            <h4 className="">Subtotal <span className="text-grayText font-light">( {totalQuantity} items )</span></h4>
                            <h4 className="">${calculateTotalPrice().toFixed(2)}</h4>
                            </div>
                        </div>

                        <div className="py-4 flex justify-between border-b-2 border-borderGrey text-darkText font-bold md:text-lg text-sm">
                            <h4 className="">Shipping</h4>
                            <h4 className="">+$5.00</h4>
                        </div>

                        <div className="pt-4 flex justify-between text-darkText font-bold md:text-lg text-sm">
                            <h4 className="">Total</h4>
                            <h4 className="">${calculateTotalPriceShipping().toFixed(2)}</h4>
                        </div>

                    </div>

                </div>

            
            </div>
        </Fragment>
    )
}