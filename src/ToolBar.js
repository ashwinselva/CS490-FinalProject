import React, {useState, useRef, useContext} from 'react';
import LoginDropdown from './LoginDropdown';
import UserPool from './UserPool';
import UsernameContext from './UsernameContext';
import Search from "./Search";
import ContentContext from './ContentContext';

function ToolBar({}) {
    
    const [username, setUsername] = useContext(UsernameContext);
    const [contentState, setContent] = useContext(ContentContext);
    
    return (
        <div>
        <h1 style={{float: 'left', display: 'inline-block'}}>Arachne</h1>
        
        <h4 style={{float: 'right', display: 'inline'}}>
        <Search/>
        {(username === '')?
        (
        <div>
            <LoginDropdown />
            </div>
        ):(
            <div>
            <lable>{username}</lable>
            <button onClick={()=>setContent('accountPage')}>My Pools</button>
            </div>
        )}
        
        </h4>
        </div>
    )
}

export default ToolBar;