import React from 'react';
import Header from "./Header/Header";
import MenuItems from "../components/mainSpace/menuItems/MenuItems";

const Layout = (props) => {
    return (
        <div>
            <Header/>
            <div className={"mainContainer"}>
                    <MenuItems/>
                    {props.children}
                    {props.aside ? props.aside : null}
            </div>

            //Footer
        </div>
    );
};

export default Layout;