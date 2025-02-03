import React, { Fragment } from "react";
import ShoppingImg from "../../assets/images/shopping.jpg";
import YellowFashionImg from "../../assets/images/yellow-style.jpg";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import "./Hero.css";
import { Link } from "react-router-dom";

const Hero: React.FC = () => {

    return (
        <Fragment>
            <div>
            <Carousel      
            className="relative"
            renderArrowPrev={(clickHandler: () => void, hasPrev: boolean) => {
                return (
                <div
                    className={`${
                    hasPrev ? 'absolute' : 'hidden'
                    } top-0 bottom-0 left-0 flex justify-center items-center p-3 opacity-100 hover:opacity-100 cursor-pointer z-20`}
                    onClick={clickHandler}
                >
                    <IoIosArrowBack  className="lg:w-32 lg:h-44 md:w-12 md:h-24 text-white" />
                </div>
                );
            }}
            renderArrowNext={(clickHandler: () => void, hasNext: boolean) => {
                return (
                <div
                    className={`${
                    hasNext ? 'absolute' : 'hidden'
                    } top-0 bottom-0 right-0 flex justify-center items-center p-3 opacity-100 hover:opacity-100 cursor-pointer z-20`}
                    onClick={clickHandler}
                >
                    <IoIosArrowForward className="lg:w-32 lg:h-44 md:w-12 md:h-24 text-white" />
                </div>
                );
            }}
            showArrows={true} showThumbs={false} showStatus={false}>
                <div className="CarouselFirst">
                    <img className="relative" src={ShoppingImg} alt="Shopping" height="716px" width="100vw"/>
                    <div className="legend absolute">
                        <div>
                            <h5 className="lg:text-3xl md:text-base text-sm">T-shirt / Tops</h5>
                            <h1 className="lg:text-7xl md:text-lg text-base font-extrabold">Summer 
                            Value Pack</h1>
                            <h4 className="lg:text-3xl md:text-base text-sm">cool / colorful / comfy</h4> 
                            <Link to="/women"><button className="lg:text-3xl md:text-base text-sm text-darkText font-semibold bg-white rounded-lg lg:py-4  lg:px-16 py-2 px-8">Shop Now</button></Link>
                        </div>
                    </div>
                </div>
                <div className="CarouselSecond relative">
                    <img src={YellowFashionImg} alt="Yellow style" />
                    <div className="legend absolute">
                        <div>
                            <h5 className="lg:text-3xl md:text-base text-sm">Bags</h5>
                            <h1 className="lg:text-7xl md:text-lg text-base font-extrabold">New Collection</h1>
                            <Link to="/women"><button className="lg:text-3xl md:text-base text-sm text-darkText font-semibold bg-white rounded-lg lg:py-4  lg:px-16 py-2 px-8">Shop Now</button></Link>
                        </div>
                    </div>
                </div>
            </Carousel>
            </div>
        </Fragment>
    )
}

export default Hero;