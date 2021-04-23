import './App.css';
import React, { useState, useRef, useEffect } from 'react';
import io from 'socket.io-client';
import ContextManager from './ContextManager';
import ToolBar from './ToolBar';
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
    <ContextManager
      content={[contentState, setContent]}
      username={[username, setUsername]}
      socket={socket}
    >
    <div className="App">
    
      <ToolBar />
      
      <div style={{clear: 'both'}}>
      </div>
      
      {{
      
        'home': (<HomeScreen />),
        
      }[contentState]}

    </div>
    </ContextManager>
    );
}

export default App;