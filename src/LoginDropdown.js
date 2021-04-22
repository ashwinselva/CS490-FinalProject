import React, {useState} from 'react';

function LoginDropdown(props) {
    
    const [isLoginClicked,setLoginClicked]=useState(false);
    const [isNewUserClicked,setNewUserClicked]=useState(false);
    
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
                    <input ref={props.usernameRef} type="text"/>
                </label>
                <br />
                <label>
                    Password
                    <input type="password" ref={props.inputRefPassword} />
                </label>
                <br />
                {isLoginClicked?(
                    <input type="submit" value="Login" onClick={props.onLoginComplete} />
                ):(
                    <input type="submit" value="Create Account" onClick={props.onNewUserComplete} />
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