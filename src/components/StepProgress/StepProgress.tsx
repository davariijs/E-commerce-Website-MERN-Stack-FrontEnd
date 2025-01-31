import React, { Fragment, useState } from "react";
import StepProgressBar from 'react-step-progress';
import 'react-step-progress/dist/index.css';
import './StepProgress.css';
import { formatDate } from "../../utils/usefulFunc";

type TOrder = {
  order?:string,
}

export default function StepProgress ({order}:TOrder) {
    const step1Content = <div className="card-Progress font-semibold md:text-base text-xs flex"><div className="triangle "></div><h3 className="text-grayText pr-10">{formatDate(order ?? new Date().toISOString())}</h3> <h4 className="text-darkText">Your order has been successfully verified 1.</h4></div>;
    const step2Content = <div className="card-Progress font-semibold md:text-base text-xs flex" ><div className="triangle "></div><h3 className="text-grayText pr-10">{formatDate(order ?? new Date().toISOString())}</h3> <h4 className="text-darkText">Your order is in progress</h4></div>;
    const step3Content = <div className="card-Progress font-semibold md:text-base text-xs flex"><div className="triangle "></div><h3 className="text-grayText pr-10">{formatDate(order ?? new Date().toISOString())}</h3> <h4 className="text-darkText">Your order has been successfully shipped</h4></div>;
    const step4Content = <div className="card-Progress font-semibold md:text-base text-xs flex"><div className="triangle "></div><h3 className="text-grayText pr-10">{formatDate(order ?? new Date().toISOString())}</h3> <h4 className="text-darkText">Your order has been successfully delivered</h4></div>;
     
    // setup step validators, will be called before proceeding to the next step
    function step2Validator(): boolean {
      // return a boolean
      return true; 
    }
     
    function step3Validator(): boolean {
      // return a boolean
      return true; 
    }
    function step4Validator(): boolean {
      // return a boolean
      return true; 
    }
     
    function onFormSubmit(): void  {
      // handle the submit logic here
      // This function will be executed at the last step
      // when the submit button (next button in the previous steps) is pressed
    }
    
    return(
        <Fragment>
            <div>
            <StepProgressBar
                startingStep={0}
                onSubmit={onFormSubmit}
                steps={[
                    {
                    label: 'Order Placed',
                    subtitle: '',
                    name: 'Order Placed',
                    content: step1Content
                    },
                    {
                    label: 'Inprogress',
                    subtitle: '',
                    name: 'Inprogress',
                    content: step2Content,
                    validator: step2Validator
                    },
                    {
                    label: 'shipped',
                    subtitle: '',
                    name: 'shipped',
                    content: step3Content,
                    validator: step3Validator
                    },
                    {
                    label: 'Delivered',
                    subtitle: '',
                    name: 'Delivered',
                    content: step4Content,
                    validator: step4Validator
                    }
                ]}
                />
            </div>
        </Fragment>
    )
}