import React , { Fragment } from "react";
import { Link } from "react-router-dom";
import leftArrowIcon from "../../assets/icons/left-arrow.svg";


export default function Cart() {


    return(
        <Fragment>
                <div className="relative">
                    <div className="absolute bg-darkText w-full h-20 top-48"></div>
                <div className="container mx-auto px-5 md:px-0">
                    
                    <div className="pt-14 pb-6 flex lg:text-lg"><Link to="/" className="text-grayText font-normal  pr-3">Home</Link><img src={leftArrowIcon} width="5px" height="10.14px" alt="arrow"/>
                    <Link to="/account" className="pl-3 pr-3 text-darkText font-normal ">Add To Cart</Link>
                    </div>

                    <div className="text-grayText text-sm"><h3>Please fill in the fields below and click place order to complete your purchase!</h3><Link>Already registered? <span className="text-primary font-semibold">Please login here</span></Link></div>

                    <div>
                        <div>
                            <div>
                                <h4>Product Details</h4>
                                <h4></h4>
                                <h4></h4>
                                <h4></h4>
                                <h4></h4>
                            </div>

                        </div>
                        <div></div>
                    </div>
                </div>
                </div>
        </Fragment>
    )
}