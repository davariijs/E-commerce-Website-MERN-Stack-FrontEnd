import { Fragment } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { selectErrorState, selectLoadingState, selectmenTops } from '../../redux/menProducts/menProductSlice/menTopsSlice';
import { getMenTops } from '../../redux/menProducts/menProductSlice/menTopsSlice';
import loadingBar from "../../assets/images/loader.svg";
import useEffectAfterMount from '../../utils/useEffectAfterMount';
import CategoriesCard from '../../components/CategoriesCard/CategoriesCard';
import "./productCard.css"
import { selectFilterPrices } from '../../redux/filterProducts/filterProductsSlice';

export default function MenTops() {

    
    const dispatch = useDispatch();
    const menTops = useSelector (selectmenTops);
    const loading = useSelector (selectLoadingState);
    const error = useSelector(selectErrorState);
    const values = useSelector (selectFilterPrices);

    console.log(values);

    useEffectAfterMount(() => {
      if (loading === 'idle') {
        dispatch(getMenTops())
      }
    }, [loading,dispatch]);

    console.log(menTops);

    let contentToDisplay = '';
    if (loading === 'loading') {
      contentToDisplay = <div className='flex justify-center items-center h-fit w-full relative'><img className='w-36' src={loadingBar} alt='loading ...'/></div>;
    } else if (loading === 'succeeded') {
      contentToDisplay = <>
      <div className="lg:grid md:grid sm:grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 flex  justify-center flex-wrap  lg:gap-10 gap-5 h-fit w-full">
        {menTops?.data?.products.filter(itemCategory => itemCategory.product_title !== null && itemCategory.offer?.price > `$${values[0].toFixed(2).toString()}` && itemCategory.offer?.price < `$${values[1].toFixed(2).toString()}` ).map(itemCategory => (
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