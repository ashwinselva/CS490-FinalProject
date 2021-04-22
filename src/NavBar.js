import React, {useState, useRef} from 'react';
import LoginDropdown from './LoginDropdown';
import UserPool from './UserPool';

function NavBar({
    isLogin,
    username,
    setUsername,
    socket,
}) {
    
    return (
        <div>
        <h1 style={{float: 'left', display: 'inline-block'}}>Arachne</h1>
        <h4 style={{float: 'right', display: 'inline'}}>
        {(isLogin === false)?
        (
            <LoginDropdown 
            socket={socket}
            setUsername={setUsername}
            />
        ):(
            <div>
            <lable>{username}</lable>
            <UserPool username={username} socket={socket}/>
            </div>
        )}
        
        </h4>
        </div>
    )
}

export default NavBar;