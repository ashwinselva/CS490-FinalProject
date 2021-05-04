import './App.css';
import React, { useState, useRef, useEffect} from 'react';
import 'react-dropdown/style.css';

function ImageDisplay({
    imageURL,
}
  ) {

  
  return (
    <div className="ImageDisplay" >
       <img src={imageURL} style={{width:'200px', height:'200px', borderRadius:'12px', objectFit:'cover'}}/>
    </div>
    
  );
}

export default ImageDisplay;

