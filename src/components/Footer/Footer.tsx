import React, { Fragment } from 'react';
import './Footer.css';
import Collapsible from 'react-collapsible';
import { Link } from 'react-router-dom';
import { GoChevronDown } from 'react-icons/go';
import { TiSocialFacebook } from 'react-icons/ti';
import { SlSocialInstagram } from 'react-icons/sl';
import { TiSocialTwitter } from 'react-icons/ti';
import { TiSocialLinkedin } from 'react-icons/ti';

export default function Footer() {
  return (
    <Fragment>
      <div className=" bg-darkText w-full absolute">
        <div className="container mx-auto lg:p-16 p-10">
          <div className=" lg:flex md:flex grid justify-between grid-cols-2 gap-5 lg:mx-14 md:mx-14 mx-0">
            <div className="text-white">
              <h3 className="font-bold lg:text-2xl md:text-xl pb-4">Need Help</h3>
              <div className="font-light lg:text-lg md:text-base text-sm">
                <h5 className="pb-4">Contact Us</h5>
                <h5 className="pb-4">Track Order</h5>
                <h5 className="pb-4">Returns & Refunds</h5>
                <h5 className="pb-4">FAQ&apos;s</h5>
              </div>
            </div>

            <div className="text-white">
              <h3 className="font-bold lg:text-2xl md:text-xl pb-4">Company</h3>
              <div className="font-light lg:text-lg md:text-base text-sm pb-1">
                <h5 className="pb-4">About Us</h5>
                <h5 className="pb-4">Shoply Blog</h5>
                <h5 className="pb-4">Collaboration</h5>
                <h5 className="pb-8">Media</h5>
              </div>
            </div>

            <div className="text-white">
              <h3 className="font-bold lg:text-2xl md:text-xl pb-4">More Info</h3>
              <div className="font-light lg:text-lg md:text-base text-sm pb-1">
                <h5 className="pb-4">Term and Conditions</h5>
                <h5 className="pb-4">Privacy Policy</h5>
                <h5 className="pb-4">Shipping Policy</h5>
                <h5 className="pb-8">Sitemap</h5>
              </div>
            </div>

            <div className="text-white">
              <h3 className="font-bold lg:text-2xl md:text-xl pb-4">Location</h3>
              <div className="font-light lg:text-lg md:text-base text-sm pb-1">
                <h5 className="pb-4 ">support@shoply.in</h5>
                <h5 className="pb-4">+1 876 3312</h5>
                <h5 className="pb-8">
                  477 Chestnut Drive
                  <br />
                  ,New York, NY 10023
                </h5>
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-6 mb-10">
            <div className="grid grid-cols-4 gap-3 text-2xl">
              <div className="w-10 h-10 rounded-lg bg-white flex justify-center pt-2">
                <TiSocialFacebook />
              </div>
              <div className="w-10 h-10 rounded-lg bg-white flex justify-center pt-2">
                <SlSocialInstagram />
              </div>
              <div className="w-10 h-10 rounded-lg bg-white flex justify-center pt-2">
                <TiSocialTwitter />
              </div>
              <div className="w-10 h-10 rounded-lg bg-white flex justify-center pt-2">
                <TiSocialLinkedin />
              </div>
            </div>
          </div>
          <div className="footer-collapse border-t-2 border-b-2 border-white lg:mx-14 md:mx-14 mx-0 py-6">
            <Collapsible
              className=""
              trigger={
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  Popular Categories
                  <GoChevronDown className="w-8 h-17 " />
                </div>
              }
            >
              <div className="py-4 flex flex-col">
                <Link
                  className="text-white font-light lg:text-lg md:text-base text-sm pb-3"
                  to="/women/dresses"
                >
                  Women Dress
                </Link>
                <Link
                  className="text-white font-light lg:text-lg md:text-base text-sm pb-3"
                  to="/men/shoes"
                >
                  Men Shoes
                </Link>
              </div>
            </Collapsible>
          </div>
          <div className="text-white text-lg font-bold text-center pt-8 lg:mx-14 md:mx-14 mx-0">
            <h4>Copyright © 2024 Shoply. All rights reserved.</h4>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
