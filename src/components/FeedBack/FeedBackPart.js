import React, { Fragment } from "react";
import {FeedBackData} from "../../data/FeedBackData";
import FeedBackCard from "./FeedBackCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./FeedBack.css";

export default function FeedBackPart() {
    const settings = {
      dots: true,
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 3,
      autoplay: true,
      autoplaySpeed: 2000,
      arrows: false,
      responsive: [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 680,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        centerMode: true,
        centerPadding: '25px',
      }
    }
  ]
    };


    return (
      <Fragment>
        <div>
        <div className="feedbackSlider">
        <Slider {...settings}>
        {FeedBackData.map(itemFeedBack => (
                <FeedBackCard
                key={itemFeedBack.id}
                srcFeedBackCard={itemFeedBack.srcImg}
                userName={itemFeedBack.userName}
                feedBackText={itemFeedBack.feedBackText}
                feedbackstars={itemFeedBack.feedbackstars}
                />
            ))}
      </Slider>
        </div>
        </div>
      </Fragment>
    );
  }