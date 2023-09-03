import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../../components/Navbar/Navbar';

function LayoutWithNav() {
    return (
        <>
            <NavBar />
            <Outlet />
        </>
    );
}

export default LayoutWithNav;