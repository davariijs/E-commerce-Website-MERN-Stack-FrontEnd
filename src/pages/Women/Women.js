import React, { Fragment, useEffect, useState } from 'react';
import FilterPart from '../../components/FilterPart/FilterPart';
import { Outlet, useLocation, useParams } from "react-router-dom";
import ProductDetails from '../ProductDetailsPage/SingleProductDetails';


export default function Women() {

  const [path, setPath] = useState();
  const location = useLocation();

  const {id} = useParams();
  
  useEffect(() => {
    function locationPath () {
    switch(location.pathname) {
      case "/women/t-shirts":
        setPath("T-Shirts");
        break;
        case "/women/shoes":
        setPath("Shoes");
        break;
        case `/women/${id}`:
        setPath("Product Details");
        break;
        // eslint-disable-next-line no-duplicate-case
        case `/women/${id}`:
        setPath("Product Details");
        break;
        case `/women/tops/${id}`:
        setPath("Product Details");
        break;
        case `/women/shoes/${id}`:
        setPath("Product Details");
        break;
        case "/women/coats":
        setPath("Coats");
        break;
        case `/women/coats/${id}`:
        setPath("Product Details");
        break;
        case "/women/dresses":
        setPath("Dresses");
        break;
        case "/women/hoodies":
        setPath("Hoodies");
        break;
        case `/women/dresses/${id}`:
        setPath("Product Details");
        break;
        case `/women/hoodies/${id}`:
        setPath("Product Details");
        break;
      default:
        setPath("Tops");
    }
  }
  locationPath();
  }, [location.pathname, id]);

  return (
    <Fragment>
      <div className=' lg:my-20 container mx-auto lg:px-0 px-4 lg:flex gap-12'>
        {path === "Product Details" ?
        <ProductDetails/> : <>
        <FilterPart className=""/>
            <div className='py-14 w-full'>
                  <div className='flex text-2xl font-semibold pb-14'>
                    {path}
                  </div>
                  <Outlet />
            </div>
        </>
        }
      
      </div>
        
    </Fragment>
  )
}