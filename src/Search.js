import React, {useState, useRef, useContext} from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import SocketContext from './SocketContext';
import ContentContext from './ContentContext';



function Search({}) {
    
    const options = [
        'Keyword',
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
    const [option, setOption] = useState("Keyword")
    const [page, setPage] = useContext(ContentContext)
    
    function onSearch() {
        console.log();
        const searchText = searchRef.current.value;
        socket.emit('search',{
            searchText: searchText,
            option : option
        });
        var searchString = "search."
        searchString = searchString.concat(searchText)
        setPage(searchString)
    }
    
    const dropVal=(e)=>{
        setOption(e["value"])
     }
    
    
    return (
        <div>
        <button style={buttonstyle}>
            <Dropdown onChange={dropVal} style={buttonstyle} options={options} placeholder="Search by" />
        </button>
        <input ref={searchRef} type="text" />
        <button type="button" onClick={onSearch}>
            Search
        </button>
        </div>
    )
}

export default Search;