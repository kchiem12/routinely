import React from 'react';
import './topbar.css';
import { Avatar } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';

const Topbar = () => {
    return ( 
        <div className="topbar">
            <div className="bar-wrapper">
                <div className="top-left">
                    <span className="title">workout tracker</span>
                </div>
                <div className="top-right">
                    <div className="topbar-icons">
                        <Avatar sx={{bgcolor: '#A91079', height: '40px', width: '40px'}} src='/broken-image.jpg' />
                    </div>
                    <div className="topbar-icons">
                        <SettingsIcon sx={{height: '35px', width: '35px'}} />
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default Topbar;