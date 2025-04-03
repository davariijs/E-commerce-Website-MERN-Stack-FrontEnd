import React, { Fragment } from 'react';
import './Home.css';
import Hero from '../../components/Hero/Hero';
import Card from '../../components/Card/Card';
import imgCardFashion1 from '../../assets/images/card-fashion-style.jpg';
import imgCardFashion2 from '../../assets/images/card-fashion.jpg';
import SliderPart from '../../components/Slider/Slider';
import SavingZoneCards from '../../components/Big Saving Zone/SavingZoneCards';
import FashionPart from '../../components/FashionPart/FashionPart';
import CategoriesForMen from '../../components/CategoriesForMen/CategoriesForMen';
import CategoriesForWomen from '../../components/CategoriesForWomen/CategoriesForWomen';
import Brands from '../../components/Brands/Brands';
import Limelight from '../../components/Limelight/Limelight';
import FeedBackPart from '../../components/FeedBack/FeedBackPart';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Home() {
  useEffect(() => {
    AOS.init();

    const handleScroll = () => {
      AOS.refresh();
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Fragment>
      <Hero />
      <div className="container mx-auto lg:px-6 px-4">
        <div className="lg:flex md:flex justify-center lg:mx-0 md:mx-0 mx-6 lg:mt-16 mt-8 grid lg:grid-cols-2 lg:gap-12 gap-6">
          <Card
            showFirstType={true}
            priceTitle={'Low Price'}
            srcCard={imgCardFashion1}
            alt="fashion"
            mainTitle="High Coziness"
            discount="UPTO 50% OFF"
            seeMore="Explore Items"
          />
          <Card
            showFirstType={true}
            priceTitle={'Low Price'}
            srcCard={imgCardFashion2}
            alt="fashion"
            mainTitle="High Coziness"
            discount="UPTO 50% OFF"
            seeMore="Explore Items"
          />
        </div>

        <div data-aos="fade-up" className="lg:my-20 my-14 lg:mx-4 md:mx-0 mx-6">
          <h3 className="text-darkText flex lg:text-4xl text-2xl font-bold lg:pb-16 pb-8">
            <div className="title-part"></div>
            <span className="pl-11">New Arrival</span>
          </h3>
          <SliderPart />
        </div>

        <div data-aos="fade-left" className="savingZone lg:my-20 my-14 lg:mx-4 md:mx-0 mx-6">
          <h3 className="text-darkText flex lg:text-4xl text-2xl font-bold lg:pb-16 pb-8">
            <div className="title-part"></div>
            <span className="pl-11">Big Saving Zone</span>
          </h3>
          <SavingZoneCards />
        </div>

        <div data-aos="fade-right" className="lg:mx-4 md:mx-0 mx-6">
          <FashionPart />
        </div>

        <div data-aos="zoom-in" className="lg:my-20 my-14 lg:mx-4 md:mx-0 mx-6">
          <h3 className="text-darkText flex lg:text-4xl text-2xl font-bold lg:pb-16 pb-8">
            <div className="title-part"></div>
            <span className="pl-11">Categories For Men</span>
          </h3>
          <CategoriesForMen />
        </div>

        <div data-aos="zoom-in-up" className="lg:my-20 my-14 lg:mx-4 md:mx-0 mx-6">
          <h3 className="text-darkText flex lg:text-4xl text-2xl font-bold lg:pb-16 pb-8">
            <div className="title-part"></div>
            <span className="pl-11">Categories For Women</span>
          </h3>
          <CategoriesForWomen />
        </div>

        <div data-aos="flip-up" className="lg:my-20 my-14 lg:mx-4 md:mx-0 mx-6">
          <Brands />
        </div>

        <div data-aos="fade-up" className="lg:my-20 my-14 lg:mx-4 md:mx-0 mx-6">
          <h3 className="text-darkText flex lg:text-4xl text-2xl font-bold lg:pb-16 pb-8">
            <div className="title-part"></div>
            <span className="pl-11">In The Limelight</span>
          </h3>
          <Limelight />
        </div>

        <div data-aos="fade-up" className="lg:my-20 my-14 lg:mx-4 md:mx-0 mx-6">
          <h3 className="text-darkText flex lg:text-4xl text-2xl font-bold lg:pb-16 pb-8">
            <div className="title-part"></div>
            <span className="pl-11">Feedback</span>
          </h3>
          <FeedBackPart />
        </div>
      </div>
    </Fragment>
  );
}
