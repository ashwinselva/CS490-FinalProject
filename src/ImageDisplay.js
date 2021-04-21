import './App.css';
import React, { useState, useRef, useEffect} from 'react';
import 'react-dropdown/style.css';

function ImageDisplay({
    imageURL,
}
  ) {

  
  return (
    <div className="ImageDisplay">
       <img src={imageURL} />
    </div>
    
  );
}

export default ImageDisplay;

