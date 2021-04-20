import logo from './logo.svg';
import './App.css';
import React, { useState, useRef, useEffect } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import Upload from './Upload';
import io from 'socket.io-client';
import UserPool from './UserPool';
import ViewPools from './ViewPools';



const socket = io(); // Connects to socket connection


function App() {
  
  const [isLogin,setLogin]=useState(false);
  const [isLoginClicked,setLoginClicked]=useState(false);
  const [isNewUserClicked,setNewUserClicked]=useState(false);
  const [username, setUsername]=useState('');

  
  const inputRef = useRef(null);
  const inputRefUser = useRef(null); 
  const inputRefPassword = useRef(null); 
  const inputNewUser = useRef(null); 
  const inputNewUserPassword = useRef(null); 

  function onClick(){
    const username=inputRefUser.current.value;
    const password=inputRefPassword.current.value;
    console.log(username);
    console.log(password);
    socket.emit('login',{user:username,password:password});
    setUsername(username)
    
    }

  function newUser(){
    const username=inputNewUser.current.value;
    const password=inputNewUserPassword.current.value;
    console.log(username);
    console.log(password);
    socket.emit('newUser',{user:username,password:password});
    setUsername(username)
    
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
  
  function changeNewUserClick(){
    console.log("button clicked");
    setNewUserClicked((prevLogin)=> {
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
    <div>
    {
    isNewUserClicked === false?(
    <div>
    <button onClick={()=>changeLoginClick()}>Login</button>
    <div>
    {
      isLoginClicked === true?
      (<div>
        <br />
  <label>
    Login-ID:
    <input ref={inputRefUser} type="text"/>
  </label><br />
  <label>
  Password
    <input type="password" ref={inputRefPassword} />
  </label><br />
  <button type="submit" value="Submit" onClick={onClick} />
  <br />
  </div>
      ):
      (null)
    }
    </div>
    </div>
    ):(null)
    }
    
    <br />
    
    
    {
    isLoginClicked === false?(
    <div>
    <button onClick={()=>changeNewUserClick()}>New User</button>
    <div>
    {
      isNewUserClicked === true?
      (
        <div>
        <br />
  <label>
    User-ID:
    <input ref={inputNewUser} type="text"/>
  </label><br />
  <label>
  Password
    <input type="password" ref={inputNewUserPassword} />
  </label><br />
  <input type="submit" value="Submit" onClick={newUser} />
  <br />
</div>
      ):
      (null)
    }
    </div>
    </div>
    ):(null)
    }
    
    
    <br />
    </div>
    ):(
    <div>
      <lable>{username}</lable>
      <UserPool username={username}/>
    </div>
    )
    }
    
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
      <ViewPools username={username}/>
      
    </div>
    );
}

export default App;