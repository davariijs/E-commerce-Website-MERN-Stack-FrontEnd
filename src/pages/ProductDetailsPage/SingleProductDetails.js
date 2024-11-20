import axios from "axios";
import { Fragment, useState } from "react";
import React from "react";
import { useParams } from "react-router-dom";
import useEffectAfterMount from "../../utils/useEffectAfterMount";
import loadingBar from "../../assets/images/loader.svg";

export default function ProductDetails() {
    const [product , setProduct] = useState({});
    const id = useParams();
    const productSingleId = id.id;
    const productId = productSingleId.toString();
    console.log(productId);

    const uriRequest = {
      method: 'GET',
      url: 'https://real-time-product-search.p.rapidapi.com/product-details',
      params: {
        product_id: `${productId}`,
        country: 'us, au, ca, nz, tk, nf, hm, cx, cc',
        language: 'en'
      },
      headers: {
        'x-rapidapi-key': '3699a5185fmshe0db227da19099cp1a6b23jsn73e9b3010639',
        'x-rapidapi-host': 'real-time-product-search.p.rapidapi.com'
      }
    };

    function singlePro() {
      axios.request(uriRequest)
        .then(res => {
          setProduct(res.data)
          console.log(res.data);
        })
    }

    useEffectAfterMount(() => {
      singlePro()
    }, []);

    return (
        <Fragment>
           {!product ?
            <div className='flex justify-center items-center h-fit w-full relative'><img className='w-36' src={loadingBar} alt='loading ...'/></div>:
           <h2>{product?.data?.product_title}</h2>
          }
        </Fragment>
      )
}