import React, { useState, useContext, useEffect } from 'react';
import ContentContext from './ContentContext';
import SocketContext from './SocketContext';
import { useTimer } from 'react-timer-hook';

function Sketchit({
    poolName
}) {
    
    const socket = useContext(SocketContext);
    const [contentState, setContent] = useContext(ContentContext);
    
    const [waiting, setWaiting] = useState(true);
    const [imageList, setImages] = useState([]);
    const [startSketchit, setStart] = useState(false);
    const [duration, setDuration] = useState(10);
    const [imageIndex, setIndex] = useState(0);
    const timer = useTimer( {expiryTimestamp:new Date(), onExpire:() => {nextImage()}} );
    
    function nextImage() {
        if (imageIndex+1 === imageList.length) {
            setIndex(0);
        }
        else {
            setIndex(prevIndex => prevIndex+1);
        }
        
        const timestamp = new Date();
        timestamp.setSeconds(timestamp.getSeconds() + duration );
        timer.restart(timestamp);
        if (!startSketchit){
            timer.pause();
        }
        console.log(timer.isRunning);
    }
    
    function prevImage() {
        if (imageIndex-1 < 0) {
            setIndex(imageList.length-1);
        }
        else{
            setIndex(prevIndex => prevIndex-1);
        }
        
        const timestamp = new Date();
        timestamp.setSeconds(timestamp.getSeconds() + duration );
        timer.restart(timestamp);
        if (!startSketchit){
            timer.pause();
        }
        console.log(timer.isRunning);
    }
    
    function onStartButton() {
        if (timer.seconds === 0) {
            const timestamp = new Date();
            timestamp.setSeconds(timestamp.getSeconds() + duration );
            timer.restart(timestamp);
            setStart(true);
        }
        else{
            timer.resume();
            setStart(true);
        }
    }
    
    function onPauseButton() {
        console.log(timer.isRunning);
        timer.pause();
        setStart(false);
    }
    
    function onCloseButton() {
        setContent('viewPool.' + poolName)
    }
    
    useEffect(() => {
        if(startSketchit === true && !timer.isRunning) {
            timer.resume();
        }
    }, [timer.isRunning])
    
    useEffect(() => {
        timer.pause()
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
                {timer === null?'0':timer.seconds}
            </div>
            <div className='App-header' style={{width:'70%'}}>
                <div className='Sketchit-app'>
                    {(!waiting)&&startSketchit?(
                        <img src={imageList[imageIndex]} style={{objectFit:'contain', width:'100%', height:'100%'}}/>
                    ):(null)
                    }
                </div>
                <div>
                    <button onClick={prevImage}>Back</button>
                    {startSketchit?(
                        <button onClick={onPauseButton}>Pause</button>
                    ):(
                        <button onClick={onStartButton}>Start</button>
                    )}
                    <button onClick={nextImage}>Next</button>
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