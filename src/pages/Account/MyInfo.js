import React, { Fragment, useEffect, useState } from "react";

import "./Account.css"
import { Link } from "react-router-dom";
import InfoAccount from "./InfoAccount";
import { useDispatch } from "react-redux";
import { InfoAccountFunc } from "../../utils/wishlistFunc";

export default function MyInfo ({email,name,uid}) {
    const dispatch = useDispatch();
    const [userName,setName] = useState(name);
    const [number,setNumber] = useState("");
    const [showNewAddress,setShowNewAddress] = useState(false);
    const [data, setData] = useState(null);
  const [error, setError] = useState(null);

    const handleSaveAndClose = () => {
        setShowNewAddress(false);
      };

      useEffect(() => {
        const fetchData = async () => {
          try {
            const result = await InfoAccountFunc(uid);
            setData(result); // Update state with fetched data
            console.log(result);
          } catch (err) {
            setError(err.message); // Update state with error message
          }
        };
    
        fetchData();
      }, [uid]);
        

    return(
        <Fragment>
                <div className="w-full">
                    
                    
                        <div className="flex justify-between">
                        <h4 className='text-darkText flex lg:text-xl text-md font-bold pb-8'>Contact Details</h4>
                        </div>

                        <div className="pb-4 border-b-2 border-borderGreyLight w-full">
                            <h4 className="lg:text-lg text-md font-semibold text-grayText">Your Name</h4>
                            <div className="flex justify-between">
                            <h4 className="lg:text-lg text-md font-semibold text-darkText mt-2 ml-1">{userName}</h4>
                            </div>
                        </div>

                        <div className="py-4 border-b-2 border-borderGreyLight w-full">
                            <h4 className="lg:text-lg text-md font-semibold text-grayText">Email Address</h4>
                            <div className="flex justify-between">
                                <h4 className="lg:text-lg text-md font-semibold text-darkText mt-2 ml-1">{email}</h4>
                            </div>
                        </div>

                        <div className="py-4 border-b-2 border-borderGreyLight w-full">
                            <h4 className="lg:text-lg text-md font-semibold text-grayText">Phone Number</h4>
                            <div className="flex justify-between">
                            <h4 className="lg:text-lg text-md font-semibold text-darkText mt-2 ml-1">{number}</h4>
                            </div>
                        </div>

                    <div className="py-4 border-b-2 border-borderGreyLight w-full">
                        <h4 className="lg:text-lg text-md font-semibold text-grayText">Password</h4>
                        <div className="flex justify-between">
                            <h5 className="lg:text-lg text-md font-semibold text-darkText ml-1">.....</h5>
                            <Link to="/new-password" className="lg:text-md text-sm font-semibold text-darkText">Change</Link>
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-between py-8">
                        <h4 className='text-darkText flex lg:text-xl text-md font-bold '>Address</h4>
                        <button onClick={() => {setShowNewAddress(!showNewAddress)}} className="lg:text-lg text-md font-semibold text-darkText">{showNewAddress? <h4>Back</h4> : <h4>Add New</h4>}</button>
                        </div>

                        {showNewAddress? 
                        <InfoAccount uid={uid} onSave={handleSaveAndClose}/> : 
                        <>
                        <div className=" grid grid-cols-1 lg:grid-cols-2 gap-6">

                        <div className="rounded-xl p-5 bg-secondary">
                            <h3 className="lg:text-xl text-md  font-semibold text-darkText pb-4">Jhanvi shah</h3>
                            <h4 className="text-base font-normal text-grayText pb-4">8980252445</h4>
                            <p className="text-base font-normal text-grayText pb-4">1/4 Pragatinagar Flats, opp. jain derasar , near Jain
                            derasar, Vijaynagar road </p>
                            <div className="flex pb-4">
                                <div className="mr-3 rounded-lg py-2 px-5 border-2 border-grayText lg:text-base text-sm font-normal text-grayText">Home</div>
                                <div className="mr-3 rounded-lg py-2 px-5 border-2 border-grayText lg:text-base text-sm font-normal text-grayText">Default billing address</div>
                            </div>

                            <div className="flex">
                            <button className="text-base font-semibold text-darkText border-r-2 border-light pr-3">Remove</button>
                            <button className="text-base font-semibold text-darkText pl-3">Edit</button>
                            </div>
                        </div>

                        </div>
                        </>
                        }

                        
                    </div>
                    </div>
        </Fragment>
    )
}