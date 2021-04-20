import './App.css';
import React, { useState, useRef, useEffect} from 'react';
import 'react-dropdown/style.css';

function ImageList({
    imageList,
}
  ) {
        
        const rowSize = 5;
        
        var rowNumber = 0;
        var imageRows = [];
        var currentRow = [];
        
        imageList.forEach(image => {
            currentRow[currentRow.length] = image;
            if (currentRow.length === rowSize) {
                imageRows[imageRows.length] = currentRow;
                currentRow = [];
            }
        })

  
  return (
    <div className="App">
       
    </div>
    
  );
}

export default ImageList;

