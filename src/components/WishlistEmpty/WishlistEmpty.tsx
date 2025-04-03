import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { FaRegHeart } from 'react-icons/fa';

export default function WishlistEmpty() {
  return (
    <Fragment>
      <div className="w-full h-full py-14 sm:px-40 px-3 rounded-md shadow-md flex flex-col justify-center items-center text-center mb-10">
        <div className="rounded-full w-44 h-44 bg-lightGreen flex justify-center items-center">
          <FaRegHeart className="text-greenShape w-20 h-20" />
        </div>

        <h4 className="text-darkText font-bold lg:text-3xl text-md  pt-10">
          Your wishlist is empty.
        </h4>
        <p className="text-grayText font-medium lg:text-base text-sm   pt-4 pb-10">
          You don’t have any products in the wishlist yet. You will find a lot of interesting
          products on our Shop page.
        </p>
        <Link
          to="/"
          onClick={e => {
            e.preventDefault();
            window.location.href = '/';
          }}
        >
          <button className="bg-primary rounded-lg  text-white font-semibold lg:text-lg  text-md py-3 sm:px-12 px-3 text-nowrap">
            Continue Shopping
          </button>
        </Link>
      </div>
    </Fragment>
  );
}
