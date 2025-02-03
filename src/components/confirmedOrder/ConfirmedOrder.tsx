import React, { Fragment } from "react";
import orderImg from "../../assets/images/order-confirmed.png";
import { Link } from "react-router-dom";
import { Img } from "react-image";


export default function ConfirmedOrder () {

    return(
        <Fragment>
            <div className="flex justify-center items-center">
                <Link to="/">
                <Img
                src={orderImg}
                loader={<span>Loading...</span>}
                unloader={<span>Failed to load image</span>}
                alt="order"
                />
                </Link>
            </div>
        </Fragment>
    )
}