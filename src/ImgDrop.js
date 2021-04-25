import React, {useState, useContext} from 'react';
import UsernameContext from './UsernameContext';

function ImgDrop({
    poolName
}) {
    const [inZone, setInZone] = useState(false);
    const [fileList, setFileList] = useState([]);
    
    const [username, setUsername] = useContext(UsernameContext);
    
    function uploadFile(file) {
        const formData = new FormData();
        console.log(file);
        formData.append('myFile', file);
        formData.append('poolName', poolName);
        formData.append('username', username);
        
        fetch('/saveImage', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
        })
        .catch(error => {
            console.error(error)
        })
      
        alert("Upload successful.");
    }
    
    function handleDragEnter(e) {
        e.preventDefault();
        setInZone(true);
        e.stopPropagation();
    }
    function handleDragLeave(e) {
        e.preventDefault();
        setInZone(false);
        e.stopPropagation();
    }
    function handleDragOver(e) {
        e.preventDefault();
        setInZone(true);
        e.stopPropagation();
    }
    function handleDrop(e) {
        e.preventDefault();
        e.stopPropagation();
        if (inZone) {
            let files = [...e.dataTransfer.files];
            
            if (files && files.length > 0){
                const existingFiles = fileList.map(f => f.name);
                files = files.filter(f => !existingFiles.includes(f.name));
                
                setFileList(prevFiles => prevFiles.concat(files));
                
                files.forEach(file => uploadFile(file));
            }
        }
    }
    
    return (
        <div className={'imgDrop'}
            onDragEnter={e => handleDragEnter(e)}
            onDragLeave={e => handleDragLeave(e)}
            onDragOver={e => handleDragOver(e)}
            onDrop={e => handleDrop(e)}
        >
            <p>Drag Image Files Here</p>
        </div>
    )
}

export default ImgDrop;