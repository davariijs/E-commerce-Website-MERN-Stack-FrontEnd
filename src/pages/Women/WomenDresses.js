import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { selectwomenDresses } from '../../redux/womenProducts/womenProductSlice/womenDressesSlice';
import { getWomenDresses } from '../../redux/womenProducts/womenProductSlice/womenDressesSlice';


export default function WomenDresses() {

    const dispatch = useDispatch();
    const womenDresses = useSelector (selectwomenDresses);

    useEffect(() => {
        dispatch(getWomenDresses())
      }, []);

    console.log(womenDresses);
  return (
    <Fragment>
        
    </Fragment>
  )
}