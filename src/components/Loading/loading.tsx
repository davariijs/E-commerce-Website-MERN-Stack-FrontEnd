import React from "react";
import loadingBar from "../../assets/images/loader.svg";
const Loading: React.FC = () => {
  return <div className='flex justify-center items-center h-fit w-full relative'>
    <img className='w-36' src={loadingBar} alt='loading ...'/>
  </div>;
};

export default Loading;