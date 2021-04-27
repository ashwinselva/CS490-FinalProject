import React, {useState, useRef, useContext} from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import SocketContext from './SocketContext';


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
    const [option, setOption] = useState()
    const defaultOption = options[0]
    
    function onSearch() {
        console.log();
        const searchText = searchRef.current.value;
        socket.emit('search',{
            searchText: searchText,
            option : option
        });
        
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