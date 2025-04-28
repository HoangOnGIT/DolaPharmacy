import React from 'react';
import Logo from "../../img/Header/Logo.png";

const DashboardHeader = () => {
    return (
        <header>
            <div className='w-full'>
                <div className='row'>
                    {/* Logo */}
                    <div className='col-xs-3'>
                        <Link to={'/'}><img src={Logo}></img> </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default DashboardHeader;
