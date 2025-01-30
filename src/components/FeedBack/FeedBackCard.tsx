import React, { Fragment } from "react";
import { FaStar } from "react-icons/fa6";
import { FaStarHalfAlt } from "react-icons/fa";

type TFeedBackCard = {
    srcFeedBackCard:string,
    userName:string,
    feedBackText:string,
    feedbackstars:boolean,
}

export default function FeedBackCard ({srcFeedBackCard,userName,feedBackText,feedbackstars}:TFeedBackCard) {

    return(
        <Fragment>
            <div className="border-2 border-borderGrey w-fit lg:h-64 md:h-80 h-64 p-4 rounded-lg">
                <div className="flex justify-between">
                    <div>
                    <img src={srcFeedBackCard} width="59px" height="59px" alt="user"/>
                    </div>
                    <div className="grid grid-cols-5 gap-1 text-yellow">
                    {feedbackstars ? <><FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar /></> : <>
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStarHalfAlt />
                    </>
                    }
                    </div>
                </div>

                <h3 className="text-darkText font-medium text-xl py-3">{userName}</h3>
                <p className="text-grayText font-light text-sm">{feedBackText}</p>
            </div>
        </Fragment>
    )
}