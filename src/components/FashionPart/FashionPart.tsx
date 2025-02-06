import React , { Fragment } from "react";
import FashionCard1 from "../../assets/images/fashion1.png";
import FashionCard2 from "../../assets/images/fashion2.png";
import "./FashionPart.css";
import { Link } from "react-router-dom";
import { Img } from "react-image";

export default function FashionPart() {

    return(
        <Fragment>
            <div>
                <div className="lg:flex md:flex">
                    <div className="w-full h-full  relative m-auto">
                    <Img
                    src={FashionCard2}
                    loader={<span></span>}
                    unloader={<span>...</span>}
                    className="fashionCard1" width="100%" height="100%" alt="fashion"
                    />
                    <div className="fashionPartText ">
                        <h2 className="font-extrabold lg:text-4xl md:text-3x1 text-lg text-white">WE MADE YOUR EVERYDAY FASHION BETTER!</h2>
                        <p className="font-light lg:text-xl md:text-lg text-xs lg:pt-7 md:pt-3 md:pb-5 pt-1 pb-3 lg:pb-14 text-white">In our journey to improve everyday fashion, euphoria presents EVERYDAY wear range - Comfortable & Affordable fashion 24/7</p>
                        <Link to="" className="text-darkText font-semibold lg:text-lg text-sm lg:px-9 md:px-5 px-1 py-1 md:py-2 lg:py-3 text-nowrap bg-white text-center lg:rounded-lg rounded-md">Shop Now</Link>
                    </div>
                    </div>

                    <div className="w-full h-full">
                    <Img
                    src={FashionCard1}
                    loader={<span></span>}
                    unloader={<span>...</span>}
                    className="fashionCard2" width="100%" height="100%" alt="fashion"
                    />
                    </div>
                </div>
            </div>
        </Fragment>
    )
}