import React, { Fragment, useEffect } from 'react';
import './Navbar.css';
import logo from "../../assets/icons/logo-shoply.png";
import { Link } from 'react-router-dom';
import likeIcon from "../../assets/icons/like.svg";
import cartIcon from "../../assets/icons/cart.svg";
import userIcon from "../../assets/icons/user.svg";
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart } from '../../redux/cart/cartSlice';
import SearchBar from './Search';
import { AppDispatch, RootState } from 'src/store';
import { selectUser } from 'src/redux/users/userSlice';
import { Img } from 'react-image';

export default function DesktopNavbar() {
    const totalQuantity = useSelector((state:RootState) => state.cart.totalQuantity);
    const cartItems = useSelector((state:RootState) => state.cart.cart);
    const uidCart = cartItems?.uid || null;
    const { uid } = useSelector((state:RootState) => selectUser(state));
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
            if (uid){
                dispatch(fetchCart(uid))
            }
          }, [dispatch,uid]);

    return (
        <Fragment>
                        <div className='lg:block hidden  bg-white border-b-2 border-borderGrey'>
            <nav className='flex justify-between desktopDisplay container mx-auto'>
                <div className='flex justify-between'>
                <div className='logoNavbar'>
                    <Link to="/" onClick={(e) => { e.preventDefault(); window.location.href = "/"; }}>
                    <img src={logo} alt='logo' height="45px" width="91px"/>
                    </Link>
                </div>
                <div className="nav-items active"  >
                <ul className='flex '>
                    <li><Link to="/" onClick={(e) => { e.preventDefault(); window.location.href = "/"; }}>Shop</Link></li>
                    <li><Link to="/men">Men</Link></li>
                    <li><Link to="/women">Women</Link></li>
                </ul>
                </div>
                </div>
                
                <div className='flex justify-between'>
                <div className='pr-4 lg:pr-20'>
                    <SearchBar/>
                </div>
                <div className=''>
                    <div className='flex icons'>
                    <Link to="/account/wishlist">
                        <div className='bg-secondary likeIcon'>
                            <img src={likeIcon} alt='like'/>
                        </div>
                        </Link>
                        <Link to={uid !== null ? "/account" : "/login"}>
                        <div className='bg-secondary userIcon'>
                            <img src={userIcon} alt='user'/>
                        </div>
                        </Link>
                        <Link to="/cart">
                        <div className='bg-secondary cartIcon relative'>
                            <img src={cartIcon} alt='cart'/>
                            <span className='absolute text-xs top-1 text-center items-center w-4 h-4 left-6 text-white bg-primary rounded-full '>{totalQuantity}</span>
                        </div>
                        </Link>
                    </div>
                </div>
                </div>
            </nav>
            </div>
        </Fragment>
    ) 
}