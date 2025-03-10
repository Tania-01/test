import React from 'react';
import {Outlet} from "react-router-dom";
import Header from "./Header/DropDown";

const MainLayaout = () => {
    return (
        <div>

         <Header/>
            <Outlet/>

        </div>
    );
};

export default MainLayaout;