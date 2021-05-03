import React, {useState, useContext, useEffect} from 'react';
import UsernameContext from './UsernameContext';
import ContentContext from './ContentContext';
import SocketContext from './SocketContext';

function AccountPage({}) {
    
    const [username, setUsername] = useContext(UsernameContext);
    const [contentState, setContent] = useContext(ContentContext);
    const socket = useContext(SocketContext);
    
    const [poolList, setPoolList] = useState([]);
    const [initialized, setInit] = useState(false);
    
    if (!initialized){
        socket.emit('fetchPools', {username:username});
        setInit(true);
    }
    
    useEffect(() => {
        socket.on('list pools', (data) => {
            setPoolList(data.poolList);
            console.log('got pools');
        });
    }, []);
    
    return (
        <div className='App-header' style={{width:'80vw', justifyContent:'center'}}>
            <h1>{username.toUpperCase()}&#39;s POOLS</h1>
            <div className='App-header-row'>
            
            <div className='App-header' style={{width:'20%'}}>
            </div>
            
            <div className='App-header' style={{width:'60%', overflow:'auto'}}>
                {
                    poolList.map(poolName => (
                        <button className='Pool-list' onClick={() => setContent('viewPool.'+poolName)}>
                        <h3>{poolName}</h3>
                        </button>
                    ))
                }
            </div>
            
            <div className='App-header' style={{width:'20%'}}>
            </div>
            
            </div>
        </div>
    )
}

export default AccountPage;