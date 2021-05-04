import React, {useState, useContext, useEffect, useRef} from 'react';
import ContentContext from './ContentContext';
import UsernameContext from './UsernameContext';
import SocketContext from './SocketContext';

function CreatePool({}) {
    
    const [username, setUsername] = useContext(UsernameContext);
    const [contentState, setContent] = useContext(ContentContext);
    const socket = useContext(SocketContext);
    
    const poolNameRef = useRef(null);
    
    function onConfirmButton(){
        const poolName = poolNameRef.current.value;
        socket.emit('newPool', {pool_name:poolName, username:username});
        setContent('accountPage');
    }
    
    return (
        <div >
            Please enter a name for your pool<input ref={poolNameRef} type = "text" />
            <button type="button" onClick={onConfirmButton}> 
            Confirm
            </button>
        </div>
    )
}

export default CreatePool;