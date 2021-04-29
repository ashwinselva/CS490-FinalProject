import logo from './logo.svg';
import './App.css';
import React, { useState, useRef, useEffect, useContext } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import Upload from './Upload';
import UserPool from './UserPool';
import ImageList from './ImageList'
import SocketContext from './SocketContext';

export function ViewPools({}) {
  const [allPools, setAllPools] = useState({});
  const [showGrid, setShowGrid] = useState(false)
  const [showPools, setShowPools] = useState(false)
  const [poolToShow, setPoolToShow] = useState([])
  
  const socket = useContext(SocketContext)
  
  function getPoolNames(){
      socket.emit('viewpools', [])
      setShowPools(!showPools)
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
    <h1>{" "}</h1>
    <div>
    {showPools === true ? (
    <div>
    <div>
    Click pool name to view images 
      {
      Object.entries(allPools).map(([key, val]) =>
        
        <div>
           <button onClick={() => onShowGrid(val)}>{key}</button>
        </div>
        )
      }
      </div>
      
        <div>
        {showGrid === true ? (
              <div>
              <h1>{" "}</h1>
              {poolToShow.map(image => (
              <img src = {image} height="100" width="100" />
              ))}
              </div>
        ) : null}
        </div>
        </div>
       ) : null}  
        
     </div>
     </div>
  );
}

export default ViewPools