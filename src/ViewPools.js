import React, {useState, useContext, useEffect} from 'react';
import ContentContext from './ContentContext';
import SocketContext from './SocketContext';

function ViewPools({}) {
    
    const [contentState, setContent] = useContext(ContentContext);
    const socket = useContext(SocketContext);
    
    const [poolList, setPoolList] = useState([]);
    const [initialized, setInit] = useState(false);
    
    if (!initialized){
        socket.emit('viewpools', {});
        setInit(true);
    }
    
    useEffect(() => {
        socket.on('response', (data) => {
            setPoolList(data.poolList);
            console.log('got pools');
        });
    }, []);
    

    return (
        <div className='App-header' style={{width:'80vw', justifyContent:'center'}}>
            <button onClick={() => setContent('home')}>Back To Homepage</button>
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

export default ViewPools;