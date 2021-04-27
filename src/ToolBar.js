import React, {useState, useRef, useContext} from 'react';
import LoginDropdown from './LoginDropdown';
import UserPool from './UserPool';
import UsernameContext from './UsernameContext';

function ToolBar({}) {
    
    const [username, setUsername] = useContext(UsernameContext);
    
    return (
        <div>
        <h1 style={{float: 'left', display: 'inline-block'}}>Arachne</h1>
        <h4 style={{float: 'right', display: 'inline'}}>
        {(username === '')?
        (
            <LoginDropdown />
        ):(
            <div>
            <lable>{username}</lable>
            <UserPool />
            </div>
        )}
        
        </h4>
        </div>
    )
}

export default ToolBar;