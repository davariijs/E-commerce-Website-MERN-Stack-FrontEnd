import React, { Fragment } from "react";
import CategoriesCard from "../CategoriesCard/CategoriesCard";
import {CategoriesForWomenData} from "../../data/CategoriesForWomenData";

export default function CategoriesForWomen() {

    return (
        <Fragment>
            <div className="grid lg:grid-cols-4 md:grid-cols-4 grid-cols-2 lg:gap-12 gap-6 ">
            {CategoriesForWomenData.map(itemCategory => (
                <CategoriesCard
                key={itemCategory.id}
                srcCategoriesCard={itemCategory.srcImg} 
                textCategoriesCard={itemCategory.textCard}
                categoriesFashionCard={true}
                linkCard="/women"
                />
            ))}
            </div>
        </Fragment>
    )

}