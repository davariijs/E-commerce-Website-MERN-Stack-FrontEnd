import { Fragment } from 'react';
import { useDispatch, useSelector } from "react-redux";
import loadingBar from "../../assets/images/loader.gif";
import useEffectAfterMount from '../../utils/useEffectAfterMount';
import CategoriesCard from '../../components/CategoriesCard/CategoriesCard';
import "./womenDressCard.css"
import { selectFilterPrices } from '../../redux/filterProducts/filterProductsSlice';
import { getWomenTShirts, selectErrorState, selectLoadingState,selectWomenTShirts } from '../../redux/womenProducts/TShirtSlice/tShirtSlice';

export default function WomenTShirts() {

    const dispatch = useDispatch();
    const womenTShirts = useSelector (selectWomenTShirts);
    const loading = useSelector (selectLoadingState);
    const error = useSelector(selectErrorState);
    const values = useSelector (selectFilterPrices);

    useEffectAfterMount(() => {
      if (loading === 'idle') {
        dispatch(getWomenTShirts())
      }
    }, [loading,dispatch]);

    console.log(womenTShirts);

    let contentToDisplay = '';
    if (loading === 'loading') {
      contentToDisplay = <img src={loadingBar} alt='loading ...'/>;
    } else if (loading === 'succeeded') {
      contentToDisplay = <>
      <div className="lg:grid md:grid sm:grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 flex  justify-center flex-wrap  lg:gap-10 gap-5 h-fit w-full">
        {womenTShirts?.data?.products.filter(itemCategory => itemCategory.product_title !== null && itemCategory.offer?.price > `$${values[0].toFixed(2).toString()}` && itemCategory.offer?.price < `$${values[1].toFixed(2).toString()}` ).map(itemCategory => (
          <CategoriesCard
          key={itemCategory.product_id}
          srcCategoriesCard={itemCategory.product_photos[0]} 
          textCategoriesCard={itemCategory.product_title}
          categoriesFashionCard={false}
          linkCard="/"
          brand=""
          price={itemCategory.offer?.price}
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
    </Fragment>
  )
}