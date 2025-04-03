import React, { Fragment } from 'react';
import notFoundImg from '../../assets/images/NotFound.png';
import { Link } from 'react-router-dom';
import { Img } from 'react-image';

export default function NotFound() {
  return (
    <Fragment>
      <div className="container mx-auto px-6">
        <div className="flex flex-col justify-center items-center my-20">
          <Img src={notFoundImg} loader={<span></span>} unloader={<span>...</span>} alt="order" />
          <h4 className="mt-8 text-black font-bold md:text-3xl text-center text-lg">
            Oops! Page not found
          </h4>
          <h5 className="mt-2 font-normal text-base text-grayText text-center">
            The page you are looking for might have been removed or <br />
            temporarily unavailable.
          </h5>
          <Link
            to="/"
            onClick={e => {
              e.preventDefault();
              window.location.href = '/';
            }}
          >
            <button className="mt-10 bg-primary rounded-lg py-3 md:px-12 px-6 text-white font-semibold">
              Back to HomePage
            </button>
          </Link>
        </div>
      </div>
    </Fragment>
  );
}
