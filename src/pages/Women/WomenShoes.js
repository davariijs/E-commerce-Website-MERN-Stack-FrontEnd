import { Fragment } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { selectErrorState, selectLoadingState, selectWomenShoes } from '../../redux/womenProducts/womenShoesSlice/womenShoesSlice';
import { getWomenShoes } from '../../redux/womenProducts/womenShoesSlice/womenShoesSlice'; 
import loadingBar from "../../assets/images/loader.svg";
import useEffectAfterMount from '../../utils/useEffectAfterMount';
import CategoriesCard from '../../components/CategoriesCard/CategoriesCard';
import "./productCard.css"
import { selectFilterPrices } from '../../redux/filterProducts/filterProductsSlice';
import { handleAddWishlist } from '../../utils/wishlistFunc';
import { ToastContainer, toast } from 'react-toastify';
import likeIconGif from "../../assets/icons/icons8-like.gif";
import { useLocation } from 'react-router';

export default function WomenShoes({uid}) {

    const dispatch = useDispatch();
    const womenShoes = useSelector (selectWomenShoes);
    const loading = useSelector (selectLoadingState);
    const error = useSelector(selectErrorState);
    const values = useSelector (selectFilterPrices);

    const location = useLocation();
    const notify = () => toast.success('Product added to you wishlist !', {
      position: 'bottom-right',
    });

    useEffectAfterMount(() => {
      if (loading === 'idle') {
        dispatch(getWomenShoes())
      }
    }, [loading,dispatch]);

    function handleButtonWishlist ( title, image, price,pathname, uid) {
          handleAddWishlist(title, image, price,pathname, uid);
          notify();
        }

    let contentToDisplay = '';
    if (loading === 'loading') {
      contentToDisplay = <div className='flex justify-center items-center h-fit w-full relative'><img className='w-36' src={loadingBar} alt='loading ...'/></div>;
    } else if (loading === 'succeeded') {
      contentToDisplay = <>
      <div className="lg:grid md:grid sm:grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 flex  justify-center flex-wrap  lg:gap-10 gap-5 h-fit w-full">
        {womenShoes?.payload?.products.filter(itemCategory => itemCategory.productTitle !== null  ).map(itemCategory => (
          <CategoriesCard
          onClick={() =>
            handleButtonWishlist(
              itemCategory.productTitle,
              itemCategory.image.url,
              itemCategory.prices[0].regularPrice.minPrice,
              `${location.pathname}/${itemCategory.webID}`,
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

// && itemCategory.offer?.price > `$${values[0].toFixed(2).toString()}` && itemCategory.offer?.price < `$${values[1].toFixed(2).toString()}`