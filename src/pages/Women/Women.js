import { Fragment, useEffect, useState } from 'react';
import FilterPart from '../../components/FilterPart/FilterPart';
import { Outlet, useLocation, useParams } from "react-router-dom"
export default function Women() {
  const [path, setPath] = useState();

  const location = useLocation();

  
  useEffect(() => {
    // function locationPath () {
    //   if (location.pathname === "/women" || location.pathname === "/women/tops") {
    //     setPath("Tops")
    //   } else if ()
    // }
    // locationPath();
    function locationPath () {
    switch(location.pathname) {
      case "/women/t-shirts":
        setPath("T-Shirts");
        break;
        case "/women/shoes":
        setPath("Shoes");
        break;
        case "/women/kurti":
        setPath("Kurti");
        break;
        case "/women/boxers":
        setPath("Boxers");
        break;
        case "/women/joggers":
        setPath("Joggers");
        break;
        case "/women/payjamas":
        setPath("Payjamas");
        break;
      default:
        setPath("Tops");
    }
  }
  locationPath();
  }, [location.pathname]);

  return (
    <Fragment>
      <div className=' lg:my-20  container mx-auto lg:px-0 px-4 lg:flex gap-12'>
      <FilterPart className=""/>
      <div className='py-14'>
            <div className='flex text-2xl font-semibold pb-14'>
              {path}
            {/* {location.pathname === "/women" || location.pathname === "/women/tops" ? <>Tops</> : location.pathname} */}
            </div>
            <Outlet />
        </div>
      </div>
        
    </Fragment>
  )
}