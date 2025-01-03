import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import "./Account.css"
import PropTypes from 'prop-types';
import imageCard from "../../assets/images/men-jacket.png"
function CustomTabPanel(props) {
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
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  

export default function Orders () {

    const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
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

            <div className="py-7 border-b-2  border-borderGreyLight">
                <div className=" w-full py-7 px-12 bg-secondary rounded-lg mb-7">
                <h3 className="md:text-xl text-base text-darkText font-semibold pb-4">Order no: #123456789</h3>
                    <div className="flex justify-between">
                    <div>
                        <h4 className="font-medium text-sm text-grayText py-2">Order Date : <span className="text-borderGrey font-light">2 June 2023 2:40 PM</span></h4>
                        <h4 className="font-medium text-sm text-grayText">Estimated Delivery Date : <span className="text-borderGrey font-light">8 June 2023</span></h4>
                    </div>
                    <div>
                    <h4 className="font-medium text-sm text-grayText py-2">Order Status : <span className="text-borderGrey font-light">Inprogress</span></h4>
                    <h4 className="font-medium text-sm text-grayText">Payment Method : <span className="text-borderGrey font-light">Cash on delivery</span></h4>
                    </div>
                    </div>
                </div>

                <div className="flex justify-between items-center">

                    <div className="flex">
                    <img className="rounded-md w-28 h-28 md:mr-6 mr-3" src={imageCard} alt=""/>
                    <div className="text-darkText font-semibold text-sm">
                    <h4 className="md:text-base text-sm">Blue Flower Print Crop Top </h4>
                    <h4 className="my-2">Color : <span className="text-grayText">Yellow</span></h4>
                    <h4 className="mb-2">Qty : <span className="text-grayText">1</span></h4>
                    <h4 className="text-grayText">Total: $23.00</h4>
                    </div>
                    </div>

                    <div>
                        <button className="bg-primary rounded-lg text-white md:py-3 py-2 md:px-7 px-3 md:text-lg text-sm">View Detail</button>
                    </div>
                </div>
            </div>

        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Item Two
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Item Three
      </CustomTabPanel>
    </Box>
  );
}