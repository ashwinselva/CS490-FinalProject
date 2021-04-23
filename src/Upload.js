import './App.css';
import React, { useState, useRef, useEffect, useContext} from 'react';
import 'react-dropdown/style.css';
import UsernameContext from './UsernameContext';


function Upload(props) {
  
  const [username, setUsername] = useContext(UsernameContext);
  
const changeHandler = (event) => {
  const files = event.target.files
  const formData = new FormData()
  console.log(files[0])
  formData.append('myFile', files[0])
  formData.append('poolName', props.poolName)
  formData.append('username', username)
  
  
  fetch('/saveImage', {
    method: 'POST',
    body: formData,
  })
  .then(response => response.json())
  .then(data => {
    console.log(data)
  })
  .catch(error => {
    console.error(error)
  })
  
  alert("Upload successful.");
  
};

  
  return (
    <div className="App">
       <input type="file" name="file" onChange={changeHandler} />
    </div>
    
  );
}

export default Upload;

