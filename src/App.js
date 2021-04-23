import './App.css';
import React, { useState, useRef, useEffect } from 'react';
import io from 'socket.io-client';
import SocketContext from './SocketContext';
import NavBar from './NavBar';
import HomeScreen from './HomeScreen';


const socket = io(); // Connects to socket connection


function App() {
  
  const [isLogin,setLogin]=useState(false);
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
    <SocketContext.Provider value={socket}>
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
        'home': (
          <HomeScreen username={username}/>
        ),
      } [contentState]
    }

    </div>
    </SocketContext.Provider>
    );
}

export default App;