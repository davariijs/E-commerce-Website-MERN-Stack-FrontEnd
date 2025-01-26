import { Fragment } from 'react';
import { useDispatch, useSelector } from "react-redux";
import loadingBar from "../../assets/images/loader.svg";
import useEffectAfterMount from '../../utils/useEffectAfterMount';
import CategoriesCard from '../../components/CategoriesCard/CategoriesCard';
import "./productCard.css"
import { selectFilterPrices } from '../../redux/filterProducts/filterProductsSlice';
import { getWomenTShirts, selectErrorState, selectLoadingState,selectWomenTShirts } from '../../redux/womenProducts/TShirtSlice/tShirtSlice';
import { handleAddWishlist } from '../../utils/wishlistFunc';
import { ToastContainer, toast } from 'react-toastify';
import likeIconGif from "../../assets/icons/icons8-like.gif";

export default function WomenTShirts({uid}) {

    const dispatch = useDispatch();
    const womenTShirts = useSelector (selectWomenTShirts);
    const loading = useSelector (selectLoadingState);
    const error = useSelector(selectErrorState);
    const values = useSelector (selectFilterPrices);
    const notify = () => toast.success('Product added to you wishlist !', {
      position: 'bottom-right',
    });

    useEffectAfterMount(() => {
      if (loading === 'idle') {
        dispatch(getWomenTShirts())
      }
    }, [loading,dispatch]);

    function handleButtonWishlist ( title, image, price, uid) {
      handleAddWishlist(title, image, price, uid);
      notify();
    }

    let contentToDisplay = '';
    if (loading === 'loading') {
      contentToDisplay = <div className='flex justify-center items-center h-fit w-full relative'><img className='w-36' src={loadingBar} alt='loading ...'/></div>;
    } else if (loading === 'succeeded') {
      contentToDisplay = <>
      <div className="lg:grid md:grid sm:grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 flex  justify-center flex-wrap  lg:gap-10 gap-5 h-fit w-full">
        {womenTShirts?.payload?.products.filter(itemCategory => itemCategory.productTitle !== null  ).map(itemCategory => (
          <CategoriesCard
          onClick={() =>
            handleButtonWishlist(
              itemCategory.productTitle,
              itemCategory.image.url,
              itemCategory.prices[0].regularPrice.minPrice,
              uid
            )
          }
          key={itemCategory.webID}
          srcCategoriesCard={itemCategory.image.url} 
          textCategoriesCard={itemCategory.productTitle}
          categoriesFashionCard={false}
          linkCard={itemCategory.webID}
          brand=""
          price={itemCategory.prices[0].regularPrice.minPrice}
          />
    ))}
      </div>
      </>
    } else if (loading === 'failed') {
      contentToDisplay = <p>{error}</p>;
    }

  return (
    <Fragment>
       {contentToDisplay}
       <ToastContainer icon={({ type}) => {
          switch (type) {
            case 'success':
              return <img src={likeIconGif} width={50} alt="like"/>;
            default:
              return null;
          }
        }} /> 
    </Fragment>
  )
}