import React, { Fragment } from 'react';
import './Navbar.css';
import logo from "../../assets/icons/logo-shoply.png";
import { Link } from 'react-router-dom';
import searchIcon from "../../assets/icons/search-icon.svg";
import likeIcon from "../../assets/icons/like.svg";
import cartIcon from "../../assets/icons/cart.svg";
import userIcon from "../../assets/icons/user.svg";

export default function DesktopNavbar() {
    
    return (
        <Fragment>
                        <div className='lg:block hidden '>
            <nav className='flex justify-between desktopDisplay'>
                <div className='flex justify-between'>
                <div className='logoNavbar'>
                    <img src={logo} alt='logo' height="45px" width="91px"/>
                </div>
                <div className="nav-items active"  >
                <ul className='flex '>
                    <li><Link to="/">Shop</Link></li>
                    <li><Link to="/men">Men</Link></li>
                    <li><Link to="/women">Women</Link></li>
                </ul>
                </div>
                </div>
                
                <div className='flex justify-between'>
                <div className='pr-4 lg:pr-20'>
                    <div className='flex relative'>
                        <img className='searchIcon absolute' src={searchIcon} alt='search'/>
                        <input className='searchbar bg-secondary' type="search" name="searchNav" placeholder='Search'/>
                    </div>
                </div>
                <div className=''>
                    <div className='flex icons'>
                        <div className='bg-secondary likeIcon'>
                            <img src={likeIcon} alt='like'/>
                        </div>
                        <div className='bg-secondary userIcon'>
                            <img src={userIcon} alt='user'/>
                        </div>
                        <div className='bg-secondary cartIcon'>
                            <img src={cartIcon} alt='cart'/>
                        </div>
                    </div>
                </div>
                </div>
            </nav>
            </div>
        </Fragment>
    ) 
}