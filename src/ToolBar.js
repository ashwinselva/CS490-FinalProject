import React, {useState, useRef, useContext} from 'react';
import LoginDropdown from './LoginDropdown';
import UserPool from './UserPool';
import UsernameContext from './UsernameContext';
import Search from "./Search";
import ContentContext from './ContentContext';

function ToolBar({}) {
    
    const [username, setUsername] = useContext(UsernameContext);
    const [contentState, setContent] = useContext(ContentContext);
    
    function logOut(){
        
        setUsername('');
        setContent('home')
    }
    return (
        <div style={{display:'flex', flexDirection: 'row', width: '100%', alignItems:'stretch',justifyContent:'space-between'}}>
        <button style={{display: 'flex', color:'#D8EDEE', padding:'0px 20px', backgroundColor:'lightSlateGrey'}} onClick={() => setContent('home')}>
        <h2 >Arachne</h2>
        </button>
        <div style = {{display:'flex', padding: '20px'}}>
                <Search />
                <button style={{height:'60%', margin:'8px'}} onClick={() => setContent('viewPools')}>View All Pools</button>
        </div>
        <div style={{display: 'flex', flexDirection:'row', padding:'20px'}}>
        {(username === '')?
        (
            <div style={{display:'flex', flexDirection: 'row'}}>
            <LoginDropdown />
            </div>
        ):(
            <div style={{display:'flex', flexDirection: 'row'}}>
            <lable>{username}</lable>
            <button onClick={()=>setContent('accountPage')}>My Pools</button>
            <button onClick={logOut}>Logout</button>
            </div>
        )}
        
        </div>
        
        </div>
    )
}

export default ToolBar;