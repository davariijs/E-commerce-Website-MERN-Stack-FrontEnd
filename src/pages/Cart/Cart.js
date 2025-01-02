import React , { Fragment } from "react";
import { Link } from "react-router-dom";
import leftArrowIcon from "../../assets/icons/left-arrow.svg";
import "./Cart.css";
import { FaRegTrashAlt } from "react-icons/fa";
import productImg from "../../assets/images/hawaiianShirts.png"

export default function Cart() {


    return(
        <Fragment>
                <div className="relative">
                    <div className="absolute bg-darkText w-full h-20 top-48 z-0"></div>
                    <div className="absolute bg-secondary z-0 w-full bottom-0 checkout-bg"></div>
                <div className="container mx-auto px-5 md:px-0">
                    
                    <div className="pt-14 pb-6 flex lg:text-lg"><Link to="/" className="text-grayText font-normal  pr-3">Home</Link><img src={leftArrowIcon} width="5px" height="10.14px" alt="arrow"/>
                    <Link to="/account" className="pl-3 pr-3 text-darkText font-normal ">Add To Cart</Link>
                    </div>

                    <div className="text-grayText text-sm"><h3>Please fill in the fields below and click place order to complete your purchase!</h3><Link>Already registered? <span className="text-primary font-semibold">Please login here</span></Link></div>

                    <div className="header-types relative">
                        <div>
                            <div className="text-white header-types-text font-semibold md:text-lg text-sm uppercase flex justify-between">
                                <div>
                                <h4>Product Details</h4>
                                </div>
                                <div className="grid grid-cols-4 md:gap-6 gap-4 justify-center items-center text-center">
                                <h4>Price</h4>
                                <h4>Quantity</h4>
                                <h4>subtotal</h4>
                                <h4>Action</h4>
                                </div>
                            </div>

                            <div className=" w-full mt-12">
                            <div className="flex justify-between py-12">
                                <div className="sm:flex flex flex-col-reverse">
                                    <img className="w-24 h-28 mr-4 rounded-xl" src={productImg} alt="product"/>
                                    <div className="sm:mb-0 pb-5 ">
                                        <h4 className="font-bold text-darkText md:text-lg text-sm">Blue Flower Print Crop Top</h4>
                                        <h4 className="font-medium text-grayText text-sm">Color : Yellow</h4>
                                    </div>
                                </div>
                                <div className="grid grid-cols-4 gap-5  justify-center items-center text-center md:mt-0 mt-5">
                                <div className="font-bold text-darkText md:text-lg text-xs">$29.00</div>
                                <div className="md:w-24 w-16   h-9 bg-secondary rounded-lg text-darkText text-center flex items-center justify-between md:px-5 px-2">
                                    <button>-</button>
                                    {1}
                                    <button>+</button>
                                </div>
                                <div className="font-bold text-darkText md:text-lg text-xs text-center sm:pl-0 pl-3">$29.00</div>
                                <button className="flex justify-center text-center"><FaRegTrashAlt className="text-primary"/></button>
                                </div>
                            </div>
                            <hr className="text-borderGrey"/>
                            </div>

                        </div>
                        <div className="lg:flex justify-between mt-24 ">
                            <div className="flex flex-col justify-center items-center lg:items-start">
                                <h4 className="text-darkText font-semibold text-2xl">Discount  Codes</h4>
                                <h5 className="text-grayText font-normal text-base mt-2">Enter your coupon code if you have one</h5>
                                <div className="my-10">
                                <input className="border-2 border-borderGrey bg-white sm:py-3 py-2 sm:px-5 px-2 rounded-l-xl"/>
                                <button className="bg-primary font-semibold text-white sm:py-3 py-2 sm:px-5 px-2 sm:text-base rounded-r-xl border-y-2 border-r-2 border-borderGrey">Apply Coupon</button>
                                </div>
                                <button className="bg-white text-base text-darkText font-semibold py-3 px-5 rounded-lg border-2 border-borderGrey w-fit">Continue Shopping</button>
                            </div>

                            <div className="bg-grayCart py-10 lg:mt-0 md:mt-12 -mt-5">
                                <div className="flex justify-between px-20  text-darkText font-medium text-xl">
                                    <span>Sub Total </span> 
                                    <span>$513.00</span>
                                </div>

                                <div className="flex justify-between pt-3 px-20 text-darkText font-medium text-xl">
                                    <span>Shipping</span> 
                                    <span>$5.00</span>
                                </div>

                                <div className="flex justify-between py-9 px-20 text-darkText font-bold text-xl">
                                    <span>Grand Total</span> 
                                    <span>$518.00</span>
                                </div>
                                
                                <hr className="text-borderGrey"/>

                                <div className="flex justify-center mt-10">
                                <button className="bg-primary font-semibold text-white text-lg py-3 px-5 rounded-lg">Proceed To Checkout</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
        </Fragment>
    )
}