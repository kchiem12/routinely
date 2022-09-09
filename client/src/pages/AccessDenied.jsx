import React from 'react';
import './accessdenied.css';

const AccessDenied = () => {
    return ( 
        <div className='access-denied'>
            <div className="access-denied-container">
                <h1 className="access-title">
                    Access Denied
                </h1>
                <h3 className='description'>
                    No user log-in credential detected
                </h3>
            </div>
        </div>
     );
}
 
export default AccessDenied;