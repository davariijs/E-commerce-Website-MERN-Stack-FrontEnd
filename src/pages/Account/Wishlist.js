import React, { Fragment,useEffect  } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IoCloseOutline } from "react-icons/io5";
import "./Account.css"
import WishlistEmpty from "../../components/WishlistEmpty/WishlistEmpty";
import { fetchWishlist } from "../../redux/wishLists/wishlistSlice";
import loadingBar from "../../assets/images/loader.svg";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Wishlist ({uid}) {

    const dispatch = useDispatch();
    const { items, loading, error } = useSelector((state) => state.wishlist);

    useEffect(() => {
        if (uid) {
          dispatch(fetchWishlist(uid)); // Pass `uid` to the fetch function
        }
      }, [dispatch, uid]);

    const handleRemoveWishlist = async (id) => {
        try {
          // Make DELETE request to the backend to remove the item
          await axios.delete(`http://localhost:5000/add-wishlist/${id}`);
          
          // After removing the item, fetch the updated wishlist
          dispatch(fetchWishlist());
        } catch (error) {
          console.error('Failed to remove item:', error);
          console.log(id);
          alert('Failed to remove item from wishlist');
        }
    };

    

      if (loading) return <div className='flex justify-center items-center h-fit w-full relative'><img className='w-36' src={loadingBar} alt='loading ...'/></div>;;

    return(
        <Fragment>
            <div>

            {items.length === 0 ? (
                <div>
                <WishlistEmpty/>
                </div>
            ) : (
                <div>
                {items.map((item) => (
                    <div key={item._id} className="lg:flex  justify-between border-b-2 border-borderGreyLight py-6">
                    <div className="flex  justify-between lg:justify-center items-center">
                    <button  onClick={() => handleRemoveWishlist(item._id)}><IoCloseOutline className="w-5 h-5 text-darkText"/></button>
                    <img className="rounded-md md:w-28 md:h-28 w-20 h-20 md:mx-6 mx-2" src={item.image} alt=""/>
                    <div className="text-darkText flex justify-center items-center text-center font-bold lg:text-xl text-sm md:max-w-full max-w-72">
                    <h4 className="whitespace-pre-line">{item.title}</h4>
                    </div>
                    <h4 className="lg:hidden flex  text-grayText font-bold lg:text-xl text-sm">${item.price}</h4>
                    </div>

                    <div className="lg:flex hidden justify-between items-center">
                        <h4 className="text-grayText font-bold lg:text-xl text-sm">${item.price}</h4>
                        <Link to={item.pathname} className="bg-primary rounded-lg py-3 px-3 text-white md:ml-12 ml-5">Add to cart</Link>
                    </div>
                    <Link to={item.pathname} className="lg:hidden flex justify-center mt-6 text-center items-center bg-primary rounded-lg py-3 px-3 text-white md:ml-12 ml-5">Add to cart</Link>
                    </div>
                ))}
                </div>
            )}
            </div>
        </Fragment>
    )
}