import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { IoCloseOutline } from "react-icons/io5";
import imageCard from "../../assets/images/men-jacket.png"
import "./Account.css"
import StepProgress from "../../components/StepProgress/StepProgress";


export default function OrderDetails () {


    return(
        <Fragment>
            <div>

                <div className="bg-secondary md:py-7 md:px-12 py-3 px-5 flex justify-between items-center rounded-lg">
                    <div>
                        <h3 className="text-darkText font-semibold md:text-xl text-base">Order no: #123456789</h3>
                        <h4 className="font-light text-base text-borderGrey pt-2">Placed On  2 June 2023 2:40 PM </h4>
                    </div>
                    <h4 className="font-semibold md:text-lg text-base text-grayText">Total : <span className="text-darkText">$143.00</span></h4>
                </div>

                <div>
                    <StepProgress/>
                </div>


                <div className="bg-secondary md:py-7 md:px-12 py-3 px-5 my-10 rounded-lg">
                    <div className="flex justify-between font-semibold md:text-xl text-sm py-5 border-b-2 border-borderGrey">
                        <div className="flex">
                        <img className="rounded-md w-24 h-24 md:mr-6 mr-3" src={imageCard} alt=""/>
                        <div className="text-darkText ">
                        <h4 className="">Men Blue Shirt</h4>
                        <h4 className="mt-2">Color : <span className="text-grayText font-light">White</span></h4>
                        </div>
                        </div>

                        <h4 className="text-darkText ">Qty <span className="text-grayText font-light">1</span></h4>
                        <h4 className="text-grayText font-bold">$24.00</h4>
                        <div className=""><button><IoCloseOutline className="w-5 h-5 text-darkText"/></button></div>
                    </div>

                    <div></div>
                </div>

                

            </div>
        </Fragment>
    )
}