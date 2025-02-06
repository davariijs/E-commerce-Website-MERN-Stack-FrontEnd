import React, { Fragment, useEffect, useState } from 'react';
import './Navbar.css';
import logo from "../../assets/icons/logo-shoply.png";
import { Link } from 'react-router-dom';
import likeIcon from "../../assets/icons/like.svg";
import cartIcon from "../../assets/icons/cart.svg";
import userIcon from "../../assets/icons/user.svg";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart } from '../../redux/cart/cartSlice';
import SearchBar from './Search';
import { AppDispatch, RootState } from 'src/store';
import { selectUser } from 'src/redux/users/userSlice';


export default function MobileNavbar() {
    const [showNavbar, setShowNavbar] = useState<boolean>(false);
    const totalQuantity = useSelector((state: RootState) => state.cart.totalQuantity);
    const dispatch = useDispatch<AppDispatch>();
    const { uid } = useSelector((state:RootState) => selectUser(state));

    // useEffect(() => {
    //         if (uid){
    //             dispatch(fetchCart(uid))
    //         }
    //       }, [dispatch,uid]);

    function showNavbarClose ():void {
        setShowNavbar(!showNavbar)
    }

    return (
        <Fragment>
                        <div className='lg:hidden block bg-white  border-borderGrey border-b-2 '>
            <nav className=' container mx-auto'>
                <div className={showNavbar? "hidden" : "block" }>

                <div className='flex justify-between '>
                <button className=' ' onClick={showNavbarClose}>
                <RxHamburgerMenu className='w-6 h-6 text-darkText' />
                </button>
                <div className='logoNavbar'>
                <Link to="/"><img src={logo} alt='logo' height="45px" width="91px"/></Link>
                </div>
                <div></div>
                </div>
                <div className='mt-5'>
                    <div className='flex justify-center icons'>
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

                <div className={showNavbar? "block" : "hidden" }>
                <div className='fixed inset-0 bg-black/20 backdrop-blur-sm dark:bg-slate-900/80'></div>
                <div className='w-11/12 mobileDisplay bg-white z-30 h-screen absolute left-0 top-0 py-6 px-8 shadow-lg'>

                <div className=''>

                <div className='flex justify-between'>
                <div></div>
                    <SearchBar/>
                    <button className=' ' onClick={showNavbarClose}>
                    <IoClose className='w-6 h-6 text-darkText'/>
                    </button>
                </div>

                <div className="nav-items text-center">
                <ul className=''>
                    <li><button onClick={showNavbarClose}><Link  to="/" >Shop</Link></button></li>
                    <li><button onClick={showNavbarClose}><Link  to="men">Men</Link></button></li>
                    <li><button onClick={showNavbarClose}><Link  to="/women">Women</Link></button></li>
                </ul>
                </div>
                </div>
                
                
                </div>
                </div>
            </nav>
            </div>
        </Fragment>
    ) 
}