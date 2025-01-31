import React, { Fragment, useEffect, useState } from "react";
import {useParams } from "react-router-dom";
import "./Account.css"
import StepProgress from "../../components/StepProgress/StepProgress";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/users/userSlice";
import { OrderFunc } from "../../utils/wishlistFunc";
import { formatDate } from "../../utils/usefulFunc";
import { RootState } from "src/store";
import { TOrder } from "src/redux/types/types";


export default function OrderDetails () {
const id = useParams();
  const productSingleId = id.id;
  const [orders, setOrders] = useState([]);
  const { uid } = useSelector((state:RootState) => selectUser(state));
  console.log(productSingleId);

  const fetchData = async () => {
    try {
        const result = await OrderFunc(uid);
        console.log("Result from OrderFunc:", result); // Debugging the result

        // Assuming the array is in result.orders
        const ordersArray = result.orders || []; // Use the correct property containing the array
        const data = ordersArray.filter((order:TOrder) => order._id === productSingleId);
        setOrders(data); // Update state with fetched data
    } catch (err) {
        console.log(err);
    }
};

  console.log(orders);

  useEffect(() => {
    if (uid) {
      fetchData(); // Fetch data on component mount
    }
  }, [uid]);



    return(
        <Fragment>
            <div>

                {orders?.map((order:TOrder) => (
                    <div key={order._id}>
                        <div className="bg-secondary md:py-7 md:px-12 py-3 px-5 flex justify-between items-center rounded-lg">
                        <div>
                            <h3 className="text-darkText font-semibold md:text-base text-sm">Order no: #{order._id}</h3>
                            <h4 className="font-light text-base text-borderGrey pt-2">Placed On  {formatDate(order.orderDate ?? new Date().toISOString())} </h4>
                        </div>
                        <h4 className="font-semibold md:text-base text-sm text-grayText">Total : <span className="text-darkText">${order.totalPrice}</span></h4>
                    </div>

                    <div>
                        <StepProgress order={order.orderDate}/>
                    </div>

                    {order?.cartItems?.map(item => (
                        <div className="bg-secondary md:py-7 md:px-12 py-3 px-5 my-10 rounded-lg">
                        <div className="flex justify-between font-semibold md:text-base text-sm py-5 border-b border-borderGrey">
                            <div className="flex">
                            <img className="rounded-md w-24 h-24 md:mr-6 mr-3" src={item.image} alt=""/>
                            <div className="text-darkText ">
                            <h4 className="">{item.title}</h4>
                            <h4 className="mt-2">Color : <span className="text-grayText font-light">{item.color}</span></h4>
                            </div>
                            </div>

                            <h4 className="text-darkText md:text-sm text-xs">Qty <span className="text-grayText font-light">{item.quantity}</span></h4>
                            <h4 className="text-grayText md:text-sm text-xs font-bold">${item.price}</h4>
                        </div>

                        <div></div>
                    </div>
                    ))}
                    
                    </div>
                ))}

            </div>
        </Fragment>
    )
}