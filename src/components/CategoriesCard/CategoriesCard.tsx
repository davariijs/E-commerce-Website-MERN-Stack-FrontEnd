import React, { Fragment} from "react";
import { Link } from "react-router-dom";
import { GoArrowRight } from "react-icons/go";
import "./CategoriesCard.css";
import { Img } from "react-image";

type TCategoriesCard ={
    srcCategoriesCard:string,
    textCategoriesCard:string,
    price?:string | number,
    categoriesFashionCard?:boolean,
    brand?:string,
    linkCard:number | string,
    onClick?:()=>void,
}

export default function CategoriesCard({srcCategoriesCard, textCategoriesCard,price,categoriesFashionCard,brand,linkCard,onClick}:TCategoriesCard) {


    

    return (
        <Fragment>
            <div className="categoriesCardSection">
            
            <div className="relative categoriesCardImgPart">
            <Link to={String(linkCard)}>
            <Img
                src={srcCategoriesCard}
                loader={<span>...</span>}
                unloader={<span>...</span>}
                className="rounded-lg hover:opacity-70 categoriesCardImg"
                width="100%" 
                height="100%"
                alt="order"
            />
            </Link>
                {categoriesFashionCard ? <div></div> : <div onClick={onClick} className="cardSvgLike absolute bg-white w-8 h-8 flex justify-center lg:top-6 lg:right-7 top-2 right-2 z-10 cursor-pointer" style={{borderRadius:"50%"}}>
                    <svg className="likeSvg" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M9.99486 4.93014C8.49535 3.18262 5.99481 2.71255 4.11602 4.31275C2.23723 5.91295 1.97273 8.5884 3.44815 10.481C4.67486 12.0545 8.38733 15.3732 9.60407 16.4474C9.7402 16.5675 9.80827 16.6276 9.88766 16.6512C9.95695 16.6718 10.0328 16.6718 10.1021 16.6512C10.1815 16.6276 10.2495 16.5675 10.3857 16.4474C11.6024 15.3732 15.3149 12.0545 16.5416 10.481C18.017 8.5884 17.7848 5.89611 15.8737 4.31275C13.9626 2.72938 11.4944 3.18262 9.99486 4.93014Z" stroke="" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>}
            </div>

            <div className="pt-4">
                
                <div className="flex justify-between">
                <div className="">
                    <h3 className="font-bold lg:text-lg md:text-lg text-sm text-textCategory">{textCategoriesCard}</h3>
                    {categoriesFashionCard ?  <h5 className="pt-1 font-normal lg:text-sm md:text-sm text-xs  text-textThinGray">Explore Now!</h5> : <h5 className="pt-1 font-normal lg:text-sm md:text-sm text-xs  text-textThinGray">{brand}</h5>}
                </div>

                <div>
                    {categoriesFashionCard ?  <div className="text-darkText mt-5"><GoArrowRight /></div> : <div className="text-darkText bg-secondary lg:px-4 lg:py-2 md:px-4 md:py-2 px-2 py-1 font-bold text-sm rounded-lg mt-4">${price}</div>}
                </div>
                </div>
                
            </div>
            
            </div>
        </Fragment>
    )

}