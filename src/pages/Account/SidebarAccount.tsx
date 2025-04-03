import React, { Fragment, useEffect, useState } from 'react';
import orderIcon from '../../assets/icons/my-orders.svg';
import likeIcon from '../../assets/icons/like.svg';
import userIcon from '../../assets/icons/user.svg';
import signOutIcon from '../../assets/icons/sign-out.svg';
import './Account.css';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase/firebase';
import { signOut } from 'firebase/auth';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { selectUser } from 'src/redux/users/userSlice';

export default function SidebarAccount() {
  const { name, email } = useSelector((state: RootState) => selectUser(state));
  const [displayAccount, setDisplayAccount] = useState<string | null>();

  const signOutUser = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem('jwtToken');
        window.location.href = '/';
      })
      .catch(error => {
        console.error('Error signing out:', error);
        localStorage.removeItem('jwtToken');
      });
  };

  useEffect(() => {
    if (name !== null) {
      setDisplayAccount(name);
    } else {
      setDisplayAccount(email);
    }
  }, [email, name]);

  return (
    <Fragment>
      <div className="text-darkText flex lg:text-2xl text-lg font-bold pb-3">
        <div className="title-part "></div>
        <h3 className="pl-5 pt-2">Hello {displayAccount}</h3>
      </div>
      <h4 className="font-light text-sm text-grayText  pb-8">Welcome to your Account</h4>

      <div className="lg:block hidden">
        <div className="flex text-nowrap  pl-8 pr-14 py-2 lg:w-full w-fit hover:bg-secondary border-l-2 border-transparent hover:border-darkText">
          <img src={orderIcon} className="w-5" alt="orders" />
          <Link to="orders" className="font-semibold text-lg text-grayText pl-4">
            My Orders
          </Link>
        </div>
        <div className="flex  pl-8 pr-14 py-2 lg:w-full w-fit hover:bg-secondary border-l-2 border-transparent hover:border-darkText">
          <img src={likeIcon} className="w-5" alt="orders" />
          <Link to="wishlist" className="font-semibold text-lg text-grayText pl-4">
            Wishlist
          </Link>
        </div>
        <div className="flex  pl-8 pr-14 py-2 lg:w-full w-fit hover:bg-secondary border-l-2 border-transparent hover:border-darkText">
          <img src={userIcon} className="w-5" alt="orders" />
          <Link to="my-info" className="font-semibold text-lg text-grayText pl-4">
            My info
          </Link>
        </div>
        <button
          onClick={signOutUser}
          className="flex  pl-8 pr-14 py-2 lg:w-full w-fit hover:bg-secondary border-l-2 border-transparent hover:border-darkText"
        >
          <img src={signOutIcon} className="w-5" alt="orders" />
          <span className="font-semibold text-lg text-grayText pl-4">Sign out</span>
        </button>
      </div>

      <div className="flex lg:hidden justify-center topPanel">
        <div className="flex text-nowrap md:px-5 px-3 py-2 lg:w-full  hover:bg-secondary border-b-2 border-transparent hover:border-darkText">
          <img src={orderIcon} className="sm:w-4 sm:h-4 w-3  h-3 mt-1" alt="orders" />
          <Link to="orders" className="md:font-semibold md:text-lg text-sm text-grayText pl-1">
            My Orders
          </Link>
        </div>
        <div className="flex text-nowrap md:px-5 px-3 py-2 lg:w-full  hover:bg-secondary border-b-2 border-transparent hover:border-darkText">
          <img src={likeIcon} className="sm:w-4 sm:h-4 w-3 h-3 mt-1" alt="orders" />
          <Link to="wishlist" className="md:font-semibold md:text-lg text-sm text-grayText pl-1">
            Wishlist
          </Link>
        </div>
        <div className="flex text-nowrap md:px-5 px-3 py-2 lg:w-full  hover:bg-secondary border-b-2 border-transparent hover:border-darkText">
          <img src={userIcon} className="sm:w-4 sm:h-4 w-3  h-3 mt-1" alt="orders" />
          <Link to="my-info" className="md:font-semibold md:text-lg text-sm text-grayText pl-1">
            My info
          </Link>
        </div>
        <button
          onClick={signOutUser}
          className="flex text-nowrap md:px-5 px-3 py-2 lg:w-full  hover:bg-secondary border-b-2 border-transparent hover:border-darkText"
        >
          <img src={signOutIcon} className="w-3 sm:w-4 sm:h-4 h-3 mt-1" alt="orders" />
          <span className="md:font-semibold md:text-lg text-sm text-grayText pl-1">Sign out</span>
        </button>
      </div>
    </Fragment>
  );
}
