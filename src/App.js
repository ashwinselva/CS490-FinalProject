import './App.css';
import React, { useState, useRef, useEffect } from 'react';
import io from 'socket.io-client';
import DisplayContext from './DisplayContext';
import SocketContext from './SocketContext';
import UsernameContext from './UsernameContext';
import NavBar from './NavBar';
import HomeScreen from './HomeScreen';


const socket = io(); // Connects to socket connection


function App() {
  const [contentState, setContent]=useState('home');
  const [username, setUsername] = useState('');
  
  useEffect(() => {
    socket.on('loginSuccess', (data) => {
      setUsername(data.username);
      console.log('success');
    });
  }, []);
  
  return (
    <DisplayContext.Provider value={[contentState, setContent]}>
    <UsernameContext.Provider value={[username, setUsername]}>
    <SocketContext.Provider value={socket}>
    
    <div className="App">
    
      <NavBar />
      
      <div style={{clear: 'both'}}>
      </div>
      
      {
        {
          'home': (
            <HomeScreen />
          ),
        } [contentState]
      }

    </div>
    
    </SocketContext.Provider>
    </UsernameContext.Provider>
    </DisplayContext.Provider>
    );
}

export default App;