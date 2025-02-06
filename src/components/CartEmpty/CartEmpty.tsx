import React, { Fragment } from "react";
import cartImg from "../../assets/images/cart-empty.png";
import { Link } from "react-router-dom";
import { Img } from "react-image";


export default function CartEmpty () {

    return(
        <Fragment>
                <div className="container mx-auto px-6">
                <div className="flex flex-col justify-center items-center my-20">
                <Img
                src={cartImg}
                loader={<span></span>}
                unloader={<span>...</span>}
                className="w-80" 
                alt="order"
                />
                <h4 className="mt-8 text-black font-bold md:text-3xl text-lg text-center">Your cart is empty and sad :(</h4>
                <h5 className="mt-2 font-normal text-base text-grayText text-center">Add something to make it happy!</h5>
                <Link to="/"><button className="mt-10 bg-primary rounded-lg py-3 md:px-12 px-6 text-white font-semibold">Continue Shopping</button></Link>
            </div>
            </div>
        </Fragment>
    )
}