import { Fragment, useState } from "react";
import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import useEffectAfterMount from "../../utils/useEffectAfterMount";
import loadingBar from "../../assets/images/loader.svg";
import creditCardIcon from "../../assets/icons/credit-card.svg";
import fitIcon from "../../assets/icons/fit.svg";
import truckIcon from "../../assets/icons/truck.svg";
import shippingIcon from "../../assets/icons/shipping.svg";
import StarRatings from "react-star-ratings";
import { GoArrowRight } from "react-icons/go";
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductDetails, selectErrorState,selectLoadingState,selectProductsDetails } from "../../redux/productDetails/productDetails";
// productsDetails?.payload?.products[0].swatchImages.color // color names
import { addToCart } from "../../redux/cart/cartSlice";
import { selectUser } from "../../redux/users/userSlice";

export default function ProductDetails() {
    const id = useParams();
    const productSingleId = id.id;
    const productIdDetails = productSingleId;
    const dispatch = useDispatch();
    const productsDetails = useSelector (selectProductsDetails);
    const loading = useSelector (selectLoadingState);
    const error = useSelector(selectErrorState);
    const [colorProduct, setColorProduct] = useState("");
    const { uid } = useSelector(selectUser);
    const product = productsDetails?.payload?.products[0];
    console.log(uid);

    const CartIcon = () => (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        className="stroke-current text-white" // Use text-white to set color
        stroke="currentColor" // This makes the stroke inherit the text color
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M2.5 3.33334H3.00526C3.85578 3.33334 4.56986 3.97376 4.6621 4.81926L5.3379 11.0141C5.43014 11.8596 6.14422 12.5 6.99474 12.5H14.205C14.9669 12.5 15.6317 11.9834 15.82 11.2452L16.9699 6.73593C17.2387 5.68213 16.4425 4.65742 15.355 4.65742H5.5M5.52063 15.5208H6.14563M5.52063 16.1458H6.14563M14.6873 15.5208H15.3123M14.6873 16.1458H15.3123M6.66667 15.8333C6.66667 16.2936 6.29357 16.6667 5.83333 16.6667C5.3731 16.6667 5 16.2936 5 15.8333C5 15.3731 5.3731 15 5.83333 15C6.29357 15 6.66667 15.3731 6.66667 15.8333ZM15.8333 15.8333C15.8333 16.2936 15.4602 16.6667 15 16.6667C14.5398 16.6667 14.1667 16.2936 14.1667 15.8333C14.1667 15.3731 14.5398 15 15 15C15.4602 15 15.8333 15.3731 15.8333 15.8333Z" />
      </svg>
    );

    const handleFetchProduct = () => {
      const productId = `${productIdDetails}`; // Dynamic product ID
      dispatch(fetchProductDetails(productId));
    };

    useEffectAfterMount(() => {
      handleFetchProduct()
    }, []);

    const handleAddToCart = () => {
      if (!uid) {
          console.error("User UID is not available.");
          return; // Prevent the function from proceeding if uid is not available
      }

      if (!product) {
          console.error("Product details are not available.");
          return; // Prevent the function from proceeding if product is not available
      }

      const item = {
          uid, // User UID
          item: {
              id: product.webID,
              title: product.productTitle,
              price: product?.price?.regularPrice?.minPrice,
              image: product.images[0]?.url,
              color: colorProduct
          }
      };

      console.log("Adding product to cart:", item);
      dispatch(addToCart(item)); // Dispatch action to add product to cart
  };

    let contentToDisplay = '';
    if (loading === 'loading') {
      contentToDisplay = <div className='flex justify-center items-center h-fit w-full relative'><img className='w-36' src={loadingBar} alt='loading ...'/></div>;
    } else if (loading === 'succeeded') {
      contentToDisplay = <>
      <div className="container mx-auto">
      <div>
            <div className="lg:grid grid-cols-2 gap-6">
              <div>
              {productsDetails?.payload?.products[0].videos[0]?.url ? 
              <video src={productsDetails?.payload?.products[0].videos[0]?.url} width="750" height="500" controls>
              </video> :
              <div><img className="w-full h-full" src={productsDetails?.payload?.products[0].images[0].url} alt="color"/></div>
              }
              </div>
              <div>
              <h3 className="text-grayText font-medium text-lg mb-5 mt-5">{productsDetails?.payload?.products[0].brand}</h3>
                <div><h2 className="text-darkText font-bold text-4xl mb-5">{productsDetails?.payload?.products[0].productTitle}</h2></div>
                <div className="flex mb-5">
                <StarRatings
                  rating= {Number(productsDetails?.payload?.products[0].avgRating) || 5}
                  starRatedColor="#FBD103"
                  starDimension="22px"
                  starSpacing="8px"
                />
                  <span className="text-grayText font-medium text-lg pl-2">{productsDetails?.payload?.products[0].avgRating}</span></div>
                <div className="text-grayText font-medium text-lg mb-5"><a className=" flex" href={productsDetails?.payload?.products[0].styleGuide.sizeChartURL}>Size guide <GoArrowRight className="mt-1 w-10" /></a></div>
                <div className="text-darkText font-semibold text-lg mb-5">Colors Available </div>
                <div className="grid grid-cols-6 gap-2 mb-6">{productsDetails?.payload?.products[0].swatchImages.map(color => ( <div>
                    <div className="cursor-pointer" onClick={()=> {setColorProduct(color.color)}} ><img className="rounded-full" src={color.URL} alt="color"/></div>
                </div>))}</div>
                
                <div className="flex lg:justify-start justify-center mb-9">
                <Link>
                  <button onClick={handleAddToCart} className="rounded-lg flex w-52 h-12 bg-primary font-semibold text-lg text-white justify-center items-center">
                    <span className="pr-2">
                      <CartIcon /> 
                    </span>
                    Add to cart
                  </button>
                </Link>                  
                <button className="ml-6 border-darkText rounded-lg w-36 h-12 text-darkText font-bold border-2 bg-transparent text-center">${productsDetails?.payload?.products[0]?.price.regularPrice.minPrice}</button>
                </div>
                <hr/>
                <div className="grid grid-cols-2 gap-6 mt-10 mb-5">
                  <div className="flex font-medium text-darkText text-lg"><span className="-mt-2 pr-2 bg-secondary w-10 h-10 rounded-full  p-3 mr-2"><img src={creditCardIcon} alt='cart'/></span>Secure payment</div>
                  <div className="flex font-medium text-darkText text-lg"><span className="-mt-2 pr-2 bg-secondary w-10 h-10 rounded-full p-3 mr-2"><img src={fitIcon} alt='size'/></span>Size & Fit</div>
                  <div className="flex font-medium text-darkText text-lg"><span className="-mt-2 pr-2 bg-secondary w-10 h-10 rounded-full p-3 mr-2"><img src={truckIcon} alt='Free shipping'/></span>Free shipping</div>
                  <div className="flex font-medium text-darkText text-lg"><span className="-mt-2 pr-2 bg-secondary w-10 h-10 rounded-full p-3 mr-2"><img src={shippingIcon} alt='Returns'/></span>Free Shipping & Returns</div>
                </div>
              </div>
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