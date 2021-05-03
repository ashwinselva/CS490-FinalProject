import React, {useState, useContext} from 'react';
import Upload from './Upload';
import ImgDrop from './ImgDrop';
import UsernameContext from './UsernameContext';


function UploadImg({
    poolName,
}) {
    
    const [username, setUsername] = useContext(UsernameContext);
    
    const [image, setImage] = useState(null);
    const [imageUrl, setUrl] = useState('');
    const [tags, setTags] = useState({
            Pose: false,
            Animal: false,
            Obj: false,
            Costume: false,
            Face: false,
            Anatomy: false,
            Scenery: false,
        })
        
    const changeHandler = (event) => {
        const files = event.target.files
        uploadFile(files[0]);
    
    };
    
    function uploadFile(file) {
        console.log(file);
        setImage(file);
        const imgsrc = URL.createObjectURL(file);
        setUrl(imgsrc);
        URL.revokeObjectURL(imageUrl);
    }
    
    function sendFile() {
        const formData = new FormData();
        formData.append('myFile', image);
        formData.append('poolName', poolName);
        formData.append('username', username);
        
        const sendTags = [];
        const tagNames = [
            'Pose',
            'Animal',
            'Obj',
            'Costume',
            'Face',
            'Anatomy',
            'Scenery',
        ];
        
        tagNames.forEach(tag => {
            if (tags[tag]){
                sendTags[sendTags.length] = tag==='Obj'?'Object':tag;
            }
        });
        
        formData.append('tags', sendTags);
        
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
      
    }

    function toggleTag(tag) {
        const currentTags = tags;
        currentTags[tag] = !tags[tag];
        setTags([currentTags]);
    }
    
    return (
        <div>
            <div className='App-header' style={{width:'60%'}}>
                <div className='Sketchit-app'>
                    {imageUrl!=''?(
                        <img src={imageUrl} style={{objectFit:'contain', width:'100%', height:'100%'}}/>
                    ):(
                        <div>
                            <Upload changeHandler={changeHandler}/>
                            <ImgDrop uploadFile={uploadFile}/>
                        </div>
                    )}
                </div>
                {imageUrl!=''?(
                    <button onClick={sendFile}>Confirm</button>
                ):(null)}
                
            </div>
            <div className='App-header' style={{width:'25%'}}>
                Tags
                <br/>
                <lable>
                    Pose
                    <input type='checkbox' checked={tags['Pose']} onChange={() => toggleTag('Pose')}/>
                </lable>
                <lable>
                    Animal
                    <input type='checkbox' checked={tags['Animal']} onChange={() => toggleTag('Animal')}/>
                </lable>
                <lable>
                    Object
                    <input type='checkbox' checked={tags['Obj']} onChange={() => toggleTag('Obj')}/>
                </lable>
                <lable>
                    Costume
                    <input type='checkbox' checked={tags['Costume']} onChange={() => toggleTag('Costume')}/>
                </lable>
                <lable>
                    Face
                    <input type='checkbox' checked={tags['Face']} onChange={() => toggleTag('Face')}/>
                </lable>
                <lable>
                    Anatomy
                    <input type='checkbox' checked={tags['Anatomy']} onChange={() => toggleTag('Anatomy')}/>
                </lable>
                <lable>
                    Scenery
                    <input type='checkbox' checked={tags['Scenery']} onChange={() => toggleTag('Scenery')}/>
                </lable>
            </div>
            <div className='App-header' style={{width:'15%'}}>
                <button>Back</button>
            </div>
        </div>
    )
}

export default UploadImg;