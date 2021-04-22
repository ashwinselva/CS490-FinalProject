import './App.css';
import React, { useState, useRef, useEffect } from 'react';
import io from 'socket.io-client';
import NavBar from './NavBar';
import HomeScreen from './HomeScreen';


const socket = io(); // Connects to socket connection


function App() {
  
  const [isLogin,setLogin]=useState(false);
  const [isLoginClicked,setLoginClicked]=useState(false);
  const [isNewUserClicked,setNewUserClicked]=useState(false);
  const [username, setUsername]=useState('');
  const [contentState, setContent]=useState('home');
  
  function changeLogin(){
    setLogin((prevLogin)=> {
      return !prevLogin;
    });
  }
  
  useEffect(() => {
    socket.on('loginSuccess', (data) => {
      setLogin(true);
      console.log('success');
    });
  }, []);
  
  return (

    <div className="App">
    <NavBar
      isLogin={isLogin}
      username={username}
      setUsername={setUsername}
      socket={socket}
    />
    
    <div style={{clear: 'both'}}>
    </div>
    
    {
      {
        'home': 
        (<HomeScreen username={username}/>),
      } [contentState]
    }

    </div>
    );
}

export default App;