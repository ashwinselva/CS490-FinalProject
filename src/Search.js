import React, {useState, useRef, useContext} from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import SocketContext from './SocketContext';
import ContentContext from './ContentContext';

function Search({}) {
    
    const options = [
        'Image Name',
        'Pool',
        'Tag',
        'Username',
        'Random Images',
        ];
        
    const tags = [
        'Pose',
        'Animal',
        'Object',
        'Costume',
        'Face',
        'Anatomy',
        'Scenery',
        ];
        
    const buttonstyle = {
        background: "transparent",
        border: "none"
        };
        
    const searchRef = useRef(null);
    const socket = useContext(SocketContext)
    const [option, setOption] = useState("Image Name")
    const [page, setPage] = useContext(ContentContext)
    const [randomImage, setRandom] = useState(false)
    const [tagState,setTagState] = useState(false)
    const [Tag, setTag] = useState(null)
    const [normalState, setNormalState] = useState(true)


    function onSearch() {
        console.log();
        const searchText = searchRef.current.value;
        socket.emit('search',{
            searchText: searchText,
            option : option,
        });
        var searchString = "search."
        searchString = searchString.concat(searchText)
        setPage(searchString)
    }
    
    const dropVal=(e)=>{
        setOption(e["value"])
        if (e["value"] == 'Random Images'){
            setRandom(true)
            setTagState(false)
            setNormalState(false)
        }
        else if (e["value"] == 'Tag'){
            setTagState(true)
            setRandom(false)
            setNormalState(false)
        }
        else{
            setTagState(false)
            setRandom(false)
            setNormalState(true)
        }
     }
     
     const tagValue=(e)=>{
         setTag(e["value"])
     }
     
     function onTag(){
         const searchText = Tag
         socket.emit('search',{
            searchText: searchText,
            option : option,
        });
         
     }
     
    return (
        <div>
        
        {tagState === true ? (
        <div>
        <button style={buttonstyle}>
            <Dropdown onChange={dropVal} style={buttonstyle} options={options} placeholder="Tag" />
        </button>
        <button style={buttonstyle}>
            <Dropdown onChange={tagValue} style={buttonstyle} options={tags} placeholder="Options" />
        </button>
            <button type="button" onClick={onTag}>
                Search
             </button>
        </div>
        ):(null)}
        
        {randomImage === true ? (
        <div>
        <button style={buttonstyle}>
            <Dropdown onChange={dropVal} style={buttonstyle} options={options} placeholder="Random Images" />
        </button>
            <input ref={searchRef} type="text" placeholder="Enter number of images"/> 
            <button type="button" onClick={onSearch}>
                Search
            </button>
        </div>
            ) : (null)}
            
        
        
        {normalState === true ? (
        <div>
        <button style={buttonstyle}>
            <Dropdown onChange={dropVal} style={buttonstyle} options={options} placeholder="Search by" />
        </button>
            <input ref={searchRef} type="text" />
            <button type="button" onClick={onSearch}>
                Search
            </button>
        </div>
        ) : (null)}
        
        
        </div>
    )
}

export default Search;