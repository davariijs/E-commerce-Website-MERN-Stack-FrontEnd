import axios from "axios";
import { Fragment, useState } from "react";
import React from "react";
import { useLocation, useParams } from "react-router-dom";
import useEffectAfterMount from "../../utils/useEffectAfterMount";
import loadingBar from "../../assets/images/loader.svg";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";


export default function ProductDetails() {
    const [product , setProduct] = useState({});
    const id = useParams();
    const productSingleId = id.id;
    const productId = productSingleId;
    console.log(productId);

    const uriRequest = {
      method: 'GET',
      url: 'https://kohls.p.rapidapi.com/products/detail',
      params: {webID: `${productId}`},
      headers: {
        'x-rapidapi-key': '3699a5185fmshe0db227da19099cp1a6b23jsn73e9b3010639',
        'x-rapidapi-host': 'kohls.p.rapidapi.com'
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
           <div>

            <div>
              <div><h3>{product?.payload?.products[0].brand}</h3><div>
              <video src={product?.payload?.products[0].videos[0].url} width="750" height="500" controls>
              </video>
              </div></div>
              <div></div>
              <div>
                <div><h3></h3></div>
                <div><h2>{product?.payload?.products[0].productTitle}</h2></div>
                <div><h3>{product?.payload?.products[0].avgRating}</h3></div>
                <div><a href={product?.payload?.products[0].styleGuide.sizeChartURL}>Size guide</a></div>
                <div>Colours Available </div>
                <div className="grid grid-cols-4 gap-6">{product?.payload?.products[0].swatchImages.map(color => ( <div>
                    <div><img className="rounded-full" src={color.URL} alt="color"/></div>
                </div>))}</div>
                
                <div></div>
                <hr/>
              </div>
            </div>

            <div>

            </div>
           </div>
          }
        </Fragment>
      )
}