import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { IoCloseOutline } from "react-icons/io5";
import imageCard from "../../assets/images/men-jacket.png"
import "./Account.css"
import WishlistEmpty from "../../components/WishlistEmpty/WishlistEmpty";

export default function Wishlist () {

    return(
        <Fragment>
            <div className="pt-10">

                <div>
                    <WishlistEmpty/>
                </div>

                <div className="flex justify-between border-b-2 border-borderGreyLight pb-6">
                    
                    <div className="flex justify-center items-center">
                    <IoCloseOutline className="w-5 h-5 text-darkText"/>
                    <img className="rounded-md w-28 h-28 mx-6" src={imageCard} alt=""/>
                    <div className="text-darkText font-bold lg:text-xl text-md">
                    <h4>Blue Flower Print Crop Top </h4>
                    <h4 className="my-3">Color : <span className="text-grayText">Yellow</span></h4>
                    <h4>Quantity : <span className="text-grayText">1</span></h4>
                    </div>
                    </div>

                    <div className="flex justify-between items-center">
                        <h4 className="text-grayText font-bold lg:text-xl text-md">$29.00</h4>
                        <div className="bg-primary rounded-lg py-3 px-7 text-white md:ml-12 ml-5">Add to cart</div>
                    </div>
                </div>

            </div>
        </Fragment>
    )
}