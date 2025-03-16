import { Fragment, ReactNode, useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { selectErrorState, selectLoadingState, selectwomenDresses } from '../../redux/womenProducts/womenProductSlice/womenTopsSlice';
import { getWomenDresses } from '../../redux/womenProducts/womenProductSlice/womenTopsSlice';
import loadingBar from "../../assets/images/loader.svg";
import useEffectAfterMount from '../../utils/useEffectAfterMount';
import CategoriesCard from '../../components/CategoriesCard/CategoriesCard';
import "./productCard.css";
import { handleAddWishlist } from '../../utils/wishlistFunc';
import { ToastContainer, toast } from 'react-toastify';
import likeIconGif from "../../assets/icons/icons8-like.gif";
import { useLocation } from 'react-router';
import { AppDispatch, RootState } from 'src/store';
import { TProduct } from 'src/redux/types/types';
import { selectUser } from 'src/redux/users/userSlice';
import { selectFilterPrices } from 'src/redux/filterProducts/filterProductsSlice';
export default function WomenTops() {
    const dispatch = useDispatch<AppDispatch>();
    const womenDresses = useSelector (selectwomenDresses);
    const loading = useSelector((state: RootState) => selectLoadingState(state));
    const error = useSelector((state: RootState) => selectErrorState(state));
    const { uid } = useSelector((state:RootState) => selectUser(state));
    const values = useSelector((state: RootState) => selectFilterPrices(state));
    const location = useLocation();
    const notify = () => toast.success('Product added to you wishlist !', {
      position: 'bottom-right',
    });

    useEffect(() => {
      if (loading === 'idle') {
        dispatch(getWomenDresses())
      }
    }, [loading,dispatch]);

    function handleButtonWishlist(
      title: string,
      image: string,
      price: number,
      pathname: string,
      uid: string
    ) {
      if (uid) {
        handleAddWishlist({title, image, price,pathname, uid});
        notify();
      } else {
        toast.error('User is not logged in', {
          position: 'bottom-right',
        });
      }
    }


    let contentToDisplay:ReactNode = '';
    if (loading === 'loading') {
      contentToDisplay = <div className='flex justify-center items-center h-fit w-full relative'><img className='w-36' src={loadingBar} alt='loading ...'/></div>;
    } else if (loading === 'succeeded') {
      
      contentToDisplay = <>
      <div className="lg:grid md:grid sm:grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 flex  justify-center flex-wrap  lg:gap-10 gap-5 h-fit w-full">
        {womenDresses?.payload?.products.filter((itemCategory: TProduct) => itemCategory.productTitle !== null && itemCategory.prices[0].regularPrice.minPrice > values[0] && itemCategory.prices[0].regularPrice.minPrice < values[1]  ).map((itemCategory: TProduct) => (
          <CategoriesCard
          onClick={() =>
            handleButtonWishlist(
              itemCategory.productTitle,
              itemCategory.image.url,
              itemCategory.prices[0].regularPrice.minPrice,
              `${location.pathname}/${itemCategory.webID}`,
              uid ?? ''
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
