import { Fragment, useEffect, useState } from 'react';
import FilterPart from '../../components/FilterPart/FilterPart';
import { Outlet, useLocation, useParams  } from "react-router-dom";
import ProductDetails from '../ProductDetailsPage/SingleProductDetails';


export default function Men() {

  const [path, setPath] = useState<string>();
  const location = useLocation();

  const {id} = useParams();
  
  useEffect(() => {
    function locationPath () {
    switch(location.pathname) {
      case "/men/t-shirts":
        setPath("T-Shirts");
        break;
        case "/men/shoes":
        setPath("Shoes");
        break;
        case `/men/${id}`:
        setPath("Product Details");
        break;
        // eslint-disable-next-line no-duplicate-case
        case `/men/${id}`:
        setPath("Product Details");
        break;
        case `/men/tops/${id}`:
        setPath("Product Details");
        break;
        case `/men/shoes/${id}`:
        setPath("Product Details");
        break;
        case "/men/coats":
        setPath("Coats");
        break;
        case `/men/coats/${id}`:
        setPath("Product Details");
        break;
        case "/men/jeans":
        setPath("Jeans");
        break;
        case "/men/hoodies":
        setPath("Hoodies");
        break;
        case `/men/jeans/${id}`:
        setPath("Product Details");
        break;
        case `/men/hoodies/${id}`:
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
                <FilterPart 
                  firstItem={"Tops"}
                  secondItem={"Shoes"} 
                  thirdItem={"T-shirt"} 
                  fourthItem={"Coats"} 
                  fifthItem={"Jeans"} 
                  sixthItem={"Hoodies"}
                  firstPath={"/men/tops"}
                  secondPath={"/men/shoes"} 
                  thirdPath={"/men/t-shirts"} 
                  fourthPath={"/men/coats"} 
                  fifthPath={"/men/jeans"} 
                  sixthPath={"/men/hoodies"}
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