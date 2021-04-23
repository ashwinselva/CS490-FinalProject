import React from 'react';
import DisplayContext from './DisplayContext';
import SocketContext from './SocketContext';
import UsernameContext from './UsernameContext';


function ContextManager(props) {
    
    return (
        <DisplayContext.Provider value={props.content}>
        <UsernameContext.Provider value={props.username}>
        <SocketContext.Provider value={props.socket}>
            {props.children}
        </SocketContext.Provider>
        </UsernameContext.Provider>
        </DisplayContext.Provider>
    )
}

export default ContextManager;