import React, { Fragment } from "react";
import Nike from "../../assets/images/nike.png";
import Puma from "../../assets/images/puma.png";
import Polo from "../../assets/images/polo.png";
import hM from "../../assets/images/h&m.png";
import Levis from "../../assets/images/levis.png";
import { Img } from "react-image";

export default function Brands() {

    return(
        <Fragment>
            <div className="bg-darkText w-full lg:h-96 md:h-96  h-fit rounded-xl">
            <div className="text-center xl:translate-y-11  lg:translate-y-5 md:translate-y-7 translate-y-3">
                <h2 className="text-white font-extrabold lg:text-5xl md:text-4xl text-3xl">Top Brands Deal</h2>
                <h3 className="text-white font-base lg:text-xl  xl:py-14 lg:py-6 py-4">Up To <span className="font-semibold text-yellow">60%</span> off on brands</h3>

                <div className="flex justify-center text-center pb-10">
                <div className=" flex flex-wrap justify-center lg:gap-5 gap-4">
                <div className="flex justify-center rounded-xl w-48 h-24 bg-white p-3">
                <Img
                src={Nike}
                width="100%" height="100%"
                loader={<span>Loading...</span>}
                unloader={<span>Failed to load image</span>}
                alt="brand"
                />
                </div>

                <div className="flex justify-center rounded-xl w-48 h-24 bg-white p-3">
                <Img
                src={hM}
                width="100%" height="100%"
                loader={<span>Loading...</span>}
                unloader={<span>Failed to load image</span>}
                alt="brand"
                />
                </div>

                <div className="flex justify-center rounded-xl w-48 h-24 bg-white p-3">
                    <Img
                    src={Levis}
                    width="100%" height="100%"
                    loader={<span>Loading...</span>}
                    unloader={<span>Failed to load image</span>}
                    alt="brand"
                    />
                </div>

                <div className="flex justify-center rounded-xl w-48 h-24 bg-white p-3">
                    <Img
                    src={Polo}
                    width="100%" height="100%"
                    loader={<span>Loading...</span>}
                    unloader={<span>Failed to load image</span>}
                    alt="brand"
                    />
                </div>

                <div className="flex justify-center rounded-xl w-48 h-24 bg-white p-3">
                    <Img
                    src={Puma}
                    width="100%" height="100%"
                    loader={<span>Loading...</span>}
                    unloader={<span>Failed to load image</span>}
                    alt="brand"
                    />
                </div>
                </div>
                </div>
            </div>
            </div>
        </Fragment>
    )
}