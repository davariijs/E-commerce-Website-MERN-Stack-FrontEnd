import React, { Fragment } from "react";
import orderImg from "../../assets/images/order-confirmed.png";
import { Link } from "react-router-dom";


export default function ConfirmedOrder () {

    return(
        <Fragment>
            <div className="flex justify-center items-center">
                <Link to="/"><img src={orderImg} alt="order" /></Link>
            </div>
        </Fragment>
    )
}