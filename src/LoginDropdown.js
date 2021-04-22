import React, {useState, useRef} from 'react';

function LoginDropdown({
    socket,
    setUsername,
}) {
    
    const [isLoginClicked,setLoginClicked]=useState(false);
    const [isNewUserClicked,setNewUserClicked]=useState(false);
    
    const usernameRef = useRef(null); 
    const passwordRef = useRef(null); 

    function onLoginComplete(){
        const username=usernameRef.current.value;
        const password=passwordRef.current.value;
        console.log(username);
        console.log(password);
        socket.emit('login',{user:username,password:password});
        setUsername(username)
    }
    
    function onNewUserComplete(){
        const username=usernameRef.current.value;
        const password=passwordRef.current.value;
        console.log(username);
        console.log(password);
        socket.emit('newUser',{user:username,password:password});
        setUsername(username)
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
        <div>
        <div>
            {isLoginClicked?(null):(<button onClick={() => onLoginClick()}>Login</button>)}
            {isNewUserClicked?(null):(<button onClick={() => onNewUserClick()}>New User</button>)}
            {isLoginClicked||isNewUserClicked?(
                <div>
                <br />
                <label>
                    Login-ID:
                    <input ref={usernameRef} type="text"/>
                </label>
                <br />
                <label>
                    Password
                    <input type="password" ref={passwordRef} />
                </label>
                <br />
                {isLoginClicked?(
                    <input type="submit" value="Login" onClick={onLoginComplete} />
                ):(
                    <input type="submit" value="Create Account" onClick={onNewUserComplete} />
                )}
                <br />
                </div>
            ):(null)
            }
        </div>
        </div>
    )
}

export default LoginDropdown;