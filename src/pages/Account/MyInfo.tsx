import React, { Fragment, useEffect, useState } from 'react';
import './Account.css';
import { Link } from 'react-router-dom';
import InfoAccount from './InfoAccount';
import { InfoAccountFunc } from '../../utils/apiHandler';
import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { selectUser } from 'src/redux/users/userSlice';
import { authenticatedFetch } from 'src/services/authService';

export interface IAddressInfo {
  _id?: string;
  firstName: string;
  lastName: string;
  number: string;
  street: string;
  apt?: string;
  city: string;
  state: string;
  billing?: boolean;
  shipping?: boolean;
  company?: string;
  postalCode?: string;
  instruction?: string;
  country?: string;
  uid?: string;
}

export default function MyInfo() {
  const [showNewAddress, setShowNewAddress] = useState<boolean>(false);
  const [information, setInformation] = useState<IAddressInfo[] | null>(null);
  const [editingAddress, setEditingAddress] = useState<IAddressInfo | null>(null);
  const { email, name, uid } = useSelector((state: RootState) => selectUser(state));
  const [userName] = useState(name);

  const notify = () =>
    toast.success('The address deleted !', {
      position: 'bottom-right',
    });

  const fetchData = React.useCallback(async () => {
    try {
      const result = await InfoAccountFunc(uid);
      setInformation(result);
    } catch {
      toast.error('Failed to fetch data');
    }
  }, [uid]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSaveAndClose = () => {
    setShowNewAddress(false);
    setEditingAddress(null);
    fetchData();
  };

  const handleRemove = async (id: string) => {
    try {
      if (!uid) {
        toast.error('User is not logged in');
        return;
      }
      const result = await authenticatedFetch(
        `${process.env.REACT_APP_URL_API}/api/info-account/${id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const response = await result.json();

      if (result.ok) {
        notify();
        fetchData();
        return response;
      } else {
        toast.error(response.message || 'Failed to delete address');
        throw new Error(response.message || 'Failed to delete address');
      }
    } catch (error) {
      console.error('Failed to remove item:', error);
    }
  };

  const handleEdit = (address: IAddressInfo) => {
    setEditingAddress(address);
    setShowNewAddress(true);
  };

  return (
    <Fragment>
      <div className="w-full">
        <div className="flex justify-between">
          <h4 className="text-darkText flex lg:text-xl text-md font-bold pb-8">Contact Details</h4>
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
          <h4 className="lg:text-lg text-md font-semibold text-grayText">Password</h4>
          <div className="flex justify-between">
            <h5 className="lg:text-lg text-md font-semibold text-darkText ml-1">.....</h5>
            <Link to="/new-password" className="lg:text-md text-sm font-semibold text-darkText">
              Change
            </Link>
          </div>
        </div>

        <div>
          <div className="flex justify-between py-8">
            <h4 className="text-darkText flex lg:text-xl text-md font-bold ">Address</h4>
            <button
              onClick={() => {
                setShowNewAddress(!showNewAddress);
                setEditingAddress(null);
              }}
              className="lg:text-lg text-md font-semibold text-darkText"
            >
              {showNewAddress ? <h4>Back</h4> : <h4>Add New</h4>}
            </button>
          </div>

          {showNewAddress ? (
            <InfoAccount onSave={handleSaveAndClose} existingData={editingAddress} />
          ) : (
            <>
              <div className=" grid grid-cols-1 lg:grid-cols-2 gap-6">
                {information &&
                  information.map((info: IAddressInfo) => (
                    <div key={info._id} className="rounded-xl p-5 bg-secondary">
                      <h3 className="lg:text-xl text-md  font-semibold text-darkText pb-4">
                        {info.firstName} {info.lastName}
                      </h3>
                      <h4 className="text-base font-normal text-grayText pb-4">{info.number}</h4>
                      <p className="text-base font-normal text-grayText pb-4">
                        {info.street}, {info.apt},{info.city}, {info.state}
                      </p>
                      <div className="flex pb-4">
                        {info.billing ? (
                          <div className="rounded-lg py-2 px-5 border-2 border-grayText lg:text-base text-sm font-normal text-grayText">
                            Default billing address
                          </div>
                        ) : null}
                      </div>

                      <div className="flex">
                        <button
                          onClick={() => {
                            if (info._id) {
                              handleRemove(info._id);
                            } else {
                              console.error('Cannot remove item: _id is undefined');
                            }
                          }}
                          className="text-base font-semibold text-darkText border-r-2 border-light pr-3"
                        >
                          Remove
                        </button>
                        <button
                          onClick={() => handleEdit(info)}
                          className="text-base font-semibold text-darkText pl-3"
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </>
          )}
        </div>
      </div>
      <ToastContainer />
    </Fragment>
  );
}
