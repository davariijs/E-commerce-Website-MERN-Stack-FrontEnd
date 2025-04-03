import React, { Fragment } from 'react';
import CategoriesCard from '../CategoriesCard/CategoriesCard';
import { CategoriesForMenData } from '../../data/CategoriesForMenData';

export default function CategoriesForMen() {
  return (
    <Fragment>
      <div className="grid lg:grid-cols-4 md:grid-cols-4 grid-cols-2 lg:gap-12 gap-6 ">
        {CategoriesForMenData.map(itemCategory => (
          <CategoriesCard
            key={itemCategory.id}
            srcCategoriesCard={itemCategory.srcImg}
            textCategoriesCard={itemCategory.textCard}
            categoriesFashionCard={true}
            linkCard="/men"
          />
        ))}
      </div>
    </Fragment>
  );
}
