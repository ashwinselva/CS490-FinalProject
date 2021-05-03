import React, {useContext, useState, useEffect} from 'react';
import UsernameContext from './UsernameContext';
import ContentContext from './ContentContext';
import SocketContext from './SocketContext';

function ViewPool({
    poolName,
}) {
    
    const [username, setUsername] = useContext(UsernameContext);
    const [contentState, setContent] = useContext(ContentContext);
    const socket = useContext(SocketContext);
    
    const [imageList, setImages] = useState([]);
    const [initialized, setInit] = useState(false);
    
    if (!initialized){
        socket.emit('fetchImages', {pool:poolName});
        setInit(true);
    }
    
    useEffect(() => {
        socket.on('list images', (data) => {
            setImages(data.imageList);
            data.imageList.map((image) => console.log(image));
        });
    }, []);
    
    return (
        <div className='App-header' style={{width:'80vw', alignItems:'center'}}>
            <h1 style={{display:'flex'}}>{poolName.toUpperCase()}</h1>
            <div className='App-header-row'>
            
            <div className='App-header' style={{width:'20%', height:'55vh'}}>
            </div>
            
            <div className='App-header' style={{width:'60%', overflow:'auto', height:'55vh'}}>
            <div style={{display:'flex', flexDirection:'row',  flexWrap:'wrap'}}>
                {
                    imageList.map(image => (
                        <img src={image} style={{width:'200px', height:'200px', borderRadius:'12px', objectFit:'cover'}}/>
                    ))
                }
                {
                    imageList.map(image => (
                        <img src={image} style={{width:'200px', height:'200px', borderRadius:'12px', objectFit:'cover'}}/>
                    ))
                }
                {
                    imageList.map(image => (
                        <img src={image} style={{width:'200px', height:'200px', borderRadius:'12px', objectFit:'cover'}}/>
                    ))
                }
                {
                    imageList.map(image => (
                        <img src={image} style={{width:'200px', height:'200px', borderRadius:'12px', objectFit:'cover'}}/>
                    ))
                }
                {
                    imageList.map(image => (
                        <img src={image} style={{width:'200px', height:'200px', borderRadius:'12px', objectFit:'cover'}}/>
                    ))
                }
                {
                    imageList.map(image => (
                        <img src={image} style={{width:'200px', height:'200px', borderRadius:'12px', objectFit:'cover'}}/>
                    ))
                }
                <button onClick={() => setContent('uploadImg.'+poolName)}>Add Image</button>
            </div>
            </div>
            
            <div className='App-header' style={{width:'20%', height:'55vh'}}>
                <button onClick={() => setContent('sketchit.'+poolName)}>Start Sketching!</button>
            </div>
            
            </div>
        </div>
    )
}

export default ViewPool;