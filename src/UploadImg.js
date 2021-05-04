import React, {useState, useContext} from 'react';
import Upload from './Upload';
import ImgDrop from './ImgDrop';
import UsernameContext from './UsernameContext';
import ContentContext from './ContentContext';

function UploadImg({
    poolName,
}) {
    
    const [username, setUsername] = useContext(UsernameContext);
    const [contentState, setContent] = useContext(ContentContext);
    
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
        alert("Image Uploaded");
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
        
        console.log("Current tags: " + tags['Pose'])
        console.log("Current tags: " + tags['Animal'])
        console.log("Current tags: " + tags['Obj'])
        console.log("Current tags: " + tags['Costume'])
        console.log("Current tags: " + tags['Face'])
        console.log("Current tags: " + tags['Anatomy'])
        console.log("Current tags: " + tags['Scenery'])
        
        console.log("starting tags: " + sendTags)
        
        tagNames.forEach(tag => {
            if (tags[tag]){
                sendTags[sendTags.length] = tag==='Obj'?'Object':tag;
            }
        });
        
        console.log("added tags: " + sendTags)
        
        formData.append('tags', sendTags);
        
        console.log("sent tags: " + sendTags)
        
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
        setTags(JSON.parse(JSON.stringify(currentTags)));
    }
    
    return (
        <div className='App-header-row'>
            <div className='App-header' style={{width:'60%'}}>
                <div className='Sketchit-app'>
                    {imageUrl!=''?(
                        <img src={imageUrl} style={{objectFit:'contain', width:'100%', height:'100%'}}/>
                    ):(
                        <div className='Sketchit-options'>
                            <Upload changeHandler={changeHandler}/>
                            <ImgDrop uploadFile={uploadFile}/>
                        </div>
                    )}
                </div>
                {imageUrl!=''?(
                    <button onClick={sendFile}>Confirm</button>
                ):(null)}
                
            </div>
            <div className='App-header' style={{
                    width:'25%', 
                    justifyContent:'flex-start', 
                    alignItems:'flex-start',
                }}>
                <div style={{
                    textAlign:'left',
                    justifyContent:'center', 
                    alignItems:'center',
                    minHeight:'70%',
                    width:'100%',
                    display:'flex',
                    flexDirection:'column',
                }}>
                <div style={{verticalAlign:'middle', flexDirection:'column'}}>
                Tags:
                <br/>
                <label>
                    <input type='checkbox' checked={tags['Pose']} onChange={() => toggleTag('Pose')}/>
                    Pose
                </label>
                <label>
                    <input type='checkbox' checked={tags['Animal']} onChange={() => toggleTag('Animal')}/>
                    Animal
                </label>
                <label>
                    <input type='checkbox' checked={tags['Obj']} onChange={() => toggleTag('Obj')}/>
                    Object
                </label>
                <label>
                    <input type='checkbox' checked={tags['Costume']} onChange={() => toggleTag('Costume')}/>
                    Costume
                </label>
                <label>
                    <input type='checkbox' checked={tags['Face']} onChange={() => toggleTag('Face')}/>
                    Face
                </label>
                <label>
                    <input type='checkbox' checked={tags['Anatomy']} onChange={() => toggleTag('Anatomy')}/>
                    Anatomy
                </label>
                <label>
                    <input type='checkbox' checked={tags['Scenery']} onChange={() => toggleTag('Scenery')}/>
                    Scenery
                </label>
                </div>
                </div>
            </div>
            <div className='App-header' style={{width:'15%'}}>
            <div style={{width:'100%', display:'flex', justifyContent:'flex-end'}}>
                <button onClick={() => setContent('viewPool.'+poolName)}>Back</button>
            </div>
            </div>
        </div>
    )
}

export default UploadImg;