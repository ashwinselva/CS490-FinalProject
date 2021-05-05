import React, { useState, useContext, useEffect, useRef } from 'react';
import ContentContext from './ContentContext';
import SocketContext from './SocketContext';
import { useTimer } from 'react-timer-hook';
import "./style.css";

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
    const [optionsVisible, setOptions] = useState(false);
    const [fullscreen, setFullscreen] = useState(false);
    
    const timer = useTimer( {expiryTimestamp:new Date(), onExpire:() => {nextImage()}} );
    
    const durationRef = useRef(null);
    
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
    
    function shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        
        return array;
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
    
    
    function onTimerConfirmButton(newDuration){
        setDuration(parseInt(newDuration));
        console.log(newDuration);
        if (!waiting){
            const timestamp = new Date();
            timestamp.setSeconds(timestamp.getSeconds() + parseInt(newDuration));
            timer.restart(timestamp);
            if (!startSketchit){
                timer.pause();
            }
            console.log(timer.isRunning);
        }
    }
    
    useEffect(() => {
        if(startSketchit === true && !timer.isRunning) {
            timer.resume();
        }
    }, [timer.isRunning, startSketchit])
    
    useEffect(() => {
        timer.pause()
        socket.emit('fetchImages', {pool:poolName});
        socket.on('list images', (data) => {
            const tempImages = data.imageList;
            shuffleArray(tempImages);
            setImages(tempImages);
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
                    {!waiting?(
                    optionsVisible?(
                        <div className='Sketchit-options'>
                        <label>Timer: <input type='number' ref={durationRef}/>
                        <button onClick={() => onTimerConfirmButton(durationRef.current.value)}>Confirm</button></label>
                        <button onClick={() => {setOptions(false); setStart(true)}}>Close</button>
                        </div>
                    ):(
                        <img src={imageList[imageIndex]} style={{objectFit:'contain', width:'100%', height:'100%'}}/>
                    )
                    
                    ):(null)
                    }
                </div>
                <div>
                    <button class="button" onClick={prevImage}>Back</button>
                    {startSketchit?(
                        <button class="button" onClick={onPauseButton}>Pause</button>
                    ):(
                        <button class="button" onClick={onStartButton}>Start</button>
                    )}
                    <button class="button" onClick={nextImage}>Next</button>
                </div>
            </div>
            <div className='App-header' style={{width:'15%'}}>
                <button class="button" onClick={onCloseButton}>Close</button>
                <button class="button" onClick={() => {setOptions(true); setStart(false);}}>Settings</button>
            </div>
        </div>
    )
}

export default Sketchit;