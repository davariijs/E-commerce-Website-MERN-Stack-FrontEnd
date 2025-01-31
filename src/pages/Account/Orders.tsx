import React, { Fragment, useEffect, useState } from "react";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import "./Account.css"
import PropTypes from 'prop-types';
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/users/userSlice";
import { ToastContainer, toast } from 'react-toastify';
import { OrderFunc } from "../../utils/wishlistFunc";
import { formatDate } from "../../utils/usefulFunc";
import { Link } from "react-router-dom";
import { RootState } from "src/store";
import { TCheckOut, TOrder } from "src/redux/types/types";
import { TCartItem } from "src/redux/cart/cartSlice";

interface CustomTabPanelProps {
  children?: React.ReactNode; 
  value: number;
  index: number;
}

const  CustomTabPanel: React.FC<CustomTabPanelProps> = (props) => {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  }
  
  CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index:number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  
  

export default function Orders () {

    const [value, setValue] = React.useState(0);
    const [orders, setOrders] = useState<TCheckOut | null>(null);
    const { uid } = useSelector((state:RootState) => selectUser(state));
    const notifyError = (message:string) => toast.error(message, { position: "bottom-right" });

    const fetchData = async () => {
      try {
        const result = await OrderFunc(uid);
        setOrders(result); // Update state with fetched data
      } catch (err:any) {
        notifyError(err.message)
      }
    };

    console.log(orders);
  
    useEffect(() => {
      if (uid) {
        fetchData(); // Fetch data on component mount
      }
    }, [uid]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
      <Fragment>
        <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs className="tabs-mui-scroll" indicatorColor="secondary" value={value} onChange={handleChange} aria-label="basic tabs example" variant="fullWidth">
          <Tab label="Active" {...a11yProps(0)} />
          <Tab label="Cancelled" {...a11yProps(1)} />
          <Tab label="Completed" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <div  className="mt-8">
              {orders?.orders?.filter((order:TOrder) => order.orderStatus === "Pending").map(order =>(
                <Link to={order._id}>
                <div key={order._id} className="py-7 border-b-2  border-borderGreyLight">
                <div className=" w-full md:py-7 py-3 md:px-12 px-5 bg-secondary rounded-lg mb-7">
                <h3 className="md:text-base text-xs text-darkText font-semibold pb-4">Order no: #{order._id}</h3>
                    <div className="flex justify-between">
                    <div>
                        <h4 className="font-medium md:text-base text-xs text-grayText py-2">Order Date : <span className="text-borderGrey font-light">{formatDate(order.orderDate ?? new Date().toISOString())}</span></h4>
                        <h4 className="font-medium md:text-base text-xs text-grayText">Estimated Delivery Date : <span className="text-borderGrey font-light">{order.deliveryDate}</span></h4>
                    </div>
                    <div>
                    <h4 className="font-medium md:text-base text-xs text-grayText py-2">Order Status : <span className="text-borderGrey font-light">{order.orderStatus}</span></h4>
                    <h4 className="font-medium md:text-base text-xs text-grayText">Payment Method : <span className="text-borderGrey font-light">{order.paymentMethod}</span></h4>
                    </div>
                    </div>
                </div>
                
                {order.cartItems?.map((item:TCartItem) =>(
                    <div className="flex justify-between items-center mb-8">

                    <div className="flex">
                    <img className="rounded-md md:w-28  w-20 md:h-28 h-20 md:mr-6 mr-3" src={item.image} alt={item.title}/>
                    <div className="text-darkText font-semibold md:text-sm text-xs">
                    <h4 className="md:text-base text-xs">{item.title}</h4>
                    <h4 className="my-2 md:text-sm text-xs">Color : <span className="text-grayText">{item.color}</span></h4>
                    <h4 className="mb-2 md:text-sm text-xs">Qty : <span className="text-grayText">{item.quantity}</span></h4>
                    <h4 className="text-grayText md:text-sm text-xs">Total: ${(item.price * item.quantity).toFixed(2)}</h4>
                    </div>
                    </div>

                    <div>
                        <button className="bg-primary rounded-lg text-white md:py-3 py-2 md:px-7 px-1 text-nowrap md:text-sm text-xs">View Detail</button>
                    </div>
                </div>
                ))}

              </div>
                </Link>
              ))}
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
      <div  className="mt-8">
              {orders?.orders?.filter((order:TOrder) => order.orderStatus === "Cancelled").map(order =>(
                <div key={order._id} className="py-7 border-b-2  border-borderGreyLight">
                <div className=" w-full md:py-7 py-3 md:px-12 px-5 bg-secondary rounded-lg mb-7">
                <h3 className="md:text-base text-xs text-darkText font-semibold pb-4">Order no: #{order._id}</h3>
                    <div className="flex justify-between">
                    <div>
                        <h4 className="font-medium md:text-base text-xs text-grayText py-2">Order Date : <span className="text-borderGrey font-light">{formatDate(order.orderDate ?? new Date().toISOString())}</span></h4>
                        <h4 className="font-medium md:text-base text-xs text-grayText">Estimated Delivery Date : <span className="text-borderGrey font-light">{order.deliveryDate}</span></h4>
                    </div>
                    <div>
                    <h4 className="font-medium md:text-base text-xs text-grayText py-2">Order Status : <span className="text-borderGrey font-light">{order.orderStatus}</span></h4>
                    <h4 className="font-medium md:text-base text-xs text-grayText">Payment Method : <span className="text-borderGrey font-light">{order.paymentMethod}</span></h4>
                    </div>
                    </div>
                </div>
                
                {order.cartItems?.map((item:TCartItem) =>(
                    <div className="flex justify-between items-center mb-8">

                    <div className="flex">
                    <img className="rounded-md md:w-28  w-20 md:h-28 h-20 md:mr-6 mr-3" src={item.image} alt={item.title}/>
                    <div className="text-darkText font-semibold md:text-sm text-xs">
                    <h4 className="md:text-base text-xs">{item.title}</h4>
                    <h4 className="my-2 md:text-sm text-xs">Color : <span className="text-grayText">{item.color}</span></h4>
                    <h4 className="mb-2 md:text-sm text-xs">Qty : <span className="text-grayText">{item.quantity}</span></h4>
                    <h4 className="text-grayText md:text-sm text-xs">Total: ${(item.price * item.quantity).toFixed(2)}</h4>
                    </div>
                    </div>

                    <div>
                        <button className="bg-primary rounded-lg text-white md:py-3 py-2 md:px-7 px-1 text-nowrap md:text-sm text-xs">View Detail</button>
                    </div>
                </div>
                ))}

              </div>
              ))}
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
      <div  className="mt-8">
              {orders?.orders?.filter((order:TOrder) => order.orderStatus === "Completed").map(order =>(
                <div key={order._id} className="py-7 border-b-2  border-borderGreyLight">
                <div className=" w-full md:py-7 py-3 md:px-12 px-5 bg-secondary rounded-lg mb-7">
                <h3 className="md:text-base text-xs text-darkText font-semibold pb-4">Order no: #{order._id}</h3>
                    <div className="flex justify-between">
                    <div>
                        <h4 className="font-medium md:text-base text-xs text-grayText py-2">Order Date : <span className="text-borderGrey font-light">{formatDate(order.orderDate ?? new Date().toISOString())}</span></h4>
                        <h4 className="font-medium md:text-base text-xs text-grayText">Estimated Delivery Date : <span className="text-borderGrey font-light">{order.deliveryDate}</span></h4>
                    </div>
                    <div>
                    <h4 className="font-medium md:text-base text-xs text-grayText py-2">Order Status : <span className="text-borderGrey font-light">{order.orderStatus}</span></h4>
                    <h4 className="font-medium md:text-base text-xs text-grayText">Payment Method : <span className="text-borderGrey font-light">{order.paymentMethod}</span></h4>
                    </div>
                    </div>
                </div>
                
                {order.cartItems?.map((item:TCartItem) =>(
                    <div className="flex justify-between items-center mb-8">

                    <div className="flex">
                    <img className="rounded-md md:w-28  w-20 md:h-28 h-20 md:mr-6 mr-3" src={item.image} alt={item.title}/>
                    <div className="text-darkText font-semibold md:text-sm text-xs">
                    <h4 className="md:text-base text-xs">{item.title}</h4>
                    <h4 className="my-2 md:text-sm text-xs">Color : <span className="text-grayText">{item.color}</span></h4>
                    <h4 className="mb-2 md:text-sm text-xs">Qty : <span className="text-grayText">{item.quantity}</span></h4>
                    <h4 className="text-grayText md:text-sm text-xs">Total: ${(item.price * item.quantity).toFixed(2)}</h4>
                    </div>
                    </div>

                    <div>
                        <button className="bg-primary rounded-lg text-white md:py-3 py-2 md:px-7 px-1 text-nowrap md:text-sm text-xs">View Detail</button>
                    </div>
                </div>
                ))}

              </div>
              ))}
        </div>
      </CustomTabPanel>
    </Box>
    <ToastContainer/> 
      </Fragment>
      
  );
}