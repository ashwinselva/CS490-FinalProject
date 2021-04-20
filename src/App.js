import logo from './logo.svg';
import './App.css';
import React, { useState, useRef, useEffect } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import Upload from './Upload';
import io from 'socket.io-client';


const socket = io(); // Connects to socket connection


function App() {
  
  const [isLogin,setLogin]=useState(false);
  const [isLoginClicked,setLoginClicked]=useState(false);
  
  const inputRef = useRef(null);
  const inputRefUser = useRef(null); 
  const inputRefPassword = useRef(null); 

  function onClick(){
    const username=inputRefUser.current.value;
    const password=inputRefPassword.current.value;
    console.log(username);
    console.log(password);
     socket.emit('login',{user:username,password:password});
    
    }

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
  
  function changeLogin(){
    setLogin((prevLogin)=> {
      return !prevLogin;
    });
  }
  
  function changeLoginClick(){
    console.log("button clicked");
    setLoginClicked((prevLogin)=> {
      return !prevLogin;
    });
  }
  
  return (
    <div className="App">
    <div>
    <h1 style={{float: 'left', display: 'inline-block'}}>Arachne</h1>
    <h4 style={{float: 'right', display: 'inline'}}>
    
    <button onClick={()=>changeLoginClick()}>Login</button>
    <div>
    {
      isLoginClicked === true?
      (
        <form>
        <br />
  <label>
    Login-ID:
    <input ref={inputRefUser} type="text"/>
  </label><br />
  <label>
  Password
    <input type="password" ref={inputRefPassword} />
  </label><br />
  <input type="submit" value="Submit" onClick={onClick} />
  <br />
</form>
      ):
      (null)
    }
    </div>
    </h4>
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
      <Upload />
    </div>
  );
}

export default App;
