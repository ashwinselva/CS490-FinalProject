import React, {useState, useRef, useContext, useEffect} from 'react';
import SocketContext from './SocketContext';
import "./style.css";

function LoginDropdown({}) {
    
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
    
    useEffect(() => {
    socket.on('loginFailed', (data) => {
        alert("Invalid login or password.")
    });
    
    socket.on('newUserFailed', (data) => {
        alert("User already exists.")
    });
    
 }, []);
  
    return (
        <div style={{display:'flex', flexDirection: 'row', height:'80%', justifyContent:'center'}}>
        
            {isLoginClicked?(null):(<button class="button" onClick={() => onLoginClick()}>Login</button>)}
            {isNewUserClicked?(null):(<button class="button" onClick={() => onNewUserClick()}>New User</button>)}
            {isLoginClicked||isNewUserClicked?(
                <div>
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
            ):(null)
            }
        </div>
    )
}

export default LoginDropdown;