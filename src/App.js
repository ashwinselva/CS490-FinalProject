import logo from './logo.svg';
import './App.css';
import React, { useState, useRef, useEffect } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

function App() {
  const inputRef = useRef(null); 
  const options = [
  'Keyword', 'Tag', 'Random Images'
  ];

  const buttonstyle = {
    background: "transparent",
    border: "none"
  };
  
  function onSearch() {
    console.log('search');
  }
  
  return (
    <div className="App">
    <div>
    <h1 style={{float: 'left', display: 'inline-block'}}>Arachne</h1>
    <h1 style={{float: 'right', display: 'inline'}}><button>Login</button></h1>
    </div>
      <div style={{clear: 'both'}}>
      </div>
      <button style={buttonstyle}>
      <Dropdown style={buttonstyle} options={options} placeholder="Search by" />
      </button>
      <input ref={inputRef} type="text" />
      <button type="button" onClick={onSearch}>
        Search
      </button>
      
      <h1><button>Play Game</button></h1>
    </div>
  );
}

export default App;