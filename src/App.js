import './App.css';
import React, { useState, useRef, useEffect } from 'react';
import io from 'socket.io-client';
import ContextManager from './ContextManager';
import ToolBar from './ToolBar';
import HomeScreen from './HomeScreen';
import UploadImg from './UploadImg';
import AccountPage from './AccountPage';
import ViewPool from './ViewPool';
import ViewPools from './ViewPools';
import CreatePool from './CreatePool';

import Sketchit from './Sketchit';

import SearchPage from './SearchPage';

const socket = io(); // Connects to socket connection

var rootStyle = {
  backgroundColor : 'LightSlateGray',
  
  height : '100%'

}

function App() {
  const [contentState, setContent]=useState('home');
  const [username, setUsername] = useState('');
  
  function setPage(page) {
    const pageValues = page.split('.');
    const pageType = pageValues[0];
    const pageData = pageValues.length==2?pageValues[1]:null;
    return {
      
      'home' : (<HomeScreen />),
      'sketchit' : (<Sketchit poolName={pageData} />),
      'viewPool' : (<ViewPool poolName={pageData} />),
      'viewPools' : (<ViewPools />),
      'search': (<SearchPage pageData={pageData}/>),
      'uploadImg': (<UploadImg poolName={pageData}/>),
      'accountPage': (<AccountPage />),
      'createPool' : (<CreatePool />),
    } [pageType]
  }
  
  useEffect(() => {
    socket.on('loginSuccess', (data) => {
      setUsername(data.username);
      console.log('success');
    });
  }, []);
  
  return (
    <div style={rootStyle}>
    <ContextManager
      content={[contentState, setContent]}
      username={[username, setUsername]}
      socket={socket}
    >
    <div className="App" >
    
      <ToolBar />
      
      <div style={{clear: 'both'}}>
      </div>
      
      {setPage(contentState)}
    </div>
 
    </ContextManager>
    </div>
    
    );
}

export default App;