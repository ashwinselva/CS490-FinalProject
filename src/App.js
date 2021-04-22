import logo from './logo.svg';
import './App.css';
import React, { useState, useRef, useEffect } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import Upload from './Upload';
import ImgDrop from './imgDrop';
import io from 'socket.io-client';
import UserPool from './UserPool';
import ViewPools from './ViewPools';
import LoginDropdown from './LoginDropdown';
import Search from './Search';


const socket = io(); // Connects to socket connection


function App() {
  
  const [isLogin,setLogin]=useState(false);
  const [isLoginClicked,setLoginClicked]=useState(false);
  const [isNewUserClicked,setNewUserClicked]=useState(false);
  const [username, setUsername]=useState('');
  
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
    <div>
    <h1 style={{float: 'left', display: 'inline-block'}}>Arachne</h1>
    <h4 style={{float: 'right', display: 'inline'}}>
    {
    (isLogin === false)?(
    <LoginDropdown 
      socket={socket}
      setUsername={setUsername}
    />
      
    ):(
    <div>
      <lable>{username}</lable>
      <UserPool username={username} socket={socket}/>
    </div>
    )
    }
    
    </h4>
    </div>
      <div style={{clear: 'both'}}>
      </div>
      
      <Search />

      <ViewPools username={username}/>

    </div>
    );
}

export default App;