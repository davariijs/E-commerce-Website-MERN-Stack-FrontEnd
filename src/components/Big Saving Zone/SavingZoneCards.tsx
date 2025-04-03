import React, { Fragment } from 'react';
import Card from '../Card/Card';
import imgCardSaving1 from '../../assets/images/hawaiianShirts.png';
import imgCardSaving2 from '../../assets/images/printedTShirt.png';
import imgCardSaving3 from '../../assets/images/cargoJoggers.png';
import imgCardSaving4 from '../../assets/images/urbanShirts.png';
import imgCardSaving5 from '../../assets/images/oversizedThirts.png';
import './Cards.css';

export default function SavingZoneCards() {
  return (
    <Fragment>
      <div>
        <div className="lg:flex md:flex grid lg:grid-cols-3 md:grid-cols-3 grid-cols-1 gap-6 mb-6">
          <Card
            cardFashionTextZone="cardFashionTextZoneTop"
            priceTitle={'Dress up in summer vibe'}
            srcCard={imgCardSaving1}
            alt="fashion"
            mainTitle="Hawaiian"
            discount="UPTO 50% OFF"
            seeMore="SHOP NOW"
            textColor="text-white"
            borderColor="border-white"
          />
          <Card
            cardFashionTextZone="cardFashionTextZoneTop"
            priceTitle={'Low Price'}
            srcCard={imgCardSaving2}
            alt="fashion"
            mainTitle="Printed"
            discount="UPTO 50% OFF"
            seeMore="SHOP NOW"
            rowReverse="flex-row-reverse"
            titleLimited={true}
            textColor="text-white"
            borderColor="border-white"
          />
          <Card
            cardFashionTextZone="cardFashionTextZoneTop"
            priceTitle={'Low Price'}
            srcCard={imgCardSaving3}
            alt="fashion"
            mainTitle="Cargo"
            discount="UPTO 50% OFF"
            seeMore="SHOP NOW"
            rowReverse="flex-row-reverse"
            textColor="text-darkText"
            borderColor="border-darkText"
          />
        </div>

        <div className="lg:flex md:flex grid lg:grid-cols-3 md:grid-cols-3 grid-cols-1 gap-6">
          <Card
            cardFashionTextZone="cardFashionTextZoneBot"
            priceTitle={'Low Price'}
            srcCard={imgCardSaving4}
            alt="fashion"
            mainTitle="Urban"
            discount="UPTO 50% OFF"
            seeMore="SHOP NOW"
            rowReverse="flex-row-reverse"
            textColor="text-darkText"
            borderColor="border-darkText"
          />
          <Card
            cardFashionTextZone="cardFashionTextZoneBot"
            priceTitle={'Low Price'}
            srcCard={imgCardSaving5}
            alt="fashion"
            mainTitle="Oversized"
            discount="UPTO 50% OFF"
            seeMore="SHOP NOW"
            rowReverse="flex-row-reverse"
            textColor="text-darkText"
            borderColor="border-darkText"
          />
        </div>
      </div>
    </Fragment>
  );
}
