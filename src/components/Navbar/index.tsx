import React, { Fragment } from 'react';
import './Navbar.css';
import DesktopNavbar from './DesktopNavbar';
import MobileNavbar from './MobileNavbar';

export default function Navbar() {
  return (
    <Fragment>
      <div className="">
        <DesktopNavbar />
        <MobileNavbar />
      </div>
    </Fragment>
  );
}
