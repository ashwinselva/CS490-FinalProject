import React, { useState, useRef, useEffect } from "react";
import Upload from "./Upload"
import imgDrop from "./imgDrop"

export default function UserPool(props){
    const [isClicked, setClicked] = useState(false);
    const inputRef = useRef(null);
    const [isConfirmed, setConfirmed] = useState(false);
    const [poolName, setName] = useState();

    function onPoolButton(){
        setClicked((prevShown) => !prevShown);
    }
    
    function onConfirmButton(){
        setConfirmed((prevShown) => !prevShown);
        const userText = inputRef.current.value;
        setName(userText);
    }
    
return (
    <div>
        {isClicked === true ? (
        <div>
            {isConfirmed === true ? (
                <div>
                    Displaying {poolName}
                    <Upload poolName={poolName} username={props.username}/>
                    <imgDrop poolName={poolName} username={props.username}/>
                </div>
            ):(
                <div>
                    Please enter a name for your pool<input ref={inputRef} type = "text" />
                    <button type="button" onClick={() => onConfirmButton()}> 
                    Confirm
                    </button>
                </div>
            )}
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