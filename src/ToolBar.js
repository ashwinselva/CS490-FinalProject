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
        <div style = {{ float: 'left', padding: '10px',"margin-left":'30%',"margin-right":'25%'}}>
                <Search />
            </div>
        <h4 style={{float: 'right', display: 'inline'}}>
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