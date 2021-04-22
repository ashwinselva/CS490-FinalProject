import React, {useState, useRef} from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

function Search(props) {
    
    const options = [
        'Keyword',
        'Tag',
        'Random Images'
        ];
    
    const buttonstyle = {
        background: "transparent",
        border: "none"
        };
        
    const searchRef = useRef(null);
    
    function onSearch() {
        console.log('search');
    }
    
    return (
        <div>
        <button style={buttonstyle}>
            <Dropdown style={buttonstyle} options={options} placeholder="Search by" />
        </button>
        <input ref={searchRef} type="text" />
        <button type="button" onClick={onSearch}>
            Search
        </button>
        </div>
    )
}

export default Search;