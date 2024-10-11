import { Fragment, useEffect, useState } from 'react';
import FilterPart from '../../components/FilterPart/FilterPart';
import { Outlet, useLocation } from "react-router-dom";


export default function Men() {

  const [path, setPath] = useState();
  const location = useLocation();

  
  useEffect(() => {
    function locationPath () {
    switch(location.pathname) {
      case "/men/t-shirts":
        setPath("T-Shirts");
        break;
        case "/men/shoes":
        setPath("Shoes");
        break;
        case "/men/coats":
        setPath("Coats");
        break;
        case "/men/dresses":
        setPath("Dresses");
        break;
        case "/men/hoodies":
        setPath("Hoodies");
        break;
      default:
        setPath("Tops");
    }
  }
  locationPath();
  }, [location.pathname]);

  return (
    <Fragment>
      <div className=' lg:my-20 container mx-auto lg:px-0 px-4 lg:flex gap-12'>
      <FilterPart className=""/>
      <div className='py-14 w-full'>
            <div className='flex text-2xl font-semibold pb-14'>
              {path}
            </div>
            <Outlet />
        </div>
      </div>
        
    </Fragment>
  )
}