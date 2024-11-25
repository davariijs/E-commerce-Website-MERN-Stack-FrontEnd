import axios from "axios";
import { Fragment, useState } from "react";
import React from "react";
import { Link, useParams } from "react-router-dom";
import useEffectAfterMount from "../../utils/useEffectAfterMount";
import loadingBar from "../../assets/images/loader.svg";
import cartIcon from "../../assets/icons/cart.svg";
import creditCardIcon from "../../assets/icons/credit-card.svg";
import fitIcon from "../../assets/icons/fit.svg";
import truckIcon from "../../assets/icons/truck.svg";
import shippingIcon from "../../assets/icons/shipping.svg";
import StarRatings from "react-star-ratings";
import { GoArrowRight } from "react-icons/go";
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductDetails, selectErrorState,selectLoadingState,selectProductsDetails } from "../../redux/productDetails/productDetails";


export default function ProductDetails() {
    const id = useParams();
    const productSingleId = id.id;
    const productIdDetails = productSingleId;
    const dispatch = useDispatch();
    const productsDetails = useSelector (selectProductsDetails);
    const loading = useSelector (selectLoadingState);
    const error = useSelector(selectErrorState);

    const handleFetchProduct = () => {
      const productId = `${productIdDetails}`; // Dynamic product ID
      dispatch(fetchProductDetails(productId));
    };

    useEffectAfterMount(() => {
      handleFetchProduct()
    }, []);

    let contentToDisplay = '';
    if (loading === 'loading') {
      contentToDisplay = <div className='flex justify-center items-center h-fit w-full relative'><img className='w-36' src={loadingBar} alt='loading ...'/></div>;
    } else if (loading === 'succeeded') {
      contentToDisplay = <>
      <div className="lg:grid md:grid sm:grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 flex  justify-center flex-wrap  lg:gap-10 gap-5 h-fit w-full">
      <div>
            <div>
              <div><div>
              <video src={productsDetails?.payload?.products[0].videos[0].url} width="750" height="500" controls>
              </video>
              </div></div>
              <div></div>
              <div>
              <h3 className="text-grayText font-medium text-lg">{productsDetails?.payload?.products[0].brand}</h3>
                <div><h2 className="text-darkText font-bold text-4xl">{productsDetails?.payload?.products[0].productTitle}</h2></div>
                <div className="flex">
                <StarRatings
                  rating= {Number(productsDetails?.payload?.products[0].avgRating) || 3}
                  starRatedColor="#FBD103"
                  starDimension="22px"
                  starSpacing="8px"
                />
                  <span className="text-grayText font-medium text-lg pl-2">{productsDetails?.payload?.products[0].avgRating}</span></div>
                <div className="text-grayText font-medium text-lg"><a className=" flex" href={productsDetails?.payload?.products[0].styleGuide.sizeChartURL}>Size guide <GoArrowRight className="mt-1 w-10" /></a></div>
                <div className="text-darkText font-semibold text-lg">Colours Available </div>
                <div className="grid grid-cols-4 gap-6">{productsDetails?.payload?.products[0].swatchImages.map(color => ( <div>
                    <div><img className="rounded-full" src={color.URL} alt="color"/></div>
                </div>))}</div>
                
                <div className="flex">
                <Link><button className="flex"><span><img src={cartIcon} alt='cart'/></span> Add to cart</button></Link>
                  <button>{productsDetails?.payload?.products[0]?.price.regularPrice.minPrice}</button>
                </div>
                <hr/>
                <div className="grid grid-cols-2 gap-6 mt-10">
                  <div className="flex font-medium text-darkText text-lg"><span className="-mt-2 pr-2 bg-secondary w-10 h-10 rounded-full  p-3 mr-2"><img src={creditCardIcon} alt='cart'/></span>Secure payment</div>
                  <div className="flex font-medium text-darkText text-lg"><span className="-mt-2 pr-2 bg-secondary w-10 h-10 rounded-full p-3 mr-2"><img src={fitIcon} alt='size'/></span>Size & Fit</div>
                  <div className="flex font-medium text-darkText text-lg"><span className="-mt-2 pr-2 bg-secondary w-10 h-10 rounded-full p-3 mr-2"><img src={truckIcon} alt='Free shipping'/></span>Free shipping</div>
                  <div className="flex font-medium text-darkText text-lg"><span className="-mt-2 pr-2 bg-secondary w-10 h-10 rounded-full p-3 mr-2"><img src={shippingIcon} alt='Returns'/></span>Free Shipping & Returns</div>
                </div>
              </div>
            </div>

            <div>

            </div>
           </div>
      </div>
      </>
    } else if (loading === 'failed') {
      contentToDisplay = <p>{error}</p>;
    }

    return (
      <Fragment>
      {contentToDisplay} 
      </Fragment>
      )
}