<<<<<<< HEAD
import React, {useState, useRef} from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
=======
import React, {useState, useRef, useContext} from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import SocketContext from './SocketContext';
import ContentContext from './ContentContext';


>>>>>>> 5f94f38fa6c3062fb24db1a375d6705e70fc7939

function Search({}) {
    
    const options = [
        'Keyword',
        'Tag',
<<<<<<< HEAD
        'Random Images'
=======
        'Username',
        'Random Images',
>>>>>>> 5f94f38fa6c3062fb24db1a375d6705e70fc7939
        ];
    
    const buttonstyle = {
        background: "transparent",
        border: "none"
        };
        
    const searchRef = useRef(null);
<<<<<<< HEAD
    
    function onSearch() {
        console.log('search');
    }
    
    return (
        <div>
        <button style={buttonstyle}>
            <Dropdown style={buttonstyle} options={options} placeholder="Search by" />
=======
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
>>>>>>> 5f94f38fa6c3062fb24db1a375d6705e70fc7939
        </button>
        <input ref={searchRef} type="text" />
        <button type="button" onClick={onSearch}>
            Search
        </button>
        </div>
    )
}

export default Search;