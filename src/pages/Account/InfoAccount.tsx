import React, { Fragment, useEffect, useState } from "react";
import "./Account.css";
import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from "react-redux";
import { RootState } from "src/store";
import { selectUser } from "src/redux/users/userSlice";
import { IAddressInfo } from "./MyInfo";

interface IInfoAccount {
    onSave: (payload: IAddressInfo) => void,
    existingData:IAddressInfo | null,
}

export default function InfoAccount ({ existingData, onSave}:IInfoAccount) {
    const { uid } = useSelector((state:RootState) => selectUser(state));
    const [number, setNumber] = useState<string>("");
    const [id, setId] = useState<string>("");
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [country, setCountry] = useState<string>("");
    const [company, setCompany] = useState<string>("");
    const [street, setStreet] = useState<string>("");
    const [apt, setApt] = useState<string>("");
    const [city, setCity] = useState<string>("");
    const [state, setState] = useState<string>("");
    const [postalCode, setPostalCode] = useState<string>("");
    const [instruction, setInstruction] = useState<string>("");
    const [shipping, setShipping] = useState<boolean>(false);
    const [billing, setBilling] = useState<boolean>(false);

    const defaultPayload: IAddressInfo = {
        _id: '', // or some default value if applicable
        firstName: '',
        lastName: '',
        country: '',
        company: '',
        street: '',
        apt: '',
        city: '',
        state: '',
        number: '',
        postalCode: '',
        instruction: '',
        shipping: false,
        billing: false,
        uid: '',
      };

    const notifySuccess = (message:string) => toast.success(message, { position: "bottom-right" });
    const notifyError = (message:string) => toast.error(message, { position: "bottom-right" });


    useEffect(() => {
        if (existingData) {
            setId(existingData._id || "");  // Set the `_id` for updating
            setFirstName(existingData.firstName || "");
            setLastName(existingData.lastName || "");
            setCountry(existingData.country || "");
            setCompany(existingData.company || "");
            setStreet(existingData.street || "");
            setApt(existingData.apt || "");
            setCity(existingData.city || "");
            setState(existingData.state || "");
            setNumber(existingData.number || "");
            setPostalCode(existingData.postalCode || "");
            setInstruction(existingData.instruction || "");
            setShipping(existingData.shipping || false);
            setBilling(existingData.billing || false);
        }
    }, [existingData]);

    const handleFormSubmission = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!uid) {
            notifyError("User is not authenticated.");
            return;
          }
        
      
        // Prepare data payload
        const payload: IAddressInfo = {
          firstName,
          lastName,
          country,
          company,
          street,
          apt,
          city,
          state,
          number,
          postalCode,
          instruction,
          shipping,
          billing,
          uid
        };
      
        try {
          // Determine request type (POST for create, PUT for update)
          const method = existingData ? "PUT" : "POST";
      
          // Ensure we only try to update if the `id` is available
          const url = method === "PUT" && id
            ? `${process.env.REACT_APP_URL_API}/info-account/${id}`  // Update endpoint
            : `${process.env.REACT_APP_URL_API}/info-account`;       // Create endpoint
      
          if (method === "PUT" && !id) {
            notifyError("Cannot update without a valid ID.");
            return;
          }
      
          const response = await fetch(url, {
            method,
            body: JSON.stringify(payload),
            headers: {
              "Content-Type": "application/json",
            },
          });
      
          const result = await response.json();
      
          if (response.ok) {
            if (method === "POST") {
              notifySuccess("Address added successfully!");
            } else {
              notifySuccess("Address updated successfully!");
            }
            setFirstName("");
            setLastName("");
            setCountry("");
            setCompany("");
            setStreet("");
            setApt("");
            setCity("");
            setState("");
            setNumber("");
            setPostalCode("");
            setInstruction("");
            setShipping(false);
            setBilling(false);
            // Trigger parent callback after save
            setTimeout(() => {
              onSave(payload);
            }, 2000);
          } else {
            notifyError(result.error || "Something went wrong!");
          }
        } catch (error) {
          console.error("Error saving data:", error);
          notifyError("Failed to save address. Please try again.");
        }
      };
        


    return(
        <Fragment>
            <div className="container mx-auto w-full accountPage">
            <div className="lg:flex pb-8 ">

                <div className="pb-8 w-full">
                    <div className="w-full">
                    <div className="pb-4 w-full">
                    <form onSubmit={handleFormSubmission}>

                        <div className="grid md:grid-cols-2 grid-cols-1 md:gap-8 gap-4">
                            <div className="w-full">
                            <label htmlFor="fname" className="lg:text-lg text-md font-semibold text-darkText">First Name*</label>
                                <div className="bg-secondary rounded-lg mt-2">
                                    <input onChange={(e)=> { setFirstName(e.target.value)}} value={firstName} className="bg-secondary text-xs rounded-lg  w-full font-normal text-grayText py-4 px-5" type="text" id="fname" name="fname" placeholder="First Name"/>
                                </div>
                            </div>
                            <div className="w-full">
                            <label htmlFor="lname" className="lg:text-lg text-md font-semibold text-darkText">Last Name*</label>
                                <div className="bg-secondary rounded-lg mt-2">
                                    <input onChange={(e)=> { setLastName(e.target.value)}} value={lastName} className="bg-secondary text-xs rounded-lg  w-full font-normal text-grayText py-4 px-5" type="text" id="lname" name="lname" placeholder="Last Name"/>
                                </div>
                            </div>
                            <div className="w-full">
                            <label htmlFor="country" className="lg:text-lg text-md font-semibold text-darkText">Country / Region*</label>
                                <div className="bg-secondary rounded-lg mt-2">
                                    <input onChange={(e)=> { setCountry(e.target.value)}} value={country} className="bg-secondary text-xs rounded-lg  w-full font-normal text-grayText py-4 px-5" type="text" id="country" name="country" placeholder="Country / Region"/>
                                </div>
                            </div>
                            <div className="w-full">
                            <label htmlFor="company" className="lg:text-lg text-md font-semibold text-darkText">Company Name</label>
                                <div className="bg-secondary rounded-lg mt-2">
                                    <input onChange={(e)=> { setCompany(e.target.value)}} value={company} className="bg-secondary text-xs rounded-lg  w-full font-normal text-grayText py-4 px-5" type="text" id="company" name="company" placeholder="Company (optional)"/>
                                </div>
                            </div>
                            <div className="w-full">
                            <label htmlFor="street" className="lg:text-lg text-md font-semibold text-darkText">Street Address*</label>
                                <div className="bg-secondary rounded-lg mt-2">
                                    <input onChange={(e)=> { setStreet(e.target.value)}} value={street} className="bg-secondary text-xs rounded-lg  w-full font-normal text-grayText py-4 px-5" type="text" id="street" name="street" placeholder="House number and street name"/>
                                </div>
                            </div>
                            <div className="w-full">
                            <label htmlFor="apt" className="lg:text-lg text-md font-semibold text-darkText">Apt, suite, unit</label>
                                <div className="bg-secondary rounded-lg mt-2">
                                    <input onChange={(e)=> { setApt(e.target.value)}} value={apt} className="bg-secondary text-xs rounded-lg  w-full font-normal text-grayText py-4 px-5" type="text" id="apt" name="apt" placeholder="apartment, suite, unit, etc. (optional)"/>
                                </div>
                            </div>
                            <div className="w-full">
                            <label htmlFor="city" className="lg:text-lg text-md font-semibold text-darkText">City*</label>
                                <div className="bg-secondary rounded-lg mt-2">
                                    <input onChange={(e)=> { setCity(e.target.value)}} value={city} className="bg-secondary text-xs rounded-lg  w-full font-normal text-grayText py-4 px-5" type="text" id="city" name="city" placeholder="Town / City"/>
                                </div>
                            </div>
                            <div className="w-full">
                            <label htmlFor="state" className="lg:text-lg text-md font-semibold text-darkText">State*</label>
                                <div className="bg-secondary rounded-lg mt-2">
                                    <input onChange={(e)=> { setState(e.target.value)}} value={state} className="bg-secondary text-xs rounded-lg  w-full font-normal text-grayText py-4 px-5" type="text" id="state" name="state" placeholder="State"/>
                                </div>
                            </div>
                            <div className="w-full">
                            <label htmlFor="phone" className="lg:text-lg text-md font-semibold text-darkText">Phone*</label>
                                <div className="bg-secondary rounded-lg mt-2">
                                    <input onChange={(e)=> {setNumber(e.target.value)}} value={number} className="bg-secondary text-xs rounded-lg  w-full font-normal text-grayText py-4 px-5" type="text" id="phone" name="phone" placeholder="Phone"/>
                                </div>
                            </div>
                            <div className="w-full">
                            <label htmlFor="postalCode" className="lg:text-lg text-md font-semibold text-darkText">Postal Code*</label>
                                <div className="bg-secondary rounded-lg mt-2">
                                    <input onChange={(e)=> { setPostalCode(e.target.value)}} value={postalCode} className="bg-secondary text-xs rounded-lg  w-full font-normal text-grayText py-4 px-5" type="text" id="postalCode" name="postalCode" placeholder="Postal Code"/>
                                </div>
                            </div>
                        </div>
                        <div className="w-full mt-8">
                            <label htmlFor="delivery" className="lg:text-lg text-md font-semibold text-darkText">Delivery Instruction</label>
                                <div className="bg-secondary rounded-lg mt-2">
                                    <textarea onChange={(e: React.ChangeEvent<HTMLTextAreaElement>)=> { setInstruction(e.target.value)}} value={instruction} className="bg-secondary text-xs rounded-lg  w-full font-normal text-grayText pt-4 h-36 px-5" id="delivery" name="delivery" placeholder="Delivery Instruction"/>
                                </div>
                        </div>

                        <div className="w-full mt-8 flex">
                        <div className=" rounded-lg ">
                        <input onChange={(e)=> { setShipping(!shipping)}} checked={shipping} className=" rounded-lg  w-full  font-normal text-grayText" type="checkbox" id="shipping" name="shipping" placeholder="Delivery Instruction"/>
                        </div>
                            <label htmlFor="shipping" className="pl-2 text-sm font-normal text-darkText">Set as default shipping address</label>
                        </div>

                        <div className="w-full mt-2 flex">
                        <div className=" rounded-lg ">
                        <input onChange={(e)=> { setBilling(!billing)}} checked={billing} className=" rounded-lg  w-full  font-normal text-grayText" type="checkbox" id="billing" name="billing" placeholder="Delivery Instruction"/>
                        </div>
                            <label htmlFor="billing" className="pl-2 text-sm font-normal text-darkText">Set as default billing address</label>
                        
                        </div>

                        <div className="md:flex grid grid-cols-2 md:gap-6 gap-4 mt-9 md:font-bold md:text-xl">
                        <button className="rounded-lg  text-white md:w-32 w-full h-12 bg-primary">Save</button>
                        <button onClick={()=>{onSave(defaultPayload)}} className="rounded-lg text-grayText  md:w-32 w-full h-12 bg-secondary">Cancel</button>
                        </div>
                    </form>
                    </div>

                    </div>
                </div>
            </div>
            </div>
            <ToastContainer/> 
        </Fragment>
    )
}