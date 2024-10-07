import { Fragment } from 'react';
import './Home.css';
import Hero from '../../components/Hero/Hero';
import Card from '../../components/Card/Card';
import imgCardFashion1 from "../../assets/images/card-fashion-style.jpg";
import imgCardFashion2 from "../../assets/images/card-fashion.jpg";
import SliderPart from '../../components/Slider/Slider';
import SavingZoneCards from '../../components/Big Saving Zone/SavingZoneCards';
import FashionPart from '../../components/FashionPart/FashionPart';
import CategoriesForMen from '../../components/CategoriesForMen/CategoriesForMen';
import CategoriesForWomen from '../../components/CategoriesForWomen/CategoriesForWomen';
import Brands from '../../components/Brands/Brands';
import Limelight from '../../components/Limelight/Limelight';
import FeedBackPart from '../../components/FeedBack/FeedBackPart';
import Women from '../Women/Women';


export default function Home() {
  return (
    <Fragment>
      <Hero/>
      <div className='container mx-auto lg:px-6 px-4'>

      <div  className="lg:flex md:flex justify-center lg:mx-0 md:mx-0 mx-6 lg:mt-16 mt-8 grid lg:grid-cols-2 lg:gap-12 gap-6 "> 
      <Card 
      showFirstType={true}
      priceTitle={"Low Price"} 
      srcCard={imgCardFashion1}
      alt="fashion"
      mainTitle="High Coziness"
      discount="UPTO 50% OFF"
      seeMore="Explore Items"
      />
      <Card
      showFirstType={true}
      priceTitle={"Low Price"} 
      srcCard={imgCardFashion2}
      alt="fashion"
      mainTitle="High Coziness"
      discount="UPTO 50% OFF"
      seeMore="Explore Items"
      />
      </div>

      <div className='lg:my-20 my-14 lg:mx-4 md:mx-0 mx-6'>
        <div className='text-darkText flex lg:text-4xl text-2xl font-bold  lg:pb-16 pb-8'><div className='title-part'></div><h3 className='pl-11'>New Arrival</h3></div>
        <SliderPart/>
      </div>

      <div className='savingZone lg:my-20 my-14 lg:mx-4 md:mx-0 mx-6'>
        <div className='text-darkText flex lg:text-4xl text-2xl font-bold  lg:pb-16 pb-8'><div className='title-part'></div><h3 className='pl-11'>Big Saving Zone</h3></div>
        <div className=''>
          <SavingZoneCards/>
        </div>
      </div>

      <div className='lg:mx-4 md:mx-0 mx-6'>
        <FashionPart/>
      </div>

      <div className=' lg:my-20 my-14 lg:mx-4 md:mx-0 mx-6'>
        <div className='text-darkText flex lg:text-4xl text-2xl font-bold  lg:pb-16 pb-8'><div className='title-part'></div><h3 className='pl-11'>Categories For Men</h3></div>
        <div className=''>
          <CategoriesForMen/>
        </div>
      </div>

      <div className=' lg:my-20 my-14 lg:mx-4 md:mx-0 mx-6'>
        <div className='text-darkText flex lg:text-4xl text-2xl font-bold  lg:pb-16 pb-8'><div className='title-part'></div><h3 className='pl-11'>Categories For Women</h3></div>
        <div className=''>
          <CategoriesForWomen/>
        </div>
      </div>

      <div className=' lg:my-20 my-14 lg:mx-4 md:mx-0 mx-6'>
        <Brands/>
      </div>

      <div className=' lg:my-20 my-14 lg:mx-4 md:mx-0 mx-6'>
        <div className='text-darkText flex lg:text-4xl text-2xl font-bold  lg:pb-16 pb-8'><div className='title-part'></div><h3 className='pl-11'>In The Limelight</h3></div>
        <div className=''>
          <Limelight/>
        </div>
      </div>

      <div className=' lg:my-20 my-14 lg:mx-4 md:mx-0 mx-6'>
        <div className='text-darkText flex lg:text-4xl text-2xl font-bold  lg:pb-16 pb-8'><div className='title-part'></div><h3 className='pl-11'>Feedback</h3></div>
        <div className=''>
        <FeedBackPart/>
        </div>
      </div>
      </div>
    </Fragment>
  )
}