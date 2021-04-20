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
  const [allPools, setAllPools] = useState([]);
  
  function getPoolNames(){
      socket.emit('viewpools', ['nonexistuser'])
  }
    useEffect(() => {
    socket.on('reponse', (data) => {
        const newArray= [...data]
        setAllPools(newArray)
    });
    
  }, []);
  
  return (
    <div>
    <button onClick={getPoolNames}>View all pools</button>
    <div>
      {allPools.map(pool => (
        <li>{pool}</li>
      ))}
     </div>
     </div>
      
  );
}

export default ViewPools