import logo from './logo.svg';
import './App.css';
import React, { useState, useRef, useEffect } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import Upload from './Upload';
import io from 'socket.io-client';
import UserPool from './UserPool';
import ImageList from './ImageList'

const socket=io()

export function ViewPools({}) {
  const [allPools, setAllPools] = useState({});
  const [showGrid, setShowGrid] = useState(false)
  const [poolToShow, setPoolToShow] = useState([])
  
  function getPoolNames(){
      socket.emit('viewpools', [])
  }
  
  function onShowGrid(val){
    setShowGrid(!showGrid)
    const newArray = [...val]
    setPoolToShow(newArray)
  }
    useEffect(() => {
    socket.on('response', (data) => {
        const newDict= {}
        Object.entries(data).map(([key, val]) =>
          newDict[key] = val
        )
        setAllPools(newDict)
        console.log(newDict)
    });
    
 }, []);
  
  return (
    <div>
    <button onClick={getPoolNames}>View all pools</button>
    <div>
      {
      Object.entries(allPools).map(([key, val]) =>
        
        <div>
           <button onClick={() => onShowGrid(val)}>{key}</button>
        </div>
        )
        
      }
      
        <div>
        {showGrid === true ? (
              <div>
              {poolToShow.map(image => (
              <img src = {image} />
              ))}
              </div>
        ) : null}
        </div>
        
     </div>
     </div>
  );
}

export default ViewPools