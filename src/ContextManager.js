import React from 'react';
import ContentContext from './ContentContext';
import SocketContext from './SocketContext';
import UsernameContext from './UsernameContext';


function ContextManager(props) {
    
    return (
        <ContentContext.Provider value={props.content}>
        <UsernameContext.Provider value={props.username}>
        <SocketContext.Provider value={props.socket}>
            {props.children}
        </SocketContext.Provider>
        </UsernameContext.Provider>
        </ContentContext.Provider>
    )
}

export default ContextManager;