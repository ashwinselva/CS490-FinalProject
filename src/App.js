import './App.css';
import React, { useState, useRef, useEffect } from 'react';
import io from 'socket.io-client';
import SocketContext from './SocketContext';
import UsernameContext from './UsernameContext';
import NavBar from './NavBar';
import HomeScreen from './HomeScreen';


const socket = io(); // Connects to socket connection


function App() {
  
  const [isLogin,setLogin]=useState(false);
  const [contentState, setContent]=useState('home');
  
  const [username, setUsername] = useState('');
  
  function changeLogin(){
    setLogin((prevLogin)=> {
      return !prevLogin;
    });
  }
  
  useEffect(() => {
    socket.on('loginSuccess', (data) => {
      setUsername(data.username);
      console.log('success');
    });
  }, []);
  
  return (
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
    );
}

export default App;