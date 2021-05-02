import './App.css';
import React, { useState, useRef, useEffect} from 'react';
import 'react-dropdown/style.css';

function ImageDisplay({
    imageURL,
}
  ) {

  
  return (
    <div className="ImageDisplay">
       <img src={imageURL} height="100" width="100"/>
    </div>
    
  );
}

export default ImageDisplay;

