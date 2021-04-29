import React, { useState, useContext, useEffect } from 'react';
import ContentContext from './ContentContext';
import SocketContext from './SocketContext';

function Sketchit({
    poolName
}) {
    
    const socket = useContext(SocketContext);
    const [contentState, setContent] = useContext(ContentContext);
    
    const [waiting, setWaiting] = useState(true);
    const [imageList, setImages] = useState([]);
    
    function onCloseButton() {
        setContent('viewPool.' + poolName)
    }
    
    useEffect(() => {
        socket.emit('fetchImages', {pool:poolName});
        socket.on('list images', (data) => {
            setImages(data.imageList);
            setWaiting(false);
            data.imageList.map((image) => console.log(image));
        });
    }, []);
    
    return (
        <div className='App-header-row'>
            <div className='App-header' style={{width:'15%'}}>
                Timer
            </div>
            <div className='App-header' style={{width:'70%'}}>
                <div className='Sketchit-app'>
                    {!waiting?(
                        <img src={imageList[0]} style={{objectFit:'contain', width:'100%', height:'100%'}}/>
                    ):(null)
                    }
                </div>
                <div>
                    <button>Back</button>
                    <button>Pause</button>
                    <button>Next</button>
                </div>
            </div>
            <div className='App-header' style={{width:'15%'}}>
                <button onClick={onCloseButton}>Close</button>
                <button>Settings</button>
            </div>
        </div>
    )
}

export default Sketchit;