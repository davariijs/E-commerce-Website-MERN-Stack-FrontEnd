import React, { Fragment} from "react";
import Collapsible from "react-collapsible";
import { GoChevronDown } from "react-icons/go";
import { GiSettingsKnobs } from "react-icons/gi";
import RangeBar from "./FilterRangePrice";
import { Link } from "react-router-dom";
import { GoChevronRight } from "react-icons/go";

export default function FilterPart ({firstItem,secondItem,thirdItem,fourthItem,fifthItem,sixthItem,firstPath,secondPath,thirdPath,fourthPath,fifthPath,sixthPath}) {


    return(
        <Fragment>
            <div className="border-2 border-t-0 border-opacity-35 border-borderGrey h-fit lg:w-1/4 w-full">
            <div className="font-semibold text-xl text-grayText flex justify-between border-b-2 border-opacity-35 border-borderGrey lg:p-8 p-5">
                <h3>Filter</h3>
                <GiSettingsKnobs className="w-8 h-17 "/>
            </div>

            <div className="text-grayText font-semibold text-base lg:grid-rows-6 grid-rows-1 lg:p-8 p-5 grid lg:grid-cols-1 sm:grid-cols-6 grid-cols-3 lg:gap-5  gap-4 text-center lg:text-left">
                <Link to={firstPath}  className="flex justify-between lg:w-full w-fit hover:text-primary">
                {firstItem}
                <GoChevronRight  className="lg:block hidden w-5 h-6 hover:text-primary"/>
                </Link>
                <Link to={secondPath} className="flex justify-between lg:w-full w-fit hover:text-primary">{secondItem}
                <GoChevronRight  className="lg:block hidden w-5 h-6 hover:text-primary"/>
                </Link>
                <Link to={thirdPath} className="flex justify-between lg:w-full w-fit hover:text-primary">{thirdItem}
                <GoChevronRight  className="lg:block hidden w-5 h-6 hover:text-primary"/>
                </Link>
                <Link to={fourthPath} className="flex justify-between lg:w-full w-fit hover:text-primary">{fourthItem}
                <GoChevronRight  className="lg:block hidden w-5 h-6 hover:text-primary"/>
                </Link>
                <Link to={fifthPath} className="flex justify-between lg:w-full w-fit hover:text-primary">{fifthItem}
                <GoChevronRight  className="lg:block hidden w-5 h-6 hover:text-primary"/>
                </Link>
                <Link to={sixthPath} className="flex justify-between lg:w-full w-fit hover:text-primary">{sixthItem}
                <GoChevronRight  className="lg:block hidden w-5 h-6 hover:text-primary"/>
                </Link>
            </div>

            <div className="filter-collapse border-t-2  text-grayText border-opacity-35  border-borderGrey lg:p-8 p-5">
                <Collapsible className="" trigger={["Price", <GoChevronDown className="w-8 h-17 "/>]}>
                    <div className="py-4 flex flex-col">
                    <RangeBar/>
                    </div>
                </Collapsible>
            </div>
            </div>
        </Fragment>
    )
}