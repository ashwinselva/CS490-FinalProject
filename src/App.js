import './App.css';
import React, { useState, useRef, useEffect } from 'react';
import io from 'socket.io-client';
import ContextManager from './ContextManager';
import ToolBar from './ToolBar';
import HomeScreen from './HomeScreen';

<<<<<<< HEAD
=======
import Sketchit from './Sketchit';

import SearchPage from './SearchPage';
>>>>>>> 5f94f38fa6c3062fb24db1a375d6705e70fc7939

const socket = io(); // Connects to socket connection


function App() {
  const [contentState, setContent]=useState('home');
  const [username, setUsername] = useState('');
  
  function setPage(page) {
    const pageValues = page.split('.');
    const pageType = pageValues[0];
    const pageData = pageValues.length==2?pageValues[1]:null;
    return {
      'home' : (<HomeScreen />),
<<<<<<< HEAD
=======
      'sketchit' : (<Sketchit poolName={pageData} />),
      'viewPool' : (<div>{pageData}</div>),
      'search': (<SearchPage pageData={pageData}/>)
>>>>>>> 5f94f38fa6c3062fb24db1a375d6705e70fc7939
    } [pageType]
  }
  
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
      
      {setPage(contentState)}

    </div>
    </ContextManager>
    );
}

export default App;