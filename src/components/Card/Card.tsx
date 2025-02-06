import React, { Fragment} from "react";
import { Link } from "react-router-dom";
import "./Card.css";
import { GoArrowDown } from "react-icons/go";
import { Img } from "react-image";

type TCard = {
    priceTitle:string,
    mainTitle:string,
    discount:string,
    seeMore:string,
    srcCard:string,
    alt:string,
    showFirstType?:boolean,
    cardFashionTextZone?:string,
    rowReverse?:string,
    titleLimited?:boolean,
    textColor?:string,
    borderColor?:string,
}

export default function Card ({priceTitle,mainTitle,discount,seeMore,srcCard,alt,showFirstType,cardFashionTextZone,rowReverse, titleLimited, textColor,borderColor}:TCard) {


    return (
        <Fragment>
            {showFirstType?
            <div className="w-full h-full rounded-xl flex justify-between relative">
                <div className="cardFashionText z-10 pl-7 text-white ">
                    <h5 className="font-extrabold lg:text-lg md:text-lg text-base">{priceTitle}</h5> 
                    <h2 className="font-extrabold lg:text-4xl md:text-3xl text-xl lg:pt-6 pt-2">{mainTitle}</h2>
                    <h3 className="font-medium text-base pt-2 lg:pb-10 pb-2">{discount}</h3>
                    <Link to="" className="font-extrabold lg:text-xl text-lg hover:underline">{seeMore}</Link>
                </div>
                <div className="h-full w-full relative">
                <Img
                src={srcCard} 
                alt={alt}
                width="100%" height="100%"
                loader={<span></span>}
                unloader={<span>...</span>}
                className="rounded-xl"
                />
                </div>
            </div>
            : <>
            <div className={`w-full h-full rounded-xl flex ${rowReverse} justify-between relative`}>
                <div className={`${cardFashionTextZone} z-10 lg:px-7 md:px-2 px-3 ${textColor} relative`}>
                    {titleLimited ? <h2 className=" font-semibold text-xs bg-darkText w-fit lg:p-3 p-1 rounded">Limited Stock</h2> : ""}
                    <h2 className="font-extrabold lg:text-4xl md:text-2xl text-xl xl:pt-6 lg:pt-0 pt-1 lg:pb-6 md:pb-0 pb-4">{mainTitle}</h2>
                    <h5 className="font-semibold text-sm">{priceTitle}</h5> 
                    <h3 className="font-bold lg:text-lg md:text-base text-base  pt-2 lg:pb-20 pb-11">{discount}</h3>
                    <div className="absolute lg:left-20 left-14 lg:bottom-16 bottom-10"><GoArrowDown className="h-6 w-6"/></div>
                    <Link to="" className={`font-semibold text-xs border-2 px-6 py-1 ${borderColor} rounded`}>{seeMore}</Link>
                </div>
                <div className="h-full w-full relative">
                    <Img
                    src={srcCard} 
                    alt={alt}
                    width="100%" height="100%"
                    loader={<span></span>}
                    unloader={<span>...</span>}
                    className="rounded-xl"
                    />
                </div>
            </div>
            </> }
        </Fragment>
    )
}

