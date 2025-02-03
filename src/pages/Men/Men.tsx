import { Fragment, useEffect, useState } from 'react';
import FilterPart from '../../components/FilterPart/FilterPart';
import { Outlet, useLocation, useParams  } from "react-router-dom";
import ProductDetails from '../ProductDetailsPage/SingleProductDetails';


export default function Men() {
  const [path, setPath] = useState<string>();
  const location = useLocation();
  const {id} = useParams();
  
  useEffect(() => {
    if (location.pathname.includes("/men/t-shirts")) {
      setPath("T-Shirts");
    } else if (location.pathname.includes("/men/shoes")) {
      setPath("Shoes");
    } else if (location.pathname.includes("/men/coats")) {
      setPath("Coats");
    } else if (location.pathname.includes("/men/jeans")) {
      setPath("Jeans");
    } else if (location.pathname.includes("/men/hoodies")) {
      setPath("Hoodies");
    } else if (location.pathname.includes("/men/tops")) {
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
      {path === "Product Details" ? (
          <ProductDetails />
        ) : (
          <>
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
              <div className='flex text-2xl font-semibold pb-14'>{path}</div>
              <Outlet />
            </div>
          </>
        )}
      </div>
    </Fragment>
  )
}