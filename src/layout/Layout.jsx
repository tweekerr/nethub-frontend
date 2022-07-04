import React from 'react';
import Header from "./Header/Header";
import Sidebar from "./sidebar/Sidebar";

const Layout = (props) => {
    return (
        <div>
            <Header/>
            <div className={"mainContainer"}>
                    <Sidebar/>
                    {props.children}
                    {props.aside ? props.aside : null}
            </div>

            //Footer
        </div>
    );
};

export default Layout;