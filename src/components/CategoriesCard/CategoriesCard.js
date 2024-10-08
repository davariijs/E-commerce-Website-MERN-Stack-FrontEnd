import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { GoArrowRight } from "react-icons/go";
import likeIconCard from "../../assets/icons/like.svg";

export default function CategoriesCard({srcCategoriesCard, textCategoriesCard,price,categoriesFashionCard,brand,linkCard}) {

    return (
        <Fragment>
            <div className="categoriesCardSection">
            <Link to={linkCard}>
            <div className="relative categoriesCardImgPart">
                <img className="rounded-lg hover:opacity-70 categoriesCardImg" width="100%" height="100%" src={srcCategoriesCard} alt="men clothing"/>
                {categoriesFashionCard ? <div></div> : <div className="absolute bg-white w-8 h-8 flex justify-center lg:top-6 lg:right-7 top-2 right-2 z-10" style={{borderRadius:"50%"}}><img src={likeIconCard} width={20} alt="like"/></div>}
            </div>

            <div className="pt-4">
                
                <div className="flex justify-between">
                <div className="">
                    <h3 className="font-bold lg:text-lg md:text-lg text-sm text-textCategory">{textCategoriesCard}</h3>
                    {categoriesFashionCard ?  <h5 className="pt-1 font-normal lg:text-sm md:text-sm text-xs  text-textThinGray">Explore Now!</h5> : <h5 className="pt-1 font-normal lg:text-sm md:text-sm text-xs  text-textThinGray">{brand}</h5>}
                </div>

                <div>
                    {categoriesFashionCard ?  <div className="text-darkText mt-5"><GoArrowRight /></div> : <div className="text-darkText bg-secondary lg:px-4 lg:py-2 md:px-4 md:py-2 px-2 py-1 font-bold text-sm rounded-lg mt-4">{price}</div>}
                </div>
                </div>
                
            </div>
            </Link>
            </div>
        </Fragment>
    )

}