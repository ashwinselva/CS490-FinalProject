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
        
    const buttonstyle = {
        background: "transparent",
        border: "none"
        };
        
    const searchRef = useRef(null);
    const socket = useContext(SocketContext)
    const [option, setOption] = useState("Image Name")
    const [page, setPage] = useContext(ContentContext)
    const [randomImage, setRandom] = useState(false)
    const imageNumber = useRef(null)
    
    function onSearch() {
        console.log();
        const searchText = searchRef.current.value;
        if (option == "Random Images"){
            console.log(searchText)
        }
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
        }
        else{
            setRandom(false)
        }
     }
     
    
    
    
    return (
        <div>
        <button style={buttonstyle}>
            <Dropdown onChange={dropVal} style={buttonstyle} options={options} placeholder="Search by" />
        </button>
        {randomImage === true ? (
            <input ref={searchRef} type="text" placeholder="Enter number of images"/> 
            ) : (
            <input ref={searchRef} type="text" />
            )}
        <button type="button" onClick={onSearch}>
            Search
        </button>
        </div>
    )
}

export default Search;