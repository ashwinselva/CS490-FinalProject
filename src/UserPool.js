import React, { useState, useRef, useEffect, useContext } from "react";
import Upload from "./Upload";
import ImgDrop from "./ImgDrop";
import ImageList from "./ImageList";
import SocketContext from "./SocketContext";
import UsernameContext from './UsernameContext';

export default function UserPool({}){
    const [viewMode, setView] = useState(false);
    const inputRef = useRef(null);
    const [isConfirmed, setConfirmed] = useState(false);
    const [currentPool, setPool] = useState('');
    const [poolList, setPoolList] = useState([]);
    
    const [waiting, setWaiting] = useState(true);
    const [imageList, setImages] = useState([]);
    const [initialized, setInit] = useState(false);
    
    const socket = useContext(SocketContext);
    const [username, setUsername] = useContext(UsernameContext);
    
    function onPoolSelect(poolName){
        console.log(poolName);
        setPool(poolName);
        setConfirmed(true);
        setWaiting(true);
        setView(true);
        socket.emit('fetchImages', {pool:poolName});
    }

    function onPoolButton(){
        setView((prevShown) => !prevShown);
    }
    
    function onConfirmButton(){
        setConfirmed(true);
        const userText = inputRef.current.value;
        console.log(userText)
        setPool(userText);
        socket.emit('newPool', {pool_name:userText, username:username});
        console.log(isConfirmed);
    }
    
    function onShowSelection(){
        setConfirmed(false);
        setView(false);
        socket.emit('fetchPools', {username:username});
    }
    
    if (!initialized){
        socket.emit('fetchPools', {username:username});
        setInit(true);
    }
    
    useEffect(() => {
        socket.on('list pools', (data) => {
            setPoolList(data.poolList);
            console.log('got pools');
        });
        socket.on('list images', (data) => {
            setImages(data.imageList);
            setWaiting(false);
            data.imageList.map((image) => console.log(image));
        });
    }, []);
    
return (
    <div>
        {viewMode === true ? (
        <div>
            {isConfirmed === true ? (
                <div>
                    Displaying {currentPool}
                    <button type="button" onClick={onShowSelection}>Choose A Different Pool</button>
                    <Upload poolName={currentPool} username={username} socket={socket}/>
                    <ImgDrop poolName={currentPool} username={username} socket={socket}/>
                    {waiting === true? (
                        <div>Waiting</div>
                    ):(
                        <ImageList imageList={imageList} />
                    )
                    }
                </div>
            ):(
                <div>
                    Please enter a name for your pool<input ref={inputRef} type = "text" />
                    <button type="button" onClick={onConfirmButton}> 
                    Confirm
                    </button>
                </div>
            )}
        </div>
        ):(
        <div>
            {
                poolList.map((pool) => (
                    <button type="button" onClick={() => onPoolSelect(pool)}>
                    {pool}
                    </button>
                ))
            }
            <button type="button" onClick={() => onPoolButton()}> 
            New Pool 
            </button>
        </div>
        )}
    </div>
    );

}