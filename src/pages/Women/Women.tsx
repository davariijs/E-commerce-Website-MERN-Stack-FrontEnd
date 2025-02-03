import React, { Fragment, useEffect, useState } from 'react';
import FilterPart from '../../components/FilterPart/FilterPart';
import { Outlet, useLocation, useParams } from "react-router-dom";
import ProductDetails from '../ProductDetailsPage/SingleProductDetails';


export default function Women() {
  const [path, setPath] = useState<string>();
  const location = useLocation();
  const {id} = useParams();

  useEffect(() => {
    if (location.pathname.includes("/women/t-shirts")) {
      setPath("T-Shirts");
    } else if (location.pathname.includes("/women/shoes")) {
      setPath("Shoes");
    } else if (location.pathname.includes("/women/coats")) {
      setPath("Coats");
    } else if (location.pathname.includes("/women/dresses")) {
      setPath("Dresses");
    } else if (location.pathname.includes("/women/hoodies")) {
      setPath("Hoodies");
    } else if (location.pathname.includes("/women/tops")) {
      setPath("Tops");
    } else if (id) {
      setPath("Product Details");
    } else {
      setPath("Tops");
    }
  }, [location.pathname, id]);
  

  return (
    <Fragment>
      <div className=' lg:my-20 container mx-auto lg:px-0 px-4 lg:flex gap-12'>
        {path === "Product Details" ?
        <ProductDetails/> : <>
        <FilterPart 
        firstItem={"Tops"}
        secondItem={"Shoes"} 
        thirdItem={"T-shirt"} 
        fourthItem={"Coats"} 
        fifthItem={"Dresses"} 
        sixthItem={"Hoodies"}
        firstPath={"/women/tops"}
        secondPath={"/women/shoes"} 
        thirdPath={"/women/t-shirts"} 
        fourthPath={"/women/coats"} 
        fifthPath={"/women/dresses"} 
        sixthPath={"/women/hoodies"}
        />
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