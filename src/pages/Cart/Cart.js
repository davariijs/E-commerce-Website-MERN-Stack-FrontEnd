import React , { Fragment } from "react";
import { Link } from "react-router-dom";
import leftArrowIcon from "../../assets/icons/left-arrow.svg";
import "./Cart.css";
import { FaRegTrashAlt } from "react-icons/fa";
import { decreaseQuantity, increaseQuantity, removeFromCart } from "../../redux/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import CartEmpty from "../../components/CartEmpty/CartEmpty";

export default function Cart() {
    const cartItems = useSelector((state) => state.cart.items); // Get cart items from state
    const totalQuantity = useSelector((state) => state.cart.totalQuantity); // Get total quantity
    const dispatch = useDispatch();


    const handleRemoveFromCart = (id) => {
        dispatch(removeFromCart(id)); // Dispatch action to remove item
      };
    
      const calculateTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
      };

      const handleIncreaseQuantity = (id) => {
        dispatch(increaseQuantity(id)); // Dispatch action to increase quantity
      };
    
      const handleDecreaseQuantity = (id) => {
        dispatch(decreaseQuantity(id)); // Dispatch action to decrease quantity
      };

    return(
        <Fragment>
                <div className="relative">
                    <div className="absolute bg-darkText w-full h-20 top-48 z-0"></div>
                    <div className="absolute bg-secondary z-0 w-full bottom-0 checkout-bg"></div>
                <div className="container mx-auto px-5 md:px-0">
                    
                    <div className="pt-14 pb-6 flex lg:text-lg"><Link to="/" className="text-grayText font-normal  pr-3">Home</Link><img src={leftArrowIcon} width="5px" height="10.14px" alt="arrow"/>
                    <Link to="/account" className="pl-3 pr-3 text-darkText font-normal ">Add To Cart</Link>
                    </div>

                    <div className="text-grayText text-sm"><h3>Please fill in the fields below and click place order to complete your purchase!</h3><Link>Already registered? <span className="text-primary font-semibold">Please login here</span></Link></div>

                    <div className="header-types relative">
                        <div>
                            <div className=" w-full -mt-7">

                            {cartItems.length === 0 ? (
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
                                    {cartItems.map((item) => (
                                        <tr key={item.id} className="border-b border-borderGrey px-4 py-2">
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
                                        <td className="px-3 py-2 font-bold text-darkText md:text-base text-xs text-end">${item.price.toFixed(2)}</td>
                                        <td className="px-4 py-2">
                                        <div className="flex  justify-end items-center">
                                        <div className="md:w-24 w-16   h-9 bg-secondary rounded-lg text-darkText text-center flex items-center justify-between md:px-5 px-2">
                                                <button onClick={() => handleDecreaseQuantity(item.id)}>-</button>
                                                {item.quantity}
                                                <button onClick={() => handleIncreaseQuantity(item.id)}>+</button>
                                            </div>
                                        </div>
                                            </td>
                                        <td className="px-3 py-2 font-bold text-darkText md:text-base text-xs text-end">
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </td>
                                        <td className="px-10 py-2 text-end">
                                            <button onClick={() => handleRemoveFromCart(item.id)} className="  py-2 rounded "><FaRegTrashAlt className="text-primary"/></button>
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
                                <input className="border-2 border-borderGrey bg-white sm:py-3 py-2 sm:px-5 px-2 rounded-l-xl"/>
                                <button className="bg-primary font-semibold text-white sm:py-3 py-2 sm:px-5 px-2 sm:text-base rounded-r-xl border-y-2 border-r-2 border-borderGrey">Apply Coupon</button>
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
        </Fragment>
    )
}