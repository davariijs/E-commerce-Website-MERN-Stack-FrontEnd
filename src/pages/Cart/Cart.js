import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import leftArrowIcon from "../../assets/icons/left-arrow.svg";
import "./Cart.css";
import { FaRegTrashAlt } from "react-icons/fa";
import { decreaseQuantityAsync, fetchCart, increaseQuantityAsync} from "../../redux/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import CartEmpty from "../../components/CartEmpty/CartEmpty";
import { selectUser } from "../../redux/users/userSlice";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';

export default function Cart() {
    const cartItems = useSelector((state) => state.cart.cart); // Updated to match slice state
    const items = cartItems?.items || [];
    const dispatch = useDispatch();
    const { uid } = useSelector(selectUser);
    const loading = useSelector((state) => state.cart.loading);
    const [coupon, setCoupon] = useState();
    const [discountCode, setDiscountCode] = useState(10945);
    const [startCoupon, setStartCoupon] = useState(0);

    const notifySuccess = () => toast.success('Your coupon applied !', {
              position: 'bottom-right',
    });
    const notifyError = () => toast.error("Your discount code isn't valid !", {
        position: 'bottom-right',
});

    useEffect(() => {
        if (uid){
            dispatch(fetchCart(uid))
        }
      }, [dispatch,uid]);

    function handleRemove(id) {
        console.log(`Requesting deletion of item with ID: ${id} from cart of user: ${uid}`);
        const handleRemoveItem = async ({ id }) => {
            console.log(`second clg: ${id}`);
            try {
                console.log(`Requesting deletion of item with ID: ${id} from cart`);
                const response = await axios.delete(`http://localhost:5000/cart/${uid}/${id}`);
                
                if (response.status === 200) {
                    // Convert id to a number for state update
                    const itemId = parseInt(id, 10);
                    console.log(`Item with id: ${itemId} removed successfully.`);
                    dispatch(fetchCart(uid))
                } else {
                    console.error('Failed to remove item:', response.data);
                }
            } catch (error) {
                console.error('Error while removing item:', error);
                alert('Failed to remove item');
            }
        };
        handleRemoveItem({ id }); // Pass an object with the id property
        ;
    }


    const calculateTotalPrice = () => {
        const items = cartItems?.items || []; // Safely access items
        return items.reduce((total, item) => total + item.price * item.quantity, startCoupon);
    };
    const applyCoupon = () => {
        if(coupon !== undefined){
            if (parseInt(coupon)  === discountCode) {
                setStartCoupon(-10);
                notifySuccess();
            }
            else {
                notifyError()
            }
        }else {
        notifyError()
        }
    }


    const handleDecreaseQuantity = (id) => {
        if (!items || items.length === 0) {
            console.error("Cart is empty or null, cannot decrease quantity");
            return;
        }
        dispatch(decreaseQuantityAsync({ uid, itemId: id })); // Use the async thunk
    };
    
    const handleIncreaseQuantity = (id) => {
        dispatch(increaseQuantityAsync({ uid, itemId: id })); // Use the async thunk
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return(
        <Fragment>
                <div className="relative">
                {items.length === 0 || cartItems.uid !== uid ? (null):(<div className="absolute bg-darkText w-full h-20 top-48 z-0"></div>)}
                    <div className="absolute bg-secondary z-0 w-full bottom-0 checkout-bg"></div>
                <div className="container mx-auto px-5 md:px-0">
                    
                    <div className="pt-14 pb-6 flex lg:text-lg"><Link to="/" className="text-grayText font-normal  pr-3">Home</Link><img src={leftArrowIcon} width="5px" height="10.14px" alt="arrow"/>
                    <Link to="/account" className="pl-3 pr-3 text-darkText font-normal ">Add To Cart</Link>
                    </div>

                    <div className="text-grayText text-sm"><h3>Please fill in the fields below and click place order to complete your purchase!</h3><Link>Already registered? <span className="text-primary font-semibold">Please login here</span></Link></div>

                    <div className="header-types relative">
                        <div>
                            <div className=" w-full -mt-7">

                            {items.length === 0 || cartItems.uid !== uid ? (
                                <div><CartEmpty/></div>
                            ) : (
                                <div>
                                <table className="table-auto w-full">
                                    <thead className="text-white header-types-text font-semibold md:text-lg text-xs uppercase">
                                    <tr>
                                        <th className=" md:px-4 px-1 py-7 text-nowrap text-start">Product Details</th>
                                        <th className=" md:px-4 px-1 py-7"></th>
                                        <th className=" md:px-4 px-1 py-7 md:text-end text-center">Price</th>
                                        <th className=" md:px-4 px-1 py-7 md:text-end text-center">Quantity</th>
                                        <th className=" md:px-4 px-1 py-7 md:text-end text-center">Total</th>
                                        <th className=" md:px-4 px-1 py-7 md:text-end text-center">Actions</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {items.map((item) => (
                                        <tr key={item._id} className="border-b border-borderGrey px-4 py-2">
                                        <td className="px-4 py-2">
                                        <td className="py-2 font-bold text-darkText md:text-md text-sm">{item.title}</td>
                                        <h4 className="font-medium text-grayText text-sm py-2">Color : {item.color}</h4>
                                            <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-24 h-28 mr-4 mb-4 rounded-xl"
                                            />
                                        </td>
                                        <td className="px-4 py-2 font-bold text-darkText md:text-sm text-sm"></td>
                                        <td className="px-3 py-2 font-bold text-darkText md:text-base text-xs text-end">${item.price}</td>
                                        <td className="px-4 py-2">
                                        <div className="flex  justify-end items-center">
                                        <div className="md:w-24 w-16   h-9 bg-secondary rounded-lg text-darkText text-center flex items-center justify-between md:px-5 px-2">
                                                <button onClick={() => handleDecreaseQuantity(item._id)}>-</button>
                                                {item.quantity}
                                                <button onClick={() => handleIncreaseQuantity(item._id)}>+</button>
                                            </div>
                                        </div>
                                            </td>
                                        <td className="px-3 py-2 font-bold text-darkText md:text-base text-xs text-end">
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </td>
                                        <td className="px-10 py-2 text-end">
                                            <button onClick={() => handleRemove(item._id)} className="  py-2 rounded "><FaRegTrashAlt className="text-primary"/></button>
                                        </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                                </div>
                            )}
                            </div>

                        </div>
                        <div className="lg:flex justify-between mt-24 ">
                            <div className="flex flex-col justify-center items-center lg:items-start">
                                <h4 className="text-darkText font-semibold text-2xl">Discount  Codes</h4>
                                <h5 className="text-grayText font-normal text-base mt-2">Enter your coupon code if you have one</h5>
                                <div className="my-10">
                                <input onChange={(e)=> {
                                    setCoupon(e.target.value)
                                }}
                                className="border-2 border-borderGrey bg-white sm:py-3 py-2 sm:px-5 px-2 rounded-l-xl"/>
                                <button 
                                onClick={()=> {
                                    applyCoupon()
                                }}
                                className="bg-primary font-semibold text-white sm:py-3 py-2 sm:px-5 px-2 sm:text-base rounded-r-xl border-y-2 border-r-2 border-borderGrey">Apply Coupon</button>
                                </div>
                                <Link to="/" className="bg-white text-base text-darkText font-semibold py-3 px-5 rounded-lg border-2 border-borderGrey w-fit">Continue Shopping</Link>
                            </div>

                            <div className="bg-grayCart py-10 lg:mt-0 md:mt-12 -mt-5">

                                <div className="flex justify-between py-9 px-20 text-darkText font-bold text-xl">
                                    <span>Sub Total</span> 
                                    <span>${calculateTotalPrice().toFixed(2)}</span>
                                </div>
                                
                                <hr className="text-borderGrey"/>

                                <div className="flex justify-center mt-10">
                                <Link to="/check-out" className="bg-primary font-semibold text-white text-lg py-3 px-5 rounded-lg">Proceed To Checkout</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
                <ToastContainer/>  
        </Fragment>
    )
}