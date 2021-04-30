import logo from './logo.svg';
import './App.css';
import React, { useState, useRef, useEffect, useContext } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import Upload from './Upload';
import UserPool from './UserPool';
import ImageList from './ImageList'
import SocketContext from './SocketContext';
<<<<<<< HEAD
=======
import ContentContext from './ContentContext';
>>>>>>> 5f94f38fa6c3062fb24db1a375d6705e70fc7939

export function ViewPools({}) {
  const [allPools, setAllPools] = useState({});
  const [showGrid, setShowGrid] = useState(false)
<<<<<<< HEAD
  const [poolToShow, setPoolToShow] = useState([])
  
  const socket = useContext(SocketContext)
  
  function getPoolNames(){
      socket.emit('viewpools', [])
  }
  
  function onShowGrid(val){
    setShowGrid(!showGrid)
    const newArray = [...val]
    setPoolToShow(newArray)
=======
  const [showPools, setShowPools] = useState(false)
  const [poolToShow, setPoolToShow] = useState([])
  const [currentPool, setCurrentPool] = useState('')
  
  const socket = useContext(SocketContext)
  const [contentState, setContent] = useContext(ContentContext);
  
  function getPoolNames(){
      socket.emit('viewpools', [])
      setShowPools(!showPools)
  }
  
  function onShowGrid(key, val){
    setShowGrid(!showGrid)
    const newArray = [...val]
    setPoolToShow(newArray)
    setCurrentPool(key)
>>>>>>> 5f94f38fa6c3062fb24db1a375d6705e70fc7939
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
<<<<<<< HEAD
    <div>
=======
    <h1>{" "}</h1>
    <div>
    {showPools === true ? (
    <div>
    <div>
    Click pool name to view images 
>>>>>>> 5f94f38fa6c3062fb24db1a375d6705e70fc7939
      {
      Object.entries(allPools).map(([key, val]) =>
        
        <div>
<<<<<<< HEAD
           <button onClick={() => onShowGrid(val)}>{key}</button>
        </div>
        )
        
      }
=======
           <button onClick={() => onShowGrid(key, val)}>{key}</button>
        </div>
        )
      }
      </div>
>>>>>>> 5f94f38fa6c3062fb24db1a375d6705e70fc7939
      
        <div>
        {showGrid === true ? (
              <div>
<<<<<<< HEAD
              {poolToShow.map(image => (
              <img src = {image} />
              ))}
              </div>
        ) : null}
        </div>
=======
              <h1>{" "}</h1>
              {poolToShow.map(image => (
              <img src = {image} height="100" width="100" />
              ))}
              <button onClick={() => setContent('sketchit.'+currentPool)}>Start Sketching</button>
              </div>
        ) : null}
        </div>
        </div>
       ) : null}  
>>>>>>> 5f94f38fa6c3062fb24db1a375d6705e70fc7939
        
     </div>
     </div>
  );
}

export default ViewPools