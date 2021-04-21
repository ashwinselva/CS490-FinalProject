import './App.css';
import React, { useState, useRef, useEffect} from 'react';
import 'react-dropdown/style.css';
import ImageDisplay from './ImageDisplay';

function ImageList({
    imageList,
}
  ) {
  
  return (
    <div className="App.imageGrid">
       {
            imageList.map((item) => (
                <ImageDisplay imageURL={item} />
            ))
       }
    </div>
    
  );
}

export default ImageList;

