import logo from './logo.svg';
import './App.css';
import React, { useState, useRef, useEffect } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import Upload from './Upload';
import io from 'socket.io-client';
import UserPool from './UserPool';

const socket=io()

export function ViewPools() {
  const [allPools, setAllPools] = useState({});
  
  function getPoolNames(){
      socket.emit('viewpools', [])
  }
    useEffect(() => {
    socket.on('reponse', (data) => {
        const newDict= [...data]
        setAllPools(newDict)
    });
    
  }, []);
  
  return (
    <div>
    <button onClick={getPoolNames}>View all pools</button>
    <div>

     </div>
     </div>
      
  );
}

export default ViewPools