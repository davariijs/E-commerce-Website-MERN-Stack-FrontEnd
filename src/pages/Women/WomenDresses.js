import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { selectErrorState, selectLoadingState, selectwomenDresses } from '../../redux/womenProducts/womenProductSlice/womenDressesSlice';
import { getWomenDresses } from '../../redux/womenProducts/womenProductSlice/womenDressesSlice';
import loadingBar from "../../assets/images/loader.gif";
import useEffectAfterMount from '../../utils/useEffectAfterMount';


export default function WomenDresses() {


    const dispatch = useDispatch();
    const womenDresses = useSelector (selectwomenDresses);
    const loading = useSelector (selectLoadingState);
    const error = useSelector(selectErrorState);

    useEffectAfterMount(() => {
      
      if (loading === 'idle') {
        dispatch(getWomenDresses())
      }
    }, [loading,dispatch]);

    let contentToDisplay = '';
    if (loading === 'loading') {
      contentToDisplay = <img src={loadingBar} alt='loading ...'/>;
    } else if (loading === 'succeeded') {
      contentToDisplay = womenDresses.data.products.map(itemCategory => (
        <div key={itemCategory.id}>
          <h3>{itemCategory.product_title}</h3>
          <img src={itemCategory.product_photos[0]} alt='product'/>
          <h4>{itemCategory.offer?.price}</h4>
        </div>
    ));
    } else if (loading === 'failed') {
      contentToDisplay = <p>{error}</p>;
    }

  return (
    <Fragment>

       {contentToDisplay} 
    </Fragment>
  )
}