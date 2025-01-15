import React, { Fragment,useEffect  } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IoCloseOutline } from "react-icons/io5";
import "./Account.css"
import WishlistEmpty from "../../components/WishlistEmpty/WishlistEmpty";
import { fetchWishlist } from "../../redux/wishLists/wishlistSlice";
import axios from "axios";

export default function Wishlist () {

    const dispatch = useDispatch();
    const { items, loading, error } = useSelector((state) => state.wishlist);

    useEffect(() => {
        dispatch(fetchWishlist());
    }, [dispatch]);

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

    

      if (loading) return <p>Loading wishlist...</p>;
      if (error) return <p>Error: {error}</p>;

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
                    <img className="rounded-md w-28 h-28 mx-6" src={item.image} alt=""/>
                    <div className="text-darkText font-bold lg:text-xl text-sm">
                    <h4>{item.title}</h4>
                    </div>
                    <h4 className="lg:hidden flex  text-grayText font-bold lg:text-xl text-sm">$29.00</h4>
                    </div>

                    <div className="lg:flex hidden justify-between items-center">
                        <h4 className="text-grayText font-bold lg:text-xl text-sm">$29.00</h4>
                        <div className="bg-primary rounded-lg py-3 px-3 text-white md:ml-12 ml-5">Add to cart</div>
                    </div>
                    <div className="lg:hidden flex justify-center mt-6 text-center items-center bg-primary rounded-lg py-3 px-3 text-white md:ml-12 ml-5">Add to cart</div>
                    </div>
                ))}
                </div>
            )}
            </div>
        </Fragment>
    )
}