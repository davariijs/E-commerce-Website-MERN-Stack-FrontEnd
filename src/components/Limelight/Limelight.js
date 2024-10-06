import React, { Fragment } from "react";
import CategoriesCard from "../CategoriesCard/CategoriesCard";
import {LimelightData} from "../../data/LimelightData";

export default function Limelight() {

    return (
        <Fragment>
            <div className="grid lg:grid-cols-4 md:grid-cols-4 grid-cols-2 lg:gap-12 gap-6 ">
            {LimelightData.map(itemCategory => (
                <CategoriesCard
                key={itemCategory.id}
                srcCategoriesCard={itemCategory.srcImg} 
                textCategoriesCard={itemCategory.textCard}
                categoriesFashionCard={false}
                linkCard="/limelight"
                brand={itemCategory.brand}
                price={itemCategory.price}
                />
            ))}
            </div>
        </Fragment>
    )

}