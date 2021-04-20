import './App.css';
import React, { useState, useRef, useEffect} from 'react';
import 'react-dropdown/style.css';
import io from 'socket.io-client';
//import axios from 'axios';

const socket = io();

function Upload(props) {
  
const changeHandler = (event) => {
  const files = event.target.files
  const formData = new FormData()
  console.log(files[0])
  formData.append('myFile', files[0])
  socket.emit('new_user_pool', [props.poolName, props.username])
  
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

  // axios.post("/saveImage", formData)
  //   .then(res => console.log(res))
  //   .catch(err => console.warn(err));
};

  
  return (
    <div className="App">
       <input type="file" name="file" onChange={changeHandler} />
    </div>
    
  );
}

export default Upload;

