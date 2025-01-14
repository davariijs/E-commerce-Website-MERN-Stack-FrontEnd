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

    const handleRemove = async (id) => {
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
                    <div key={item._id} className="flex justify-between border-b-2 border-borderGreyLight pb-6">
                    <div className="flex justify-center items-center">
                    <button  onClick={() => handleRemove(item._id)}><IoCloseOutline className="w-5 h-5 text-darkText"/></button>
                    <img className="rounded-md w-28 h-28 mx-6" src={item.image} alt=""/>
                    <div className="text-darkText font-bold lg:text-xl text-md">
                    <h4>{item.title}</h4>
                    <h4>Quantity : <span className="text-grayText">1</span></h4>
                    </div>
                    </div>

                    <div className="flex justify-between items-center">
                        <h4 className="text-grayText font-bold lg:text-xl text-md">$29.00</h4>
                        <div className="bg-primary rounded-lg py-3 px-7 text-white md:ml-12 ml-5">Add to cart</div>
                    </div>
                    </div>
                ))}
                </div>
            )}
            </div>
        </Fragment>
    )
}