import React, { useState, useRef, useEffect } from "react";


export default function UserPool(){
    const [isClicked, setClicked] = useState(false);
    const inputRef = useRef(null);
    const [isConfirmed, setConfirmed] = useState(false);



    function onPoolButton(){
        setClicked((prevShown) => !prevShown);
    }
    
    function onConfirmButton(){
        setConfirmed((prevShown) => !prevShown);
        const userText = inputRef.current.value;
        
    }
    
    


return (
    <div>
        {isClicked === true ? (
        <div>
            Please enter a name for your pool<input ref={inputRef} type = "text" />
            <button type="button" onClick={() => onConfirmButton()}> 
            Confirm
            </button>
        </div>
        ):(
        <div>
            <button type="button" onClick={() => onPoolButton()}> 
            New Pool 
            </button>
        </div>
        )}
    </div>
    );

}