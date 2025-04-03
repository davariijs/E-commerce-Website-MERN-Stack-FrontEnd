import React, { Fragment } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Slider.css';
import imgCardSlider1 from '../../assets/images/pants.png';
import imgCardSlider2 from '../../assets/images/men-jacket.png';
import imgCardSlider3 from '../../assets/images/men-tshirt.png';
import imgCardSlider4 from '../../assets/images/women-dress.png';
import imgCardSlider5 from '../../assets/images/women-style.png';
import imgCardSlider6 from '../../assets/images/style-slider.png';
import { GoArrowLeft } from 'react-icons/go';
import { GoArrowRight } from 'react-icons/go';
import { Link } from 'react-router-dom';
import { Img } from 'react-image';

type TProps = {
  className?: string;
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<SVGElement>;
};

function SampleNextArrow(props: TProps) {
  const { className, style, onClick } = props;
  return (
    <GoArrowRight
      className={className}
      style={{ ...style, display: 'block', color: '#3C4242' }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props: TProps) {
  const { className, style, onClick } = props;
  return (
    <GoArrowLeft
      className={className}
      style={{ ...style, display: 'block', color: '#3C4242' }}
      onClick={onClick}
    />
  );
}

export default function SliderPart() {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 4,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          centerMode: true,
          centerPadding: '20px',
        },
      },
    ],
  };

  return (
    <Fragment>
      <div>
        <div className="lg:px-6 md:px-6  text-darkText">
          <Slider {...settings}>
            <Link to="">
              <Img
                src={imgCardSlider1}
                loader={<span></span>}
                unloader={<span>...</span>}
                className="rounded-xl w-full"
                alt="new style"
              />
              <h3 className="font-bold lg:text-xl text-base lg:pt-10 md:pt-7 pt-4">
                Knitted Joggers
              </h3>
            </Link>
            <Link to="">
              <Img
                src={imgCardSlider2}
                loader={<span></span>}
                unloader={<span>...</span>}
                className="rounded-xl w-full"
                alt="new style"
              />
              <h3 className="font-bold lg:text-xl text-base lg:pt-10 md:pt-7 pt-4">Full Sleeve</h3>
            </Link>
            <Link to="">
              <Img
                src={imgCardSlider3}
                loader={<span></span>}
                unloader={<span>...</span>}
                className="rounded-xl w-full"
                alt="new style"
              />
              <h3 className="font-bold lg:text-xl text-base lg:pt-10 md:pt-7 pt-4">
                Active T-Shirts
              </h3>
            </Link>
            <Link to="">
              <Img
                src={imgCardSlider4}
                loader={<span></span>}
                unloader={<span>...</span>}
                className="rounded-xl w-full"
                alt="new style"
              />
              <h3 className="font-bold lg:text-xl text-base lg:pt-10 md:pt-7 pt-4">Urban Shirts</h3>
            </Link>
            <Link to="">
              <Img
                src={imgCardSlider5}
                loader={<span></span>}
                unloader={<span>...</span>}
                className="rounded-xl w-full"
                alt="new style"
              />
              <h3 className="font-bold lg:text-xl text-base lg:pt-10 md:pt-7 pt-4">New Fashion</h3>
            </Link>
            <Link to="">
              <Img
                src={imgCardSlider6}
                loader={<span></span>}
                unloader={<span>...</span>}
                className="rounded-xl w-full"
                alt="new style"
              />
              <h3 className="font-bold lg:text-xl text-base lg:pt-10 md:pt-7 pt-4">Green!</h3>
            </Link>
          </Slider>
        </div>
      </div>
    </Fragment>
  );
}
