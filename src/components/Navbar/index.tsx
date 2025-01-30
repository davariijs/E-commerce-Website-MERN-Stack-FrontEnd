import React, { Fragment } from 'react';
import './Navbar.css';
import DesktopNavbar from './DesktopNavbar';
import MobileNavbar from './MobileNavbar';

export default function Navbar({uid}:{uid:string}) {



  return (
    <Fragment>
        <div className="">
            <DesktopNavbar uid={uid}/>
            <MobileNavbar uid={uid}/>
        </div>
    </Fragment>
  )
}