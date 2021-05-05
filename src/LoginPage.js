import React, {useContext, useState, useRef} from 'react';
import ViewPools from './ViewPools';
import ContentContext from './ContentContext';
import SocketContext from './SocketContext';
import "./style.css";

function LoginPage({}) {
    
    const [contentState, setContent] = useContext(ContentContext);
    const socket = useContext(SocketContext);
    
    const [isLoginClicked,setLoginClicked]=useState(false);
    const [isNewUserClicked,setNewUserClicked]=useState(false);
    
    const usernameRef = useRef(null); 
    const passwordRef = useRef(null);
    
    function onLoginComplete(){
        const username=usernameRef.current.value;
        const password=passwordRef.current.value;
        console.log(username);
        console.log(password);
        if(username.trim()==='' || password.trim()===''){
            alert('Please enter a username and password.');
        }
        else{
            socket.emit('login',{user:username,password:password});
            setContent('home');
        }
    }
    
    function onNewUserComplete(){
        const username=usernameRef.current.value;
        const password=passwordRef.current.value;
        console.log(username);
        console.log(password);
        if(username.trim()==='' || password.trim()===''){
            alert('Please enter a username and password.');
        }
        else{
            socket.emit('newUser',{user:username,password:password});
            setContent('home');
        }
        
    }
    
    function onLoginClick() {
        setLoginClicked(true);
        setNewUserClicked(false);
        
    }
    
    function onNewUserClick() {
        setNewUserClicked(true);
        setLoginClicked(false);
    }
    
    return (
        <div  style={{textAlign:'center', alignItems:'center', backgroundColor:'white', display:'flex', width:'100%', height:'80vh', justifyContent:'center'}}>
        
        <div>
        {isLoginClicked?(null):(<button class="button" onClick={() => onLoginClick()}>Login</button>)}
        {isNewUserClicked?(null):(<button class="button" onClick={() => onNewUserClick()}>New User</button>)}
            {isLoginClicked||isNewUserClicked?(
                <div >
                <br />
                <label>
                    Login-ID
                    <input ref={usernameRef} type="text"/>
                </label>
                <br />
                <label>
                    Password
                    <input type="password" ref={passwordRef} />
                </label>
                <br />
                {isLoginClicked?(
                    <input class="button" type="submit" value="Login" onClick={onLoginComplete} />
                ):(
                    <input class="button" type="submit" value="Create Account" onClick={onNewUserComplete} />
                )}
                <br />
                </div>
        ):(null)}
        </div>
        </div>
        
    )
}

export default LoginPage;